import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  Check,
  RotateCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogo } from './auth/AuthIcons';
import { GoogleOneTapModal } from './auth/GoogleOneTapModal';
import { KUSHAGRA_AVATAR_IMAGE } from '../data/userAvatar';

interface ModernAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'google' | 'phone' | 'signin' | 'signup';
  onSuccess?: () => void;
}

export const ModernAuthModal: React.FC<ModernAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'google',
  onSuccess
}) => {
  const { 
    loginWithGoogle, 
    loginWithPhoneOtp, 
    isLoading 
  } = useAuth();

  const [authMethod, setAuthMethod] = useState<'google' | 'phone'>(
    initialMode === 'phone' ? 'phone' : 'google'
  );
  
  // Custom Google input
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  // Phone OTP Form
  const [phoneCountryCode, setPhoneCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('5552345678');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '9', '2', '4', '1', '8']);
  const [otpTimer, setOtpTimer] = useState(30);

  // Google One-Tap account picker sub-modal
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);

  if (!isOpen) return null;

  const handleSuccessfulAuth = () => {
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleSendPhoneOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setOtpSent(true);
    setOtpTimer(30);
  };

  const handleVerifyPhoneOtp = async () => {
    const fullPhone = `${phoneCountryCode} ${phoneNumber}`;
    await loginWithPhoneOtp(fullPhone, otpCode.join(''));
    handleSuccessfulAuth();
  };

  const handleGoogleClick = () => {
    setGooglePickerOpen(true);
  };

  const handleGoogleAccountSelected = async (selectedEmail: string, selectedName: string) => {
    await loginWithGoogle(selectedEmail, selectedName);
    handleSuccessfulAuth();
  };

  const handleCustomGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    const name = customGoogleEmail.split('@')[0].replace('.', ' ');
    await loginWithGoogle(customGoogleEmail, name);
    handleSuccessfulAuth();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 my-auto">
          
          {/* Header Bar */}
          <div className="p-6 pb-4 bg-gradient-to-b from-teal-50/70 via-slate-50/50 to-transparent dark:from-slate-800/60 dark:via-slate-900/40 dark:to-transparent border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white shadow-xs border border-slate-200/80 dark:border-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 font-mono">
                Secure Patient Portal Access
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white">
              {authMethod === 'google' ? 'Sign In with Google Mail' : 'Sign In with Mobile OTP'}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Choose your preferred authentication method to access your medical records and appointments.
            </p>

            {/* 2 Clean Toggle Tabs */}
            <div className="mt-4 grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('google');
                  setOtpSent(false);
                }}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  authMethod === 'google'
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 font-extrabold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Google Mail</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  authMethod === 'phone'
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 font-extrabold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Phone OTP</span>
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 space-y-5">
            
            {/* GOOGLE MAIL TAB */}
            {authMethod === 'google' && (
              <div className="space-y-4">
                
                {/* One-Click Google CTA */}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleGoogleClick}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white font-bold text-sm border-2 border-teal-500/40 dark:border-teal-500/30 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 relative group active:scale-[0.99]"
                >
                  <GoogleLogo className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Continue with Google Account</span>
                  <span className="ml-auto text-[10px] uppercase font-extrabold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-300 dark:border-teal-800">
                    One-Tap
                  </span>
                </button>

                {/* Instant Google Quick Accounts Box */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Quick Select Google Profile
                  </span>

                  <div 
                    onClick={() => handleGoogleAccountSelected('kushagrasisodia27@gmail.com', 'Kushagra Sisodia')}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:bg-teal-50/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={KUSHAGRA_AVATAR_IMAGE}
                        alt="Kushagra Sisodia"
                        className="w-10 h-10 rounded-xl object-cover border border-teal-500/40"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          Kushagra Sisodia
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          kushagrasisodia27@gmail.com
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 px-2 py-1 rounded-lg bg-teal-100/70 dark:bg-teal-950/80">
                      Default
                    </span>
                  </div>

                  <div 
                    onClick={() => handleGoogleAccountSelected('kushagra@wecarehealth.org', 'Kushagra Sisodia')}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:bg-teal-50/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold text-sm flex items-center justify-center">
                        KS
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          Kushagra (Workspace)
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          kushagra@wecarehealth.org
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-lg bg-indigo-100/70 dark:bg-indigo-950/80">
                      Workspace
                    </span>
                  </div>
                </div>

                {/* Custom Google Email Option */}
                {!showCustomGoogleInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomGoogleInput(true)}
                    className="w-full text-center text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline pt-1"
                  >
                    + Use another Google account
                  </button>
                ) : (
                  <form onSubmit={handleCustomGoogleSubmit} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Enter Google Email Address
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="name@gmail.com"
                          value={customGoogleEmail}
                          onChange={(e) => setCustomGoogleEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

            {/* PHONE NUMBER OTP TAB */}
            {authMethod === 'phone' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendPhoneOtp} className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2.5">
                      <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>
                        Enter your mobile number to receive a secure 6-digit verification code via SMS or WhatsApp.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Mobile Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={phoneCountryCode}
                          onChange={(e) => setPhoneCountryCode(e.target.value)}
                          className="px-2.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold focus:outline-none"
                        >
                          <option value="+1">🇺🇸 +1 (US)</option>
                          <option value="+91">🇮🇳 +91 (IN)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+61">🇦🇺 +61 (AU)</option>
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="555-234-5678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Send 6-Digit OTP Code</span>
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 flex items-center justify-center mx-auto">
                      <Smartphone className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Enter 6-Digit Verification Code
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Sent to {phoneCountryCode} {phoneNumber}
                      </p>
                    </div>

                    <div className="flex justify-center gap-1.5 sm:gap-2 py-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value;
                            const copy = [...otpCode];
                            copy[idx] = val;
                            setOtpCode(copy);
                          }}
                          className="w-9 sm:w-10 h-12 text-center text-lg font-bold font-mono rounded-xl border-2 border-teal-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                      <span>Resend code in</span>
                      <strong className="text-teal-600 dark:text-teal-400">{otpTimer}s</strong>
                    </div>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={handleVerifyPhoneOtp}
                      className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Access Patient Hub</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs font-semibold text-slate-500 hover:underline inline-block"
                    >
                      Change phone number
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Modal Footer Security Badge */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Identity & SMS Direct • HIPAA Compliant</span>
            </div>
            <span className="font-semibold text-teal-600 dark:text-teal-400">256-Bit SSL</span>
          </div>

        </div>
      </div>

      {/* Google One-Tap Modal */}
      <GoogleOneTapModal
        isOpen={googlePickerOpen}
        onClose={() => setGooglePickerOpen(false)}
        onSelectAccount={handleGoogleAccountSelected}
      />
    </>
  );
};
