'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Sun,
  Moon,
  Eye,
  Heart,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  ChevronRight,
  Sliders,
  Check,
  Activity,
  Layers,
  Flame,
  Feather,
  BookOpen,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Signature Contemplative Breakthrough Modes
const SPIRITUAL_MODES = [
  {
    id: 'stillness',
    label: 'Witness Consciousness',
    tag: '01 • PRESENCE',
    accentColor: '#9333EA', // Amethyst Purple
    accentBg: 'bg-purple-50 border-purple-200 text-purple-900',
    icon: Eye,
    headingTheme: 'Witness Consciousness',
    rule: 'You are the awareness, not the thought',
    tip: 'Observe mental chatter without judgment. The moment you notice a frantic thought, you are already free from it.',
    radarLabel: 'Stillness Index: 99%',
    activePhrase: 'Rest as the silent observer (Sakshi Bhava). Thoughts are passing clouds; you are the vast, untouched sky.',
  },
  {
    id: 'stoicism',
    label: 'Radical Equanimity',
    tag: '02 • STOICISM',
    accentColor: '#C026D3', // Mystic Fuchsia
    accentBg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900',
    icon: Shield,
    headingTheme: 'Radical Equanimity',
    rule: 'Master the dichotomy of control',
    tip: 'Suffering lives in trying to control external events. Peace lives in taking 100% sovereign ownership of your internal response.',
    radarLabel: 'Emotional Poise: 97%',
    activePhrase: 'Decouple peace from outcomes. External chaos cannot touch a mind rooted in radical acceptance (Amor Fati).',
  },
  {
    id: 'inquiry',
    label: 'Existential Purpose',
    tag: '03 • MEANING',
    accentColor: '#D97706', // Sacred Gold
    accentBg: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: Compass,
    headingTheme: 'Existential Meaning',
    rule: 'An examined life creates quiet joy',
    tip: 'Face mortality courageously. Remembering that life is fleeting does not create depression; it eradicates trivial drama and reveals what truly matters.',
    radarLabel: 'Purpose Alignment: 98%',
    activePhrase: 'Who are you beneath your titles, possessions, and social masks? Live from your timeless core.',
  },
  {
    id: 'unity',
    label: 'Metaphysical Unity',
    tag: '04 • TRANSCENDENCE',
    accentColor: '#4F46E5', // Cosmic Indigo
    accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    icon: Sparkles,
    headingTheme: 'Cosmic Oneness',
    rule: 'Separation is an illusion',
    tip: 'Dissolve ego defensiveness. When you realize the same life-force animating you animates all beings, compassion becomes effortless.',
    radarLabel: 'Cosmic Coherence: 96%',
    activePhrase: 'See yourself in everyone you meet. Empathy is not a moral duty; it is the natural recognition of shared existence.',
  },
];

