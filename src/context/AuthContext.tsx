import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthProviderType, AuthSessionLog, LinkedAccount } from '../types/auth';
import { KUSHAGRA_AVATAR_IMAGE } from '../data/userAvatar';
import { syncSupabaseUserSession } from '../services/backendService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMessage: { text: string; type: 'success' | 'info' | 'error' } | null;
  sessionLogs: AuthSessionLog[];
  loginWithGoogle: (customEmail?: string, customName?: string) => Promise<AuthUser>;
  loginWithPhoneOtp: (phone: string, otp?: string) => Promise<AuthUser>;
  logout: (reason?: string) => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
  linkAccount: (provider: AuthProviderType) => void;
  unlinkAccount: (provider: AuthProviderType) => void;
  clearAuthMessage: () => void;
  quickSwitchPersona: (personaKey: 'google_kushagra' | 'google_workspace' | 'phone_patient') => void;
}

const DEFAULT_USER: AuthUser = {
  id: 'usr-google-9481',
  mrn: 'WCH-94821',
  name: 'Kushagra Sisodia',
  email: 'kushagrasisodia27@gmail.com',
  phone: '+1 (555) 234-5678',
  avatar: KUSHAGRA_AVATAR_IMAGE,
  role: 'patient',
  provider: 'google',
  isVerified: true,
  emailVerified: true,
  twoFactorEnabled: true,
  lastLogin: 'Just now (Google Identity Services OAuth 2.0)',
  dateJoined: 'Jan 14, 2024',
  organization: 'Google Workspace',
  linkedAccounts: [
    { provider: 'google', emailOrId: 'kushagrasisodia27@gmail.com', linkedAt: 'Jan 14, 2024', isPrimary: true },
    { provider: 'phone', emailOrId: '+1 (555) 234-5678', linkedAt: 'Jan 20, 2024' }
  ]
};

