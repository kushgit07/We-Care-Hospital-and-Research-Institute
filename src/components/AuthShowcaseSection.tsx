import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  LogOut, 
  RefreshCw, 
  Zap, 
  ExternalLink,
  UserCheck,
  Check,
  Mail,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogo } from './auth/AuthIcons';

interface AuthShowcaseSectionProps {
  onOpenAuthModal: (mode?: 'google' | 'phone') => void;
  onOpenPatientPortal: () => void;
}

export const AuthShowcaseSection: React.FC<AuthShowcaseSectionProps> = ({
  onOpenAuthModal,
  onOpenPatientPortal
}) => {
  const { 
    user, 
    isAuthenticated, 
    isLoading,
    loginWithGoogle, 
    loginWithPhoneOtp,
    logout, 
    quickSwitchPersona 
  } = useAuth();

  return (
    <section id="patient-access" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden transition-colors">
      {/* Aesthetic Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 via-sky-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Google Mail & Phone Number OTP Authentication</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Fast, Secure & Streamlined Login <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Built for Effortless Patient Access
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Sign in instantly with your Google Mail account or verify your identity in seconds using your mobile phone number and SMS OTP code.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT 7-COLS: Google Mail & Phone OTP Methods */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-teal-600" />
                    <span>Choose Your Sign-In Method</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Two fast, HIPAA-compliant ways to authenticate and view your health records.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAuthModal('google')}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  <span>Open Sign In</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* 2 Focused Cards: Google Mail & Phone OTP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Google Mail & Workspace */}
                <div className="p-5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-2 border-teal-500/20 hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-4 group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 p-2.5 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      <GoogleLogo className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      OAuth 2.0 One-Tap
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Google Mail & Workspace</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Instant one-tap login with your @gmail.com or hospital Google Workspace account.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Zero passwords to remember</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Google Identity Services 256-Bit</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => loginWithGoogle('kushagrasisodia27@gmail.com', 'Kushagra Sisodia')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-800 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2 shadow-xs group-hover:border-teal-500"
                  >
                    <GoogleLogo className="w-4 h-4" />
                    <span>Login with Google Mail</span>
                  </button>
                </div>

                {/* 2. Mobile Phone Number OTP */}
                <div className="p-5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-2 border-sky-500/20 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-4 group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white p-2.5 shadow-sm flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      SMS & WhatsApp
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Phone Number OTP</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Receive an instant 6-digit verification code directly on your mobile device.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Works with all mobile carriers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Instant 30-second token expiration</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('phone')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-slate-800 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2 shadow-xs group-hover:border-sky-500"
                  >
                    <Smartphone className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:text-white" />
                    <span>Login with Mobile OTP</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Demo Persona Quick Selector */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-teal-600 animate-spin-slow" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Switch Active Identity Mode:
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => quickSwitchPersona('google_kushagra')}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 text-[11px] flex items-center gap-1.5"
                >
                  <GoogleLogo className="w-3 h-3" />
                  <span>Google User</span>
                </button>
                <button
                  type="button"
                  onClick={() => quickSwitchPersona('google_workspace')}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 text-[11px] flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-indigo-500" />
                  <span>Workspace</span>
                </button>
                <button
                  type="button"
                  onClick={() => quickSwitchPersona('phone_patient')}
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 text-[11px] flex items-center gap-1.5"
                >
                  <Smartphone className="w-3 h-3 text-sky-500" />
                  <span>Phone OTP</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 5-COLS: Live Authenticated Session Status Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white border border-teal-500/30 shadow-2xl space-y-6">
            
            {/* Top Status Ribbon */}
            <div className="flex items-center justify-between border-b border-teal-500/20 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono">
                  Live Patient Session
                </span>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                isAuthenticated 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {isAuthenticated ? '● Active Session (256-Bit)' : '○ Signed Out'}
              </span>
            </div>

            {/* Dynamic User Profile or Logged Out State */}
            {isAuthenticated && user ? (
              <div className="space-y-4">
                
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-950/70 border border-teal-500/30">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-400 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                  </div>

                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-white truncate font-heading">
                        {user.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    </div>
                    <p className="text-xs text-teal-200 truncate">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Patient MRN: <strong className="text-teal-300">{user.mrn || 'WCH-94821'}</strong>
                    </p>
                  </div>
                </div>

                {/* Session Security Details */}
                <div className="space-y-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Authenticated Via:</span>
                      <span className="text-teal-300 font-bold uppercase flex items-center gap-1">
                        {user.provider === 'google' ? (
                          <>
                            <GoogleLogo className="w-3 h-3" />
                            <span>Google Mail</span>
                          </>
                        ) : (
                          <>
                            <Smartphone className="w-3 h-3 text-sky-400" />
                            <span>Phone Number OTP</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Verified Contact:</span>
                      <span className="text-slate-200 font-mono">
                        {user.provider === 'phone' ? (user.phone || '+1 (555) 234-5678') : user.email}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Last Token Refresh:</span>
                      <span className="text-slate-300 truncate max-w-[180px]">{user.lastLogin}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onOpenPatientPortal}
                    className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-teal-950"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Open Patient Hub</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => logout('User requested session destruction')}
                    className="py-2.5 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/60 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    No Active Authentication Session
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Sign in with Google Mail or Mobile Phone OTP to access your electronic health record.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAuthModal('google')}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-teal-900/50 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Sign In (Google / Phone OTP)</span>
                </button>
              </div>
            )}

            {/* Bottom Security Compliance Footer */}
            <div className="pt-4 border-t border-teal-500/20 text-[10px] text-slate-400 space-y-1">
              <div className="flex items-center justify-between text-teal-300 font-semibold">
                <span>HIPAA 45 CFR § 164.312(d) Compliant</span>
                <span>Protected Health Information (PHI)</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                Tokens are validated with 256-bit TLS encryption with session expiration timers.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
