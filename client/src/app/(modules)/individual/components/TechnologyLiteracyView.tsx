'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BookOpen,
  X,
  Cpu,
  ShieldCheck,
  Zap,
  Brain,
  Compass,
  Eye,
  Laptop,
  Smartphone,
  Terminal,
  Users,
  RefreshCw,
  BarChart2,
  Layers,
  Check,
  ChevronRight,
  Activity,
  BellOff,
  Lock,
  Heart,
  Lightbulb,
  Play,
  Send,
  ChevronDown,
  Globe,
  Sliders,
  Award,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Core AI & Digital Sovereignty Pillars
const TECH_FLUENCY_MODES = [
  {
    id: 'ai-co-intelligence',
    title: 'AI Co-Intelligence & Cognitive Leverage',
    tagline: 'Multiply your creative output, analytical velocity, and strategic clarity 10x without losing your authentic human taste.',
    accentColor: '#0284C7', // Sky Blue
    bgTint: 'rgba(2, 132, 199, 0.08)',
    icon: Cpu,
    headingTheme: 'Co-Intelligence',
    rule: 'AI is not your replacement; it is your second brain',
    tip: 'The professionals and students who flourish do not compete with algorithms—they orchestrate them with taste, discernment, and ethical conviction.',
    radarLabel: 'Cognitive Velocity: 99%',
    activePhrase: 'Elevate from a linear task-worker to an exponential strategic architect. AI handles raw synthesis; you provide soul, purpose, and judgment.',
  },
  {
    id: 'attention-sovereignty',
    title: 'Attention Sovereignty & Dopamine Hygiene',
    tagline: 'Reclaim your prefrontal cortex from slot-machine algorithms, notification bombardment, and chronic mental fragmentation.',
    accentColor: '#6366F1', // Indigo
    bgTint: 'rgba(99, 102, 241, 0.08)',
    icon: BellOff,
    headingTheme: 'Focus Sanctuary',
    rule: 'Where your attention flows, your neural destiny is forged',
    tip: 'Protecting your cognitive bandwidth requires defensive environmental design. Build friction against mindless feeds and cultivate deep work zones.',
    radarLabel: 'Attention Moat: 96%',
    activePhrase: 'Turn your attention into an unbreachable fortress. Deep, undisturbed focus is now the single rarest and most prized asset in the global economy.',
  },
  {
    id: 'dialectical-truth',
    title: 'Critical Discernment & Digital Ethics',
    tagline: 'Develop bulletproof intellectual immune systems against algorithmic echo chambers, deepfakes, hallucinated facts, and synthetic superficiality.',
    accentColor: '#059669', // Emerald
    bgTint: 'rgba(5, 150, 105, 0.08)',
    icon: ShieldCheck,
    headingTheme: 'Dialectical Truth',
    rule: 'Never accept synthetic output without human verification',
    tip: 'Treat AI as a brilliant but fallible research intern. Pressure-test every assertion, verify primary sources, and preserve your independent voice.',
    radarLabel: 'Discernment: 98%',
    activePhrase: 'In an ocean of synthetic slop, authentic original insight and moral conviction become infinitely scarce and magnetic.',
  },
  {
    id: 'biophilic-embodiment',
    title: 'Mindful Screen-Life & Green Growth',
    tagline: 'Harmonize lightning-fast digital mastery with somatic grounding, eye restoration, nature immersion, and vibrant organic wellbeing.',
    accentColor: '#0D9488', // Teal
    bgTint: 'rgba(13, 148, 136, 0.08)',
    icon: Heart,
    headingTheme: 'Biophilic Balance',
    rule: 'High tech demands high touch with reality',
    tip: 'The faster machines compute, the more non-negotiable your physical sleep, sunlight, movement, and human presence become for sustainable high performance.',
    radarLabel: 'Somatic Vitality: 95%',
    activePhrase: 'Ground your digital brilliance in biological harmony. Real green growth happens when technology serves human flourishing, not human burnout.',
  },
];

