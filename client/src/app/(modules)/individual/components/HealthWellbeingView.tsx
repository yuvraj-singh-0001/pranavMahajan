'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Activity,
  Flame,
  Wind,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  BookOpen,
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  ChevronRight,
  Check,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Inclusive Health Disciplines Across Generations
const VITALITY_MODES = [
  {
    id: 'running',
    ageRange: 'Youth • Age ~10–18',
    label: 'Youth Running & Cardio',
    tag: 'VO2 & MITOCHONDRIAL FLUSH',
    icon: Activity,
    image: '/images/health_exercise.jpg',
    oneLiner: 'Daily outdoor running builds dense mitochondria and aerobic reserve.',
    keyMetric: '+42% Aerobic Reserve',
  },
  {
    id: 'strength',
    ageRange: 'Men • Age ~25–45',
    label: 'Men’s Strength & Calisthenics',
    tag: 'POSTURE & BONE INTEGRITY',
    icon: Flame,
    image: '/images/health_pushups.jpg',
    oneLiner: 'Strict bodyweight push-ups fortify spinal alignment and core bone density.',
    keyMetric: 'Musculoskeletal Armor',
  },
  {
    id: 'yoga',
    ageRange: 'Women • Age ~20–55',
    label: 'Women’s Yoga & Mobility',
    tag: 'SPINE & FASCIAL UNWINDING',
    icon: Wind,
    image: '/images/health_yoga.jpg',
    oneLiner: 'Fluid somatic asanas discharge stress and restore hip & spinal mobility.',
    keyMetric: 'Zero Joint Compression',
  },
  {
    id: 'reading-meditation',
    ageRange: 'Elders & Mind • 50–75+',
    label: 'Mindful Reading & Meditation',
    tag: 'COGNITIVE LONGEVITY',
    icon: BookOpen,
    image: '/images/health_meditation.jpg',
    oneLiner: 'Quiet book reading and breath awareness downregulate inflammation and sharpen mind.',
    keyMetric: 'Vagal Equilibrium',
  },
];

// 4 Biological Rhythms (Minimal text micro-habits)
const BIOLOGICAL_RHYTHMS = [
  {
    id: 'morning',
    time: '06:00 – 08:30',
    title: 'Morning Light Anchor',
    icon: Sun,
    accent: '#059669',
    habit: '10 mins sunlight exposure before screens to set circadian cortisol.',
  },
  {
    id: 'fuel',
    time: '12:00 – 14:00',
    title: 'Protein-First Metabolic Fuel',
    icon: Zap,
    accent: '#0D9488',
    habit: 'Clean protein and hydration to prevent afternoon energy crashes.',
  },
  {
    id: 'somatic',
    time: '17:00 – 18:30',
    title: 'Somatic Vagus Downshift',
    icon: Wind,
    accent: '#0284C7',
    habit: '3 physiological sighs to release workday cognitive tension.',
  },
  {
    id: 'sleep',
    time: '21:30 – 06:00',
    title: 'Cellular Delta Sleep',
    icon: Moon,
    accent: '#0F766E',
    habit: 'Digital sunset 45 mins before bed for deep cellular brain recovery.',
  },
];

// 4 Real-Life Somatic Traps & Grounded Fixes (Zero Fluff)
const SOMATIC_TRAPS = [
  {
    id: 'desk-fatigue',
    title: 'Sedentary Desk Fatigue',
    trap: 'Prolonged sitting causing hip stiffness and low afternoon alertness.',
    fix: '60-Sec Micro-Break: 10 bodyweight air squats or brisk hallway walking.',
    accent: '#059669',
  },
  {
    id: 'chronic-neck',
    title: 'Chronic Neck & Jaw Clenching',
    trap: 'Unconscious stress tension in shoulders and jaw during focused work.',
    fix: 'Palate Release: Drop shoulders 2 inches, part teeth, nasal breathing.',
    accent: '#0D9488',
  },
  {
    id: 'insomnia',
    title: '2 AM Overactive Mind',
    trap: 'Lying awake replaying tomorrow’s schedule under elevated cortisol.',
    fix: 'Box Breathing 4-4-4-4: 4 slow rounds resets autonomic nervous tone.',
    accent: '#0284C7',
  },
  {
    id: 'sugar-crash',
    title: '3 PM Energy Crash',
    trap: 'Reaching for sugar or 3rd caffeine cup, triggering a deeper crash.',
    fix: 'Mineral Reset: 500ml cold water with a pinch of sea salt for instant hydration.',
    accent: '#0F766E',
  },
];

