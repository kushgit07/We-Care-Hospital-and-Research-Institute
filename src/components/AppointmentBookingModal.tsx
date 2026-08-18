import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  ChevronRight, 
  ArrowLeft, 
  Video, 
  Building2, 
  Home, 
  Sparkles, 
  Download, 
  Share2, 
  QrCode, 
  AlertCircle,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEPARTMENTS, DOCTORS, INSURANCE_PARTNERS } from '../data/hospitalData';
import { HOSPITAL_BRANCHES } from '../data/hospitalBranchesData';
import { saveAppointmentToSupabase } from '../services/backendService';
import { Appointment, Doctor, Department } from '../types/hospital';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDeptId?: string;
  initialDocId?: string;
  initialBranchId?: string;
  initialSymptoms?: string;
  onAppointmentBooked: (appointment: Appointment) => void;
  onOpenPatientDashboard?: () => void;
  onOpenConsultationReport?: (appointment: Appointment) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  initialDeptId,
  initialDocId,
  initialBranchId,
  initialSymptoms,
  onAppointmentBooked,
  onOpenPatientDashboard,
  onOpenConsultationReport
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Step 1 State
  const [selectedBranchId, setSelectedBranchId] = useState<string>(initialBranchId || HOSPITAL_BRANCHES[0].id);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDeptId || DEPARTMENTS[0].id);
  const [consultType, setConsultType] = useState<'In-Person' | 'Video Tele-Consult' | 'Home Visit'>('In-Person');
  
  // Step 2 State
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocId || '');

  // Step 3 State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Step 4 State: Patient Details
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState<number>(32);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [symptoms, setSymptoms] = useState(initialSymptoms || '');
  const [paymentOption, setPaymentOption] = useState<'Pay at Hospital' | 'Paid' | 'Covered by Insurance'>('Pay at Hospital');
  const [insuranceProvider, setInsuranceProvider] = useState(INSURANCE_PARTNERS[0]);
  const [policyNumber, setPolicyNumber] = useState('');

  // Step 5 Confirmation Record
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Generate available dates for next 10 days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isoStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      dates.push({
        iso: isoStr,
        dayName,
        monthName,
        dayNum,
        isToday: i === 0
      });
    }
    return dates;
  }, []);

  // Time Slots
  const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:45 AM', '11:15 AM', '11:45 AM'];
  const afternoonSlots = ['12:30 PM', '01:15 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:00 PM'];
  const eveningSlots = ['04:45 PM', '05:15 PM', '06:00 PM', '06:45 PM', '07:15 PM'];

  // Initialize defaults on open
  useEffect(() => {
    if (isOpen) {
      if (initialDeptId) setSelectedDeptId(initialDeptId);
      if (initialDocId) setSelectedDocId(initialDocId);
      if (initialBranchId) setSelectedBranchId(initialBranchId);
      if (initialSymptoms) setSymptoms(initialSymptoms);
      if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0].iso);
      }
      if (!selectedSlot) {
        setSelectedSlot('10:00 AM');
      }
    }
  }, [isOpen, initialDeptId, initialDocId, initialBranchId, initialSymptoms, availableDates]);

  // Filter available doctors
  const doctorsInDept = DOCTORS.filter(d => d.departmentId === selectedDeptId);

  // Trigger Confetti on Confirmation
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback safe
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !patientEmail) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    const dept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
    const doc = DOCTORS.find(d => d.id === selectedDocId) || doctorsInDept[0] || DOCTORS[0];
    const branch = HOSPITAL_BRANCHES.find(b => b.id === selectedBranchId) || HOSPITAL_BRANCHES[0];
    const randomRef = `WC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const token = Math.floor(12 + Math.random() * 25);

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      bookingReference: randomRef,
      patientName,
      patientPhone,
      patientEmail,
      age: Number(patientAge),
      gender: patientGender,
      doctorId: doc.id,
      doctorName: doc.name,
      departmentId: dept.id,
      departmentName: dept.name,
      branchId: branch.id,
      branchName: branch.name,
      serviceType: `${consultType} Consultation`,
      date: selectedDate,
      timeSlot: selectedSlot,
      consultType,
      symptoms: symptoms || 'General Clinical Evaluation',
      status: 'Confirmed',
      tokenNumber: token,
      fee: doc.fee,
      paymentStatus: paymentOption,
      qrCodeSeed: randomRef,
      createdAt: new Date().toISOString()
    };

    // Async sync to Supabase database
    saveAppointmentToSupabase(newAppointment).catch(err => console.info('Supabase sync background:', err));

    setConfirmedBooking(newAppointment);
    onAppointmentBooked(newAppointment);
    setStep(5);
    triggerConfetti();
  };

  const handlePrintPass = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//We Care Hospital//Appointment Pass//EN
BEGIN:VEVENT
SUMMARY:Appointment with ${confirmedBooking.doctorName} (${confirmedBooking.departmentName})
DESCRIPTION:We Care Hospital Appointment. Token #${confirmedBooking.tokenNumber}. Ref: ${confirmedBooking.bookingReference}
LOCATION:We Care Hospital & Research Institute, 750 Broadway Ave, New York
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wecare-appointment-${confirmedBooking.bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 flex flex-col justify-between my-auto">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-slate-900 dark:bg-slate-950 text-white rounded-t-3xl relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 dark:bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Verified Healthcare Booking
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            {step === 5 ? 'Appointment Confirmed! 🎉' : 'Book Your Clinical Appointment'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {step === 5
              ? 'Your digital health pass has been issued with instant confirmation.'
              : 'Direct scheduling with premier specialists across 10 hospital institutes.'}
          </p>

          {/* Stepper Indicator */}
          {step < 5 && (
            <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-4 gap-2 text-xs">
              {[
                { num: 1, label: 'Department' },
                { num: 2, label: 'Specialist' },
                { num: 3, label: 'Date & Slot' },
                { num: 4, label: 'Patient Info' }
              ].map((s) => (
                <div
                  key={s.num}
                  className={`text-center pb-1 border-b-2 transition-all ${
                    step >= s.num
                      ? 'border-teal-400 text-teal-300 font-bold'
                      : 'border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="hidden sm:inline">Step {s.num}: </span>
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body Based on Step */}
        <div className="p-5 sm:p-7 flex-1">
          
          {/* STEP 1: Department & Consultation Type */}
          {step === 1 && (
            <div className="space-y-6">
              {/* 1. Mode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  1. Select Consultation Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'In-Person', title: 'In-Person Clinic', icon: Building2, desc: 'At Hospital Campus' },
                    { id: 'Video Tele-Consult', title: 'HD Video Consult', icon: Video, desc: 'Secure HIPAA Video Call' },
                    { id: 'Home Visit', title: 'Home Phlebotomy', icon: Home, desc: 'Sample Collection at Home' }
                  ].map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <div
                        key={mode.id}
                        onClick={() => setConsultType(mode.id as any)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          consultType === mode.id
                            ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/60 shadow-sm ring-1 ring-teal-500'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${consultType === mode.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'}`} />
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{mode.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{mode.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Campus / Branch Selection (for in-person) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  2. Select Hospital Campus / Branch
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-teal-500"
                >
                  {HOSPITAL_BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.district}) • {b.openHours}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Department Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  3. Select Department / Specialty
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-1">
                  {DEPARTMENTS.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => {
                        setSelectedDeptId(dept.id);
                        setSelectedDocId(''); // Reset doctor when dept changes
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedDeptId === dept.id
                          ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/70 font-bold text-teal-900 dark:text-teal-200 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold truncate">{dept.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{dept.tagline}</p>
                      </div>
                      {selectedDeptId === dept.id && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Doctor Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Available Specialists in {DEPARTMENTS.find(d => d.id === selectedDeptId)?.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose a consultant or select any available specialist.
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Change Dept
                </button>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto p-1">
                {doctorsInDept.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                      selectedDocId === doc.id
                        ? 'border-teal-600 bg-teal-50/80 dark:bg-teal-950/70 shadow-md ring-1 ring-teal-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</p>
                        {doc.isHeadOfDept && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700/60">
                            Chief
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium truncate">{doc.specialty}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <span>⭐ {doc.rating} ({doc.reviewCount})</span>
                        <span>•</span>
                        <span>Fee: <strong className="text-slate-800 dark:text-slate-200">${doc.fee}</strong></span>
                        <span>•</span>
                        <span className="text-teal-700 dark:text-teal-400 font-semibold">Slot: {doc.nextAvailableSlot}</span>
                      </div>
                    </div>
                    {selectedDocId === doc.id && (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Date Horizontal Carousel */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  1. Select Appointment Date
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableDates.slice(0, 5).map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedDate === d.iso
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-semibold opacity-80">{d.dayName}</span>
                      <span className="block text-base font-extrabold">{d.dayNum}</span>
                      <span className="block text-[10px]">{d.monthName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  2. Select Consultation Slot (EST)
                </label>

                <div className="space-y-3">
                  {/* Morning */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Morning (09:00 AM - 12:00 PM)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {morningSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedSlot === slot
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Afternoon (12:30 PM - 04:00 PM)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {afternoonSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedSlot === slot
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Evening (04:30 PM - 07:30 PM)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {eveningSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedSlot === slot
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Info & Insurance */}
          {step === 4 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Gender
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Symptoms / Reason for Visit */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Consultation / Symptoms
                </label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe key symptoms, previous diagnoses or reports you will bring..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                />
              </div>

              {/* Billing / Insurance */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                  Payment / Insurance Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Pay at Hospital', label: 'Pay at Hospital Desk' },
                    { id: 'Covered by Insurance', label: 'Cashless Insurance TPA' },
                    { id: 'Paid', label: 'Online Card / Apple Pay' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentOption(p.id as any)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        paymentOption === p.id
                          ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/70 text-teal-900 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {paymentOption === 'Covered by Insurance' && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1">Insurance Provider</span>
                      <select
                        value={insuranceProvider}
                        onChange={(e) => setInsuranceProvider(e.target.value)}
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        {INSURANCE_PARTNERS.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1">Policy / Member ID #</span>
                      <input
                        type="text"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        placeholder="e.g. BCBS-893240"
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>Your medical information is strictly encrypted under HIPAA & JCI protocols.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Issue Digital Health Pass</span>
              </button>
            </form>
          )}

          {/* STEP 5: Confirmation & Boarding Pass */}
          {step === 5 && confirmedBooking && (
            <div id="printable-pass" className="space-y-5">
              {/* Boarding Pass Container */}
              <div className="rounded-3xl border-2 border-teal-500/80 bg-gradient-to-b from-teal-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-6 shadow-xl relative overflow-hidden">
                {/* Ribbon */}
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-[10px] font-extrabold uppercase tracking-widest py-1 px-8 rotate-45 translate-x-6 translate-y-3 shadow-md">
                  CONFIRMED
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-teal-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                      We Care Hospital & Research Institute
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                      Official Patient Appointment Pass
                    </h4>
                  </div>
                  <div className="text-right pr-6">
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 block">Queue Token</span>
                    <span className="text-2xl font-black text-teal-700 dark:text-teal-400 font-heading">
                      #{confirmedBooking.tokenNumber}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-4 text-xs">
                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px]">Booking Reference</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{confirmedBooking.bookingReference}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px]">Patient Name</span>
                    <span className="font-bold text-slate-900 dark:text-white">{confirmedBooking.patientName} ({confirmedBooking.age}y/{confirmedBooking.gender})</span>
                  </div>

                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px]">Consultation Mode</span>
                    <span className="font-bold text-teal-800 dark:text-teal-300">{confirmedBooking.consultType}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px]">Doctor / Specialist</span>
                    <span className="font-bold text-slate-900 dark:text-white">{confirmedBooking.doctorName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px]">Department</span>
                    <span className="font-bold text-slate-900 dark:text-white">{confirmedBooking.departmentName.split(' ')[0]}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[10px]">Date & Time Slot</span>
                    <span className="font-bold text-teal-900 dark:text-teal-200 bg-teal-100/70 dark:bg-teal-950/80 px-1.5 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {confirmedBooking.date} at {confirmedBooking.timeSlot}
                    </span>
                  </div>
                </div>

                {/* QR Code and Location */}
                <div className="pt-4 border-t border-dashed border-teal-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Simulated Stylized QR Code Box */}
                    <div className="w-16 h-16 bg-slate-900 dark:bg-slate-950 border border-teal-500/30 p-1.5 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                      <QrCode className="w-12 h-12 text-teal-400" />
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      <p className="font-bold text-slate-900 dark:text-white">Digital Entry Barcode</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Scan at Hospital Tower Reception kiosk for express priority check-in.</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 block">Location</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Tower B, Level 3</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {onOpenConsultationReport && confirmedBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenConsultationReport(confirmedBooking);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View / Generate Doctor Report</span>
                  </button>
                )}

                {onOpenPatientDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPatientDashboard();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Patient Portal</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePrintPass}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pass (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer (Steps 1-3) */}
        {step < 4 && (
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/80 rounded-b-3xl border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div></div>}

            <button
              type="button"
              onClick={() => {
                if (step === 1) {
                  // If doctor not selected, pick first in dept
                  if (!selectedDocId && doctorsInDept.length > 0) {
                    setSelectedDocId(doctorsInDept[0].id);
                  }
                  setStep(2);
                } else if (step === 2) {
                  setStep(3);
                } else if (step === 3) {
                  setStep(4);
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