// 5 Real-World Dilemmas vs Conscious Mentorship Solutions (Hero Selector)
const TECH_CHALLENGES = [
  {
    id: 'automation-obsolescence',
    stageLabel: 'AI Obsolescence & Stagnation Panic',
    problem: 'Watching peers accelerate with AI while you feel overwhelmed, clinging to outdated manual methods and falling dramatically behind in career or studies.',
    solution: 'Workflow Orchestration & Cognitive Layer Elevation: Moving from routine manual execution to designing multi-step AI agents and prompting high-leverage outcomes.',
    action: 'Map your most repetitive 3-hour weekly task; spend 45 minutes building a guided AI prompt pipeline to finish it in 10 minutes.',
    accent: '#0284C7',
    tag: '01 • STRATEGIC LEVERAGE',
  },
  {
    id: 'algorithmic-hijack',
    stageLabel: 'Doom-Scrolling & Attention Fragmentation',
    problem: 'Endless short-form scrolling, cognitive exhaustion, inability to read deep books or focus for 30 minutes without reaching for your phone.',
    solution: 'Dopamine Architecture & Neuro-Sanctuaries: Establishing physical phone-free boundaries, grayscale modes, and non-negotiable deep-work rituals.',
    action: 'Put phone in another room 60 minutes before bed; begin morning with 45 minutes of sunlight and deep reading before any screen.',
    accent: '#6366F1',
    tag: '02 • ATTENTION SOVEREIGNTY',
  },
  {
    id: 'shallow-cheating',
    stageLabel: 'Superficial AI Slop vs True Intellectual Mastery',
    problem: 'Students and workers blindly copy-pasting raw ChatGPT responses, creating generic uninspired output and slowly losing their own ability to think deeply.',
    solution: 'Socratic Dialectic & Dialectical Verification: Using AI as a relentless intellectual sparring partner that challenges your assumptions rather than doing your thinking.',
    action: 'Never ask AI to write the final draft; prompt it: “Expose the top 3 logical flaws and blind spots in my argument.”',
    accent: '#059669',
    tag: '03 • DIALECTICAL RIGOR',
  },
  {
    id: 'child-screen-paralysis',
    stageLabel: 'Childhood Screen Paralysis & Tantrums',
    problem: 'Children and teens locked in passive hyper-stimulating screen loops, experiencing tantrums, social anxiety, and dwindling curiosity about the physical world.',
    solution: 'Consumer-to-Creator Inversion: Transforming screens from passive digital pacifiers into creative canvases for coding, digital art, robotics, and family collaboration.',
    action: 'Trade 1 hour of passive short-video viewing for a shared creative session building a game on Scratch or generating story illustrations with AI.',
    accent: '#D97706',
    tag: '04 • YOUTH CREATIVE AGENCY',
  },
  {
    id: 'screen-burnout',
    stageLabel: '12-Hour Screen Fatigue & Tech-Neck Apnea',
    problem: 'Strained dry eyes, chronic shallow “email apnea” breathing, posture tension, insomnia from late blue light, and feeling detached from physical reality.',
    solution: 'Biophilic Grounding & Somatic Reset Protocols: Integrating circadian light hygiene, 20-20-20 optic recovery, and outdoor sensory grounding.',
    action: 'Adopt the 20-20-20 rule; take 5 slow diaphragmatic breaths every 60 minutes, and spend 20 minutes outside in greenery every afternoon.',
    accent: '#0D9488',
    tag: '05 • BIOPHILIC BALANCE',
  },
];

