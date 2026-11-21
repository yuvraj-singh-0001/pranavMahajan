'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  HeartHandshake,
  Shield,
  Compass,
  Brain,
  Baby,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Play,
  Pause,
  BarChart3,
  Users,
  Cog,
  Zap,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 3 Core Real-World Parenting Problems matching User's Reference Template (Image 2)
interface InfographicProblem {
  id: string;
  step: string;
  colorName: string;
  bgColor: string;
  badgeBg: string;
  accentHex: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeTitle: string;
  ageTag: string;
  problemDesc: string;
  breakthroughTitle: string;
  solutionSummary: string;
  scriptQuote: string;
  ctaTopic: string;
}

const INFOGRAPHIC_PROBLEMS: InfographicProblem[] = [
  {
    id: 'meltdowns',
    step: '01',
    colorName: 'red',
    bgColor: 'bg-[#EA384D]',
    badgeBg: 'bg-[#DC2626]',
    accentHex: '#EA384D',
    icon: Users,
    badgeTitle: 'TANTRUMS & MELTDOWNS',
    ageTag: 'AGES 0 – 5 • TODDLERS',
    problemDesc:
      'Supermarket screaming, shoe battles, and public tantrums.',
    breakthroughTitle: 'CO-REGULATION ANCHOR',
    solutionSummary:
      'Stay grounded at eye level. Co-regulate before you correct.',
    scriptQuote:
      '“I am right here with you until your body feels calm.”',
    ctaTopic: 'Tantrums and Early Attachment',
  },
  {
    id: 'screens-homework',
    step: '02',
    colorName: 'orange',
    bgColor: 'bg-[#F97316]',
    badgeBg: 'bg-[#EA580C]',
    accentHex: '#F97316',
    icon: BarChart3,
    badgeTitle: 'SCREENS & STUDY',
    ageTag: 'AGES 6 – 11 • SCHOOL YEARS',
    problemDesc:
      'iPad addiction, homework defiance, and tears over "I\'m stupid."',
    breakthroughTitle: 'EFFORT OVER OUTCOME',
    solutionSummary:
      'Praise mechanical effort and install "yet" to replace fear with curiosity.',
    scriptQuote:
      '“Your brain is building new wiring right now. Take one micro-step.”',
    ctaTopic: 'Screen Boundaries and Study Habits',
  },
  {
    id: 'teen-rebellion',
    step: '03',
    colorName: 'purple',
    bgColor: 'bg-[#7C3AED]',
    badgeBg: 'bg-[#6D28D9]',
    accentHex: '#7C3AED',
    icon: Cog,
    badgeTitle: 'TEEN DISTANCE',
    ageTag: 'AGES 12 – 18 • ADOLESCENCE',
    problemDesc:
      'One-word answers, slammed doors, and anger when asked simple questions.',
    breakthroughTitle: 'SENIOR ADVISOR PROTOCOL',
    solutionSummary:
      'Teens crave autonomy. Transition from micromanaging boss to trusted advisor.',
    scriptQuote:
      '“I can see today was heavy. I\'m ready whenever you want to vent.”',
    ctaTopic: 'Teen Communication and Independence',
  },
];

// Exact Arc Geometries calculated to match Reference Infographic Bezel (Images 1, 4 & 6)
const RED_ARC_PATH =
  'M 73.1 192.52 L 44.57 183.25 A 216 216 0 0 0 89.48 105.47 L 79.08 96.1 L 90.23 84.55 L 99.95 94.62 L 120.79 116.2 A 186 186 0 0 1 73.1 192.52 Z';
const ORANGE_ARC_PATH =
  'M 68.06 288.67 L 38.72 294.91 A 216 216 0 0 0 34.82 268.83 L 10.00 250.00 L 34.82 231.17 A 216 216 0 0 0 40.42 197.74 L 69.52 205 A 186 186 0 0 1 68.06 288.67 Z';
const PURPLE_ARC_PATH =
  'M 120.79 383.8 L 99.95 405.38 L 90.23 415.45 L 79.08 403.9 L 89.48 394.53 A 216 216 0 0 0 44.57 316.75 L 73.1 307.48 A 186 186 0 0 1 120.79 383.8 Z';

