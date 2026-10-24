'use client';

import React from 'react';
import { BookOpen, Star, ArrowDown, ExternalLink } from 'lucide-react';

export default function StackedSlide3Books() {
  const scrollToNext = () => {
    document.getElementById('slide-4')?.scrollIntoView({ behavior: 'smooth' });
  };

  const books = [
    {
      title: 'The Unstoppable Mind',
      subtitle: 'Mastering Inner Resilience in Chaos',
      badge: 'National Bestseller',
      desc: 'A practical roadmap for conquering cognitive fatigue, shattering self-doubt, and awakening boundless inner resolve.',
      rating: 5,
      reviews: '12,400+ Global Readers',
    },
    {
      title: 'The Sacred Pause',
      subtitle: 'Modern Zen for Peak Achievers',
      badge: 'Transformational Guide',
      desc: 'Timeless spiritual disciplines adapted for high-speed modern executives to dissolve burnout and discover serenity.',
      rating: 5,
      reviews: '8,900+ Global Readers',
    },
    {
      title: 'Conscious Leadership',
      subtitle: 'Influence Without Coercion',
      badge: 'Executive Essential',
      desc: 'How true leaders ignite unstoppable organizational loyalty through emotional presence, vulnerability, and vision.',
      rating: 5,
      reviews: '6,200+ Leaders Impacted',
    },
  ];

  return (
    <section
      id="slide-3"
      className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#f9f5ed] via-[#f5efe4] to-[#ede5d6] z-30 px-4 sm:px-8 py-20 rounded-t-[36px] sm:rounded-t-[54px] shadow-[0_-25px_60px_rgba(0,0,0,0.14)] border-t border-amber-300/50 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          Literary Offerings &amp; Wisdom
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-tight mb-4 font-bold">
          Books by Pranav Mahajan
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Distilling hundreds of meditation hours, global keynote dialogues, and transformative coaching sessions into timeless pages.
        </p>

        {/* Books Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full mb-4 inline-block">
                  {book.badge}
                </span>

                <h3 className="text-xl font-bold font-serif text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                  {book.title}
                </h3>
                <div className="text-xs font-semibold text-amber-800/80 mb-3">
                  {book.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {book.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(book.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                  <span className="text-[11px] text-slate-500 ml-1.5 font-medium">{book.reviews}</span>
                </div>
                <a
                  href="#slide-5"
                  className="mt-3 text-xs font-bold text-slate-900 hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors"
                >
                  Order Copy / Read Excerpt &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-amber-50 border border-amber-300 transition-all shadow-md cursor-pointer"
        >
          <span>See Upcoming Global Events</span>
          <ArrowDown className="w-4 h-4 text-amber-700 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
