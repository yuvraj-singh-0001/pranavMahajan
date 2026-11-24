'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Sun,
  Shield,
  Heart,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight,
  Sliders,
  Check,
  Activity,
  Layers,
  Flame,
  Feather,
  Anchor,
  RefreshCw,
  Mountain,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Signature Resilience & Transition Breakthrough Modes
const RESILIENCE_MODES = [
  {
    id: 'fluidity',
    label: 'Fluid Courage',
    tag: '01 • ADAPTATION',
    accentColor: '#EA580C', // Flame Amber / Terracotta
    accentBg: 'bg-orange-50 border-orange-200 text-orange-900',
    icon: Flame,
    headingTheme: 'Fluid Courage',
    rule: 'Yield to reality to conquer it',
    tip: 'Rigid resistance shatters under life’s sudden storms. Like water flowing around boulders, fluid courage adapts without losing its essential force.',
    radarLabel: 'Adaptation Index: 98%',
    activePhrase: 'Do not fight the storm; become the unshakeable stillness at its center.',
  },
  {
    id: 'metabolism',
    label: 'Emotional Metabolism',
    tag: '02 • HEALING',
    accentColor: '#D97706', // Radiant Sunbeam Gold
    accentBg: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: Heart,
    headingTheme: 'Emotional Metabolism',
    rule: 'Feel pain cleanly; refuse suffering',
    tip: 'Pain is clean reality; suffering is the mental resistance to reality. Grieve fully so old grief does not calcify into lifelong cynicism.',
    radarLabel: 'Grief Processing: 97%',
    activePhrase: 'Let grief wash through your nervous system like rain. It cleanses the soil for your next season.',
  },
  {
    id: 'antifragility',
    label: 'Psychological Antifragility',
    tag: '03 • STRENGTH',
    accentColor: '#C2410C', // Deep Rust
    accentBg: 'bg-orange-50 border-orange-200 text-orange-900',
    icon: Shield,
    headingTheme: 'Antifragility',
    rule: 'Use adversity as structural fuel',
    tip: 'Resilience is not merely bouncing back to who you were. Antifragility means using shocks and unexpected ruptures to grow wiser, deeper, and stronger.',
    radarLabel: 'Antifragile Moat: 99%',
    activePhrase: 'What has been broken can be rebuilt with golden seams. Wear your scars with sovereign pride.',
  },
  {
    id: 'architecture',
    label: 'Next Chapter Design',
    tag: '04 • RENEWAL',
    accentColor: '#059669', // Emerald Renewal
    accentBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    icon: Mountain,
    headingTheme: 'Next Chapter',
    rule: 'The end of an identity is not the end of you',
    tip: 'Liminal space feels terrifying because the old chapter closed and the new one has not yet written its first sentence. Stand tall in the threshold.',
    radarLabel: 'Forward Momentum: 96%',
    activePhrase: 'Reclaim your authorship. Every transition is an invitation to strip away the false and build the real.',
  },
];