// 4 Pillars of the Main Problems (Requested by user)
const MAIN_PROBLEM_PILLARS = [
  {
    title: 'The Tantrum & Meltdown Storm',
    problemTag: 'Problem 01 • Early Childhood',
    icon: Baby,
    accent: '#EA384D',
    rootBottleneck: 'Toddler prefrontal cortex is offline. Lecturing or yelling back adds fuel to the fire.',
    consciousFix: 'Somatic Co-Regulation: Drop down to eye-level, take 1 audible breath, and be the calm harbor.',
    keyRule: 'Attune before advising',
  },
  {
    title: 'The Screen Addiction & Study Battle',
    problemTag: 'Problem 02 • School Age',
    icon: BarChart3,
    accent: '#F97316',
    rootBottleneck: 'Algorithms hijack dopamine, while fear of academic failure creates homework paralysis.',
    consciousFix: 'Process Architecture: Praise effort, install the word "YET", and co-create device-free routines.',
    keyRule: 'Effort over outcome praise',
  },
  {
    title: 'Sullen Silence, Disrespect & Distance',
    problemTag: 'Problem 03 • Teen Years',
    icon: Smartphone,
    accent: '#7C3AED',
    rootBottleneck: 'Authoritarian orders trigger adolescent rebellion, secret chats, and slammed doors.',
    consciousFix: 'Senior Advisory Protocol: Transition from manager to trusted advisor using side-by-side connection.',
    keyRule: 'Connection before control',
  },
  {
    title: 'Parental Snapping, Reactivity & Guilt',
    problemTag: 'Problem 04 • The Adult Core',
    icon: Brain,
    accent: '#059669',
    rootBottleneck: 'We snap in the exact tone used on us in childhood, followed by late-night exhaustion and guilt.',
    consciousFix: 'The 3-Second Sacred Pause: Catch the physical trigger, ground your breath, and master sincere repair.',
    keyRule: 'Repair within 60 minutes',
  },
];

// 4 Interactive Crisis Simulator Scenarios
const CRISIS_SCENARIOS = [
  {
    id: 'tantrum',
    tag: 'Early Childhood (0-5)',
    title: 'The Public Supermarket Meltdown',
    trigger: 'Child screams on the floor because you won\'t buy sugar cereal.',
    instinctTrap: 'Giving in out of embarrassment, or threatening harsh punishment in front of strangers.',
    breakthroughScript: '“I know you really wanted that, and it’s hard when mom says no. You can feel sad, and we are still leaving together.”',
    keyShift: 'Prioritize your child’s emotional safety over strangers’ opinions.',
  },
  {
    id: 'screen',
    tag: 'School Age (6-12)',
    title: 'Screen Time Cutoff Standoff',
    trigger: 'iPad timer ends; child screams: "I hate you, you ruin everything!"',
    instinctTrap: 'Yelling back: "Fine, no iPad for a month!" and violently snatching the device away.',
    breakthroughScript: '“It is hard to stop something so fun. I hear your frustration. The timer rang, so iPad rests here now. Let’s race to the shoes.”',
    keyShift: 'Hold the physical boundary calmly without arguing the emotional protest.',
  },
  {
    id: 'slam-door',
    tag: 'Teen Years (13-18)',
    title: 'Slammed Door & "Leave Me Alone!"',
    trigger: 'Teen storms into their room and slams the door shut.',
    instinctTrap: 'Barging in immediately, screaming about respect and demanding instant compliance.',
    breakthroughScript: 'Slide a note or knock gently: “I hear that you need space right now. I love you and I’m in the kitchen whenever you’re ready.”',
    keyShift: 'Give them the dignity of space; address the door slamming later when calm.',
  },
  {
    id: 'grades',
    tag: 'Academic Stress',
    title: 'Hiding a Bad Exam Report',
    trigger: 'Child hides low marks out of sheer terror of your disappointment.',
    instinctTrap: 'Angrily lecturing: "After all we spent on tutoring, this is the result?!"',
    breakthroughScript: '“Thank you for showing me this. I know you were worried. A score is just feedback, not your worth. Let’s figure out what didn’t work together.”',
    keyShift: 'Turn academic setbacks into collaborative problem-solving, not character verdicts.',
  },
];