// 5 Real-World Existential & Philosophical Dilemmas vs Conscious Mentorship Solutions (Hero Selector)
const EXISTENTIAL_CHALLENGES = [
  {
    id: 'existential-dread',
    stageLabel: 'Mortality & Existential Dread',
    problem: 'Waking up at 3 AM paralyzed by the terrifying realization of mortality, impermanence, and the fleeting nature of time.',
    solution: 'The Impermanence Catalyst: Transforming death anxiety into deep reverence and fierce clarity for the present moment.',
    action: 'Practice 5 minutes of Memento Mori meditation at dawn; let impermanence strip away petty anxiety.',
    accent: '#9333EA',
    tag: '01 • EXISTENTIAL CLARITY',
  },
  {
    id: 'monkey-mind',
    stageLabel: 'Chronic Mental Chatter',
    problem: 'Compulsive overthinking, racing mental loops, and inner restlessness that ruin sleep and peace of mind.',
    solution: 'Witness Consciousness (Sakshi Bhava): Learning to observe mental noise without fighting it or identifying with it.',
    action: 'When overthinking strikes, ask inwardly: “To whom is this thought appearing?” Notice the silent listener.',
    accent: '#C026D3',
    tag: '02 • MENTAL STILLNESS',
  },
  {
    id: 'void-of-success',
    stageLabel: 'The Void of Material Success',
    problem: 'Achieving career milestones, money, and status, yet feeling an unsettling inner emptiness: “Is this all there is?”',
    solution: 'Transcendent Purpose Mapping: Shifting from external acquisition to internal self-knowledge and selfless contribution.',
    action: 'Anchor daily actions in service and creative mastery rather than chasing the next dopamine milestone.',
    accent: '#D97706',
    tag: '03 • PURPOSEFUL DEPTH',
  },
  {
    id: 'dogma-vs-nihilism',
    stageLabel: 'Dogma vs. Nihilistic Drift',
    problem: 'Feeling alienated by blind religious superstitions, yet falling into cold, hopeless modern nihilism where nothing matters.',
    solution: 'Rational Eastern Contemplation & Secular Stoicism: A rigorous philosophical path grounded in direct experiential wisdom.',
    action: 'Replace blind belief with direct self-inquiry and daily breath-centered meditation.',
    accent: '#4F46E5',
    tag: '04 • DIRECT INQUIRY',
  },
  {
    id: 'loss-and-grief',
    stageLabel: 'Loss, Grief & Resisting Change',
    problem: 'Experiencing sudden personal loss or heartbreak, and suffering intensely by desperately wishing reality were different.',
    solution: 'Radical Acceptance & Cosmic Trust: Embracing life’s natural cycles with profound tenderness, dignity, and unshakeable resilience.',
    action: 'Place hand on heart, exhale completely, and whisper: “I yield to reality. I honor what was, and I embrace what is.”',
    accent: '#E11D48',
    tag: '05 • EQUANIMITY IN LOSS',
  },
];

// 4 Core Philosophical & Metaphysical Engines (2x2 Bento Matrix)
const PHILOSOPHICAL_ARENAS = [
  {
    number: '01',
    themeName: 'Witness Consciousness',
    title: 'The Observer Protocol & Mental Stillness',
    category: 'INNER AWAKENING',
    accent: '#9333EA',
    icon: Eye,
    rootBottleneck: 'Believing you are your thoughts: mistaking every transient worry or narrative for absolute identity.',
    consciousFix: 'Disidentification Practice: Establishing the steady anchor of the detached observer (Sakshi Bhava).',
    keyRule: 'Thoughts are visiting guests; your true nature is the tranquil house',
    quote: 'Peace is not the absence of mental noise; it is the profound realization that you are the space in which noise appears and dissolves.',
    ctaTopic: 'Witness Consciousness & Meditation Mentorship',
    metrics: [
      { label: 'Mental Noise Reduction', val: '85%', status: 'Quiet Mind' },
      { label: 'Observer Stability', val: 'Unbroken', status: 'Witness Active' },
      { label: 'Daily Presence', val: '100%', status: 'Pure Being' },
    ],
  },
  {
    number: '02',
    themeName: 'Radical Equanimity',
    title: 'Philosophical Stoicism & The Art of Stillness',
    category: 'EMOTIONAL SOVEREIGNTY',
    accent: '#C026D3',
    icon: Shield,
    rootBottleneck: 'Emotional reactivity: blaming external people, economic downturns, and traffic for your internal turmoil.',
    consciousFix: 'The Dichotomy of Control: Drawing a razor-sharp boundary between what is yours to govern and what belongs to reality.',
    keyRule: 'Circumstances do not crush you; your uncalibrated expectations do',
    quote: 'Choose not to be harmed—and you won’t feel harmed. Don’t feel harmed—and you haven’t been.',
    ctaTopic: 'Philosophical Stoicism & Equanimity Mentorship',
    metrics: [
      { label: 'Reactivity Index', val: '0%', status: 'Zero Drama' },
      { label: 'Emotional Recovery', val: '< 30 sec', status: 'Instant Stillness' },
      { label: 'Sovereignty', val: 'Unshakeable', status: 'Master of Self' },
    ],
  },
  {
    number: '03',
    themeName: 'Existential Inquiry',
    title: 'Self-Inquiry & The Core Nature of Being',
    category: 'METAPHYSICAL DEPTH',
    accent: '#D97706',
    icon: Compass,
    rootBottleneck: 'Living on autopilot: spending decades climbing ladders without ever asking who is climbing and why.',
    consciousFix: 'The “Who Am I?” Inquiry: Penetrating through social conditioning to reveal the authentic, indestructible Self.',
    keyRule: 'An unexamined life is a borrowed existence. Know thyself first',
    quote: 'Your question is not what the meaning of life is; your question is how you can embody meaning in every single breath.',
    ctaTopic: 'Self-Inquiry & Existential Mentorship',
    metrics: [
      { label: 'Existential Clarity', val: '100%', status: 'Crystalline' },
      { label: 'Impermanence Fear', val: 'Transmuted', status: 'Sacred Awe' },
      { label: 'Authentic Purpose', val: 'Anchored', status: 'True North' },
    ],
  },
  {
    number: '04',
    themeName: 'Metaphysical Unity',
    title: 'Cosmic Oneness & Transcendent Compassion',
    category: 'UNIVERSAL HARMONY',
    accent: '#4F46E5',
    icon: Sparkles,
    rootBottleneck: 'The illusion of isolation: feeling lonely, alienated, and pitted against a hostile or indifferent universe.',
    consciousFix: 'Interconnected Coherence: Experiencing direct communion with nature, cosmos, and the consciousness of all beings.',
    keyRule: 'You are not a drop in the ocean; you are the entire ocean in a drop',
    quote: 'When the heart expands beyond the narrow prison of “me and mine”, the entire universe becomes your home.',
    ctaTopic: 'Metaphysical Unity & Compassion Mentorship',
    metrics: [
      { label: 'Cosmic Coherence', val: '98%', status: 'Unified Field' },
      { label: 'Compassion Stature', val: 'Effortless', status: 'Boundless' },
      { label: 'Inner Freedom', val: 'Absolute', status: 'Sovereign' },
    ],
  },
];