// 4 Core AI & Tech Sovereignty Engines (2x2 Bento Matrix)
const TECH_ARENAS = [
  {
    id: 'cognitive-amplification',
    title: 'Cognitive AI Amplification',
    subtitle: 'The 10x Human-AI Symphony',
    description:
      'Learn how to architect context-rich prompts, chains of reasoning, and automated multi-agent pipelines that accelerate research, coding, writing, and strategic synthesis at lightning speed.',
    metrics: [
      { label: 'Analytical Velocity', val: '10x Speed' },
      { label: 'Cognitive Offloading', val: '80% Manual Saved' },
      { label: 'Creative Iteration', val: 'Unlimited' },
    ],
    features: [
      'Prompt Architecture: Zero-shot, Few-shot, and Chain-of-Thought precision',
      'Multi-Agent Workflows: Designing specialized automated research squads',
      'Human-in-the-Loop Curation: Infusing irreplaceable domain taste and voice',
    ],
    accent: '#0284C7',
    icon: Cpu,
  },
  {
    id: 'attention-moat',
    title: 'Attention Sovereignty & Dopamine Hygiene',
    subtitle: 'Reclaiming Your Prefrontal Cortex',
    description:
      'Protect your brain from algorithmic hijacking. Systematically eradicate notification clutter, doom-scrolling impulse, and continuous partial attention to master sustained uninterrupted focus.',
    metrics: [
      { label: 'Deep Work Capacity', val: '4+ Hours/Day' },
      { label: 'Dopamine Reset', val: 'Zero Craving' },
      { label: 'Cognitive Clarity', val: 'Crystal Sharp' },
    ],
    features: [
      'Neuro-Sanctuaries: Physical spaces where algorithmic devices never enter',
      'Batch-Processing Protocols: Answering asynchronous messages twice daily',
      'Grayscale & Notification Stripping: De-weaponizing seductive phone interfaces',
    ],
    accent: '#6366F1',
    icon: BellOff,
  },
  {
    id: 'digital-ethics',
    title: 'Critical Truth & Digital Ethics',
    subtitle: 'Intellectual Immunity in a Synthetic World',
    description:
      'Navigate deepfakes, synthetic misinformation, hallucinated facts, and algorithmic bias with rigorous critical thinking, source verification, and unshakeable intellectual integrity.',
    metrics: [
      { label: 'Hallucination Spotting', val: '99% Precision' },
      { label: 'Source Verification', val: 'Primary-Rooted' },
      { label: 'Authentic Voice', val: '100% Original' },
    ],
    features: [
      'Dialectical Fact-Checking: Triangulating AI assertions against academic consensus',
      'Algorithmic Bias Auditing: Recognizing covert slant in recommendation engines',
      'Data Privacy Sovereignty: Safeguarding personal data and intellectual property',
    ],
    accent: '#059669',
    icon: ShieldCheck,
  },
  {
    id: 'biophilic-balance',
    title: 'Mindful Screen-Life & Green Growth',
    subtitle: 'Harmonizing Silicon Velocity with Organic Life',
    description:
      'High technology must be balanced with deep biological roots. Master optic nerve resets, circadian rhythm alignment, screen-free family dinners, and nature immersion for sustained flourishing.',
    metrics: [
      { label: 'Circadian Melatonin', val: 'Restored' },
      { label: 'Nervous System', val: 'Parasympathetic' },
      { label: 'Somatic Vitality', val: 'Flourishing' },
    ],
    features: [
      'Digital Sunset Protocol: No blue screens 90 minutes before restorative sleep',
      'Biophilic Workstations: Integrating living plants, daylight, and ergonomic posture',
      'Somatic Grounding: Reconnecting bare feet to earth and eyes to natural horizon',
    ],
    accent: '#0D9488',
    icon: Heart,
  },
];

