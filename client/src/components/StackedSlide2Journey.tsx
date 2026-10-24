'use client';

import React from 'react';
import { Compass, Flame, Heart, ArrowDown, Sparkles } from 'lucide-react';

export default function StackedSlide2Journey() {
  const scrollToNext = () => {
    document.getElementById('slide-3')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="slide-2"
      className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#fbf8f2] via-[#f7f2e8] to-[#f2ece0] z-20 px-4 sm:px-8 py-20 rounded-t-[36px] sm:rounded-t-[54px] shadow-[0_-25px_60px_rgba(0,0,0,0.12)] border-t border-amber-300/50 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          The Catalyst Within
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-tight mb-4 font-bold">
          Author &bull; Keynote Speaker &bull; Life Coach
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          I was once walking the conventional path of high-speed corporate engineering, until I recognized that external accolades cannot heal internal void. The moment I aligned with my true purpose, thousands of minds began to awaken alongside me.
        </p>

        {/* 3 Identity Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/70 shadow-lg hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-700">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Conscious Leadership</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mentoring executives at Fortune 500 corporations to lead from empathy, stillness, and long-term ethical legacy.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/70 shadow-lg hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-700">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Mental Toughness</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Equipping entrepreneurs and athletes to re-wire fear and convert intense pressure into creative breakthrough.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/70 shadow-lg hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4 text-rose-700">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Soulful Connection</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Connecting heart-to-heart with youth, visionaries, and seekers to remind them of their unshakeable worth.
            </p>
          </div>
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-amber-50 border border-amber-300 transition-all shadow-md cursor-pointer"
        >
          <span>Continue To Books &amp; Wisdom</span>
          <ArrowDown className="w-4 h-4 text-amber-700 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
