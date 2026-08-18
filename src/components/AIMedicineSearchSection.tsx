import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Pill, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Heart, 
  Clock, 
  Activity, 
  Stethoscope, 
  ChevronRight, 
  Copy, 
  Check, 
  Printer, 
  HelpCircle, 
  Zap, 
  BookOpen, 
  Filter, 
  RefreshCw, 
  ArrowRight,
  Info,
  Layers,
  Award,
  ExternalLink,
  Flame,
  ShieldCheck,
  X
} from 'lucide-react';
import { searchMedicationsWithAI } from '../services/aiService';
import { AIMedicationSearchResult, AIMedicationItem } from '../types/hospital';

interface AIMedicineSearchSectionProps {
  onBookAppointment?: (departmentId?: string, doctorId?: string) => void;
  onOpenConsultReport?: (patientName?: string, doctorId?: string) => void;
  onOpenAIAssistant?: () => void;
}

const SAMPLE_DISEASE_PROMPTS = [
  { label: 'Type 2 Diabetes', query: 'Type 2 Diabetes with high morning fasting blood sugar' },
  { label: 'Severe Migraine', query: 'Severe throbbing migraine with aura and nausea' },
  { label: 'Acid Reflux / GERD', query: 'Acid reflux and GERD burning in chest after meals' },
  { label: 'Hypertension', query: 'High blood pressure 150/95 with mild headache' },
  { label: 'Asthma & Wheezing', query: 'Bronchial asthma with wheezing and shortness of breath' },
  { label: 'High Cholesterol', query: 'High LDL cholesterol and lipid management' },
  { label: 'Knee Osteoarthritis', query: 'Knee joint osteoarthritis stiffness and inflammation' },
  { label: 'Allergic Rhinitis', query: 'Seasonal allergic rhinitis with nasal congestion' }
];

const ROTATING_PLACEHOLDERS = [
  'e.g. Type 2 Diabetes with high fasting glucose...',
  'e.g. Severe throbbing migraine with aura & nausea...',
  'e.g. Acid reflux GERD burning sensation after meals...',
  'e.g. High blood pressure 150/95 with dizziness...',
  'e.g. Bronchial asthma wheezing and night cough...',
  'e.g. Knee osteoarthritis joint pain and stiffness...'
];