// 4 Interactive High-Stakes Dilemmas & Protocols
const TECH_DILEMMAS = [
  {
    id: 'workplace-ai-deadline',
    title: 'The Terrifying AI Workplace Pivot',
    tag: 'CAREER ACCELERATION',
    scenario: 'Your company announces sudden restructuring. Colleagues leveraging AI tools complete 3-day reports in 20 minutes, while you are drowning in manual spreadsheets.',
    trap: 'Denying AI’s capabilities, complaining that “AI is just a fad,” and stubbornly working overtime until burnout forces your obsolescence.',
    shift: 'Embrace radical curiosity. Shift from manual data-cruncher to the strategic prompt architect who synthesizes insights and presents executive decisions.',
    script: 'Open an AI canvas. Paste the raw dataset with privacy precautions: “Analyze these 5 columns for anomalies, format a 3-point executive briefing, and list 3 strategic risks.”',
    accent: '#0284C7',
  },
  {
    id: 'student-research-trap',
    title: 'The College Thesis Hallucination Trap',
    tag: 'ACADEMIC RIGOR',
    scenario: 'Facing a 40-page literature review due in 48 hours, tempted to prompt AI to generate the whole essay and copy-paste it directly into your submission.',
    trap: 'Copy-pasting unverified AI output with hallucinated citations, risking immediate plagiarism flags and crippling your own cognitive depth.',
    shift: 'Use AI as a Socratic sparring partner to rapidly synthesize verified PDFs, interrogate logic, and extract core arguments while you write the synthesis.',
    script: '“Here is the core paper abstract. Act as a harsh peer reviewer: highlight the 3 weakest methodology assumptions and suggest 2 contrarian counter-arguments.”',
    accent: '#6366F1',
  },
  {
    id: 'parent-screen-battle',
    title: 'The 8-Year-Old Screen Tantrum',
    tag: 'FAMILY DYNAMICS',
    scenario: 'Taking the iPad away from your 8-year-old child causes an explosive 45-minute meltdown of screaming, tears, and total emotional dysregulation.',
    trap: 'Giving in out of exhaustion to buy quiet time, or reacting with harsh rage that makes screens an alluring forbidden fruit.',
    shift: 'Acknowledge dopamine withdrawal calmly. Invert passive consumption into active co-creation, building tangible coding or lego projects together.',
    script: 'Hold their hand with warm stillness: “I know it feels hard right now. Your brain is coming down from high stimulation. Let’s sit together for 3 minutes, then we’ll code our own robot game.”',
    accent: '#D97706',
  },
  {
    id: 'executive-screen-burnout',
    title: 'The 14-Hour Executive Screen Exhaustion',
    tag: 'SOMATIC VITALITY',
    scenario: 'Ending back-to-back Zoom meetings at 8 PM with pulsating headaches, dry burning eyes, shallow chest breathing, and an inability to unwind.',
    trap: 'Drinking alcohol or scrolling social media to numb out, destroying deep REM sleep and waking up brain-fogged for another grueling day.',
    shift: 'Treat your biological hardware with uncompromising reverence. Execute a hard digital shutdown and reset your nervous system through physical embodiment.',
    script: 'Close laptop lid firmly. Wash face with cool water. Step outside into cool evening air, gaze at the horizon for 5 minutes, and take 10 slow diaphragmatic breaths.',
    accent: '#0D9488',
  },
];

