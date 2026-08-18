import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  HeartHandshake, 
  Clock, 
  Sparkles, 
  Award, 
  Users, 
  Activity, 
  CheckCircle2, 
  Building
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-900 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/80 text-xs font-bold uppercase tracking-wide mb-3">
            <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>The We Care Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Why Patients Worldwide Entrust Their Lives to Us
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            A fusion of pioneering robotic surgical systems, zero-infection rated sterile suites, paperless cashless claims, and unwavering compassionate empathy.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Bento Card 1 (Large 2 cols): Robotic Precision */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-8 shadow-xl border border-teal-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Pioneering Surgical Robotics
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                Over 12,500+ Successful Robotic Surgeries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-lg">
                Utilizing DaVinci Xi, Mako Robotic Arm, and intraoperative 3T MRI systems to deliver millimeter-level precision, zero muscle cutting, and same-day recovery.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-3 relative z-10">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-teal-300 font-heading">99.4%</span>
                <p className="text-[11px] text-slate-400 font-medium">Surgical Precision</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-heading">&lt; 48h</span>
                <p className="text-[11px] text-slate-400 font-medium">Average Discharge</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-heading">-70%</span>
                <p className="text-[11px] text-slate-400 font-medium">Blood Loss Index</p>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Zero Infection Standard */}
          <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Zero-Infection Rated ICUs & Theaters
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Positive pressure Class 100 laminar airflow with 24-stage HEPA microbial scrubbers ensuring absolute sterile safety.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>JCI Gold Benchmark</span>
            </div>
          </div>

          {/* Bento Card 3: 100% Cashless Insurance */}
          <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center mb-4 border border-sky-200 dark:border-sky-800">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                100% Cashless Insurance Desk
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Pre-authorization with 50+ global insurance partners within 60 minutes. Zero paperwork stress for your family.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Pre-Auth Desk</span>
            </div>
          </div>

          {/* Bento Card 4: 24/7 Level-1 Emergency */}
          <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-4 border border-rose-200 dark:border-rose-800">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                &lt; 8-Minute Emergency Triage
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Door-to-Doctor assessment in minutes. Advanced Mobile ICU fleet with rooftop trauma helipad operational 24/7/365.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Door-to-Balloon &lt; 45m</span>
            </div>
          </div>

          {/* Bento Card 5 (Large 2 cols): International Concierge */}
          <div className="md:col-span-2 bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Global Patient Hub
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-white mt-1">
                Dedicated International Patient Concierge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Airport pick-up, multi-lingual medical interpreters, embassy liaison, and priority executive suites for over 3,000 international patients annually from 45+ nations.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span>✈️ Medical Visa Facilitation</span>
              <span>🗣️ 14 Native Language Interpreters</span>
              <span>🏨 5-Star Recovery Guest Suites</span>
            </div>
          </div>

          {/* Bento Card 6: Compassionate Nursing */}
          <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4 border border-purple-200 dark:border-purple-800">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                1:1 Critical Nurse Ratio
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Magnet-recognized nurse staffing standards in our CCU, NICU, and transplant recovery suites.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Compassionate Care</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
