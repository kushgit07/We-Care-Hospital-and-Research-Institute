import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Calendar, 
  FileText, 
  Activity, 
  ShieldCheck, 
  Download, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Heart, 
  Calculator,
  Building,
  Trash2
} from 'lucide-react';
import { Appointment } from '../types/hospital';
import { INSURANCE_PARTNERS } from '../data/hospitalData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'calculators' | 'insurance' | 'reports'>('appointments');
  
  // BMI State
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [calculatedBmi, setCalculatedBmi] = useState<number | null>(null);

  // Insurance checker
  const [selectedInsurer, setSelectedInsurer] = useState(INSURANCE_PARTNERS[0]);
  const [insCheckResult, setInsCheckResult] = useState<string | null>(null);

  const calculateBmi = () => {
    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      setCalculatedBmi(Number(bmi.toFixed(1)));
    }
  };

  const checkInsuranceEligibility = () => {
    setInsCheckResult(`100% Cashless Coverage Pre-Approved for ${selectedInsurer}. On-site hospital TPA desk handles direct settlement within 60 minutes.`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 my-auto flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white rounded-t-3xl relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 dark:bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              We Care Patient Health Hub
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Digital Patient Services & Records
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage your booked consultations, digital passes, health calculators, and cashless insurance claims.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-semibold">
            {[
              { id: 'appointments', label: `My Appointments (${appointments.length})`, icon: Calendar },
              { id: 'calculators', label: 'Health Calculators (BMI)', icon: Calculator },
              { id: 'insurance', label: 'Cashless TPA Checker', icon: ShieldCheck },
              { id: 'reports', label: 'E-Reports & Prescriptions', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 flex-1 space-y-5">
          
          {/* TAB 1: Appointments List */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                  <Calendar className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No Active Appointments Found</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Book your first doctor consultation in under 60 seconds.</p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm"
                  >
                    Book Appointment Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-750 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                            {app.bookingReference}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Token #{app.tokenNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{app.consultType}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{app.doctorName}</h4>
                        <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">{app.departmentName}</p>
                        
                        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                            <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                            {app.date} at {app.timeSlot}
                          </span>
                          <span>•</span>
                          <span>Patient: {app.patientName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Pass</span>
                        </button>

                        <button
                          onClick={() => onCancelAppointment(app.id)}
                          className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                          title="Cancel Appointment"
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

          {/* TAB 2: Health Calculators */}
          {activeTab === 'calculators' && (
            <div className="space-y-6">
              {/* BMI Calculator */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>BMI & Body Mass Metric Calculator</span>
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">WHO Standard</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateBmi}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Calculate BMI
                </button>

                {calculatedBmi !== null && (
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-center animate-in fade-in">
                    <span className="text-xs text-teal-800 dark:text-teal-300">Your Body Mass Index (BMI):</span>
                    <p className="text-3xl font-extrabold text-teal-900 dark:text-teal-200 font-heading my-1">{calculatedBmi}</p>
                    <p className="text-xs font-bold text-teal-700 dark:text-teal-400">
                      {calculatedBmi < 18.5
                        ? 'Underweight - Nutritional consultation recommended'
                        : calculatedBmi <= 24.9
                        ? 'Healthy Normal Weight Range 🌟'
                        : calculatedBmi <= 29.9
                        ? 'Overweight - Cardiac wellness check advised'
                        : 'Obesity Class - Metabolic GI consultation recommended'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Cashless Insurance Checker */}
          {activeTab === 'insurance' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Check Your Health Insurance Network</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">We Care Hospital provides 100% paperless cashless hospitalization with over 50 global insurance partners.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Insurance Provider</label>
                  <select
                    value={selectedInsurer}
                    onChange={(e) => setSelectedInsurer(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                  >
                    {INSURANCE_PARTNERS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={checkInsuranceEligibility}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Verify Cashless Status
                </button>

                {insCheckResult && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 animate-in fade-in flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{insCheckResult}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Lab Reports Demo */}
          {activeTab === 'reports' && (
            <div className="space-y-3">
              {[
                { title: 'Executive Whole Body Lipid & Metabolic Panel', date: 'August 10, 2026', doctor: 'Dr. Arthur Vance', status: 'Final Verified' },
                { title: 'Intraoperative 3T Silent Brain MRI Summary', date: 'July 24, 2026', doctor: 'Dr. Julian Sterling', status: 'Radiologist Signed' },
                { title: 'Comprehensive 2D Echocardiogram & Doppler', date: 'June 18, 2026', doctor: 'Dr. Elena Rostova', status: 'Final Verified' }
              ].map((rep, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">{rep.title}</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{rep.date} • Prescribed by {rep.doctor}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {rep.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-b-3xl border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">Need immediate assistance? Call +1 (800) 932-2732</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 text-white font-bold text-xs rounded-xl"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