export default function ParentingChildView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeCrisisId, setActiveCrisisId] = useState(CRISIS_SCENARIOS[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollRootRef = useRef<HTMLDivElement>(null);
  const activeProblem = INFOGRAPHIC_PROBLEMS[activeProblemIndex];
  const activeCrisis = useMemo(
    () => CRISIS_SCENARIOS.find((c) => c.id === activeCrisisId) || CRISIS_SCENARIOS[0],
    [activeCrisisId]
  );

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

  const handleNextProblem = () => {
    setActiveProblemIndex((prev) => (prev + 1) % INFOGRAPHIC_PROBLEMS.length);
  };

  // Audio preview simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setTimeout(() => {
        setIsPlayingAudio(false);
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio]);

  return (
    <div
      ref={scrollRootRef}
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#FAF8F5] text-[#1E2922] antialiased selection:bg-emerald-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Official Fixed Header */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-emerald-900/10 bg-[#FAF8F5]/90 px-4 py-2.5 sm:px-8 lg:px-12 xl:px-16 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" aria-label="Pranav Mahajan home" className="inline-flex items-center group">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-9 sm:h-12 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signup?role=individual&topic=Parenting%20and%20Child%20Development"
            className="inline-flex items-center justify-center rounded-full border border-emerald-500/50 bg-[#0F382B] px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide text-emerald-200 shadow-xs backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#154D3C] hover:text-white sm:px-5 sm:py-2"
          >
            Sign Up
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 sm:h-10 sm:w-10 flex-col items-center justify-center gap-1 rounded-xl border border-emerald-900/15 bg-white text-emerald-950 shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-emerald-50 active:scale-95"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-emerald-700" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-emerald-900" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#10b981]" />
                <span className="h-0.5 w-4 rounded-full bg-emerald-900" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Navigation Slide-Over Menu */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-[#0E1F17]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(23rem,88vw)] flex-col border-l border-emerald-900/15 bg-[#F6F3EC] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-emerald-900/15 pb-5">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#059669]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#183126]">Parenting &amp; Child Growth</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-[#183126] transition hover:bg-[#EAE4D7]"
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
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#183126] transition hover:border-emerald-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#059669] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#E8E2D4] p-5">
          <p className="text-sm leading-6 text-[#244237]">
            Ready to replace yelling and guilt with grounded connection and mutual trust?
          </p>
          <Link
            href="/signup?role=individual&topic=Parenting%20and%20Child%20Development"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0F382B] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#154D3C]"
          >
            Start Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION (First screen with clean intro, audio button, CTA)
         ========================================================================= */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 2xl:px-16 text-center">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-gradient-to-b from-emerald-200/35 via-amber-100/25 to-transparent blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Dimension Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/90 px-4 py-1.5 backdrop-blur-md shadow-xs mb-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46]">
              Dimension 04 &bull; Conscious Parenting Architecture
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.14] font-serif text-[#122B1E]">
            Parenting &amp; Child Development: <br />
            <span className="bg-gradient-to-r from-[#EA384D] via-[#F97316] to-[#7C3AED] bg-clip-text text-transparent">
              Connection Over Control.
            </span>
          </h1>

          {/* Concise Tagline */}
          <div className="mt-3.5 inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-white/90 px-5 py-2 backdrop-blur-md shadow-xs max-w-2xl">
            <span className="text-[#059669] text-base">✦</span>
            <p className="text-xs sm:text-sm md:text-base font-medium text-[#254234] leading-relaxed">
              Children do not learn from what we preach; they absorb who we are in moments of quiet pressure. Transform daily friction into lifelong self-trust.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              aria-label={isPlayingAudio ? 'Pause reflection' : 'Listen intro'}
              className={`group flex items-center gap-2.5 rounded-full border border-emerald-900/15 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-emerald-400 ${
                isPlayingAudio ? 'ring-2 ring-emerald-400 bg-emerald-50' : ''
              }`}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] text-white shadow-xs">
                {isPlayingAudio ? (
                  <Pause className="h-3 w-3 animate-pulse" />
                ) : (
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#122B1E]">
                {isPlayingAudio ? 'Playing Reflection...' : 'Listen Intro (1-Min)'}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <span className={`h-2.5 w-0.5 rounded-full bg-[#059669] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                <span className={`h-3.5 w-0.5 rounded-full bg-[#059669] ${isPlayingAudio ? 'animate-bounce' : 'opacity-40'}`} />
                <span className={`h-2 w-0.5 rounded-full bg-[#059669] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
              </div>
            </button>

            <a
              href="#infographic-challenges"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F382B] via-[#059669] to-[#0D9488] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Explore Common Challenges</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {isPlayingAudio && (
            <div className="mt-4 mx-auto flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-white/95 p-3 shadow-md backdrop-blur-md max-w-lg animate-in fade-in slide-in-from-top-2 text-left">
              <Volume2 className="h-5 w-5 text-[#059669] animate-pulse shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-[#122B1E]">The Conscious Parent&apos;s Pause &bull; Pranav Mahajan</p>
                <p className="text-[#3F594D] italic text-[11px] mt-0.5">
                  &ldquo;When your child screams, do not match the volume. Be the calm lake into which their stormy pebble falls.&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: THE 3-STEP INFOGRAPHIC CONSOLE
          Exact Layout from User Reference Image (Image 1 & 4)
          Left: 3 Stacked Horizontal Capsules (Red, Orange, Purple)
          Right: Large Circular Disk Hub with Segmented Arc Ring & Pointing Teeth
         ========================================================================= */}
      <section
        id="infographic-challenges"
        className="relative min-h-[calc(100dvh-64px)] flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 scroll-mt-20 overflow-hidden bg-white border-y border-slate-100/80"
      >
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          
          {/* Section Subtitle */}
          <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#059669] block mb-1">
              Interactive Problem Diagnostic
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-[#122B1E]">
              Select Your Family&apos;s Current Struggle
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#415C4E] font-medium">
              Click any problem on the left to see Pranav Mahajan&apos;s conscious, actionable breakthrough:
            </p>
          </div>

          {/* Side-by-Side: 3 Left Capsules & Right Circular Disk matching Image 1 & 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: 3 STACKED CAPSULE BUTTONS (Red, Orange, Purple) */}
            <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6">
              {INFOGRAPHIC_PROBLEMS.map((prob, idx) => {
                const isSelected = activeProblemIndex === idx;
                const Icon = prob.icon;

                return (
                  <div
                    key={prob.id}
                    onClick={() => setActiveProblemIndex(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveProblemIndex(idx);
                    }}
                    className={`group relative flex items-center cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'scale-[1.02] -translate-y-0.5'
                        : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Left Capsule Body: Solid Color with Rounded Left Half-Pill & Copyable White Text */}
                    <div
                      className={`relative flex-1 min-h-[76px] sm:min-h-[82px] rounded-l-full pl-6 sm:pl-8 pr-12 sm:pr-14 py-3 flex flex-col justify-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 ${prob.bgColor} ${
                        isSelected
                          ? 'shadow-[0_12px_28px_rgba(0,0,0,0.22)] ring-2 ring-white/60'
                          : 'group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]'
                      }`}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider opacity-90 block mb-0.5 select-text">
                        PROBLEM {prob.step} &bull; {prob.ageTag}
                      </span>
                      <p className="text-xs sm:text-[13px] font-semibold leading-snug drop-shadow-2xs select-text">
                        {prob.problemDesc}
                      </p>
                    </div>

                    {/* Circular Badge on the Right (Overlapping Capsule with 3D shadow & White Bezel) */}
                    <div className="relative -ml-8 sm:-ml-10 z-20 shrink-0">
                      <div
                        className={`flex flex-col items-center justify-center text-center h-22 w-22 sm:h-24 sm:w-24 rounded-full text-white shadow-[0_12px_24px_rgba(0,0,0,0.24)] ring-[6px] ring-white transition-all duration-300 ${prob.badgeBg} ${
                          isSelected
                            ? 'scale-105 shadow-[0_14px_30px_rgba(0,0,0,0.32)] ring-white'
                            : 'group-hover:scale-102'
                        }`}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 drop-shadow-xs mb-1" />
                        <span className="font-sans text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-tight leading-tight px-1 drop-shadow-xs select-text">
                          {prob.badgeTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between text-xs font-mono text-[#3F594D] font-bold px-1 pt-1">
                <span>👆 Click on your struggle above</span>
                <span>Active: Step 0{activeProblemIndex + 1} of 03</span>
              </div>
            </div>

            {/* RIGHT: CIRCULAR HUB (Segmented Color Rim hugging perimeter with pointing teeth matching Image 1 & 4) */}
            <div className="lg:col-span-6 flex justify-center items-center">
              
              {/* Outer Circular Disk Container */}
              <div className="relative w-[340px] h-[340px] sm:w-[410px] sm:h-[410px] xl:w-[450px] xl:h-[450px] flex items-center justify-center">
                
                {/* SVG Layer: Colored Rim ON Left Curve facing the 3 buttons & Center White Disc */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-auto"
                  viewBox="0 0 500 500"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="14" stdDeviation="20" floodColor="#000000" floodOpacity="0.12" />
                    </filter>
                  </defs>

                  {/* Top Red Arc Segment (Problem 01) */}
                  <path
                    d={RED_ARC_PATH}
                    fill="#EA384D"
                    onClick={() => setActiveProblemIndex(0)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      opacity: activeProblemIndex === 0 ? 1 : 0.75,
                      filter:
                        activeProblemIndex === 0
                          ? 'drop-shadow(0 0 8px rgba(234,56,77,0.7))'
                          : 'none',
                    }}
                  />

                  {/* Middle Orange Arc Segment (Problem 02 with Sharp Arrow Pointing Due West) */}
                  <path
                    d={ORANGE_ARC_PATH}
                    fill="#F97316"
                    onClick={() => setActiveProblemIndex(1)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      opacity: activeProblemIndex === 1 ? 1 : 0.75,
                      filter:
                        activeProblemIndex === 1
                          ? 'drop-shadow(0 0 8px rgba(249,115,22,0.7))'
                          : 'none',
                    }}
                  />

                  {/* Bottom Purple Arc Segment (Problem 03) */}
                  <path
                    d={PURPLE_ARC_PATH}
                    fill="#7C3AED"
                    onClick={() => setActiveProblemIndex(2)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      opacity: activeProblemIndex === 2 ? 1 : 0.75,
                      filter:
                        activeProblemIndex === 2
                          ? 'drop-shadow(0 0 8px rgba(124,58,237,0.7))'
                          : 'none',
                    }}
                  />

                  {/* Seamless White Inner Circle with 3D Drop Shadow */}
                  <circle
                    cx="250"
                    cy="250"
                    r="186"
                    fill="#FFFFFF"
                    filter="url(#hub-shadow)"
                  />
                </svg>

                {/* Inner White Circular Disk Content (Positioned over the white SVG circle) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[74%] h-[74%] rounded-full p-4 sm:p-6 flex flex-col items-center justify-center text-center z-10 select-text">
                  
                  {/* Step Tracker */}
                  <span
                    className="font-mono text-[8.5px] sm:text-[9.5px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white mb-1 shadow-2xs transition-colors"
                    style={{ backgroundColor: activeProblem.accentHex }}
                  >
                    STEP 0{activeProblem.step} &bull; CONSCIOUS BREAKTHROUGH
                  </span>

                  {/* Main Title matching bold style of Image 2 */}
                  <h3 className="text-sm sm:text-lg font-black text-[#122B1E] uppercase tracking-tight leading-snug max-w-[220px] sm:max-w-[250px]">
                    {activeProblem.breakthroughTitle}
                  </h3>

                  {/* Short Minimal Solution Description */}
                  <p className="mt-1 text-xs text-[#46385D] leading-snug font-medium max-w-[210px] sm:max-w-[240px]">
                    {activeProblem.solutionSummary}
                  </p>

                  {/* Compact Script Box */}
                  <div className="mt-2 p-1.5 sm:p-2 rounded-xl bg-amber-50/90 border border-amber-200/90 text-left w-full max-w-[210px] sm:max-w-[240px] shadow-2xs">
                    <p className="text-[10.5px] sm:text-[11.5px] italic font-serif text-[#1C1628] leading-tight">
                      {activeProblem.scriptQuote}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-2.5 flex items-center justify-center gap-2 w-full">
                    <Link
                      href={`/signup?role=individual&topic=${encodeURIComponent(`Parenting Mentorship - ${activeProblem.badgeTitle}`)}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
                      style={{ backgroundColor: activeProblem.accentHex }}
                    >
                      <span>Solve Challenge &rarr;</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleNextProblem}
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 3: 4 PILLARS OF THE MAIN PROBLEMS & CONSCIOUS BREAKTHROUGHS
          (Renamed and structured as requested by user)
         ========================================================================= */}
      <section id="problem-pillars" className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">
            Deep Problem Architecture
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#122B1E] mt-1 font-serif">
            4 Pillars of the Main Parenting Problems
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#415C4E] font-medium">
            Pehle dekhein asli psychological bottleneck kya hai, aur fir Pranav Mahajan ka actionable fix:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 select-text">
          {MAIN_PROBLEM_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl border border-emerald-900/10 bg-white/95 p-5 backdrop-blur-xl shadow-xs flex flex-col justify-between transition-all duration-300 hover:border-emerald-400 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-xs group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: pillar.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">0{idx + 1}</span>
                  </div>

                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-wider block mb-1"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.problemTag}
                  </span>

                  <h3 className="text-base font-bold text-[#122B1E] mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <div className="rounded-xl border border-rose-100 bg-[#FFF6F4] p-2.5 mb-2.5">
                    <span className="font-mono text-[9px] font-bold uppercase text-rose-700 block mb-0.5">
                      ❌ Bottleneck:
                    </span>
                    <p className="text-xs text-[#44222B] leading-relaxed font-medium">
                      {pillar.rootBottleneck}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-[#F2FBF6] p-2.5 mb-3">
                    <span className="font-mono text-[9px] font-bold uppercase text-[#065F46] block mb-0.5">
                      ✅ Conscious Fix:
                    </span>
                    <p className="text-xs text-[#183126] leading-relaxed font-semibold">
                      {pillar.consciousFix}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-emerald-900/10 flex items-center justify-between text-xs font-mono font-bold text-[#065F46]">
                  <span>{pillar.keyRule}</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: REAL-LIFE CRISIS DE-ESCALATION SIMULATOR */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 select-text">
        <div className="rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-white via-[#F9F7F2] to-emerald-50/40 p-6 sm:p-8 shadow-md">
          
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Real-Life Crisis Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122B1E] mt-1 font-serif">
              De-Escalation in the Heat of the Moment
            </h2>
            <p className="text-xs sm:text-sm text-[#415C4E] mt-0.5 font-medium">
              Click a scenario below to see the instant shift from conflict to connection:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CRISIS_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveCrisisId(scenario.id)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeCrisisId === scenario.id
                    ? 'bg-emerald-700 text-white shadow-sm -translate-y-0.5'
                    : 'bg-white border border-emerald-900/10 text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                <span>{scenario.title}</span>
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* The Trigger & Trap */}
            <div className="md:col-span-5 rounded-2xl border border-rose-200 bg-[#FFF5F2] p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-rose-700 block mb-1">
                  Trigger ({activeCrisis.tag})
                </span>
                <h3 className="text-base font-bold text-[#2A151B] mb-2.5">
                  {activeCrisis.trigger}
                </h3>
                <div className="rounded-xl border border-rose-200 bg-white/80 p-3">
                  <span className="font-mono text-xs font-bold uppercase text-rose-800 block mb-1">
                    ❌ The Instinctive Trap:
                  </span>
                  <p className="text-xs sm:text-sm text-[#44222B] leading-relaxed font-medium">
                    {activeCrisis.instinctTrap}
                  </p>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-rose-700">
                Result: Escalates fight &amp; damages trust
              </span>
            </div>

            {/* The Breakthrough Script */}
            <div className="md:col-span-7 rounded-2xl border border-emerald-300 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#059669] block mb-1">
                  ✅ The Grounded Protocol (What to Say):
                </span>
                <p className="text-base sm:text-lg text-[#122B1E] font-serif italic leading-relaxed my-2.5 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                  {activeCrisis.breakthroughScript}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-[#065F46]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Mental Shift: {activeCrisis.keyShift}</span>
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-emerald-900/10 flex items-center justify-between text-xs font-mono text-[#059669] font-bold">
                <span>Practiced in 1-on-1 Mentorship</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* EDITORIAL QUOTE & HUB NAVIGATION */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-10 text-center select-text">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-20 bg-emerald-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#059669]" />
          <span className="h-px w-20 bg-emerald-900/20" />
        </div>

        <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#122B1E] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Children do not learn from what we preach; they absorb who we are in moments of quiet pressure.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#059669]">
          — Pranav Mahajan &bull; Dimension 04
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/personal-development"
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#183126] shadow-xs transition hover:bg-white hover:border-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Personal Development</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#0F382B] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#154D3C]"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/social-relationships"
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#183126] shadow-xs transition hover:bg-white hover:border-emerald-400"
          >
            <span>Next: Social Relationships</span>
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
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0F382B] text-white shadow-2xl hover:bg-[#154D3C] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in"
          title="Back to Top"
        >
          <ArrowLeft className="h-5 w-5 rotate-90" />
        </button>
      )}

      <Footer />
    </div>
  );
}