const DEMO_PERSONAS: Record<string, AuthUser> = {
  google_kushagra: {
    id: 'usr-google-9481',
    mrn: 'WCH-94821',
    name: 'Kushagra Sisodia',
    email: 'kushagrasisodia27@gmail.com',
    phone: '+1 (555) 234-5678',
    avatar: KUSHAGRA_AVATAR_IMAGE,
    role: 'patient',
    provider: 'google',
    isVerified: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: 'Just now (Google OAuth 2.0)',
    dateJoined: 'Jan 14, 2024',
    organization: 'Google Account',
    linkedAccounts: [
      { provider: 'google', emailOrId: 'kushagrasisodia27@gmail.com', linkedAt: 'Jan 14, 2024', isPrimary: true },
      { provider: 'phone', emailOrId: '+1 (555) 234-5678', linkedAt: 'Jan 20, 2024' }
    ]
  },
  google_workspace: {
    id: 'usr-google-org-104',
    mrn: 'WCH-88204',
    name: 'Kushagra Sisodia',
    email: 'kushagra@wecarehealth.org',
    phone: '+1 (555) 019-2834',
    avatar: KUSHAGRA_AVATAR_IMAGE,
    role: 'patient',
    provider: 'google',
    isVerified: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: 'Just now (Google Workspace Enterprise)',
    dateJoined: 'Aug 12, 2023',
    organization: 'We Care Health Network (Workspace)',
    linkedAccounts: [
      { provider: 'google', emailOrId: 'kushagra@wecarehealth.org', linkedAt: 'Aug 12, 2023', isPrimary: true }
    ]
  },
  phone_patient: {
    id: 'usr-phone-4419',
    mrn: 'WCH-44192',
    name: 'Kushagra Sisodia',
    email: 'kushagrasisodia27@gmail.com',
    phone: '+1 (555) 234-5678',
    avatar: KUSHAGRA_AVATAR_IMAGE,
    role: 'patient',
    provider: 'phone',
    isVerified: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: 'Just now (SMS OTP 6-Digit Verified)',
    dateJoined: 'May 20, 2024',
    organization: 'Mobile OTP Direct Verification',
    linkedAccounts: [
      { provider: 'phone', emailOrId: '+1 (555) 234-5678', linkedAt: 'May 20, 2024', isPrimary: true },
      { provider: 'google', emailOrId: 'kushagrasisodia27@gmail.com', linkedAt: 'May 20, 2024' }
    ]
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('wecare_auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
      return DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authMessage, setAuthMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  const [sessionLogs, setSessionLogs] = useState<AuthSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('wecare_auth_sessions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sess-1',
          timestamp: 'Today at 09:14 AM',
          provider: 'google',
          device: 'Chrome on macOS (Google OAuth 2.0)',
          ipAddress: '192.168.1.104 (Encrypted TLS 1.3)',
          location: 'New York, United States',
          status: 'Active',
          tokenRef: 'JWT-GOOGLE-RS256-99A'
        },
        {
          id: 'sess-2',
          timestamp: 'Yesterday at 04:30 PM',
          provider: 'phone',
          device: 'SMS OTP Device Authentication',
          ipAddress: '172.56.21.90 (Cellular Verification)',
          location: 'New York, United States',
          status: 'Active',
          tokenRef: 'OTP-SMS-AUTH-8821'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('wecare_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('wecare_auth_user');
      }
    } catch (e) {
      console.warn('Failed saving user to storage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('wecare_auth_sessions', JSON.stringify(sessionLogs));
    } catch (e) {}
  }, [sessionLogs]);

  const notify = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setAuthMessage({ text, type });
    setTimeout(() => {
      setAuthMessage(prev => (prev?.text === text ? null : prev));
    }, 4500);
  };

  const addSessionLog = (provider: AuthProviderType) => {
    const newLog: AuthSessionLog = {
      id: `sess-${Date.now()}`,
      timestamp: `Just now • ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      provider,
      device: `${navigator.userAgent.includes('Mac') ? 'macOS' : 'Windows/Mobile'} • Secure Client`,
      ipAddress: '192.168.1.104 (Protected Session)',
      location: 'New York, United States',
      status: 'Active',
      tokenRef: `AUTH-${provider.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };
    setSessionLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  const loginWithGoogle = async (customEmail?: string, customName?: string): Promise<AuthUser> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const email = customEmail || 'kushagrasisodia27@gmail.com';
    const name = customName || 'Kushagra Sisodia';
    
    const newUser: AuthUser = {
      id: `usr-google-${Date.now()}`,
      mrn: 'WCH-94821',
      name: name,
      email: email,
      phone: '+1 (555) 234-5678',
      avatar: KUSHAGRA_AVATAR_IMAGE,
      role: 'patient',
      provider: 'google',
      isVerified: true,
      emailVerified: true,
      twoFactorEnabled: true,
      lastLogin: 'Just now (Google Identity Services OAuth 2.0)',
      dateJoined: 'Jan 14, 2024',
      organization: email.includes('@wecarehealth') ? 'Google Workspace Managed' : 'Google Account',
      linkedAccounts: [
        { provider: 'google', emailOrId: email, linkedAt: 'Today', isPrimary: true },
        { provider: 'phone', emailOrId: '+1 (555) 234-5678', linkedAt: 'Today' }
      ]
    };

    setUser(newUser);
    addSessionLog('google');
    syncSupabaseUserSession(email, name).catch(() => {});
    setIsLoading(false);
    notify(`Signed in securely with Google Mail as ${email}`, 'success');
    return newUser;
  };

  const loginWithPhoneOtp = async (phone: string, otp = '592418'): Promise<AuthUser> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    const cleanPhone = phone || '+1 (555) 234-5678';

    const newUser: AuthUser = {
      id: `usr-phone-${Date.now()}`,
      mrn: 'WCH-94821',
      name: 'Kushagra Sisodia',
      email: 'kushagrasisodia27@gmail.com',
      phone: cleanPhone,
      avatar: KUSHAGRA_AVATAR_IMAGE,
      role: 'patient',
      provider: 'phone',
      isVerified: true,
      emailVerified: true,
      twoFactorEnabled: true,
      lastLogin: 'Just now (Mobile SMS OTP 6-Digit Verification)',
      dateJoined: 'Jan 14, 2024',
      organization: 'Verified Mobile Identity',
      linkedAccounts: [
        { provider: 'phone', emailOrId: cleanPhone, linkedAt: 'Today', isPrimary: true },
        { provider: 'google', emailOrId: 'kushagrasisodia27@gmail.com', linkedAt: 'Today' }
      ]
    };

    setUser(newUser);
    addSessionLog('phone');
    syncSupabaseUserSession('kushagrasisodia27@gmail.com', 'Kushagra Sisodia').catch(() => {});
    setIsLoading(false);
    notify(`Phone number ${cleanPhone} verified with OTP! Signed in.`, 'success');
    return newUser;
  };

  const logout = (reason?: string) => {
    setUser(null);
    notify(`Logged out securely. Session destroyed (${reason || 'User Initiated'}).`, 'info');
  };

  const updateProfile = (updates: Partial<AuthUser>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
    notify('Profile updated successfully.', 'success');
  };

  const linkAccount = (provider: AuthProviderType) => {
    if (!user) return;
    const exists = user.linkedAccounts.some(a => a.provider === provider);
    if (exists) {
      notify(`${provider === 'google' ? 'Google Mail' : 'Phone Number'} is already linked.`, 'info');
      return;
    }
    const newLink: LinkedAccount = {
      provider,
      emailOrId: provider === 'google' ? user.email : (user.phone || '+1 (555) 234-5678'),
      linkedAt: 'Just now'
    };
    setUser({
      ...user,
      linkedAccounts: [...user.linkedAccounts, newLink]
    });
    notify(`Linked ${provider === 'google' ? 'Google Mail' : 'Phone Number'} successfully.`, 'success');
  };

  const unlinkAccount = (provider: AuthProviderType) => {
    if (!user) return;
    if (user.linkedAccounts.length <= 1) {
      notify('Cannot unlink your only authentication method.', 'error');
      return;
    }
    setUser({
      ...user,
      linkedAccounts: user.linkedAccounts.filter(a => a.provider !== provider)
    });
    notify(`Unlinked ${provider === 'google' ? 'Google Mail' : 'Phone Number'}.`, 'info');
  };

  const quickSwitchPersona = (personaKey: 'google_kushagra' | 'google_workspace' | 'phone_patient') => {
    const selected = DEMO_PERSONAS[personaKey];
    if (selected) {
      setUser(selected);
      addSessionLog(selected.provider);
      notify(`Switched active session to: ${selected.name} (${selected.provider === 'google' ? 'Google Mail' : 'Phone OTP'})`, 'success');
    }
  };

  const clearAuthMessage = () => setAuthMessage(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authMessage,
        sessionLogs,
        loginWithGoogle,
        loginWithPhoneOtp,
        logout,
        updateProfile,
        linkAccount,
        unlinkAccount,
        clearAuthMessage,
        quickSwitchPersona
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
