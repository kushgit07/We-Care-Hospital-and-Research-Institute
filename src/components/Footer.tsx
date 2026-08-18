import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Heart, 
  ArrowUp, 
  Send, 
  CheckCircle2,
  Calendar,
  Sparkles,
  Ambulance
} from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data/hospitalData';
import { saveInquiryToSupabase } from '../services/backendService';

interface FooterProps {
  onOpenBooking: (deptId?: string) => void;
  onOpenEmergencyModal: () => void;
  onOpenAIModal: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPatientPortal?: () => void;
  onOpenConsultationReportModal?: () => void;
  onOpenAuthModal?: (mode?: 'google' | 'phone') => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenEmergencyModal,
  onOpenAIModal,
  onNavigate,
  onOpenPatientPortal,
  onOpenConsultationReportModal,
  onOpenAuthModal,
  onOpenAdminPortal
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      saveInquiryToSupabase({
        fullName: 'Wellness Digest Subscriber',
        email: newsletterEmail,
        subject: 'Newsletter Subscription',
        message: 'Patient subscribed to weekly clinical wellness digest & alerts.'
      }).catch(err => console.info('Newsletter sync:', err));
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency CTA Strip */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border border-rose-800/60 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-2xl bg-rose-600/30 border border-rose-500 flex items-center justify-center text-rose-400 shrink-0">
              <Ambulance className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-400">
                24/7 Level-1 Emergency & Trauma Care
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading mt-0.5">
                Immediate Life-Saving Medical Response
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Zero triage waiting time. Mobile ICU ambulances with real-time telemetry to hospital ER.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenEmergencyModal}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-rose-900/60 transition-all flex items-center gap-2"
            >
              <Ambulance className="w-4 h-4" />
              <span>Ambulance Dispatch</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info (2 cols width on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-600 text-white shadow-md shadow-teal-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                  WE CARE HOSPITAL
                </span>
                <p className="text-[11px] text-teal-400 font-medium">
                  & Research Institute • Est. {HOSPITAL_INFO.established}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We Care Hospital is an internationally accredited multi-specialty tertiary care center dedicated to pioneering robotic surgery, precision cancer therapy, advanced neuroscience, and compassionate family-centered healthcare.
            </p>

            {/* Accreditations Badges */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Accreditations & Quality Standards
              </span>
              <div className="flex flex-wrap gap-1.5">
                {HOSPITAL_INFO.accreditations.map((acc, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                  >
                    🏅 {acc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Flagship Departments */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
              Specialized Centers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {DEPARTMENTS.slice(0, 6).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => {
                      onNavigate('departments');
                    }}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {d.name.split(' ')[0]} - {d.name.slice(0, 24)}...
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Patient Care Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {onOpenConsultationReportModal && (
                <li>
                  <button onClick={onOpenConsultationReportModal} className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1.5">
                    <span>Doctor Consultation Reports & Rx</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-teal-950 text-teal-300 rounded border border-teal-800">New</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('ai-medications')} className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1.5">
                  <span>AI Medicine & Disease Search</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-teal-950 text-teal-300 rounded border border-teal-800">AI Powered</span>
                </button>
              </li>
              {onOpenPatientPortal && (
                <li>
                  <button onClick={onOpenPatientPortal} className="hover:text-teal-400 font-medium transition-colors flex items-center gap-1.5">
                    <span>Patient Dashboard & Lab Reports</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-teal-950 text-teal-300 rounded border border-teal-800">Secure</span>
                  </button>
                </li>
              )}
              {onOpenAuthModal && (
                <li>
                  <button onClick={() => onOpenAuthModal('google')} className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <span>Google Mail & Phone OTP Sign In</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-teal-300 rounded font-semibold">One-Tap</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onOpenBooking()} className="hover:text-teal-400 transition-colors">
                  Doctor Appointment Desk
                </button>
              </li>
              <li>
                <button onClick={onOpenAIModal} className="hover:text-teal-400 transition-colors">
                  AI Symptom Triage Tool
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-teal-400 transition-colors">
                  Health Checkup Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('why-us')} className="hover:text-teal-400 transition-colors">
                  Cashless Insurance Network
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations-map')} className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1.5">
                  <span>Interactive Hospital & Branch Map</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-teal-950 text-teal-300 rounded border border-teal-800">Map UI</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('facilities')} className="hover:text-teal-400 transition-colors">
                  Virtual Campus Tour & Facilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-teal-400 transition-colors">
                  Visiting Hours & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3">
              Contact & Health Alerts
            </h4>
            
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.phoneGeneral}`} className="hover:underline text-white">
                  {HOSPITAL_INFO.phoneGeneral}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${HOSPITAL_INFO.email}`} className="hover:underline text-white">
                  {HOSPITAL_INFO.email}
                </a>
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
                Subscribe to Wellness Digest
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-1">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold shrink-0"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <p className="text-[10px] text-emerald-400 mt-1">Thank you for subscribing!</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright, Global Payment Badges & Rights */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <div>
              © {new Date().getFullYear()} {HOSPITAL_INFO.name}. All rights reserved. JCI & NABH Accredited.
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>💳 256-Bit SSL Encrypted Global Healthcare Payments:</span>
              <span className="font-semibold text-slate-300">UPI 2.0 • GPay • PhonePe • VISA • MasterCard • RuPay • Amex • Apple Pay • Stripe Global</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="hover:underline cursor-pointer">Patient Rights Charter</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">HIPAA Privacy Notice</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            {onOpenAdminPortal && (
              <button
                type="button"
                onClick={onOpenAdminPortal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-teal-300 border border-slate-800 transition-colors font-medium text-[11px]"
                title="Strict Single-Slot Hospital Admin Command Center"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Admin Login / Sign Up</span>
              </button>
            )}
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 transition-colors ml-1"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