// 4 Real-Life High-Stakes Existential Dilemmas (Simulator)
const EXISTENTIAL_DILEMMAS = [
  {
    id: 'panic-mortality',
    title: 'Sudden Late-Night Panic Over Mortality',
    tag: 'EXISTENTIAL ANXIETY',
    scenario: 'Lying in bed at midnight when the sudden reality of death and the passing of loved ones hits like a wave of pure terror.',
    trap: 'Reaching frantically for your phone to doomscroll, self-medicating with distractions, or spiraling into helpless despair.',
    shift: 'Mortality is reality’s greatest teacher. Turn fear into profound gratitude for the miraculous fact that you are alive right now.',
    script: 'Place your hand over your beating heart. Feel its warm rhythm. Exhale slowly for 6 seconds and whisper: “I am here. Life is a finite, precious gift. I release fear and choose to inhabit this moment fully.”',
    accent: '#9333EA',
  },
  {
    id: 'meaningless-void',
    title: 'The “Nothing Matters” Nihilism Spiral',
    tag: 'NIHILISTIC CRISIS',
    scenario: 'Looking around at society’s rat race and feeling a heavy, cynical apathy: “In 100 years we’ll all be forgotten, so what’s the point?”',
    trap: 'Using cosmic scale as an excuse for laziness, bitterness, emotional coldness, and abandoning personal responsibility.',
    shift: 'Objective cosmic insignificance gives you absolute subjective freedom. If nothing is written, you are free to paint beauty.',
    script: 'Smile softly and reflect: “Because the universe does not impose a trivial script upon me, I am the conscious artist who chooses to bring kindness, excellence, and love into this room today.”',
    accent: '#C026D3',
  },
  {
    id: 'unfair-world',
    title: 'Rage & Grief Over Worldly Injustice',
    tag: 'PHILOSOPHICAL ANGUISH',
    scenario: 'Reading the news and feeling overwhelmed by cruelty, unfairness, and senseless tragedy in the world, becoming consumed by bitter rage.',
    trap: 'Allowing anger to poison your inner peace, fighting hostility with hostility, and becoming what you despise.',
    shift: 'Grief is the price of an open heart. Transform helpless outrage into targeted compassionate action in your immediate sphere.',
    script: '“I cannot single-handedly fix the entire world’s historical pain today. But I can ensure that the space around me is filled with integrity, kindness, and unshakeable light.”',
    accent: '#D97706',
  },
  {
    id: 'sudden-loss',
    title: 'Navigating Deep Personal Grief & Loss',
    tag: 'EMOTIONAL DE-ESCALATION',
    scenario: 'The loss of a cherished relationship, dream, or loved one leaves an aching crater in your chest.',
    trap: 'Trying to “fix” or intellectualize grief away, numb the pain, or build cynical emotional walls so you never feel hurt again.',
    shift: 'Grief is love with nowhere to go. Give it sacred space without collapsing into bitterness. Honor what was.',
    script: 'Sit in complete stillness. Allow tears to flow without judgment. Whisper: “Thank you for touching my life. The love we shared is eternal and cannot be erased by time.”',
    accent: '#4F46E5',
  },
];

