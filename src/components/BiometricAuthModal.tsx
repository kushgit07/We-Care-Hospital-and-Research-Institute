import React, { useState, useEffect } from 'react';
import { 
  ScanFace, 
  Fingerprint, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  KeyRound, 
  X, 
  Sparkles, 
  Cpu, 
  UserCheck, 
  Eye, 
  Camera,
  Smartphone,
  History,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock
} from 'lucide-react';
import { PatientProfile, BiometricActivityLog } from '../types/hospital';

export type BiometricMode = 'face' | 'fingerprint';
export type BiometricStatus = 'idle' | 'scanning' | 'success' | 'failed';

interface BiometricAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (method: 'Face ID' | 'Touch ID' | 'PIN Fallback' | 'Demo Fast-Auth') => void;
  patient: PatientProfile;
  activityLogs?: BiometricActivityLog[];
  title?: string;
  subtitle?: string;
}

export const BiometricAuthModal: React.FC<BiometricAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  patient,
  activityLogs = [],
  title = "Biometric Identity Verification",
  subtitle = "Authenticate to access confidential ICD-10 medical records & clinical notes"
}) => {
  const [mode, setMode] = useState<BiometricMode>('face');
  const [status, setStatus] = useState<BiometricStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Ready to scan');
  const [activeStep, setActiveStep] = useState(0);
  const [usePinFallback, setUsePinFallback] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showLogDrawer, setShowLogDrawer] = useState(false);

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setProgress(0);
      setStatusMessage(mode === 'face' ? 'Align your face within the frame' : 'Place and hold your finger on sensor');
      setActiveStep(0);
      setUsePinFallback(false);
      setPinInput('');
      setPinError(false);
      setShowLogDrawer(false);
    }
  }, [isOpen, mode]);

  // Handle auto-starting scan after small delay when opened or mode changed
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && status === 'idle' && !usePinFallback) {
      timer = setTimeout(() => {
        startScan();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isOpen, status, usePinFallback]);

  // Scanning progression simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'scanning') {
      const faceSteps = [
        "Detecting facial landmarks...",
        "Projecting 30,000 infrared dot matrix...",
        "Analyzing 3D depth geometry & pupil movement...",
        "Verifying anti-spoof liveness cryptographic signature...",
        "Biometric Hash Verified (Match: 99.98%)"
      ];

      const fingerSteps = [
        "Capacitive sensor activated...",
        "Mapping ridge & valley min-hash whorls...",
        "Measuring subsurface blood flow & pulse rate...",
        "Validating encrypted hardware key in Secure Enclave...",
        "Fingerprint Token Verified (Match: 99.99%)"
      ];

      const steps = mode === 'face' ? faceSteps : fingerSteps;

      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 4;
          const stepIndex = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
          setActiveStep(stepIndex);
          setStatusMessage(steps[stepIndex]);

          if (next >= 100) {
            clearInterval(interval);
            setStatus('success');
            setStatusMessage("Identity Confirmed • 256-Bit Session Unlocked");
            
            // Auto trigger success callback after brief celebration
            setTimeout(() => {
              onSuccess(mode === 'face' ? 'Face ID' : 'Touch ID');
              onClose();
            }, 1000);
            return 100;
          }
          return next;
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [status, mode, onSuccess, onClose]);

  if (!isOpen) return null;

  const startScan = () => {
    setStatus('scanning');
    setProgress(0);
    setActiveStep(0);
    setStatusMessage(mode === 'face' ? "Detecting facial landmarks..." : "Capacitive sensor activated...");
  };

  const handleSimulateFail = () => {
    setStatus('failed');
    setStatusMessage("Biometric mismatch or angle obstructed. Please try again or use PIN.");
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '2026' || pinInput.length >= 4) {
      setPinError(false);
      setStatus('success');
      setStatusMessage("PIN Authorized • Session Unlocked");
      setTimeout(() => {
        onSuccess('PIN Fallback');
        onClose();
      }, 700);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-heading text-white">{title}</h3>
              <p className="text-[11px] text-teal-300">Protected Health Information (PHI) Layer</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Patient Badge Info */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-3">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-10 h-10 rounded-xl object-cover border border-teal-500/50"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{patient.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">MRN: {patient.mrn}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>HIPAA Level 3</span>
              </span>
            </div>
          </div>

          {!usePinFallback ? (
            <>
              {/* Biometric Mode Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setMode('face');
                    setStatus('idle');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    mode === 'face'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ScanFace className="w-4 h-4" />
                  <span>Face ID</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('fingerprint');
                    setStatus('idle');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    mode === 'fingerprint'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>Touch ID</span>
                </button>
              </div>

              {/* Animated Biometric Scanning Viewport */}
              <div className="relative flex flex-col items-center justify-center py-6 px-4 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-inner overflow-hidden min-h-[220px]">
                
                {/* Background Ambient Glow & Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                {/* Status State Visuals */}
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center space-y-3 animate-in zoom-in duration-300">
                    <div className="w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-400 text-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <span className="text-sm font-bold text-teal-300 font-heading">
                      Biometric Match Verified
                    </span>
                  </div>
                ) : status === 'failed' ? (
                  <div className="flex flex-col items-center justify-center space-y-3 animate-in shake duration-300">
                    <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <AlertCircle className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-rose-300 font-heading">
                      Verification Unsuccessful
                    </span>
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center justify-center">
                    
                    {/* Face ID Viewport */}
                    {mode === 'face' && (
                      <div className="relative w-36 h-36 rounded-3xl border-2 border-teal-500/50 p-2 flex items-center justify-center overflow-hidden bg-slate-900/60 shadow-lg">
                        
                        {/* Target Reticle Corners */}
                        <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-teal-400" />
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-teal-400" />
                        <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-teal-400" />
                        <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-teal-400" />

                        {/* Patient Avatar or Face Silhouette in background */}
                        <img 
                          src={patient.avatar} 
                          alt="Face ID Preview" 
                          className="w-28 h-28 rounded-2xl object-cover opacity-60 filter grayscale contrast-125"
                        />

                        {/* Face Mesh Points Effect */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <ScanFace className={`w-24 h-24 transition-colors ${
                            status === 'scanning' ? 'text-teal-400/90' : 'text-slate-600'
                          }`} />
                        </div>

                        {/* Laser Scan Bar Animation */}
                        {status === 'scanning' && (
                          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_12px_#2dd4bf] animate-[scanLaser_1.8s_ease-in-out_infinite]" />
                        )}
                      </div>
                    )}

                    {/* Fingerprint Viewport */}
                    {mode === 'fingerprint' && (
                      <div className="relative w-36 h-36 rounded-full border-2 border-teal-500/40 flex items-center justify-center overflow-hidden bg-slate-900/80 shadow-lg group">
                        
                        {/* Concentric Pulse Rings */}
                        {status === 'scanning' && (
                          <>
                            <div className="absolute inset-2 rounded-full border border-teal-500/30 animate-ping opacity-30" />
                            <div className="absolute inset-0 rounded-full border-2 border-teal-400/60 animate-pulse" />
                          </>
                        )}

                        <Fingerprint className={`w-20 h-20 transition-all duration-300 ${
                          status === 'scanning' 
                            ? 'text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)] scale-105' 
                            : 'text-slate-500'
                        }`} />

                        {/* Scanning sweep */}
                        {status === 'scanning' && (
                          <div className="absolute inset-x-0 top-0 h-1 bg-teal-300 shadow-[0_0_10px_#2dd4bf] animate-[scanLaser_1.6s_ease-in-out_infinite]" />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Progress Bar & Status Text */}
                <div className="w-full mt-5 space-y-2 text-center px-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{mode === 'face' ? 'Apple/Android Biometric Protocol' : 'FIDO2 WebAuthn Enclave'}</span>
                    <span className="text-teal-400 font-bold">{progress}%</span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-150 ${
                        status === 'failed' ? 'bg-rose-500' : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className={`text-xs font-medium transition-colors ${
                    status === 'failed' 
                      ? 'text-rose-400' 
                      : status === 'success'
                        ? 'text-emerald-400 font-bold'
                        : 'text-teal-300'
                  }`}>
                    {statusMessage}
                  </p>
                </div>
              </div>

              {/* Action Buttons & Simulation Triggers */}
              <div className="space-y-2 pt-1">
                {status === 'idle' && (
                  <button
                    type="button"
                    onClick={startScan}
                    className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {mode === 'face' ? <ScanFace className="w-4 h-4" /> : <Fingerprint className="w-4 h-4" />}
                    <span>Start {mode === 'face' ? 'Face ID' : 'Touch ID'} Verification</span>
                  </button>
                )}

                {status === 'failed' && (
                  <button
                    type="button"
                    onClick={startScan}
                    className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry Biometric Scan</span>
                  </button>
                )}

                {status === 'scanning' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProgress(98);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Instant Match (Bypass)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSimulateFail}
                      className="px-3 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 font-bold text-xs transition-all"
                      title="Test Mismatch Flow"
                    >
                      Test Fail
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setUsePinFallback(true)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Use Security PIN Fallback</span>
                </button>
              </div>
            </>
          ) : (
            /* PIN Fallback Form */
            <form onSubmit={handlePinSubmit} className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                  Enter Patient Security PIN
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your 4-digit PIN associated with MRN {patient.mrn} (Default demo PIN: <strong>1234</strong>)
                </p>
              </div>

              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  placeholder="• • • •"
                  className={`w-full text-center text-2xl tracking-[0.5em] font-mono py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border focus:outline-none focus:ring-2 ${
                    pinError 
                      ? 'border-rose-500 focus:ring-rose-500/30' 
                      : 'border-slate-200 dark:border-slate-700 focus:ring-teal-500/30 focus:border-teal-500'
                  }`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-500 font-medium text-center mt-1.5 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect PIN. Try 1234 or your birth year.</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUsePinFallback(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Back to Biometrics
                </button>

                <button
                  type="submit"
                  disabled={!pinInput}
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all"
                >
                  Verify PIN
                </button>
              </div>
            </form>
          )}

          {/* Quick Collapsible Activity Log Drawer in Modal */}
          {activityLogs.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowLogDrawer(!showLogDrawer)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 py-1.5 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-teal-500" />
                  <span>Recent Biometric Logins ({activityLogs.length})</span>
                </div>
                {showLogDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showLogDrawer && (
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activityLogs.slice(0, 3).map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-[11px] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          {log.method === 'Face ID' ? (
                            <ScanFace className="w-3 h-3 text-teal-500" />
                          ) : log.method === 'Touch ID' ? (
                            <Fingerprint className="w-3 h-3 text-indigo-500" />
                          ) : (
                            <KeyRound className="w-3 h-3 text-amber-500" />
                          )}
                          {log.method}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 truncate">{log.device}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate">{log.location}</span>
                        <span className="font-mono text-teal-600 dark:text-teal-400">{log.enclaveRef}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Privacy Footnote */}
          <div className="pt-1 text-center">
            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-500" />
              <span>Biometric data processed on-device in hardware Secure Enclave. Zero raw imagery stored.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

