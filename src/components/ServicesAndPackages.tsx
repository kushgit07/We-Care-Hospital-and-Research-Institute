import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  ScanLine, 
  HeartPulse, 
  Droplet, 
  Home, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Info, 
  Calendar,
  X,
  FileCheck,
  Tag
} from 'lucide-react';
import { CLINICAL_SERVICES, HEALTH_PACKAGES } from '../data/hospitalData';
import { ClinicalService, HealthPackage } from '../types/hospital';

interface ServicesAndPackagesProps {
  onOpenBooking: (prefillDeptId?: string, prefillDocId?: string) => void;
  onOpenPayment?: (item: {
    id: string;
    title: string;
    category: 'package' | 'consultation' | 'diagnostic' | 'emergency';
    description?: string;
    amountINR: number;
    originalPriceINR?: number;
    departmentName?: string;
  }) => void;
}

export const ServicesAndPackages: React.FC<ServicesAndPackagesProps> = ({ onOpenBooking, onOpenPayment }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'services'>('packages');
  const [activeModalPackage, setActiveModalPackage] = useState<HealthPackage | null>(null);
  const [activeModalService, setActiveModalService] = useState<ClinicalService | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-teal-600" />;
      case 'Layers': return <Layers className="w-6 h-6 text-sky-600" />;
      case 'ScanLine': return <ScanLine className="w-6 h-6 text-indigo-600" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Droplet': return <Droplet className="w-6 h-6 text-blue-600" />;
      case 'Home': return <Home className="w-6 h-6 text-emerald-600" />;
      default: return <Sparkles className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wide mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Diagnostics & Preventive Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Comprehensive Clinical Services & Health Packages
          </h2>
          <p className="mt-3 text-base text-slate-300">
            From state-of-the-art diagnostic imaging to personalized preventative checkup packages, protect your long-term health with proactive medicine.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-800 border border-slate-700">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'packages'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Preventive Health Packages ({HEALTH_PACKAGES.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'services'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Advanced Clinical Diagnostics ({CLINICAL_SERVICES.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Health Checkup Packages */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEALTH_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-slate-850/80 backdrop-blur-md ${
                  pkg.popular
                    ? 'border-teal-400 ring-2 ring-teal-400/20 shadow-xl shadow-teal-950/50'
                    : 'border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {/* Popular Pill */}
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 text-[11px] font-black uppercase tracking-widest text-center py-1">
                    ★ Most Recommended ★
                  </div>
                )}

                <div className="p-6">
                  {/* Top Badge */}
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-teal-300 border border-slate-700">
                    {pkg.tag || 'Health Package'}
                  </span>

                  <h3 className="font-heading font-extrabold text-lg text-white mt-3 leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-heading">${pkg.price}</span>
                    <span className="text-sm text-slate-500 line-through">${pkg.originalPrice}</span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                    </span>
                  </div>

                  {/* Fasting & Tests Count */}
                  <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-800/60 p-2 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Parameters</span>
                      <span className="font-bold text-teal-300">{pkg.testsCount} Tests</span>
                    </div>
                    <div className="bg-slate-800/60 p-2 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Reports</span>
                      <span className="font-bold text-white">{pkg.reportTime}</span>
                    </div>
                  </div>

                  {/* Sample tests list */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Includes Major Screenings:
                    </span>
                    {pkg.includedCategories.slice(0, 2).map((cat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{cat.category} ({cat.tests.length} tests)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => setActiveModalPackage(pkg)}
                    className="w-full py-2 text-xs font-semibold text-teal-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View All {pkg.testsCount} Tests</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenBooking('dept-cardio')}
                      className="py-2.5 px-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1 active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      <span>Book Slot</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenPayment) {
                          onOpenPayment({
                            id: pkg.id,
                            title: pkg.name,
                            category: 'package',
                            description: pkg.tagline,
                            amountINR: pkg.price * 83, // converted to standard INR base
                            originalPriceINR: pkg.originalPrice * 83,
                            departmentName: 'Preventive Health Care',
                          });
                        } else {
                          onOpenBooking('dept-cardio');
                        }
                      }}
                      className="py-2.5 px-2 text-xs font-black text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-md transition-all flex items-center justify-center gap-1 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      <span>Prepay Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Clinical Diagnostic Services */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINICAL_SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="bg-slate-850/90 border border-slate-700/80 hover:border-teal-500/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                      {getServiceIcon(serv.iconName)}
                    </div>
                    <span className="text-xs font-bold text-teal-400 bg-teal-950/80 border border-teal-800/60 px-2.5 py-1 rounded-full">
                      {serv.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mt-4">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {serv.description}
                  </p>

                  {/* Service Features */}
                  <div className="mt-4 space-y-1.5">
                    {serv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Report Turnaround</span>
                    <span className="text-xs font-bold text-white">{serv.turnaroundTime}</span>
                  </div>

                  <button
                    onClick={() => setActiveModalService(serv)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  >
                    Preparation Tips
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Package Detail Modal */}
      {activeModalPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-white relative">
            <button
              onClick={() => setActiveModalPackage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-1 rounded-md border border-teal-800">
              {activeModalPackage.tag || 'Checkup Package'}
            </span>

            <h3 className="text-2xl font-extrabold font-heading mt-2">
              {activeModalPackage.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {activeModalPackage.tagline}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Tests</span>
                <span className="text-lg font-bold text-teal-300">{activeModalPackage.testsCount} Parameters</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Fasting Required</span>
                <span className="text-lg font-bold text-white">
                  {activeModalPackage.fastingRequired ? `${activeModalPackage.fastingHours} Hours` : 'No Fasting'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Report Time</span>
                <span className="text-lg font-bold text-emerald-400">{activeModalPackage.reportTime}</span>
              </div>
            </div>

            {/* Test Categories breakdown */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {activeModalPackage.includedCategories.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2">
                    {cat.category}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {cat.tests.map((test, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{test}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total All-Inclusive Price</span>
                <p className="text-2xl font-extrabold text-white font-heading">${activeModalPackage.price}</p>
              </div>

              <button
                onClick={() => {
                  setActiveModalPackage(null);
                  onOpenBooking('dept-cardio');
                }}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg"
              >
                Schedule Checkup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white relative">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2.5 py-1 rounded-md border border-teal-800">
              {activeModalService.category} Service
            </span>

            <h3 className="text-xl font-extrabold font-heading mt-2">
              {activeModalService.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {activeModalService.description}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200">
              <span className="font-bold text-amber-300 block mb-1">Preparation Instructions:</span>
              {activeModalService.preparationTips}
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Duration:</span>
                <span className="font-bold text-white">{activeModalService.duration}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Estimated Cost / Insurance:</span>
                <span className="font-bold text-white">{activeModalService.price}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Doorstep Collection Available:</span>
                <span className="font-bold text-teal-400">{activeModalService.includesHomeCollection ? 'Yes (Complimentary)' : 'Hospital In-Person Only'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveModalService(null);
                onOpenBooking('dept-cardio');
              }}
              className="w-full mt-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-md"
            >
              Book Service Slot
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
