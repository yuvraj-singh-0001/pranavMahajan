'use client';

import React from 'react';
import { ArrowDown, Sparkles, SunMedium, Play, Quote } from 'lucide-react';

export default function StackedSlide1Hero() {
  const scrollToNext = () => {
    document.getElementById('slide-2')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="slide-1"
      className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#fffefc] via-[#faf8f5] to-[#f5f1eb] z-10 px-4 sm:px-8 py-20 relative overflow-hidden"
    >
      {/* Radiant ambient warmth */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        {/* Personal Welcome Greeting (Inspired by Gaur Gopal Das) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
          <SunMedium className="w-3.5 h-3.5 text-amber-700" />
          Welcome To The Sanctum
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-slate-900 tracking-tight leading-[1.15] mb-6 font-bold">
          Pranav Mahajan
        </h1>

        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-800 mb-8">
          Global Keynote Speaker &bull; Spiritual Mindset Mentor &bull; Best-Selling Author
        </p>

        {/* Monologue Card */}
        <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-amber-200/70 shadow-xl shadow-amber-950/[0.03] text-left relative mb-10">
          <Quote className="w-12 h-12 text-amber-400/20 absolute top-4 right-4 pointer-events-none" />
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-serif italic mb-4">
            &ldquo;It is not every day that one pauses the relentless pace of life to look inward. I want to thank you for being here. I have spent the last 15 years devoted to understanding and decoding the human mind. Along the way, I discovered that true power is not found in external dominance, but in mastering the stillness within.&rdquo;
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3 border-t border-amber-100">
            <span className="text-amber-800">500,000+ Seekers Guided Worldwide</span>
            <span className="font-mono">Slide 01 of 05</span>
          </div>
        </div>

        {/* Scroll down indicator to prompt overlapping effect */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={scrollToNext}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Scroll To Unfold The Journey</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>
          <span className="text-[11px] text-slate-600 font-medium tracking-wide">
            (Scroll down to reveal stacked pages)
          </span>
        </div>
      </div>
    </section>
  );
}