export default function SpiritualityPhilosophyView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const activeMode = SPIRITUAL_MODES[activeModeIdx];
  const activeDilemma = EXISTENTIAL_DILEMMAS[activeDilemmaIdx];
  const activeChallenge = EXISTENTIAL_CHALLENGES[activeChallengeIdx];

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
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#FAF5FF] text-[#3B0764] antialiased selection:bg-purple-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Ambient Spiritual Mesh Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[700px] rounded-full bg-gradient-to-b from-purple-300/25 via-fuchsia-200/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[600px] rounded-full bg-gradient-to-b from-amber-300/20 via-orange-200/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[550px] rounded-full bg-gradient-to-t from-indigo-300/15 via-purple-100/10 to-transparent blur-[120px]" />
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
        className={`fixed inset-0 z-40 bg-[#3B0764]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-purple-900/15 bg-[#FAF5FF] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-purple-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#9333EA]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#3B0764]">Spirituality &amp; Metaphysics</p>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-900/15 bg-white text-[#3B0764] transition hover:bg-[#F3E8FF] cursor-pointer"
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
            { href: '/individual/professional-development', label: '07 Professional & Financial Sovereignty' },
            { href: '/individual/spirituality-philosophy', label: '08 Spirituality & Metaphysics' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#3B0764] transition hover:border-purple-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#9333EA] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#F3E8FF] p-5 border border-purple-200">
          <p className="text-sm leading-6 text-[#581C87] font-medium">
            Ready to dissolve existential anxiety, master the witness consciousness, and live with deep philosophical peace?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#9333EA] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#7E22CE]"
          >
            Claim Spiritual Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION WITH REALISTIC PANORAMIC BACKGROUND & MULTI-AGE SEEKERS
         ========================================================================= */}
      <section className="relative z-10 min-h-[94vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 select-text overflow-hidden">
        {/* Full-Bleed Photorealistic Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/spirituality-philosophy-hero.jpg"
            alt="Spirituality, Metaphysics, Philosophy & Questions of Existence"
            className="h-full w-full object-cover object-center lg:object-right"
          />
          {/* Top Luminous White Mist Overlay */}
          <div className="absolute inset-x-0 top-0 h-44 sm:h-60 bg-gradient-to-b from-white/85 via-white/35 to-transparent pointer-events-none" />
          {/* Luminous Soft White/Amethyst Mist Gradient Overlay for crystal clear readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:w-[70%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5FF] via-[#FAF5FF]/30 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Vision, Problem/Solution Interactive Explorer & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
              {/* Live Indicator Chip */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-3.5 py-1.5 border border-purple-200/90 shadow-2xs w-fit mb-3.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9333EA]" />
                </span>
                <span className="font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#9333EA]">
                  Witness Consciousness &bull; Existential Sovereignty
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[#3B0764] font-serif leading-[1.12] tracking-tight">
                Awaken the Observer. <br />
                <span className="bg-gradient-to-r from-[#9333EA] via-[#C026D3] to-[#D97706] bg-clip-text text-transparent">
                  Dissolve the Chaos.
                </span>
              </h1>

              {/* Minimal Punchy Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-[#581C87] leading-relaxed max-w-xl font-medium">
                From existential dread, chronic overthinking, and feeling untethered in a noisy world to unshakeable inner tranquility, witness consciousness, and grounded philosophical sovereignty.
              </p>

              {/* 5 Real Existential Dilemmas vs Conscious Solutions Selector */}
              <div className="mt-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#581C87]">
                    Existential Inquiries vs. Contemplative Breakthroughs:
                  </span>
                  <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    5 Dimensions
                  </span>
                </div>

                {/* Stage Tabs */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {EXISTENTIAL_CHALLENGES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveChallengeIdx(idx)}
                      className={`text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                        activeChallengeIdx === idx
                          ? 'bg-[#3B0764] text-white shadow-sm scale-102 ring-2 ring-purple-400/50'
                          : 'bg-white/90 border border-purple-200/90 text-[#3B0764] hover:bg-white hover:border-purple-400'
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
                          The Existential Friction:
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
                          Contemplative Breakthrough:
                        </span>
                      </div>
                      <p className="text-xs text-[#3B0764] font-semibold leading-relaxed">
                        {activeChallenge.solution}
                      </p>
                    </div>
                  </div>

                  {/* Immediate Actionable Micro-Step */}
                  <div className="mt-2.5 pt-2 border-t border-purple-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#581C87] font-medium">
                      🎯 <strong className="text-[#3B0764]">Direct Contemplative Action:</strong> {activeChallenge.action}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9333EA] via-[#C026D3] to-[#7E22CE] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(147,51,234,0.5)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Claim 1-on-1 Spiritual Mentorship</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#metaphysical-cockpit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-3 text-xs sm:text-sm font-bold text-[#3B0764] border border-purple-200/90 shadow-2xs hover:bg-white hover:border-purple-400 transition-all cursor-pointer"
                >
                  <span>Metaphysical Cockpit &darr;</span>
                </a>

                <a
                  href="#philosophical-engines"
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-3 text-xs sm:text-sm font-bold text-[#9333EA] hover:text-[#7E22CE] transition-all cursor-pointer"
                >
                  <span>4 Philosophical Engines</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Kept completely open so the photorealistic multi-generational Indian seekers in the background photograph are unobstructed */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: THE 4 PHILOSOPHICAL ENGINES (2x2 BENTO MATRIX)
         ========================================================================= */}
      <section id="philosophical-engines" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-14 sm:py-20 scroll-mt-16 select-text">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 border border-purple-200/80 shadow-xs mb-3">
            <span className="h-2 w-2 rounded-full bg-[#9333EA] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#9333EA]">
              Metaphysical Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B0764] font-serif tracking-tight">
            The 4 Engines of Philosophical Sovereignty
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#581C87] font-medium max-w-2xl mx-auto">
            Architected to liberate your consciousness from reactive anxiety into unshakable stillness, timeless equanimity, and boundless meaning:
          </p>
        </div>

        {/* 2x2 Bento Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {PHILOSOPHICAL_ARENAS.map((arena, idx) => {
            const Icon = arena.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-8 border border-purple-900/10 bg-gradient-to-br from-white via-[#FAF5FF] to-purple-50/20 backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(147,51,234,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(147,51,234,0.2)] transition-all duration-300 flex flex-col justify-between"
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
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#3B0764] font-serif leading-snug mb-3">
                    {arena.title}
                  </h3>

                  {/* High-Tech Interactive Code-Based Telemetry Widget */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                        Consciousness Calibration
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

                  {/* 1-Line Psychological Bottleneck Card */}
                  <div className="rounded-xl border border-rose-200/80 bg-rose-50/60 p-3 mb-2.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                      <span className="font-mono text-[9.5px] font-bold uppercase text-rose-700 tracking-wider">
                        The Existential Bottleneck
                      </span>
                    </div>
                    <p className="text-xs text-[#3E161D] font-medium leading-relaxed pl-5">
                      {arena.rootBottleneck}
                    </p>
                  </div>

                  {/* 1-Line Conscious Fix Card */}
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
                        Contemplative Protocol
                      </span>
                    </div>
                    <p className="text-xs text-[#3B0764] font-semibold leading-relaxed pl-5">
                      {arena.consciousFix}
                    </p>
                  </div>

                  {/* Timeless Wisdom Law Quote */}
                  <div
                    className="rounded-lg border-l-3 pl-3 py-1 mb-5 bg-purple-50/50"
                    style={{ borderLeftColor: arena.accent }}
                  >
                    <p className="text-xs italic font-serif text-[#581C87] leading-snug">
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
          SCREEN 3: HIGH-STAKES EXISTENTIAL & PHILOSOPHICAL DILEMMA SIMULATOR
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="rounded-3xl border border-purple-900/15 bg-gradient-to-br from-white via-[#FAF5FF] to-purple-50/50 p-6 sm:p-9 shadow-md">
          
          <div className="max-w-2xl mb-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#9333EA]">
              <Zap className="h-4 w-4 text-purple-600" />
              <span>Contemplative Simulation &bull; Transcendent Poise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B0764] mt-1 font-serif">
              Inner Peace Under Existential Storms
            </h2>
            <p className="text-xs sm:text-sm text-[#581C87] mt-1 font-medium">
              Click any existential challenge below to view the word-for-word contemplative shift into unshakeable serenity:
            </p>
          </div>

          {/* Dilemma Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {EXISTENTIAL_DILEMMAS.map((dilemma, idx) => (
              <button
                key={dilemma.id}
                type="button"
                onClick={() => setActiveDilemmaIdx(idx)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeDilemmaIdx === idx
                    ? 'bg-[#3B0764] text-white shadow-sm -translate-y-0.5'
                    : 'bg-white border border-purple-900/10 text-[#3B0764] hover:bg-purple-50'
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
                  Existential Friction ({activeDilemma.tag})
                </span>
                <h3 className="text-base font-bold text-[#2A151B] mb-2.5">
                  {activeDilemma.scenario}
                </h3>
                <div className="rounded-xl border border-rose-200 bg-white/85 p-3">
                  <span className="font-mono text-xs font-bold uppercase text-rose-800 block mb-1">
                    ❌ The Reactive Ego Trap:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4C1D24] leading-relaxed font-medium">
                    {activeDilemma.trap}
                  </p>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-rose-700">
                Result: Spikes dread, feeds compulsive distraction &amp; traps mind in despair
              </span>
            </div>

            {/* The Grounded Protocol */}
            <div className="md:col-span-7 rounded-2xl border border-purple-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#9333EA] block mb-1">
                  ✅ The Sovereign Contemplative Shift (What to Do &amp; Whisper):
                </span>
                <p className="text-base sm:text-lg text-[#3B0764] font-serif italic leading-relaxed my-3 bg-purple-50/60 p-4 rounded-xl border border-purple-100">
                  {activeDilemma.script}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-[#7E22CE]">
                  <CheckCircle2 className="h-4 w-4 text-[#9333EA] shrink-0" />
                  <span>Cognitive Shift: {activeDilemma.shift}</span>
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-purple-900/10 flex items-center justify-between text-xs font-mono text-[#9333EA] font-bold">
                <span>Practiced in 1-on-1 Spiritual Mentorship</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 4: SUPERSTITIOUS DOGMA VS. PRANAV MAHAJAN PHILOSOPHICAL SOVEREIGNTY
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#9333EA]">
            The Structural Paradigm Shift
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3B0764] mt-1 font-serif">
            Why Blind Dogma Fails vs. Why Contemplation Liberates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Superstitious Dogma & Spiritual Bypassing */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-mono font-bold text-slate-600 mb-4">
              <span>Dogmatic Superstition &amp; Spiritual Bypassing</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Demands blind adherence to rigid superstitions and fear-based theological doctrines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Uses spiritual clichés to suppress real grief, trauma, and psychological suffering.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Outsources personal morality and critical inquiry to external gurus and institutions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Leaves seekers defenseless when real-life tragedy strikes, leading to bitter disillusionment.</span>
              </li>
            </ul>
          </div>

          {/* Pranav Mahajan Contemplative Mentorship */}
          <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50/70 via-white to-fuchsia-50/50 p-6 sm:p-8 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#9333EA] px-3.5 py-1 text-xs font-mono font-bold text-white mb-4">
              <span>Pranav Mahajan Contemplative Mentorship</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#3B0764] font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#9333EA] shrink-0 mt-0.5" />
                <span>Direct witness consciousness: verify truth experimentally through silent, rigorous observation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#9333EA] shrink-0 mt-0.5" />
                <span>Stoic equanimity: embrace life’s inevitable pain without generating unnecessary psychological suffering.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#9333EA] shrink-0 mt-0.5" />
                <span>Courageous existential inquiry: integrate mortality awareness to uncover your deepest authentic purpose.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#9333EA] shrink-0 mt-0.5" />
                <span>Metaphysical unity: live from quiet compassion and profound reverence for all conscious life.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl border border-purple-900/15 bg-gradient-to-r from-[#3B0764] via-[#581C87] to-[#3B0764] p-8 sm:p-12 text-center text-white shadow-xl max-w-4xl mx-auto">
          <Sparkles className="h-10 w-10 text-amber-300 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-4xl font-extrabold font-serif mb-3">
            Discover Unshakeable Inner Stillness
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto mb-6">
            Schedule a personalized 1-on-1 spiritual mentorship session with Pranav Mahajan to explore existential inquiry, master witness consciousness, and live with deep philosophical peace.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-fuchsia-300 to-purple-300 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start 1-on-1 Spiritual Mentorship &rarr;</span>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION: METAPHYSICAL COCKPIT (Interactive Telemetry & Stillness Gauge)
          Relocated to bottom to keep Screen 1 airy and panoramic
         ========================================================================= */}
      <section id="metaphysical-cockpit" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 scroll-mt-20 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 border border-purple-200/90 shadow-2xs mb-2">
            <Activity className="h-3.5 w-3.5 text-[#9333EA]" />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#9333EA]">
              Interactive Cockpit &bull; Live Telemetry
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3B0764] font-serif">
            Contemplative Stasis &amp; Awareness Cockpit
          </h2>
          <p className="text-xs sm:text-sm text-[#581C87] mt-1">
            Toggle between the 4 contemplative modes to calibrate your witness consciousness, stoic equanimity, and metaphysical coherence.
          </p>
        </div>

        {/* 4 Mode Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {SPIRITUAL_MODES.map((mode, idx) => {
            const Icon = mode.icon;
            const isSelected = activeModeIdx === idx;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveModeIdx(idx)}
                className={`flex items-center gap-2 p-3 rounded-2xl border text-left transition-all duration-300 shadow-2xs cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#9333EA] ring-2 ring-purple-200 scale-102 shadow-sm'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-purple-300'
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
        <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#FAF5FF] to-purple-50/40 border border-purple-200/90 shadow-[0_20px_50px_-15px_rgba(147,51,234,0.18)] overflow-hidden">
          {/* Ambient Mesh Glow behind widget */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-700"
            style={{ backgroundColor: activeMode.accentColor }}
          />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-fuchsia-400/20 blur-3xl pointer-events-none" />

          {/* Top System Status Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-purple-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: activeMode.accentColor }}
                />
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                Awareness State: {activeMode.headingTheme}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 border border-purple-200/80 text-[10.5px] font-mono font-bold text-[#9333EA]">
              <Sparkles className="h-3 w-3" />
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
                  activeModeIdx === 0 ? '45' : activeModeIdx === 1 ? '30' : activeModeIdx === 2 ? '15' : '35'
                }
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />

              {/* Secondary Amber Inner Arc */}
              <circle
                cx="50"
                cy="50"
                r="34"
                stroke="#D97706"
                strokeWidth="3.5"
                strokeDasharray="213"
                strokeDashoffset="50"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Core Disc */}
            <div className="absolute flex flex-col items-center justify-center text-center p-4 rounded-full w-36 h-36 sm:w-40 sm:h-40 bg-white/95 border border-purple-100 shadow-xl backdrop-blur-md">
              <div
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl text-white shadow-md transition-all duration-500 mb-1"
                style={{ backgroundColor: activeMode.accentColor }}
              >
                {React.createElement(activeMode.icon, { className: 'h-5 w-5' })}
              </div>
              <span className="font-mono text-base sm:text-lg font-black text-slate-900 leading-none">
                {activeModeIdx === 0
                  ? '99.4%'
                  : activeModeIdx === 1
                  ? '100%'
                  : activeModeIdx === 2
                  ? 'True North'
                  : 'Oneness'}
              </span>
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-400 mt-0.5">
                {activeModeIdx === 0
                  ? 'Witness Stasis'
                  : activeModeIdx === 1
                  ? 'Stoic Poise'
                  : activeModeIdx === 2
                  ? 'Existential Peace'
                  : 'Cosmic Field'}
              </span>
            </div>

            {/* Floating Satellite Telemetry Chips */}
            <div className="absolute -top-1 left-2 sm:left-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span>Theta Waves: 5.5 Hz</span>
            </div>

            <div className="absolute -bottom-1 right-2 sm:right-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Witness Depth: High</span>
            </div>
          </div>

          {/* 3-Stage Contemplative Roadmap */}
          <div className="mt-4 pt-3.5 border-t border-purple-100 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                Sovereign Contemplative Pathway
              </span>
              <span className="font-mono text-[10.5px] font-bold text-[#9333EA]">
                Awareness Cycle
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/90 text-center">
                <span className="font-mono text-[8.5px] text-slate-400 uppercase block">Stage 01</span>
                <span className="font-bold text-xs text-slate-800 block mt-0.5">Quieting Noise</span>
                <span className="text-[10px] text-slate-500 block truncate">Calm Breath</span>
              </div>

              <div className="rounded-xl bg-purple-50/70 p-2.5 border border-purple-200 text-center relative">
                <span className="font-mono text-[8.5px] text-[#9333EA] uppercase block font-bold">Stage 02</span>
                <span className="font-bold text-xs text-[#3B0764] block mt-0.5">Stable Witness</span>
                <span className="text-[10px] text-purple-700 font-semibold block truncate">Disidentification</span>
              </div>

              <div className="rounded-xl bg-amber-50/70 p-2.5 border border-amber-200 text-center">
                <span className="font-mono text-[8.5px] text-amber-600 uppercase block font-bold">Stage 03</span>
                <span className="font-bold text-xs text-amber-950 block mt-0.5">Sovereign Freedom</span>
                <span className="text-[10px] text-amber-700 font-semibold block truncate">Cosmic Peace</span>
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
          <span className="h-px w-20 bg-purple-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#9333EA]" />
          <span className="h-px w-20 bg-purple-900/20" />
        </div>

        <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#3B0764] max-w-2xl mx-auto leading-relaxed">
          &ldquo;The unexamined life may not be worth living, but the deeply examined life opens into infinite quiet joy and boundless freedom.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9333EA]">
          — Pranav Mahajan &bull; Dimension 08
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/professional-development"
            className="inline-flex items-center gap-2.5 rounded-full border border-purple-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#3B0764] shadow-xs transition hover:bg-white hover:border-purple-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Professional &amp; Wealth</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#9333EA] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#7E22CE] cursor-pointer"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/technology-literacy"
            className="inline-flex items-center gap-2.5 rounded-full border border-purple-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#3B0764] shadow-xs transition hover:bg-white hover:border-purple-400 cursor-pointer"
          >
            <span>Technology Literacy</span>
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
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#9333EA] text-white shadow-2xl hover:bg-[#7E22CE] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in cursor-pointer"
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
