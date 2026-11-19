'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Brain,
  Target,
  Zap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Hourglass,
  Layers,
  Flame,
  ChevronRight,
  Compass,
  Check,
  ShieldAlert,
  Clock,
  Award,
  BookOpen,
  Activity,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 5 Purposeful Transformation Focuses (Mindset Calibration Matrix)
const CALIBRATION_FOCUSES = [
  {
    id: 'execution',
    number: '01',
    category: 'Execution',
    problem: 'Procrastination',
    solution: 'Kinetic Initiation',
    icon: Zap,
    frictionLevel: '82%',
    flowLevel: '18%',
    activeFlow: '94%',
    metricTag: '5-Minute Ignition Rule',
    tagline: 'From emotional avoidance to effortless kinetic momentum.',
    problemTitle: 'The "Someday" Procrastination Trap',
    problemQuote: 'You have clear goals, but when it is time to sit down and do the work, you clean your desk, check notifications, or plan endlessly.',
    problemRootCause: 'Procrastination is not laziness; it is emotional avoidance. Your nervous system perceives uncertainty as a threat and retreats to safe, easy dopamine.',
    problemSymptoms: [
      'Over-planning and researching instead of shipping real work',
      'Waiting for the "perfect mood" or spontaneous burst of inspiration',
      'Late-night guilt after another day of unfulfilled intentions',
    ],
    solutionTitle: 'The 5-Minute Kinetic Initiation Engine',
    solutionTag: 'Micro-Action Over Willpower',
    solutionDesc: 'Lower the physical threshold of initiation so low that your brain senses zero friction. You do not commit to finishing the project; you commit to only 300 seconds of mechanical motion.',
    solutionSteps: [
      'Define the physical first step (e.g. "Open blank document and type 1 sentence")',
      'Set a 5-minute timer with zero expectation of high quality',
      'Leverage kinetic momentum: 85% of people continue once the initiation barrier is broken',
    ],
    pranavMaxim: 'Action precedes motivation, never the reverse. You do not feel like doing it until you are already in motion.',
  },
  {
    id: 'habits',
    number: '02',
    category: 'Habits',
    problem: 'Inconsistency',
    solution: 'Atomic Systems',
    icon: Flame,
    frictionLevel: '76%',
    flowLevel: '24%',
    activeFlow: '91%',
    metricTag: 'Never Miss Twice',
    tagline: 'From boom-and-bust cycles to compounding identity habits.',
    problemTitle: 'The Boom-and-Bust Consistency Cycle',
    problemQuote: 'You get a massive burst of motivation, build an extreme routine, crush it for 4 days, then miss once and completely abandon it for weeks.',
    problemRootCause: 'Building habits around your peak motivation rather than your lowest baseline capacity. High-friction routines break the moment life pressure spikes.',
    problemSymptoms: [
      'The exhausting cycle of "restarting fresh" every Monday',
      'All-or-nothing perfectionism that ruins long-term momentum',
      'Frustration with feeling undisciplined despite good intentions',
    ],
    solutionTitle: 'Identity Architecture & "Never Miss Twice"',
    solutionTag: 'Systemic Compounding',
    solutionDesc: 'Shift from outcome-based goals to identity casting. Every micro-action is a vote for the person you wish to become. Make your worst-day minimum non-negotiable.',
    solutionSteps: [
      'Establish a "Bad Day Minimum": 2 pushups or 2 pages when completely exhausted',
      'Enforce the "Never Miss Twice" rule to protect compounding momentum',
      'Design your environment so good choices are obvious and distractions invisible',
    ],
    pranavMaxim: 'You do not rise to the level of your goals; you fall to the level of your daily friction-free systems.',
  },
  {
    id: 'focus',
    number: '03',
    category: 'Focus',
    problem: 'Distraction',
    solution: 'Monk-Mode Flow',
    icon: Brain,
    frictionLevel: '89%',
    flowLevel: '11%',
    activeFlow: '96%',
    metricTag: '90-Min Deep Block',
    tagline: 'From fragmented brain fog to sustained cognitive depth.',
    problemTitle: 'Fragmented Attention & Dopamine Fatigue',
    problemQuote: 'Your phone buzzes, you open 15 browser tabs, and your mind feels constantly scattered. You work 9 hours a day, yet high-value deep work never gets done.',
    problemRootCause: 'Continuous partial attention. High-frequency digital stimulation conditions the brain to crave cheap intermittent dopamine, eroding cognitive stamina.',
    problemSymptoms: [
      'Inability to read or write for 30 minutes without checking a device',
      'Compulsive multitasking that feels productive but produces nothing of depth',
      'Mental exhaustion at the end of the day without real accomplishment',
    ],
    solutionTitle: 'Monk-Mode Focus & Attention Architecture',
    solutionTag: 'Cognitive Sovereignty',
    solutionDesc: 'Reclaim your highest-leverage cognitive hours through pre-scheduled deep work sprints. Build physical and digital moats around your creative energy.',
    solutionSteps: [
      'Protect your first 90 minutes of the morning: Zero inputs, zero notifications',
      'Execute in 50-minute focused sprints followed by 10-minute somatic micro-walks',
      'Batch all low-value operational emails and messages into one afternoon block',
    ],
    pranavMaxim: 'Where your attention flows, your life compounds. Guard your morning attention like your most sacred asset.',
  },
  {
    id: 'self-belief',
    number: '04',
    category: 'Self-Belief',
    problem: 'Self-Doubt',
    solution: 'Earned Courage',
    icon: Target,
    frictionLevel: '79%',
    flowLevel: '21%',
    activeFlow: '88%',
    metricTag: 'Proof of Competence',
    tagline: 'From imposter paralysis to evidence-based self-efficacy.',
    problemTitle: 'Imposter Syndrome & Paralyzing Perfectionism',
    problemQuote: 'Even when you achieve results, an inner critic whispers: "You got lucky. Soon everyone will see through you." You hold back from stepping up.',
    problemRootCause: 'Comparing your messy internal experience with everyone else’s polished highlight reel. Confusing human self-worth with flawless external performance.',
    problemSymptoms: [
      'Holding back your work or ideas out of fear of criticism or failure',
      'Over-editing, tweaking endlessly, and never actually shipping',
      'Downplaying your genuine achievements and attributing them to luck',
    ],
    solutionTitle: 'Evidence-Based Self-Efficacy',
    solutionTag: 'Courage Before Confidence',
    solutionDesc: 'Confidence is not a personality trait you wait to inherit; it is an earned neurological byproduct of keeping small, consistent promises to yourself.',
    solutionSteps: [
      'Keep a daily "Proof of Competence" log of finished actions and small wins',
      'Reframe fear as somatic readiness: Butterflies simply mean your nervous system cares',
      'Adopt the "Version 1.0" mindset: Shipping imperfect work beats perfect ideas that stay hidden',
    ],
    pranavMaxim: 'Confidence does not arrive before the leap. Courage leads, action follows, and confidence is the receipt.',
  },
  {
    id: 'clarity',
    number: '05',
    category: 'Clarity',
    problem: 'Directionless',
    solution: 'Clear North Star',
    icon: Compass,
    frictionLevel: '84%',
    flowLevel: '16%',
    activeFlow: '93%',
    metricTag: '90-Day Vision Sprints',
    tagline: 'From aimless treadmill grinding to laser-focused strategic execution.',
    problemTitle: 'The Aimless Treadmill & Vague Life Goals',
    problemQuote: 'Working hard every single week, but secretly wondering: "What am I actually building toward?" Life feels like a repeating loop without deep purpose.',
    problemRootCause: 'Living by default rather than by design. Fulfilling the expectations of society, family, and peers instead of articulating your authentic personal values.',
    problemSymptoms: [
      'Vague resolutions like "be successful" or "be happy" with no clear roadmap',
      'Feeling emotionally disconnected from your daily grind and tasks',
      'A lingering sense of quiet existential restlessness and missed potential',
    ],
    solutionTitle: 'The 3-Year Vision & 90-Day Sprint Framework',
    solutionTag: 'Strategic Life Blueprint',
    solutionDesc: 'Bridge the gap between massive long-term aspirations and immediate weekly action through recursive quarterly sprint planning.',
    solutionSteps: [
      'Clarify your 3 non-negotiable core life values (e.g. Freedom, Mastery, Contribution)',
      'Set ONE dominant quarterly priority that moves your life needle the furthest',
      'Conduct a 15-minute Sunday retrospective audit to align calendar with stated priorities',
    ],
    pranavMaxim: 'If you do not deliberately design your life architecture, someone else will recruit you to build theirs.',
  },
];

