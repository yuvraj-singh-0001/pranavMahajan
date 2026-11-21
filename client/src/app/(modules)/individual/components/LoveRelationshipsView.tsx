'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Heart,
  Users,
  MessageSquare,
  ShieldCheck,
  Home,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Lock,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Compass,
  ChevronRight,
  HeartHandshake,
  Activity,
  Flame,
  GraduationCap,
  Brain,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 6 Core Connected Journey Stages
const JOURNEY_STEPS = [
  {
    id: 'understanding-yourself',
    title: 'Understanding Yourself',
    category: 'Relationships',
    icon: Users,
    tag: 'Self-Awareness',
    description: 'Uncover your attachment style, emotional triggers, and core relational needs before projecting them onto your partner.',
    keyAction: 'Discover Your Attachment Pattern',
    wisdom: 'You cannot love another person with clarity until you understand the fears and unmet needs that drive your own reactions.',
  },
  {
    id: 'building-connection',
    title: 'Building Connection',
    category: 'Relationships',
    icon: HeartHandshake,
    tag: 'Attunement',
    description: 'Foster genuine vulnerability, presence, and daily emotional attunement that rekindles warmth and mutual appreciation.',
    keyAction: 'Practice Daily Emotional Check-ins',
    wisdom: 'Connection is not maintained by grandiose anniversaries, but by answering daily bids for attention with presence and warmth.',
  },
  {
    id: 'communication',
    title: 'Communication',
    category: 'Relationships',
    icon: MessageSquare,
    tag: 'De-escalation',
    description: 'Replace reactive defensiveness and silence with compassionate de-escalation, non-violent expression, and deep listening.',
    keyAction: 'Master 3-Minute Pause Technique',
    wisdom: 'In an argument, winning against your partner means your relationship has lost. Seek mutual clarity over personal victory.',
  },
  {
    id: 'marriage-partnership',
    title: 'Marriage & Partnership',
    category: 'Marriage',
    icon: Sparkles,
    tag: 'Long-term Alignment',
    description: 'Realign shared financial and life goals, rekindle physical and emotional intimacy, and navigate life transitions as one team.',
    keyAction: 'Align Shared Future Vision',
    wisdom: 'A lasting marriage requires falling in love many times—always with the same person as you both continually evolve.',
  },
  {
    id: 'family-dynamics',
    title: 'Family Dynamics',
    category: 'Family',
    icon: Home,
    tag: 'Harmony',
    description: 'Balance intergenerational roles, cultivate respectful in-law relationships, and parent with unified calm and stability.',
    keyAction: 'Establish Family Rhythm & Rituals',
    wisdom: 'Children do not learn from what we preach about family peace; they absorb how we treat each other under pressure.',
  },
  {
    id: 'healthy-boundaries',
    title: 'Healthy Boundaries',
    category: 'Boundaries',
    icon: ShieldCheck,
    tag: 'Protection',
    description: 'Protect your love, emotional reserves, and peace by defining clear, kind, and respected boundaries with grace.',
    keyAction: 'Define Loving Boundaries with Clarity',
    wisdom: 'Boundaries are the distance at which I can love both you and myself simultaneously without resentment.',
  },
];

// Interactive Quiz Data
const QUIZ_QUESTIONS = [
  {
    question: 'Where do you and your partner experience the most tension?',
    options: [
      { text: 'Recurring arguments where neither feels heard', pillar: 'Communication' },
      { text: 'Busy daily routines causing emotional distance', pillar: 'Intimacy' },
      { text: 'Differences regarding finances or future goals', pillar: 'Trust' },
      { text: 'Interference from extended family or in-laws', pillar: 'Boundaries' },
    ],
  },
  {
    question: 'When a disagreement arises, what is your most common reaction?',
    options: [
      { text: 'I become defensive or counter-criticize', pillar: 'Communication' },
      { text: 'I withdraw into silence and need space', pillar: 'Intimacy' },
      { text: 'I worry the foundation of our bond is threatened', pillar: 'Trust' },
      { text: 'I over-compromise and end up feeling resentful', pillar: 'Boundaries' },
    ],
  },
  {
    question: 'What single outcome would bring the greatest peace to your life right now?',
    options: [
      { text: 'Learning to de-escalate fights in under 5 minutes', pillar: 'Communication' },
      { text: 'Deep heartfelt connection and playful romantic spark', pillar: 'Intimacy' },
      { text: 'Complete mutual transparency, safety, and team loyalty', pillar: 'Trust' },
      { text: 'Clear personal boundaries that everyone respects lovingly', pillar: 'Boundaries' },
    ],
  },
];