export const AIMedicineSearchSection: React.FC<AIMedicineSearchSectionProps> = ({
  onBookAppointment,
  onOpenConsultReport,
  onOpenAIAssistant
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [searchResult, setSearchResult] = useState<AIMedicationSearchResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'rx' | 'otc' | 'precautions'>('all');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [searchCount, setSearchCount] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotating animated placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Multi-step loading radar
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(1);
      timer = setTimeout(() => {
        setLoadingStep(2);
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Initial load with Type 2 Diabetes default
  useEffect(() => {
    handleSearch('Type 2 Diabetes Mellitus with high blood sugar');
  }, []);

  const handleSearch = async (queryText?: string) => {
    const query = (queryText || searchQuery).trim();
    if (!query) return;

    if (queryText) {
      setSearchQuery(queryText);
    }

    setLoading(true);
    setLoadingStep(1);

    try {
      const result = await searchMedicationsWithAI(query);
      setSearchResult(result);
      setSearchCount(prev => prev + 1);
    } catch (err) {
      console.error('Error fetching medication data:', err);
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleCopySummary = () => {
    if (!searchResult) return;
    const text = `We Care Hospital - AI Pharmacotherapy Summary\nCondition: ${searchResult.diseaseName}\nCategory: ${searchResult.category}\n\nTop Medications:\n${searchResult.medications.map(m => `• #${m.rank} ${m.brandName} (${m.genericName}) - ${m.standardDosage} | Timing: ${m.frequencyAndTiming}\n  Benefits: ${m.keyBenefits}\n  Precautions: ${m.precautions}`).join('\n\n')}\n\nLifestyle Protocol:\n${searchResult.lifestyleProtocols.map(p => `• ${p}`).join('\n')}\n\nRecommended Specialist: Dr. ${searchResult.recommendedDoctorName} (${searchResult.primaryDepartmentName})`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  const filteredMedications = searchResult?.medications.filter(med => {
    if (selectedFilter === 'rx') return med.prescriptionStatus.toLowerCase().includes('rx');
    if (selectedFilter === 'otc') return med.prescriptionStatus.toLowerCase().includes('otc');
    return true;
  }) || [];

  return (
    <section id="ai-medications" className="py-20 bg-slate-50/70 dark:bg-slate-950/80 border-y border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-teal-500" />
            <span>AI Pharmacopeia & Medication Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-500 to-indigo-600 dark:from-teal-400 dark:via-sky-400 dark:to-indigo-400">Medication & Disease Search</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Enter your medical condition, symptoms, or disease profile. Our Gemini-powered clinical engine instantly evaluates evidence-based medications, standard therapeutic dosages, safety contraindications, and specialist recommendations.
          </p>
        </div>

        {/* Interactive Animated Search Box Container with Hover Aura */}
        <div className="max-w-4xl mx-auto mb-10">
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group transition-all duration-300"
          >
            {/* Animated Ambient Glow Ring on Hover */}
            <div className={`absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 opacity-25 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200 ${isHovered ? 'scale-100' : 'scale-95 opacity-20'}`} />

            {/* Glowing Border Wrap */}
            <div className="relative rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-r from-teal-500/40 via-sky-500/30 to-indigo-500/40 group-hover:from-teal-500 group-hover:via-sky-500 group-hover:to-indigo-500 transition-all duration-300 shadow-2xl shadow-teal-950/10 dark:shadow-slate-950/60">
              
              <form 
                onSubmit={handleFormSubmit}
                className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-900 rounded-xl sm:rounded-[22px] p-2 sm:p-2.5 transition-colors"
              >
                {/* Search Icon & Live Sparkle Badge */}
                <div className="flex items-center pl-3 sm:pl-4 pr-2 text-teal-600 dark:text-teal-400 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                    <Pill className="w-5 h-5" />
                  </div>
                </div>

                {/* Input Text Box */}
                <div className="relative flex-1 min-w-0 py-2 sm:py-0 px-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
                    className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base sm:text-lg font-medium focus:outline-none focus:ring-0 truncate"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        inputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-2 shrink-0">
                  <button
                    type="submit"
                    disabled={loading || !searchQuery.trim()}
                    className="w-full sm:w-auto relative group/btn overflow-hidden flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/30 dark:shadow-teal-900/40 hover:shadow-teal-600/50 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {/* Shimmer sweep effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Analyzing AI Pharmacopeia...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform text-teal-200" />
                        <span>Search Medications</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Disease Prompt Chips with Hover Animation */}
          <div className="mt-4 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Popular Conditions:
            </span>
            {SAMPLE_DISEASE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSearch(prompt.query)}
                className="group/chip text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-800 hover:border-teal-400/50 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>{prompt.label}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover/chip:translate-x-0.5 group-hover/chip:text-teal-500 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Loading Radar State */}
        {loading && (
          <div className="max-w-4xl mx-auto my-12 p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-teal-500/30 shadow-2xl text-center animate-in fade-in duration-300">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-teal-500/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-2 rounded-full bg-teal-50 dark:bg-teal-950/80 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Pill className="w-8 h-8 animate-bounce" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Gemini Clinical Pharmacopeia Analysis
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              {loadingStep === 1 
                ? 'Decoding condition etiology & pharmacological receptor targets...' 
                : 'Synthesizing evidence-based drug regimens, standard dosages & contraindications...'}
            </p>

            <div className="w-full max-w-xs mx-auto bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full w-3/4 animate-pulse" />
            </div>
          </div>
        )}

        {/* Search Results Display */}
        {!loading && searchResult && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            
            {/* Condition Overview Bento Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-950/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-500/10 via-sky-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700">
                      {searchResult.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700">
                      {searchResult.severityLevel}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      searchResult.urgencyLevel === 'Emergency' 
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                        : searchResult.urgencyLevel === 'Urgent'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                    }`}>
                      Urgency: {searchResult.urgencyLevel}
                    </span>
                    {searchResult.isAiGenerated && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" /> Gemini Live Analysis
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {searchResult.diseaseName}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
                    {searchResult.overview}
                  </p>
                </div>

                {/* Quick Utility Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
                    title="Copy summary to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>

                  <button
                    onClick={handlePrintSummary}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
                    title="Print or save as PDF"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>Print Rx Guide</span>
                  </button>
                </div>
              </div>

              {/* Matched Specialist Consultation Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-indigo-500/10 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={searchResult.doctorAvatar}
                    alt={searchResult.recommendedDoctorName}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-teal-500/40 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                      Recommended Specialist Consultation
                    </p>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Dr. {searchResult.recommendedDoctorName}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {searchResult.doctorSpecialty} • {searchResult.primaryDepartmentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => onBookAppointment?.(searchResult.primaryDepartmentId, searchResult.recommendedDoctorId)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Specialist</span>
                  </button>

                  <button
                    onClick={() => onOpenConsultReport?.('Patient Consultation', searchResult.recommendedDoctorId)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-slate-100 font-bold text-xs border border-slate-700 transition-all hover:scale-105"
                  >
                    <FileText className="w-3.5 h-3.5 text-teal-400" />
                    <span>Doctor Rx Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter Regimens:
                </span>
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedFilter === 'all'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-teal-400'
                  }`}
                >
                  All ({searchResult.medications.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('rx')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedFilter === 'rx'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-teal-400'
                  }`}
                >
                  Prescription Rx
                </button>
                <button
                  onClick={() => setSelectedFilter('otc')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedFilter === 'otc'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-teal-400'
                  }`}
                >
                  OTC / Supportive
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Ranked by global clinical guideline efficacy & safety indices
              </p>
            </div>

            {/* Top Recommended Medications Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMedications.map((med, index) => (
                <div 
                  key={index}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-lg shadow-slate-950/5 hover:shadow-xl hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Rank + Prescription Status */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-black">
                          #{med.rank}
                        </span>
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                          {med.efficacyRank}
                        </span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase border ${
                        med.prescriptionStatus.toLowerCase().includes('rx')
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {med.prescriptionStatus}
                      </span>
                    </div>

                    {/* Brand & Generic Names */}
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {med.brandName}
                    </h4>
                    
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                      Generic: <span className="text-slate-800 dark:text-slate-200">{med.genericName}</span>
                    </p>

                    <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                      Drug Class: {med.drugClass}
                    </div>

                    {/* Dosage & Timing Card */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-teal-500/5 dark:bg-teal-950/30 border border-teal-500/20 space-y-1.5">
                      <div className="flex items-start gap-2 text-xs">
                        <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100">Standard Dosage: </span>
                          <span className="text-slate-700 dark:text-slate-300">{med.standardDosage}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs">
                        <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100">Frequency & Timing: </span>
                          <span className="text-slate-700 dark:text-slate-300">{med.frequencyAndTiming}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mechanism & Key Benefits */}
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Biochemical Mechanism:
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {med.mechanismOfAction}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Benefits & Efficacy:
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                          {med.keyBenefits}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Safety & Precautions Box */}
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">
                          Clinical Safety & Precautions:
                        </p>
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">
                          {med.precautions}
                        </p>
                      </div>
                    </div>

                    {/* Side effects tag list */}
                    {med.commonSideEffects && med.commonSideEffects.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-slate-400">Tolerability Notes:</span>
                        {med.commonSideEffects.map((side, sIdx) => (
                          <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {side}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Clinical Modules: Lifestyle, Diagnostics & Red Flags */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Lifestyle Guidance */}
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md">
                <div className="flex items-center gap-2.5 mb-4 text-teal-600 dark:text-teal-400 font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span>Evidence-Based Lifestyle Protocol</span>
                </div>

                <ul className="space-y-3">
                  {searchResult.lifestyleProtocols.map((protocol, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{protocol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Diagnostics */}
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md">
                <div className="flex items-center gap-2.5 mb-4 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span>Recommended Clinical Diagnostics</span>
                </div>

                <ul className="space-y-3">
                  {searchResult.recommendedDiagnostics.map((test, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flag Symptoms Alert */}
              <div className="rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-6 shadow-md">
                <div className="flex items-center gap-2.5 mb-4 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 border border-rose-300 dark:border-rose-800 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span>Red Flag Symptoms (ER Alert)</span>
                </div>

                <ul className="space-y-3">
                  {searchResult.redFlagSymptoms.map((red, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200 font-medium leading-relaxed">
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{red}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Educational Disclaimer Banner & AI Assistant Modal Trigger */}
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Clinical Pharmacopeia Disclaimer: </span>
                  {searchResult.clinicalDisclaimer} Never self-medicate without physical doctor evaluation.
                </p>
              </div>

              <button
                onClick={() => onOpenAIAssistant?.()}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>Ask AI Clinical Assistant</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