// The 24-Hour Personal Operating System
const DAILY_OS_ROUTINE = [
  {
    time: '06:30 – 08:30',
    title: 'The Morning Cognitive Fortress',
    phase: 'Input-Free Prime Time',
    icon: SunriseIcon,
    accent: '#D97706',
    principle: 'Protect the first 90 minutes from incoming digital noise. The subconscious brain is in high neuroplasticity.',
    action: '10-minute natural sunlight walk + 50-minute deep work sprint on your #1 highest leverage task.',
  },
  {
    time: '10:00 – 13:00',
    title: 'High-Leverage Execution Block',
    phase: 'The Rule of 3',
    icon: Zap,
    accent: '#7C3AED',
    principle: 'Execute the single task that makes everything else easier or unnecessary. Stop spreading energy across 20 shallow tabs.',
    action: 'Turn phone to Do-Not-Disturb and complete your primary needle-moving deliverable before lunch.',
  },
  {
    time: '15:00 – 16:30',
    title: 'Kinetic Reset & Admin Batching',
    phase: 'Low-Friction Clearing',
    icon: Activity,
    accent: '#059669',
    principle: 'Circadian energy dips naturally here. Do not fight it with excessive caffeine; shift to physical movement and batch low-friction logistics.',
    action: '20-minute brisk walk, hydration with minerals, followed by batching all emails and messages in one go.',
  },
  {
    time: '21:00 – 22:30',
    title: 'The Evening Retrospective & Decompression',
    phase: 'Friction Removal',
    icon: Clock,
    accent: '#4F46E5',
    principle: 'Tomorrow begins tonight. Removing friction before sleeping ensures you wake up with zero decision fatigue.',
    action: '5-minute "Brain Dump" journal, identify tomorrow’s ONE priority, and initiate digital sunset.',
  },
];

function SunriseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v6" />
      <path d="m4.93 10.93 4.24-4.24" />
      <path d="m19.07 10.93-4.24-4.24" />
      <path d="M2 18h20" />
      <path d="M20 18a8 8 0 0 0-16 0" />
    </svg>
  );
}

// 6 Mental Models of Personal Mastery
const MENTAL_MODELS = [
  {
    title: 'The 1% Micro-Compounding Law',
    rule: 'Small shifts compound exponentially',
    desc: 'Improving by 1% each day makes you 37 times better in 365 days. Excellence is not an explosion; it is compounding interest on quiet daily choices.',
  },
  {
    title: 'The Inversion Principle',
    rule: 'Avoid stupidity before chasing brilliance',
    desc: 'Instead of asking "How do I become legendary?", ask: "What are the 3 daily habits that guarantee failure?" Systematically eliminate those first.',
  },
  {
    title: 'The "Never Miss Twice" Rule',
    rule: 'Protecting the habit identity',
    desc: 'Missing once is an accident; missing twice is the start of a brand new habit. When life derails your day, execute a 2-minute micro-version.',
  },
  {
    title: 'Kinetic Initiation Law',
    rule: 'Action precedes motivation',
    desc: 'Your brain cannot differentiate between mechanical motion and genuine motivation. Move your body for 300 seconds and motivation rushes in to match it.',
  },
  {
    title: 'Energy Over Time Management',
    rule: 'Match task intensity to biological peak',
    desc: 'You do not have a time problem; you have an energy allocation problem. Schedule your hardest creative work when cognitive reserves are at 100%.',
  },
  {
    title: 'Radical Personal Agency',
    rule: 'Absolute accountability for response',
    desc: 'You are not responsible for the conditions you inherited, but you are 100% accountable for how you respond today. Own the gap between stimulus and response.',
  },
];

