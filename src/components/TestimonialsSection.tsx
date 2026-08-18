import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { TESTIMONIALS } from '../data/hospitalData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-950/80 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 dark:bg-pink-950/80 text-pink-800 dark:text-pink-300 border border-pink-200/60 dark:border-pink-800/80 text-xs font-bold uppercase tracking-wide mb-3">
            <Heart className="w-3.5 h-3.5 fill-pink-600 dark:fill-pink-400 text-pink-600 dark:text-pink-400" />
            <span>Healing Journeys & Real Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
            Stories of Hope, Precision & Healing
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Real experiences from patients and families whose lives were transformed by our surgical excellence and dedicated care.
          </p>
        </div>

        {/* Testimonials Carousel Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-10 relative">
          <Quote className="absolute top-6 right-8 w-16 h-16 text-teal-100 dark:text-teal-900/40 -rotate-12 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Patient Avatar & Key Condition */}
            <div className="md:col-span-4 text-center flex flex-col items-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-teal-500/30 shadow-lg mb-4">
                <img
                  src={active.avatar}
                  alt={active.patientName}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                {active.patientName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                {active.location}
              </p>

              <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Patient Story</span>
              </div>
            </div>

            {/* Right: Story Details */}
            <div className="md:col-span-8 space-y-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-2">5.0 / 5.0 Healing Experience</span>
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg font-bold text-slate-900 dark:text-white italic leading-snug">
                "{active.quote}"
              </blockquote>

              {/* Story */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {active.story}
              </p>

              {/* Procedure & Doctor Badge */}
              <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/40 rounded-2xl border border-teal-100 dark:border-teal-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-teal-800 dark:text-teal-300 font-bold uppercase tracking-wider block">Procedure & Specialist:</span>
                  <span className="font-bold text-teal-950 dark:text-white">{active.condition} • {active.doctorName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 block">Verified Outcome</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-300">{active.outcomeStats}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-teal-600 dark:bg-teal-400' : 'w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
