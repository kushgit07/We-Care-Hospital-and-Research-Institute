import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DepartmentsSection } from './components/DepartmentsSection';
import { DoctorsDirectory } from './components/DoctorsDirectory';
import { AIMedicineSearchSection } from './components/AIMedicineSearchSection';
import { ServicesAndPackages } from './components/ServicesAndPackages';
import { HospitalLocationsMapSection } from './components/HospitalLocationsMapSection';
import { FacilitiesAndVirtualTour } from './components/FacilitiesAndVirtualTour';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { HealthInsightsSection } from './components/HealthInsightsSection';
import { AuthShowcaseSection } from './components/AuthShowcaseSection';
import { Footer } from './components/Footer';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { ConsultationReportModal } from './components/ConsultationReportModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { EmergencyTrackerModal } from './components/EmergencyTrackerModal';
import { PatientDashboard } from './components/PatientDashboard';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ModernAuthModal } from './components/ModernAuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { OnlinePaymentModal, PaymentItem, PaymentSuccessReceipt } from './components/OnlinePaymentModal';
import { INITIAL_MOCK_APPOINTMENTS } from './data/hospitalData';
import { Appointment, ConsultationReport } from './types/hospital';
import { Calendar, Ambulance, Sparkles, UserCheck, CheckCircle, Info, FileText, ArrowUp, CreditCard } from 'lucide-react';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, isAuthenticated, authMessage } = useAuth();

  // Navigation State
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Online Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);

  // Track scroll for floating dock & scroll-to-top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [prefillDeptId, setPrefillDeptId] = useState<string | undefined>(undefined);
  const [prefillDocId, setPrefillDocId] = useState<string | undefined>(undefined);
  const [prefillBranchId, setPrefillBranchId] = useState<string | undefined>(undefined);
  const [prefillSymptoms, setPrefillSymptoms] = useState<string | undefined>(undefined);

  // Consultation Report Modal State
  const [consultReportModalOpen, setConsultReportModalOpen] = useState(false);
  const [selectedConsultReport, setSelectedConsultReport] = useState<ConsultationReport | null>(null);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Modern Google & Phone OTP Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'google' | 'phone' | 'signin'>('google');

  // Super Admin Command Center Modal State
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Filter for Doctors Directory
  const [doctorDeptFilter, setDoctorDeptFilter] = useState<string | null>(null);

  // Appointments in LocalStorage
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('wecare_appointments');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_APPOINTMENTS;
    } catch (e) {
      return INITIAL_MOCK_APPOINTMENTS;
    }
  });

  // Save appointments to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('wecare_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [appointments]);

  // Global Keyboard Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth Navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuthModal = (mode: 'google' | 'phone' | 'signin' = 'google') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Open Online Payment Gateway Modal
  const handleOpenPayment = (item?: PaymentItem) => {
    setActivePaymentItem(item || null);
    setPaymentModalOpen(true);
  };

  // Open Booking Modal with optional pre-fill
  const handleOpenBooking = (deptId?: string, docId?: string, branchIdOrSymptoms?: string, maybeSymptoms?: string) => {
    setPrefillDeptId(deptId);
    setPrefillDocId(docId);
    
    // Check if 3rd arg is a branch ID (starts with branch-) or symptoms string
    if (branchIdOrSymptoms && branchIdOrSymptoms.startsWith('branch-')) {
      setPrefillBranchId(branchIdOrSymptoms);
      setPrefillSymptoms(maybeSymptoms);
    } else {
      setPrefillBranchId(undefined);
      setPrefillSymptoms(branchIdOrSymptoms || maybeSymptoms);
    }
    setBookingModalOpen(true);
  };

  // Open Doctor Consultation Report Modal
  const handleOpenConsultReport = (reportOrAppointment?: ConsultationReport | Appointment | string) => {
    if (typeof reportOrAppointment === 'object' && reportOrAppointment && 'reportNumber' in reportOrAppointment) {
      setSelectedConsultReport(reportOrAppointment as ConsultationReport);
    } else {
      setSelectedConsultReport(null);
    }
    setConsultReportModalOpen(true);
  };

  // Add newly confirmed appointment
  const handleAppointmentBooked = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
  };

  // Cancel an appointment
  const handleCancelAppointment = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  // Filter doctors by dept and scroll
  const handleFilterDoctorsByDept = (deptId: string) => {
    setDoctorDeptFilter(deptId);
    handleNavigate('doctors');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 relative overflow-x-hidden w-full selection:bg-teal-500/20 selection:text-teal-900 dark:selection:text-teal-200">
      
      {/* Dynamic Auth Toast Notification */}
      {authMessage && (
        <aside 
          role="status" 
          aria-live="polite" 
          className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-200"
        >
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 shadow-2xl border border-slate-700 dark:border-slate-200 text-xs font-bold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0"></span>
            <span>{authMessage.text}</span>
          </div>
        </aside>
      )}

      {/* Top Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenPayment={handleOpenPayment}
        onOpenAIModal={() => setAiModalOpen(true)}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
        onOpenPatientPortal={() => setPortalModalOpen(true)}
        onOpenConsultationReportModal={() => handleOpenConsultReport()}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAuthModal={handleOpenAuthModal}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        bookedCount={appointments.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenAIModal={() => setAiModalOpen(true)}
          onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
          onOpenPatientPortal={() => setPortalModalOpen(true)}
          onSelectDepartment={(deptId) => {
            handleFilterDoctorsByDept(deptId);
          }}
          onSearchQuery={(query) => {
            setSearchModalOpen(true);
          }}
        />

        {/* 2. Departments Hub */}
        <DepartmentsSection
          onOpenBooking={handleOpenBooking}
          onFilterDoctorsByDept={handleFilterDoctorsByDept}
          selectedDeptId={doctorDeptFilter}
        />

        {/* 3. Distinguished Doctors Directory */}
        <DoctorsDirectory
          onOpenBooking={handleOpenBooking}
          selectedDeptFilter={doctorDeptFilter}
          onClearDeptFilter={() => setDoctorDeptFilter(null)}
        />

        {/* 4. AI-Powered Medication & Disease Pharmacopeia Search */}
        <AIMedicineSearchSection
          onBookAppointment={handleOpenBooking}
          onOpenConsultReport={handleOpenConsultReport}
          onOpenAIAssistant={() => setAiModalOpen(true)}
        />

        {/* 5. Clinical Services & Health Packages */}
        <ServicesAndPackages
          onOpenBooking={handleOpenBooking}
          onOpenPayment={handleOpenPayment}
        />

        {/* 6. Health & Wellness Blog & AI Breakthroughs */}
        <HealthInsightsSection
          onOpenBooking={handleOpenBooking}
          onOpenAIModal={() => setAiModalOpen(true)}
        />

        {/* 7. Universal Authentication & Patient Identity Hub */}
        <AuthShowcaseSection
          onOpenAuthModal={handleOpenAuthModal}
          onOpenPatientPortal={() => setPortalModalOpen(true)}
        />

        {/* 8. Interactive Hospital Locations & Department Availability Map */}
        <HospitalLocationsMapSection
          onOpenBooking={handleOpenBooking}
          onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
        />

        {/* 9. State-of-the-Art Facilities & Virtual Tour */}
        <FacilitiesAndVirtualTour />

        {/* 10. Why Choose We Care (Bento Grid & Accreditations) */}
        <WhyChooseUs />

        {/* 11. Patient Stories & Testimonials */}
        <TestimonialsSection />

        {/* 12. FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
        onOpenAIModal={() => setAiModalOpen(true)}
        onNavigate={handleNavigate}
        onOpenPatientPortal={() => setPortalModalOpen(true)}
        onOpenConsultationReportModal={() => handleOpenConsultReport()}
        onOpenAuthModal={handleOpenAuthModal}
        onOpenAdminPortal={() => setAdminModalOpen(true)}
      />

      {/* Floating Bottom Action Dock - Clean, Aligned & Aesthetic */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
        
        {/* Main Floating Glass Capsule */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-slate-950/50">
          
          {/* Doctor Report & Rx Button */}
          <button
            onClick={() => handleOpenConsultReport()}
            className="group flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-950/80 hover:bg-teal-900/80 text-teal-300 hover:text-teal-200 border border-teal-700/50 transition-all text-xs font-bold"
            title="Doctor Consultation Reports & Rx"
          >
            <FileText className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Doctor Reports</span>
          </button>

          {/* AI Clinical Triage Button */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="group flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 hover:text-indigo-200 border border-indigo-700/50 transition-all text-xs font-bold"
            title="AI Clinical Symptom Triage"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">AI Triage</span>
          </button>

          {/* SOS Emergency Trigger */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/40 transition-all active:scale-95 animate-pulse"
            title="24/7 Trauma & Ambulance Dispatch"
          >
            <Ambulance className="w-4 h-4" />
            <span>SOS</span>
          </button>
        </div>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 animate-in fade-in zoom-in-75 duration-200"
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modern Google & Phone OTP Auth Modal */}
      <ModernAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* 4-Step Interactive Booking Modal */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDeptId={prefillDeptId}
        initialDocId={prefillDocId}
        initialBranchId={prefillBranchId}
        initialSymptoms={prefillSymptoms}
        onAppointmentBooked={handleAppointmentBooked}
        onOpenPatientDashboard={() => setPortalModalOpen(true)}
        onOpenConsultationReport={(app) => handleOpenConsultReport(app)}
      />

      {/* Doctor Consultation Report Modal */}
      <ConsultationReportModal
        isOpen={consultReportModalOpen}
        onClose={() => setConsultReportModalOpen(false)}
        report={selectedConsultReport}
        onOpenBooking={(deptId, docId, symptoms) => handleOpenBooking(deptId, docId, symptoms)}
      />

      {/* AI Symptom Triage Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onSelectRecommendedBooking={(deptId, docId, symptoms) => {
          handleOpenBooking(deptId, docId, symptoms);
        }}
      />

      {/* 24/7 Emergency & Ambulance Dispatcher */}
      <EmergencyTrackerModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

      {/* Patient Dashboard & Health Hub Modal */}
      <PatientDashboard
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onOpenBooking={(deptId, docId) => handleOpenBooking(deptId, docId)}
        onOpenAIAssistant={() => setAiModalOpen(true)}
      />

      {/* Global Command Palette / Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectDoctor={(deptId, docId) => {
          handleFilterDoctorsByDept(deptId);
        }}
        onSelectDepartment={(deptId) => {
          handleFilterDoctorsByDept(deptId);
        }}
        onBookAppointment={(deptId, docId) => {
          handleOpenBooking(deptId, docId);
        }}
      />

      {/* Global Modern Online Payment & Prepaid Facilities Gateway Modal */}
      <OnlinePaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        item={activePaymentItem}
        onPaymentSuccess={(receipt) => {
          console.log('Payment completed:', receipt);
        }}
      />

      {/* Super Admin Command Center & Bookings Ledger Modal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onOpenConsultationReport={(app) => handleOpenConsultReport(app)}
      />
    </div>
  );
}