export default function PersonalDevelopmentView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFocus, setActiveFocus] = useState(CALIBRATION_FOCUSES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeOsPhase, setActiveOsPhase] = useState(DAILY_OS_ROUTINE[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollRootRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    if (scrollRootRef.current) {
      scrollRootRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Listen to scroll to show Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRootRef.current) {
        setShowScrollTop(scrollRootRef.current.scrollTop > 350);
      }
    };
    const el = scrollRootRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (scrollRootRef.current) {
      scrollRootRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Audio Play Simulation
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
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#FAF7F2] text-[#241E2F] antialiased selection:bg-purple-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Official Header (Clean, Stable, No color shift on scroll) */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-purple-900/10 bg-[#FAF7F2]/80 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none">
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
            href="/signup?role=individual&topic=Personal%20Development"
            className="inline-flex items-center justify-center rounded-full border border-purple-500/50 bg-[#2D1B4E] px-3.5 py-1.5 text-xs font-bold tracking-wide text-purple-200 shadow-[0_4px_16px_rgba(109,40,217,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-[#3B2366] hover:text-white sm:px-5 sm:py-2"
          >
            Sign Up
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-purple-500/30 bg-[#22153B] text-white shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-[#321F55] hover:border-purple-400 active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-purple-300" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-purple-100" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#A855F7]" />
                <span className="h-0.5 w-4 rounded-full bg-purple-100" />
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
        className={`fixed inset-0 z-40 bg-[#150D24]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-purple-900/15 bg-[#F6F2EC] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-purple-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#7C3AED]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#241E2F]">Personal Development</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-900/15 bg-white text-[#382D4A] transition hover:bg-[#EFE9E0]"
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
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#382D4A] transition hover:border-purple-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#7C3AED] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#ECE5DB] p-5">
          <p className="text-sm leading-6 text-[#45375B]">
            Ready to break through procrastination and master purposeful consistency?
          </p>
          <Link
            href="/signup?role=individual&topic=Personal%20Development"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#5B21B6] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#4C1D95]"
          >
            Start Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* HERO SECTION: Purposeful Light Editorial Canvas (Zero Background Image) */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Soft Purposeful Light Glowing Orbs (Warm Champagne & Soft Purple) */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[750px] rounded-full bg-gradient-to-b from-purple-200/50 via-amber-100/30 to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-10 h-[360px] w-[360px] rounded-full bg-violet-200/40 blur-[100px]" />
        <div className="pointer-events-none absolute top-32 left-10 h-[340px] w-[340px] rounded-full bg-amber-200/30 blur-[90px]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Main Hero Card & Headline */}
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Animated Floating Dimension Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-900/15 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-xs mb-4 transition hover:scale-105 hover:bg-white hover:border-purple-400">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5B21B6]">
                Dimension 02 &bull; Purpose &amp; Personal Agency
              </span>
            </div>

            {/* Purposeful Editorial Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.12] font-serif text-[#1C1628]">
              Personal Growth &amp; <br />
              <span className="bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#D97706] bg-clip-text text-transparent">
                Purposeful Mastery.
              </span>
            </h1>

            {/* Crisp Frosted Tagline */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-purple-900/10 bg-white/85 px-4 py-2 backdrop-blur-md shadow-xs">
              <span className="text-[#7C3AED] text-sm">✦</span>
              <p className="text-xs sm:text-sm font-medium text-[#382D4A] leading-relaxed">
                Transform vague intentions into friction-free daily discipline, sharpen focus, and construct a life of deep personal agency.
              </p>
            </div>

            {/* Interactive Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
              {/* Audio Reflection Button */}
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Pause growth reflection' : 'Listen to 1-minute growth reflection'}
                className={`group flex items-center gap-2.5 rounded-full border border-purple-900/15 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-purple-400 ${
                  isPlayingAudio ? 'ring-2 ring-purple-400 bg-purple-50' : ''
                }`}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] text-white shadow-xs">
                  {isPlayingAudio ? (
                    <Pause className="h-3 w-3 animate-pulse" />
                  ) : (
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  )}
                </div>
                <span className="text-xs font-bold text-[#1C1628]">
                  {isPlayingAudio ? 'Playing Reflection...' : 'Listen Intro'}
                </span>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className={`h-2.5 w-0.5 rounded-full bg-[#7C3AED] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                  <span className={`h-3.5 w-0.5 rounded-full bg-[#7C3AED] ${isPlayingAudio ? 'animate-bounce' : 'opacity-40'}`} />
                  <span className={`h-2 w-0.5 rounded-full bg-[#7C3AED] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                </div>
              </button>

              {/* Primary CTA Button */}
              <Link
                href="/signup?role=individual&topic=Personal%20Development"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#5B21B6] via-[#6D28D9] to-[#7C3AED] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_25px_rgba(91,33,182,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(91,33,182,0.4)] active:scale-95"
              >
                <span>Start Your Growth Journey</span>
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </Link>
            </div>

            {/* Active Audio Card Preview */}
            {isPlayingAudio && (
              <div className="mt-4 mx-auto flex items-center gap-3 rounded-2xl border border-purple-400/40 bg-white/95 p-3.5 shadow-md backdrop-blur-md max-w-md animate-in fade-in slide-in-from-top-2 text-left">
                <Volume2 className="h-4 w-4 text-[#7C3AED] animate-pulse shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#1C1628]">Purpose &amp; Agency &bull; Pranav Mahajan</p>
                  <p className="text-[#514368] italic text-[11px]">&ldquo;Growth is not an accidental occurrence; it is the natural consequence of consistent curiosity and disciplined agency.&rdquo;</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ULTRA-MODERN ANIMATED MINDSET CALIBRATION MATRIX (What the user requested) */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8">
        
        {/* Matrix Header with Live Pulse */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-ping" />
              <span>Interactive Calibration Station</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1628] font-serif mt-1">
              Mindset Calibration Matrix
            </h2>
            <p className="text-xs text-[#5B4C72] mt-0.5">
              5 Core Transformation Focuses &bull; Click to Calibrate from Friction to Agency
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-900/10 bg-white/80 px-3 py-1 shadow-2xs text-[10px] font-mono text-[#5B21B6] font-bold">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Active Focus: {activeFocus.category}</span>
          </div>
        </div>

        {/* 5 Animated Dynamic Focus Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CALIBRATION_FOCUSES.map((focus) => {
            const Icon = focus.icon;
            const isSelected = activeFocus.id === focus.id;
            return (
              <div
                key={focus.id}
                onClick={() => setActiveFocus(focus)}
                className={`group relative flex flex-col justify-between rounded-3xl p-4 sm:p-5 cursor-pointer transition-all duration-300 backdrop-blur-xl border ${
                  isSelected
                    ? 'bg-white border-[#7C3AED] shadow-[0_16px_36px_rgba(124,58,237,0.18)] -translate-y-1.5 ring-2 ring-purple-400/30'
                    : 'bg-white/75 border-purple-900/10 hover:bg-white hover:border-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1'
                }`}
              >
                {/* Top Number & Category */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-xs font-extrabold ${isSelected ? 'text-[#7C3AED]' : 'text-purple-400'}`}>
                      {focus.number}
                    </span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
                        isSelected ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-purple-100 text-[#7C3AED]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                    {focus.category}
                  </p>

                  {/* Dynamic Shift Indicator: Problem -> Solution */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-rose-700/80 line-through decoration-rose-400 text-[11px]">
                        {focus.problem}
                      </span>
                      <span className="text-purple-400 text-[10px] font-mono">➔</span>
                      <span className="font-extrabold text-[#1C1628] text-xs">
                        {focus.solution}
                      </span>
                    </div>

                    {/* Animated Flow Progress Bar */}
                    <div className="h-1.5 w-full bg-purple-100 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full transition-all duration-700 rounded-full ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-amber-500 w-[92%]'
                            : 'bg-purple-300 w-[40%]'
                        }`}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-tight text-[#5B4C72] line-clamp-2">
                    {focus.tagline}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="mt-4 pt-3 border-t border-purple-900/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                    {focus.metricTag}
                  </span>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                      isSelected ? 'bg-[#5B21B6] text-white' : 'bg-purple-100 text-[#7C3AED]'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE WORKSPACE: PROBLEM ➔ SOLUTION ARCHITECTURE (Purpose-Driven Scandinavian Split Studio) */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Transformation Studio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1628] mt-1 font-serif">
              {activeFocus.category}: The Friction Point &amp; The Purposeful Breakthrough
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#55476C] max-w-md">
            Pehle dekhein asli psychological bottleneck kya hai, aur fir Pranav Mahajan ka actionable execution framework dekhein.
          </p>
        </div>

        {/* Dual Split Console: Problem on Left (Warm Terracotta Card) vs Solution on Right (Crisp Royal Violet Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: THE FRICTION / PROBLEM (Warm Terracotta / Soft Rose Tint) */}
          <div className="lg:col-span-5 rounded-3xl border border-rose-300/60 bg-[#FFF5F2] p-6 sm:p-8 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700 shadow-xs">
                    <Hourglass className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-700">
                      The Friction Point
                    </span>
                    <h3 className="text-sm font-bold text-[#2A151B]">Asli Problem Kya Aati Hai?</h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-rose-800 bg-rose-200/60 px-2.5 py-1 rounded-full font-bold">
                  Bottleneck
                </span>
              </div>

              <h4 className="text-xl font-bold text-[#2A151B] font-serif mb-2">
                {activeFocus.problemTitle}
              </h4>

              <p className="text-xs sm:text-sm text-[#5B323D] italic leading-relaxed mb-5 bg-white/70 p-3.5 rounded-2xl border border-rose-200/70">
                &ldquo;{activeFocus.problemQuote}&rdquo;
              </p>

              <div className="rounded-2xl border border-rose-200 bg-white/80 p-4 mb-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  Why Willpower Fails (Root Cause)
                </span>
                <p className="text-xs text-[#44222B] leading-relaxed">
                  {activeFocus.problemRootCause}
                </p>
              </div>

              {/* Symptoms Checklist */}
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-2">
                  Real-Life Symptoms
                </span>
                <div className="space-y-2">
                  {activeFocus.problemSymptoms.map((sym, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-[#44222B]">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span className="leading-snug">{sym}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200/80 flex items-center justify-between text-xs text-rose-700 font-mono font-bold">
              <span>Status: High Resistance</span>
              <span>Solution Opposite &rarr;</span>
            </div>
          </div>

          {/* RIGHT: THE PURPOSEFUL BREAKTHROUGH / SOLUTION (Crisp Pearl White with Violet Accents) */}
          <div className="lg:col-span-7 rounded-3xl border border-purple-900/15 bg-white p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_45px_rgba(91,33,182,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-[#5B21B6] shadow-xs">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5B21B6]">
                      Pranav&apos;s Solution Framework
                    </span>
                    <h3 className="text-sm font-bold text-[#1C1628]">The Actionable Breakthrough</h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#5B21B6] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 font-bold">
                  {activeFocus.solutionTag}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-[#1C1628] font-serif mb-2">
                {activeFocus.solutionTitle}
              </h4>

              <p className="text-xs sm:text-sm text-[#46385D] leading-relaxed mb-5">
                {activeFocus.solutionDesc}
              </p>

              {/* 3 Actionable Execution Steps */}
              <div className="space-y-2.5 mb-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5B21B6] block">
                  3-Step Execution Protocol
                </span>
                {activeFocus.solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl bg-[#F8F5F0] p-3.5 border border-purple-900/5 transition hover:bg-white hover:shadow-xs"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[#5B21B6] text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#241E2F] font-semibold leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pranav Mahajan Coaching Maxim Box */}
              <div className="rounded-2xl border border-purple-900/10 bg-gradient-to-r from-purple-50 to-amber-50/60 p-4">
                <p className="text-xs italic text-[#2E1F47] font-serif leading-relaxed">
                  &ldquo;{activeFocus.pranavMaxim}&rdquo;
                </p>
                <p className="mt-1 text-[10px] font-mono font-bold uppercase text-[#7C3AED]">
                  — Pranav Mahajan &bull; Core Maxim
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-[#55476C] font-mono">
                Master this breakthrough in 1-on-1 mentorship
              </span>
              <Link
                href={`/signup?role=individual&topic=${encodeURIComponent(`Personal Development (${activeFocus.category} Focus)`)}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#5B21B6] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4C1D95] transition"
              >
                <span>Master {activeFocus.category} with Pranav</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE 24-HOUR PERSONAL OPERATING SYSTEM (Architecture of a High-Agency Day) */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
              <Clock className="h-3.5 w-3.5" />
              <span>Daily Cadence Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1628] mt-1 font-serif">
              The 24-Hour Personal Operating System
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#55476C] max-w-md">
            How high-agency individuals structure their hours to maximize deep work, eliminate afternoon fatigue, and protect mental clarity.
          </p>
        </div>

        {/* 4 Phase Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DAILY_OS_ROUTINE.map((routine, idx) => {
            const Icon = routine.icon;
            const isSelected = activeOsPhase.time === routine.time;
            return (
              <div
                key={idx}
                onClick={() => setActiveOsPhase(routine)}
                className={`group rounded-3xl p-5 sm:p-6 transition-all duration-300 backdrop-blur-xl border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#7C3AED] shadow-[0_16px_36px_rgba(124,58,237,0.12)] scale-[1.02]'
                    : 'bg-white/80 border-purple-900/10 hover:bg-white hover:border-purple-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-[#7C3AED]">
                      {routine.time}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-100 text-[#5B21B6] group-hover:scale-105 transition-transform">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full mb-2">
                    {routine.phase}
                  </span>

                  <h3 className="text-base font-bold text-[#1C1628] leading-snug">
                    {routine.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#55476C] leading-relaxed">
                    {routine.principle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/10 rounded-xl bg-[#FAF7F2] p-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5B21B6] block mb-0.5">
                    Micro-Habit Cue
                  </span>
                  <p className="text-[11px] font-semibold text-[#1C1628] leading-tight">
                    {routine.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: 6 MENTAL MODELS OF PRANAV MAHAJAN */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
            Cognitive Upgrades
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1628] mt-1 font-serif">
            6 Non-Negotiable Mental Models
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#55476C]">
            Core psychological principles that Pranav Mahajan installs during 1-on-1 mentorship to build unshakeable self-command:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MENTAL_MODELS.map((model, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-purple-900/10 bg-white/85 p-6 backdrop-blur-xl shadow-xs transition-all duration-300 hover:border-purple-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-extrabold text-[#7C3AED]">
                    MODEL 0{idx + 1}
                  </span>
                  <Award className="h-4 w-4 text-amber-500" />
                </div>

                <h3 className="text-base font-bold text-[#1C1628] leading-tight">
                  {model.title}
                </h3>

                <span className="inline-block mt-1 text-[11px] font-semibold text-[#5B21B6]">
                  {model.rule}
                </span>

                <p className="mt-2.5 text-xs text-[#55476C] leading-relaxed">
                  {model.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/10 flex items-center justify-between text-[11px] font-mono text-[#7C3AED]">
                <span>Tested in Practice</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 ARCHITECTURAL PILLARS OF HIGH-LEVERAGE LIVING */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
            Long-Term Compounding
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1628] mt-1 font-serif">
            The 4 Systems of Purposeful Living
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#55476C]">
            Systems beat willpower every single time. Build these 4 non-negotiable foundations:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Identity Architecture',
              icon: Brain,
              desc: 'Decide who you are first. Behavior follows self-concept; you cannot outperform your subconscious self-image.',
              keyRule: 'Cast daily identity votes',
            },
            {
              title: 'Friction Minimization',
              icon: Zap,
              desc: 'Design your physical environment so good habits require 1 step and distractions require 5 steps.',
              keyRule: 'Default to effortless action',
            },
            {
              title: 'Attention Sovereignty',
              icon: Target,
              desc: 'Protect high-leverage cognitive hours. Turn off the passive consumer state and enter the active creator state.',
              keyRule: 'Zero morning inputs',
            },
            {
              title: 'Accountability Audits',
              icon: TrendingUp,
              desc: 'Weekly 15-minute retrospective loops. Measure reality against intention with ruthless honesty and kindness.',
              keyRule: 'Audit every Sunday evening',
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl border border-purple-900/10 bg-white/85 p-6 backdrop-blur-xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-purple-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(109,40,217,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-[#5B21B6] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-purple-400">0{idx + 1}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#1C1628] mb-2 leading-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#55476C] leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-900/10 flex items-center justify-between text-[11px] font-mono font-bold text-[#5B21B6]">
                  <span>{pillar.keyRule}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EDITORIAL QUOTE & NAVIGATION SECTION */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 text-center">
        {/* Editorial Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-20 bg-purple-900/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
          <span className="h-px w-20 bg-purple-900/20" />
        </div>

        {/* Famous Quote */}
        <blockquote className="text-xl sm:text-2xl font-serif italic text-[#241E2F] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Growth is not an accidental occurrence; it is the natural consequence of consistent curiosity and disciplined agency.&rdquo;
        </blockquote>
        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
          — Pranav Mahajan &bull; Dimension 02
        </p>

        {/* Prev / Next & Hub Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/health-wellbeing"
            className="inline-flex items-center gap-2 rounded-full border border-purple-900/15 bg-white/80 px-5 py-2.5 text-xs font-bold text-[#382D4A] shadow-xs transition hover:bg-white hover:border-purple-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Prev: Health &amp; Wellbeing</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2 rounded-full bg-[#5B21B6] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#4C1D95]"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/love-relationships"
            className="inline-flex items-center gap-2 rounded-full border border-purple-900/15 bg-white/80 px-5 py-2.5 text-xs font-bold text-[#382D4A] shadow-xs transition hover:bg-white hover:border-purple-400"
          >
            <span>Next: Love &amp; Family Dynamics</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Floating Smooth Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-2xl hover:bg-[#4C1D95] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in"
          title="Back to Top"
        >
          <ArrowLeft className="h-5 w-5 rotate-90" />
        </button>
      )}

      <Footer />
    </div>
  );
}
