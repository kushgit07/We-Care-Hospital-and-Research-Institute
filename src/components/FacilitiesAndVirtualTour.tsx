import React, { useState } from 'react';
import { 
  Building, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Cpu, 
  Wifi, 
  Wind, 
  Radio,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { FACILITIES } from '../data/hospitalData';
import { Facility } from '../types/hospital';

export const FacilitiesAndVirtualTour: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility>(FACILITIES[0]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const hotspots = [
    { title: 'Class 100 Laminar Airflow', desc: 'Continuous ultra-filtered HEPA air displacement ensuring zero ambient microbial load during open surgeries.' },
    { title: 'Sub-Millimeter 3D Robotics', desc: 'DaVinci Xi 4-arm master console translating surgeon hand motions into micro-articulated precision.' },
    { title: 'Intraoperative High-Res Telemetry', desc: 'Real-time multi-angle 4K visualization and AI-guided border margin fluorescence.' }
  ];

  return (
    <section id="facilities" className="py-20 bg-slate-50 dark:bg-slate-950/80 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/80 text-xs font-bold uppercase tracking-wide mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Infrastructure & Cutting-Edge Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            World-Class Medical Architecture
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Engineered for maximum patient safety, zero-infection sterile environments, and optimal clinical healing outcomes.
          </p>
        </div>

        {/* Facility Main Interactive Showcase */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Facility Tabs & Specs */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
            <div>
              {/* Category Selector Pills */}
              <div className="space-y-2 mb-6">
                {FACILITIES.map((fac) => (
                  <button
                    key={fac.id}
                    onClick={() => {
                      setSelectedFacility(fac);
                      setActiveHotspot(0);
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between ${
                      selectedFacility.id === fac.id
                        ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-bold uppercase block ${selectedFacility.id === fac.id ? 'text-teal-300 dark:text-teal-100' : 'text-slate-400 dark:text-slate-400'}`}>
                        {fac.category}
                      </span>
                      <span className="text-xs sm:text-sm font-bold truncate block">{fac.name}</span>
                    </div>
                    {selectedFacility.id === fac.id && (
                      <ChevronRight className="w-4 h-4 text-teal-400 dark:text-white shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Facility Details */}
              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-2.5 py-1 rounded-md border border-teal-200 dark:border-teal-800/80">
                  {selectedFacility.badge || 'Excellence Standard'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading mt-2">
                  {selectedFacility.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {selectedFacility.description}
                </p>

                {/* Features List */}
                <div className="mt-5 space-y-2">
                  {selectedFacility.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Specs Badges */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
              {selectedFacility.specs.map((spec, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Hotspot Explorer */}
          <div className="lg:col-span-7 relative bg-slate-950 flex items-center justify-center p-4 sm:p-6 min-h-[380px] sm:min-h-[480px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.name}
                className="w-full h-full object-cover min-h-[360px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>

              {/* Hotspot Nodes simulation */}
              <div className="absolute top-1/4 left-1/4">
                <button
                  onClick={() => setActiveHotspot(0)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-slate-950 transition-all ${
                    activeHotspot === 0
                      ? 'bg-teal-400 ring-4 ring-teal-400/40 scale-110'
                      : 'bg-white/90 hover:bg-white hover:scale-105'
                  }`}
                >
                  1
                </button>
              </div>

              <div className="absolute top-1/2 right-1/3">
                <button
                  onClick={() => setActiveHotspot(1)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-slate-950 transition-all ${
                    activeHotspot === 1
                      ? 'bg-teal-400 ring-4 ring-teal-400/40 scale-110'
                      : 'bg-white/90 hover:bg-white hover:scale-105'
                  }`}
                >
                  2
                </button>
              </div>

              <div className="absolute bottom-1/4 left-1/3">
                <button
                  onClick={() => setActiveHotspot(2)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-slate-950 transition-all ${
                    activeHotspot === 2
                      ? 'bg-teal-400 ring-4 ring-teal-400/40 scale-110'
                      : 'bg-white/90 hover:bg-white hover:scale-105'
                  }`}
                >
                  3
                </button>
              </div>

              {/* Active Hotspot Info Overlay Card */}
              {activeHotspot !== null && (
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Hotspot #{activeHotspot + 1} Technology Spec
                    </span>
                    <span className="text-[10px] text-slate-400">Click markers (1-3) to explore</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mt-1">
                    {hotspots[activeHotspot].title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {hotspots[activeHotspot].desc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