// 5 Real-World Upheaval Dilemmas vs Conscious Mentorship Solutions (Hero Selector)
const TRANSITION_CHALLENGES = [
  {
    id: 'career-loss',
    stageLabel: 'Sudden Layoff & Career Loss',
    problem: 'Waking up to an unexpected pink slip, feeling humiliated, stripped of identity, and spiraling into financial panic.',
    solution: 'Liminal Space Navigation & High-Leverage Repositioning: Treating termination not as a verdict, but as a forced release from a dead-end trajectory.',
    action: 'Take 48 hours of complete stillness; map your irreplaceable unfair strengths before blasting out resumes.',
    accent: '#EA580C',
    tag: '01 • CAREER UPHEAVAL',
  },
  {
    id: 'divorce-separation',
    stageLabel: 'Divorce, Heartbreak & Separation',
    problem: 'The agonizing collapse of a long-term marriage or relationship, wrestling with guilt, loneliness, and tearing down a shared life.',
    solution: 'Clean Emotional Metabolism: Untangling co-dependent identity and rebuilding an unassailable foundation of self-trust.',
    action: 'Refuse bitter backchannel battles. Anchor in quiet dignity and design your sovereign personal sanctuary.',
    accent: '#D97706',
    tag: '02 • RELATIONAL RENEWAL',
  },
  {
    id: 'midlife-reckoning',
    stageLabel: 'Mid-Life Identity Reckoning',
    problem: 'Realizing at 45 that you climbed the wrong mountain, feeling trapped by golden handcuffs and mourning unlived potential.',
    solution: 'Conscious Reinvention Architecture: Auditing true core values and orchestrating non-linear pivots into meaningful work.',
    action: 'Write a fearless inventory of what you are no longer willing to tolerate; take one bold sovereign step this week.',
    accent: '#C2410C',
    tag: '03 • CONSCIOUS REINVENTION',
  },
  {
    id: 'health-setback',
    stageLabel: 'Medical Shock or Chronic Setback',
    problem: 'Receiving a sudden health diagnosis or chronic physical limitation, raging against unfairness and feeling betrayed by your body.',
    solution: 'Somatic Acceptance & Antifragile Healing Stance: Partnering with your biology with profound patience and clinical stillness.',
    action: 'Exhale tension from your shoulders; focus 100% of your energy on the daily restorative habits you directly control.',
    accent: '#059669',
    tag: '04 • SOMATIC RESILIENCE',
  },
  {
    id: 'relocation-disorientation',
    stageLabel: 'Relocation & Total Disorientation',
    problem: 'Moving to a new city or country, feeling completely unmoored, invisible, and homesick with zero supportive community.',
    solution: 'Root-Forging Protocol: Establishing daily anchors of presence, finding third spaces, and opening to new chapters.',
    action: 'Design a non-negotiable morning grounding routine and initiate one warm connection with a neighbor or peer.',
    accent: '#2563EB',
    tag: '05 • EMBRACING THE UNKNOWN',
  },
];

