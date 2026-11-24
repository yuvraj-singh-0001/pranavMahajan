'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Brain,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  BookOpen,
  GraduationCap,
  ChevronRight,
  Cpu,
  BarChart3,
  Sliders,
  Check,
  Activity,
  Layers,
  Compass,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Signature Youth Breakthrough Modes
const YOUTH_MODES = [
  {
    id: 'focus',
    label: 'Deep Focus Stasis',
    tag: '01 • META-LEARNING',
    accentColor: '#4F46E5', // Electric Indigo
    accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    icon: Brain,
    headingTheme: 'Electric Indigo',
    rule: 'Friction creates retention',
    tip: 'Replace passive highlighting with 90-minute active recall sprints to master concepts in 1/3rd the time.',
    radarLabel: 'Cognitive Flow: 98%',
    activePhrase: 'Feynman Synthesis: Explain the hardest concept in plain words to a 10-year-old.',
  },
  {
    id: 'composure',
    label: 'Exam Composure',
    tag: '02 • POISE',
    accentColor: '#7C3AED', // Hyper Violet
    accentBg: 'bg-purple-50 border-purple-200 text-purple-900',
    icon: Shield,
    headingTheme: 'Hyper Violet',
    rule: 'Composure produces marks',
    tip: 'Decouple personal dignity from numerical scores. Clinical stillness unlocks working memory under pressure.',
    radarLabel: 'Emotional Poise: 95%',
    activePhrase: 'Drop physical shoulders, exhale for 6 seconds, and view the exam paper as a puzzle, not a verdict.',
  },
  {
    id: 'armor',
    label: 'Attention Fortress',
    tag: '03 • SOVEREIGNTY',
    accentColor: '#06B6D4', // Neon Cyan
    accentBg: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    icon: Zap,
    headingTheme: 'Neon Cyan',
    rule: 'Protect focus like gold',
    tip: 'Eliminate doomscroll guilt. Zero-phone study zones re-sensitize dopamine receptors to deep intellectual thought.',
    radarLabel: 'Focus Armor: 99%',
    activePhrase: 'Physical separation: Phone kept in another room during high-focus learning blocks.',
  },
  {
    id: 'trajectory',
    label: 'Career Trajectory',
    tag: '04 • AMBITION',
    accentColor: '#F59E0B', // Amber Citron
    accentBg: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: Target,
    headingTheme: 'Amber Citron',
    rule: 'Build a category of one',
    tip: 'Step out of herd comparison. Map unfair personal strengths into modern high-impact skill stacks.',
    radarLabel: 'Vision Clarity: 97%',
    activePhrase: 'Stop collecting generic certificates; build proof of real-world competence and curiosity.',
  },
];