// All 10 Individual Growth Pathways / Dimensions
const OTHER_PATHWAYS = [
  { number: '02', title: 'Personal Growth & Habits', href: '/individual/personal-development', tag: 'Kinetic Momentum' },
  { number: '03', title: 'Love & Family Dynamics', href: '/individual/love-relationships', tag: 'Intimacy & Trust' },
  { number: '04', title: 'Parenting & Child Dev', href: '/individual/parenting-child', tag: 'Conscious Parenting' },
  { number: '05', title: 'Social Relationships & Poise', href: '/individual/social-relationships', tag: 'Presence & Status' },
  { number: '06', title: 'Student Life & Youth', href: '/individual/student-life', tag: 'Deep Focus & Exams' },
  { number: '07', title: 'Professional Excellence', href: '/individual/professional-development', tag: 'Executive Mastery' },
  { number: '08', title: 'Spirituality & Philosophy', href: '/individual/spirituality-philosophy', tag: 'Inner Stillness' },
  { number: '09', title: 'Life Transitions & Aging', href: '/individual/life-transitions', tag: 'Graceful Adaptation' },
  { number: '10', title: 'Digital & Tech Literacy', href: '/individual/technology-literacy', tag: 'Attention Sovereignty' },
];

export default function HealthWellbeingView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(VITALITY_MODES[0]);
  const [activeRhythm, setActiveRhythm] = useState(BIOLOGICAL_RHYTHMS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Audio Guide Simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setTimeout(() => {
        setIsPlayingAudio(false);
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio]);

  // Scroll to Top Listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F3F9F5] text-[#122A21] antialiased selection:bg-emerald-200 overflow-x-hidden">
      <RoleCursor role="individual" isActive />

      {/* Official Consistent Header */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-emerald-900/10 bg-white/70 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" aria-label="Pranav Mahajan home" className="inline-flex items-center group">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)] transition-transform duration-300 group-hover:scale-105 sm:h-16 md:h-20"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signup?role=individual&topic=Health%20and%20Wellbeing"
            className="inline-flex items-center justify-center rounded-full border border-emerald-500/50 bg-[#09231A]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-emerald-200 shadow-[0_4px_16px_rgba(13,148,136,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-[#13382B] hover:text-white sm:px-5 sm:py-2"
          >
            Sign Up
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-emerald-500/30 bg-[#071F17]/90 text-white shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-[#103025] hover:border-emerald-400 active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-emerald-300" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-emerald-100" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#10B981]" />
                <span className="h-0.5 w-4 rounded-full bg-emerald-100" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-[#061811]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-emerald-900/15 bg-[#F2F8F4] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-emerald-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0D9488]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#162E25]">Health &amp; Vitality</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/15 bg-[#FFF] text-[#244237] transition hover:bg-[#E2EDE7]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Main navigation" className="mt-6 flex flex-col gap-2">
          {[
            { href: '/individual#top', label: 'Explore Life & Growth' },
            { href: '/individual#pathways', label: 'Personal Growth Pathways' },
            { href: '/individual#problem', label: 'Common Life Challenges' },
            { href: '/individual/health-wellbeing', label: '01 Health and Wellbeing' },
            { href: '/individual/personal-development', label: '02 Personal Development' },
            { href: '/individual/love-relationships', label: '03 Love & Family Dynamics' },
            { href: '/individual/parenting-child', label: '04 Parenting & Child Development' },
            { href: '/individual/social-relationships', label: '05 Social Relationships & Reputation' },
            { href: '/individual/student-life', label: '06 Student Life & Youth' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#204035] transition hover:bg-[#DCEAE2] hover:text-[#065F46]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* =========================================================================
          SECTION 1: HERO SECTION WITH 16:9 PANORAMIC WALLPAPER
         ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 2xl:px-18">
        {/* Full-Bleed 16:9 Continuous Panoramic Background with Balanced Soft Mist Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/health-wellbeing-hero.jpg?v=8"
            alt="Health & Wellbeing Sanctuary Panorama"
            className="w-full h-full object-cover object-center filter saturate-[1.06] brightness-[1.01]"
          />
          {/* Subtle Balanced Vignettes (Soft left text backing, crystal clear characters) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F3F9F5] via-[#F3F9F5]/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F3F9F5]/85 via-[#F3F9F5]/15 to-[#F3F9F5]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F3F9F5]/50 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center my-auto">
          {/* LEFT: Clean Minimal Headline & Controls (Right side completely open for panoramic wallpaper) */}
          <div className="max-w-xl flex flex-col items-start select-text">
            {/* Dimension Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/85 px-3.5 py-1 backdrop-blur-md shadow-xs mb-3">
              <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#065F46]">
                Dimension 01 &bull; VitalLife
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0A261D] leading-[1.12] font-serif">
              Health &amp; <br />
              Wellbeing<span className="text-[#0D9488]">.</span>
            </h1>

            {/* Modern Minimal Tagline in Frosted Glass Pill */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-white/85 px-4 py-2 backdrop-blur-md shadow-xs">
              <span className="text-[#0D9488] text-sm">✦</span>
              <p className="text-xs sm:text-sm font-medium text-[#1A3C31] leading-relaxed">
                Physical vitality, nervous system calm, and sustainable lifelong energy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Pause reflection' : 'Listen to 1-minute intro'}
                className={`group flex items-center gap-2 rounded-full border border-emerald-800/20 bg-white/90 px-4 py-2 text-xs font-bold text-[#0F2D24] shadow-xs backdrop-blur-md transition hover:scale-105 hover:bg-white ${
                  isPlayingAudio ? 'ring-2 ring-emerald-400 bg-emerald-50' : ''
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0D9488] text-white">
                  {isPlayingAudio ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5 ml-0.5 fill-current" />}
                </div>
                <span>{isPlayingAudio ? 'Playing...' : 'Listen Intro'}</span>
              </button>

              <Link
                href="/signup?role=individual&topic=Health%20and%20Wellbeing"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#047857] to-[#0D9488] px-5 py-2 text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* 4 Quick Anchor Buttons */}
            <div className="mt-6 w-full max-w-lg">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#065F46] block mb-2">
                4 Lifespan Anchors
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {VITALITY_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = activeMode.id === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveMode(mode)}
                      className={`flex items-center gap-2 rounded-xl p-2 text-left transition border ${
                        isSelected
                          ? 'bg-[#0D6E50] text-white shadow-sm border-transparent scale-[1.02]'
                          : 'bg-white/75 text-[#142D23] hover:bg-white border-white/80 shadow-2xs'
                      }`}
                    >
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${isSelected ? 'bg-white/20' : 'bg-emerald-100 text-[#0D9488]'}`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold truncate leading-tight">{mode.label.split('&')[0].trim()}</p>
                        <p className={`text-[8px] font-mono truncate ${isSelected ? 'text-emerald-100' : 'text-[#4F7367]'}`}>
                          {mode.ageRange.split('•')[0].trim()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 1-Line Minimal Tip Box */}
              <div className="mt-2.5 rounded-xl border border-emerald-900/10 bg-white/80 p-2.5 backdrop-blur-xs flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <p className="text-[11.5px] text-[#142D23] font-medium truncate">
                    <strong className="text-[#0D6E50]">{activeMode.label}:</strong> {activeMode.oneLiner}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-[#0D9488] bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 font-bold">
                  {activeMode.keyMetric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 4 FOUNDATIONS OF LIFESPAN VITALITY (Visual Cards, Minimal Text)
         ========================================================================= */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12 sm:py-16 select-text">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488] block mb-1">
            4 Generations &bull; 1 Lifestyle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A261D] font-serif">
            Foundations of Lifespan Vitality
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#4E7063]">
            Minimal, non-negotiable daily anchors for lasting cellular energy:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VITALITY_MODES.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className="group rounded-3xl border border-emerald-900/10 bg-white/80 p-4 sm:p-5 backdrop-blur-md shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3 bg-slate-900">
                    <img
                      src={mode.image}
                      alt={mode.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-[9px] font-mono font-bold text-white backdrop-blur-xs">
                      {mode.ageRange}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-[#0D9488] shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F2D24] leading-tight truncate">
                      {mode.label}
                    </h3>
                  </div>

                  <p className="text-xs text-[#426558] leading-relaxed mb-3">
                    {mode.oneLiner}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-emerald-900/10 flex items-center justify-between text-[11px] font-mono font-bold text-[#0D6E50]">
                  <span>{mode.keyMetric}</span>
                  <Check className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 4 BIOLOGICAL RHYTHMS (Interactive Micro-Habit Constellation)
         ========================================================================= */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-14 select-text">
        <div className="rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-white/90 via-white/80 to-emerald-50/50 p-6 sm:p-10 backdrop-blur-md shadow-sm">
          <div className="max-w-2xl mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488] block mb-1">
              Circadian Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A261D] font-serif">
              4 Daily Biological Rhythms
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#4E7063]">
              Click any rhythm to view the exact micro-action:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {BIOLOGICAL_RHYTHMS.map((rhythm) => {
              const Icon = rhythm.icon;
              const isSelected = activeRhythm.id === rhythm.id;
              return (
                <button
                  key={rhythm.id}
                  type="button"
                  onClick={() => setActiveRhythm(rhythm)}
                  className={`rounded-2xl p-4 text-left transition border ${
                    isSelected
                      ? 'bg-[#0D6E50] text-white shadow-md border-transparent scale-[1.02]'
                      : 'bg-white/80 text-[#122A21] hover:bg-white border-emerald-900/10 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isSelected ? 'bg-white/20' : 'bg-emerald-100 text-[#0D9488]'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-emerald-100' : 'text-[#587D70]'}`}>
                      {rhythm.time}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold mb-1 leading-tight">{rhythm.title}</h3>
                  <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-emerald-50' : 'text-[#4A6E61]'}`}>
                    {rhythm.habit}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COMMON SOMATIC TRAPS & GROUNDED FIXES (Minimal Text)
         ========================================================================= */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-14 select-text">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488] block mb-1">
            Root Cause Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A261D] font-serif">
            Common Traps &amp; Grounded Fixes
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#4E7063]">
            Pehle daily trap pehchanein, fir instant grounded fix:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOMATIC_TRAPS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-emerald-900/10 bg-white/85 p-4 sm:p-5 shadow-2xs hover:shadow-sm transition"
            >
              <h3 className="text-sm font-bold text-[#0F2D24] mb-2 flex items-center justify-between">
                <span>{t.title}</span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.accent }} />
              </h3>

              <div className="rounded-xl bg-rose-50/70 border border-rose-100 p-2.5 mb-2 text-xs text-[#4C1D24] font-medium leading-relaxed">
                <span className="font-mono text-[9.5px] font-bold text-rose-700 block uppercase mb-0.5">
                  ❌ Daily Trap:
                </span>
                {t.trap}
              </div>

              <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 p-2.5 text-xs text-[#0F3528] font-medium leading-relaxed">
                <span className="font-mono text-[9.5px] font-bold text-[#0D6E50] block uppercase mb-0.5">
                  ✅ Grounded Fix:
                </span>
                {t.fix}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: GROWTH PATHWAYS (All Other 9 Dimensions Grid at Bottom of Page)
         ========================================================================= */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12 sm:py-16 select-text">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0D9488] block mb-1">
              Explore All 10 Dimensions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A261D] font-serif">
              Growth Pathways
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#4E7063]">
              Master every dimension of life with dedicated frameworks:
            </p>
          </div>
          <Link
            href="/individual#top"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D6E50] hover:underline shrink-0"
          >
            <span>All 10 &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {OTHER_PATHWAYS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex items-center justify-between rounded-2xl p-4 bg-white/80 hover:bg-white border border-emerald-900/10 hover:border-emerald-500/40 transition-all shadow-2xs hover:shadow-sm hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 font-mono text-xs font-bold text-[#0D9488] shrink-0 group-hover:bg-[#0D6E50] group-hover:text-white transition-colors">
                  {p.number}
                </span>
                <div className="overflow-hidden">
                  <p className="text-xs sm:text-sm font-bold text-[#0F2D24] truncate group-hover:text-[#0D6E50] transition-colors">
                    {p.title}
                  </p>
                  <p className="text-[10px] font-mono text-[#587D70] uppercase tracking-wider truncate">
                    {p.tag}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0D6E50] group-hover:translate-x-1 transition shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: EDITORIAL QUOTE & 10 DIMENSIONS HUB NAVIGATION
         ========================================================================= */}
      <section className="relative px-4 sm:px-8 lg:px-14 py-12 sm:py-16 text-center select-text max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-20 bg-emerald-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#0D9488]" />
          <span className="h-px w-20 bg-emerald-900/20" />
        </div>

        <blockquote className="text-xl sm:text-2xl font-serif italic text-[#0F2D24] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Your body is the instrument through which your life expresses itself. Care for it with reverence.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0D9488]">
          — Pranav Mahajan &bull; Dimension 01
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/individual/technology-literacy"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/90 px-5 py-2.5 text-xs font-bold text-[#1F4135] shadow-2xs hover:bg-white hover:border-emerald-400 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Prev: Digital Literacy</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2 rounded-full bg-[#0D6E50] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0A5840] transition"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/personal-development"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/90 px-5 py-2.5 text-xs font-bold text-[#1F4135] shadow-2xs hover:bg-white hover:border-emerald-400 transition"
          >
            <span>Next: Personal Growth</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#0D6E50] text-white shadow-xl hover:bg-[#0A5840] hover:scale-110 active:scale-95 transition-all border border-white/20"
        >
          <ArrowLeft className="h-4 w-4 rotate-90" />
        </button>
      )}

      {/* =========================================================================
          SECTION 7: OFFICIAL FULL SITE FOOTER
         ========================================================================= */}
      <Footer />
    </div>
  );
}
