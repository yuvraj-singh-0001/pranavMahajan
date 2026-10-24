'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sun,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Heart,
  Quote,
} from 'lucide-react';
import MaskedPortalCanvas from './MaskedPortalCanvas';

interface SlideData {
  id: string;
  watermark: string;
  category: string;
  titleLines: string[];
  desc: string;
  buttonText: string;
  cutoutWord: string;
  modalType: 'philosophy' | 'keynote' | 'leadership' | 'books' | 'contact';
}

const slides: SlideData[] = [
  {
    id: 'slide-0',
    watermark: 'PRANAV MAHAJAN',
    category: 'SPIRITUAL WISDOM // 01',
    titleLines: ['Awaken Inner Power.', 'Master The Silence.'],
    desc: 'Guiding global executives, visionaries and seekers worldwide to dissolve subconscious limits, eliminate mental burnout, and lead with profound stillness.',
    buttonText: 'Explore Philosophy',
    cutoutWord: 'AWAKEN',
    modalType: 'philosophy',
  },
  {
    id: 'slide-1',
    watermark: 'MENTAL TOUGHNESS',
    category: 'KEYNOTE // 02',
    titleLines: ['The Unstoppable', 'Mind In Chaos.'],
    desc: 'Rewiring the subconscious cognitive narrative under high volatility. Transmuting acute corporate pressure into fearless high-performance momentum.',
    buttonText: 'Keynote Details',
    cutoutWord: 'RESILIENCE',
    modalType: 'keynote',
  },
  {
    id: 'slide-2',
    watermark: 'CONSCIOUS LEADERSHIP',
    category: 'EXECUTIVE RETREATS // 03',
    titleLines: ['Conscious Leadership', '& Soulful Legacy.'],
    desc: 'Transcending ordinary management to forge deep organizational empathy, psychological safety, and fearless innovation across distributed global teams.',
    buttonText: 'Retreat Outline',
    cutoutWord: 'LEADERSHIP',
    modalType: 'leadership',
  },
  {
    id: 'slide-3',
    watermark: 'BESTSELLER BOOKS',
    category: 'PUBLICATIONS // 04',
    titleLines: ['The Sacred Pause:', 'Modern Zen Mastery.'],
    desc: 'Over 15,000 global readers. 5,000 years of contemplative Vedic insight synthesized into actionable daily neuro-cognitive resets for modern high achievers.',
    buttonText: 'Discover Books',
    cutoutWord: 'WISDOM',
    modalType: 'books',
  },
  {
    id: 'slide-4',
    watermark: 'GLOBAL SUMMITS',
    category: 'INVITATION // 05',
    titleLines: ['Invite Pranav', 'To Your Stage.'],
    desc: 'Currently accepting flagship keynote bookings and corporate immersions for 2026-2027 global conferences across Dubai, Singapore, London, and India.',
    buttonText: 'Book Keynote',
    cutoutWord: 'CONNECT',
    modalType: 'contact',
  },
];

