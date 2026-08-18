import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  MessageSquare 
} from 'lucide-react';
import { FAQS, HOSPITAL_INFO } from '../data/hospitalData';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Appointments', 'Insurance & Billing', 'Emergency', 'General', 'International Patients'];

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeCategory !== 'All' && faq.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900 relative transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/80 text-xs font-bold uppercase tracking-wide mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Got Questions? We’re Here to Help
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Find immediate answers regarding appointment bookings, cashless insurance, emergency triage, and visiting guidelines.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/30 shadow-md ring-1 ring-teal-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${isOpen ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-teal-100/60 dark:border-teal-900/60 pt-3 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-950/80 border border-teal-200/60 dark:border-teal-800/80 px-2 py-0.5 rounded">
                        Category: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpdesk Callout Card */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-lg text-white">
              Still Have Unanswered Questions?
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Our 24/7 Patient Support Helpdesk is available around the clock.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.phoneGeneral}`}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: {HOSPITAL_INFO.phoneGeneral}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
