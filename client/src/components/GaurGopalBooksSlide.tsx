'use client';

import React from 'react';
import { BookOpen, Star, ArrowDown, ArrowUpRight, Check } from 'lucide-react';

export default function GaurGopalBooksSlide() {
  const books = [
    {
      title: 'The Unstoppable Mind',
      tagline: 'Mastering Inner Resilience in Chaos',
      badge: 'National Bestseller',
      desc: 'A practical, soul-stirring guide to conquering cognitive fatigue, silencing inner critics, and forging unshakeable mental clarity.',
      reviews: '12,400+ Global Readers',
      rating: 5,
      accent: 'from-amber-400 to-orange-500',
    },
    {
      title: 'The Sacred Pause',
      tagline: 'Modern Zen for Peak Achievers',
      badge: 'Transformational Guide',
      desc: '5,000 years of contemplative Vedic insights adapted for modern high-speed life to eliminate executive burnout and cultivate stillness.',
      reviews: '8,900+ Global Readers',
      rating: 5,
      accent: 'from-orange-400 to-amber-600',
    },
    {
      title: 'Conscious Leadership',
      tagline: 'Influence Beyond Authority & Ego',
      badge: 'Executive Essential',
      desc: 'How visionaries inspire fierce loyalty, psychological safety, and breakthrough innovation through authentic vulnerability.',
      reviews: '6,200+ Leaders Guided',
      rating: 5,
      accent: 'from-yellow-500 to-amber-600',
    },
  ];

  const scrollToNext = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="books"
      className="stacked-slide z-20 bg-gradient-to-b from-[#faf6ee] via-[#f7f2e5] to-[#f2ecdc] px-6 sm:px-12 lg:px-20 py-24 rounded-t-[44px] sm:rounded-t-[54px] shadow-[0_-25px_60px_rgba(0,0,0,0.08)] border-t border-amber-200/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          Literary Works &amp; Publications
        </div>

        <h2 className="font-cursive text-5xl sm:text-7xl font-bold text-[#8a5d28] tracking-wide mb-3">
          Books by Pranav Mahajan
        </h2>

        <p className="text-slate-600 text-base max-w-2xl mx-auto mb-12 font-normal">
          Each page is an invitation to pause, reflect, and reclaim the calm sovereignty of your own mind.
        </p>

        {/* 3 Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
          {books.map((b, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white/90 backdrop-blur-xl border border-amber-200/80 p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all group"
            >
              <div>
                {/* Book spine aesthetic visual badge */}
                <div className="h-44 w-full rounded-2xl bg-gradient-to-tr from-[#fbf8f0] to-[#f4ebe0] border border-amber-200/60 p-5 flex flex-col justify-between mb-5 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      {b.badge}
                    </span>
                    <BookOpen className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-cursive text-2xl font-bold text-[#8a5d28] leading-tight">
                      {b.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">Pranav Mahajan</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">
                  {b.tagline}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {b.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(b.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{b.reviews}</span>
                </div>

                <a
                  href="#contact"
                  className="ochre-pill-button py-2 px-4 text-xs font-bold shadow-xs hover:shadow-md"
                >
                  Get Your Copy
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Next Action */}
        <button
          onClick={scrollToNext}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-widest cursor-pointer"
        >
          <span>Continue to Upcoming Events &amp; Tour</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
