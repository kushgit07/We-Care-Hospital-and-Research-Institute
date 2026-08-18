import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Heart, 
  Brain, 
  Dna, 
  Baby, 
  Eye, 
  RefreshCw, 
  Filter,
  Flame,
  Check,
  Share2
} from 'lucide-react';
import { HealthArticle, HealthTip } from '../types/hospital';
import { HEALTH_ARTICLES, HEALTH_TIPS, DEPARTMENTS } from '../data/hospitalData';
import { generateHealthInsightWithAI, generateDailyMicroTipWithAI } from '../services/aiService';
import { ArticleReaderModal } from './ArticleReaderModal';

interface HealthInsightsSectionProps {
  onOpenBooking: (deptId?: string, docId?: string) => void;
  onOpenAIModal?: () => void;
}

export const HealthInsightsSection: React.FC<HealthInsightsSectionProps> = ({
  onOpenBooking,
  onOpenAIModal
}) => {
  const [articles, setArticles] = useState<HealthArticle[]>(() => {
    const saved = localStorage.getItem('we_care_custom_articles');
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        return [...custom, ...HEALTH_ARTICLES];
      } catch {
        return HEALTH_ARTICLES;
      }
    }
    return HEALTH_ARTICLES;
  });

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('we_care_bookmarked_articles');
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Active Reader Modal state
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);
  const [readerModalOpen, setReaderModalOpen] = useState(false);

  // AI Prompt Bar State
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [aiSelectedDept, setAiSelectedDept] = useState('dept-cardio');
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [aiFeedbackMessage, setAiFeedbackMessage] = useState<string | null>(null);

  // Daily Micro-Tip State
  const [dailyTip, setDailyTip] = useState<HealthTip>(HEALTH_TIPS[0]);
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);
  const [isPlayingTipAudio, setIsPlayingTipAudio] = useState(false);
  const [tipCopied, setTipCopied] = useState(false);

  // Quick suggestion chips for AI generator
  const AI_PROMPT_CHIPS = [
    { label: '🫀 AI Cardiac FFR-CT Scans', topic: 'AI-assisted FFR-CT coronary ischemia detection and catheterization avoidance', deptId: 'dept-cardio' },
    { label: '🧠 Stroke 24h Window', topic: 'AI Perfusion mapping in acute ischemic stroke beyond 4.5 hours', deptId: 'dept-neuro' },
    { label: '🧬 Liquid Biopsies (ctDNA)', topic: 'Circulating tumor DNA ctDNA for ultra-early cancer recurrence detection', deptId: 'dept-onco' },
    { label: '🦾 Mako Robotic Knees', topic: 'Kinematic alignment vs mechanical axis in robotic knee replacements', deptId: 'dept-ortho' },
    { label: '🥑 Reversing Fatty Liver', topic: 'Evidence-based protocols to reverse metabolic dysfunction steatohepatitis (MASH)', deptId: 'dept-gastro' },
    { label: '⏳ Longevity & SGLT2', topic: 'Cellular senescence, NAD+ metabolism and SGLT-2 organoprotective mechanisms', deptId: 'dept-renal' }
  ];

  const CATEGORIES = [
    { id: 'all', label: 'All Insights' },
    { id: 'Breakthrough', label: '✨ Breakthroughs' },
    { id: 'Clinical Guide', label: '🩺 Clinical Guides' },
    { id: 'Preventive Wellness', label: '🛡️ Preventive Wellness' },
    { id: 'Longevity', label: '⚡ Longevity' },
    { id: 'Nutrition & Lifestyle', label: '🥗 Nutrition & Gut' }
  ];

  // Sync bookmarks with localStorage
  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds(prev => {
      const updated = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
      localStorage.setItem('we_care_bookmarked_articles', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenReader = (art: HealthArticle) => {
    setSelectedArticle(art);
    setReaderModalOpen(true);
  };

  // Generate a custom AI Article
  const handleGenerateAIArticle = async (e?: React.FormEvent, customTopic?: string, customDept?: string) => {
    if (e) e.preventDefault();
    const query = customTopic || aiTopicInput.trim();
    const deptId = customDept || aiSelectedDept;

    if (!query) return;

    setIsGeneratingArticle(true);
    setAiFeedbackMessage('Gemini AI synthesizing peer-reviewed medical breakthrough...');

    try {
      const newArticle = await generateHealthInsightWithAI(query, deptId);
      
      // Update state and save
      const updatedArticles = [newArticle, ...articles];
      setArticles(updatedArticles);

      // Save custom ones in localStorage
      const customOnes = updatedArticles.filter(a => a.isAiCurated);
      localStorage.setItem('we_care_custom_articles', JSON.stringify(customOnes));

      setAiFeedbackMessage(`✨ Clinical Breakthrough on "${newArticle.title}" created successfully!`);
      setAiTopicInput('');
      
      // Automatically open the new article reader
      setTimeout(() => {
        setSelectedArticle(newArticle);
        setReaderModalOpen(true);
        setAiFeedbackMessage(null);
      }, 1200);
    } catch (err) {
      console.error(err);
      setAiFeedbackMessage('Failed to generate insight. Please try again.');
      setTimeout(() => setAiFeedbackMessage(null), 3000);
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  // Generate a new Daily Micro-Tip
  const handleRefreshTip = async () => {
    setIsGeneratingTip(true);
    try {
      const newTip = await generateDailyMicroTipWithAI();
      setDailyTip(newTip);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTip(false);
    }
  };

  // Audio speech for micro-tip
  const handleToggleTipSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text to speech is not supported in this browser.');
      return;
    }

    if (isPlayingTipAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingTipAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const text = `Daily Health Tip: ${dailyTip.title}. ${dailyTip.tip}. Action Item: ${dailyTip.actionItem}. Evidence source: ${dailyTip.evidenceSource}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingTipAudio(false);
      utterance.onerror = () => setIsPlayingTipAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingTipAudio(true);
    }
  };

  const handleCopyTip = () => {
    navigator.clipboard.writeText(`🩺 Daily Health Tip: ${dailyTip.title}\n\n${dailyTip.tip}\n\n👉 Action Item: ${dailyTip.actionItem}\n\nSource: ${dailyTip.evidenceSource}`);
    setTipCopied(true);
    setTimeout(() => setTipCopied(false), 2000);
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesDept = selectedDeptFilter === 'all' || article.departmentId === selectedDeptFilter;
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.authorDoctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !showOnlyBookmarks || bookmarkedIds.includes(article.id);

    return matchesDept && matchesCategory && matchesSearch && matchesBookmark;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0];

  return (
    <section id="insights" className="py-20 bg-slate-50/70 dark:bg-slate-950/60 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Health & Wellness Blog • AI Medical Breakthroughs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Evidence-Based Health Insights &{' '}
            <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Clinical Breakthroughs
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Stay empowered with peer-reviewed medical advancements, longevity protocols, and daily habits curated by our department chiefs and synthesized with Gemini AI.
          </p>
        </div>

        {/* AI Medical Breakthrough Generator Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-800/40 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>On-Demand Medical Intelligence</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
                  Generate Live AI Medical Breakthrough or Wellness Guide
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Select a clinical specialty and enter any symptom, diagnostic technology, or wellness question to synthesize an evidence-based clinical guide.
                </p>
              </div>

              {onOpenAIModal && (
                <button
                  onClick={onOpenAIModal}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all shrink-0 flex items-center gap-2 border border-white/20"
                >
                  <Activity className="w-4 h-4 text-teal-400" />
                  <span>Interactive Symptom Triage</span>
                </button>
              )}
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleGenerateAIArticle} className="flex flex-col sm:flex-row gap-3">
              <select
                value={aiSelectedDept}
                onChange={(e) => setAiSelectedDept(e.target.value)}
                className="bg-slate-800/90 text-white text-xs sm:text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:w-60"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={aiTopicInput}
                  onChange={(e) => setAiTopicInput(e.target.value)}
                  placeholder="e.g., Latest 2026 findings on coronary calcium scoring and LDL targets..."
                  className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingArticle || !aiTopicInput.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0"
              >
                {isGeneratingArticle ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Insight</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Topic Chips */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Trending Clinical Topics:
              </p>
              <div className="flex flex-wrap gap-2">
                {AI_PROMPT_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAiTopicInput(chip.topic);
                      setAiSelectedDept(chip.deptId);
                      handleGenerateAIArticle(undefined, chip.topic, chip.deptId);
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-indigo-400 transition-all text-left"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {aiFeedbackMessage && (
              <div className="p-3 rounded-xl bg-indigo-900/60 border border-indigo-500/50 text-indigo-200 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{aiFeedbackMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Daily Evidence-Based Micro-Tip Widget */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                  Daily Evidence-Based Micro-Tip
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  • {dailyTip.departmentName}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                {dailyTip.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {dailyTip.tip}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-teal-700 dark:text-teal-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-600" />
                <span><strong>Action Item Today:</strong> {dailyTip.actionItem}</span>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-0.5">
                Source: {dailyTip.evidenceSource} • Reviewed by {dailyTip.authorDoctorName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
            <button
              onClick={handleToggleTipSpeech}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isPlayingTipAudio 
                  ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 border-rose-300 animate-pulse'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
              title="Listen to Tip"
            >
              {isPlayingTipAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlayingTipAudio ? 'Pause' : 'Listen'}</span>
            </button>

            <button
              onClick={handleCopyTip}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
              title="Copy Tip"
            >
              {tipCopied ? <Check className="w-4 h-4 text-teal-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{tipCopied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handleRefreshTip}
              disabled={isGeneratingTip}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 ml-auto lg:ml-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingTip ? 'animate-spin' : ''}`} />
              <span>New Tip ✨</span>
            </button>
          </div>
        </div>

        {/* Filters, Categories & Search Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Bookmarks */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, doctors..."
                  className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border shrink-0 ${
                  showOnlyBookmarks
                    ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100'
                }`}
                title="Filter Saved Bookmarks"
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Saved ({bookmarkedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Department Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Dept:
            </span>
            <button
              onClick={() => setSelectedDeptFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedDeptFilter === 'all'
                  ? 'bg-teal-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Departments
            </button>
            {DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDeptFilter(d.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedDeptFilter === d.id
                    ? 'bg-teal-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {d.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Breakthrough Article Card */}
        {featuredArticle && !showOnlyBookmarks && selectedDeptFilter === 'all' && selectedCategory === 'all' && searchQuery === '' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500 text-slate-950 shadow-md">
                  Featured Breakthrough
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-sm">
                  {featuredArticle.readTime}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                <span>{featuredArticle.departmentName}</span>
                <span className="text-teal-400 font-semibold">{featuredArticle.publishedDate}</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300">
                  {featuredArticle.evidenceLevel}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {featuredArticle.summary}
              </p>

              {/* Key Takeaways snippet */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Takeaway:
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  • {featuredArticle.keyTakeaways[0]}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.doctorAvatar}
                    alt={featuredArticle.authorDoctorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-500"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {featuredArticle.authorDoctorName}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {featuredArticle.authorRole}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(featuredArticle.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      bookmarkedIds.includes(featuredArticle.id)
                        ? 'bg-teal-50 dark:bg-teal-950 text-teal-600 border-teal-300'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                    }`}
                    title="Bookmark"
                  >
                    {bookmarkedIds.includes(featuredArticle.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-teal-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenReader(featuredArticle)}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 group"
                  >
                    <span>Read Full Paper</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                No clinical articles found
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try adjusting your search criteria or generate a new AI medical breakthrough with our on-demand generator above.
              </p>
              <button
                onClick={() => {
                  setSelectedDeptFilter('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setShowOnlyBookmarks(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const isBookmarked = bookmarkedIds.includes(article.id);

                return (
                  <div
                    key={article.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
                            {article.departmentName.split('&')[0].trim()}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(article.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                              isBookmarked 
                                ? 'bg-teal-500 text-slate-950 shadow-md' 
                                : 'bg-slate-900/80 text-white hover:bg-slate-800'
                            }`}
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Insight'}
                          >
                            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {article.isAiCurated && (
                          <div className="absolute bottom-3 left-3">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                              <Sparkles className="w-3 h-3" />
                              <span>AI Synthesized</span>
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-3 right-3 text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-teal-400" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                            {article.category}
                          </span>
                          <span>{article.publishedDate}</span>
                        </div>

                        <h4 
                          onClick={() => handleOpenReader(article)}
                          className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading line-clamp-2 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors"
                        >
                          {article.title}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {article.subtitle}
                        </p>

                        {/* Evidence Badge */}
                        <div className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold flex items-center gap-1.5 pt-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{article.evidenceLevel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Author & CTA */}
                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={article.doctorAvatar}
                          alt={article.authorDoctorName}
                          className="w-8 h-8 rounded-full object-cover border border-teal-500 shrink-0"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {article.authorDoctorName}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {article.authorRole}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenReader(article)}
                        className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Specialist Consultation Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-700 via-sky-800 to-indigo-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              Have Questions About a Breakthrough or Health Condition?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
              Schedule a 1-on-1 consultation or telehealth review with the department chiefs and senior specialists who authored these research protocols.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:bg-teal-50 transition-all flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-700" />
              <span>Book Doctor Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={readerModalOpen}
        onClose={() => setReaderModalOpen(false)}
        onBookAppointment={onOpenBooking}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        onToggleBookmark={toggleBookmark}
      />
    </section>
  );
};
