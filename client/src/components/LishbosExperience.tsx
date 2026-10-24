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
  const [boardState, setBoardState] = useState<'idle' | 'sweeping-forward' | 'sweeping-backward'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const isLockedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const slide4Ref = useRef<HTMLDivElement>(null);

  const totalSlides = 5;

  const goToSlide = useCallback((targetIndex: number, explicitDirection?: 'forward' | 'backward') => {
    if (isLockedRef.current) return;
    if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === current) return;

    isLockedRef.current = true;
    const isForward = explicitDirection ? explicitDirection === 'forward' : targetIndex > current;
    
    // Step 1: Trigger the clean Lishbos dark luxury glowing sliding board
    setBoardState(isForward ? 'sweeping-forward' : 'sweeping-backward');

    // Step 2: At mid-point (~420ms) when the dark glowing board covers the screen, switch slide
    setTimeout(() => {
      setCurrent(targetIndex);
      if (slide4Ref.current) {
        slide4Ref.current.scrollTop = 0;
      }
    }, 420);

    // Step 3: At 870ms when the dark glowing board has fully swept to the other side, reset and unlock
    setTimeout(() => {
      setBoardState('idle');
      isLockedRef.current = false;
    }, 870);
  }, [current, totalSlides]);

  // Stop at the last slide - do NOT loop to beginning on scroll down
  const nextSlide = useCallback(() => {
    if (current < totalSlides - 1) {
      goToSlide(current + 1, 'forward');
    }
  }, [current, totalSlides, goToSlide]);

  // Smoothly go back from the last slide or any slide - stop at slide 0
  const prevSlide = useCallback(() => {
    if (current > 0) {
      goToSlide(current - 1, 'backward');
    }
  }, [current, totalSlides, goToSlide]);

  // Robust, ultra-sensitive wheel listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 1. If currently locked in slide transition, prevent default & wait
      if (isLockedRef.current) {
        e.preventDefault();
        return;
      }

      // 2. Ultra-sensitive: even a slight touch of mousewheel or trackpad triggers it
      if (Math.abs(e.deltaY) < 2) return;

      // 3. Special handling for Slide 4 (last slide with footer)
      if (current === totalSlides - 1) {
        const container = slide4Ref.current;
        if (container) {
          if (e.deltaY > 0) {
            // Scrolling down -> scroll into footer
            const maxScroll = container.scrollHeight - container.clientHeight;
            if (container.scrollTop < maxScroll - 2) {
              container.scrollTop += e.deltaY;
              e.preventDefault();
              return;
            }
            // Already at bottom of footer - stop (do not loop)
            e.preventDefault();
            return;
          } else {
            // Scrolling up
            if (container.scrollTop > 10) {
              // Scroll up inside container back towards contact form
              container.scrollTop += e.deltaY;
              e.preventDefault();
              return;
            } else {
              // At the very top of Slide 4! Go back to Slide 3
              e.preventDefault();
              prevSlide();
              return;
            }
          }
        }
      }

      // 4. For Slides 0, 1, 2, 3:
      e.preventDefault();
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (current === totalSlides - 1 && slide4Ref.current) {
          slide4Ref.current.scrollBy({ top: 180, behavior: 'smooth' });
        } else {
          nextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (current === totalSlides - 1 && slide4Ref.current && slide4Ref.current.scrollTop > 20) {
          slide4Ref.current.scrollBy({ top: -180, behavior: 'smooth' });
        } else {
          prevSlide();
        }
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

      if (current === totalSlides - 1) {
        const container = slide4Ref.current;
        if (container) {
          // If swiping down at top of Slide 4, go back to slide 3
          if (diffY < -25 && container.scrollTop <= 10) {
            prevSlide();
            return;
          }
          return;
        }
      }

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 18) {
          if (diffX > 0) nextSlide();
          else prevSlide();
        }
      } else {
        if (Math.abs(diffY) > 18) {
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
  }, [current, totalSlides, nextSlide, prevSlide]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fffcf7] text-slate-800 select-none">
      {/* Radiant Sunrise Ambient Glows */}
      <div className="sunrise-glow w-[600px] h-[600px] -top-32 -left-32 opacity-65" />
      <div className="sunrise-glow w-[650px] h-[650px] top-1/2 -right-36 opacity-50" />

      {/* 
        EXACT LISHBOS TECHNOLOGIES SLIDING WHITE BOARD:
        Pure, clean white sliding board with zero text inside it.
        Sweeps across horizontally on every scroll like the reference site!
      */}
      {boardState !== 'idle' && (
        <div className={`lishbos-slide-board ${boardState}`} />
      )}

      {/* TOP HEADER: Transparent Gold Logo & Menu Controls (Clean, no big letters) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 sm:py-5 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => goToSlide(0)}
          className="pointer-events-auto flex items-center gap-3 text-left group cursor-pointer transition-transform hover:scale-105"
        >
          <img
            src="/pranav_mahajan_transparent.png"
            alt="Pranav Mahajan"
            className="h-8 sm:h-10 w-auto object-contain drop-shadow-sm"
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
            className="w-10 h-10 rounded-2xl bg-white/90 border border-amber-200/80 hover:bg-amber-50 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
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
        {/* SLIDE 0: GAUR GOPAL DAS EXACT SCREENSHOT STYLE HERO */}
        <div className="slide-item bg-[#fffcf7]">
          <div className={`max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center px-6 sm:px-12 py-10 sm:py-14 ${current === 0 ? 'slide-content-anim' : ''}`}>
            {/* Left Column: Portrait Energy Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] rounded-3xl bg-gradient-to-tr from-[#f5ede0] via-[#fffbf5] to-[#fdedd5] border-2 border-amber-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.22),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-[11px] text-amber-800 font-bold tracking-widest uppercase relative z-10">
                  <span className="inline-flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    Vedic Wisdom
                  </span>
                  <span>Est. 2012</span>
                </div>

                <div className="my-auto relative z-10 py-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 p-[2px] shadow-lg mb-3">
                    <div className="w-full h-full bg-[#fffcf7] rounded-full flex items-center justify-center">
                      <Sun className="w-8 h-8 text-amber-600 animate-spin-slow" />
                    </div>
                  </div>
                  <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#784d1c] mb-1">
                    The Inner Sanctuary
                  </div>
                  <p className="text-xs text-slate-600 font-serif italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;True strength is not physical might, but the unshakeable calm within your heart.&rdquo;
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-amber-900">500,000+ Seekers</span>
                  <span>24+ Nations</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title & Monologue */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h1 className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-bold text-[#6d4416] tracking-tight leading-tight">
                Pranav Mahajan
              </h1>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  It’s not every day that one stumbles upon a mentor’s sanctum. I have spent years devoted to understanding and decoding the many aspects of life, human potential, and the restless mind.
                </p>
                <p>
                  Wisdom grows when it is shared. My devotion to guiding seekers and leaders has brought me the title of <strong className="text-slate-900 font-semibold">&ldquo;urban mindfulness mentor&rdquo;</strong> — which I wear with gratitude and a smile.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => goToSlide(4)}
                  className="ochre-pill-button py-2.5 px-6 text-sm font-bold shadow-md hover:shadow-lg"
                >
                  Get In Touch
                </button>

                <button
                  onClick={nextSlide}
                  className="outline-pill-button py-2.5 px-5 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore My Books (Slide Next)</span>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 1: BOOKS BY PRANAV MAHAJAN */}
        <div className="slide-item bg-[#faf4ea]">
          <div className={`max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center px-6 sm:px-12 py-10 sm:py-14 ${current === 1 ? 'slide-content-anim' : ''}`}>
            {/* Left Column: Featured Book Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] rounded-3xl bg-gradient-to-tr from-[#f6eee2] via-[#fffdf9] to-[#faeee0] border-2 border-amber-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-[11px] text-amber-900 font-bold uppercase tracking-wider relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    Bestseller
                  </span>
                  <span>12,400+ Copies</span>
                </div>

                <div className="my-auto relative z-10 py-4">
                  <div className="w-20 h-28 mx-auto rounded-xl bg-gradient-to-tr from-amber-600 via-amber-700 to-amber-900 text-white p-2.5 shadow-xl flex flex-col justify-between mb-3 transform hover:scale-105 transition-transform">
                    <span className="text-[8px] font-mono tracking-widest text-amber-200 uppercase">National Bestseller</span>
                    <div className="font-serif-luxury text-sm font-bold leading-tight">The Unstoppable Mind</div>
                    <span className="text-[8px] text-amber-200/90 font-medium">Pranav Mahajan</span>
                  </div>
                  <div className="font-serif-luxury text-2xl font-bold text-[#784d1c] mb-1">
                    The Unstoppable Mind
                  </div>
                  <p className="text-xs text-slate-600 font-serif italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;When clarity meets devotion, outer turmoil turns into silent power.&rdquo;
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
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
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-1.5 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  Literary Works &amp; Publications
                </div>
                <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6d4416] tracking-tight leading-tight">
                  Books by Pranav Mahajan
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                  Transformative writings blending 5,000 years of contemplative Vedic mindfulness with modern peak resilience.
                </p>
              </div>

              <div className="space-y-2.5">
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
                    className="p-3.5 rounded-2xl bg-white/95 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-sans text-lg font-bold text-slate-900 leading-tight">
                        {book.title}
                      </div>
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        {book.tagline}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {book.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => goToSlide(4)}
                      className="ochre-pill-button py-1.5 px-3.5 text-xs font-bold flex-shrink-0"
                    >
                      Inquire Book
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex items-center gap-6">
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
        {/* SLIDE 2: KEYNOTE ADDRESSES */}
        <div className="slide-item bg-[#fcf6ee]">
          <div className={`max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center px-6 sm:px-12 py-10 sm:py-14 ${current === 2 ? 'slide-content-anim' : ''}`}>
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Keynote Presentations
              </div>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6d4416] tracking-tight leading-tight">
                The Unstoppable Mind In Chaos
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                A high-voltage keynote addressing corporate burnout, emotional exhaustion, and the fear of failure. Designed for global summits and leadership kickoffs.
              </p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Subconscious cognitive reframing under extreme uncertainty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Transmuting acute corporate stress into creative drive</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>The 3 daily mental rituals of ultra-high performers</span>
                </div>
              </div>
              <div className="pt-1 flex items-center gap-4">
                <button
                  onClick={() => goToSlide(4)}
                  className="ochre-pill-button py-2 px-5 text-xs font-bold"
                >
                  Inquire This Keynote
                </button>
                <button
                  onClick={nextSlide}
                  className="outline-pill-button py-2 px-5 text-xs font-bold"
                >
                  World Tour &rarr;
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="p-6 rounded-3xl bg-white/95 border border-amber-200 shadow-xl max-w-sm w-full text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#784d1c] mb-1">
                  Keynote Impact Metrics
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Measured feedback from 180+ global keynote stages across Fortune 500 summits.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/60">
                    <div className="text-2xl font-black text-amber-700">4.98 / 5</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Average Delegate Rating</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/60">
                    <div className="text-2xl font-black text-amber-700">92%</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Reported Lower Stress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3: UPCOMING EVENTS & WORLD TOUR */}
        <div className="slide-item bg-[#f8f1e5]">
          <div className={`max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center px-6 sm:px-12 py-10 sm:py-14 ${current === 3 ? 'slide-content-anim' : ''}`}>
            {/* Left Column: Tour Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] rounded-3xl bg-gradient-to-tr from-[#f6eee2] via-[#fffdf9] to-[#faeee0] border-2 border-amber-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-amber-900/[0.06] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center text-[11px] text-amber-900 font-bold uppercase tracking-wider relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    World Tour 2026-27
                  </span>
                  <span>14 Cities</span>
                </div>

                <div className="my-auto relative z-10 py-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 p-[2px] shadow-lg mb-3">
                    <div className="w-full h-full bg-[#fffcf7] rounded-full flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-amber-600 animate-bounce" />
                    </div>
                  </div>
                  <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#784d1c] mb-1">
                    Global Retreats &amp; Summits
                  </div>
                  <p className="text-xs text-slate-600 font-serif italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;When thousands breathe in collective stillness, inner transformation becomes effortless.&rdquo;
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
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
            <div className="lg:col-span-7 space-y-3.5 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-1 shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  Live Keynotes &amp; Sacred Retreats
                </div>
                <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6d4416] tracking-tight leading-tight">
                  Upcoming Events &amp; Tour
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                  Immerse in live keynote transmissions and intimate Himalayan stillness retreats.
                </p>
              </div>

              <div className="space-y-2.5">
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
                    className="p-3.5 rounded-2xl bg-white/95 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                          {ev.badge}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {ev.status}
                        </span>
                      </div>
                      <div className="font-sans text-lg font-bold text-slate-900">
                        {ev.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-700" />
                          {ev.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-700" />
                          {ev.date}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => goToSlide(4)}
                      className="ochre-pill-button py-1.5 px-3.5 text-xs font-bold flex-shrink-0 self-start sm:self-center"
                    >
                      Inquire / Reserve
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-1 flex items-center gap-6">
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

        {/* SLIDE 4: GET IN TOUCH & MASTER LUXURY FOOTER */}
        <div
          ref={slide4Ref}
          className="slide-item bg-[#fffbf5] flex flex-col items-stretch justify-start overflow-y-auto"
        >
          {/* Part 1: Contact Form Section (Full Viewport Height) */}
          <div className="min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-12 sm:py-16">
            <div className={`max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${current === 4 ? 'slide-content-anim' : ''}`}>
              {/* Left Column: Direct Contact & Office Details */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] rounded-3xl bg-gradient-to-tr from-[#f6eee2] via-[#fffdf9] to-[#faeee0] border-2 border-amber-200/80 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-amber-900/[0.06] text-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

                  <div className="flex justify-between items-center text-[11px] text-amber-900 font-bold uppercase tracking-wider relative z-10">
                    <span className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      <Mail className="w-3.5 h-3.5 text-amber-700" />
                      Direct Connect
                    </span>
                    <span>Global Office</span>
                  </div>

                  <div className="my-auto relative z-10 py-4 text-left space-y-2.5">
                    <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#784d1c] text-center mb-1">
                      Soul-To-Soul Connection
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed text-center">
                      Whether booking an international keynote or seeking guidance, you are warmly welcome.
                    </p>
                    <div className="p-2.5 rounded-2xl bg-white/80 border border-amber-200/60 text-xs space-y-0.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Executive Inquiries:</div>
                      <div className="font-semibold text-slate-800">speaking@pranavmahajan.com</div>
                      <div className="text-[10px] text-slate-500">Response within 24 business hours</div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/80 border border-amber-200/60 text-xs space-y-0.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Global Offices:</div>
                      <div className="text-slate-700">New Delhi &bull; Dubai &bull; London</div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Wisdom &bull; Clarity &bull; Peace</span>
                    <button
                      onClick={() => goToSlide(0, 'backward')}
                      className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowUp className="w-3 h-3" />
                      Home
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact & Booking Form */}
              <div className="lg:col-span-7 space-y-3.5 text-left">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-1 shadow-xs">
                    <Mail className="w-3.5 h-3.5 text-amber-700" />
                    Inquiries &amp; Speaking Bookings
                  </div>
                  <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6d4416] tracking-tight leading-tight">
                    Get In Touch
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                    Send a speaking inquiry or personal reflection directly to Pranav Mahajan’s desk.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-amber-200/80 shadow-lg text-left max-w-xl">
                  {formSent ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-1.5 text-emerald-600" />
                      <div className="font-bold text-sm">Thank you! Your message has been received.</div>
                      <div className="text-xs mt-0.5">Our executive office will respond within 24 hours.</div>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setFormSent(true);
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#faf8f5] border border-amber-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#faf8f5] border border-amber-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Organization / Event / City"
                          value={formData.org}
                          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#faf8f5] border border-amber-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          required
                          placeholder="Your Message or Speaking Inquiries..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#faf8f5] border border-amber-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-amber-500 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="ochre-pill-button w-full py-2.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Your Message
                      </button>
                    </form>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-5">
                  <button
                    onClick={prevSlide}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
                  >
                    &larr; Back to Events &amp; Tour
                  </button>
                  <button
                    onClick={() => {
                      slide4Ref.current?.scrollBy({ top: 380, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-widest cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Scroll Down to Footer</span>
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Part 2: Master Luxury Footer (Scrolls Naturally Downward) */}
          <footer className="w-full bg-[#faf4ea] border-t-2 border-amber-200/90 text-slate-700 pt-16 pb-28 px-6 sm:px-12 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 space-y-12">
              {/* Top Row: Brand Monogram & Mission Quote */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-amber-200/80">
                <div className="space-y-3 text-center md:text-left max-w-md">
                  <img
                    src="/pranav_mahajan_transparent.png"
                    alt="Pranav Mahajan"
                    className="h-10 sm:h-12 w-auto object-contain mx-auto md:mx-0 drop-shadow-xs"
                  />
                  <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#784d1c]">
                    Urban Mindfulness &bull; Vedic Leadership
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif italic">
                    &ldquo;When clarity meets devotion, outer turmoil turns into silent power. Stillness is not inaction—it is the foundation of supreme action.&rdquo;
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3">
                  <button
                    onClick={() => {
                      slide4Ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="ochre-pill-button py-2.5 px-6 text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Back to Top of Form</span>
                  </button>
                  <span className="text-[11px] font-mono font-medium text-amber-800">
                    Serving seekers across 24+ nations
                  </span>
                </div>
              </div>

              {/* 4 Multi-column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
                {/* Column 1: Directory Experience */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    Sanctum Directory
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li>
                      <button
                        onClick={() => goToSlide(0, 'backward')}
                        className="text-slate-600 hover:text-amber-800 hover:underline transition-colors cursor-pointer text-left"
                      >
                        01 &bull; Welcome Sanctum (Home)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => goToSlide(1, 'backward')}
                        className="text-slate-600 hover:text-amber-800 hover:underline transition-colors cursor-pointer text-left"
                      >
                        02 &bull; Books &amp; Publications
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => goToSlide(2, 'backward')}
                        className="text-slate-600 hover:text-amber-800 hover:underline transition-colors cursor-pointer text-left"
                      >
                        03 &bull; Keynotes &amp; Resilience
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => goToSlide(3, 'backward')}
                        className="text-slate-600 hover:text-amber-800 hover:underline transition-colors cursor-pointer text-left"
                      >
                        04 &bull; Global Events &amp; Tour
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          slide4Ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-amber-900 font-semibold hover:text-amber-700 hover:underline transition-colors cursor-pointer text-left"
                      >
                        05 &bull; Inquiries &amp; Bookings
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Programs & Mentorship */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Sacred Offerings
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="hover:text-slate-900 transition-colors">Vedic Mindfulness Executive Circles</li>
                    <li className="hover:text-slate-900 transition-colors">Keynote: The Unstoppable Mind</li>
                    <li className="hover:text-slate-900 transition-colors">Awaken 3-Day Himalayan Retreats</li>
                    <li className="hover:text-slate-900 transition-colors">Youth Clarity &amp; Leadership Initiative</li>
                    <li className="hover:text-slate-900 transition-colors">Corporate Cognitive Burnout Audit</li>
                  </ul>
                </div>

                {/* Column 3: Representation & Offices */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    Global Bureau
                  </h4>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div>
                      <div className="font-bold text-slate-800">New Delhi Bureau (HQ)</div>
                      <div>Connaught Place, Central Sanctum, New Delhi 110001</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Dubai &amp; EMEA Office</div>
                      <div>Downtown Dubai, United Arab Emirates</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Speaking &amp; Press Desk:</div>
                      <div className="font-semibold text-amber-900">speaking@pranavmahajan.com</div>
                    </div>
                  </div>
                </div>

                {/* Column 4: Weekly Contemplation Newsletter */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-700" />
                    Sunday Contemplation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Join 65,000+ conscious leaders receiving Pranav&rsquo;s weekly meditation on stillness, focus, and purposeful living.
                  </p>
                  <div className="space-y-2 pt-1">
                    <input
                      type="email"
                      placeholder="Enter your personal email"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 shadow-2xs"
                    />
                    <button
                      onClick={() => alert('Thank you for subscribing to Sunday Contemplation!')}
                      className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      Subscribe Free
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Legal / Copyright Row */}
              <div className="pt-8 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div>
                  &copy; 2026 Pranav Mahajan Official. All rights reserved. &bull; Inspired by Gaur Gopal Das &amp; Ancient Vedic Wisdom.
                </div>
                <div className="flex items-center gap-6">
                  <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
                  <span className="hover:text-slate-800 cursor-pointer">Press Kit &amp; Rider</span>
                  <button
                    onClick={() => goToSlide(0, 'backward')}
                    className="font-bold text-amber-800 hover:text-amber-900 cursor-pointer flex items-center gap-1"
                  >
                    <ArrowUp className="w-3 h-3" />
                    Home Sanctum
                  </button>
                </div>
              </div>
            </div>
          </footer>
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
            disabled={current === 0}
            className={`w-9 h-9 rounded-full bg-white/90 border border-amber-200/80 flex items-center justify-center shadow-xs transition-all ${
              current === 0 ? 'opacity-35 cursor-not-allowed text-slate-400' : 'hover:bg-amber-100 text-slate-700 hover:text-amber-800 cursor-pointer'
            }`}
            aria-label="Previous Slide (Scroll Up)"
            title="Scroll Up to Previous Slide"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={current === totalSlides - 1}
            className={`w-9 h-9 rounded-full bg-white/90 border border-amber-200/80 flex items-center justify-center shadow-xs transition-all ${
              current === totalSlides - 1 ? 'opacity-35 cursor-not-allowed text-slate-400' : 'hover:bg-amber-100 text-slate-700 hover:text-amber-800 cursor-pointer'
            }`}
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
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
            >
              01 &bull; Welcome (Home)
            </button>
            <button
              onClick={() => {
                goToSlide(1);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
            >
              02 &bull; Books by Pranav Mahajan
            </button>
            <button
              onClick={() => {
                goToSlide(2);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
            >
              03 &bull; Keynotes &amp; Resilience
            </button>
            <button
              onClick={() => {
                goToSlide(3);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
            >
              04 &bull; Upcoming Events &amp; Tour
            </button>
            <button
              onClick={() => {
                goToSlide(4);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
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
