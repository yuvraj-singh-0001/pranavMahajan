'use client';

import React, { useState } from 'react';
import { Sun, Sparkles, ArrowDown, Menu, X, Heart, Compass } from 'lucide-react';

export default function GaurGopalHeroSlide() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <section
      id="hero"
      className="stacked-slide z-10 bg-gradient-to-b from-[#fffcf7] via-[#fffbf3] to-[#faf5e8] px-6 sm:px-12 lg:px-20 py-20 relative overflow-hidden"
    >
      {/* Morning Sunrise Ambient Glow */}
      <div className="sunrise-glow w-[550px] h-[550px] -top-32 -left-32 opacity-70" />
      <div className="sunrise-glow w-[600px] h-[600px] top-1/2 -right-32 opacity-50" />

      {/* TOP HEADER: Calligraphy Brand Mark & Minimal Menu Button */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 sm:px-12 py-7 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 text-left group">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center">
            <Sun className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-cursive text-2xl sm:text-3xl font-bold text-[#8a5d28] tracking-wide">
            Pranav Mahajan
          </span>
        </a>

        {/* Minimal Hamburger Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2.5 rounded-xl bg-white/80 border border-amber-200/80 hover:bg-amber-50 text-slate-800 transition-all cursor-pointer shadow-xs"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-6 h-6 text-amber-700" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </header>

      {/* MAIN TWO-COLUMN CONTENT (Exact match to Gaur Gopal Das screenshot) */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-16 sm:pt-12">
        {/* LEFT COLUMN: Artistic Portrait / Serene Energy Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[36px] bg-gradient-to-tr from-[#f5ede0] via-[#fffbf5] to-[#fdedd5] border-2 border-amber-200/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-900/[0.06] text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

            {/* Top insignia */}
            <div className="flex justify-between items-center text-xs text-amber-800 font-semibold tracking-widest uppercase relative z-10">
              <span className="inline-flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                Vedic Wisdom
              </span>
              <span>Est. 2012</span>
            </div>

            {/* Center Sacred Emblem & Energy Quote */}
            <div className="my-auto relative z-10 py-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 p-[2px] shadow-lg mb-4">
                <div className="w-full h-full bg-[#fffcf7] rounded-full flex items-center justify-center">
                  <Sun className="w-10 h-10 text-amber-600 animate-spin-slow" />
                </div>
              </div>

              <div className="font-cursive text-3xl font-bold text-[#8a5d28] mb-1">
                The Inner Sanctuary
              </div>
              <p className="text-xs text-slate-600 font-serif italic max-w-xs mx-auto leading-relaxed">
                &ldquo;True strength is not physical might, but the unshakeable calm within your heart.&rdquo;
              </p>
            </div>

            {/* Bottom credentials strip */}
            <div className="relative z-10 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold text-amber-900">500,000+ Seekers</span>
              <span>24+ Nations</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Monologue, Calligraphy Heading & Ochre Button */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Handwriting Title in Caveat font (exact match to screenshot) */}
          <h1 className="font-cursive text-5xl sm:text-7xl lg:text-8xl font-bold text-[#8a5d28] tracking-wide leading-none">
            Pranav Mahajan
          </h1>

          {/* Inspiring heartfelt paragraph */}
          <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
            <p>
              It’s not every day that one stumbles upon a mentor’s sanctum. I want to thank you for being here! I have spent years devoted to understanding and decoding the many aspects of life, human potential, and the restless mind.
            </p>
            <p>
              Along the way, I’ve discovered that wisdom truly multiplies when it is shared. That’s why I speak, write, and connect with the simple hope that the lessons life has taught me might illuminate someone else’s path, too.
            </p>
            <p>
              My devotion to guiding seekers and leaders has brought me the title of <strong className="text-slate-900 font-semibold">&ldquo;urban mindfulness mentor.&rdquo;</strong> I wear this with gratitude and an open heart.
            </p>
          </div>

          {/* Exact Ochre Pill Button */}
          <div className="pt-2 flex flex-wrap items-center gap-5">
            <button
              onClick={() => scrollToSection('contact')}
              className="ochre-pill-button text-base font-bold shadow-md hover:shadow-lg"
            >
              Get In Touch
            </button>

            <button
              onClick={() => scrollToSection('books')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
            >
              <span>Explore My Books &amp; Works</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN OVERLAY MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#fffcf7]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="font-cursive text-3xl font-bold text-[#8a5d28]">
              Pranav Mahajan
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-xs cursor-pointer"
            >
              <X className="w-6 h-6 text-amber-700" />
            </button>
          </div>

          <div className="max-w-md mx-auto w-full space-y-4 text-center my-auto">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              Home &bull; The Welcome
            </button>
            <button
              onClick={() => scrollToSection('books')}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              Books by Pranav Mahajan
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              Upcoming Events &amp; Summits
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              Get In Touch &bull; Inquiries
            </button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-4 border-t border-amber-200">
            &copy; 2026 Pranav Mahajan Official &bull; Wisdom &bull; Leadership &bull; Stillness
          </div>
        </div>
      )}
    </section>
  );
}
