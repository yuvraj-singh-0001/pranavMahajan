'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Activity,
  Moon,
  Sun,
  ShieldCheck,
  Zap,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  Clock,
  ChevronRight,
  Droplets,
  Wind,
} from 'lucide-react';
import RoleCursor from '@/components/RoleCursor';

// 4 Quick Vitality Focus Modes
const VITALITY_MODES = [
  {
    id: 'circadian',
    label: 'Morning Light',
    tag: '06:00 – 09:00',
    icon: Sun,
    tip: '15-min natural sunlight anchor sets cortisol and melatonin for deep night sleep.',
  },
  {
    id: 'fuel',
    label: 'Metabolic Fuel',
    tag: '10:00 – 14:00',
    icon: Zap,
    tip: 'Anchor meals with clean protein and electrolytes to eliminate 3 PM brain fog.',
  },
  {
    id: 'vagal',
    label: 'Vagal Reset',
    tag: '15:00 – 18:00',
    icon: Wind,
    tip: 'Two deep nasal inhales + prolonged mouth sigh discharges work stress instantly.',
  },
  {
    id: 'sleep',
    label: 'Delta Sleep',
    tag: '20:00 – 06:00',
    icon: Moon,
    tip: 'Digital sunset 60 mins before bed triggers glymphatic brain cellular detoxification.',
  },
];

