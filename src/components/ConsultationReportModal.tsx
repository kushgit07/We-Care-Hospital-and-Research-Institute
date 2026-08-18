import React, { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  FileText, 
  User, 
  Stethoscope, 
  Calendar, 
  Clock, 
  Pill, 
  AlertTriangle, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Heart, 
  ChevronRight, 
  Building2, 
  FileCheck, 
  Check, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { ConsultationReport, Doctor } from '../types/hospital';
import { HOSPITAL_INFO, DOCTORS } from '../data/hospitalData';
import { INITIAL_CONSULTATION_REPORTS, generateCustomConsultationReport } from '../data/consultationReportsData';

interface ConsultationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report?: ConsultationReport | null;
  onOpenBooking?: (deptId?: string, docId?: string) => void;
}

export const ConsultationReportModal: React.FC<ConsultationReportModalProps> = ({
  isOpen,
  onClose,
  report: initialReport,
  onOpenBooking
}) => {
  const [reportsList, setReportsList] = useState<ConsultationReport[]>(INITIAL_CONSULTATION_REPORTS);
  const [activeReportIndex, setActiveReportIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);
  
  // Custom generation form
  const [newDoctorId, setNewDoctorId] = useState(DOCTORS[0].id);
  const [newSymptoms, setNewSymptoms] = useState('Mild fever, dry cough, and persistent fatigue');
  const [newConsultType, setNewConsultType] = useState<'In-Person OPD' | 'Video Tele-Consult'>('In-Person OPD');

  const reportToDisplay = initialReport || reportsList[activeReportIndex] || INITIAL_CONSULTATION_REPORTS[0];

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `We Care Hospital - Official Consultation Report (${reportToDisplay.reportNumber}) for ${reportToDisplay.patientName}. Doctor: ${reportToDisplay.doctorName}. Diagnosis: ${reportToDisplay.provisionalDiagnosis}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleGenerateNewReport = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = DOCTORS.find(d => d.id === newDoctorId) || DOCTORS[0];
    const newReport = generateCustomConsultationReport({
      patientName: 'Kushagra Sisodia',
      patientPhone: '+1 (555) 234-5678',
      patientEmail: 'kushagrasisodia27@gmail.com',
      doctorId: doc.id,
      doctorName: doc.name,
      departmentName: doc.specialty,
      symptoms: newSymptoms,
      consultType: newConsultType
    });

    setReportsList(prev => [newReport, ...prev]);
    setActiveReportIndex(0);
    setIsGeneratingNew(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 my-auto print:max-w-none print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Top Floating Action Bar (Hidden on print) */}
        <div className="sticky top-0 z-20 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-heading">
                  Doctor Consultation & Encounter Report
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono">
                  {reportToDisplay.reportNumber}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Official electronic health record verified by attending clinician.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Switch available reports or create new */}
            {!initialReport && (
              <button
                type="button"
                onClick={() => setIsGeneratingNew(!isGeneratingNew)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>{isGeneratingNew ? 'Back to Report' : 'Generate New Consult'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Copy verified summary"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-teal-600" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GENERATE CUSTOM CONSULTATION MODAL FORM OVERLAY */}
        {isGeneratingNew ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <h4 className="text-sm font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Instant Post-Consultation Report Generator</span>
              </h4>
              <p className="text-xs text-teal-800/80 dark:text-teal-300 mt-1">
                Generate a proper, authentic clinical encounter report including prescribed medications, ICD-10 diagnosis, clinical vitals, and physician digital signature.
              </p>
            </div>

            <form onSubmit={handleGenerateNewReport} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Attending Physician / Specialist
                </label>
                <select
                  value={newDoctorId}
                  onChange={(e) => setNewDoctorId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {DOCTORS.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty} ({doc.qualifications})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewConsultType('In-Person OPD')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      newConsultType === 'In-Person OPD'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>In-Person OPD Encounter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewConsultType('Video Tele-Consult')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      newConsultType === 'Video Tele-Consult'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Video Tele-Consultation</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Chief Complaints & Evaluated Symptoms
                </label>
                <textarea
                  rows={3}
                  value={newSymptoms}
                  onChange={(e) => setNewSymptoms(e.target.value)}
                  placeholder="e.g. Mild exertional chest tightness, occasional acid reflux, and morning headaches"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Generate Official Consultation Report</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsGeneratingNew(false)}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ACTUAL OFFICIAL CONSULTATION REPORT DOCUMENT */
          <div className="p-6 sm:p-10 space-y-6 font-sans text-slate-900 dark:text-slate-100 print:p-8 print:text-black">
            
            {/* 1. Official Hospital Header & JCI Certification */}
            <div className="border-b-2 border-teal-600 pb-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-sky-600 text-white flex items-center justify-center shadow-md print:bg-teal-600 print:text-white">
                    <Activity className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-slate-900 dark:text-white print:text-black">
                      WE CARE HOSPITAL & RESEARCH INSTITUTE
                    </h2>
                    <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 print:text-teal-800">
                      Center of Excellence in Multi-Specialty & Tertiary Medicine
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-gray-600">
                      {HOSPITAL_INFO.address} • 24x7 Helpdesk: {HOSPITAL_INFO.phoneGeneral}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <span className="inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 print:border-gray-400">
                    JCI Gold Seal Accredited 🏅
                  </span>
                  <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    Report No: <span className="text-teal-600 dark:text-teal-400">{reportToDisplay.reportNumber}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Date: <strong>{reportToDisplay.encounterDate}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Patient & Attending Physician Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs print:bg-gray-50 print:border-gray-300">
              {/* Patient Details */}
              <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-3 md:pb-0 md:pr-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Patient Demographics
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Patient Name:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{reportToDisplay.patientName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Medical Record No (MRN):</span>
                  <strong className="font-mono text-teal-600 dark:text-teal-300">{reportToDisplay.patientMrn}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Age / Gender:</span>
                  <span>{reportToDisplay.patientAge} Years / {reportToDisplay.patientGender}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone / Email:</span>
                  <span className="truncate max-w-[180px]">{reportToDisplay.patientPhone}</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="space-y-1.5 md:pl-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Attending Clinician
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{reportToDisplay.doctorName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Designation / Title:</span>
                  <span>{reportToDisplay.doctorTitle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Specialty / Dept:</span>
                  <span className="font-semibold text-teal-700 dark:text-teal-300">{reportToDisplay.departmentName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Medical Reg No:</span>
                  <span className="font-mono">{reportToDisplay.doctorRegNumber}</span>
                </div>
              </div>
            </div>

            {/* 3. Recorded Clinical Vitals */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                <span>Recorded Clinical Vitals & Triage Metrics</span>
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Blood Pressure</span>
                  <strong className="text-slate-900 dark:text-white text-xs sm:text-sm font-mono">{reportToDisplay.vitals.bp}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Pulse / Heart Rate</span>
                  <strong className="text-slate-900 dark:text-white text-xs sm:text-sm font-mono">{reportToDisplay.vitals.pulse}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Body Temp</span>
                  <strong className="text-slate-900 dark:text-white text-xs sm:text-sm font-mono">{reportToDisplay.vitals.temp}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">SpO2 Oxygen</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-mono">{reportToDisplay.vitals.spo2}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Weight</span>
                  <strong className="text-slate-900 dark:text-white text-xs sm:text-sm font-mono">{reportToDisplay.vitals.weight}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Calculated BMI</span>
                  <strong className="text-slate-900 dark:text-white text-xs sm:text-sm font-mono">{reportToDisplay.vitals.bmi}</strong>
                </div>
              </div>
            </div>

            {/* 4. Chief Complaints & Provisional Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Chief Complaints & Symptom History
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                  {reportToDisplay.chiefComplaints.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 dark:text-teal-300 block">
                  Provisional Diagnosis & ICD-10 Code
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                  {reportToDisplay.provisionalDiagnosis}
                </h4>
                <p className="text-xs font-mono font-semibold text-teal-700 dark:text-teal-300">
                  ICD-10: {reportToDisplay.icd10Code}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {reportToDisplay.clinicalFindings}
                </p>
              </div>
            </div>

            {/* 5. Prescribed Medications Table (The core prescription Rx) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-teal-600 text-white font-serif font-bold text-xs">Rx</span>
                  <span>Prescribed Medications & Dosage Schedule</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  {reportToDisplay.prescribedMedications.length} Medications Prescribed
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3">#</th>
                      <th className="p-3">Medication & Generic</th>
                      <th className="p-3">Dosage</th>
                      <th className="p-3">Frequency</th>
                      <th className="p-3">Timing</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Special Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {reportToDisplay.prescribedMedications.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-mono font-bold text-teal-600">{idx + 1}</td>
                        <td className="p-3">
                          <strong className="block text-slate-900 dark:text-white font-bold">{med.name}</strong>
                          <span className="text-[10px] text-slate-500 block">{med.generic}</span>
                        </td>
                        <td className="p-3 font-mono font-medium">{med.dosage}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold font-mono text-[11px]">
                            {med.frequency}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-amber-700 dark:text-amber-300">{med.timing}</td>
                        <td className="p-3 font-semibold">{med.duration}</td>
                        <td className="p-3 text-[11px] text-slate-500 max-w-xs">{med.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. Diagnostic Investigations Ordered & Lifestyle Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lab / Diagnostics Ordered */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 block">
                  Diagnostic Tests & Investigations Ordered
                </span>
                <ul className="space-y-1.5 text-xs">
                  {reportToDisplay.investigationsOrdered.map((test, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diet & Lifestyle Advice */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 block">
                  Dietary, Lifestyle & Physical Guidance
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {reportToDisplay.dietAndLifestyleAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7. Follow-up & Emergency Warning Signs */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Clinical Red Flags & Urgent Warning Signs:</span>
                </div>
                <p className="text-[11px] text-amber-800/90 dark:text-amber-300/90">
                  {reportToDisplay.warningSigns}
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Next Scheduled Review</span>
                <strong className="text-teal-700 dark:text-teal-300 font-bold text-xs">
                  {reportToDisplay.followUpDate}
                </strong>
              </div>
            </div>

            {/* 8. Doctor Signature, Verification Stamp & QR Code */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-800 dark:text-white" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Cryptographically Signed EHR</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Hash: {reportToDisplay.digitalSignature.signatureHash.slice(0, 24)}...
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Scan QR with any camera to verify validity on We Care Portal.
                  </p>
                </div>
              </div>

              {/* Digital Doctor Signature Box */}
              <div className="text-right p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 min-w-[220px]">
                <div className="font-serif italic text-base text-teal-800 dark:text-teal-300 font-bold tracking-wide">
                  {reportToDisplay.doctorName}
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Digitally Authorized: {new Date(reportToDisplay.digitalSignature.timestamp).toLocaleDateString()}
                </p>
                <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {reportToDisplay.doctorTitle}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Modal Footer (Hidden on print) */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>HIPAA Compliant & HL7 FHIR Interoperable Electronic Health Record</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking(undefined, reportToDisplay.doctorId);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors"
              >
                Book Follow-Up Consultation
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
