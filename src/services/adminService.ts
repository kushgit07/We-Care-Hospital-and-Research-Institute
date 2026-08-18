import { supabase } from './supabaseClient';
import { Appointment } from '../types/hospital';

export interface AdminAccount {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'clinical_director' | 'operations_lead';
  departmentAccess: string[];
  createdAt: string;
  lastLoginAt: string;
  avatarUrl: string;
  twoFactorEnabled: boolean;
  securityBadgeId: string;
}

const ADMIN_STORAGE_KEY = 'wecare_super_admin_account_v1';
const ADMIN_SESSION_KEY = 'wecare_admin_session_token_v1';
const ADMIN_INITIALIZED_KEY = 'wecare_admin_slot_claimed_v1';

// Hash helper for mock credential security (SHA-256 simulation in client)
async function hashPasscode(pass: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(pass + '_wecare_salt_sec_2026');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Check if the single Super Admin slot is already claimed
 */
export const isAdminSlotClaimed = (): boolean => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    const flag = localStorage.getItem(ADMIN_INITIALIZED_KEY);
    return Boolean(raw || flag === 'true');
  } catch {
    return false;
  }
};

/**
 * Register the ONE and ONLY allowed Super Admin account
 */
export const registerSingleAdminAccount = async (payload: {
  fullName: string;
  email: string;
  passcode: string;
  securityKeyPhrase: string;
  departmentAccess?: string[];
}): Promise<{ success: boolean; error?: string; admin?: AdminAccount }> => {
  if (isAdminSlotClaimed()) {
    return {
      success: false,
      error: 'Security Lockout: The single Super-Admin slot has already been claimed. Additional registrations are strictly prohibited.'
    };
  }

  if (!payload.email || !payload.passcode || payload.passcode.length < 6) {
    return {
      success: false,
      error: 'Admin passcode must be at least 6 secure characters.'
    };
  }

  const hashed = await hashPasscode(payload.passcode);
  const badgeId = `SEC-BADGE-${Math.floor(100000 + Math.random() * 900000)}`;

  const newAdmin: AdminAccount = {
    id: `adm-${Date.now()}`,
    email: payload.email.trim().toLowerCase(),
    fullName: payload.fullName.trim(),
    role: 'super_admin',
    departmentAccess: payload.departmentAccess || ['ALL_DEPARTMENTS', 'FINANCE', 'EMERGENCY_DISPATCH', 'REPORTS'],
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    avatarUrl: `https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256`,
    twoFactorEnabled: true,
    securityBadgeId: badgeId
  };

  try {
    // Save to LocalStorage with hashed secret
    const adminRecordWithSecret = {
      ...newAdmin,
      secretHash: hashed,
      securityKeyPhrase: payload.securityKeyPhrase
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminRecordWithSecret));
    localStorage.setItem(ADMIN_INITIALIZED_KEY, 'true');
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(newAdmin));

    // Also sync to Supabase admin profile if connected
    if (supabase) {
      Promise.resolve(
        supabase.from('admin_users').upsert([
          {
            id: newAdmin.id,
            email: newAdmin.email,
            full_name: newAdmin.fullName,
            role: 'super_admin',
            badge_id: badgeId,
            created_at: newAdmin.createdAt
          }
        ])
      ).catch(() => {});
    }

    return { success: true, admin: newAdmin };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to initialize single admin slot.' };
  }
};

/**
 * Authenticate Admin Login
 */
export const loginAdmin = async (
  email: string,
  passcode: string
): Promise<{ success: boolean; error?: string; admin?: AdminAccount }> => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) {
      return {
        success: false,
        error: 'No Admin account exists yet. Please claim the single available Admin registration slot.'
      };
    }

    const stored = JSON.parse(raw);
    const providedHash = await hashPasscode(passcode);

    if (
      stored.email.toLowerCase() === email.trim().toLowerCase() &&
      stored.secretHash === providedHash
    ) {
      const activeAdmin: AdminAccount = {
        id: stored.id,
        email: stored.email,
        fullName: stored.fullName,
        role: stored.role,
        departmentAccess: stored.departmentAccess,
        createdAt: stored.createdAt,
        lastLoginAt: new Date().toISOString(),
        avatarUrl: stored.avatarUrl,
        twoFactorEnabled: stored.twoFactorEnabled,
        securityBadgeId: stored.securityBadgeId
      };

      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(activeAdmin));
      return { success: true, admin: activeAdmin };
    } else {
      return {
        success: false,
        error: 'Invalid Super Admin credentials or security token mismatch.'
      };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Authentication failed.' };
  }
};

/**
 * Get currently authenticated Admin session
 */
export const getActiveAdminSession = (): AdminAccount | null => {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Logout Admin
 */
export const logoutAdmin = (): void => {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {}
};

/**
 * Fetch all appointments from Supabase + LocalStorage for Admin command center
 */
export const fetchAllBookingsForAdmin = async (): Promise<Appointment[]> => {
  try {
    // 1. Fetch from local storage first
    let localAppointments: Appointment[] = [];
    const saved = localStorage.getItem('wecare_appointments');
    if (saved) {
      localAppointments = JSON.parse(saved);
    }

    // 2. Fetch from Supabase if connected
    if (supabase) {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formattedFromSupabase: Appointment[] = data.map((item: any) => ({
          id: item.id || `app-${Math.random()}`,
          bookingReference: item.pass_code || item.id,
          patientName: item.patient_name,
          patientPhone: item.patient_phone || '+1 (555) 000-0000',
          patientEmail: item.patient_email || 'patient@hospital.org',
          age: item.age || 35,
          gender: (item.gender as any) || 'Other',
          doctorId: item.doctor_id || 'doc-1',
          doctorName: item.doctor_name,
          departmentId: item.department_id || 'cardiology',
          departmentName: item.department_name,
          branchId: item.branch_id || 'branch-main',
          branchName: item.branch_name || 'Main Medical City',
          serviceType: `${item.consultation_type || 'In-Person'} Consultation`,
          date: item.appointment_date,
          timeSlot: item.appointment_time,
          consultType: item.consultation_type || 'In-Person',
          symptoms: item.symptoms || 'Clinical evaluation',
          status: (item.status as any) || 'Confirmed',
          tokenNumber: item.queue_number ? parseInt(item.queue_number.replace(/\D/g, '')) || 101 : 101,
          fee: item.total_amount || 150,
          paymentStatus: item.payment_status || 'Paid Online',
          qrCodeSeed: item.pass_code || item.id || 'WC-PASS',
          createdAt: item.created_at || new Date().toISOString()
        }));

        // Merge deduplicating by ID or booking reference
        const mergedMap = new Map<string, Appointment>();
        localAppointments.forEach(apt => mergedMap.set(apt.bookingReference || apt.id, apt));
        formattedFromSupabase.forEach(apt => mergedMap.set(apt.bookingReference || apt.id, apt));

        return Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        );
      }
    }

    return localAppointments;
  } catch (err) {
    console.warn('Admin booking load error:', err);
    const saved = localStorage.getItem('wecare_appointments');
    return saved ? JSON.parse(saved) : [];
  }
};
