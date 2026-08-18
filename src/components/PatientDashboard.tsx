import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Activity, 
  Pill, 
  CreditCard, 
  Heart, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  QrCode, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Stethoscope, 
  Plus, 
  Search, 
  Printer, 
  Share2, 
  RefreshCw, 
  ArrowUpRight, 
  Info, 
  Sparkles, 
  Lock, 
  Unlock,
  LogOut, 
  SlidersHorizontal,
  Flame,
  FileCheck,
  AlertCircle,
  Eye,
  Check,
  Building2,
  Trash2,
  ScanFace,
  Fingerprint,
  KeyRound,
  ShieldAlert,
  History,
  Laptop,
  Smartphone,
  Globe,
  FileCheck2,
  Shield
} from 'lucide-react';
import { 
  PatientProfile, 
  MedicalRecordEntry, 
  LabResultReport, 
  PrescriptionItem, 
  Appointment,
  BiometricActivityLog,
  ConsultationReport
} from '../types/hospital';
import { 
  PATIENT_PROFILES, 
  PATIENT_MEDICAL_RECORDS, 
  PATIENT_LAB_RESULTS, 
  PATIENT_PRESCRIPTIONS,
  PATIENT_BIOMETRIC_LOGS
} from '../data/patientData';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { INITIAL_CONSULTATION_REPORTS } from '../data/consultationReportsData';
import { BiometricAuthModal } from './BiometricAuthModal';
import { ConsultationReportModal } from './ConsultationReportModal';