// 4 Core Resilience Engines (2x2 Bento Matrix)
const RESILIENCE_ARENAS = [
  {
    number: '01',
    themeName: 'Fluid Courage',
    title: 'Navigating Disorientation & Liminal Space',
    category: 'THRESHOLD MASTERY',
    accent: '#EA580C',
    icon: Flame,
    rootBottleneck: 'Panicked urgency: rushing to make premature decisions just to escape the uncomfortable emptiness between chapters.',
    consciousFix: 'Liminal Grounding Protocol: Developing the somatic capacity to remain calm and observant in the fertile void.',
    keyRule: 'You cannot step onto the new shore while clinging desperately to the burning ship',
    quote: 'The caterpillar does not know it will become a butterfly; it only surrenders to the cocoon. Trust your transformation.',
    ctaTopic: 'Liminal Space & Life Transition Mentorship',
    metrics: [
      { label: 'Uncertainty Tolerance', val: '98%', status: 'Grounded Calm' },
      { label: 'Panic Impulse', val: '0%', status: 'Neutralized' },
      { label: 'Threshold Clarity', val: 'Optimal', status: 'Patient Poise' },
    ],
  },
  {
    number: '02',
    themeName: 'Emotional Metabolism',
    title: 'Grief Processing & Clean Emotional Metabolism',
    category: 'HEART RECOVERY',
    accent: '#D97706',
    icon: Heart,
    rootBottleneck: 'Emotional repression: putting on a brave face, numbing with work, and letting unprocessed grief curdle into bitterness.',
    consciousFix: 'Somatic Release Cycles: Sacred windows of intentional grief processing that metabolize pain cleanly through the body.',
    keyRule: 'What is not transformed is transmitted. Feel it so you can heal it',
    quote: 'Grief is the unexpressed proof of how deeply you dared to love and care. Honor it without drowning in it.',
    ctaTopic: 'Grief Metabolism & Emotional Healing Mentorship',
    metrics: [
      { label: 'Somatic Recovery', val: 'Fast', status: 'Clean Release' },
      { label: 'Bitterness Index', val: '0%', status: 'Pure Heart' },
      { label: 'Self-Compassion', val: '100%', status: 'Unconditional' },
    ],
  },
  {
    number: '03',
    themeName: 'Antifragility',
    title: 'Psychological Antifragility & Shock Absorption',
    category: 'UNSHAKEABLE MOAT',
    accent: '#C2410C',
    icon: Shield,
    rootBottleneck: 'The victimhood loop: asking “Why did this happen to me?” and waiting for an apology from reality that will never come.',
    consciousFix: 'The Post-Traumatic Growth Engine: Reframing the crisis as an initiation into profound self-sovereignty and inner authority.',
    keyRule: 'Do not wish for lighter loads; build broader, unyielding shoulders',
    quote: 'The oak fought the wind and broke; the willow bent when it must and survived. True resilience is fluid courage.',
    ctaTopic: 'Psychological Antifragility Mentorship',
    metrics: [
      { label: 'Adversity Recovery', val: '< 24 hr', status: 'Rapid Rebound' },
      { label: 'Sovereign Stance', val: 'Unbroken', status: 'Zero Victimhood' },
      { label: 'Wisdom Extraction', val: '100%', status: 'High Yield' },
    ],
  },
  {
    number: '04',
    themeName: 'Next Chapter Architecture',
    title: 'Architecting the Next Chapter & Reclaiming Agency',
    category: 'COURAGEOUS RENEWAL',
    accent: '#059669',
    icon: Mountain,
    rootBottleneck: 'Living as a ghost of your past: perpetually looking back in rearview mirrors and defining yourself by old wounds.',
    consciousFix: 'The Sovereignty Blueprint: Designing new habits, boundaries, and purposeful projects that pull you forward.',
    keyRule: 'You are not your history; you are the author of your next deliberate action',
    quote: 'There is a crack in everything; that is how the light gets in. Step into the dawn with your head held high.',
    ctaTopic: 'Next Chapter Architecture Mentorship',
    metrics: [
      { label: 'Agency Stature', val: '100%', status: 'Full Command' },
      { label: 'Future Clarity', val: 'Inspiring', status: 'Crystal Focus' },
      { label: 'Renewal Energy', val: 'High', status: 'Sovereign Drive' },
    ],
  },
];

