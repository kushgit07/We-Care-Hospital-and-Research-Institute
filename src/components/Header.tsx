import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Search, 
  Calendar, 
  AlertCircle, 
  Menu, 
  X, 
  Heart, 
  Shield, 
  Activity, 
  UserCheck, 
  Sparkles,
  Ambulance,
  Stethoscope,
  ChevronDown,
  LogIn,
  KeyRound,
  FileText
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { ThemeToggle } from './ThemeToggle';
import { UserAccountMenu } from './UserAccountMenu';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenBooking: (prefillDeptId?: string, prefillDocId?: string) => void;
  onOpenPayment?: (item?: any) => void;
  onOpenAIModal: () => void;
  onOpenEmergencyModal: () => void;
  onOpenPatientPortal: () => void;
  onOpenConsultationReportModal?: () => void;
  onOpenSearch: () => void;
  onOpenAuthModal: (mode?: 'google' | 'phone' | 'signin') => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  bookedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenPayment,
  onOpenAIModal,
  onOpenEmergencyModal,
  onOpenPatientPortal,
  onOpenConsultationReportModal,
  onOpenSearch,
  onOpenAuthModal,
  activeSection,
  onNavigate,
  bookedCount
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Grouped Navigation: Primary Direct Links + Clean Dropdown
  const primaryLinks = [
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'services', label: 'Services & Packages' },
    { id: 'ai-medications', label: 'AI Medicine' },
    { id: 'locations-map', label: 'Campus Map' },
  ];

  const secondaryLinks = [
    { id: 'insights', label: 'Health & Insights' },
    { id: 'facilities', label: 'Facilities & Tech' },
    { id: 'why-us', label: 'Why We Care' },
    { id: 'testimonials', label: 'Patient Stories' },
    { id: 'faq', label: 'FAQ' },
  ];

  const allNavLinks = [...primaryLinks, ...secondaryLinks];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Emergency & Info Ticker Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs border-b border-slate-800 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          {/* Emergency Hotline */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2.5 py-0.5 rounded-full font-semibold animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              24/7 Trauma Hotline:
              <a href={`tel:${HOSPITAL_INFO.phoneEmergency}`} className="hover:underline text-white font-bold ml-0.5">
                {HOSPITAL_INFO.phoneEmergency}
              </a>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>ER Wait Time: <strong className="text-emerald-400 font-medium">&lt; 8 Mins</strong></span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Medical District, NY • Helipad Operational</span>
            </div>
          </div>

          {/* Quick Actions Right */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* User Login / Profile Menu Placed on the Left of Prepay Online */}
            <UserAccountMenu
              onOpenAuthModal={() => onOpenAuthModal('signin')}
              onOpenPatientPortal={onOpenPatientPortal}
              onOpenBooking={() => onOpenBooking()}
              onOpenAIModal={onOpenAIModal}
            />

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            {onOpenPayment && (
              <button
                onClick={() => onOpenPayment()}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-bold transition-colors bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-700/60 shadow-sm"
                title="Prepaid Healthcare Facilities & Global Payment Gateway"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Prepay Online (₹/$)</span>
              </button>
            )}

            <button
              onClick={onOpenEmergencyModal}
              className="flex items-center gap-1.5 text-rose-300 hover:text-rose-200 font-semibold transition-colors bg-rose-900/30 px-2 py-0.5 rounded border border-rose-800/40"
              title="Track Ambulance Dispatch"
            >
              <Ambulance className="w-3.5 h-3.5 text-rose-400" />
              <span>Ambulance Dispatch</span>
            </button>

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            {onOpenConsultationReportModal && (
              <button
                onClick={onOpenConsultationReportModal}
                className="hidden md:flex items-center gap-1.5 text-teal-300 hover:text-white transition-colors"
                title="View Doctor Consultation Summary Report"
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                <span>Doctor Reports</span>
              </button>
            )}

            <div className="h-3 w-px bg-slate-700 hidden md:block"></div>

            <button
              onClick={onOpenPatientPortal}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors relative"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Patient Portal</span>
              {bookedCount > 0 && (
                <span className="bg-teal-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookedCount}
                </span>
              )}
            </button>

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            <span className="hidden sm:inline-block text-slate-400 font-medium">
              JCI Gold Certified 🏅
            </span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphism Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-lg py-2.5 sm:py-3' 
            : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNavigate('hero');
            }}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-teal-600 via-sky-600 to-indigo-600 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-teal-950 to-sky-900 dark:from-white dark:via-teal-200 dark:to-sky-200 bg-clip-text text-transparent whitespace-nowrap">
                  WE CARE
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-700/60">
                  Hospital
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-tight hidden md:block whitespace-nowrap">
                & Research Institute • Center of Excellence
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Compact, Modern & Overflow-Proof) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {primaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-teal-700 dark:text-teal-300 bg-teal-50/90 dark:bg-teal-950/70 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* "More Explore" Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1 transition-all ${
                  moreMenuOpen || secondaryLinks.some(s => s.id === activeSection)
                    ? 'text-teal-700 dark:text-teal-300 bg-teal-50/90 dark:bg-teal-950/70 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Explore More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180 text-teal-600' : ''}`} />
              </button>

              {moreMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setMoreMenuOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                      Hospital Insights & Media
                    </div>
                    {secondaryLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onNavigate(link.id);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                          activeSection === link.id
                            ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{link.label}</span>
                        {activeSection === link.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global Theme Toggle */}
            <ThemeToggle />

            {/* AI Health Triage Button */}
            <button
              onClick={onOpenAIModal}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/50 dark:to-teal-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group shrink-0"
              title="AI Symptom Triage"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform" />
              <span>AI Triage</span>
            </button>

            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200/70 dark:border-slate-700/80 shrink-0"
              title="Search Doctors, Departments & Tests (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Primary Book Appointment CTA - Compact, Responsive, Inside Bounds */}
            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {/* Mobile Quick Action Grid */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIModal();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium text-xs border border-indigo-100 dark:border-indigo-800/60"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>AI Symptom Triage</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEmergencyModal();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-medium text-xs border border-rose-100 dark:border-rose-800/60"
              >
                <Ambulance className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Emergency SOS</span>
              </button>
            </div>

            {/* Mobile Theme Switcher */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Display Appearance
              </span>
              <ThemeToggle variant="segmented" />
            </div>

            <div className="space-y-1">
              {allNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(link.id);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-slate-800 border border-teal-200/80 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-teal-700 dark:text-teal-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout('Mobile menu logout');
                    }}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal('google');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-teal-400" />
                  <span>Sign In (Google Mail & Phone OTP)</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPatientPortal();
                }}
                className="w-full py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Patient Portal ({bookedCount} active)</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
