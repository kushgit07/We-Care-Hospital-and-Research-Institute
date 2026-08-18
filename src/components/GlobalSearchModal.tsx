import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Stethoscope, 
  Building2, 
  Layers, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  HeartPulse,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, CLINICAL_SERVICES, HEALTH_PACKAGES } from '../data/hospitalData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctor: (deptId: string, docId: string) => void;
  onSelectDepartment: (deptId: string) => void;
  onBookAppointment: (deptId?: string, docId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoctor,
  onSelectDepartment,
  onBookAppointment
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = searchTerm.toLowerCase().trim();

  const matchedDoctors = q
    ? DOCTORS.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.subSpecialties.some(s => s.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedDepartments = q
    ? DEPARTMENTS.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.procedures.some(p => p.toLowerCase().includes(q)) ||
          d.technologies.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const matchedServices = q
    ? CLINICAL_SERVICES.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedPackages = q
    ? HEALTH_PACKAGES.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.idealFor.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const hasResults =
    matchedDoctors.length > 0 ||
    matchedDepartments.length > 0 ||
    matchedServices.length > 0 ||
    matchedPackages.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-950">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors, departments, tests, surgeries, symptoms..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-5">
          {!searchTerm ? (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                Quick Category Suggestions:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Cardiology', deptId: 'dept-cardio' },
                  { label: 'Robotic Knee', deptId: 'dept-ortho' },
                  { label: 'Brain Surgery', deptId: 'dept-neuro' },
                  { label: 'IVF Maternity', deptId: 'dept-obgyn' },
                  { label: 'Cancer Care', deptId: 'dept-onco' },
                  { label: 'Level-IV NICU', deptId: 'dept-peds' },
                  { label: 'Kidney Dialysis', deptId: 'dept-renal' },
                  { label: 'SMILE Pro Eye', deptId: 'dept-eye' }
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => {
                      onSelectDepartment(s.deptId);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-900 dark:hover:text-teal-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all text-left truncate"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-12">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No results found for "{searchTerm}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for doctor names, procedures (e.g. bypass, mri, robotic), or medical specialties.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Doctor Matches */}
              {matchedDoctors.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block mb-2">
                    Specialists ({matchedDoctors.length})
                  </span>
                  <div className="space-y-2">
                    {matchedDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          onSelectDoctor(doc.departmentId, doc.id);
                          onClose();
                        }}
                        className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</p>
                            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">{doc.specialty}</p>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookAppointment(doc.departmentId, doc.id);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Book</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Department Matches */}
              {matchedDepartments.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-2">
                    Hospital Departments ({matchedDepartments.length})
                  </span>
                  <div className="space-y-2">
                    {matchedDepartments.map((dept) => (
                      <div
                        key={dept.id}
                        onClick={() => {
                          onSelectDepartment(dept.id);
                          onClose();
                        }}
                        className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{dept.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-sm">{dept.tagline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnostic Services */}
              {matchedServices.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-2">
                    Clinical Services & Tests ({matchedServices.length})
                  </span>
                  <div className="space-y-2">
                    {matchedServices.map((serv) => (
                      <div
                        key={serv.id}
                        onClick={() => {
                          onBookAppointment();
                          onClose();
                        }}
                        className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{serv.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{serv.turnaroundTime} • {serv.price}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300">
                          {serv.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