// 4 Real-Life High-Stakes Upheaval Dilemmas (Simulator)
const TRANSITION_DILEMMAS = [
  {
    id: 'layoff-shock',
    title: 'Receiving an Abrupt Friday Layoff Notice',
    tag: 'CAREER SHOCKWAVE',
    scenario: 'After 8 years of relentless dedication, an automated calendar invite leads to a cold 5-minute exit speech and HR laptop confiscation.',
    trap: 'Angrily flaming the company on social media, begging for your role back, or drinking yourself to sleep in bitter shame.',
    shift: 'Corporate layoffs are financial algorithms, not a verdict on your human competence. Take sovereign ownership of your exit.',
    script: 'Sit straight. Breathe slowly. Look the manager in the eye and say calmly: “I appreciate the directness. Let’s ensure my severance terms and intellectual property rights are cleanly formalized in writing before day’s end.”',
    accent: '#EA580C',
  },
  {
    id: 'signing-divorce',
    title: 'Signing Divorce Papers & Packing Belongings',
    tag: 'RELATIONAL RESTRUCTURING',
    scenario: 'Holding a pen over separation documents as 12 years of marriage dissolve into cardboard boxes and legal clauses.',
    trap: 'Sending venomous midnight text messages, reopening bitter arguments, or giving away everything out of exhausting guilt.',
    shift: 'A relationship that ends is not a failure; it was a chapter that completed its journey. End it with quiet nobility.',
    script: 'Drop your shoulders. Refuse toxic bait. Whisper inwardly: “I release the past with peace. I step into my independent future with self-respect and clarity.”',
    accent: '#D97706',
  },
  {
    id: 'midlife-deadend',
    title: 'The Terrifying “I Wasted My Life” Midlife Moment',
    tag: 'IDENTITY CRISIS',
    scenario: 'Standing in your home at 48, surrounded by comfortable belongings, suddenly gripped by cold panic that you traded your soul for convenience.',
    trap: 'Impulsively blowing up your life with reckless affairs, quitting on a whim with no plan, or sinking into numb depression.',
    shift: 'Disillusionment is the removal of an illusion. It is the necessary door through which your authentic second half begins.',
    script: 'Look in the mirror. Smile with deep tenderness: “You did what you knew how to do. Now you know better. The second half belongs to what is real.”',
    accent: '#C2410C',
  },
  {
    id: 'chronic-diagnosis',
    title: 'Receiving an Unexpected Chronic Diagnosis',
    tag: 'PHYSICAL ADVERSITY',
    scenario: 'Sitting in a doctor’s clinic hearing news that permanently alters your physical abilities or daily lifestyle.',
    trap: 'Falling into angry despair: “Why me? God hates me,” or googling symptoms until you induce panic attacks.',
    shift: 'Your body is not your enemy; it is doing its best under difficult circumstances. Transition from panic to a disciplined healing protocol.',
    script: 'Take a slow, deep breath. Look at the doctor and ask: “What are the top 3 high-impact lifestyle and clinical actions within my immediate control right now?”',
    accent: '#059669',
  },
];