// 4 Core Breakthrough Arenas (100% Pure Code & Interactive UI Widgets - Zero Image Files)
const YOUTH_ARENAS = [
  {
    number: '01',
    themeName: 'Electric Indigo',
    title: 'Meta-Learning & Cognitive Velocity',
    category: 'MEMORY & RETENTION SPEED',
    accent: '#4F46E5',
    icon: Brain,
    rootBottleneck: 'Passive highlighting & marathon cramming that vanishes from memory 48 hours later.',
    consciousFix: 'Feynman Synthesis: Active recall sprints that imprint concepts deeply into neural memory.',
    keyRule: 'Friction creates retention, not repetition',
    quote: 'True learning is not how much you swallow; it is how sharply your mind can construct and explain.',
    ctaTopic: 'Student Life - Meta-Learning & Deep Cognitive Focus',
    metrics: [
      { label: 'Passive Reading', val: '12%', status: 'Low Recall' },
      { label: 'Active Spaced Sprints', val: '68%', status: 'Working Memory' },
      { label: 'Feynman Synthesis', val: '96%', status: 'Permanent Retention' },
    ],
  },
  {
    number: '02',
    themeName: 'Hyper Violet',
    title: 'Exam Composure & Pressure Neutralization',
    category: 'EMOTIONAL SOVEREIGNTY',
    accent: '#7C3AED',
    icon: Shield,
    rootBottleneck: 'Tying self-worth to marks, causing high-stakes panic and blanking out in exam halls.',
    consciousFix: 'Clinical Stillness Protocol: Decoupling identity from scores to think calmly under fire.',
    keyRule: 'Composure produces marks; panic squanders preparation',
    quote: 'When you realize an exam tests your current recall—not your human worth—fear disappears instantly.',
    ctaTopic: 'Student Life - Exam Composure & Fear Neutralization',
    metrics: [
      { label: 'Cortisol Surge', val: 'Normalized', status: 'Optimal Stillness' },
      { label: 'Prefrontal Activation', val: '100%', status: 'Full Clarity' },
      { label: 'Time Management', val: 'Calibrated', status: 'Zero Rush' },
    ],
  },
  {
    number: '03',
    themeName: 'Neon Cyan',
    title: 'Digital Attention Armor & Dopamine Reset',
    category: 'ATTENTION SOVEREIGNTY',
    accent: '#06B6D4',
    icon: Zap,
    rootBottleneck: 'Algorithmic hijack: doomscrolling in bed, fragmented attention, and chronic guilt.',
    consciousFix: 'The Attention Fortress: Physical zero-phone zones and re-sensitizing dopamine to deep work.',
    keyRule: 'Protect your attention like an elite athlete protects their body',
    quote: 'In an age of weaponized distraction, the young adult who can focus for 2 hours has an unfair superpower.',
    ctaTopic: 'Student Life - Digital Attention Armor & Focus Hygiene',
    metrics: [
      { label: 'Algorithm Immunity', val: 'Active', status: 'Zero Doomscroll' },
      { label: 'Unbroken Focus Span', val: '90 Mins', status: 'Deep Stasis' },
      { label: 'Dopamine Sensitivity', val: 'Restored', status: 'High Drive' },
    ],
  },
  {
    number: '04',
    themeName: 'Amber Citron',
    title: 'Strategic Career Vision & Category Design',
    category: 'PURPOSEFUL AMBITION',
    accent: '#F59E0B',
    icon: Target,
    rootBottleneck: 'Blindly following herd trends or parental pressure into competitive fields you secretly hate.',
    consciousFix: 'Unfair Advantage Mapping: Synthesizing unique skills to build an authentic category of one.',
    keyRule: 'Don’t compete in crowded rat races. Build a category of one',
    quote: 'Ambition without self-knowledge is just glorified exhaustion. First know who you are, then build.',
    ctaTopic: 'Student Life - Strategic Career Vision & Ambition',
    metrics: [
      { label: 'Herd Conformity', val: '0%', status: 'Independent Vector' },
      { label: 'Unique Skill Stack', val: 'Mapped', status: 'Unfair Moat' },
      { label: 'Real Portfolio Proof', val: 'Tier 1', status: 'Tangible Proof' },
    ],
  },
];

// 4 Real-Life High-Stakes Student Dilemmas
const STUDENT_DILEMMAS = [
  {
    id: 'blankout',
    title: 'Exam Hall Blank-Out',
    tag: 'HIGH-PRESSURE SITUATION',
    scenario: 'Opening the question paper and feeling mind go totally blank on Question 1 while hands shake.',
    trap: 'Staring in panic for 10 minutes, hyperventilating, and spiraling into “I am going to fail everything”.',
    shift: 'Cortisol spike temporarily blocks working memory retrieval. Physical stillness restores access.',
    script: 'Put pen down. Close eyes. Take 3 slow, deep belly exhales. Skip to Question 4 or the simplest 2-mark question to instantly spark cognitive retrieval.',
    accent: '#7C3AED',
  },
  {
    id: 'comparison',
    title: 'Parental & Relative Comparison',
    tag: 'FAMILY EXPECTATIONS',
    scenario: 'Parents comparing your grades to high-scoring cousins: “Look at them, why can’t you study like that?”',
    trap: 'Yelling back defensively, slamming the door, or internalizing quiet resentment and feeling worthless.',
    shift: 'Their panic comes from generational anxiety, not lack of love. Address their fear with grounded maturity.',
    script: '“I understand you want the best for my future. Comparing me creates anxiety that hurts my focus. Here is my exact study system and how I am improving.”',
    accent: '#4F46E5',
  },
  {
    id: 'fomo',
    title: 'Peer Pressure & FOMO',
    tag: 'SOCIAL BOUNDARIES',
    scenario: 'Friends partying or gaming late every night and mocking your discipline: “Padhaku mat ban, enjoy life.”',
    trap: 'Caving in out of fear of being left out, then feeling miserable and exhausted during tomorrow’s exams.',
    shift: 'Real friends respect your ambition. Those who mock your discipline want you to stay small with them.',
    script: 'Smile warmly: “I would love to celebrate with you guys this weekend, but tonight my study sprint is non-negotiable. Have fun!”',
    accent: '#06B6D4',
  },
  {
    id: 'burnout-spiral',
    title: 'Hopeless Procrastination Spiral',
    tag: 'CHRONIC GUILT',
    scenario: 'Wasted 4 days doing nothing before a major test, feeling like it is now “too late to even try”.',
    trap: 'Giving up completely, bingeing movies all night, and showing up unprepared with excuses.',
    shift: 'Partial mastery is infinitely better than zero. The game is won in high-yield triage.',
    script: '“I cannot change the past 4 days. I will focus on the top 20% high-weightage topics right now with absolute intensity. Every single mark matters.”',
    accent: '#F59E0B',
  },
];