// Real-Life Scenarios: Pyar, Jhagda, Shak, Overthinking, Student Romance, Family
const REAL_LIFE_SCENARIOS = [
  {
    id: 'pyar-connection',
    title: 'Do Logo Me Pyar & Deep Attachment',
    category: 'Pyar / Love',
    icon: Heart,
    tag: 'Emotional Attunement',
    issue: 'Jab dono me bohot pyar hai, lekin daily busy life, screen time aur routine me emotional warmth, deep baat-chit aur spark dheere-dheere kam hone lagti hai.',
    rootCause: 'Courtship needs intentional novelty; connection fades without conscious daily appreciation and emotional attunement.',
    solution: 'Daily 10-Minute Tech-Free Presence Ritual: Eye contact, listening without phones, and validating 1 genuine appreciation every single evening.',
  },
  {
    id: 'jhagda-conflict',
    title: 'Baat-Baat Par Jhagda & Ego Clashes',
    category: 'Jhagda / Fights',
    icon: Flame,
    tag: 'Conflict De-escalation',
    issue: 'Chhoti-chhoti baaton par heated argument shuru ho jana, purani गलतियां yaad dilana, aur ghanto ya dino tak silent treatment chalna.',
    rootCause: 'Defensive fight-or-flight reactivity. Ego seeks to "win" the fight, forgetting that winning against your partner means the relationship loses.',
    solution: 'The 3-Minute De-escalation Rule: Name the emotion instead of the blame. "Mujhe hurt feel ho raha hai, kya hum 15 min baad shaant hokar baat karein?"',
  },
  {
    id: 'shak-insecurity',
    title: 'Shak, Insecurity & Trust Breakdown',
    category: 'Shak / Doubt',
    icon: Lock,
    tag: 'Trust Rebuilding',
    issue: 'Partner par lagatar shak hona, phone check karne ki ichha hona, aur past ke betrayal ya darr ki wajah se andar hi andar darr rehna.',
    rootCause: 'Unhealed attachment trauma and deep fear of abandonment projecting threat vigilance onto current innocent interactions.',
    solution: 'Radical Compassionate Transparency: Agree on clear mutual digital boundaries without detective games, and replace interrogations with honest vulnerability.',
  },
  {
    id: 'overthinking-anxiety',
    title: 'Relationship Overthinking & Silent Anxiety',
    category: 'Overthinking',
    icon: Brain,
    tag: 'Anxious Attachment',
    issue: 'Unke ek late reply ya badle hue tone par ghanto overthink karna: "Kya unka pyar kam ho gaya? Kya wo mujhe chhod denge?"',
    rootCause: 'Anxious attachment loop where self-worth is entirely tied to immediate external reassurance and mind-reading.',
    solution: 'Reality Testing & Somatic Grounding: Stop mind-reading. Separate feelings from objective facts, take 3 physiological sighs, and communicate directly with calm clarity.',
  },
  {
    id: 'student-love',
    title: 'Student Love, College Romance & Future Tension',
    category: 'Student Love',
    icon: GraduationCap,
    tag: 'Youth Guidance',
    issue: 'College ya student life me relationship, padhai aur career pressure ke beech balance na hona, aur family/future ki chinta me confuse rehna.',
    rootCause: 'Adolescent emotional intensity without maturity frameworks. Confusing constant availability with real love, risking academic burnout.',
    solution: 'Mutual Elevation Blueprint: Real love respects your career goals. Set focused study hours together, maintain healthy independence, and grow as partners.',
  },
  {
    id: 'family-dynamics',
    title: 'Marriage, In-Laws & Family Expectations',
    category: 'Family & Marriage',
    icon: Home,
    tag: 'United Front',
    issue: 'Shaadi ke baad family ya in-laws ki unsolicited advice, interference, aur partner aur parivaar ke beech split loyalty me phans jana.',
    rootCause: 'Unclear primary allegiance. Spouses failing to establish a united front before responding to the family of origin.',
    solution: 'United Front Policy: Spouses always align in private first. The biological child gently sets boundaries with their own parents with love and respect.',
  },
];

