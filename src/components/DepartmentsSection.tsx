import React, { useState } from 'react';
import { 
  HeartPulse, 
  Brain, 
  Activity, 
  Bone, 
  Stethoscope, 
  Baby, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Ambulance,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Users,
  Calendar,
  X,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { Department } from '../types/hospital';

interface DepartmentsSectionProps {
  onOpenBooking: (prefillDeptId?: string, prefillDocId?: string) => void;
  onFilterDoctorsByDept: (deptId: string) => void;
  selectedDeptId: string | null;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  onOpenBooking,
  onFilterDoctorsByDept,
  selectedDeptId
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalDept, setActiveModalDept] = useState<Department | null>(null);

  const categories = ['All', 'Surgical', 'Medical', 'Critical', 'Women & Child'];

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-500" />;
      case 'Brain': return <Brain className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-teal-500 dark:text-teal-400" />;
      case 'Bone': return <Bone className="w-6 h-6 text-amber-500" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />;
      case 'Baby': return <Baby className="w-6 h-6 text-pink-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-500 dark:text-purple-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />;
      case 'Eye': return <Eye className="w-6 h-6 text-blue-500 dark:text-blue-400" />;
      case 'Ambulance': return <Ambulance className="w-6 h-6 text-red-500" />;
      default: return <HeartPulse className="w-6 h-6 text-teal-500" />;
    }
  };

  const filteredDepts = activeCategory === 'All'
    ? DEPARTMENTS
    : DEPARTMENTS.filter(d => d.category === activeCategory);

  return (
    <section id="departments" className="py-20 bg-slate-50 dark:bg-slate-950/80 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200/50 dark:border-teal-700/60 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Centers of Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Specialized Departments & Robotic Institutes
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            From complex multi-vessel robotic heart surgery to micro-preemie neonatology, explore our JCI-accredited tertiary departments led by renowned medical authorities.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {cat === 'All' ? 'All 10 Departments' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept) => {
            const deptDoctors = DOCTORS.filter(doc => doc.departmentId === dept.id);
            const leadDoc = DOCTORS.find(doc => doc.id === dept.leadDoctorId);

            return (
              <div
                key={dept.id}
                className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
                  selectedDeptId === dept.id
                    ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-lg'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-teal-400/50 dark:hover:border-teal-500/60'
                }`}
              >
                {/* Department Image & Badges */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-white/20 dark:border-slate-700/60">
                    {dept.category}
                  </div>

                  {dept.emergencyAvailable && (
                    <div className="absolute top-3 right-3 bg-rose-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      24/7 ER Ready
                    </div>
                  )}

                  {/* Icon & Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md flex items-center justify-center shrink-0 border border-white/40 dark:border-slate-700">
                      {getDeptIcon(dept.iconName)}
                    </div>
                    <div className="text-white">
                      <h3 className="font-heading font-bold text-base leading-snug line-clamp-1 text-white">
                        {dept.name}
                      </h3>
                      <p className="text-[11px] text-teal-300 dark:text-teal-300 font-medium">
                        {deptDoctors.length} Senior Specialists
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {dept.description}
                    </p>

                    {/* Key Procedures Chips */}
                    <div className="mt-3.5 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Key Procedures & Care
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {dept.procedures.slice(0, 3).map((proc, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Stat Badge */}
                    {dept.stats[0] && (
                      <div className="mt-4 p-2.5 bg-teal-50/60 dark:bg-teal-950/40 rounded-xl border border-teal-100 dark:border-teal-800/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-teal-900 dark:text-teal-200">{dept.stats[0].label}:</span>
                        <span className="text-xs font-extrabold text-teal-700 dark:text-teal-300 font-heading">{dept.stats[0].value}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalDept(dept)}
                      className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 flex items-center gap-1 p-1 hover:underline"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Learn More</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onFilterDoctorsByDept(dept.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                        title="View Doctors"
                      >
                        Doctors
                      </button>

                      <button
                        onClick={() => onOpenBooking(dept.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department Deep-Dive Detail Modal */}
      {activeModalDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
            {/* Header with Image */}
            <div className="relative h-48 sm:h-56">
              <img
                src={activeModalDept.image}
                alt={activeModalDept.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveModalDept(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-teal-500 text-slate-950 px-2 py-0.5 rounded">
                  {activeModalDept.category} Center
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading mt-1 text-white">
                  {activeModalDept.name}
                </h3>
                <p className="text-xs text-teal-200 mt-0.5">
                  {activeModalDept.tagline}
                </p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                  Overview & Clinical Scope
                </h4>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeModalDept.description}
                </p>
              </div>

              {/* Department Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                {activeModalDept.stats.map((st, i) => (
                  <div key={i} className="text-center">
                    <p className="text-lg font-extrabold text-teal-700 dark:text-teal-400 font-heading">{st.value}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{st.label}</p>
                  </div>
                ))}
              </div>

              {/* Key Clinical Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
                  Key Highlights & Infrastructure
                </h4>
                <div className="space-y-2">
                  {activeModalDept.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Technologies */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
                  Advanced Technology & Equipment
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalDept.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800/80 flex items-center gap-1.5"
                    >
                      <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Patient Preparation Guide */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold">Patient Prep Guide: </span>
                {activeModalDept.patientGuide}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const deptId = activeModalDept.id;
                    setActiveModalDept(null);
                    onFilterDoctorsByDept(deptId);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span>View Specialists in {activeModalDept.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => {
                    const deptId = activeModalDept.id;
                    setActiveModalDept(null);
                    onOpenBooking(deptId);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
