'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sun,
  Sparkles,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Compass,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function GaurGopalSlipSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wipeState, setWipeState] = useState<'' | 'in-forward' | 'out-forward' | 'in-backward' | 'out-backward'>('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef(0);

  const totalSlides = 4;

  const goToSlide = useCallback((targetIndex: number, direction: 'forward' | 'backward') => {
    if (isTransitioningRef.current) return;
    if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === currentSlide) return;

    isTransitioningRef.current = true;

    // Step 1: Curtain wipes in across the screen from the side
    setWipeState(direction === 'forward' ? 'in-forward' : 'in-backward');

    // Step 2: Swap the slide content while curtain covers the view
    setTimeout(() => {
      setCurrentSlide(targetIndex);
      // Step 3: Curtain wipes out revealing the new slide
      setWipeState(direction === 'forward' ? 'out-forward' : 'out-backward');
    }, 220);

    // Step 4: Reset state and release transition lock
    setTimeout(() => {
      setWipeState('');
      isTransitioningRef.current = false;
    }, 460);
  }, [currentSlide, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, 'forward');
    } else {
      goToSlide(0, 'forward'); // Cycle smoothly
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, 'backward');
    } else {
      goToSlide(totalSlides - 1, 'backward');
    }
  }, [currentSlide, totalSlides, goToSlide]);

  // Robust wheel listener with passive: false to prevent scroll locking
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Take full command of scroll gesture
      if (isTransitioningRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - touchEndY;
      if (Math.abs(diff) > 35) {
        if (diff > 0) nextSlide();
        else prevSlide();
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
      {/* 
        COLORED SLIP CURTAIN (The golden amber board that wipes across from side on every scroll) 
      */}
      <div
        className={`slip-curtain ${
          wipeState === 'in-forward'
            ? 'wipe-in-forward'
            : wipeState === 'out-forward'
            ? 'wipe-out-forward'
            : wipeState === 'in-backward'
            ? 'wipe-in-backward'
            : wipeState === 'out-backward'
            ? 'wipe-out-backward'
            : ''
        }`}
      />

      {/* Radiant Sunbeam Glows */}
      <div className="sunrise-glow w-[550px] h-[550px] -top-28 -left-28 opacity-60" />
      <div className="sunrise-glow w-[600px] h-[600px] top-1/2 -right-32 opacity-45" />

      {/* TOP HEADER: Calligraphy Logo & Minimal Menu Button */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => goToSlide(0, 'backward')}
          className="pointer-events-auto flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center">
            <Sun className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-cursive text-2xl sm:text-3xl font-bold text-[#8a5d28] tracking-wide">
            Pranav Mahajan
          </span>
        </button>

        <div className="pointer-events-auto flex items-center gap-3">
          {/* Slide Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-amber-200 shadow-xs text-xs font-mono font-bold text-amber-900">
            <span className="text-amber-600">0{currentSlide + 1}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">0{totalSlides}</span>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl bg-white/90 border border-amber-200/80 hover:bg-amber-50 text-slate-800 transition-all cursor-pointer shadow-xs"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-6 h-6 text-amber-700" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>
        </div>
      </header>

      {/* MAIN SLIDE STAGE */}
      <div className="relative w-full h-full flex items-center justify-center px-6 sm:px-12 lg:px-20 pt-20 pb-16 z-20">
        {/* SLIDE 0: EXACT GAUR GOPAL DAS SCREENSHOT REPLICA */}
        {currentSlide === 0 && (
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center animate-in fade-in duration-300">
            {/* Left Column: Portrait Energy Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[36px] bg-gradient-to-tr from-[#f5ede0] via-[#fffbf5] to-[#fdedd5] border-2 border-amber-200/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-900/[0.06] text-center overflow-hidden">
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

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => goToSlide(3, 'forward')}
                  className="ochre-pill-button text-base font-bold shadow-md hover:shadow-lg"
                >
                  Get In Touch
                </button>

                <button
                  onClick={nextSlide}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors cursor-pointer"
                >
                  <span>Explore My Books (Scroll Down)</span>
                  <ArrowDown className="w-4 h-4 animate-bounce text-amber-700" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1: BOOKS BY PRANAV MAHAJAN */}
        {currentSlide === 1 && (
          <div className="max-w-6xl mx-auto w-full text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              Literary Works &amp; Publications
            </div>

            <h2 className="font-cursive text-5xl sm:text-7xl font-bold text-[#8a5d28] tracking-wide mb-2">
              Books by Pranav Mahajan
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 font-normal">
              Distilling deep contemplative stillness into practical modern roadmaps for achievers and seekers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              {[
                {
                  title: 'The Unstoppable Mind',
                  tagline: 'Mastering Inner Resilience in Chaos',
                  badge: 'National Bestseller',
                  desc: 'A practical, soul-stirring guide to conquering cognitive fatigue, silencing inner critics, and forging unshakeable mental clarity.',
                  readers: '12,400+ Global Readers',
                },
                {
                  title: 'The Sacred Pause',
                  tagline: 'Modern Zen for Peak Achievers',
                  badge: 'Transformational Guide',
                  desc: '5,000 years of contemplative Vedic insights adapted for modern high-speed life to eliminate executive burnout and cultivate stillness.',
                  readers: '8,900+ Global Readers',
                },
                {
                  title: 'Conscious Leadership',
                  tagline: 'Influence Beyond Authority & Ego',
                  badge: 'Executive Essential',
                  desc: 'How visionaries inspire fierce loyalty, psychological safety, and breakthrough innovation through authentic vulnerability.',
                  readers: '6,200+ Leaders Guided',
                },
              ].map((book, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200/80 p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all"
                >
                  <div>
                    <div className="h-32 w-full rounded-2xl bg-gradient-to-tr from-[#fbf8f0] to-[#f4ebe0] border border-amber-200/60 p-4 flex flex-col justify-between mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                          {book.badge}
                        </span>
                        <BookOpen className="w-4 h-4 text-amber-700" />
                      </div>
                      <div className="font-cursive text-2xl font-bold text-[#8a5d28] leading-tight">
                        {book.title}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                      {book.tagline}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {book.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">{book.readers}</span>
                    <button
                      onClick={() => goToSlide(3, 'forward')}
                      className="ochre-pill-button py-2 px-4 text-xs font-bold"
                    >
                      Get Your Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prevSlide}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
              >
                &larr; Back to Welcome
              </button>
              <button
                onClick={nextSlide}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-wider cursor-pointer"
              >
                Upcoming Events &amp; Tour &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 2: UPCOMING EVENTS & GLOBAL SUMMITS */}
        {currentSlide === 2 && (
          <div className="max-w-5xl mx-auto w-full text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              Live Keynotes &amp; Retreats
            </div>

            <h2 className="font-cursive text-5xl sm:text-7xl font-bold text-[#8a5d28] tracking-wide mb-2">
              Upcoming Events
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 font-normal">
              Experience the transformational frequency live on stages and sacred retreats worldwide.
            </p>

            <div className="space-y-4 max-w-4xl mx-auto mb-8 text-left">
              {[
                {
                  title: 'Global Leadership & Mindset Summit 2026',
                  location: 'Dubai Opera, United Arab Emirates',
                  date: 'November 14, 2026',
                  badge: 'Flagship Keynote',
                  audience: '2,000 Global Leaders',
                  status: 'Registration Open',
                },
                {
                  title: 'Awaken Retreat: 3 Days in Stillness',
                  location: 'Rishikesh, Himalayas, India',
                  date: 'December 05 - 08, 2026',
                  badge: 'Spiritual Immersion',
                  audience: 'Intimate Cohort of 40 Seekers',
                  status: 'Limited Seats Left',
                },
                {
                  title: 'World Human Potential & Innovation Expo',
                  location: 'Singapore EXPO, Singapore',
                  date: 'January 22, 2027',
                  badge: 'Keynote & Masterclass',
                  audience: '5,000+ Attendees',
                  status: 'Just Announced',
                },
              ].map((ev, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {ev.badge}
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {ev.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-cursive font-bold text-[#8a5d28]">
                      {ev.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-700" />
                        {ev.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        {ev.date}
                      </span>
                      <span>&bull; {ev.audience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => goToSlide(3, 'forward')}
                    className="ochre-pill-button py-2 px-4 text-xs font-bold self-start sm:self-center"
                  >
                    Inquire / Reserve
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prevSlide}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
              >
                &larr; Back to Books
              </button>
              <button
                onClick={nextSlide}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-wider cursor-pointer"
              >
                Get In Touch &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 3: GET IN TOUCH & SPEAKING BOOKING */}
        {currentSlide === 3 && (
          <div className="max-w-4xl mx-auto w-full text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
              <Mail className="w-3.5 h-3.5 text-amber-700" />
              Soul-To-Soul Connection
            </div>

            <h2 className="font-cursive text-5xl sm:text-7xl font-bold text-[#8a5d28] tracking-wide mb-2">
              Get In Touch
            </h2>

            <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6 font-normal">
              Whether you seek a keynote for your next global conference or wish to connect, I warmly welcome your message.
            </p>

            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200/80 shadow-2xl text-left max-w-xl mx-auto mb-6">
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
                      placeholder="Organization / Event Name"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-amber-200 text-sm text-slate-900 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      placeholder="Your Message or Speaking Inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-amber-200 text-sm text-slate-900 outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="ochre-pill-button w-full py-3.5 text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Your Message
                  </button>
                </form>
              )}
            </div>

            <button
              onClick={() => goToSlide(0, 'backward')}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-widest cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Return To Beginning (Slide 01)
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLLER BAR: Prev / Next & Slide Indicator */}
      <div className="fixed bottom-6 left-6 sm:left-12 right-6 sm:right-12 z-40 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-amber-900">
            0{currentSlide + 1} / 0{totalSlides}
          </span>
          <div className="w-24 sm:w-36 h-[2.5px] bg-amber-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
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
              onClick={() => {
                goToSlide(0, 'backward');
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              01 &bull; The Welcome (Home)
            </button>
            <button
              onClick={() => {
                goToSlide(1, currentSlide < 1 ? 'forward' : 'backward');
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              02 &bull; Books by Pranav Mahajan
            </button>
            <button
              onClick={() => {
                goToSlide(2, currentSlide < 2 ? 'forward' : 'backward');
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              03 &bull; Upcoming Events &amp; Summits
            </button>
            <button
              onClick={() => {
                goToSlide(3, 'forward');
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-cursive font-bold text-slate-800 hover:text-amber-700 transition-colors"
            >
              04 &bull; Get In Touch &bull; Inquiries
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