export default function LifeTransitionsView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const activeMode = RESILIENCE_MODES[activeModeIdx];
  const activeDilemma = TRANSITION_DILEMMAS[activeDilemmaIdx];
  const activeChallenge = TRANSITION_CHALLENGES[activeChallengeIdx];

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
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#FFF7ED] text-[#431407] antialiased selection:bg-orange-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Ambient Sunlit Mountain Mesh Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[700px] rounded-full bg-gradient-to-b from-orange-300/25 via-amber-200/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[600px] rounded-full bg-gradient-to-b from-yellow-300/20 via-orange-100/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[550px] rounded-full bg-gradient-to-t from-emerald-300/15 via-teal-100/10 to-transparent blur-[120px]" />
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
        className={`fixed inset-0 z-40 bg-[#431407]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-orange-900/15 bg-[#FFF7ED] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-orange-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#EA580C]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#431407]">Life Transitions &amp; Resilience</p>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-900/15 bg-white text-[#431407] transition hover:bg-[#FFEDD5] cursor-pointer"
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
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#431407] transition hover:border-orange-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#EA580C] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#FFEDD5] p-5 border border-orange-200">
          <p className="text-sm leading-6 text-[#9A3412] font-medium">
            Ready to turn unexpected upheaval, loss, and major life disruptions into unshakeable personal power?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#EA580C] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#C2410C]"
          >
            Claim Resilience Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION WITH REALISTIC PANORAMIC BACKGROUND & RESILIENT SEEKERS
         ========================================================================= */}
      <section className="relative z-10 min-h-[94vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 select-text overflow-hidden">
        {/* Full-Bleed Photorealistic 3-Stage Story Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/life-transitions-hero.jpg"
            alt="Life Transitions, Adversity and Human Resilience - 3-Stage Transformation Story"
            className="h-full w-full object-cover object-center lg:object-right"
          />
          {/* Top Luminous White Mist Overlay (Exact match across all views) */}
          <div className="absolute inset-x-0 top-0 h-44 sm:h-60 bg-gradient-to-b from-white/85 via-white/35 to-transparent pointer-events-none" />
          {/* Left Soft White/Amber Mist Text Backing */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent pointer-events-none sm:w-[68%]" />
          {/* Bottom Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7ED] via-[#FFF7ED]/30 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Vision, Visual Story Tracker & Interactive Selector */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
              {/* Visual 3-Stage Story Badge */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-stone-200/90 text-stone-800 shadow-2xs">
                  01 The Adversity
                </span>
                <span className="text-orange-500 text-xs font-bold">&rarr;</span>
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 shadow-2xs">
                  02 Turning Point
                </span>
                <span className="text-orange-500 text-xs font-bold">&rarr;</span>
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 shadow-2xs">
                  03 Triumphant New Life
                </span>
              </div>

              {/* Live Indicator Chip */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-3.5 py-1.5 border border-orange-200/90 shadow-2xs w-fit mb-3.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EA580C]" />
                </span>
                <span className="font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#EA580C]">
                  Fluid Courage &bull; Antifragile Human Resilience
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[#431407] font-serif leading-[1.12] tracking-tight">
                Weather the Storm. <br />
                <span className="bg-gradient-to-r from-[#EA580C] via-[#D97706] to-[#059669] bg-clip-text text-transparent">
                  Rise in Sovereignty.
                </span>
              </h1>

              {/* Minimal Punchy Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-[#7C2D12] leading-relaxed max-w-xl font-medium">
                Transform unexpected upheaval, career loss, midlife reckoning, and grief into unshakeable inner maturity, fluid courage, and an extraordinary next chapter.
              </p>

              {/* 5 Real Transition Dilemmas vs Conscious Solutions Selector */}
              <div className="mt-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7C2D12]">
                    Life Upheavals vs. Antifragile Breakthroughs:
                  </span>
                  <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-900">
                    5 Dimensions
                  </span>
                </div>

                {/* Stage Tabs */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {TRANSITION_CHALLENGES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveChallengeIdx(idx)}
                      className={`text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                        activeChallengeIdx === idx
                          ? 'bg-[#431407] text-white shadow-sm scale-102 ring-2 ring-orange-400/50'
                          : 'bg-white/90 border border-orange-200/90 text-[#431407] hover:bg-white hover:border-orange-400'
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
                          The Upheaval / Shock:
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
                          Antifragile Breakthrough:
                        </span>
                      </div>
                      <p className="text-xs text-[#431407] font-semibold leading-relaxed">
                        {activeChallenge.solution}
                      </p>
                    </div>
                  </div>

                  {/* Immediate Actionable Micro-Step */}
                  <div className="mt-2.5 pt-2 border-t border-orange-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#7C2D12] font-medium">
                      🎯 <strong className="text-[#431407]">Grounded Action:</strong> {activeChallenge.action}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EA580C] via-[#D97706] to-[#C2410C] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(234,88,12,0.5)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Claim 1-on-1 Resilience Mentorship</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#resilience-cockpit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-3 text-xs sm:text-sm font-bold text-[#431407] border border-orange-200/90 shadow-2xs hover:bg-white hover:border-orange-400 transition-all cursor-pointer"
                >
                  <span>Resilience Cockpit &darr;</span>
                </a>

                <a
                  href="#resilience-engines"
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-3 text-xs sm:text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-all cursor-pointer"
                >
                  <span>4 Resilience Engines</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Kept completely open so the photorealistic Indian individuals after the storm in the background photograph are unobstructed */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: THE 4 RESILIENCE ENGINES (2x2 BENTO MATRIX)
         ========================================================================= */}
      <section id="resilience-engines" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-14 sm:py-20 scroll-mt-16 select-text">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 border border-orange-200/80 shadow-xs mb-3">
            <span className="h-2 w-2 rounded-full bg-[#EA580C] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#EA580C]">
              Antifragile Core Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#431407] font-serif tracking-tight">
            The 4 Engines of Human Resilience
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#7C2D12] font-medium max-w-2xl mx-auto">
            Engineered to guide your nervous system from shock and disorientation into fluid courage, emotional metabolism, and sovereign reinvention:
          </p>
        </div>

        {/* 2x2 Bento Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {RESILIENCE_ARENAS.map((arena, idx) => {
            const Icon = arena.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-8 border border-orange-900/10 bg-gradient-to-br from-white via-[#FFF7ED] to-orange-50/20 backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(234,88,12,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(234,88,12,0.2)] transition-all duration-300 flex flex-col justify-between"
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
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#431407] font-serif leading-snug mb-3">
                    {arena.title}
                  </h3>

                  {/* High-Tech Interactive Code-Based Telemetry Widget */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                        Resilience Calibration
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
                        The Transition Trap
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
                        Antifragile Actionable Protocol
                      </span>
                    </div>
                    <p className="text-xs text-[#431407] font-semibold leading-relaxed pl-5">
                      {arena.consciousFix}
                    </p>
                  </div>

                  {/* Timeless Wisdom Law Quote */}
                  <div
                    className="rounded-lg border-l-3 pl-3 py-1 mb-5 bg-orange-50/50"
                    style={{ borderLeftColor: arena.accent }}
                  >
                    <p className="text-xs italic font-serif text-[#7C2D12] leading-snug">
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
          SCREEN 3: HIGH-STAKES UPHEAVAL & RESILIENCE DILEMMA SIMULATOR
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="rounded-3xl border border-orange-900/15 bg-gradient-to-br from-white via-[#FFF7ED] to-orange-50/50 p-6 sm:p-9 shadow-md">
          
          <div className="max-w-2xl mb-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#EA580C]">
              <Zap className="h-4 w-4 text-orange-600" />
              <span>Resilience Simulation &bull; Poise Under Shock</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#431407] mt-1 font-serif">
              Poise &amp; Sovereignty Under Unexpected Shocks
            </h2>
            <p className="text-xs sm:text-sm text-[#7C2D12] mt-1 font-medium">
              Click any life transition or unexpected crisis below to view the word-for-word grounded response:
            </p>
          </div>

          {/* Dilemma Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TRANSITION_DILEMMAS.map((dilemma, idx) => (
              <button
                key={dilemma.id}
                type="button"
                onClick={() => setActiveDilemmaIdx(idx)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeDilemmaIdx === idx
                    ? 'bg-[#431407] text-white shadow-sm -translate-y-0.5'
                    : 'bg-white border border-orange-900/10 text-[#431407] hover:bg-orange-50'
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
                  The Sudden Shock ({activeDilemma.tag})
                </span>
                <h3 className="text-base font-bold text-[#2A151B] mb-2.5">
                  {activeDilemma.scenario}
                </h3>
                <div className="rounded-xl border border-rose-200 bg-white/85 p-3">
                  <span className="font-mono text-xs font-bold uppercase text-rose-800 block mb-1">
                    ❌ The Reactive Victim Trap:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4C1D24] leading-relaxed font-medium">
                    {activeDilemma.trap}
                  </p>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-rose-700">
                Result: Spikes cortisol, burns emotional stamina &amp; freezes forward agency
              </span>
            </div>

            {/* The Grounded Protocol */}
            <div className="md:col-span-7 rounded-2xl border border-orange-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#EA580C] block mb-1">
                  ✅ The Grounded Protocol (What to Say &amp; Do):
                </span>
                <p className="text-base sm:text-lg text-[#431407] font-serif italic leading-relaxed my-3 bg-orange-50/60 p-4 rounded-xl border border-orange-100">
                  {activeDilemma.script}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-[#C2410C]">
                  <CheckCircle2 className="h-4 w-4 text-[#EA580C] shrink-0" />
                  <span>Cognitive Shift: {activeDilemma.shift}</span>
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-orange-900/10 flex items-center justify-between text-xs font-mono text-[#EA580C] font-bold">
                <span>Practiced in 1-on-1 Resilience Mentorship</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 4: BITTER VICTIMHOOD VS. PRANAV MAHAJAN ANTIFRAGILE RESILIENCE
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#EA580C]">
            The Structural Paradigm Shift
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#431407] mt-1 font-serif">
            Why Passive Resistance Breaks vs. Why Antifragility Triumphs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Passive Resistance & Victimhood */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-mono font-bold text-slate-600 mb-4">
              <span>Passive Resistance &amp; Victimhood Trap</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Rages against reality, wasting precious energy demanding an unfair world apologize.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Clings desperately to dead chapters, identities, and relationships that have completed.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Numbs grief through frantic overwork, shopping, or addiction, postponing real healing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Permits past wounds to define their ceiling, living as a traumatized ghost of who they once were.</span>
              </li>
            </ul>
          </div>

          {/* Pranav Mahajan Antifragile Resilience */}
          <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/50 p-6 sm:p-8 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-3.5 py-1 text-xs font-mono font-bold text-white mb-4">
              <span>Pranav Mahajan Antifragile Mentorship</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#431407] font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>Fluid courage: bend like the willow without breaking; accept reality instantly to conquer it.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>Clean emotional metabolism: grieve loss completely so pain does not harden into cynicism.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>Post-traumatic growth: extract wisdom from every rupture to build unshakeable self-sovereignty.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>Next chapter authorship: step boldly through the threshold with renewed agency and clear vision.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl border border-orange-900/15 bg-gradient-to-r from-[#431407] via-[#7C2D12] to-[#431407] p-8 sm:p-12 text-center text-white shadow-xl max-w-4xl mx-auto">
          <Mountain className="h-10 w-10 text-amber-300 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-4xl font-extrabold font-serif mb-3">
            Emerge Antifragile from Life’s Crucible
          </h3>
          <p className="text-xs sm:text-sm text-orange-200 max-w-xl mx-auto mb-6">
            Schedule a personalized 1-on-1 resilience mentorship session with Pranav Mahajan to steady your nervous system, navigate major transitions, and build your extraordinary next chapter.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start 1-on-1 Resilience Mentorship &rarr;</span>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION: RESILIENCE COCKPIT (Interactive Telemetry & Somatic Stasis Gauge)
          Relocated to bottom to keep Screen 1 airy and panoramic
         ========================================================================= */}
      <section id="resilience-cockpit" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 scroll-mt-20 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 border border-orange-200/90 shadow-2xs mb-2">
            <Activity className="h-3.5 w-3.5 text-[#EA580C]" />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#EA580C]">
              Interactive Cockpit &bull; Live Telemetry
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#431407] font-serif">
            Somatic Resilience &amp; Adaptation Cockpit
          </h2>
          <p className="text-xs sm:text-sm text-[#7C2D12] mt-1">
            Toggle between the 4 resilience modes to calibrate your nervous system stasis, emotional metabolism, and next chapter velocity.
          </p>
        </div>

        {/* 4 Mode Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {RESILIENCE_MODES.map((mode, idx) => {
            const Icon = mode.icon;
            const isSelected = activeModeIdx === idx;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveModeIdx(idx)}
                className={`flex items-center gap-2 p-3 rounded-2xl border text-left transition-all duration-300 shadow-2xs cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#EA580C] ring-2 ring-orange-200 scale-102 shadow-sm'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-orange-300'
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
        <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#FFF7ED] to-orange-50/40 border border-orange-200/90 shadow-[0_20px_50px_-15px_rgba(234,88,12,0.18)] overflow-hidden">
          {/* Ambient Mesh Glow behind widget */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-700"
            style={{ backgroundColor: activeMode.accentColor }}
          />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

          {/* Top System Status Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-orange-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: activeMode.accentColor }}
                />
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                Resilience State: {activeMode.headingTheme}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 border border-orange-200/80 text-[10.5px] font-mono font-bold text-[#EA580C]">
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
            <div className="absolute flex flex-col items-center justify-center text-center p-4 rounded-full w-36 h-36 sm:w-40 sm:h-40 bg-white/95 border border-orange-100 shadow-xl backdrop-blur-md">
              <div
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl text-white shadow-md transition-all duration-500 mb-1"
                style={{ backgroundColor: activeMode.accentColor }}
              >
                {React.createElement(activeMode.icon, { className: 'h-5 w-5' })}
              </div>
              <span className="font-mono text-base sm:text-lg font-black text-slate-900 leading-none">
                {activeModeIdx === 0
                  ? '98.5%'
                  : activeModeIdx === 1
                  ? '100%'
                  : activeModeIdx === 2
                  ? 'Antifragile'
                  : 'Renewed'}
              </span>
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-400 mt-0.5">
                {activeModeIdx === 0
                  ? 'Adaptation Flow'
                  : activeModeIdx === 1
                  ? 'Somatic Release'
                  : activeModeIdx === 2
                  ? 'Inner Moat'
                  : 'Agency Reclaimed'}
              </span>
            </div>

            {/* Floating Satellite Telemetry Chips */}
            <div className="absolute -top-1 left-2 sm:left-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Nervous System: Grounded</span>
            </div>

            <div className="absolute -bottom-1 right-2 sm:right-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-emerald-600" />
              <span>Cortisol Clearance: Fast</span>
            </div>
          </div>

          {/* 3-Stage Resilience Roadmap */}
          <div className="mt-4 pt-3.5 border-t border-orange-100 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                Sovereign Renewal Pathway
              </span>
              <span className="font-mono text-[10.5px] font-bold text-[#EA580C]">
                Transformation Cycle
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/90 text-center">
                <span className="font-mono text-[8.5px] text-slate-400 uppercase block">Stage 01</span>
                <span className="font-bold text-xs text-slate-800 block mt-0.5">Grounding Shock</span>
                <span className="text-[10px] text-slate-500 block truncate">Somatic Reset</span>
              </div>

              <div className="rounded-xl bg-orange-50/70 p-2.5 border border-orange-200 text-center relative">
                <span className="font-mono text-[8.5px] text-[#EA580C] uppercase block font-bold">Stage 02</span>
                <span className="font-bold text-xs text-[#431407] block mt-0.5">Clean Grief</span>
                <span className="text-[10px] text-orange-700 font-semibold block truncate">Metabolize Pain</span>
              </div>

              <div className="rounded-xl bg-emerald-50/70 p-2.5 border border-emerald-200 text-center">
                <span className="font-mono text-[8.5px] text-emerald-600 uppercase block font-bold">Stage 03</span>
                <span className="font-bold text-xs text-emerald-950 block mt-0.5">Next Chapter</span>
                <span className="text-[10px] text-emerald-700 font-semibold block truncate">Sovereign Build</span>
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
          <span className="h-px w-20 bg-orange-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#EA580C]" />
          <span className="h-px w-20 bg-orange-900/20" />
        </div>

        <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#431407] max-w-2xl mx-auto leading-relaxed">
          &ldquo;The oak fought the wind and broke; the willow bent when it must and survived. True resilience is fluid courage.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#EA580C]">
          — Pranav Mahajan &bull; Dimension 09
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/spirituality-philosophy"
            className="inline-flex items-center gap-2.5 rounded-full border border-orange-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#431407] shadow-xs transition hover:bg-white hover:border-orange-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Spirituality &amp; Metaphysics</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#EA580C] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#C2410C] cursor-pointer"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/technology-literacy"
            className="inline-flex items-center gap-2.5 rounded-full border border-orange-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#431407] shadow-xs transition hover:bg-white hover:border-orange-400 cursor-pointer"
          >
            <span>Next: Technology Literacy</span>
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
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#EA580C] text-white shadow-2xl hover:bg-[#C2410C] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in cursor-pointer"
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