interface PatientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenBooking: (deptId?: string, docId?: string) => void;
  onOpenAIAssistant?: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onOpenBooking,
  onOpenAIAssistant
}) => {
  // Current patient profile state
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pt-1');
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'reports' | 'history' | 'labs' | 'prescriptions' | 'billing'>('overview');
  
  // Consultation Reports State
  const [consultReports, setConsultReports] = useState<ConsultationReport[]>(INITIAL_CONSULTATION_REPORTS);
  const [selectedConsultReport, setSelectedConsultReport] = useState<ConsultationReport | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  // Biometric authentication state for sensitive clinical records
  const [isBiometricVerified, setIsBiometricVerified] = useState<boolean>(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [biometricFeedback, setBiometricFeedback] = useState<string | null>(null);

  // Biometric Activity Logs state
  const [biometricLogsMap, setBiometricLogsMap] = useState<Record<string, BiometricActivityLog[]>>(PATIENT_BIOMETRIC_LOGS);
  const [historySubTab, setHistorySubTab] = useState<'records' | 'activity_log'>('records');
  const [logMethodFilter, setLogMethodFilter] = useState<'all' | 'Face ID' | 'Touch ID' | 'PIN Fallback'>('all');
  const [auditExportMsg, setAuditExportMsg] = useState<string | null>(null);

  // Selected lab report for detailed modal view
  const [selectedLabReport, setSelectedLabReport] = useState<LabResultReport | null>(null);
  
  // Selected medical record for detailed clinical notes view
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecordEntry | null>(null);

  // Search & Filter state
  const [labSearchQuery, setLabSearchQuery] = useState('');
  const [labCategoryFilter, setLabCategoryFilter] = useState('all');
  const [historyFilter, setHistoryFilter] = useState('all');

  // Refill request simulation state
  const [refillSuccessMsg, setRefillSuccessMsg] = useState<string | null>(null);

  // Digital Health Pass Modal state
  const [activeHealthPass, setActiveHealthPass] = useState<Appointment | null>(null);

  // Download simulation feedback
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedLabReport) {
          setSelectedLabReport(null);
        } else if (selectedRecord) {
          setSelectedRecord(null);
        } else if (activeHealthPass) {
          setActiveHealthPass(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedLabReport, selectedRecord, activeHealthPass, onClose]);

  if (!isOpen) return null;

  const currentPatient: PatientProfile = 
    PATIENT_PROFILES.find(p => p.id === selectedPatientId) || PATIENT_PROFILES[0];

  const medicalHistory: MedicalRecordEntry[] = 
    PATIENT_MEDICAL_RECORDS[currentPatient.id] || [];

  const labReports: LabResultReport[] = 
    PATIENT_LAB_RESULTS[currentPatient.id] || [];

  const prescriptions: PrescriptionItem[] = 
    PATIENT_PRESCRIPTIONS[currentPatient.id] || [];

  // Filter patient-specific appointments or fall back to global appointment list
  const patientAppointments = appointments.length > 0 ? appointments : [
    {
      id: 'app-seed-1',
      patientName: currentPatient.name,
      patientEmail: currentPatient.email,
      patientPhone: currentPatient.phone,
      patientAge: currentPatient.age,
      patientGender: currentPatient.gender,
      departmentId: 'dept-cardio',
      departmentName: 'Cardiology & Heart Vascular Institute',
      doctorId: 'doc-1',
      doctorName: 'Dr. Arthur Vance, MD, FACC',
      date: '2026-08-20',
      timeSlot: '10:30 AM',
      type: 'In-Person Consultation',
      symptoms: 'Routine cardiovascular follow-up, lipid review & blood pressure check.',
      status: 'Confirmed',
      paymentStatus: 'Covered by Insurance',
      fee: 250,
      tokenNumber: 14,
      qrCodeSeed: 'WC-PASS-8492-2026',
      createdAt: '2026-08-14T09:00:00Z'
    }
  ];

  const handleRequestRefill = (medName: string) => {
    setRefillSuccessMsg(`Prescription refill request for "${medName}" sent directly to We Care Hospital Pharmacy. Verification pending with Dr. ${currentPatient.primaryDoctor.name}.`);
    setTimeout(() => {
      setRefillSuccessMsg(null);
    }, 4500);
  };

  const handleDownloadReport = (title: string) => {
    setDownloadSuccess(`Downloading encrypted PDF: "${title}"...`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  const handleBiometricSuccess = (method: 'Face ID' | 'Touch ID' | 'PIN Fallback' | 'Demo Fast-Auth') => {
    setIsBiometricVerified(true);
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newLogEntry: BiometricActivityLog = {
      id: `bio-log-${Date.now()}`,
      patientId: currentPatient.id,
      timestamp: `Today (${dateStr}) at ${timeStr} • Just now`,
      method: method,
      device: method === 'Face ID' 
        ? 'Apple iPhone 16 Pro Max • iOS 19.4' 
        : method === 'Touch ID' 
          ? 'MacBook Pro 16" (M3 Max) • Touch ID WebAuthn' 
          : method === 'PIN Fallback' 
            ? 'Patient Security PIN Auth (Client Key)'
            : 'Demo Fast-Auth Instant Verification',
      ipAddress: '192.168.1.104 (Protected Session)',
      location: 'New York, NY (Hospital Campus Wi-Fi)',
      status: 'Authorized',
      confidenceScore: method === 'Face ID' ? 99.98 : method === 'Touch ID' ? 99.99 : 100.0,
      enclaveRef: `SEC-ENC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
    };

    setBiometricLogsMap(prev => ({
      ...prev,
      [currentPatient.id]: [newLogEntry, ...(prev[currentPatient.id] || [])]
    }));

    setBiometricFeedback(`Identity verified via ${method}. Protected records decrypted.`);
    setTimeout(() => setBiometricFeedback(null), 4000);
  };

  const handleExportAuditLogs = () => {
    setAuditExportMsg("Exporting cryptographic biometric audit log (JSON format with SHA-256 signatures)...");
    setTimeout(() => {
      setAuditExportMsg(null);
      handleDownloadReport(`Biometric_Audit_Trail_${currentPatient.mrn}.json`);
    }, 1500);
  };

  const currentPatientLogs = biometricLogsMap[currentPatient.id] || [];
  const filteredLogs = currentPatientLogs.filter(log => logMethodFilter === 'all' || log.method === logMethodFilter);

  const filteredLabReports = labReports.filter(lab => {
    const matchesSearch = lab.testName.toLowerCase().includes(labSearchQuery.toLowerCase()) ||
      lab.parameters.some(p => p.name.toLowerCase().includes(labSearchQuery.toLowerCase()));
    const matchesCat = labCategoryFilter === 'all' || lab.category === labCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredHistory = medicalHistory.filter(rec => {
    if (historyFilter === 'all') return true;
    return rec.encounterType === historyFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 my-auto flex flex-col justify-between">
        
        {/* Top Header / Profile Ribbon */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-t-3xl border-b border-slate-800 relative">
          
          {/* Close & Security Indicators */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>256-Bit HIPAA & NABH Secure</span>
              </span>

              {/* Biometric Security Status Trigger Pill */}
              {isBiometricVerified ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsBiometricVerified(false);
                    setBiometricFeedback("Biometric session closed. Encrypted records locked.");
                    setTimeout(() => setBiometricFeedback(null), 4000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold transition-all group"
                  title="Click to lock sensitive medical records"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400 group-hover:hidden" />
                  <Lock className="w-3.5 h-3.5 text-rose-400 hidden group-hover:inline" />
                  <span className="group-hover:hidden">Biometrics: Verified</span>
                  <span className="hidden group-hover:inline text-rose-300">Click to Lock</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsBiometricModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[11px] font-bold transition-all animate-pulse"
                  title="Verify with Face ID or Touch ID"
                >
                  <ScanFace className="w-3.5 h-3.5 text-amber-400" />
                  <span>Biometric: Locked</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Profile Switcher Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
                <User className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] text-slate-400 hidden sm:inline">Switch Account:</span>
                <select
                  value={selectedPatientId}
                  onChange={(e) => {
                    setSelectedPatientId(e.target.value);
                    setIsBiometricVerified(false);
                    setBiometricFeedback("Patient profile switched. Biometric lock reinstated for PHI records.");
                    setTimeout(() => setBiometricFeedback(null), 4000);
                  }}
                  className="bg-transparent text-xs text-white font-bold focus:outline-none cursor-pointer"
                >
                  {PATIENT_PROFILES.map(p => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      {p.name} ({p.mrn})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Close Dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Patient Bio Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentPatient.avatar}
                alt={currentPatient.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                    {currentPatient.name}
                  </h2>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-teal-900/60 border border-teal-700 text-teal-300">
                    MRN: {currentPatient.mrn}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-rose-950 border border-rose-800 text-rose-300">
                    Blood: {currentPatient.bloodGroup}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                  <span>Age: {currentPatient.age} yrs ({currentPatient.gender})</span>
                  <span>•</span>
                  <span>Primary: {currentPatient.primaryDoctor.name}</span>
                  <span>•</span>
                  <span className="text-teal-300 font-semibold">{currentPatient.insurance.provider}</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Ribbon */}
          <div className="mt-6 pt-3 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-semibold">
            {[
              { id: 'overview', label: 'Health Overview', icon: Activity },
              { id: 'appointments', label: `Appointments (${patientAppointments.length})`, icon: Calendar },
              { id: 'reports', label: `Doctor Reports & Rx (${consultReports.length})`, icon: FileCheck2 },
              { 
                id: 'history', 
                label: `Medical History (${medicalHistory.length})`, 
                icon: FileText,
                isProtected: true 
              },
              { id: 'labs', label: `Diagnostic Labs (${labReports.length})`, icon: FileCheck },
              { id: 'prescriptions', label: `Medications (${prescriptions.length})`, icon: Pill },
              { id: 'billing', label: 'Cashless Insurance & Claims', icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.isProtected && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      isBiometricVerified 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                        : 'bg-amber-950 text-amber-300 border border-amber-700'
                    }`}>
                      {isBiometricVerified ? '🔓' : '🔒'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Biometric Notification Banner */}
        {biometricFeedback && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{biometricFeedback}</span>
          </div>
        )}

        {/* Global Feedback Notifications */}
        {refillSuccessMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>{refillSuccessMsg}</span>
          </div>
        )}

        {downloadSuccess && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2 animate-in fade-in">
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 animate-bounce" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Main Dashboard Content Area */}
        <div className="p-6 flex-1 space-y-6">
          
          {/* TAB 1: HEALTH OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Telemetry Vitals Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Live Telemetry & Vital Signs
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Recorded: {currentPatient.vitals.lastRecorded}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {/* Blood Pressure */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Blood Pressure
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPatient.vitals.bloodPressure.systolic}/{currentPatient.vitals.bloodPressure.diastolic}
                      </span>
                      <span className="text-[10px] text-slate-400">mmHg</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 mt-2">
                      {currentPatient.vitals.bloodPressure.status}
                    </span>
                  </div>

                  {/* Heart Rate */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Resting Pulse
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPatient.vitals.heartRate.value}
                      </span>
                      <span className="text-[10px] text-slate-400">bpm</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 mt-2">
                      Optimal
                    </span>
                  </div>

                  {/* Blood Oxygen */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Oxygen SpO2
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPatient.vitals.spO2.value}
                      </span>
                      <span className="text-[10px] text-slate-400">%</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 mt-2">
                      Normal
                    </span>
                  </div>

                  {/* Blood Glucose */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Fasting Glucose
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPatient.vitals.bloodGlucose.value}
                      </span>
                      <span className="text-[10px] text-slate-400">mg/dL</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 mt-2">
                      Euglycemic
                    </span>
                  </div>

                  {/* BMI */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Body Mass (BMI)
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPatient.vitals.bmi.value}
                      </span>
                      <span className="text-[10px] text-slate-400">kg/m²</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 mt-2">
                      Healthy Range
                    </span>
                  </div>

                  {/* HbA1c */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Glycated HbA1c
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
                        {currentPatient.vitals.hba1c?.value || 5.3}
                      </span>
                      <span className="text-[10px] text-slate-400">%</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 mt-2">
                      Optimal
                    </span>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Clinical Alerts & Upcoming Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Col: Next Upcoming Consultation & Live Token */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>Next Scheduled Consultation</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  {patientAppointments.length > 0 ? (
                    <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500 text-slate-950">
                            Live Token #{patientAppointments[0].tokenNumber}
                          </span>
                          <h4 className="text-lg font-bold font-heading text-white mt-2">
                            {patientAppointments[0].doctorName}
                          </h4>
                          <p className="text-xs text-teal-300">
                            {patientAppointments[0].departmentName}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-black font-mono text-white">
                            {patientAppointments[0].date}
                          </p>
                          <p className="text-xs text-slate-400">
                            {patientAppointments[0].timeSlot}
                          </p>
                        </div>
                      </div>

                      {/* Live Queue status box */}
                      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-teal-400">
                          <Clock className="w-4 h-4" />
                          <span>Clinic Queue: <strong>2 patients ahead</strong></span>
                        </div>
                        <span className="text-slate-300 font-mono">Room 304, Tower A</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setActiveHealthPass(patientAppointments[0])}
                          className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>Digital Health Pass</span>
                        </button>

                        <button
                          onClick={() => handleDownloadReport('Appointment Summary')}
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                          title="Download Calendar Reminder"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                      <p className="text-xs text-slate-500">No appointments scheduled.</p>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenBooking();
                        }}
                        className="text-xs font-bold text-teal-600 hover:underline"
                      >
                        + Book Consultation Now
                      </button>
                    </div>
                  )}

                  {/* Active Care Instructions / AI Insights */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/80 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                        Personalized Care Protocol
                      </h5>
                      <p className="text-xs text-indigo-950 dark:text-indigo-300 leading-relaxed">
                        Your latest lipid NMR biomarkers show stable plaque dynamics. Maintain 150 minutes of Zone-2 cardio weekly and remember to complete your fasting lipid panel 48 hours prior to your February follow-up.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Col: Allergies, Chronic Conditions & Emergency Contact */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Safety Profile & Contacts</span>
                  </h4>

                  {/* Allergies Card */}
                  <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Documented Drug Allergies</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentPatient.allergies.map((allergy, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-900/80 text-rose-900 dark:text-rose-200 text-xs font-bold"
                        >
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chronic Conditions */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Ongoing Conditions
                    </span>
                    <div className="space-y-1">
                      {currentPatient.chronicConditions.map((cond, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{cond}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Emergency Contact
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {currentPatient.emergencyContact.name} ({currentPatient.emergencyContact.relationship})
                      </p>
                      <p className="text-xs font-mono text-teal-600 dark:text-teal-400">
                        {currentPatient.emergencyContact.phone}
                      </p>
                    </div>
                    <a
                      href={`tel:${currentPatient.emergencyContact.phone}`}
                      className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 hover:bg-teal-200 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Biometric Security & Login Activity Overview Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950/80 to-slate-900 border border-teal-500/30 text-white space-y-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
                          <ScanFace className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold font-heading text-white">Biometric Login Security</h5>
                          <p className="text-[10px] text-teal-300">FIDO2 Secure Enclave Protected</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isBiometricVerified 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                      }`}>
                        {isBiometricVerified ? 'Unlocked (Active)' : 'Protected'}
                      </span>
                    </div>

                    {currentPatientLogs.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-teal-500/20 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-teal-400" />
                            <span>Last Authorized:</span>
                          </span>
                          <span className="text-white font-semibold">{currentPatientLogs[0].timestamp.split('•')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1">
                            {currentPatientLogs[0].method === 'Face ID' ? (
                              <ScanFace className="w-3 h-3 text-teal-400" />
                            ) : currentPatientLogs[0].method === 'Touch ID' ? (
                              <Fingerprint className="w-3 h-3 text-teal-400" />
                            ) : (
                              <KeyRound className="w-3 h-3 text-amber-400" />
                            )}
                            <span>Auth Method:</span>
                          </span>
                          <span className="font-mono text-teal-300 font-bold">{currentPatientLogs[0].method}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>Enclave Ref:</span>
                          <span className="text-slate-300">{currentPatientLogs[0].enclaveRef || 'SEC-ENC-7F4A-981'}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('history');
                          setHistorySubTab('activity_log');
                          if (!isBiometricVerified) {
                            setIsBiometricModalOpen(true);
                          }
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-teal-900/50"
                      >
                        <History className="w-3.5 h-3.5" />
                        <span>View Biometric Activity Log</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    Your Scheduled Consultations & Hospital Passes
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live digital queue tracking, express check-in passes, and reschedule requests.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>

              {patientAppointments.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No Active Appointments Found</p>
                  <p className="text-xs text-slate-500 mt-1">Book your doctor consultation in under 60 seconds.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patientAppointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-md hover:border-teal-400 dark:hover:border-teal-500 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] font-black uppercase tracking-wider">
                            Live Token #{app.tokenNumber}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                            {app.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            • {app.type}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                          {app.doctorName}
                        </h4>
                        <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">
                          {app.departmentName}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                            {app.date}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-sky-600" />
                            {app.timeSlot}
                          </span>
                          <span>•</span>
                          <span>Fee: ${app.fee || 250} ({app.paymentStatus})</span>
                        </div>

                        {app.symptoms && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 mt-2">
                            <strong>Symptoms:</strong> {app.symptoms}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700">
                        <button
                          onClick={() => setActiveHealthPass(app)}
                          className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>Health Pass</span>
                        </button>

                        <button
                          onClick={() => onCancelAppointment(app.id)}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Cancel Consultation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: DOCTOR CONSULTATION REPORTS & ENCOUNTER SUMMARIES */}
          {activeTab === 'reports' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-teal-600" />
                    <span>Doctor Consultation Reports & Medical Encounter Summaries</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official clinical summaries generated post-consultation with ICD-10 diagnosis, prescribed medications, clinical vitals, and physician digital signature.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedConsultReport(null);
                    setIsConsultModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate New Report</span>
                </button>
              </div>

              {/* Consultation Reports List */}
              <div className="space-y-4">
                {consultReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-md hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all space-y-4"
                  >
                    {/* Top Row: Report ID, Date & Doctor */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                            {report.reportNumber}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {report.consultationType}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {report.encounterDate}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          {report.doctorName}
                        </h4>
                        <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                          {report.doctorTitle} • {report.departmentName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedConsultReport(report);
                            setIsConsultModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Official Report</span>
                        </button>
                      </div>
                    </div>

                    {/* Middle: Diagnosis & Vitals Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 md:col-span-2 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Provisional Diagnosis & ICD-10
                        </span>
                        <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {report.provisionalDiagnosis}
                        </p>
                        <p className="text-[11px] font-mono text-teal-700 dark:text-teal-300">
                          {report.icd10Code}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Encounter Vitals Snapshot
                        </span>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">BP:</span>
                          <strong className="font-mono">{report.vitals.bp}</strong>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Pulse / SpO2:</span>
                          <strong className="font-mono">{report.vitals.pulse} • {report.vitals.spo2}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Prescribed Medications Summary Chips */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Prescribed Medications ({report.prescribedMedications.length}):
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {report.prescribedMedications.map((med, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Pill className="w-3 h-3 text-teal-600" />
                            <span>{med.name}</span>
                            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-normal">({med.frequency})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom verification badge */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Digitally Signed by {report.doctorName}</span>
                      </div>
                      <span className="text-slate-400">
                        Next Review: <strong>{report.followUpDate}</strong>
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MEDICAL HISTORY (Biometrically Protected PHI Layer) */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              
              {!isBiometricVerified ? (
                /* BIOMETRIC LOCKED GATE SCREEN */
                <div className="space-y-6">
                  {/* Security Vault Banner */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white border border-teal-500/30 shadow-2xl relative overflow-hidden text-center">
                    
                    {/* Background Radar & Tech Mesh */}
                    <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative max-w-xl mx-auto space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400/40 text-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <Lock className="w-8 h-8" />
                      </div>

                      <div className="space-y-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                          <span>Protected Health Information (PHI) Layer</span>
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                          Biometric Authentication Required
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          In compliance with HIPAA 45 CFR § 164.312 and NABH standards, confidential diagnostic histories, ICD-10 encounter codes, and physician progress notes are cryptographically protected.
                        </p>
                      </div>

                      {/* Biometric Trigger Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsBiometricModalOpen(true)}
                          className="p-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-900/40 transition-all flex items-center justify-center gap-2.5 group"
                        >
                          <ScanFace className="w-5 h-5 text-teal-200 group-hover:scale-110 transition-transform" />
                          <span>Verify with Face ID</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsBiometricModalOpen(true)}
                          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 hover:border-teal-500/40 transition-all flex items-center justify-center gap-2.5 group"
                        >
                          <Fingerprint className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                          <span>Verify with Touch ID</span>
                        </button>
                      </div>

                      {/* Instant match & PIN fallback */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs">
                        <button
                          type="button"
                          onClick={() => handleBiometricSuccess('Demo Fast-Auth')}
                          className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 hover:underline"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Instant Demo Unlock</span>
                        </button>

                        <span className="text-slate-600">•</span>

                        <button
                          type="button"
                          onClick={() => setIsBiometricModalOpen(true)}
                          className="text-slate-400 hover:text-slate-200 font-semibold flex items-center gap-1"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>Use Patient Security PIN</span>
                        </button>
                      </div>

                      {/* Recent Biometric Audit History Preview in Locked State */}
                      {currentPatientLogs.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-800 text-left bg-slate-950/60 p-4 rounded-2xl border border-teal-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                              <History className="w-3.5 h-3.5" />
                              <span>Recent Authenticated Sessions Log</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {currentPatientLogs.length} total logged
                            </span>
                          </div>

                          <div className="space-y-2">
                            {currentPatientLogs.slice(0, 2).map((log) => (
                              <div key={log.id} className="flex items-center justify-between text-xs bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                                <div className="flex items-center gap-2">
                                  {log.method === 'Face ID' ? (
                                    <ScanFace className="w-3.5 h-3.5 text-teal-400" />
                                  ) : log.method === 'Touch ID' ? (
                                    <Fingerprint className="w-3.5 h-3.5 text-teal-400" />
                                  ) : (
                                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                                  )}
                                  <span className="font-semibold text-slate-200">{log.method}</span>
                                  <span className="text-[11px] text-slate-400">• {log.timestamp.split('•')[0]}</span>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                                  {log.status}
                                </span>
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-slate-400 text-center mt-2.5">
                            Full cryptographic audit trail is unlocked upon successful biometric verification.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Encrypted Obfuscated Teaser Preview */}
                  <div className="space-y-3 opacity-60 filter blur-[1.5px] pointer-events-none select-none">
                    <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
                      </div>
                      <div className="h-5 w-3/4 bg-slate-300 dark:bg-slate-700 rounded font-mono text-xs">
                        ENC-AES256::7e89ab01ff9283401... [LOCKED]
                      </div>
                      <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-40 bg-slate-300 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
                      </div>
                      <div className="h-5 w-2/3 bg-slate-300 dark:bg-slate-700 rounded font-mono text-xs">
                        ENC-AES256::92bc018274acb4920... [LOCKED]
                      </div>
                      <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                </div>
              ) : (
                /* BIOMETRICALLY UNLOCKED FULL CLINICAL HISTORY & ACTIVITY LOG */
                <div className="space-y-4 animate-in fade-in duration-300">
                  
                  {/* Verified Session Status Ribbon */}
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                            Biometrically Decrypted Session Active
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                            FIDO2 Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                          Attending physician notes and cryptographic access audit trail unlocked.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsBiometricVerified(false);
                          setBiometricFeedback("Medical history session locked.");
                          setTimeout(() => setBiometricFeedback(null), 3000);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900 hover:bg-rose-100 dark:hover:bg-rose-950 text-emerald-800 dark:text-emerald-200 hover:text-rose-800 dark:hover:text-rose-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock Records</span>
                      </button>
                    </div>
                  </div>

                  {/* Sub-navigation Switch: Clinical Records vs Biometric Activity Log */}
                  <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setHistorySubTab('records')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        historySubTab === 'records'
                          ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm border border-slate-200 dark:border-slate-700'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Clinical Encounters & Notes</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                        {filteredHistory.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHistorySubTab('activity_log')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        historySubTab === 'activity_log'
                          ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm border border-slate-200 dark:border-slate-700'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>Biometric Login Activity Log</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {currentPatientLogs.length}
                      </span>
                    </button>
                  </div>

                  {/* SUB-VIEW 1: CLINICAL ENCOUNTERS */}
                  {historySubTab === 'records' && (
                    <div className="space-y-4">
                      {/* Filter bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div>
                          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                            Chronological Clinical Encounters & Hospital Records
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Comprehensive ICD-10 coded diagnostic history and clinical progress notes.
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-400">Type:</span>
                          <select
                            value={historyFilter}
                            onChange={(e) => setHistoryFilter(e.target.value)}
                            className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                          >
                            <option value="all">All Encounters</option>
                            <option value="Outpatient Consultation">Outpatient</option>
                            <option value="Inpatient Admission">Inpatient</option>
                            <option value="Telehealth Review">Telehealth</option>
                          </select>
                        </div>
                      </div>

                      {/* Chronological Timeline */}
                      <div className="relative border-l-2 border-teal-500/40 ml-4 space-y-6 py-2">
                        {filteredHistory.map((rec) => (
                          <div key={rec.id} className="relative pl-6 group">
                            <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-teal-500 border-2 border-white dark:border-slate-900 shadow-sm" />

                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                                    {rec.encounterType}
                                  </span>
                                  <span className="text-xs font-mono font-bold text-slate-400">
                                    ICD-10: {rec.icd10Code}
                                  </span>
                                </div>
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                  {rec.date}
                                </span>
                              </div>

                              <div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                                  {rec.diagnosis}
                                </h4>
                                <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">
                                  {rec.departmentName} • {rec.attendingDoctor}
                                </p>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800">
                                {rec.clinicalSummary}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60">
                                  <span className="font-bold text-teal-900 dark:text-teal-200 block mb-0.5">
                                    Care Plan:
                                  </span>
                                  <span className="text-teal-950 dark:text-teal-300">{rec.carePlan}</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                                  <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-0.5">
                                    Follow-Up Guidance:
                                  </span>
                                  <span className="text-indigo-950 dark:text-indigo-300">{rec.followUpAdvice}</span>
                                </div>
                              </div>

                              {/* Attachments */}
                              {rec.attachments && rec.attachments.length > 0 && (
                                <div className="pt-2 flex flex-wrap items-center gap-2">
                                  <span className="text-[11px] font-bold text-slate-400">Attached Reports:</span>
                                  {rec.attachments.map((att, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleDownloadReport(att.title)}
                                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 flex items-center gap-1.5 transition-colors"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                                      <span>{att.title}</span>
                                      <Download className="w-3 h-3 text-slate-400" />
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 2: BIOMETRIC ACTIVITY LOG & AUDIT TRAIL */}
                  {historySubTab === 'activity_log' && (
                    <div className="space-y-5 animate-in fade-in">
                      
                      {/* Audit Metrics Banner */}
                      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border border-teal-500/30 shadow-xl space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 text-teal-400" />
                              <h3 className="text-base sm:text-lg font-black font-heading text-white">
                                Biometric Identity & Access Security Audit Trail
                              </h3>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">
                              HIPAA 45 CFR § 164.312(b) compliant tamper-evident audit logging for patient PHI records.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={handleExportAuditLogs}
                            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-teal-950/50 self-start sm:self-auto shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Export Audit Log (JSON)</span>
                          </button>
                        </div>

                        {/* 4 Summary Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Total Verified Logins
                            </span>
                            <span className="text-lg sm:text-xl font-black text-teal-300 font-mono">
                              {currentPatientLogs.length} Sessions
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Primary Auth Vector
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1 mt-1">
                              <ScanFace className="w-3.5 h-3.5 text-teal-400" />
                              <span>Face ID (TrueDepth)</span>
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Hardware Security
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1 mt-1">
                              <Shield className="w-3.5 h-3.5" />
                              <span>FIDO2 Enclave L3</span>
                            </span>
                          </div>

                          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Last Authentication
                            </span>
                            <span className="text-[11px] font-semibold text-slate-200 block truncate mt-1">
                              {currentPatientLogs[0]?.timestamp.split('•')[0] || 'Never'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Filter & Search Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-slate-400 mr-1">Filter Method:</span>
                          {(['all', 'Face ID', 'Touch ID', 'PIN Fallback'] as const).map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setLogMethodFilter(method)}
                              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                                logMethodFilter === method
                                  ? 'bg-teal-600 text-white shadow-sm'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                            >
                              {method === 'all' ? 'All Methods' : method}
                            </button>
                          ))}
                        </div>

                        <span className="text-xs font-semibold text-slate-400">
                          Showing {filteredLogs.length} of {currentPatientLogs.length} login attempts
                        </span>
                      </div>

                      {/* Chronological Activity List */}
                      <div className="space-y-3">
                        {filteredLogs.length === 0 ? (
                          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No login attempts recorded for this filter.</p>
                          </div>
                        ) : (
                          filteredLogs.map((log) => (
                            <div
                              key={log.id}
                              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-3"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    log.method === 'Face ID'
                                      ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                                      : log.method === 'Touch ID'
                                        ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                                        : 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                  }`}>
                                    {log.method === 'Face ID' ? (
                                      <ScanFace className="w-5 h-5" />
                                    ) : log.method === 'Touch ID' ? (
                                      <Fingerprint className="w-5 h-5" />
                                    ) : log.method === 'PIN Fallback' ? (
                                      <KeyRound className="w-5 h-5" />
                                    ) : (
                                      <Sparkles className="w-5 h-5" />
                                    )}
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                                        {log.method} Authentication
                                      </h4>
                                      <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>{log.status}</span>
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                      Enclave Signature: {log.enclaveRef || 'SEC-ENC-7F4A-981'}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-left sm:text-right">
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center sm:justify-end gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                                    <span>{log.timestamp}</span>
                                  </span>
                                  <span className="text-[10px] font-mono font-semibold text-teal-600 dark:text-teal-400">
                                    Confidence: {log.confidenceScore || 99.98}% Cryptographic Match
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                                  {log.device.includes('iPhone') || log.device.includes('Android') || log.device.includes('Pixel') ? (
                                    <Smartphone className="w-4 h-4 text-slate-400 shrink-0" />
                                  ) : (
                                    <Laptop className="w-4 h-4 text-slate-400 shrink-0" />
                                  )}
                                  <span className="truncate">
                                    <strong className="text-slate-800 dark:text-slate-200">Device:</strong> {log.device}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                  <span className="truncate">
                                    <strong className="text-slate-800 dark:text-slate-200">Location:</strong> {log.location} ({log.ipAddress})
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* TAB 4: DIAGNOSTIC LABS */}
          {activeTab === 'labs' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    Verified Electronic Diagnostic & Pathology Reports
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    High-precision blood panels, cardiac biomarkers, and ctDNA liquid biopsy reports.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={labSearchQuery}
                      onChange={(e) => setLabSearchQuery(e.target.value)}
                      placeholder="Search tests..."
                      className="bg-slate-100 dark:bg-slate-800 text-xs rounded-xl pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                    />
                  </div>

                  <select
                    value={labCategoryFilter}
                    onChange={(e) => setLabCategoryFilter(e.target.value)}
                    className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Cardiology / Biomarkers">Cardiology</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Genomics & Oncology">Genomics</option>
                  </select>
                </div>
              </div>

              {/* Lab Reports List */}
              <div className="space-y-4">
                {filteredLabReports.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                            {lab.category}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {lab.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading mt-1">
                          {lab.testName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Collected: {lab.collectedDate} • Reported: {lab.reportedDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedLabReport(lab)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Panel</span>
                        </button>

                        <button
                          onClick={() => handleDownloadReport(lab.testName)}
                          className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Parameters Table Snippet */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-700">
                            <th className="py-2 font-bold uppercase tracking-wider">Test Parameter</th>
                            <th className="py-2 font-bold uppercase tracking-wider">Observed Value</th>
                            <th className="py-2 font-bold uppercase tracking-wider">Standard Range</th>
                            <th className="py-2 font-bold uppercase tracking-wider">Unit</th>
                            <th className="py-2 font-bold uppercase tracking-wider">Clinical Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                          {lab.parameters.slice(0, 4).map((param, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="py-2.5 font-bold text-slate-900 dark:text-white">{param.name}</td>
                              <td className="py-2.5 font-mono font-bold text-slate-900 dark:text-white">{param.value}</td>
                              <td className="py-2.5 text-slate-500 dark:text-slate-400">{param.referenceRange}</td>
                              <td className="py-2.5 text-slate-400">{param.unit}</td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  param.status === 'Normal'
                                    ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                                    : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                                }`}>
                                  {param.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Doctor interpretation */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <strong>Doctor Note:</strong> "{lab.doctorNotes}" — <em>{lab.authorDoctorName}</em>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ACTIVE PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    Active Medications & Scheduled Refills
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Direct integration with We Care Automated Hospital Pharmacy for same-day delivery.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                          {rx.status}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          Refills: {rx.refillsRemaining} left
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                        {rx.medicationName}
                      </h4>
                      <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">
                        {rx.genericName}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs space-y-1">
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">
                          Schedule: {rx.frequency} ({rx.timing})
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                          <strong>Instructions:</strong> {rx.instructions}
                        </p>
                        <p className="text-[11px] text-slate-400 pt-1">
                          Prescribed by: {rx.prescribedBy} • {rx.departmentName}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-700">
                      <span className="text-[11px] text-slate-400">
                        Valid until {rx.endDate}
                      </span>

                      <button
                        onClick={() => handleRequestRefill(rx.medicationName)}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Request Refill</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CASHLESS BILLING & CLAIMS */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  Cashless Insurance & Direct TPA Settlement
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-authorized cashless coverage and itemized clinical statements.
                </p>
              </div>

              {/* Insurance Summary Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                      Active Pre-Authorized Coverage
                    </span>
                    <h4 className="text-xl font-bold font-heading text-white mt-0.5">
                      {currentPatient.insurance.provider}
                    </h4>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentPatient.insurance.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Policy Number</span>
                    <span className="font-mono font-bold text-white text-sm">{currentPatient.insurance.policyNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Group Number</span>
                    <span className="font-mono font-bold text-white text-sm">{currentPatient.insurance.groupNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Annual Limit</span>
                    <span className="font-bold text-teal-300 text-sm">{currentPatient.insurance.coverageLimit}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Valid Until</span>
                    <span className="font-semibold text-white text-sm">{currentPatient.insurance.validUntil}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span>On-Site 24/7 TPA Desk: <strong>Counter #7, Main Lobby</strong></span>
                  </div>
                  <span className="text-teal-400 font-bold">100% Cashless Settlement</span>
                </div>
              </div>

              {/* Recent Itemized Statements */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recent Hospital Invoices & Claims
                </h4>

                {[
                  {
                    id: 'INV-98214',
                    service: 'Annual Cardiovascular FFR-CT & Lipid NMR Profile',
                    date: 'August 14, 2026',
                    total: '$680.00',
                    insuranceCovered: '$680.00 (100%)',
                    patientCopay: '$0.00',
                    status: 'Settled Direct'
                  },
                  {
                    id: 'INV-88102',
                    service: 'Virtual Gastroenterology Clinical Follow-Up',
                    date: 'March 18, 2026',
                    total: '$150.00',
                    insuranceCovered: '$150.00 (100%)',
                    patientCopay: '$0.00',
                    status: 'Settled Direct'
                  }
                ].map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{inv.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                          {inv.status}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{inv.service}</p>
                      <p className="text-[11px] text-slate-400">{inv.date}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{inv.total}</p>
                        <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                          Ins: {inv.insuranceCovered}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDownloadReport(inv.id)}
                        className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors"
                        title="Download Invoice PDF"
                      >
                        <Download className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Audit Banner */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-b-3xl border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Encrypted Session • Medical Record Access Logged for User {currentPatient.name}</span>
          </div>
          <span className="font-mono">IP: 192.168.1.1 • We Care Health Portal v4.2</span>
        </div>
      </div>

      {/* FULL LAB REPORT DETAIL MODAL */}
      {selectedLabReport && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500 text-slate-950">
                  {selectedLabReport.category}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1.5">
                  {selectedLabReport.testName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLabReport(null)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Parameter Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 font-bold uppercase">Biomarker</th>
                    <th className="py-2.5 font-bold uppercase">Result</th>
                    <th className="py-2.5 font-bold uppercase">Reference</th>
                    <th className="py-2.5 font-bold uppercase">Unit</th>
                    <th className="py-2.5 font-bold uppercase">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedLabReport.parameters.map((p, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white">{p.name}</td>
                      <td className="py-2.5 font-mono font-bold text-slate-900 dark:text-white">{p.value}</td>
                      <td className="py-2.5 text-slate-500">{p.referenceRange}</td>
                      <td className="py-2.5 text-slate-400">{p.unit}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold text-[10px]">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <p className="font-bold text-slate-900 dark:text-white">Clinical Pathologist Interpretation:</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedLabReport.clinicalInterpretation}</p>
              <p className="text-teal-700 dark:text-teal-400 font-medium">Attending: {selectedLabReport.authorDoctorName}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedLabReport(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadReport(selectedLabReport.testName);
                  setSelectedLabReport(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Sealed PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL HEALTH PASS MODAL */}
      {activeHealthPass && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Hospital Check-In Pass
              </span>
              <button
                onClick={() => setActiveHealthPass(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                  We Care Hospital & Research Institute
                </span>
                <h4 className="text-lg font-bold font-heading text-white mt-1">
                  {activeHealthPass.doctorName}
                </h4>
                <p className="text-xs text-slate-300">{activeHealthPass.departmentName}</p>
              </div>

              {/* Barcode/QR Code Simulation */}
              <div className="bg-white p-4 rounded-xl inline-block shadow-md">
                <QrCode className="w-32 h-32 text-slate-950 mx-auto" />
                <p className="font-mono text-[10px] text-slate-600 mt-1 font-bold">
                  {activeHealthPass.qrCodeSeed || `WC-PASS-${activeHealthPass.tokenNumber}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800 pt-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date & Slot</span>
                  <span className="font-bold text-white">{activeHealthPass.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Queue Token</span>
                  <span className="font-black text-teal-300 text-base">#{activeHealthPass.tokenNumber}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                handleDownloadReport(`HealthPass_${activeHealthPass.id}`);
                setActiveHealthPass(null);
              }}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Save Pass to Wallet</span>
            </button>
          </div>
        </div>
      )}

      {/* BIOMETRIC AUTHENTICATION MODAL */}
      <BiometricAuthModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        onSuccess={handleBiometricSuccess}
        patient={currentPatient}
        activityLogs={currentPatientLogs}
      />

      {/* DOCTOR CONSULTATION REPORT MODAL */}
      <ConsultationReportModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        report={selectedConsultReport}
        onOpenBooking={onOpenBooking}
      />

    </div>
  );
};