// 4 Harmony Constellation Pillars
const HARMONY_PILLARS = [
  {
    id: 'trust',
    title: 'Trust & Safety',
    icon: Lock,
    accent: '#8C2438',
    summary: 'The bedrock of emotional safety. Rebuilt through consistent micro-commitments, radical honesty, and reliable loyalty.',
    prompt: 'Do you feel completely safe being vulnerable without fear of your partner weaponizing your past?',
  },
  {
    id: 'intimacy',
    title: 'Emotional & Physical Intimacy',
    icon: Heart,
    accent: '#D94363',
    summary: 'The warmth that binds two souls. Sustained through gentle curiosity, affectionate touch, and mutual adoration.',
    prompt: 'When was the last time you asked your partner a question about their dreams that you didn’t already know the answer to?',
  },
  {
    id: 'communication',
    title: 'Conscious Communication',
    icon: MessageSquare,
    accent: '#C58525',
    summary: 'Speaking with clarity and listening without defensiveness. Translating raw emotional pain into constructive requests.',
    prompt: 'Can you listen to your partner’s frustration without interrupting, justifying, or turning the blame back on them?',
  },
  {
    id: 'boundaries',
    title: 'Healthy Boundaries',
    icon: ShieldCheck,
    accent: '#4A6B53',
    summary: 'Preserving individual self-respect to prevent resentment. Saying clear "no" so your "yes" has true integrity.',
    prompt: 'Are you sacrificing your core values or peace to keep quiet harmony, breeding silent resentment underneath?',
  },
];

