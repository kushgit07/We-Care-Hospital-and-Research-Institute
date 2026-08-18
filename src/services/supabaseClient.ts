import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Configuration from environment or defaults supplied
const SUPABASE_URL = 
  ((import.meta as any).env?.VITE_SUPABASE_URL) || 
  'https://mmsurqwvmcorctfphfsa.supabase.co';

const SUPABASE_ANON_KEY = 
  ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || 
  'sb_publishable_URpoXszLuOHp1Bx6xoKeIQ_FWPuPCme';

let supabaseClient: SupabaseClient | null = null;

try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      db: {
        schema: 'public',
      },
    });
  }
} catch (error) {
  console.warn('Supabase initialization warning:', error);
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = Boolean(supabaseClient && SUPABASE_URL);

/**
 * Backend RPC and database interface helper functions
 */
export interface BackendAppointmentRecord {
  id?: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  doctor_id: string;
  doctor_name: string;
  department_id: string;
  department_name: string;
  branch_id?: string;
  branch_name?: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: string;
  symptoms?: string;
  payment_status?: string;
  insurance_provider?: string;
  total_amount?: number;
  status?: string;
  pass_code?: string;
  queue_number?: string;
  created_at?: string;
}

export interface BackendInquiryRecord {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiry_type?: string;
  preferred_branch?: string;
  status?: string;
  created_at?: string;
}

export interface BackendEmergencyDispatchRecord {
  id?: string;
  patient_name: string;
  contact_phone: string;
  location_address: string;
  latitude?: number;
  longitude?: number;
  emergency_nature: string;
  dispatch_status: string;
  assigned_branch_id?: string;
  created_at?: string;
}

export interface BackendHealthCheckRecord {
  id?: string;
  patient_name: string;
  patient_email: string;
  package_id: string;
  package_name: string;
  scheduled_date: string;
  total_price: number;
  status: string;
  created_at?: string;
}
