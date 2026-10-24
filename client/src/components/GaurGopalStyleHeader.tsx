'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function GaurGopalStyleHeader() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.min(Math.floor((scrollPos + windowHeight * 0.4) / windowHeight) + 1, 5);
      setActiveSlide(Math.max(1, index));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideLinks = [
    { num: '01', title: 'The Awakening', id: 'slide-1' },
    { num: '02', title: 'The Journey', id: 'slide-2' },
    { num: '03', title: 'Books & Wisdom', id: 'slide-3' },
    { num: '04', title: 'Upcoming Events', id: 'slide-4' },
    { num: '05', title: 'Get In Touch', id: 'slide-5' },
  ];

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Floating Minimal Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 pointer-events-none flex items-center justify-between">
        {/* Left Minimal Brand Signature */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => scrollToSlide('slide-1')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-300/60 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Sun className="w-5 h-5 text-amber-700 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight block">
                Pranav Mahajan
              </span>
              <span className="text-[10px] text-amber-800 font-semibold tracking-widest uppercase block -mt-0.5">
                Speaker &bull; Mentor
              </span>
            </div>
          </button>
        </div>

        {/* Right Minimal Controls: Slide Tracker & Get In Touch button */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Active slide counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200/60 shadow-xs text-xs font-mono font-bold text-amber-900">
            <span className="text-amber-600">0{activeSlide}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">05</span>
          </div>

          {/* Quick Get in Touch Action */}
          <button
            onClick={() => scrollToSlide('slide-5')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-amber-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Minimal Floating Menu Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-amber-200/80 text-slate-800 hover:text-amber-700 shadow-md cursor-pointer transition-transform active:scale-95"
            aria-label="Navigation Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Floating Side Slide Dots (Desktop) */}
      <nav
        aria-label="Slide Navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto"
      >
        {slideLinks.map((slide, idx) => {
          const isActive = activeSlide === idx + 1;
          return (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(slide.id)}
              className="group flex items-center justify-end gap-2 text-right cursor-pointer"
              aria-label={`Jump to ${slide.title}`}
            >
              <span className={`text-[11px] font-semibold tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 px-2 py-0.5 rounded-md bg-white/90 shadow-xs text-slate-700`}>
                {slide.title}
              </span>
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-8 bg-amber-600 shadow-sm'
                    : 'w-2.5 h-2.5 bg-amber-300 hover:bg-amber-500'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Fullscreen Overlay Menu (like Gaur Gopal Das style) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#faf8f5]/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-amber-700" />
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">
                Pranav Mahajan
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-2xl bg-white border border-amber-200 text-slate-800 hover:text-amber-700 shadow-sm cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto w-full my-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block mb-2">
              Explore The Experience
            </span>
            {slideLinks.map((slide) => (
              <button
                key={slide.id}
                onClick={() => scrollToSlide(slide.id)}
                className="w-full text-left py-3 sm:py-4 px-6 rounded-2xl bg-white/60 hover:bg-white border border-amber-200/50 hover:border-amber-400 text-2xl sm:text-4xl font-extrabold text-slate-800 hover:text-amber-700 transition-all flex items-center justify-between group cursor-pointer shadow-xs hover:shadow-md"
              >
                <span>{slide.title}</span>
                <span className="text-sm font-mono text-amber-600 group-hover:translate-x-1 transition-transform">
                  {slide.num} &rarr;
                </span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>Official Platform of Pranav Mahajan</span>
            <span className="text-amber-800 font-medium">Spiritual Wisdom &bull; Life Mastery &bull; Global Keynotes</span>
          </div>
        </div>
      )}
    </>
  );
}