export default function LishbosSlider() {
  const [current, setCurrent] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [wipeDirection, setWipeDirection] = useState<'up' | 'down'>('up');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Form states inside modal
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const isThrottledRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Fast, responsive slip transition (~360ms duration)
  const goToSlide = useCallback(
    (targetIndex: number, direction: 'up' | 'down') => {
      if (isThrottledRef.current) return;
      if (targetIndex < 0 || targetIndex >= slides.length || targetIndex === current) return;

      isThrottledRef.current = true;
      setWipeDirection(direction);
      setIsWiping(true);

      // Fast slide flip
      setTimeout(() => {
        setCurrent(targetIndex);
      }, 160);

      setTimeout(() => {
        setIsWiping(false);
        isThrottledRef.current = false;
      }, 380);
    },
    [current]
  );

  const nextSlide = useCallback(() => {
    if (current < slides.length - 1) {
      goToSlide(current + 1, 'up');
    } else {
      goToSlide(0, 'up'); // Cycle smoothly
    }
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    if (current > 0) {
      goToSlide(current - 1, 'down');
    } else {
      goToSlide(slides.length - 1, 'down');
    }
  }, [current, goToSlide]);

  // Wheel listener: fast and sensitive to single gestures
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
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
        setActiveModal(null);
        setMenuOpen(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - touchEndY;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
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

  const activeSlide = slides[current];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fdfbf7] text-slate-800 select-none">
      {/* Radiant Sunbeam Glows */}
      <div className="sunbeam-ambient-gold w-[550px] h-[550px] -top-32 -left-32 opacity-75" />
      <div className="sunbeam-ambient-rose w-[600px] h-[600px] top-1/3 -right-36 opacity-55" />

      {/* Fast & Snappy Light Curtain Wipe (Sliding Golden Board) */}
      <div
        className={`light-curtain-wipe ${
          isWiping ? (wipeDirection === 'up' ? 'wipe-up' : 'wipe-down') : ''
        }`}
      />

      {/* TOP HEADER: Logo, Slide Tracker, and Menu Controller */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        {/* Left Brand Mark */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => goToSlide(0, 'down')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-300/60 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Sun className="w-5 h-5 text-amber-600 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight block">
                Pranav Mahajan
              </span>
              <span className="text-[10px] text-amber-800 font-bold tracking-widest uppercase block -mt-0.5">
                Keynote Speaker &bull; Life Guru
              </span>
            </div>
          </button>
        </div>

        {/* Right Menu Controls */}
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-xs text-xs font-mono font-bold text-amber-900">
            <span className="text-amber-600">0{current + 1}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">0{slides.length}</span>
          </div>

          <button
            onClick={() => setActiveModal('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Get In Touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/80 text-slate-800 hover:text-amber-700 shadow-sm flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
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

      {/* GIANT LIGHT BACKGROUND WATERMARK TEXT */}
      <div className="bg-watermark-text-light" aria-hidden="true">
        {activeSlide.watermark}
      </div>

      {/* MAIN SLIDE CONTENT CONTAINER */}
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-16 lg:px-24 pt-24 pb-16 z-20">
        {/* LEFT SECTION: Staggered animated typography & Guru action */}
        <div className="w-full md:w-1/2 flex flex-col justify-center max-w-xl z-20">
          <div className="mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/50 shadow-xs inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {activeSlide.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
            {activeSlide.titleLines.map((line, idx) => (
              <span key={idx} className="reveal-text-line block">
                <span style={{ transitionDelay: `${idx * 80}ms` }}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-lg font-normal">
            {activeSlide.desc}
          </p>

          <div>
            <button
              onClick={() => setActiveModal(activeSlide.modalType)}
              className="guru-pill-button"
            >
              <span>{activeSlide.buttonText}</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </div>

        {/* RIGHT SECTION: SVG Mask with Glowing Animated Plasma INSIDE the Cutout */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0 z-20">
          <MaskedPortalCanvas currentSlide={current} word={activeSlide.cutoutWord} />
        </div>
      </div>

      {/* BOTTOM NAVIGATION STRIP (Responsive & Fast) */}
      <div className="fixed bottom-6 left-6 sm:left-16 right-6 sm:right-16 z-40 flex items-center justify-between pointer-events-none">
        {/* Slide Counter & Progress */}
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="text-xs font-mono font-bold text-amber-900 tracking-wider">
            0{current + 1} <span className="text-slate-400">/ 0{slides.length}</span>
          </div>
          <div className="w-28 sm:w-44 h-[3px] bg-amber-200/50 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-300 rounded-full"
              style={{ width: `${((current + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation Arrows (Fast bidirectional slips) */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-amber-100 border border-amber-200/80 text-slate-700 hover:text-amber-800 flex items-center justify-center shadow-xs transition-all cursor-pointer"
            aria-label="Previous Slide (Scroll Up)"
            title="Previous Slide"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-amber-100 border border-amber-200/80 text-slate-700 hover:text-amber-800 flex items-center justify-center shadow-xs transition-all cursor-pointer"
            aria-label="Next Slide (Scroll Down)"
            title="Next Slide"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* FULLSCREEN NAVIGATION MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#fdfbf7]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-16 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-amber-600" />
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">
                Pranav Mahajan
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-2xl bg-white border border-amber-200 text-slate-800 hover:text-amber-700 shadow-sm cursor-pointer"
            >
              <X className="w-6 h-6 text-amber-700" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto w-full my-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 block mb-3">
              Directory // Select Experience
            </span>
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  goToSlide(idx, idx > current ? 'up' : 'down');
                  setMenuOpen(false);
                }}
                className={`w-full text-left py-4 px-6 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                  current === idx
                    ? 'bg-amber-100/80 border-amber-400 text-slate-900 shadow-sm'
                    : 'bg-white/70 border-amber-200/60 text-slate-700 hover:bg-white hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-amber-700">0{idx + 1}</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    {slide.titleLines.join(' ')}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-amber-200 flex items-center justify-between text-xs text-slate-500">
            <span>&copy; 2026 Pranav Mahajan Platform</span>
            <span>Fast Slip: Scroll Up or Down on Mousewheel &bull; Arrows</span>
          </div>
        </div>
      )}

      {/* INTERACTIVE DETAIL MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white border border-amber-200 max-w-2xl w-full rounded-3xl p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Philosophy Modal */}
            {activeModal === 'philosophy' && (
              <div>
                <span className="text-xs font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                  The Core Philosophy
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                  Awakening Inner Stillness &amp; Purpose
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-serif italic">
                  &ldquo;External turbulence in any enterprise is only a mirror of internal mental noise. When you conquer the chaos within your own mind, the world makes way for your highest potential.&rdquo;
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60">
                    <div className="text-2xl font-black text-amber-700">500K+</div>
                    <div className="text-xs text-slate-600 mt-1">Seekers &amp; Leaders Impacted</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60">
                    <div className="text-2xl font-black text-amber-700">24+</div>
                    <div className="text-xs text-slate-600 mt-1">Countries Toured</div>
                  </div>
                </div>
              </div>
            )}

            {/* Keynote Modal */}
            {activeModal === 'keynote' && (
              <div>
                <span className="text-xs font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                  Signature Keynote Address
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                  The Unstoppable Mind In Chaos
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  A high-voltage 60-90 minute keynote session addressing acute corporate burnout, emotional exhaustion, and the fear of failure.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/50 text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Subconscious cognitive reframing under extreme uncertainty</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/50 text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Transmuting acute pressure into relentless creative fuel</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/50 text-xs text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>The 3 daily mental rituals of ultra-high performers</span>
                  </div>
                </div>
              </div>
            )}

            {/* Leadership Modal */}
            {activeModal === 'leadership' && (
              <div>
                <span className="text-xs font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                  Executive Immersion
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                  Conscious Leadership &amp; Soulful Legacy
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Designed for CEOs, founders, and senior executive cohorts. Moving past ordinary transactional management to foster profound empathy, psychological safety, and fearless agility across global teams.
                </p>
              </div>
            )}

            {/* Books Modal */}
            {activeModal === 'books' && (
              <div>
                <span className="text-xs font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                  Literary Wisdom
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                  Books by Pranav Mahajan
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                    <div className="font-bold text-amber-800 font-serif">1. The Unstoppable Mind</div>
                    <div className="text-xs text-slate-600 mt-1">National Bestseller &bull; 12,400+ Global Readers</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                    <div className="font-bold text-amber-800 font-serif">2. The Sacred Pause</div>
                    <div className="text-xs text-slate-600 mt-1">Modern Zen for Peak Achievers &bull; 8,900+ Copies Sold</div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact / Booking Modal */}
            {activeModal === 'contact' && (
              <div>
                <span className="text-xs font-mono text-amber-700 uppercase tracking-widest block mb-2 font-bold">
                  Speaking Invitations
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                  Invite Pranav To Speak
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Complete the details below to receive keynote availability and scheduling for your event.
                </p>

                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
                    <div className="font-bold text-base">Keynote Request Received!</div>
                    <div className="text-xs mt-1">Our executive office will respond within 24 hours.</div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSent(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-amber-200/80 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-amber-200/80 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Organization / Event Name"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-amber-200/80 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your event & audience..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-amber-200/80 focus:border-amber-600 focus:bg-white text-sm text-slate-900 outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-all cursor-pointer shadow-md"
                    >
                      Send Speaking Request
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
