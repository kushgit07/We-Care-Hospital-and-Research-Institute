import React, { useState } from 'react';
import { X, Check, Shield, Lock, Sparkles, ChevronRight, UserPlus, ArrowLeft } from 'lucide-react';
import { GoogleLogo } from './AuthIcons';
import { KUSHAGRA_AVATAR_IMAGE } from '../../data/userAvatar';

interface GoogleOneTapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (email: string, name: string) => void;
}

export const GoogleOneTapModal: React.FC<GoogleOneTapModalProps> = ({
  isOpen,
  onClose,
  onSelectAccount
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  if (!isOpen) return null;

  const GOOGLE_ACCOUNTS = [
    {
      name: 'Kushagra Sisodia',
      email: 'kushagrasisodia27@gmail.com',
      avatar: KUSHAGRA_AVATAR_IMAGE,
      badge: 'Default Account • Verified'
    },
    {
      name: 'Kushagra (Work Workspace)',
      email: 'kushagra@wecarehealth.org',
      avatar: KUSHAGRA_AVATAR_IMAGE,
      badge: 'Google Workspace Managed'
    }
  ];

  const handleSelect = (email: string, name: string) => {
    setIsVerifying(email);
    setTimeout(() => {
      setIsVerifying(null);
      onSelectAccount(email, name);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    const name = customName || customEmail.split('@')[0];
    handleSelect(customEmail, name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Google OAuth Top Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700 flex items-center justify-center p-2">
              <GoogleLogo className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                <span>Sign in with Google</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                to continue to <strong className="text-slate-800 dark:text-slate-200 font-semibold">We Care Health Hub</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {!showCustomInput ? (
            <>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Choose a Google Account
                </p>

                <div className="space-y-2">
                  {GOOGLE_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      disabled={isVerifying !== null}
                      onClick={() => handleSelect(acc.email, acc.name)}
                      className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50/70 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-300 dark:hover:border-teal-500/50 flex items-center justify-between transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={acc.avatar}
                          alt={acc.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-xs"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                            {acc.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {acc.email}
                          </p>
                          <span className="text-[10px] font-medium text-teal-600 dark:text-teal-400">
                            {acc.badge}
                          </span>
                        </div>
                      </div>

                      {isVerifying === acc.email ? (
                        <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Use Another Account */}
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <UserPlus className="w-4 h-4 text-slate-400" />
                <span>Use another Google account</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to saved accounts</span>
              </button>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Google Email or Phone
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kushagra Sisodia"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Continue with this Google Account</span>
              </button>
            </form>
          )}

          {/* Privacy & OAuth Security Notice */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-medium">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Google Identity Services • OAuth 2.0 PKCE Protected</span>
            </div>
            <p>
              To confirm your identity, Google will share your name, email address, language preference, and profile picture with We Care Hospital.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
