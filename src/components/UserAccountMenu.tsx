import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  Smartphone, 
  RefreshCw,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogo } from './auth/AuthIcons';

interface UserAccountMenuProps {
  onOpenAuthModal: (mode?: 'google' | 'phone') => void;
  onOpenPatientPortal: () => void;
  onOpenBooking: () => void;
  onOpenAIModal: () => void;
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({
  onOpenAuthModal,
  onOpenPatientPortal,
  onOpenBooking,
  onOpenAIModal
}) => {
  const { user, isAuthenticated, logout, quickSwitchPersona } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <button
        type="button"
        onClick={() => onOpenAuthModal('google')}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/70 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-bold transition-all border border-slate-200/80 dark:border-slate-700 shadow-xs group"
      >
        <GoogleLogo className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Logged in Profile Button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-all text-left group focus:outline-none"
      >
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover border border-teal-500/30"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
        </div>

        <div className="hidden sm:block text-left">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[110px] truncate">
              {user.name}
            </span>
            <div title={user.provider === 'google' ? 'Google Mail Auth' : 'Phone OTP Auth'}>
              {user.provider === 'google' ? (
                <GoogleLogo className="w-3.5 h-3.5" />
              ) : (
                <Smartphone className="w-3.5 h-3.5 text-sky-500" />
              )}
            </div>
          </div>
          <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium leading-none">
            {`MRN: ${user.mrn || 'WCH-94821'}`}
          </p>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 p-2 text-xs space-y-2">
          
          {/* User Profile Header Card */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50/80 via-slate-50 to-sky-50/50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 border border-teal-500/20 space-y-2">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-xl object-cover border-2 border-teal-500/40 shadow-sm"
              />
              <div className="overflow-hidden flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {user.name}
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
                  {user.email}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-teal-700 dark:text-teal-400 font-medium mt-0.5">
                  <span className="font-mono">{user.organization || 'Google Account'}</span>
                  <span>•</span>
                  <span className="uppercase font-bold">{user.provider === 'google' ? 'Google Mail' : 'Phone OTP'}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px]">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Patient</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono font-bold">
                {user.mrn}
              </span>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onOpenPatientPortal();
              }}
              className="w-full p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-between transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>My Patient Health Portal</span>
              </div>
              <span className="text-[10px] text-teal-600 font-bold">Open Hub</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onOpenBooking();
              }}
              className="w-full p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2 transition-colors text-left"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Book New Consultation</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onOpenAIModal();
              }}
              className="w-full p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2 transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Symptom Triage Check</span>
            </button>
          </div>

          {/* Connected Methods (Google Mail / Phone OTP) */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>Authentication Methods</span>
              <span className="text-teal-600">Google & Phone</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 shadow-xs">
                <GoogleLogo className="w-3.5 h-3.5" />
                <span>Google Mail</span>
              </span>
              <span className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 shadow-xs">
                <Smartphone className="w-3.5 h-3.5 text-sky-500" />
                <span>SMS OTP</span>
              </span>
            </div>
          </div>

          {/* Switch Identity Persona */}
          <div className="p-2 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-teal-700 dark:text-teal-300">
              <span>Switch Auth Profile:</span>
              <RefreshCw className="w-3 h-3 text-teal-500" />
            </div>

            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => quickSwitchPersona('google_kushagra')}
                className="p-1 rounded bg-white dark:bg-slate-900 text-left truncate hover:text-teal-600 font-medium"
              >
                Google: Kushagra
              </button>
              <button
                type="button"
                onClick={() => quickSwitchPersona('phone_patient')}
                className="p-1 rounded bg-white dark:bg-slate-900 text-left truncate hover:text-teal-600 font-medium"
              >
                Phone OTP User
              </button>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                logout('User clicked Sign Out');
              }}
              className="w-full p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out & Destroy Session</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
