'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sun,
  Sparkles,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  X,
  Menu,
  Compass,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  Mail,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function LishbosExperience() {
  const [current, setCurrent] = useState(0);
  const [curtainState, setCurtainState] = useState<'idle' | 'sweep-forward' | 'sweep-backward'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const isLockedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const totalSlides = 5;

  const goToSlide = useCallback((targetIndex: number, explicitDirection?: 'forward' | 'backward') => {
    if (isLockedRef.current) return;
    if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === current) return;

    isLockedRef.current = true;
    const isForward = explicitDirection ? explicitDirection === 'forward' : targetIndex > current;
    
    // Step 1: Trigger the signature golden-ochre sweeping color curtain
    setCurtainState(isForward ? 'sweep-forward' : 'sweep-backward');

    // Step 2: At mid-sweep (~180ms), transition the slide track smoothly
    setTimeout(() => {
      setCurrent(targetIndex);
    }, 180);

    // Step 3: Complete transition and release lock
    setTimeout(() => {
      setCurtainState('idle');
      isLockedRef.current = false;
    }, 680);
  }, [current, totalSlides]);

  const nextSlide = useCallback(() => {
    if (current < totalSlides - 1) {
      goToSlide(current + 1, 'forward');
    } else {
      goToSlide(0, 'forward');
    }
  }, [current, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (current > 0) {
      goToSlide(current - 1, 'backward');
    } else {
      goToSlide(totalSlides - 1, 'backward');
    }
  }, [current, totalSlides, goToSlide]);

  // Robust wheel listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLockedRef.current) return;
      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 35) {
          if (diffX > 0) nextSlide();
          else prevSlide();
        }
      } else {
        if (Math.abs(diffY) > 35) {
          if (diffY > 0) nextSlide();
          else prevSlide();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fffcf7] text-slate-800 select-none">
      {/* Radiant Sunrise Ambient Glows */}
      <div className="sunrise-glow w-[600px] h-[600px] -top-32 -left-32 opacity-65" />
      <div className="sunrise-glow w-[650px] h-[650px] top-1/2 -right-36 opacity-50" />

      {/* 
        SIGNATURE LISHBOS SWEEPING COLOR CURTAIN:
        Sweeps smoothly across from side to side in warm golden-ochre dawn colors ahead of every slide!
      */}
      <div
        className={`sweep-curtain ${
          curtainState === 'sweep-forward'
            ? 'sweep-forward'
            : curtainState === 'sweep-backward'
            ? 'sweep-backward'
            : ''
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="font-cursive text-5xl sm:text-7xl font-bold text-white/40 tracking-wider drop-shadow-md">
            Pranav Mahajan
          </span>
          <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/50 mt-1 font-semibold">
            Wisdom &bull; Leadership &bull; Stillness
          </span>
        </div>
      </div>

      {/* TOP HEADER: Transparent Gold Logo & Menu Controls */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => goToSlide(0)}
          className="pointer-events-auto flex items-center gap-3 text-left group cursor-pointer transition-transform hover:scale-105"
        >
          <img
            src="/pranav_mahajan_transparent.png"
            alt="Pranav Mahajan"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow-sm"
          />
        </button>

        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => goToSlide(4)}
            className="hidden sm:inline-flex ochre-pill-button py-2 px-5 text-xs font-bold shadow-xs hover:shadow-md"
          >
            Get In Touch
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 rounded-2xl bg-white/90 border border-amber-200/80 hover:bg-amber-50 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-amber-700" />
            ) : (
              <>
                <span className="w-4 h-0.5 bg-slate-800 rounded-full" />
                <span className="w-3 h-0.5 bg-amber-600 rounded-full self-start ml-3.5" />
                <span className="w-4 h-0.5 bg-slate-800 rounded-full" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* 
        CONTINUOUS HORIZONTAL SLIDING TRACK:
        Translates exactly 100vw per slide with smooth cubic bezier easing!
      */}
      <div
        className="slide-track"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {/* SLIDE 0: GAUR GOPAL DAS EXACT SCREENSHOT STYLE HERO */}
        <div className="slide-item">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center px-6 sm:px-12 pt-20 pb-16">
            {/* Left Column: Portrait Energy Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-[36px] bg-gradient-to-tr from-[#f5ede0] via-[#fffbf5] to-[#fdedd5] border-2 border-amber-200/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.22),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-xs text-amber-800 font-semibold tracking-widest uppercase relative z-10">
                  <span className="inline-flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    Vedic Wisdom
                  </span>
                  <span>Est. 2012</span>
                </div>

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

                <div className="relative z-10 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-amber-900">500,000+ Seekers</span>
                  <span>24+ Nations</span>
                </div>
              </div>
            </div>

            {/* Right Column: Handwriting Title & Monologue */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="font-cursive text-6xl sm:text-7xl lg:text-8xl font-bold text-[#8a5d28] tracking-wide leading-none">
                Pranav Mahajan
              </h1>

              <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                <p>
                  It’s not every day that one stumbles upon a mentor’s sanctum. I want to thank you for being here! I have spent years devoted to understanding and decoding the many aspects of life, human potential, and the restless mind.
                </p>
                <p>
                  Along the way, I’ve discovered that wisdom grows when it is shared. That’s why I speak, write, and connect with the simple hope that the lessons life has taught me might illuminate someone else’s path, too.
                </p>
                <p>
                  My devotion to guiding seekers and leaders has brought me the title of <strong className="text-slate-900 font-semibold">&ldquo;urban mindfulness mentor.&rdquo;</strong> I wear this with gratitude and a smile.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goToSlide(4)}
                  className="ochre-pill-button text-base font-bold shadow-md hover:shadow-lg"
                >
                  Get In Touch
                </button>

                <button
                  onClick={nextSlide}
                  className="outline-pill-button text-sm font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore My Books (Slide Next)</span>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 1: BOOKS BY PRANAV MAHAJAN */}
        <div className="slide-item">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 sm:px-12 pt-20 pb-16">
            {/* Left Column: Featured Book Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[36px] bg-gradient-to-tr from-[#f6eee2] via-[#fffdf9] to-[#faeee0] border-2 border-amber-200/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-xs text-amber-900 font-bold uppercase tracking-wider relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    Bestseller
                  </span>
                  <span>12,400+ Copies</span>
                </div>

                <div className="my-auto relative z-10 py-6">
                  <div className="w-24 h-32 mx-auto rounded-xl bg-gradient-to-tr from-amber-600 via-amber-700 to-amber-900 text-white p-3 shadow-xl flex flex-col justify-between mb-4 transform hover:scale-105 transition-transform">
                    <span className="text-[9px] font-mono tracking-widest text-amber-200 uppercase">National Bestseller</span>
                    <div className="font-cursive text-lg font-bold leading-tight">The Unstoppable Mind</div>
                    <span className="text-[8px] text-amber-200/90 font-medium">Pranav Mahajan</span>
                  </div>
                  <div className="font-cursive text-3xl font-bold text-[#8a5d28] mb-1">
                    The Unstoppable Mind
                  </div>
                  <p className="text-xs text-slate-600 font-serif italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;When clarity meets devotion, outer turmoil turns into silent power.&rdquo;
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Amazon &bull; Crossword &bull; Kindle</span>
                  <button
                    onClick={() => goToSlide(4)}
                    className="ochre-pill-button py-1.5 px-3.5 text-xs font-bold"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Literary Overview & All Titles List */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  Literary Works &amp; Publications
                </div>
                <h2 className="font-cursive text-5xl sm:text-6xl font-bold text-[#8a5d28] tracking-wide leading-tight">
                  Books by Pranav Mahajan
                </h2>
                <p className="text-slate-600 text-sm max-w-xl">
                  Transformative writings blending 5,000 years of contemplative Vedic mindfulness with modern peak resilience.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'The Unstoppable Mind',
                    tagline: 'Mastering Inner Resilience in Chaos',
                    desc: 'Conquer cognitive fatigue, silence inner critics, and forge unwavering mental focus.',
                  },
                  {
                    title: 'The Sacred Pause',
                    tagline: 'Modern Zen for Peak Achievers',
                    desc: 'Practical micro-pauses for high-speed executives to eliminate burnout and restore calm.',
                  },
                  {
                    title: 'Conscious Leadership',
                    tagline: 'Influence Beyond Authority & Ego',
                    desc: 'Leading through authentic vulnerability, psychological safety, and vision.',
                  },
                ].map((book, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/95 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-cursive text-2xl font-bold text-[#8a5d28] leading-tight">
                        {book.title}
                      </div>
                      <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                        {book.tagline}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {book.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => goToSlide(4)}
                      className="ochre-pill-button py-2 px-4 text-xs font-bold flex-shrink-0"
                    >
                      Inquire Book
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-6">
                <button
                  onClick={prevSlide}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
                >
                  &larr; Back to Welcome
                </button>
                <button
                  onClick={nextSlide}
                  className="outline-pill-button py-2 px-5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Keynotes &amp; Resilience</span>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 2: KEYNOTE ADDRESSES */}
        <div className="slide-item">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center px-6 sm:px-12 pt-20 pb-16">
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Keynote Presentations
              </div>
              <h2 className="font-cursive text-5xl sm:text-6xl font-bold text-[#8a5d28] tracking-wide leading-tight">
                The Unstoppable Mind In Chaos
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                A high-voltage 60-90 minute keynote addressing corporate burnout, emotional exhaustion, and the fear of failure. Designed for global summits, leadership conventions, and annual kickoffs.
              </p>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Subconscious cognitive reframing under extreme uncertainty</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Transmuting acute corporate stress into creative drive</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>The 3 daily mental rituals of ultra-high performers</span>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => goToSlide(4)}
                  className="ochre-pill-button py-2.5 px-6 text-xs font-bold"
                >
                  Inquire This Keynote
                </button>
                <button
                  onClick={nextSlide}
                  className="outline-pill-button py-2.5 px-6 text-xs font-bold"
                >
                  World Tour &rarr;
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="p-8 rounded-3xl bg-white/95 border border-amber-200 shadow-xl max-w-md w-full text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="font-cursive text-3xl font-bold text-[#8a5d28] mb-2">
                  Keynote Impact Metrics
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Measured feedback from 180+ global keynote stages across Fortune 500 summits.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60">
                    <div className="text-2xl font-black text-amber-700">4.98 / 5</div>
                    <div className="text-[11px] text-slate-600 mt-1">Average Delegate Rating</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60">
                    <div className="text-2xl font-black text-amber-700">92%</div>
                    <div className="text-[11px] text-slate-600 mt-1">Reported Lower Stress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3: UPCOMING EVENTS & WORLD TOUR */}
        <div className="slide-item">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 sm:px-12 pt-20 pb-16">
            {/* Left Column: Tour Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[36px] bg-gradient-to-tr from-[#f6eee2] via-[#fffdf9] to-[#faeee0] border-2 border-amber-200/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-xs text-amber-900 font-bold uppercase tracking-wider relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    World Tour 2026-27
                  </span>
                  <span>14 Cities</span>
                </div>

                <div className="my-auto relative z-10 py-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 p-[2px] shadow-lg mb-4">
                    <div className="w-full h-full bg-[#fffcf7] rounded-full flex items-center justify-center">
                      <MapPin className="w-9 h-9 text-amber-600 animate-bounce" />
                    </div>
                  </div>
                  <div className="font-cursive text-3xl font-bold text-[#8a5d28] mb-1">
                    Global Retreats &amp; Summits
                  </div>
                  <p className="text-xs text-slate-600 font-serif italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;When thousands breathe in collective stillness, inner transformation becomes effortless.&rdquo;
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Dubai &bull; Rishikesh &bull; Singapore</span>
                  <button
                    onClick={() => goToSlide(4)}
                    className="ochre-pill-button py-1.5 px-3.5 text-xs font-bold"
                  >
                    Reserve Seat
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Events List */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2 shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  Live Keynotes &amp; Sacred Retreats
                </div>
                <h2 className="font-cursive text-5xl sm:text-6xl font-bold text-[#8a5d28] tracking-wide leading-tight">
                  Upcoming Events &amp; Tour
                </h2>
                <p className="text-slate-600 text-sm max-w-xl">
                  Immerse in live keynote transmissions and intimate Himalayan stillness retreats.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Global Leadership & Mindset Summit 2026',
                    location: 'Dubai Opera, United Arab Emirates',
                    date: 'November 14, 2026',
                    badge: 'Flagship Keynote',
                    status: 'Registration Open',
                  },
                  {
                    title: 'Awaken Retreat: 3 Days in Stillness',
                    location: 'Rishikesh, Himalayas, India',
                    date: 'December 05 - 08, 2026',
                    badge: 'Spiritual Immersion',
                    status: 'Limited Seats Left',
                  },
                  {
                    title: 'World Human Potential & Innovation Expo',
                    location: 'Singapore EXPO, Singapore',
                    date: 'January 22, 2027',
                    badge: 'Keynote & Masterclass',
                    status: 'Just Announced',
                  },
                ].map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/95 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                          {ev.badge}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {ev.status}
                        </span>
                      </div>
                      <div className="font-cursive text-xl font-bold text-[#8a5d28]">
                        {ev.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-700" />
                          {ev.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-700" />
                          {ev.date}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => goToSlide(4)}
                      className="ochre-pill-button py-2 px-4 text-xs font-bold flex-shrink-0 self-start sm:self-center"
                    >
                      Inquire / Reserve
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-6">
                <button
                  onClick={prevSlide}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
                >
                  &larr; Back to Keynotes
                </button>
                <button
                  onClick={nextSlide}
                  className="outline-pill-button py-2 px-5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 4: GET IN TOUCH & SPEAKING INQUIRIES */}
        <div className="slide-item">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 sm:px-12 pt-20 pb-16">
            {/* Left Column: Direct Contact & Office Details */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[36px] bg-gradient-to-tr from-[#f6eee2] via-[#fffdf9] to-[#faeee0] border-2 border-amber-200/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-xs text-amber-900 font-bold uppercase tracking-wider relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    <Mail className="w-3.5 h-3.5 text-amber-700" />
                    Direct Connect
                  </span>
                  <span>Global Office</span>
                </div>

                <div className="my-auto relative z-10 py-6 text-left space-y-3">
                  <div className="font-cursive text-3xl font-bold text-[#8a5d28] text-center mb-2">
                    Soul-To-Soul Connection
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-center">
                    Whether you are an event organizer booking an international keynote or a seeker with a question, you are warmly welcome.
                  </p>
                  <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 text-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Executive Inquiries:</div>
                    <div className="font-semibold text-slate-800">speaking@pranavmahajan.com</div>
                    <div className="text-[11px] text-slate-500">Response within 24 business hours</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 text-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Global Representation:</div>
                    <div className="text-slate-700">New Delhi &bull; Dubai &bull; London</div>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Wisdom &bull; Clarity &bull; Peace</span>
                  <button
                    onClick={() => goToSlide(0)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                  >
                    <ArrowUp className="w-3 h-3" />
                    Top
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Booking Form */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2 shadow-xs">
                  <Mail className="w-3.5 h-3.5 text-amber-700" />
                  Inquiries &amp; Speaking Bookings
                </div>
                <h2 className="font-cursive text-5xl sm:text-6xl font-bold text-[#8a5d28] tracking-wide leading-tight">
                  Get In Touch
                </h2>
                <p className="text-slate-600 text-sm max-w-xl">
                  Send a speaking inquiry or personal reflection directly to Pranav Mahajan’s desk.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/95 border border-amber-200/80 shadow-lg text-left max-w-xl">
                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
                    <div className="font-bold text-base">Thank you! Your message has been received.</div>
                    <div className="text-xs mt-1">Our executive office will respond within 24 hours.</div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSent(true);
                    }}
                    className="space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-amber-200 text-sm text-slate-900 outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-amber-200 text-sm text-slate-900 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Organization / Event / City"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-amber-200 text-sm text-slate-900 outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        required
                        placeholder="Your Message or Speaking Inquiries..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-amber-200 text-sm text-slate-900 outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="ochre-pill-button w-full py-3.5 text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Send Your Message
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-1 flex items-center gap-6">
                <button
                  onClick={prevSlide}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
                >
                  &larr; Back to Events &amp; Tour
                </button>
                <button
                  onClick={() => goToSlide(0)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-widest cursor-pointer flex items-center gap-1"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  Return To Beginning (Home)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROLLER BAR: Prev / Next & Progress */}
      <div className="fixed bottom-6 left-6 sm:left-12 right-6 sm:right-12 z-40 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-amber-900">
            0{current + 1} / 0{totalSlides}
          </span>
          <div className="w-24 sm:w-36 h-[2.5px] bg-amber-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full"
              style={{ width: `${((current + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-amber-100 border border-amber-200/80 text-slate-700 hover:text-amber-800 flex items-center justify-center shadow-xs transition-all cursor-pointer"
            aria-label="Previous Slide (Scroll Up)"
            title="Scroll Up to Previous Slide"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-amber-100 border border-amber-200/80 text-slate-700 hover:text-amber-800 flex items-center justify-center shadow-xs transition-all cursor-pointer"
            aria-label="Next Slide (Scroll Down)"
            title="Scroll Down to Next Slide"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULLSCREEN OVERLAY MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#fffcf7]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-xs cursor-pointer"
            >
              <X className="w-6 h-6 text-amber-700" />
            </button>
          </div>

          <div className="max-w-md mx-auto w-full space-y-4 text-center my-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 block mb-2">
              Directory // Experience
            </span>
            <button
              onClick={() => {
                goToSlide(0);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              01 &bull; Welcome (Home)
            </button>
            <button
              onClick={() => {
                goToSlide(1);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              02 &bull; Books by Pranav Mahajan
            </button>
            <button
              onClick={() => {
                goToSlide(2);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              03 &bull; Keynotes &amp; Resilience
            </button>
            <button
              onClick={() => {
                goToSlide(3);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              04 &bull; Upcoming Events &amp; Tour
            </button>
            <button
              onClick={() => {
                goToSlide(4);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              05 &bull; Get In Touch &bull; Inquiries
            </button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-4 border-t border-amber-200">
            &copy; 2026 Pranav Mahajan Official &bull; Wisdom &bull; Leadership &bull; Stillness
          </div>
        </div>
      )}
    </div>
  );
}
