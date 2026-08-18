import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Sparkles, 
  Ambulance, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Stethoscope,
  Activity,
  PhoneCall,
  Flame
} from 'lucide-react';
import { HOSPITAL_INFO, DEPARTMENTS } from '../data/hospitalData';

interface HeroProps {
  onOpenBooking: (prefillDeptId?: string, prefillDocId?: string) => void;
  onOpenAIModal: () => void;
  onOpenEmergencyModal: () => void;
  onSelectDepartment: (deptId: string) => void;
  onSearchQuery: (query: string) => void;
  onOpenPatientPortal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenAIModal,
  onOpenEmergencyModal,
  onSelectDepartment,
  onSearchQuery,
  onOpenPatientPortal
}) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const quickSearchTags = [
    { label: 'Cardiology', deptId: 'dept-cardio' },
    { label: 'Robotic Knee', deptId: 'dept-ortho' },
    { label: 'Brain & Spine', deptId: 'dept-neuro' },
    { label: 'Cancer Care', deptId: 'dept-onco' },
    { label: 'Pediatrics / NICU', deptId: 'dept-peds' },
    { label: 'IVF & Maternity', deptId: 'dept-obgyn' },
    { label: 'Kidney Transplant', deptId: 'dept-renal' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      onSearchQuery(searchInputValue.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Medical Ambient Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:28px_28px] opacity-15"></div>
      
      {/* Ambient glowing radial orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-[450px] h-[350px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Accreditations */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-semibold shadow-inner">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>JCI Gold Seal & NABH Certified Tertiary Medical Center</span>
          </div>
          
          {onOpenPatientPortal && (
            <button
              onClick={onOpenPatientPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-teal-950 border border-slate-700 hover:border-teal-500/40 text-teal-300 text-xs font-bold transition-all shadow-md group"
            >
              <Activity className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Patient Dashboard & Lab Records</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Ranked Top #1 Hospital 2025</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              World-Class Healthcare,{' '}
              <span className="bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Exceptional Healing.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience the pinnacle of tertiary medicine at <strong className="text-white font-semibold">We Care Hospital</strong>. Powered by 380+ global specialists, DaVinci robotic surgery, intraoperative 3T MRI, and zero-compromise human empathy.
            </p>

            {/* Interactive Hero Quick Search Box */}
            <div className="mt-8 max-w-2xl mx-auto lg:mx-0 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl shadow-teal-950/40">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    placeholder="Search doctor name, department, condition (e.g. Angioplasty, Knee Pain)..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/70 border border-slate-700/60 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Filter Pills */}
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Popular Centers:</span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={() => onSelectDepartment(tag.deptId)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-teal-950/80 text-slate-300 hover:text-teal-300 border border-slate-700 hover:border-teal-500/40 transition-all font-medium"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-base shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all active:scale-95 flex items-center gap-3"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Book Instant Consultation</span>
              </button>

              <button
                onClick={onOpenAIModal}
                className="px-6 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base transition-all hover:border-indigo-500/60 flex items-center gap-2.5 group"
              >
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>AI Symptom Triage</span>
              </button>

              <button
                onClick={onOpenEmergencyModal}
                className="px-5 py-4 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-700/60 text-rose-300 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Ambulance className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>24/7 SOS Ambulance</span>
              </button>
            </div>

            {/* Trust Checklist */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>100% Cashless Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero-Queue Digital Triage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Same-Day Lab Reports</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Hospital Showcase Card & Live Indicators */}
          <div className="lg:col-span-5 relative">
            {/* Main Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/70 bg-gradient-to-b from-slate-800/90 to-slate-900/90 shadow-2xl shadow-teal-950/60 p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                  alt="We Care Hospital Operating Theater"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Robotic Surgery Suite #4 Live</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    Advanced Tertiary Campus
                  </p>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    DaVinci Xi Robotic & Hybrid Heart Theater
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    Class 100 laminar airflow with sub-millimeter precision surgical robotics.
                  </p>
                </div>
              </div>

              {/* Real-time Sub-cards Grid */}
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Emergency Desk</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      Active
                    </span>
                  </div>
                  <div className="mt-2 text-xl font-extrabold text-white font-heading">
                    &lt; 8 Mins
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Average triage wait time</p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Doctors on Duty</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/60">
                      Live
                    </span>
                  </div>
                  <div className="mt-2 text-xl font-extrabold text-white font-heading">
                    68 Specialists
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Across 35 disciplines</p>
                </div>
              </div>
            </div>

            {/* Floating Live Indicator Badge */}
            <div className="hidden sm:flex absolute -bottom-4 left-4 bg-slate-900/95 backdrop-blur-xl border border-teal-500/40 p-3.5 rounded-2xl shadow-2xl shadow-slate-950/80 items-center gap-3 max-w-[280px] z-20">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">99.4% Patient Healing Index</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Over 1.2M+ treated with excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Quick Launchpad Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onOpenBooking()}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/50 p-5 rounded-2xl transition-all hover:shadow-xl hover:shadow-teal-950/40"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading flex items-center justify-between">
              <span>Book Doctor Slot</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 mt-1.5">
              Consult 380+ senior consultants in clinic or via HD video tele-health.
            </p>
          </div>

          <div 
            onClick={onOpenAIModal}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl transition-all hover:shadow-xl hover:shadow-indigo-950/40"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading flex items-center justify-between">
              <span>AI Symptom Triage</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 mt-1.5">
              Instant clinical AI assessment to match symptoms to the exact specialist.
            </p>
          </div>

          <div 
            onClick={onOpenEmergencyModal}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-rose-500/50 p-5 rounded-2xl transition-all hover:shadow-xl hover:shadow-rose-950/40"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Ambulance className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading flex items-center justify-between">
              <span>24/7 Trauma & Ambulance</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 mt-1.5">
              Real-time GPS ambulance dispatch with mobile ICU telemetry.
            </p>
          </div>

          <div 
            onClick={() => onSelectDepartment('dept-cardio')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/50 p-5 rounded-2xl transition-all hover:shadow-xl hover:shadow-sky-950/40"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading flex items-center justify-between">
              <span>Specialty Centers</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-xs text-slate-400 mt-1.5">
              Explore 10 flagship tertiary institutes & advanced robotic theaters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