export default function TechnologyLiteracyView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const activeMode = TECH_FLUENCY_MODES[activeModeIdx];
  const activeDilemma = TECH_DILEMMAS[activeDilemmaIdx];
  const activeChallenge = TECH_CHALLENGES[activeChallengeIdx];

  // Scroll to top on mount
  useEffect(() => {
    if (scrollRootRef.current) {
      scrollRootRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Back to top listener
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
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#F0F9FF] text-[#0F172A] antialiased selection:bg-cyan-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Ambient Cyber-Biophilic Mesh Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[700px] rounded-full bg-gradient-to-b from-cyan-300/25 via-sky-200/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[600px] rounded-full bg-gradient-to-b from-indigo-300/20 via-blue-100/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[550px] rounded-full bg-gradient-to-t from-emerald-300/15 via-teal-100/10 to-transparent blur-[120px]" />
      </div>

      {/* =========================================================================
          OFFICIAL NAVBAR (Identical to Home & Role Page)
         ========================================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-cyan-500/15 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none transition-all duration-500">
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
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-cyan-900/15 bg-[#F0F9FF] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-cyan-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0284C7]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#0F172A]">Technology &amp; AI Literacy</p>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-900/15 bg-white text-[#0F172A] transition hover:bg-[#E0F2FE] cursor-pointer"
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
            { href: '/individual/life-transitions', label: '09 Life Transitions & Resilience' },
            { href: '/individual/technology-literacy', label: '10 Technology & AI Literacy' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-cyan-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#0284C7] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#E0F2FE] p-5 border border-cyan-200">
          <p className="text-sm leading-6 text-[#0369A1] font-medium">
            Ready to harness exponential AI tools, protect your cognitive focus, and out-accelerate automation with green human growth?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0284C7] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0369A1]"
          >
            Claim AI Fluency Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION WITH 16:9 PANORAMIC WALLPAPER (UNOBSTRUCTED VIEW)
         ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 2xl:px-18 select-text">
        {/* Full-Bleed 16:9 Panoramic Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/technology-literacy-hero.jpg"
            alt="AI Fluency, Modern Technology Adaptation vs Outdated Stagnation - Rapid Green Growth"
            className="w-full h-full object-cover object-center filter saturate-[1.05] brightness-[1.01]"
          />
          {/* Top Luminous White Mist Overlay (Exact match across all views) */}
          <div className="absolute inset-x-0 top-0 h-40 sm:h-52 bg-gradient-to-b from-white/85 via-white/30 to-transparent pointer-events-none" />
          {/* Bottom Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F0F9FF] via-[#F0F9FF]/25 to-transparent pointer-events-none" />
          {/* Very Subtle Left Gradient so text is readable without hiding the left student */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent pointer-events-none sm:w-[50%]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center my-auto">
          {/* LEFT: Clean Minimal Headline & Controls (Right and Center completely open for panoramic photo) */}
          <div className="max-w-xl xl:max-w-2xl flex flex-col items-start select-text">
            {/* Visual 3-Stage Story Badge */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200/90 text-slate-800 shadow-2xs">
                01 Outdated Resistance
              </span>
              <span className="text-cyan-600 text-xs font-bold">&rarr;</span>
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 shadow-2xs">
                02 AI Co-Intelligence
              </span>
              <span className="text-cyan-600 text-xs font-bold">&rarr;</span>
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 shadow-2xs">
                03 Rapid Green Growth
              </span>
            </div>

            {/* Live Indicator Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-900/10 bg-white/85 px-3.5 py-1 backdrop-blur-md shadow-xs mb-3">
              <span className="h-2 w-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
                Dimension 10 &bull; AI Fluency &amp; Green Growth
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.12] font-serif text-[#0F172A]">
              Tech &amp; AI Literacy: <br />
              <span className="bg-gradient-to-r from-[#0284C7] via-[#6366F1] to-[#059669] bg-clip-text text-transparent">
                Think with AI. Flourish in Green Growth.
              </span>
            </h1>

            {/* Concise Tagline */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-2xl border border-cyan-900/10 bg-white/85 px-4.5 py-2.5 backdrop-blur-md shadow-xs max-w-xl">
              <span className="text-[#0284C7] text-base shrink-0">✦</span>
              <p className="text-xs sm:text-sm font-medium text-[#1E293B] leading-relaxed">
                Jo technology aur AI ke sath adapt nahi karta, woh piche chhoot jata hai. Orchestrate exponential AI tools, protect your dopamine sovereignty, and accelerate sustainable green growth.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#diagnostic-console"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0D9488] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Diagnostic Console</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#engines"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/90 px-4.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 backdrop-blur-md transition-all hover:bg-white hover:border-slate-400"
              >
                Explore 4 Engines
              </a>

              <a
                href="#digital-cockpit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300 bg-sky-50/90 px-4.5 py-2.5 text-xs sm:text-sm font-bold text-[#0284C7] backdrop-blur-md transition-all hover:bg-sky-100"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>AI Cockpit</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 1.5: THE ADAPTABILITY DIVIDE (DIAGNOSTIC CONSOLE)
         ========================================================================= */}
      <section id="diagnostic-console" className="relative z-10 py-14 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white/95 p-6 sm:p-10 border border-cyan-200/90 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 border border-sky-100 text-xs font-bold text-[#0284C7] uppercase font-mono tracking-wider mb-2">
                <Zap className="h-3.5 w-3.5 text-[#0284C7]" />
                The Adaptability Divide
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-serif">
                Outdated Manual Grind vs. 10x AI Acceleration
              </h2>
              <p className="mt-1 text-sm text-slate-500 font-medium">
                Choose a real-world scenario to see the consequence of resisting modern technology vs mastering AI orchestration.
              </p>
            </div>

            {/* Interactive Dilemma Selector Chips */}
            <div className="flex flex-wrap gap-1.5">
              {TECH_CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChallengeIdx(idx)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                    activeChallengeIdx === idx
                      ? 'bg-[#0284C7] text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {ch.stageLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 7 cols: Problem vs Solution */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-mono text-[10.5px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: activeChallenge.accent }}
                >
                  {activeChallenge.tag}
                </span>
                <span className="font-mono text-xs text-slate-400 font-semibold">
                  REAL SCENARIO &bull; SHIFT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: The Outdated Trap */}
                <div className="rounded-2xl bg-rose-50/70 p-4 border border-rose-100">
                  <p className="font-mono text-[10px] font-bold uppercase text-rose-700 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                    The Stagnant Manual Trap (Piche Rehna)
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
                    {activeChallenge.problem}
                  </p>
                </div>

                {/* Right: The AI Augmented Shift */}
                <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100">
                  <p className="font-mono text-[10px] font-bold uppercase text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    10x AI &amp; Green Growth (Teji se Aage)
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                    {activeChallenge.solution}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <Zap className="h-3.5 w-3.5 text-[#0284C7] shrink-0" />
                  <span><strong className="text-slate-900">Immediate Action:</strong> {activeChallenge.action}</span>
                </div>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#0284C7] hover:underline"
                >
                  Book 1-on-1 Mentorship &rarr;
                </Link>
              </div>
            </div>

            {/* Right 5 cols: Telemetry Card */}
            <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                <span className="font-mono text-[11px] font-bold text-slate-700 uppercase">
                  Telemetry Comparison
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  10x LEVERAGE
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500">Manual Grind Velocity:</span>
                  <span className="text-rose-600 font-bold">1x (Linear / Slow)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500">AI Co-Intelligence Speed:</span>
                  <span className="text-[#0284C7] font-bold">10x (Exponential)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500">Career &amp; Life Trajectory:</span>
                  <span className="text-emerald-600 font-bold">Flourishing Green Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: 4 CORE AI & HUMAN SYNERGY ENGINES (2x2 BENTO GRID)
         ========================================================================= */}
      <section id="engines" className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 border border-cyan-200 text-xs font-bold text-[#0284C7] uppercase font-mono tracking-wider shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#0284C7]" />
            The Architectural Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-serif tracking-tight">
            4 Engines of AI Co-Intelligence &amp; Human Sovereignty
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Technology is an amplifier of whatever is fed into it. When paired with shallow thinking, it accelerates confusion. When paired with deep human discernment, it unleashes unprecedented flourishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TECH_ARENAS.map((arena) => (
            <div
              key={arena.id}
              className="rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: arena.accent }}
                  >
                    {React.createElement(arena.icon, { className: 'h-6 w-6' })}
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    {arena.subtitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-serif">
                  {arena.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                  {arena.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-5 py-3 border-y border-slate-100 bg-slate-50/80 rounded-2xl px-3">
                  {arena.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <span className="block font-mono text-[10px] uppercase font-bold text-slate-400">
                        {m.label}
                      </span>
                      <span className="block font-mono text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 space-y-2.5">
                  {arena.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/signup"
                  className="font-mono text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Master This Engine &rarr;
                </Link>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: arena.accent }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SCREEN 3: INTERACTIVE HIGH-STAKES SCENARIOS & PROTOCOLS
         ========================================================================= */}
      <section className="relative z-10 py-16 sm:py-24 bg-white/80 border-y border-cyan-100 px-4 sm:px-8 lg:px-12 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6366F1] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Interactive Dialectical Scenarios
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-serif">
              Real-World High-Stakes Dilemmas
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Explore how intentional human discernment radically alters your trajectory in the moments that matter most.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Scenario Navigation Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {TECH_DILEMMAS.map((dilemma, idx) => (
                <button
                  key={dilemma.id}
                  onClick={() => setActiveDilemmaIdx(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeDilemmaIdx === idx
                      ? 'bg-[#0284C7] text-white border-transparent shadow-lg scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      activeDilemmaIdx === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {dilemma.tag}
                  </span>
                  <h4 className="mt-2 text-base font-bold font-serif leading-snug">
                    {dilemma.title}
                  </h4>
                </button>
              ))}
            </div>

            {/* Active Scenario Card */}
            <div className="lg:col-span-8 rounded-3xl bg-[#F8FAFC] p-6 sm:p-8 border border-slate-200 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#0284C7]">
                  {activeDilemma.tag} PROTOCOL
                </span>
                <span className="font-mono text-xs text-slate-400 font-semibold">
                  Sovereign Response Blueprint
                </span>
              </div>

              {/* Real Scenario Context */}
              <div className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200 mb-5">
                <p className="font-mono text-[10px] font-bold uppercase text-slate-400 mb-1">
                  The Raw Tension Scenario
                </p>
                <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                  “{activeDilemma.scenario}”
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* The Panic Trap */}
                <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100">
                  <p className="font-mono text-[10.5px] font-bold uppercase text-rose-700 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                    The Reactive Manual Trap
                  </p>
                  <p className="mt-1.5 text-xs text-rose-950 leading-relaxed font-medium">
                    {activeDilemma.trap}
                  </p>
                </div>

                {/* The Sovereign Shift */}
                <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                  <p className="font-mono text-[10.5px] font-bold uppercase text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    The High-Leverage Mindset
                  </p>
                  <p className="mt-1.5 text-xs text-emerald-950 leading-relaxed font-medium">
                    {activeDilemma.shift}
                  </p>
                </div>
              </div>

              {/* The Sovereign Script */}
              <div className="rounded-2xl bg-sky-50/90 p-4 sm:p-5 border border-sky-200">
                <p className="font-mono text-[10.5px] font-bold uppercase text-[#0284C7] flex items-center gap-1.5 mb-1.5">
                  <Lightbulb className="h-3.5 w-3.5 text-[#0284C7]" />
                  Exact Actionable Prompt &amp; Script
                </p>
                <p className="text-xs sm:text-sm text-sky-950 font-semibold italic leading-relaxed">
                  {activeDilemma.script}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Want tailored coaching for this exact scenario?</span>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#0284C7] hover:underline"
                >
                  Book 1-on-1 Strategy Session &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 4: BOTTOM AI FLUENCY & DIGITAL SOVEREIGNTY COCKPIT (#digital-cockpit)
         ========================================================================= */}
      <section id="digital-cockpit" className="relative z-10 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white p-7 sm:p-12 border border-cyan-200 shadow-2xl relative overflow-hidden">
          {/* Top Decorative Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1 border border-sky-100 text-xs font-bold text-[#0284C7] uppercase font-mono tracking-wider mb-2">
                <Cpu className="h-3.5 w-3.5 text-[#0284C7]" />
                Live Calibration Engine
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-serif">
                AI Fluency &amp; Digital Sovereignty Cockpit
              </h3>
              <p className="mt-1 text-sm text-slate-500 font-medium">
                Calibrate your technological velocity, attention moat, and somatic balance in real-time.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {TECH_FLUENCY_MODES.map((mode, idx) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveModeIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    activeModeIdx === idx
                      ? 'bg-[#0284C7] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {React.createElement(mode.icon, { className: 'h-4 w-4' })}
                  <span>{mode.headingTheme}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Telemetry Radar Visualizer */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-3xl border border-slate-100 relative">
              <svg className="w-56 h-56 -rotate-90">
                <circle cx="112" cy="112" r="90" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  stroke={activeMode.accentColor}
                  strokeWidth="10"
                  strokeDasharray="565"
                  strokeDashoffset={
                    activeModeIdx === 0 ? '55' : activeModeIdx === 1 ? '75' : activeModeIdx === 2 ? '45' : '65'
                  }
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700 ease-out"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="72"
                  stroke="#059669"
                  strokeWidth="6"
                  strokeDasharray="452"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center p-4 rounded-full w-36 h-36 bg-white shadow-lg border border-slate-100">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-white mb-1 shadow-sm"
                  style={{ backgroundColor: activeMode.accentColor }}
                >
                  {React.createElement(activeMode.icon, { className: 'h-5 w-5' })}
                </div>
                <span className="font-mono text-lg font-black text-slate-900 leading-none">
                  {activeModeIdx === 0 ? '99.2%' : activeModeIdx === 1 ? '96.5%' : activeModeIdx === 2 ? '98.8%' : '95.4%'}
                </span>
                <span className="font-mono text-[9px] font-bold uppercase text-slate-400 mt-0.5">
                  {activeMode.headingTheme}
                </span>
              </div>

              <div className="w-full mt-4 space-y-1.5 font-mono text-[11px] text-slate-600 font-semibold">
                <div className="flex justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <span>Target Velocity:</span>
                  <span className="text-[#0284C7] font-bold">{activeMode.radarLabel}</span>
                </div>
                <div className="flex justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <span>Dopamine Reserve:</span>
                  <span className="text-emerald-600 font-bold">Uncompromised</span>
                </div>
              </div>
            </div>

            {/* Right Protocol Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span
                  className="font-mono text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-white inline-block mb-3"
                  style={{ backgroundColor: activeMode.accentColor }}
                >
                  ACTIVE PROTOCOL &bull; {activeMode.headingTheme}
                </span>

                <h4 className="text-2xl font-bold text-[#0F172A] font-serif">
                  {activeMode.title}
                </h4>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                  {activeMode.tagline}
                </p>

                <div className="mt-5 rounded-2xl bg-[#F0F9FF] p-4 border border-cyan-200/80">
                  <p className="font-mono text-[10px] font-bold uppercase text-[#0284C7] flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3 w-3 text-[#0284C7]" />
                    Foundational Maxim
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    “{activeMode.rule}”
                  </p>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {activeMode.tip}
                  </p>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="font-mono text-[10px] font-bold uppercase text-emerald-700 flex items-center gap-1.5 mb-1">
                    <Activity className="h-3 w-3 text-emerald-600" />
                    Somatic Screen Reset Protocol
                  </p>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {activeMode.activePhrase}
                  </p>
                </div>
              </div>

              {/* Bottom Interactive CTA */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">Want an unbreachable technological advantage?</p>
                  <p className="text-[11px] text-slate-500 font-medium">Tailored mentorship for students, executives, and parents.</p>
                </div>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0284C7] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0369A1] transition hover:scale-105"
                >
                  Book 1-on-1 AI Mentorship <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 5: FREQUENTLY ASKED QUESTIONS & BOTTOM MENTORSHIP
         ========================================================================= */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-serif">
            Frequently Explored Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Everything you need to know about developing sovereign AI fluency and digital hygiene.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Will AI take away my job or make my degree useless?',
              a: 'AI will not replace humans—humans orchestrating AI with domain taste, critical judgment, and strategic insight will replace humans clinging to outdated manual methods. When you learn to prompt, curate, and verify, you 10x your personal leverage.',
            },
            {
              q: 'How do I protect my children from becoming addicted to screens?',
              a: 'Invert the dynamic from passive consumption to active creation. Replace algorithmic short-form feeds with creative tools: coding on Scratch, producing digital music, generating storybooks with AI, and establishing inviolable screen-free family dining and bedtime zones.',
            },
            {
              q: 'What is the fastest way to get comfortable with AI if I feel tech-averse?',
              a: 'Start with conversational problem-solving. Treat AI not as intimidating software, but as a tireless, patient mentor. Ask it to explain complex concepts in plain language, critique your draft emails, or organize your daily schedules.',
            },
            {
              q: 'How can I stop doom-scrolling and restore my broken attention span?',
              a: 'Attention is an environment game, not just willpower. Make bad habits difficult: switch your phone screen to grayscale, remove social apps from your home screen, keep chargers in the living room, and protect the first 60 minutes of every morning as phone-free sanctuary.',
            },
          ].map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-2xs">
              <h4 className="text-base font-bold text-[#0F172A] font-serif flex items-center justify-between">
                <span>{faq.q}</span>
                <ChevronDown className="h-4 w-4 text-[#0284C7] shrink-0" />
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Back-To-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0284C7] text-white shadow-xl transition-all duration-300 hover:bg-[#0369A1] hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ArrowRight className="h-5 w-5 -rotate-90" />
        </button>
      )}

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
