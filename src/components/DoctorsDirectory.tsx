import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Video, 
  Award, 
  Clock, 
  GraduationCap, 
  Languages, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Stethoscope, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  PhoneCall,
  UserCheck,
  TrendingDown,
  Activity
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Doctor } from '../types/hospital';
import { DoctorPeakHoursChart } from './DoctorPeakHoursChart';

interface DoctorsDirectoryProps {
  onOpenBooking: (prefillDeptId?: string, prefillDocId?: string) => void;
  selectedDeptFilter: string | null;
  onClearDeptFilter: () => void;
}

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({
  onOpenBooking,
  selectedDeptFilter,
  onClearDeptFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDept, setActiveDept] = useState<string>(selectedDeptFilter || 'All');
  const [teleconsultOnly, setTeleconsultOnly] = useState(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');
  const [activeProfileDoctor, setActiveProfileDoctor] = useState<Doctor | null>(null);

  // Sync prop changes
  React.useEffect(() => {
    if (selectedDeptFilter) {
      setActiveDept(selectedDeptFilter);
    }
  }, [selectedDeptFilter]);

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Dept filter
      if (activeDept !== 'All' && doc.departmentId !== activeDept) {
        return false;
      }
      // Teleconsult filter
      if (teleconsultOnly && !doc.isTeleconsultAvailable) {
        return false;
      }
      // Experience filter
      if (doc.experienceYears < minExperience) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const dept = DEPARTMENTS.find(d => d.id === doc.departmentId);
        const matchName = doc.name.toLowerCase().includes(q);
        const matchSpecialty = doc.specialty.toLowerCase().includes(q);
        const matchSub = doc.subSpecialties.some(s => s.toLowerCase().includes(q));
        const matchDept = dept?.name.toLowerCase().includes(q);
        if (!matchName && !matchSpecialty && !matchSub && !matchDept) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, activeDept, teleconsultOnly, minExperience, sortBy]);

  return (
    <section id="doctors" className="py-20 bg-white dark:bg-slate-900 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/80 text-xs font-bold tracking-wide uppercase mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Distinguished Faculty & Surgeons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Meet Our World-Class Specialists
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Trained at Harvard, Johns Hopkins, Stanford, Oxford, and Cleveland Clinic. Consult our renowned doctors in-person or via secure HD tele-consultation.
          </p>
        </div>

        {/* Filter & Search Bar Panel */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name or specialty..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Select */}
            <div className="md:col-span-3">
              <select
                value={activeDept}
                onChange={(e) => setActiveDept(e.target.value)}
                className="w-full py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              >
                <option value="All">All Departments ({DOCTORS.length} Doctors)</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name.split(' ')[0]} - {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="rating">Top Rated ⭐</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            {/* Quick Toggle Checkbox */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  checked={teleconsultOnly}
                  onChange={(e) => setTeleconsultOnly(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <Video className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Video Consult</span>
              </label>

              {(activeDept !== 'All' || teleconsultOnly || searchQuery || minExperience > 0) && (
                <button
                  onClick={() => {
                    setActiveDept('All');
                    setTeleconsultOnly(false);
                    setMinExperience(0);
                    setSearchQuery('');
                    onClearDeptFilter();
                  }}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 font-semibold underline p-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeDept !== 'All' && (
            <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Filtered by:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 border border-teal-200 dark:border-teal-800 text-xs font-bold">
                {DEPARTMENTS.find(d => d.id === activeDept)?.name}
                <button onClick={() => { setActiveDept('All'); onClearDeptFilter(); }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <Stethoscope className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Specialists Match Your Filters</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try resetting your department or keyword search.</p>
            <button
              onClick={() => {
                setActiveDept('All');
                setTeleconsultOnly(false);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-sm"
            >
              Show All Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => {
              const dept = DEPARTMENTS.find(d => d.id === doc.departmentId);

              return (
                <div
                  key={doc.id}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-teal-400/80 dark:hover:border-teal-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Doctor Header & Portrait */}
                    <div className="p-5 pb-0 flex gap-4">
                      {/* Portrait */}
                      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {doc.isTeleconsultAvailable && (
                          <div 
                            className="absolute bottom-1 right-1 bg-teal-600 text-white p-1 rounded-md shadow-sm"
                            title="Video Tele-consultation Available"
                          >
                            <Video className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Doctor Basic Details */}
                      <div className="flex-1 min-w-0">
                        {doc.isHeadOfDept && (
                          <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/60 mb-1">
                            Director & Chief
                          </span>
                        )}
                        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-medium text-teal-700 dark:text-teal-400 mt-0.5 line-clamp-1">
                          {doc.specialty}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {dept?.name}
                        </p>

                        {/* Rating & Experience */}
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{doc.rating}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-normal">({doc.reviewCount})</span>
                          </div>
                          <div className="h-3 w-px bg-slate-200 dark:bg-slate-700"></div>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">{doc.experienceYears}+ Yrs Exp</span>
                        </div>
                      </div>
                    </div>

                    {/* Subspecialties / Tags */}
                    <div className="px-5 mt-4">
                      <div className="flex flex-wrap gap-1">
                        {doc.subSpecialties.slice(0, 3).map((sub, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-transparent dark:border-slate-700/60"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>

                      {/* Next Slot Available Pill & Traffic indicator */}
                      <div className="mt-3.5 space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100/80 dark:border-teal-800/60 flex items-center justify-between text-xs">
                          <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                            <span>Next Slot:</span>
                          </span>
                          <span className="font-bold text-teal-800 dark:text-teal-300">
                            {doc.nextAvailableSlot}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveProfileDoctor(doc)}
                          className="w-full text-[11px] font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:bg-teal-50/50 transition-colors"
                        >
                          <TrendingDown className="w-3 h-3 text-teal-500" />
                          <span>View Peak vs Quiet Hours Chart</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Card Footer */}
                  <div className="p-5 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 block font-medium">Consultation Fee</span>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">${doc.fee}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveProfileDoctor(doc)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => onOpenBooking(doc.departmentId, doc.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Doctor Comprehensive Bio Modal */}
      {activeProfileDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
            {/* Modal Top Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-teal-950 text-white relative">
              <button
                onClick={() => setActiveProfileDoctor(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={activeProfileDoctor.image}
                  alt={activeProfileDoctor.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-teal-400/60 shadow-lg shrink-0"
                />
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    {activeProfileDoctor.isHeadOfDept && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                        Department Director
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-900 text-teal-200 border border-teal-700">
                      {DEPARTMENTS.find(d => d.id === activeProfileDoctor.departmentId)?.name}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                    {activeProfileDoctor.name}
                  </h3>
                  <p className="text-xs text-teal-300 font-medium mt-0.5">
                    {activeProfileDoctor.title}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {activeProfileDoctor.qualifications}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
                    <div className="flex items-center gap-1 font-bold text-amber-300">
                      <Star className="w-4 h-4 fill-amber-300" />
                      <span>{activeProfileDoctor.rating} Rating ({activeProfileDoctor.reviewCount} Verified Reviews)</span>
                    </div>
                    <span>•</span>
                    <span>{activeProfileDoctor.experienceYears} Years Clinical Excellence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Bio & Philosophy */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                  About & Clinical Philosophy
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeProfileDoctor.bio}
                </p>
              </div>

              {/* Education & Fellowships */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
                  Education & Advanced Fellowships
                </h4>
                <div className="space-y-1.5">
                  {activeProfileDoctor.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Awards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
                  Key Recognitions & Awards
                </h4>
                <div className="space-y-1.5">
                  {activeProfileDoctor.awards.map((award, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly OPD Schedule */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                  OPD Clinical Schedule & Consultation Timings
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Clinic Days</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeProfileDoctor.opdDays.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Consultation Timings</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeProfileDoctor.timings}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-400 block text-[11px]">Languages Spoken</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activeProfileDoctor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* RECHARTS DATA VISUALIZATION: PEAK VS QUIET HOURS */}
              <div>
                <DoctorPeakHoursChart 
                  doctor={activeProfileDoctor} 
                  onSelectSlotToBook={(day, time) => {
                    const docId = activeProfileDoctor.id;
                    const deptId = activeProfileDoctor.departmentId;
                    setActiveProfileDoctor(null);
                    onOpenBooking(deptId, docId);
                  }}
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-400">Consultation Fee</span>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">${activeProfileDoctor.fee}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveProfileDoctor(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      const docId = activeProfileDoctor.id;
                      const deptId = activeProfileDoctor.departmentId;
                      setActiveProfileDoctor(null);
                      onOpenBooking(deptId, docId);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment with {activeProfileDoctor.name.split(',')[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