export default function HealthWellbeingView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(VITALITY_MODES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Live Breathing Engine
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [breathCycleCount, setBreathCycleCount] = useState(0);

  // Simulated Audio Guide
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setTimeout(() => {
        setIsPlayingAudio(false);
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio]);

  // Live Breathwork Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) return prev - 1;

          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 4;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 6;
          } else {
            setBreathPhase('Inhale');
            setBreathCycleCount((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    } else {
      setBreathPhase('Inhale');
      setBreathTimer(4);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathPhase]);

  return (
    <div className="relative h-dvh w-full overflow-y-auto bg-[#F3F9F5] text-[#122A21] antialiased selection:bg-emerald-200 flex flex-col justify-between">
      <RoleCursor role="individual" isActive />

      {/* Panoramic Alpine Lake Landscape Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/health-wellbeing-hero.jpg"
          alt="Holistic Health and Sunrise Alpine Lake"
          className="w-full h-full object-cover object-center filter saturate-[1.10] brightness-[1.02]"
        />
        {/* Soft Organic Vignettes for Perfect Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3F9F5] via-[#F3F9F5]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3F9F5]/92 via-[#F3F9F5]/35 to-[#F3F9F5]/85" />
      </div>

      {/* Official Consistent Header (Clean, Stable, No color shift on scroll) */}
      <header className="relative z-50 flex items-center justify-between border-b border-emerald-900/10 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none shrink-0">
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
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#1D3B30] transition hover:border-emerald-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#0D9488] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#E2EDE7] p-5">
          <p className="text-sm leading-6 text-[#244237]">
            Ready to upgrade your nervous system resilience and sustained stamina?
          </p>
          <Link
            href="/signup?role=individual&topic=Health%20and%20Wellbeing"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0D6E50] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#08533C]"
          >
            Start Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* MAIN SINGLE-SCREEN CONTENT (Centered, Focused, No long scrolling) */}
      <main className="relative z-10 flex-1 flex items-center px-4 sm:px-8 lg:px-12 2xl:px-16 py-4 my-auto">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Luxury Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Animated Floating Dimension Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/85 px-4 py-1.5 backdrop-blur-md shadow-xs mb-3 transition hover:scale-105 hover:bg-white">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46]">
                Dimension 01 &bull; VitalLife
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[#0A261D] leading-[1.12] font-serif">
              Health &amp; <br />
              Wellbeing<span className="text-[#0D9488]">.</span>
            </h1>

            {/* Minimal Frosted Glass Tagline */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-white/80 px-4 py-2 backdrop-blur-md shadow-xs">
              <span className="text-[#0D9488] text-sm">✦</span>
              <p className="text-xs sm:text-sm font-medium text-[#1A3C31] leading-relaxed">
                Cultivate physical vitality, emotional calm, and sustainable daily balance.
              </p>
            </div>

            {/* Interactive Audio & CTA Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              {/* Audio Reflection Button */}
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Pause somatic reflection' : 'Listen to 1-minute somatic reflection'}
                className={`group flex items-center gap-2.5 rounded-full border border-emerald-800/20 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-emerald-400 ${
                  isPlayingAudio ? 'ring-2 ring-emerald-400 bg-emerald-50' : ''
                }`}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#0D9488] to-[#10B981] text-white shadow-xs">
                  {isPlayingAudio ? (
                    <Pause className="h-3 w-3 animate-pulse" />
                  ) : (
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  )}
                </div>
                <span className="text-xs font-bold text-[#0F2D24]">
                  {isPlayingAudio ? 'Playing Reflection...' : 'Listen Intro'}
                </span>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className={`h-2.5 w-0.5 rounded-full bg-[#0D9488] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                  <span className={`h-3.5 w-0.5 rounded-full bg-[#0D9488] ${isPlayingAudio ? 'animate-bounce' : 'opacity-40'}`} />
                  <span className={`h-2 w-0.5 rounded-full bg-[#0D9488] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                </div>
              </button>

              {/* Primary CTA Button */}
              <Link
                href="/signup?role=individual&topic=Health%20and%20Wellbeing"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#047857] via-[#0D9488] to-[#065F46] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_25px_rgba(4,120,87,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(4,120,87,0.4)] hover:from-[#068A64] hover:to-[#0A7356] active:scale-95"
              >
                <span>Start Your Journey</span>
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </Link>
            </div>

            {/* Active Audio Card Preview */}
            {isPlayingAudio && (
              <div className="mt-3.5 flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-white/95 p-3 shadow-md backdrop-blur-md max-w-md animate-in fade-in slide-in-from-top-2">
                <Volume2 className="h-4 w-4 text-[#0D9488] animate-pulse" />
                <div className="text-xs">
                  <p className="font-bold text-[#0F2D24]">Somatic Reflection &bull; Pranav Mahajan</p>
                  <p className="text-[#325A4D] italic text-[11px]">&ldquo;Your body is the instrument through which your life expresses itself. Care for it with reverence.&rdquo;</p>
                </div>
              </div>
            )}

            {/* Interactive Daily Rhythm Pills (Replaces long cards with compact, instant feedback) */}
            <div className="mt-6 w-full max-w-xl">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#065F46] block mb-2">
                Daily Vitality Anchors
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
                      className={`flex items-center gap-2 rounded-2xl p-2.5 text-left transition-all duration-200 border ${
                        isSelected
                          ? 'bg-[#0D6E50] text-white shadow-md border-transparent scale-[1.02]'
                          : 'bg-white/75 text-[#142D23] hover:bg-white border-white/90 shadow-xs'
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100/80 text-[#0D9488]'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-bold truncate leading-tight">{mode.label}</p>
                        <p className={`text-[9px] font-mono ${isSelected ? 'text-emerald-100' : 'text-[#4F7367]'}`}>
                          {mode.tag.split('–')[0].trim()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Instant Tip Box */}
              <div className="mt-2.5 rounded-2xl border border-emerald-900/10 bg-white/80 p-3 backdrop-blur-md shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <p className="text-xs text-[#142D23] font-medium leading-snug">
                    <strong className="text-[#0D6E50]">{activeMode.label}:</strong> {activeMode.tip}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#0D9488] bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 font-bold border border-emerald-900/5">
                  {activeMode.tag}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Live Somatic Breather Pod (Single Beautiful Focal Point) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] rounded-3xl border border-white/90 bg-white/70 p-6 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(13,148,136,0.12)] flex flex-col justify-between">
              
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-[#0D9488]">
                    <Wind className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                      Somatic Regulator
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0A261D]">Vagus Nerve Reset</h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#0D9488] bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                  {isBreathing ? `Cycle 0${breathCycleCount + 1}` : '60s Reset'}
                </span>
              </div>

              {/* Expanding / Contracting Breathing Visualizer */}
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="relative flex items-center justify-center">
                  
                  {/* Outer Pulsing Halo */}
                  <div
                    className={`absolute h-40 w-40 rounded-full border-2 border-emerald-400/40 transition-all duration-1000 ease-in-out ${
                      isBreathing && breathPhase === 'Inhale'
                        ? 'scale-125 opacity-80 border-emerald-500'
                        : isBreathing && breathPhase === 'Hold'
                        ? 'scale-120 opacity-90 border-teal-500'
                        : isBreathing && breathPhase === 'Exhale'
                        ? 'scale-90 opacity-40 border-emerald-300'
                        : 'scale-100 opacity-30'
                    }`}
                  />
                  <div
                    className={`absolute h-32 w-32 rounded-full bg-emerald-400/15 transition-all duration-1000 ease-in-out ${
                      isBreathing && breathPhase === 'Inhale'
                        ? 'scale-125'
                        : isBreathing && breathPhase === 'Hold'
                        ? 'scale-120'
                        : isBreathing && breathPhase === 'Exhale'
                        ? 'scale-90'
                        : 'scale-100'
                    }`}
                  />

                  {/* Center Breathing Disc */}
                  <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-[#0D6E50] to-[#0D9488] text-white shadow-[0_10px_30px_rgba(13,110,80,0.35)]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-100">
                      {isBreathing ? breathPhase : 'Rhythm'}
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight">
                      {isBreathing ? `${breathTimer}s` : '4-4-6'}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs text-[#385B50] max-w-xs leading-relaxed">
                  {isBreathing
                    ? breathPhase === 'Inhale'
                      ? 'Inhale smoothly through nose, expanding belly.'
                      : breathPhase === 'Hold'
                      ? 'Hold gently, signaling cellular safety.'
                      : 'Exhale slowly through relaxed lips, releasing jaw tension.'
                    : 'A 60-second vagal breathwork reset calms the sympathetic nervous system and elevates heart rate variability.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                <span className="text-[11px] text-[#4F7367]">
                  {isBreathing ? 'Follow rhythm gently' : 'Practice right now'}
                </span>

                <button
                  type="button"
                  onClick={() => setIsBreathing(!isBreathing)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition shadow-sm ${
                    isBreathing
                      ? 'bg-emerald-100 text-[#0A261D] hover:bg-emerald-200'
                      : 'bg-[#0D6E50] text-white hover:bg-[#0A5840]'
                  }`}
                >
                  {isBreathing ? (
                    <>
                      <Pause className="h-3 w-3" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 fill-current" />
                      <span>Start Breath Guide</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* MINIMAL BOTTOM EDITORIAL BAR (Quote + Dimension Hub + Next/Prev) */}
      <footer className="relative z-10 px-4 sm:px-8 lg:px-14 py-3 border-t border-emerald-900/10 bg-white/70 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          {/* Famous Quote */}
          <div className="flex items-center gap-2 text-xs text-[#2A4B3F]">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488] shrink-0 hidden sm:inline" />
            <span className="italic font-serif">
              &ldquo;Your body is the instrument through which your life expresses itself. Care for it with reverence.&rdquo;
            </span>
            <span className="font-mono text-[10px] font-bold text-[#0D9488] uppercase hidden lg:inline">
              — Pranav Mahajan
            </span>
          </div>

          {/* Prev / Hub / Next Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/individual/technology-literacy"
              className="inline-flex items-center gap-1 rounded-full border border-emerald-900/10 bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#1F4135] transition hover:bg-white hover:border-emerald-400"
            >
              <ArrowLeft className="h-3 w-3" />
              <span className="hidden sm:inline">Prev:</span> Tech Literacy
            </Link>

            <Link
              href="/individual#top"
              className="inline-flex items-center rounded-full bg-[#0D6E50] px-3.5 py-1 text-[11px] font-bold text-white shadow-xs transition hover:bg-[#0A5840]"
            >
              All 10 Dimensions
            </Link>

            <Link
              href="/individual/personal-development"
              className="inline-flex items-center gap-1 rounded-full border border-emerald-900/10 bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#1F4135] transition hover:bg-white hover:border-emerald-400"
            >
              <span className="hidden sm:inline">Next:</span> Personal Dev
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