// 5 Real Student Journey Challenges vs Conscious Mentorship Solutions
const STUDENT_CHALLENGES = [
  {
    id: 'exam-panic',
    stageLabel: 'Exam & Test Anxiety',
    problem: 'Mind going completely blank on Question 1, shaking hands, and sudden cortisol-induced panic in the exam hall.',
    solution: 'Clinical Stillness & Retrieval Sprints: 3 belly exhales decouple nervous system panic from working memory.',
    action: 'Skip to Question 4; initial 2-mark win immediately reactivates cognitive retrieval pathways.',
    accent: '#4F46E5',
    tag: '01 • EXAM COMPOSURE',
  },
  {
    id: 'late-night-cramming',
    stageLabel: 'Late-Night Burnout',
    problem: '12-hour passive highlighting and sleep deprivation that dissolves into exhausted brain-fog by morning.',
    solution: 'Feynman Synthesis & Spaced Recall: 90-minute focused recall cycles master syllabi in 1/3rd the time.',
    action: 'Explain the core concept aloud in 2 minutes without opening notes to verify true mental retention.',
    accent: '#7C3AED',
    tag: '02 • META-LEARNING',
  },
  {
    id: 'peer-comparison',
    stageLabel: 'Parental Comparison',
    problem: 'Hearing “Look at Sharma ji’s son” causing deep silent resentment, self-doubt, and helpless despair.',
    solution: 'Objective Trajectory Architecture: Channeling external expectations into clear, transparent personal milestones.',
    action: 'Present parents with a written weekly learning roadmap to replace their anxiety with grounded trust.',
    accent: '#06B6D4',
    tag: '03 • EMOTIONAL POISE',
  },
  {
    id: 'digital-doomscroll',
    stageLabel: 'Attention Hijack & FOMO',
    problem: 'Bedtime doomscrolling, reels bingeing till 3 AM, and chronic daily guilt over wasted study hours.',
    solution: 'The Attention Fortress: Physical zero-phone zones restore baseline dopamine sensitivity to deep intellectual work.',
    action: 'Phone parked in another room during study blocks; deep study sprints are non-negotiable.',
    accent: '#F59E0B',
    tag: '04 • ATTENTION ARMOR',
  },
  {
    id: 'career-confusion',
    stageLabel: 'Career Trap & Rat Race',
    problem: 'Blindly following crowded tuition herd trends into competitive fields you secretly dread or hate.',
    solution: 'Category-of-One Blueprint: Synthesizing unfair strengths into modern high-impact skill stacks.',
    action: 'Stop collecting generic certificates; build proof of real-world problem-solving ability.',
    accent: '#10B981',
    tag: '05 • UNFAIR ADVANTAGE',
  },
];

