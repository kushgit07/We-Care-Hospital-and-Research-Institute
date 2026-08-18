import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  Calendar, 
  User, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  CheckCircle2, 
  Stethoscope, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Check,
  Building2
} from 'lucide-react';
import { HealthArticle } from '../types/hospital';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';

interface ArticleReaderModalProps {
  article: HealthArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (deptId?: string, docId?: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  isOpen,
  onClose,
  onBookAppointment,
  isBookmarked,
  onToggleBookmark
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Stop speech on close or article change
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [isOpen, article]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const doctor = DOCTORS.find(d => d.id === article.authorDoctorId || d.name === article.authorDoctorName) || DOCTORS[0];
  const department = DEPARTMENTS.find(d => d.id === article.departmentId) || DEPARTMENTS[0];

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. Clinical Summary: ${article.summary}. Key Takeaways: ${article.keyTakeaways.join('. ')}. Clinical implications: ${article.clinicalImplications}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title}\n\n${article.summary}\n\nRead on We Care Hospital: ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 my-auto flex flex-col justify-between">
        
        {/* Cover Header */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-slate-900">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Floating Actions Top */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                isBookmarked 
                  ? 'bg-teal-500 text-slate-950 shadow-lg' 
                  : 'bg-slate-900/80 text-white hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Insight'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800 transition-colors"
              title="Share Clinical Article"
            >
              {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800 transition-colors"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tags & Meta Bottom of Image */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500 text-slate-950">
                {article.departmentName}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-600/90 text-white backdrop-blur-sm">
                {article.category}
              </span>
              {article.isAiCurated && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Synthesized & Verified</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                {article.publishedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
              {article.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 font-medium leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Audio Speech Narration Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleSpeech}
                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
                }`}
                title={isPlayingAudio ? 'Pause Narration' : 'Listen to Audio Summary'}
              >
                {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {isPlayingAudio ? 'Playing Medical Audio Briefing...' : 'Listen to Evidence Summary'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  AI Text-to-Speech audio briefing for busy patients
                </p>
              </div>
            </div>

            {isPlayingAudio && (
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider animate-pulse">
                Audio Active 🎙️
              </span>
            )}
          </div>

          {/* Evidence Quality Banner */}
          <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 flex items-center gap-2.5 text-xs text-teal-900 dark:text-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <div>
              <span className="font-bold">Evidence Standard: </span>
              {article.evidenceLevel}
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg border border-slate-800">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Clinical Takeaways</span>
            </div>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-2"></span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Article Content Paragraphs */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {article.fullContent.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Clinical Implications */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-1">
              Clinical & Longevity Implications
            </h4>
            <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
              {article.clinicalImplications}
            </p>
          </div>

          {/* Actionable Steps Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Recommended Patient Action Steps:
            </h4>
            <div className="space-y-2">
              {article.actionableSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Author Doctor Card & Appointment Booking Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <img
                src={article.doctorAvatar || doctor.image}
                alt={article.authorDoctorName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-400 shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                  Reviewed & Verified By
                </span>
                <h4 className="text-base font-bold text-white font-heading">
                  {article.authorDoctorName}
                </h4>
                <p className="text-xs text-slate-300">
                  {article.authorRole}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onBookAppointment(article.departmentId, article.authorDoctorId);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Consult Specialist</span>
            </button>
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-b-3xl border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400">
          We Care Hospital Research Institute • Information is for educational and clinical guidance. Consult a specialist for personal health decisions.
        </div>
      </div>
    </div>
  );
};
