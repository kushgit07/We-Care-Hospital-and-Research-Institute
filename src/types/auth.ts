export type AuthProviderType = 'google' | 'phone';

export interface LinkedAccount {
  provider: AuthProviderType;
  emailOrId: string;
  linkedAt: string;
  isPrimary?: boolean;
}

export interface AuthSessionLog {
  id: string;
  timestamp: string;
  provider: AuthProviderType;
  device: string;
  ipAddress: string;
  location: string;
  status: 'Active' | 'Revoked' | 'Expired';
  tokenRef: string;
}

export interface AuthUser {
  id: string;
  mrn?: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: 'patient' | 'doctor' | 'staff' | 'admin';
  provider: AuthProviderType;
  isVerified: boolean;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin: string;
  linkedAccounts: LinkedAccount[];
  organization?: string;
  bio?: string;
  dateJoined: string;
}

export interface LoginOptions {
  provider: AuthProviderType;
  email?: string;
  phone?: string;
  otpCode?: string;
  rememberMe?: boolean;
  name?: string;
  avatar?: string;
}