export default function StudentLifeView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const activeMode = YOUTH_MODES[activeModeIdx];
  const activeDilemma = STUDENT_DILEMMAS[activeDilemmaIdx];
  const activeChallenge = STUDENT_CHALLENGES[activeChallengeIdx];

  // Scroll to top on mount
  useEffect(() => {
    if (scrollRootRef.current) {
      scrollRootRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Back to top button listener
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRootRef.current) {
        setShowScrollTop(scrollRootRef.current.scrollTop > 350);
      }
    };
    const el = scrollRootRef.current;
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (scrollRootRef.current) {
      scrollRootRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={scrollRootRef}
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#F8FAFF] text-[#0F172A] antialiased selection:bg-indigo-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Cyber-Paper Ambient Mesh Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[700px] rounded-full bg-gradient-to-b from-indigo-300/25 via-purple-200/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[600px] rounded-full bg-gradient-to-b from-cyan-300/20 via-sky-200/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[550px] rounded-full bg-gradient-to-t from-amber-300/15 via-orange-100/10 to-transparent blur-[120px]" />
      </div>

      {/* =========================================================================
          OFFICIAL NAVBAR (Identical to Home & Role Page)
         ========================================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-amber-500/15 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none transition-all duration-500">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.assign('/');
                }
              }
            }}
            aria-label="Go back"
            title="Back"
            className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/40 bg-[#16120e]/90 text-amber-200 transition hover:bg-[#2e2318] hover:text-white sm:mr-3 sm:h-10 sm:w-10 shadow-md cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <Link href="/" aria-label="Pranav Mahajan home" className="inline-flex items-center group cursor-pointer transition-transform hover:scale-105">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan Logo"
              className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)] sm:h-16 md:h-20"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#roles"
            className="inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3.5 sm:px-5 text-xs font-bold tracking-wide rounded-full text-amber-200 border border-amber-500/50 bg-[#1e1710]/80 hover:bg-[#2e2318] hover:border-amber-400 hover:text-white transition-all shadow-[0_4px_16px_rgba(223,165,71,0.2)] hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer"
          >
            Go to your role
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-md bg-[#16120e]/90 hover:bg-[#221b14] border border-amber-500/30 text-white backdrop-blur-md"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-amber-200" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-amber-100" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#DFA547]" />
                <span className="h-0.5 w-4 rounded-full bg-amber-100" />
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
        className={`fixed inset-0 z-40 bg-[#0F172A]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-indigo-900/15 bg-[#F8FAFF] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-indigo-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#4F46E5]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#0F172A]">Student Life &amp; Youth</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-900/15 bg-white text-[#0F172A] transition hover:bg-[#EEF2FF]"
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
            { href: '/individual/love-relationships', label: '02 Love & Family Dynamics' },
            { href: '/individual/personal-development', label: '03 Personal Development' },
            { href: '/individual/parenting-child', label: '04 Parenting & Child Development' },
            { href: '/individual/social-relationships', label: '05 Social Relationships & Reputation' },
            { href: '/individual/student-life', label: '06 Student Life & Youth' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-indigo-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#4F46E5] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#EEF2FF] p-5 border border-indigo-100">
          <p className="text-sm leading-6 text-[#312E81]">
            Ready to conquer academic panic, unlock deep cognitive flow, and build an unfair career advantage?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#4338CA]"
          >
            Start Student Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION WITH REALISTIC PANORAMIC BACKGROUND & CROSS-STUDENT DYNAMICS
         ========================================================================= */}
      <section className="relative z-10 min-h-[94vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 select-text overflow-hidden">
        {/* Full-Bleed Photorealistic Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/student-life-hero.jpg"
            alt="Student Life & Youth Mentorship"
            className="h-full w-full object-cover object-center lg:object-right"
          />
          {/* Top Luminous White Mist Overlay */}
          <div className="absolute inset-x-0 top-0 h-44 sm:h-60 bg-gradient-to-b from-white/85 via-white/35 to-transparent pointer-events-none" />
          {/* Luminous Soft White Mist Gradient Overlay for crystal clear readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:w-[70%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFF] via-[#F8FAFF]/30 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Vision, Problem/Solution Interactive Explorer & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
              {/* Live Indicator Chip */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-3.5 py-1.5 border border-indigo-200/90 shadow-2xs w-fit mb-3.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#06B6D4]" />
                </span>
                <span className="font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4F46E5]">
                  Neural Velocity &bull; Academic Sovereignty
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[#0F172A] font-serif leading-[1.12] tracking-tight">
                Master Your Mind. <br />
                <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                  Conquer the Pressure.
                </span>
              </h1>

              {/* Minimal Punchy Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-medium">
                From 2 AM exam panic and doomscroll brain-fog to razor-sharp cognitive stamina, deep meta-learning, and an authentic career trajectory.
              </p>

              {/* 5 Real Student Journey Challenges vs Conscious Solutions Selector */}
              <div className="mt-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Real Student Struggles vs. Mentorship Breakthroughs:
                  </span>
                  <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    5 Dimensions
                  </span>
                </div>

                {/* Stage Tabs */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {STUDENT_CHALLENGES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveChallengeIdx(idx)}
                      className={`text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                        activeChallengeIdx === idx
                          ? 'bg-[#1E1B4B] text-white shadow-sm scale-102 ring-2 ring-indigo-400/50'
                          : 'bg-white/90 border border-slate-200/90 text-slate-700 hover:bg-white hover:border-indigo-300'
                      }`}
                    >
                      {item.stageLabel}
                    </button>
                  ))}
                </div>

                {/* Active Challenge & Solution Interactive Card */}
                <div
                  className="rounded-2xl border bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-sm transition-all duration-300"
                  style={{
                    borderColor: `${activeChallenge.accent}40`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider"
                      style={{ color: activeChallenge.accent }}
                    >
                      {activeChallenge.tag}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">
                      Phase 0{activeChallengeIdx + 1}
                    </span>
                  </div>

                  {/* Problem vs Solution Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {/* The Problem / Struggle */}
                    <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                        <span className="font-mono text-[9.5px] font-bold uppercase text-rose-700">
                          The Pressure / Struggle:
                        </span>
                      </div>
                      <p className="text-xs text-rose-950 font-medium leading-relaxed">
                        {activeChallenge.problem}
                      </p>
                    </div>

                    {/* The Conscious Solution */}
                    <div
                      className="rounded-xl border p-3"
                      style={{
                        backgroundColor: `${activeChallenge.accent}0D`,
                        borderColor: `${activeChallenge.accent}35`,
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: activeChallenge.accent }}
                        />
                        <span
                          className="font-mono text-[9.5px] font-bold uppercase tracking-wider"
                          style={{ color: activeChallenge.accent }}
                        >
                          Conscious Breakthrough:
                        </span>
                      </div>
                      <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                        {activeChallenge.solution}
                      </p>
                    </div>
                  </div>

                  {/* Immediate Actionable Micro-Step */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      🎯 <strong className="text-slate-800">Direct Action:</strong> {activeChallenge.action}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Claim 1-on-1 Student Mentorship</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#flow-cockpit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 border border-slate-200/90 shadow-2xs hover:bg-white hover:border-indigo-300 transition-all"
                >
                  <span>Cognitive Cockpit &darr;</span>
                </a>

                <a
                  href="#youth-arenas"
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-3 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 transition-all"
                >
                  <span>4 Cognitive Engines</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Kept completely open so the photorealistic Indian students in the background photograph are unobstructed */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: THE 4 COGNITIVE ENGINES (2x2 BENTO COMMAND MATRIX - 100% PURE CODE)
          Zero External Images - Pure SVG/CSS Cyber-UI Widgets
         ========================================================================= */}
      <section id="youth-arenas" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-14 sm:py-20 scroll-mt-16 select-text">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 border border-indigo-200/80 shadow-xs mb-3">
            <span className="h-2 w-2 rounded-full bg-[#4F46E5] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#4F46E5]">
              Core Cognitive Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-serif tracking-tight">
            The 4 Cognitive Engines of Youth Sovereignty
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#475569] font-medium max-w-2xl mx-auto">
            Interactive command modules engineered to decouple potential from panic:
          </p>
        </div>

        {/* 2x2 Bento Command Grid (Zero Images, High-Tech Visual Code Widgets) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {YOUTH_ARENAS.map((arena, idx) => {
            const Icon = arena.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-8 border border-indigo-900/10 bg-gradient-to-br from-white via-[#FAFCFF] to-indigo-50/20 backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(79,70,229,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(79,70,229,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Subtle Ambient Glow */}
                <div
                  className="absolute top-0 right-0 w-44 h-44 rounded-full blur-[75px] pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: arena.accent }}
                />

                <div>
                  {/* Card Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/90 px-3.5 py-1 text-xs font-mono font-bold text-slate-700 border border-slate-200/80">
                      <span
                        className="h-2 w-2 rounded-full animate-pulse"
                        style={{ backgroundColor: arena.accent }}
                      />
                      <span>0{arena.number} &bull; {arena.category}</span>
                    </div>

                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: arena.accent }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-serif leading-snug mb-3">
                    {arena.title}
                  </h3>

                  {/* High-Tech Interactive Code-Based Telemetry Widget (No Image!) */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                        Telemetry Calibration
                      </span>
                      <span
                        className="font-mono text-[10.5px] font-bold"
                        style={{ color: arena.accent }}
                      >
                        Engine 0{arena.number} Active
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {arena.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-xl bg-white p-2 border border-slate-200/80 text-center"
                        >
                          <span className="font-mono text-[9px] text-slate-400 block truncate">
                            {m.label}
                          </span>
                          <span
                            className="font-mono text-xs sm:text-sm font-extrabold block mt-0.5"
                            style={{ color: arena.accent }}
                          >
                            {m.val}
                          </span>
                          <span className="font-mono text-[8.5px] text-slate-500 block truncate mt-0.5">
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Minimal 1-Line Psychological Bottleneck Card */}
                  <div className="rounded-xl border border-rose-200/80 bg-rose-50/60 p-3 mb-2.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                      <span className="font-mono text-[9.5px] font-bold uppercase text-rose-700 tracking-wider">
                        The Academic Bottleneck
                      </span>
                    </div>
                    <p className="text-xs text-[#3E161D] font-medium leading-relaxed pl-5">
                      {arena.rootBottleneck}
                    </p>
                  </div>

                  {/* Minimal 1-Line Conscious Fix Card */}
                  <div
                    className="rounded-xl border p-3 mb-3.5"
                    style={{
                      backgroundColor: `${arena.accent}0A`,
                      borderColor: `${arena.accent}30`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <CheckCircle2
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: arena.accent }}
                      />
                      <span
                        className="font-mono text-[9.5px] font-bold uppercase tracking-wider"
                        style={{ color: arena.accent }}
                      >
                        Conscious Actionable Fix
                      </span>
                    </div>
                    <p className="text-xs text-[#0F172A] font-semibold leading-relaxed pl-5">
                      {arena.consciousFix}
                    </p>
                  </div>

                  {/* Executive Law Quote */}
                  <div
                    className="rounded-lg border-l-3 pl-3 py-1 mb-5 bg-slate-50/50"
                    style={{ borderLeftColor: arena.accent }}
                  >
                    <p className="text-xs italic font-serif text-[#334155] leading-snug">
                      &ldquo;{arena.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Action CTA Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                    style={{
                      backgroundColor: arena.accent,
                      boxShadow: `0 6px 20px -4px ${arena.accent}60`,
                    }}
                  >
                    <span>Master Engine 0{arena.number} Mentorship</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <span className="font-mono text-[10.5px] font-bold text-slate-400">
                    1-on-1 Guidance
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SCREEN 3: REAL-LIFE STUDENT PRESSURE & DILEMMA SIMULATOR
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="rounded-3xl border border-indigo-900/15 bg-gradient-to-br from-white via-[#F8FAFF] to-indigo-50/50 p-6 sm:p-9 shadow-md">
          
          <div className="max-w-2xl mb-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#4F46E5]">
              <Zap className="h-4 w-4 text-cyan-500" />
              <span>Real-Life Youth Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-serif">
              De-Escalation &amp; Poise Under Academic Pressure
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
              Click any high-stakes student dilemma below to see the instant shift from panic to unshakeable composure:
            </p>
          </div>

          {/* Dilemma Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {STUDENT_DILEMMAS.map((dilemma, idx) => (
              <button
                key={dilemma.id}
                type="button"
                onClick={() => setActiveDilemmaIdx(idx)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeDilemmaIdx === idx
                    ? 'bg-[#1E1B4B] text-white shadow-sm -translate-y-0.5'
                    : 'bg-white border border-indigo-900/10 text-[#0F172A] hover:bg-indigo-50'
                }`}
              >
                <span>{dilemma.title}</span>
              </button>
            ))}
          </div>

          {/* Active Dilemma Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* The Trigger & Trap */}
            <div className="md:col-span-5 rounded-2xl border border-rose-200 bg-[#FFF5F5] p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-rose-700 block mb-1">
                  Trigger ({activeDilemma.tag})
                </span>
                <h3 className="text-base font-bold text-[#2A151B] mb-2.5">
                  {activeDilemma.scenario}
                </h3>
                <div className="rounded-xl border border-rose-200 bg-white/85 p-3">
                  <span className="font-mono text-xs font-bold uppercase text-rose-800 block mb-1">
                    ❌ The Reactive Student Trap:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4C1D24] leading-relaxed font-medium">
                    {activeDilemma.trap}
                  </p>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-rose-700">
                Result: Spikes cortisol, burns stamina &amp; locks working memory
              </span>
            </div>

            {/* The Grounded Protocol */}
            <div className="md:col-span-7 rounded-2xl border border-indigo-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#4F46E5] block mb-1">
                  ✅ The Grounded Protocol (What to Do &amp; Say):
                </span>
                <p className="text-base sm:text-lg text-[#0F172A] font-serif italic leading-relaxed my-3 bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                  {activeDilemma.script}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-[#4338CA]">
                  <CheckCircle2 className="h-4 w-4 text-[#4F46E5] shrink-0" />
                  <span>Cognitive Shift: {activeDilemma.shift}</span>
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-indigo-900/10 flex items-center justify-between text-xs font-mono text-[#4F46E5] font-bold">
                <span>Practiced in 1-on-1 Student Mentorship</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 4: COACHING FACTORIES VS. PRANAV MAHAJAN YOUTH MENTORSHIP
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#4F46E5]">
            The Structural Paradigm Shift
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] mt-1 font-serif">
            Why Generic Coaching Fails vs. Why Mentorship Transforms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Old Coaching Model */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-mono font-bold text-slate-600 mb-4">
              <span>Generic Tuition &amp; Coaching Factories</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Treats students as marks-producing machines, ignoring nervous system burnout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Enforces 14-hour rote cramming schedules that destroy critical thinking and joy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Fosters toxic peer comparison, leaving 95% of students feeling like failures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Offers zero guidance for digital addiction, emotional regulation, or authentic life direction.</span>
              </li>
            </ul>
          </div>

          {/* Pranav Mahajan Youth Mentorship */}
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 p-6 sm:p-8 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-mono font-bold text-white mb-4">
              <span>Pranav Mahajan Youth Mentorship</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#0F172A] font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Meta-learning frameworks: master complex syllabi in 1/3rd the time with Feynman synthesis.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Clinical exam composure: eradicate panic, heart racing, and memory blank-outs under pressure.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Attention fortress: build dopamine immunity against doomscrolling and digital fatigue.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Authentic career architecture: map unfair strengths to build an extraordinary category of one.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl border border-indigo-900/15 bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#1E1B4B] p-8 sm:p-12 text-center text-white shadow-xl max-w-4xl mx-auto">
          <GraduationCap className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-4xl font-extrabold font-serif mb-3">
            Build Unshakeable Intellectual Sovereignty
          </h3>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto mb-6">
            Schedule a personalized 1-on-1 mentorship session with Pranav Mahajan to calibrate your study systems, neutralize academic fear, and design your unfair future.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start 1-on-1 Student Mentorship &rarr;</span>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION: NEURAL COGNITIVE FLOW COCKPIT (Interactive Radar & Flow Telemetry)
          Relocated to bottom to keep Screen 1 airy and panoramic
         ========================================================================= */}
      <section id="flow-cockpit" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 scroll-mt-20 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 border border-indigo-200/90 shadow-2xs mb-2">
            <Cpu className="h-3.5 w-3.5 text-[#4F46E5]" />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#4F46E5]">
              Interactive Cockpit &bull; Live Telemetry
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-serif">
            Neural Cognitive Flow Cockpit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Toggle between the 4 cognitive states to view live retention velocity, working memory calibration, and Feynman recall protocols.
          </p>
        </div>

        {/* 4 Mode Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {YOUTH_MODES.map((mode, idx) => {
            const Icon = mode.icon;
            const isSelected = activeModeIdx === idx;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveModeIdx(idx)}
                className={`flex items-center gap-2 p-3 rounded-2xl border text-left transition-all duration-300 shadow-2xs cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#4F46E5] ring-2 ring-indigo-200 scale-102 shadow-sm'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-indigo-300'
                }`}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white shadow-xs"
                  style={{ backgroundColor: mode.accentColor }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[9px] font-bold text-slate-400 block truncate">
                    {mode.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {mode.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* The Animated Cockpit Card */}
        <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#F8FAFF] to-indigo-50/40 border border-indigo-200/90 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.18)] overflow-hidden">
          {/* Ambient Mesh Glow behind widget */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-700"
            style={{ backgroundColor: activeMode.accentColor }}
          />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

          {/* Top System Status Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-indigo-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: activeMode.accentColor }}
                />
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                Cognitive State: {activeMode.headingTheme}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 border border-indigo-200/80 text-[10.5px] font-mono font-bold text-indigo-700">
              <Cpu className="h-3 w-3" />
              <span>{activeMode.radarLabel}</span>
            </div>
          </div>

          {/* Centerpiece: The Animated Neural Circular Flow Gauge */}
          <div className="relative flex items-center justify-center my-6 z-10">
            {/* SVG Dual-Track Orbital Gauge */}
            <svg className="w-52 h-52 sm:w-60 sm:h-60 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle cx="50" cy="50" r="42" stroke="#E2E8F0" strokeWidth="4" fill="none" />
              <circle cx="50" cy="50" r="34" stroke="#F1F5F9" strokeWidth="3" fill="none" />

              {/* Outer Glowing Active Arc */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={activeMode.accentColor}
                strokeWidth="5"
                strokeDasharray="264"
                strokeDashoffset={
                  activeModeIdx === 0 ? '55' : activeModeIdx === 1 ? '35' : activeModeIdx === 2 ? '20' : '45'
                }
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />

              {/* Secondary Cyan Inner Arc */}
              <circle
                cx="50"
                cy="50"
                r="34"
                stroke="#06B6D4"
                strokeWidth="3.5"
                strokeDasharray="213"
                strokeDashoffset="60"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Core Disc */}
            <div className="absolute flex flex-col items-center justify-center text-center p-4 rounded-full w-36 h-36 sm:w-40 sm:h-40 bg-white/95 border border-indigo-100 shadow-xl backdrop-blur-md">
              <div
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl text-white shadow-md transition-all duration-500 mb-1"
                style={{ backgroundColor: activeMode.accentColor }}
              >
                {React.createElement(activeMode.icon, { className: 'h-5 w-5' })}
              </div>
              <span className="font-mono text-base sm:text-lg font-black text-slate-900 leading-none">
                {activeModeIdx === 0
                  ? '3.4x'
                  : activeModeIdx === 1
                  ? '100%'
                  : activeModeIdx === 2
                  ? '0 min'
                  : 'Top 1%'}
              </span>
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-400 mt-0.5">
                {activeModeIdx === 0
                  ? 'Retention Velocity'
                  : activeModeIdx === 1
                  ? 'Panic Neutralized'
                  : activeModeIdx === 2
                  ? 'Doomscroll Leak'
                  : 'Unfair Advantage'}
              </span>
            </div>

            {/* Floating Satellite Telemetry Chips */}
            <div className="absolute -top-1 left-2 sm:left-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Deep Stasis Active</span>
            </div>

            <div className="absolute -bottom-1 right-2 sm:right-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-cyan-500" />
              <span>Alpha: 10.4 Hz</span>
            </div>
          </div>

          {/* 3-Stage Feynman Synthesis Pipeline */}
          <div className="mt-4 pt-3.5 border-t border-indigo-100 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                Sovereign Cognitive Pipeline
              </span>
              <span className="font-mono text-[10.5px] font-bold text-indigo-600">
                Active Recall Cycle
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/90 text-center">
                <span className="font-mono text-[8.5px] text-slate-400 uppercase block">Stage 01</span>
                <span className="font-bold text-xs text-slate-800 block mt-0.5">Rapid Input</span>
                <span className="text-[10px] text-slate-500 block truncate">15m Scan</span>
              </div>

              <div className="rounded-xl bg-indigo-50/70 p-2.5 border border-indigo-200 text-center relative">
                <span className="font-mono text-[8.5px] text-indigo-500 uppercase block font-bold">Stage 02</span>
                <span className="font-bold text-xs text-indigo-900 block mt-0.5">Feynman Test</span>
                <span className="text-[10px] text-indigo-600 font-semibold block truncate">Plain English</span>
              </div>

              <div className="rounded-xl bg-cyan-50/70 p-2.5 border border-cyan-200 text-center">
                <span className="font-mono text-[8.5px] text-cyan-600 uppercase block font-bold">Stage 03</span>
                <span className="font-bold text-xs text-cyan-950 block mt-0.5">Neural Lock</span>
                <span className="text-[10px] text-cyan-700 font-semibold block truncate">Permanent</span>
              </div>
            </div>
          </div>

          {/* Bottom Grounded Executive Shift Chip */}
          <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 overflow-hidden">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-xs text-slate-700 font-medium truncate italic">
                &ldquo;{activeMode.rule}&rdquo;
              </p>
            </div>
            <span className="font-mono text-[10px] font-bold text-slate-400 shrink-0 ml-2">
              100% Stillness
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 5: EDITORIAL QUOTE & 10 DIMENSIONS HUB NAVIGATION
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 text-center select-text">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-20 bg-indigo-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
          <span className="h-px w-20 bg-indigo-900/20" />
        </div>

        <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#0F172A] max-w-2xl mx-auto leading-relaxed">
          &ldquo;True learning is not how much you swallow; it is how sharply your mind can construct, stay still under pressure, and navigate an authentic future.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4F46E5]">
          — Pranav Mahajan &bull; Dimension 06
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/social-relationships"
            className="inline-flex items-center gap-2.5 rounded-full border border-indigo-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#0F172A] shadow-xs transition hover:bg-white hover:border-indigo-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Social Relationships</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#4F46E5] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#4338CA] cursor-pointer"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/personal-development"
            className="inline-flex items-center gap-2.5 rounded-full border border-indigo-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#0F172A] shadow-xs transition hover:bg-white hover:border-indigo-400 cursor-pointer"
          >
            <span>Personal Development</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Floating Smooth Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#4F46E5] text-white shadow-2xl hover:bg-[#4338CA] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in cursor-pointer"
          title="Back to Top"
        >
          <ArrowLeft className="h-5 w-5 rotate-90" />
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