export default function LoveRelationshipsView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeStep, setActiveStep] = useState<typeof JOURNEY_STEPS[0]>(JOURNEY_STEPS[0]);
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(HARMONY_PILLARS[0]);
  const [activeScenario, setActiveScenario] = useState(REAL_LIFE_SCENARIOS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Quiz State
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const scrollRootRef = useRef<HTMLDivElement>(null);

  // Audio Play Simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setTimeout(() => {
        setIsPlayingAudio(false);
      }, 12000); // 12 seconds simulated ambient reflection
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio]);

  const handleQuizAnswer = (pillar: string) => {
    const nextScores = { ...quizScores, [pillar]: (quizScores[pillar] || 0) + 1 };
    setQuizScores(nextScores);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Find top pillar
      let maxPillar = 'Communication';
      let maxCount = 0;
      Object.entries(nextScores).forEach(([p, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxPillar = p;
        }
      });
      setQuizResult(maxPillar);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScores({});
    setQuizResult(null);
  };

  const filteredSteps = selectedFilter === 'All'
    ? JOURNEY_STEPS
    : JOURNEY_STEPS.filter((step) => step.category === selectedFilter || selectedFilter === 'Healing');

  return (
    <div
      ref={scrollRootRef}
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#FBF6F0] text-[#2A1D1A] antialiased selection:bg-rose-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Standard Official Header (Identical to all landing pages - No extra buttons) */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-rose-900/10 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none">
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
            href="/signup?role=individual&topic=Love%20Relationships%2C%20Marriage%20and%20Family%20Dynamics"
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-rose-500/50 bg-[#250810]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-rose-200 shadow-[0_4px_16px_rgba(180,40,70,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-rose-400 hover:bg-[#3D0F1B] hover:text-white sm:px-5 sm:py-2"
          >
            Sign Up
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-rose-500/30 bg-[#1A060C]/90 text-white shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-[#280A13] hover:border-rose-400 active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-rose-300" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-rose-100" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#E05A77]" />
                <span className="h-0.5 w-4 rounded-full bg-rose-100" />
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
        className={`fixed inset-0 z-40 bg-[#120407]/40 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-[#8E7650]/20 bg-[#FBF3EA] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between border-b border-rose-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#9E354F]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#2A1D1A]">Love & Relationships</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-900/20 bg-[#FFFBF7] text-[#4A322E] transition hover:bg-[#F3E5D8]"
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
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#3F2B28] transition hover:border-rose-900/15 hover:bg-[#FFFBF7]"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#9E354F] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#F0E2D4] p-5">
          <p className="text-sm leading-6 text-[#5A403C]">
            Ready to build steady emotional safety and mutual trust in your relationship?
          </p>
          <Link
            href="/signup?role=individual&topic=Love%20Relationships%2C%20Marriage%20and%20Family%20Dynamics"
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#581523] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#721B2E]"
          >
            Start Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* HERO SECTION: Panoramic Heart-Tree Landscape with Glassmorphism */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 lg:pb-18 px-4 sm:px-8 lg:px-12 2xl:px-18">

        {/* Background Panoramic Graphic Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90">
          <img
            src="/love-relationships-hero.jpg?v=2"
            alt="Love, Relationships, and Family Dynamics Mentorship Sanctuary"
            className="w-full h-full object-cover object-center filter saturate-[1.12] brightness-[1.02]"
          />
          {/* Warm Champagne & Rose Radial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF6F0] via-[#FBF6F0]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF6F0]/90 via-[#FBF6F0]/30 to-[#FBF6F0]/80" />
        </div>

        {/* Ambient Floating Flying Birds Decoration */}
        <div aria-hidden="true" className="absolute top-28 left-[38%] pointer-events-none opacity-40 hidden sm:block">
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            <path d="M5 20 Q15 10, 25 18 Q35 10, 45 20 Q35 15, 25 22 Q15 15, 5 20 Z" fill="#581523" opacity="0.6" />
            <path d="M55 12 Q63 4, 71 10 Q79 4, 87 12 Q79 8, 71 14 Q63 8, 55 12 Z" fill="#581523" opacity="0.45" />
            <path d="M90 25 Q96 19, 102 24 Q108 19, 114 25 Q108 22, 102 27 Q96 22, 90 25 Z" fill="#581523" opacity="0.35" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1680px] 2xl:max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-4">

            {/* Left Headline & Modern Animated Glass Card */}
            <div className="max-w-xl lg:max-w-2xl py-2">
              {/* Animated Floating Dimension Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-rose-900/15 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-xs mb-3 transition-all duration-300 hover:scale-105 hover:bg-white hover:border-rose-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-[#9E2038] to-[#E25372] text-white shadow-xs">
                  <Heart className="h-3 w-3 fill-current" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#7E1E32]">
                  Dimension 03 &bull; LifeTogether
                </span>
              </div>

              {/* Luxury Editorial Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#2B1218] leading-[1.14] font-serif">
                Love, Relationships, <br className="hidden sm:inline" />
                Marriage &amp; <br className="hidden sm:inline" />
                Family Dynamics<span className="text-[#C43855]">.</span>
              </h1>

              {/* Modern Minimal Tagline in Frosted Glass Pill */}
              <div className="mt-3.5 inline-flex items-center gap-2 rounded-2xl border border-rose-900/10 bg-white/80 px-4 py-2 backdrop-blur-md shadow-xs">
                <span className="text-[#C43855] text-sm">♡</span>
                <p className="text-xs sm:text-sm font-medium text-[#4A262D] leading-relaxed">
                  Build deeper intimacy, mutual trust, and healthy emotional boundaries that weather every life chapter.
                </p>
              </div>

              {/* Modern Interactive Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3.5">
                {/* Audio Guide Play Pill with Animated Waveform */}
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  aria-label={isPlayingAudio ? 'Pause reflection guidance' : 'Listen to 1-minute audio reflection'}
                  className={`group flex items-center gap-2.5 rounded-full border border-rose-800/20 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-rose-400 ${isPlayingAudio ? 'ring-2 ring-rose-400 bg-rose-50' : ''
                    }`}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#9E2038] to-[#E25372] text-white shadow-xs">
                    {isPlayingAudio ? (
                      <Pause className="h-3 w-3 animate-pulse" />
                    ) : (
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#4E1E28]">
                    {isPlayingAudio ? 'Playing Reflection...' : 'Listen Intro'}
                  </span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className={`h-2.5 w-0.5 rounded-full bg-[#C43855] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                    <span className={`h-3.5 w-0.5 rounded-full bg-[#C43855] ${isPlayingAudio ? 'animate-bounce' : 'opacity-40'}`} />
                    <span className={`h-2 w-0.5 rounded-full bg-[#C43855] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                  </div>
                </button>

                {/* Primary CTA Button */}
                <Link
                  href="/signup?role=individual&topic=Love%20Relationships%2C%20Marriage%20and%20Family%20Dynamics"
                  href="/signup"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#6B1828] via-[#851E32] to-[#551320] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_25px_rgba(107,24,40,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(107,24,40,0.45)] hover:from-[#7B1B2E] hover:to-[#601524] active:scale-95"
                >
                  <span>Start Your Journey</span>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-2.5 w-2.5" />
                  </div>
                </Link>
              </div>

              {/* Active Audio Reflection Card (Conditional) */}
              {isPlayingAudio && (
                <div className="mt-3.5 flex items-center gap-3 rounded-2xl border border-rose-400/40 bg-white/95 p-3 shadow-md backdrop-blur-md max-w-md animate-in fade-in slide-in-from-top-2">
                  <Volume2 className="h-4 w-4 text-[#C43855] animate-pulse" />
                  <div className="text-xs">
                    <p className="font-bold text-[#2B1218]">Guided Reflection &bull; Pranav Mahajan</p>
                    <p className="text-[#6D424A] italic text-[11px]">&ldquo;Healthy relationships are not found; they are consciously built day by day.&rdquo;</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Category Graphic Dock (User's Exact Uploaded Graphic - Placed at Screen Side, Zero Red Hover Tint) */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end lg:ml-auto">
              <div className="relative w-[300px] sm:w-[360px] md:w-[410px] lg:w-[460px] xl:w-[500px] 2xl:w-[540px] max-w-full">
                <img
                  src="/love-relationships-side-dock.png"
                  alt="Relationships, Marriage, Family, Boundaries, Healing"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(180,80,60,0.22)]"
                />

                {/* Clickable interactive hotspots corresponding to the 5 pills in the image (Completely Transparent, No Red Hover Color) */}
                <div className="absolute inset-y-0 right-0 w-[82%] flex flex-col">
                  <button
                    type="button"
                    aria-label="Filter Relationships"
                    onClick={() => setSelectedFilter(selectedFilter === 'Relationships' ? 'All' : 'Relationships')}
                    className="flex-1 bg-transparent border-0 cursor-pointer focus:outline-none"
                    title="Relationships"
                  />
                  <button
                    type="button"
                    aria-label="Filter Marriage"
                    onClick={() => setSelectedFilter(selectedFilter === 'Marriage' ? 'All' : 'Marriage')}
                    className="flex-1 bg-transparent border-0 cursor-pointer focus:outline-none"
                    title="Marriage"
                  />
                  <button
                    type="button"
                    aria-label="Filter Family"
                    onClick={() => setSelectedFilter(selectedFilter === 'Family' ? 'All' : 'Family')}
                    className="flex-1 bg-transparent border-0 cursor-pointer focus:outline-none"
                    title="Family"
                  />
                  <button
                    type="button"
                    aria-label="Filter Boundaries"
                    onClick={() => setSelectedFilter(selectedFilter === 'Boundaries' ? 'All' : 'Boundaries')}
                    className="flex-1 bg-transparent border-0 cursor-pointer focus:outline-none"
                    title="Boundaries"
                  />
                  <button
                    type="button"
                    aria-label="Filter Healing"
                    onClick={() => setSelectedFilter(selectedFilter === 'Healing' ? 'All' : 'Healing')}
                    className="flex-1 bg-transparent border-0 cursor-pointer focus:outline-none"
                    title="Healing"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6-STAGE WINDING JOURNEY RIBBON (Using User's Exact Uploaded Graphic) */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8">

        {/* Section Heading & Helper */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8C2438]">
              Continuous Growth Pathway
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B1218] mt-1 font-serif">
              The 6 Stages of Relational Mastery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6A474E] max-w-md">
            Click on any milestone along the pathway to explore practical frameworks and mentorship guidance.
          </p>
        </div>

        {/* The 6 Stages Graphic with Clickable Interactive Milestones */}
        <div className="overflow-x-auto pb-4 scrollbar-none">
          <div className="relative min-w-[860px] md:min-w-[960px] lg:min-w-full">
            <img
              src="/love-relationships-stages.png?v=2"
              alt="The 6 Stages of Relational Mastery: Understanding Yourself, Building Connection, Communication, Marriage & Partnership, Family Dynamics, Healthy Boundaries"
              className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(180,80,60,0.15)]"
            />

            {/* 6 Interactive Hotspot Buttons for Each Milestone */}
            <div className="absolute inset-0 grid grid-cols-6">
              {JOURNEY_STEPS.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  aria-label={`Open details for ${step.title}`}
                  onClick={() => {
                    setActiveStep(step);
                    setStepModalOpen(true);
                  }}
                  className="w-full h-full bg-transparent border-0 cursor-pointer focus:outline-none transition-transform hover:scale-[1.01] active:scale-95"
                  title={`Click to explore ${step.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEP DETAILS MODAL (Interactive Drill-down) */}
      {stepModalOpen && activeStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#FBF6F0] p-6 sm:p-8 border border-rose-900/20 shadow-2xl">
            <button
              type="button"
              onClick={() => setStepModalOpen(false)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5A383F] hover:bg-rose-100 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B1828] text-white shadow-md">
                {React.createElement(activeStep.icon, { className: 'h-6 w-6' })}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E354F]">
                  Stage Milestone
                </span>
                <h3 className="text-xl font-bold text-[#2B1218] font-serif">{activeStep.title}</h3>
              </div>
            </div>

            <p className="text-sm text-[#5A383F] leading-relaxed mb-5">
              {activeStep.description}
            </p>

            <div className="rounded-2xl border border-rose-900/15 bg-white/90 p-4 mb-5">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C2438] mb-1">
                Mentorship Action
              </p>
              <p className="text-sm font-bold text-[#2B1218] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                {activeStep.keyAction}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F3E5D8]/80 p-4 border border-rose-900/10 mb-6">
              <p className="italic text-xs sm:text-sm text-[#4E2B32] font-serif leading-relaxed">
                &ldquo;{activeStep.wisdom}&rdquo;
              </p>
              <p className="mt-1 text-[10px] font-mono font-bold uppercase text-[#8C2438]">
                — Pranav Mahajan
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setStepModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#5A383F] hover:bg-white transition"
              >
                Close
              </button>
              <Link
                href="/signup?role=individual&topic=Love%20Relationships%2C%20Marriage%20and%20Family%20Dynamics"
                href="/signup"
                onClick={() => setStepModalOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6B1828] text-white text-xs font-bold shadow-md hover:bg-[#851E32] transition"
              >
                <span>Book 1-on-1 Guidance</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM 3-PANEL INTERACTIVE FEATURE ROW */}
      <section className="relative px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PANEL 1: Deep Burgundy Velvet Card (Assessment / Quiz) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A0E1A] via-[#350A13] to-[#20050B] p-7 sm:p-8 text-white shadow-xl flex flex-col justify-between border border-rose-500/20">
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full blur-2xl opacity-40 bg-rose-500"
            />

            <div>
              <div className="flex items-center gap-2 text-rose-300 mb-3">
                <Sparkles className="h-4 w-4" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200">
                  Self-Reflection Tool
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-rose-50 leading-snug font-serif">
                Where does your relationship need attention?
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-rose-200/80 leading-relaxed">
                Take this 60-second diagnostic reflection to pinpoint where emotional safety or communication needs intentional care.
              </p>

              {/* 3D Heart with Leaves Graphic */}
              <div className="my-6 flex items-center justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600/30 to-rose-400/10 border border-rose-400/30 shadow-[0_0_30px_rgba(225,50,90,0.35)]">
                  <Heart className="h-10 w-10 text-rose-400 fill-rose-500 drop-shadow-md animate-pulse" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  resetQuiz();
                  setQuizOpen(true);
                }}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-rose-400 hover:to-rose-500 active:scale-95"
              >
                <span>Take a Quick Quiz</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* PANEL 2: Interactive 4-Pillar Harmony Constellation Card */}
          <div className="rounded-3xl border border-rose-900/15 bg-white/80 p-7 sm:p-8 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#8C2438]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C2438]">
                    Core Resonance
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8C2438] bg-rose-50 px-2 py-0.5 rounded-full">
                  Click to inspect
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#2B1218] font-serif">
                The 4 Pillars of Relational Health
              </h3>

              {/* Interactive Orbit Constellation Node Selector */}
              <div className="my-5 grid grid-cols-2 gap-2.5">
                {HARMONY_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  const isSelected = activePillar.id === pillar.id;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActivePillar(pillar)}
                      className={`flex items-center gap-2.5 rounded-2xl p-3 text-left transition-all duration-300 ${isSelected
                        ? 'bg-[#6B1828] text-white shadow-md scale-[1.02]'
                        : 'bg-rose-50/60 text-[#4A262D] hover:bg-rose-100/70 border border-rose-900/5'
                        }`}
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${isSelected ? 'bg-white/20' : 'bg-white text-[#8C2438]'}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-bold leading-tight">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Pillar Card Breakdown */}
              <div className="rounded-2xl border border-rose-900/10 bg-[#FBF3EA] p-4">
                <p className="text-xs font-bold text-[#2B1218] mb-1">
                  {activePillar.title}
                </p>
                <p className="text-xs leading-relaxed text-[#6E4B52] mb-3">
                  {activePillar.summary}
                </p>
                <div className="rounded-xl bg-white/90 p-3 border border-rose-900/5">
                  <p className="text-[10px] font-mono font-bold uppercase text-[#8C2438] mb-0.5">
                    Self-Inquiry Prompt
                  </p>
                  <p className="text-xs italic text-[#4A262D]">
                    &ldquo;{activePillar.prompt}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/signup?role=individual&topic=${encodeURIComponent('Love Relationships, Marriage and Family Dynamics')}`}
                href="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-rose-900/20 bg-white py-2.5 text-xs font-bold text-[#6B1828] transition hover:bg-rose-50"
              >
                <span>Cultivate These 4 Pillars</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* PANEL 3: Real-Life Situations Card */}
          <div className="rounded-3xl border border-rose-900/15 bg-white/80 p-7 sm:p-8 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C2438]">
                    Real-Life Situations
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8C2438]">Practical Insights</span>
              </div>

              <h3 className="text-xl font-bold text-[#2B1218] font-serif">
                Solutions to Common Scenarios
              </h3>

              <p className="mt-2 text-xs text-[#6E4B52] leading-relaxed">
                Direct guidance for Pyar, Jhagda, Shak, Overthinking &amp; Student Romance:
              </p>

              {/* Scenario Tab Selectors */}
              <div className="my-4 flex flex-wrap gap-1.5">
                {REAL_LIFE_SCENARIOS.map((scen) => {
                  const Icon = scen.icon;
                  const isSelected = activeScenario.id === scen.id;
                  return (
                    <button
                      key={scen.id}
                      type="button"
                      onClick={() => setActiveScenario(scen)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${isSelected
                        ? 'bg-[#6B1828] text-white shadow-xs scale-[1.02]'
                        : 'bg-rose-50 text-[#5A383F] hover:bg-rose-100/80 border border-rose-900/5'
                        }`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{scen.category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Scenario Card Preview */}
              <div className="rounded-2xl border border-rose-900/10 bg-[#FBF3EA] p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-rose-200/80 text-[#8C2438]">
                    {React.createElement(activeScenario.icon, { className: 'h-3 w-3' })}
                  </div>
                  <p className="text-xs font-bold text-[#2B1218]">
                    {activeScenario.title}
                  </p>
                </div>

                <p className="text-[11px] text-[#6E4B52] mb-2 leading-relaxed">
                  <strong className="text-[#8C2438]">Challenge:</strong> {activeScenario.issue}
                </p>

                <div className="rounded-xl bg-white/90 p-3 border border-rose-900/5 mb-2">
                  <p className="text-[10px] font-mono font-bold uppercase text-[#8C2438] mb-0.5">
                    Root Psychological Cause
                  </p>
                  <p className="text-xs text-[#4A262D] leading-relaxed">
                    {activeScenario.rootCause}
                  </p>
                </div>

                <div className="rounded-xl bg-white/95 p-3 border border-emerald-900/10">
                  <p className="text-[10px] font-mono font-bold uppercase text-emerald-800 mb-0.5">
                    Recommended Somatic Solution
                  </p>
                  <p className="text-xs text-[#2A1D1A] leading-relaxed">
                    {activeScenario.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={`/signup?role=individual&topic=${encodeURIComponent(`Love Relationships (${activeScenario.category} Focus)`)}`}
                href="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#6B1828] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#851E32]"
              >
                <span>Discuss {activeScenario.category} with Pranav</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE QUIZ MODAL */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#FBF6F0] p-6 sm:p-8 border border-rose-900/20 shadow-2xl">
            <button
              type="button"
              onClick={() => setQuizOpen(false)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5A383F] hover:bg-rose-100 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {!quizResult ? (
              <>
                <div className="mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C2438]">
                    Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="mt-1 h-1.5 w-full bg-rose-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8C2438] transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#2B1218] mb-5 font-serif">
                  {QUIZ_QUESTIONS[quizStep].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleQuizAnswer(opt.pillar)}
                      className="w-full text-left rounded-2xl border border-rose-900/10 bg-white p-4 text-xs sm:text-sm font-medium text-[#3A1E24] shadow-xs transition hover:border-[#8C2438] hover:bg-rose-50/70 hover:translate-x-1"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-[#8C2438]">
                  <Sparkles className="h-7 w-7" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C2438]">
                  Reflection Result
                </span>
                <h3 className="text-2xl font-bold text-[#2B1218] font-serif mt-1">
                  Primary Focus: {quizResult}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#5A383F] leading-relaxed max-w-sm mx-auto">
                  Your answers indicate that intentional work on <strong className="text-[#8C2438]">{quizResult}</strong> will unlock the highest emotional peace and mutual closeness in your relationship.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-rose-900/20 bg-white text-xs font-bold text-[#5A383F] hover:bg-rose-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Retake Quiz</span>
                  </button>

                  <Link
                    href={`/signup?role=individual&topic=${encodeURIComponent(`Love Relationships (${quizResult} Focus)`)}`}
                    href="/signup"
                    onClick={() => setQuizOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6B1828] text-white text-xs font-bold shadow-md hover:bg-[#851E32]"
                  >
                    <span>Start Mentorship in {quizResult}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDITORIAL QUOTE & NAVIGATION SECTION */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 text-center">
        {/* Editorial Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-20 bg-rose-900/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#8C2438]" />
          <span className="h-px w-20 bg-rose-900/20" />
        </div>

        {/* Famous Quote */}
        <blockquote className="text-xl sm:text-2xl font-serif italic text-[#3A1821] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Healthy relationships are built, not found.&rdquo;
        </blockquote>
        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-[#8C2438]">
          — Pranav Mahajan
        </p>

        {/* Prev / Next & Hub Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/personal-development"
            className="inline-flex items-center gap-2 rounded-full border border-rose-900/15 bg-white/80 px-5 py-2.5 text-xs font-bold text-[#4E2B32] shadow-xs transition hover:bg-white hover:border-rose-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Prev: Personal Development</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2 rounded-full bg-[#6B1828] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#851E32]"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/parenting-child"
            className="inline-flex items-center gap-2 rounded-full border border-rose-900/15 bg-white/80 px-5 py-2.5 text-xs font-bold text-[#4E2B32] shadow-xs transition hover:bg-white hover:border-rose-400"
          >
            <span>Next: Parenting &amp; Child Development</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
