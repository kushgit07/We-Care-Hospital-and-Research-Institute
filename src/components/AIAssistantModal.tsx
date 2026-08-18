import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Stethoscope, 
  ShieldAlert, 
  HelpCircle, 
  User, 
  HeartHandshake,
  Bot,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { analyzeSymptomsWithAI, SymptomTriageResult } from '../services/aiService';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedBooking: (deptId: string, docId: string, symptomsText: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedBooking
}) => {
  const [symptomText, setSymptomText] = useState('');
  const [age, setAge] = useState<number>(38);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [duration, setDuration] = useState('2-3 days');
  const [loading, setLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<SymptomTriageResult | null>(null);

  const samplePrompts = [
    'Sharp chest pain radiating to left shoulder and shortness of breath',
    'Severe throbbing headache with nausea and light sensitivity for 3 days',
    'Right knee swelling and inability to bear weight after tennis match',
    'Chronic acid reflux and burning sensation in upper abdomen after meals',
    'Persistent dry cough, mild fatigue, and low-grade evening fever'
  ];

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symptomText.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeSymptomsWithAI(symptomText, age, gender, duration);
      setTriageResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (level: string) => {
    switch (level) {
      case 'Emergency':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider animate-pulse shadow-md shadow-rose-600/30">
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Level 1 Triage</span>
          </span>
        );
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Urgent: Consult Specialist within 24h</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Routine Specialist Consultation</span>
          </span>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 my-auto flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-t-3xl relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400 flex items-center justify-center text-indigo-300">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              We Care AI Clinical Triage
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Smart Symptom Assessment & Doctor Matching
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Describe your health concerns to receive an instant clinical assessment, urgency rating, and direct match with our lead specialists.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1">
          
          {/* Input Form */}
          {!triageResult ? (
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Describe Your Symptoms / Discomfort *
                </label>
                <textarea
                  required
                  rows={3}
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="e.g., Severe throbbing pain in my right knee after running, swelling noticed yesterday..."
                  className="w-full p-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              {/* Sample Prompts */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                  Or try a sample clinical scenario:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.slice(0, 3).map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSymptomText(prompt)}
                      className="text-[11px] text-left p-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-900 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      "{prompt.slice(0, 48)}..."
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Basic Parameters */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="115"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="Few hours">Few hours</option>
                    <option value="1-3 days">1-3 days</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="Over a month">Over a month</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading || !symptomText.trim()}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Clinical Presentation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze & Recommend Specialist</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Triage Result Display */
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Urgency Badge */}
              <div className="flex items-center justify-between">
                {getUrgencyBadge(triageResult.urgencyLevel)}

                <button
                  onClick={() => setTriageResult(null)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Re-evaluate</span>
                </button>
              </div>

              {/* Triage Clinical Analysis */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-1">
                  Clinical Assessment
                </h4>
                <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
                  {triageResult.triageAnalysis}
                </p>
              </div>

              {/* Recommended Specialist Card */}
              <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                    Recommended Department & Specialist
                  </span>
                  <h4 className="text-base font-bold text-white font-heading mt-0.5">
                    {triageResult.recommendedDoctorName}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {triageResult.recommendedDepartmentName}
                  </p>
                  <p className="text-[11px] text-teal-300 mt-1">
                    {triageResult.keySpecialistCriteria}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectRecommendedBooking(
                      triageResult.recommendedDepartmentId,
                      triageResult.recommendedDoctorId,
                      symptomText
                    );
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>

              {/* Suggested Questions for Doctor */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Suggested Questions for Your Doctor:
                </h4>
                <div className="space-y-1.5">
                  {triageResult.suggestedQuestionsForDoctor.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Advice Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Immediate Care Guidance: </span>
                  {triageResult.immediateSafetyAdvice}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-b-3xl border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400">
          Disclaimer: AI Triage provides preliminary clinical guidance and is not a definitive diagnosis. For severe or life-threatening symptoms, dial +1 (800) 932-2731 immediately.
        </div>
      </div>
    </div>
  );
};
