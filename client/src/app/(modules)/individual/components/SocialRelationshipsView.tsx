'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Globe2,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Radio,
  Compass,
  MessageSquare,
  Award,
  Zap,
  TrendingUp,
  Sliders,
  ChevronRight,
  Check,
  Flame,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Signature Social Fluency Anchors
const SOCIAL_ANCHORS = [
  {
    id: 'presence',
    label: 'Authentic Presence',
    tag: '01 • CHARISMA',
    accentColor: '#D97706',
    accentBg: 'bg-amber-100 text-amber-800',
    btnBg: 'bg-[#B45309]',
    icon: Sparkles,
    headingTheme: 'Warm Amber Gold',
    rule: 'Be interested, not interesting',
    tip: 'Grounded eye contact, calm vocal cadence, and curious listening that makes everyone feel seen and elevated.',
    radarLabel: 'Presence: 98%',
    activePhrase: 'Anchor your breathing, eliminate fidgeting, and listen with 100% stillness.',
  },
  {
    id: 'boundaries',
    label: 'Boundary Poise',
    tag: '02 • BOUNDARY',
    accentColor: '#0284C7',
    accentBg: 'bg-sky-100 text-sky-800',
    btnBg: 'bg-[#0369A1]',
    icon: Shield,
    headingTheme: 'Aegean Cobalt',
    rule: 'Clarity over compliance',
    tip: 'Say "no" with genuine warmth and absolute conviction. True peers respect boundaries; users resent them.',
    radarLabel: 'Sovereignty: 94%',
    activePhrase: '“Thank you for thinking of me! I am fully booked and won’t be able to join.”',
  },
  {
    id: 'network',
    label: 'High-Value Ecology',
    tag: '03 • CIRCLES',
    accentColor: '#0D9488',
    accentBg: 'bg-teal-100 text-teal-800',
    btnBg: 'bg-[#0F766E]',
    icon: Users,
    headingTheme: 'Emerald Teal',
    rule: 'Audit energy, not just history',
    tip: 'Curate circles that demand your growth; phase out cynical, gossip-driven cliques quietly without drama.',
    radarLabel: 'Ecology: 96%',
    activePhrase: 'Disengage from gossip silently and steer conversations toward what others are building.',
  },
  {
    id: 'reputation',
    label: 'Cultural Dexterity',
    tag: '04 • AGILITY',
    accentColor: '#2563EB',
    accentBg: 'bg-blue-100 text-blue-800',
    btnBg: 'bg-[#1D4ED8]',
    icon: Globe2,
    headingTheme: 'Sapphire Navy',
    rule: 'Context before assumption',
    tip: 'Read high-context unspoken cues, honor diverse traditions, and bridge cross-cultural environments effortlessly.',
    radarLabel: 'Agility: 95%',
    activePhrase: 'Replace defensive reflexes with humble inquiry: “Tell me how this is traditionally done here.”',
  },
];

// 4 Pillars of Social Reputation & Cultural Dexterity
const SOCIAL_PILLARS = [
  {
    number: '01',
    themeName: 'Warm Amber Gold',
    title: 'Authentic Influence & Grounded Presence',
    category: 'PRESENCE & CHARISMA',
    accent: '#D97706',
    accentBg: 'bg-amber-50 border-amber-200/80 text-amber-950',
    badgeStyle: 'bg-amber-600 text-white',
    icon: Sparkles,
    image: '/images/pillar_01.jpg',
    rootBottleneck: 'Trying desperately to be interesting; performative storytelling that makes rooms guarded.',
    consciousFix: 'Presence over performance: grounded stillness and genuine curiosity that elevates others.',
    keyRule: 'Be interested, not interesting',
    quote: 'Influence is never about commanding attention; it is about providing unshakeable psychological calm.',
    ctaTopic: 'Pillar 01 - Authentic Influence & Presence',
  },
  {
    number: '02',
    themeName: 'Aegean Cobalt',
    title: 'Boundary Poise & Sovereignty',
    category: 'SOCIAL BANDWIDTH',
    accent: '#0284C7',
    accentBg: 'bg-sky-50 border-sky-200/80 text-sky-950',
    badgeStyle: 'bg-sky-600 text-white',
    icon: Shield,
    image: '/images/pillar_02.jpg',
    rootBottleneck: 'Chronic people-pleasing: saying yes out of guilt and feeling resentful.',
    consciousFix: 'Sovereign brevity: declining entitled requests with warmth, brevity, and zero defensiveness.',
    keyRule: 'Clarity over compliance',
    quote: 'True peers respect clear boundaries. Users resent them. Never apologize for protecting your energy.',
    ctaTopic: 'Pillar 02 - Boundary Poise & Sovereignty',
  },
  {
    number: '03',
    themeName: 'Emerald Teal',
    title: 'Curating High-Vibration Circles',
    category: 'SOCIAL ECOLOGY',
    accent: '#0D9488',
    accentBg: 'bg-teal-50 border-teal-200/80 text-teal-950',
    badgeStyle: 'bg-teal-600 text-white',
    icon: Users,
    image: '/images/pillar_03.jpg',
    rootBottleneck: 'Passive social accumulation: clinging to cynical, gossip-driven cliques out of nostalgia.',
    consciousFix: 'The 5-Person Energy Audit: curating ambitious peers whose integrity elevates your standard.',
    keyRule: 'Audit energy, not just history',
    quote: 'Your nervous system mirrors the 5 people you give access to. Curate your social ecology ruthlessly.',
    ctaTopic: 'Pillar 03 - High-Vibration Circles',
  },
  {
    number: '04',
    themeName: 'Sapphire Navy',
    title: 'Long-Term Reputation Stewardship',
    category: 'CHARACTER INTEGRITY',
    accent: '#2563EB',
    accentBg: 'bg-blue-50 border-blue-200/80 text-blue-950',
    badgeStyle: 'bg-blue-600 text-white',
    icon: Globe2,
    image: '/images/pillar_04.jpg',
    rootBottleneck: 'Chasing transactional leverage, shortcuts, or gossip that permanently erodes trust.',
    consciousFix: 'Unassailable character: keeping minor promises under pressure and building trust that precedes you.',
    keyRule: 'Integrity outlasts opportunism',
    quote: 'Reputation takes a decade of quiet discipline to construct and ten careless seconds to compromise.',
    ctaTopic: 'Pillar 04 - Reputation Stewardship',
  },
];

// 4 Interactive High-Pressure Social Scenarios
const SOCIAL_SCENARIOS = [
  {
    id: 'room',
    name: 'Elite Rooms',
    category: 'High-Status Gatherings',
    scenario: 'Stepping into a Room of Industry Titans or High-Net-Worth Peers',
    instinctTrap: 'Overcompensating by name-dropping, boasting, or hiding near the back wall in insecurity.',
    shift: 'Enter as a generous contributor seeking to understand and connect dots, not an approval seeker.',
    script: '“Good evening. What is the single most exciting problem your team is unlocking right now?”',
    accent: '#D97706',
  },
  {
    id: 'backhanded',
    name: 'Disrespect',
    category: 'Passive Aggression',
    scenario: 'Handling a Public Backhanded Compliment or Smirk',
    instinctTrap: 'Laughing along nervously, looking visibly hurt, or firing back with an aggressive sarcastic insult.',
    shift: 'Reflect their passive aggression back to them with unruffled, calm curiosity without taking the bait.',
    script: 'Hold steady eye contact, smile softly, and ask: “What an interesting remark. What specifically did you mean by that?”',
    accent: '#0284C7',
  },
  {
    id: 'saying-no',
    name: 'Saying No',
    category: 'Guilt-Free Boundaries',
    scenario: 'Declining an Entitled Favor from a Friend Without Damaging the Bond',
    instinctTrap: 'Agreeing out of guilt and feeling resentful, or over-explaining with elaborate fake excuses.',
    shift: 'Protect your energy bandwidth cleanly while validating the personal relationship warmly.',
    script: '“I value our bond immensely, which is why I want to be direct: I cannot take this on right now. Let’s grab coffee next week.”',
    accent: '#0D9488',
  },
  {
    id: 'misunderstanding',
    name: 'Cultural Nuance',
    category: 'Cross-Cultural Faux Pas',
    scenario: 'Unintended Cultural Misstep in Multi-Cultural Environments',
    instinctTrap: 'Defensively explaining why it’s normal in your culture, or over-apologizing and making it uncomfortable.',
    shift: 'Replace defensive reflex with humble, curious inquiry. Humility builds instant cross-cultural rapport.',
    script: '“I realize this gesture may have landed differently here. I deeply respect your customs—tell me how this is traditionally done.”',
    accent: '#2563EB',
  },
];

// 5 Social Calibration Shifts (Matrix)
const CALIBRATION_SHIFTS = [
  {
    dimension: 'Networking Agenda',
    oldTrap: 'Extracting favors, elevator pitches, transactional card swaps',
    consciousShift: 'Generous dot-connecting, insightful questions, long-term reciprocity',
    accent: '#D97706',
  },
  {
    dimension: 'Conversation Dynamic',
    oldTrap: 'Waiting to speak, competitive monologue, performative bragging',
    consciousShift: 'Active stillness, calibrated listening, making others feel expanded',
    accent: '#0284C7',
  },
  {
    dimension: 'Boundary Setting',
    oldTrap: 'Chronic compliance, over-explaining excuses, post-event guilt',
    consciousShift: 'Warm, clear, sovereign brevity: declining without defensiveness',
    accent: '#0D9488',
  },
  {
    dimension: 'Reputation Stewardship',
    oldTrap: 'Superficial PR, image curation, participating in backchannel gossip',
    consciousShift: 'Unassailable character: integrity when nobody is watching',
    accent: '#2563EB',
  },
  {
    dimension: 'Cultural Navigation',
    oldTrap: 'Imposing personal norms, misinterpreting high-context cues',
    consciousShift: 'Cultural dexterity: observing context and honoring local traditions',
    accent: '#B45309',
  },
];

export default function SocialRelationshipsView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState(SOCIAL_ANCHORS[0]);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationPhase, setCalibrationPhase] = useState<'Centering' | 'Scanning' | 'Attuning' | 'Resonating' | 'Listening'>('Centering');
  const [liveScore, setLiveScore] = useState('98.4%');
  const [calibratingHz, setCalibratingHz] = useState('7.83 Hz');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollRootRef = useRef<HTMLDivElement>(null);

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

  // Live Resonance Calibrator Loop with Telemetry Fluctuations
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalibrating) {
      interval = setInterval(() => {
        setCalibrationPhase((prev) => {
          if (prev === 'Centering') return 'Scanning';
          if (prev === 'Scanning') return 'Attuning';
          if (prev === 'Attuning') return 'Resonating';
          if (prev === 'Resonating') return 'Listening';
          return 'Centering';
        });
        const randomScore = (98 + Math.random() * 1.6).toFixed(1);
        setLiveScore(`${randomScore}%`);
        const randomHz = (7.8 + Math.random() * 0.45).toFixed(2);
        setCalibratingHz(`${randomHz} Hz`);
      }, 1800);
    } else {
      setCalibrationPhase('Centering');
      setLiveScore('98.4%');
      setCalibratingHz('7.83 Hz');
    }
    return () => clearInterval(interval);
  }, [isCalibrating]);

  const activeScenario = SOCIAL_SCENARIOS[activeScenarioIdx];
  const activePillar = SOCIAL_PILLARS[activePillarIdx];

  return (
    <div
      ref={scrollRootRef}
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#F0F7FA] text-[#0C2D3A] antialiased selection:bg-sky-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Luminous Architectural Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[700px] rounded-full bg-gradient-to-b from-sky-300/30 via-cyan-200/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[600px] rounded-full bg-gradient-to-b from-amber-200/25 via-orange-100/15 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[550px] rounded-full bg-gradient-to-t from-teal-200/20 via-emerald-100/15 to-transparent blur-[120px]" />
      </div>

      {/* =========================================================================
          OFFICIAL TRANSPARENT HEADER (Exact match to HealthWellbeingView)
          Logo left, Pill button + Menu button right (No solid bar spanning across)
         ========================================================================= */}
      <header className="relative z-50 flex items-center justify-between border-b border-sky-900/10 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" aria-label="Pranav Mahajan home" className="inline-flex items-center group">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(2,132,199,0.35)] transition-transform duration-300 group-hover:scale-105 sm:h-16 md:h-20"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-sky-400/50 bg-[#0C4A6E]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-sky-200 shadow-[0_4px_16px_rgba(2,132,199,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-sky-300 hover:bg-[#075985] hover:text-white sm:px-5 sm:py-2"
          >
            Sign Up
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-sky-400/30 bg-[#082F49]/90 text-white shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-[#0C4A6E] hover:border-sky-300 active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-sky-300" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-sky-100" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#0284C7]" />
                <span className="h-0.5 w-4 rounded-full bg-sky-100" />
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
        className={`fixed inset-0 z-40 bg-[#061B24]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-sky-900/15 bg-[#F0F7FA] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-sky-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0284C7]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#0C2D3A]">Social Mastery &amp; Reputation</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-900/15 bg-[#FFF] text-[#0C2D3A] transition hover:bg-[#E0EFF5]"
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
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#0C2D3A] transition hover:border-sky-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#0284C7] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#E0EFF5] p-5">
          <p className="text-sm leading-6 text-[#0F3949]">
            Ready to step into effortless social fluency, unassailable trust, and cultural agility?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0284C7] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0369A1]"
          >
            Start Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION & SIGNATURE SOCIAL RESONANCE POD
         ========================================================================= */}
      <section className="relative z-10 min-h-[calc(100dvh-70px)] flex items-center px-4 sm:px-8 lg:px-12 2xl:px-16 py-6 sm:py-10 select-text">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Luxury Editorial Headline, Actions & 4 Fluency Anchors */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Dimension Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-900/15 bg-white/90 px-4 py-1.5 backdrop-blur-md shadow-xs mb-3 transition hover:scale-105 hover:bg-white">
              <span className="flex h-2 w-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
                Dimension 05 &bull; SocialFluency
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#082F49] leading-[1.12] font-serif">
              Social Reputation &amp; <br />
              Fluency<span className="text-[#0284C7]">.</span>
            </h1>

            {/* Minimal Frosted Glass Tagline */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-2xl border border-sky-900/10 bg-white/85 px-4 py-2 backdrop-blur-md shadow-xs">
              <span className="text-[#0284C7] text-sm">✦</span>
              <p className="text-xs sm:text-sm font-medium text-[#0C4A6E] leading-relaxed">
                Navigate high-stakes rooms with calm presence, build unshakeable credibility, and master cultural nuance.
              </p>
            </div>

            {/* Interactive Audio Reflection & Primary CTA */}
            <div className="mt-5 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Pause social reflection' : 'Listen intro'}
                className={`group flex items-center gap-2.5 rounded-full border border-sky-800/20 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-sky-400 ${
                  isPlayingAudio ? 'ring-2 ring-sky-400 bg-sky-50' : ''
                }`}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#0284C7] to-[#0369A1] text-white shadow-xs">
                  {isPlayingAudio ? (
                    <Pause className="h-3 w-3 animate-pulse" />
                  ) : (
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  )}
                </div>
                <span className="text-xs font-bold text-[#082F49]">
                  {isPlayingAudio ? 'Playing Reflection...' : 'Listen Intro (1-Min)'}
                </span>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className={`h-2.5 w-0.5 rounded-full bg-[#0284C7] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                  <span className={`h-3.5 w-0.5 rounded-full bg-[#0284C7] ${isPlayingAudio ? 'animate-bounce' : 'opacity-40'}`} />
                  <span className={`h-2 w-0.5 rounded-full bg-[#0284C7] ${isPlayingAudio ? 'animate-pulse' : 'opacity-40'}`} />
                </div>
              </button>

              <a
                href="#social-pillars"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0C4A6E] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_25px_rgba(2,132,199,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(2,132,199,0.4)] active:scale-95"
              >
                <span>Explore 4 Pillars</span>
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </a>
            </div>

            {/* Active Audio Card Preview */}
            {isPlayingAudio && (
              <div className="mt-3.5 flex items-center gap-3 rounded-2xl border border-sky-400/40 bg-white/95 p-3 shadow-md backdrop-blur-md max-w-md animate-in fade-in slide-in-from-top-2">
                <Volume2 className="h-4 w-4 text-[#0284C7] animate-pulse shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#082F49]">Social Resonance &bull; Pranav Mahajan</p>
                  <p className="text-[#0369A1] italic text-[11px] mt-0.5">
                    &ldquo;Influence is never about impressing a room; it is about making everyone in the room feel seen, safe, and expanded.&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* 4 Interactive Social Anchors */}
            <div className="mt-6 w-full max-w-xl">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0369A1] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#0284C7]" />
                  <span>4 Social Fluency Anchors</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Select to recalibrate pod
                </span>
              </div>

              {/* 4 Modern Interactive Luxury Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {SOCIAL_ANCHORS.map((anchor) => {
                  const Icon = anchor.icon;
                  const isSelected = activeAnchor.id === anchor.id;
                  return (
                    <div
                      key={anchor.id}
                      onClick={() => setActiveAnchor(anchor)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setActiveAnchor(anchor);
                      }}
                      className={`group relative flex flex-col justify-between rounded-2xl p-3 sm:p-3.5 text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                        isSelected
                          ? 'bg-white shadow-[0_12px_28px_-6px_rgba(2,132,199,0.24)] -translate-y-1'
                          : 'bg-white/85 hover:bg-white border-slate-200/80 hover:border-sky-300 hover:-translate-y-0.5 hover:shadow-md'
                      }`}
                      style={{
                        borderColor: isSelected ? anchor.accentColor : undefined,
                        boxShadow: isSelected ? `0 12px 28px -4px ${anchor.accentColor}35` : undefined,
                      }}
                    >
                      {/* Top Ambient Accent Line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                        style={{
                          backgroundColor: anchor.accentColor,
                          opacity: isSelected ? 1 : 0.35,
                        }}
                      />

                      {/* Top Row: Icon + Tag */}
                      <div className="flex items-center justify-between mb-2 mt-0.5">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-xl shadow-2xs transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: isSelected ? anchor.accentColor : `${anchor.accentColor}18`,
                            color: isSelected ? '#FFFFFF' : anchor.accentColor,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <span
                          className="font-mono text-[9px] font-bold uppercase tracking-wider"
                          style={{ color: anchor.accentColor }}
                        >
                          {anchor.tag.split('•')[0]?.trim()}
                        </span>
                      </div>

                      {/* Title & Category */}
                      <div>
                        <h4 className="text-xs sm:text-[13px] font-bold text-[#082F49] leading-tight mb-0.5 group-hover:text-[#0284C7] transition-colors">
                          {anchor.label}
                        </h4>
                        <p className="text-[10px] font-mono text-slate-500 truncate">
                          {anchor.tag.split('•')[1]?.trim() || anchor.tag}
                        </p>
                      </div>

                      {/* Rule Footer */}
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] font-medium text-slate-600">
                        <span className="truncate italic">“{anchor.rule}”</span>
                        {isSelected && (
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0 animate-ping ml-1"
                            style={{ backgroundColor: anchor.accentColor }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Instant Tip Box */}
              <div
                className="mt-3 rounded-2xl bg-white/95 border p-3.5 backdrop-blur-md shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-300"
                style={{ borderColor: `${activeAnchor.accentColor}35` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-xl shrink-0 mt-0.5 text-white shadow-2xs"
                    style={{ backgroundColor: activeAnchor.accentColor }}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] text-[#0C2D3A] font-medium leading-relaxed">
                      <strong style={{ color: activeAnchor.accentColor }}>{activeAnchor.label}:</strong> {activeAnchor.tip}
                    </p>
                  </div>
                </div>

                <span
                  className="font-mono text-[10px] px-2.5 py-1 rounded-full shrink-0 font-bold border self-end sm:self-center shadow-2xs whitespace-nowrap"
                  style={{
                    backgroundColor: `${activeAnchor.accentColor}12`,
                    color: activeAnchor.accentColor,
                    borderColor: `${activeAnchor.accentColor}30`,
                  }}
                >
                  Rule: {activeAnchor.rule}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Social Resonance Pod (Signature Animated Visualizer) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <style>{`
              @keyframes radarSweep {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes radarPulseWave {
                0% { transform: scale(0.65); opacity: 0.85; }
                50% { opacity: 0.35; }
                100% { transform: scale(1.35); opacity: 0; }
              }
              @keyframes eqBar1 { 0%, 100% { height: 4px; } 50% { height: 16px; } }
              @keyframes eqBar2 { 0%, 100% { height: 14px; } 50% { height: 6px; } }
              @keyframes eqBar3 { 0%, 100% { height: 8px; } 50% { height: 18px; } }
              @keyframes eqBar4 { 0%, 100% { height: 16px; } 50% { height: 7px; } }
            `}</style>

            <div className="relative w-full max-w-[430px] rounded-3xl border border-white/95 bg-gradient-to-b from-white/95 via-white/90 to-sky-50/60 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(2,132,199,0.18)] flex flex-col justify-between overflow-hidden">
              
              {/* Dynamic Ambient Background Glow */}
              <div
                className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-[80px] pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: `${activeAnchor.accentColor}25` }}
              />

              {/* Pod Header */}
              <div className="flex items-center justify-between border-b border-sky-900/10 pb-3 mb-3 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-xs transition-colors duration-300"
                    style={{ backgroundColor: activeAnchor.accentColor }}
                  >
                    <Radio className="h-4 w-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] block">
                      Social Resonance Pod
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#082F49]">
                      Presence &amp; Poise Radar
                    </h3>
                  </div>
                </div>

                {/* Live Status Chip */}
                <div
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold shadow-2xs border transition-colors duration-300"
                  style={{
                    backgroundColor: `${activeAnchor.accentColor}14`,
                    color: activeAnchor.accentColor,
                    borderColor: `${activeAnchor.accentColor}30`,
                  }}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isCalibrating ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
                    }`}
                  />
                  <span>
                    {isCalibrating
                      ? `${calibrationPhase} • ${calibratingHz}`
                      : activeAnchor.radarLabel}
                  </span>
                </div>
              </div>

              {/* Center Radar Waves Visualizer (Animated Radar Grid + Sweep + Blips) */}
              <div className="relative py-2 flex flex-col items-center justify-center text-center z-10">
                
                {/* Radar Circular Stage */}
                <div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center rounded-full border border-sky-300/40 shadow-inner overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(2, 132, 199, 0.08) 0%, rgba(12, 74, 110, 0.04) 65%, transparent 100%)',
                  }}
                >
                  {/* Concentric Range Rings */}
                  <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-sky-400/20 pointer-events-none" />
                  <div className="absolute w-36 h-36 sm:w-42 sm:h-42 rounded-full border border-dashed border-sky-300/30 pointer-events-none" />
                  <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-sky-400/25 pointer-events-none" />

                  {/* Coordinate Axes Crosshairs */}
                  <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-sky-300/35 to-transparent pointer-events-none" />
                  <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-sky-300/35 to-transparent pointer-events-none" />

                  {/* Degree Markers */}
                  <span className="absolute top-1 text-[7.5px] font-mono text-sky-400/60 pointer-events-none">0° N</span>
                  <span className="absolute right-1 text-[7.5px] font-mono text-sky-400/60 pointer-events-none">90° E</span>
                  <span className="absolute bottom-1 text-[7.5px] font-mono text-sky-400/60 pointer-events-none">180° S</span>
                  <span className="absolute left-1 text-[7.5px] font-mono text-sky-400/60 pointer-events-none">270° W</span>

                  {/* Continuous Radar Sweep Overlay */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${activeAnchor.accentColor}06 310deg, ${activeAnchor.accentColor}40 360deg)`,
                      animation: isCalibrating ? 'radarSweep 1.8s linear infinite' : 'radarSweep 4.2s linear infinite',
                      transformOrigin: 'center center',
                    }}
                  />

                  {/* Expanding Pulsing Beacon Waves */}
                  <div
                    className="absolute inset-0 rounded-full border pointer-events-none"
                    style={{
                      borderColor: activeAnchor.accentColor,
                      animation: 'radarPulseWave 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full border pointer-events-none"
                    style={{
                      borderColor: activeAnchor.accentColor,
                      animation: 'radarPulseWave 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
                      animationDelay: '1.4s',
                    }}
                  />

                  {/* 4 Dynamic Floating Telemetry Blips */}
                  <div className="absolute top-5 right-7 flex items-center gap-1 z-20 pointer-events-none">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/90 px-1 py-0.2 rounded shadow-2xs">
                      Cadence 99%
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-7 flex items-center gap-1 z-20 pointer-events-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                    <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/90 px-1 py-0.2 rounded shadow-2xs">
                      Stillness 96%
                    </span>
                  </div>

                  <div className="absolute bottom-7 left-6 flex items-center gap-1 z-20 pointer-events-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/90 px-1 py-0.2 rounded shadow-2xs">
                      Attunement 98%
                    </span>
                  </div>

                  <div className="absolute top-6 left-6 flex items-center gap-1 z-20 pointer-events-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[7.5px] font-mono font-bold text-slate-700 bg-white/90 px-1 py-0.2 rounded shadow-2xs">
                      Sovereignty 94%
                    </span>
                  </div>

                  {/* Center Resonance Core Disc */}
                  <div
                    className="relative z-20 flex h-20 w-20 sm:h-22 sm:w-22 flex-col items-center justify-center rounded-full text-white shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${activeAnchor.accentColor}, #0C4A6E)`,
                      boxShadow: `0 10px 28px ${activeAnchor.accentColor}55`,
                    }}
                  >
                    {/* Animated EQ Bars inside Core */}
                    <div className="flex items-end gap-1 h-3 mb-1">
                      <span className="w-1 bg-white/90 rounded-full" style={{ animation: 'eqBar1 0.8s ease-in-out infinite' }} />
                      <span className="w-1 bg-white/90 rounded-full" style={{ animation: 'eqBar2 0.7s ease-in-out infinite' }} />
                      <span className="w-1 bg-white/90 rounded-full" style={{ animation: 'eqBar3 0.9s ease-in-out infinite' }} />
                      <span className="w-1 bg-white/90 rounded-full" style={{ animation: 'eqBar4 0.6s ease-in-out infinite' }} />
                    </div>

                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-sky-100">
                      {isCalibrating ? calibrationPhase : 'Core'}
                    </span>
                    <span className="text-sm sm:text-base font-black tracking-tight leading-none mt-0.5">
                      {isCalibrating ? liveScore : 'Grounded'}
                    </span>
                  </div>

                </div>

                {/* Practical Active Rule Display (Somatic Social Protocol) */}
                <div
                  className="mt-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/90 border-l-4 border shadow-xs text-left w-full transition-all duration-300"
                  style={{
                    borderLeftColor: activeAnchor.accentColor,
                    borderColor: `${activeAnchor.accentColor}25`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                      style={{ color: activeAnchor.accentColor }}
                    >
                      <Zap className="h-3 w-3" />
                      <span>Somatic Social Protocol:</span>
                    </span>
                    <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-100 text-[#0369A1]">
                      ATTUNED
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-[#082F49] leading-relaxed">
                    {activeAnchor.activePhrase}
                  </p>
                </div>
              </div>

              {/* Scenario Quick Selector & Real-World Script Card */}
              <div className="pt-3 border-t border-sky-900/10 relative z-10">
                <div className="flex items-center justify-between text-[11px] mb-2 font-medium">
                  <span className="text-[#507280] font-semibold text-[10.5px]">Real-Life Scenario:</span>
                  <div className="flex gap-1">
                    {SOCIAL_SCENARIOS.map((sc, i) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setActiveScenarioIdx(i)}
                        className={`text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                          activeScenarioIdx === i
                            ? 'bg-[#0284C7] text-white shadow-2xs scale-105'
                            : 'bg-slate-100 text-[#0C2D3A] hover:bg-slate-200'
                        }`}
                      >
                        <span>{sc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scenario Context & Word-for-Word Script Card */}
                <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs mb-3 text-left transition-all duration-300">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] font-bold text-[#082F49] leading-tight">
                      {activeScenario.scenario}
                    </p>
                    <span className="font-mono text-[8.5px] text-slate-400 shrink-0 ml-1">
                      0{activeScenarioIdx + 1}
                    </span>
                  </div>

                  <div className="mt-1.5 p-2 rounded-lg bg-sky-50/70 border border-sky-100">
                    <p className="text-[11px] sm:text-[11.5px] font-serif italic text-[#0369A1] leading-relaxed">
                      {activeScenario.script}
                    </p>
                  </div>
                  <p className="text-[9.5px] font-sans text-slate-500 mt-1.5 font-medium">
                    💡 <strong className="text-slate-700">Conscious Shift:</strong> {activeScenario.shift}
                  </p>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/signup"
                    className="text-[10.5px] sm:text-[11px] font-bold text-[#0284C7] hover:underline flex items-center gap-1 group"
                  >
                    <span>Practice in 1-on-1 Mentorship</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsCalibrating(!isCalibrating)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold transition-all duration-300 shadow-xs ${
                      isCalibrating
                        ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-400 hover:bg-amber-200 animate-pulse'
                        : 'bg-gradient-to-r from-[#0C4A6E] to-[#0284C7] text-white hover:scale-105 active:scale-95 shadow-md'
                    }`}
                  >
                    {isCalibrating ? (
                      <>
                        <Pause className="h-3 w-3" />
                        <span>Attuning...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 fill-current" />
                        <span>Live Calibrate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: 4 PILLARS OF SOCIAL REPUTATION & CULTURAL DEXTERITY
          Alternating Vertical Scroll Showcase with 8K Luxury Artwork & Action CTAs
         ========================================================================= */}
      <section id="social-pillars" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-14 sm:py-20 scroll-mt-16 select-text">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 border border-sky-200/80 shadow-xs mb-3">
            <span className="h-2 w-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0284C7]">
              Core Social Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#082F49] font-serif tracking-tight">
            The 4 Pillars of Social Sovereignty
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#4B6B78] font-medium max-w-2xl mx-auto">
            Scroll down to explore each pillar in grounded depth — pehle psychological bottleneck aur fir actionable conscious fix:
          </p>

          {/* Quick Jump Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            {SOCIAL_PILLARS.map((pillar, idx) => (
              <a
                key={idx}
                href={`#pillar-0${pillar.number}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 sm:px-4 py-1.5 text-xs font-bold text-slate-700 border border-slate-200/90 shadow-2xs hover:bg-white hover:border-sky-400 hover:text-[#082F49] hover:shadow-sm transition-all"
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: pillar.accent }}
                />
                <span className="font-mono text-[11px] text-slate-500">0{pillar.number}</span>
                <span>{pillar.title.split('&')[0]?.trim()}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 4 Alternating Vertical Showcase Pillars */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {SOCIAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            // Alternating condition: Even index (0, 2) = Image on Left, Content on Right.
            // Odd index (1, 3) = Content on Left, Image on Right ("mere dusre side aayega")!
            const isImageLeft = idx % 2 === 0;

            return (
              <div
                key={idx}
                id={`pillar-0${pillar.number}`}
                className="group relative rounded-3xl p-6 sm:p-8 lg:p-10 border border-sky-900/10 bg-gradient-to-br from-white/95 via-[#FAFCFD]/90 to-sky-50/40 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(2,132,199,0.12)] hover:shadow-[0_25px_60px_-15px_rgba(2,132,199,0.22)] transition-all duration-500 scroll-mt-24"
              >
                {/* Ambient Pillar Glow Accent in background */}
                <div
                  className="absolute -top-12 -right-12 h-64 w-64 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-700"
                  style={{ backgroundColor: pillar.accent }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isImageLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-white/95 shadow-2xl bg-slate-900 group/img">
                      {/* Full-Bleed 8K Luxury Architectural 3D Artwork */}
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105"
                      />

                      {/* Subtle Vignette Gradient for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-center justify-between pointer-events-none">
                        <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono font-bold text-white backdrop-blur-md border border-white/20 shadow-md">
                          <span
                            className="h-2 w-2 rounded-full animate-pulse"
                            style={{ backgroundColor: pillar.accent }}
                          />
                          <span>PILLAR 0{pillar.number} &bull; {pillar.category}</span>
                        </div>

                        <div
                          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-white shadow-md backdrop-blur-md border border-white/20"
                          style={{ backgroundColor: `${pillar.accent}CC` }}
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                      </div>

                      {/* Bottom Floating Badge */}
                      <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 pointer-events-none">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-black/65 px-3.5 py-2 text-xs sm:text-[13px] font-medium text-white backdrop-blur-md border border-white/20 shadow-lg">
                          <span className="font-serif italic text-amber-200">Key Law:</span>
                          <span className="font-semibold text-white/95">&ldquo;{pillar.keyRule}&rdquo;</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isImageLeft ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Pillar Subtitle Tag */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-widest"
                        style={{ color: pillar.accent }}
                      >
                        {pillar.themeName}
                      </span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                        Architecture 0{pillar.number}
                      </span>
                    </div>

                    {/* Pillar Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#082F49] font-serif leading-tight mb-4">
                      {pillar.title}
                    </h3>

                    {/* Bottleneck Card */}
                    <div className="rounded-2xl border border-rose-200/80 bg-rose-50/70 p-3.5 sm:p-4 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                        <span className="font-mono text-[10.5px] sm:text-xs font-bold uppercase text-rose-700 tracking-wider">
                          The Psychological Bottleneck
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3E161D] font-medium leading-relaxed pl-6">
                        {pillar.rootBottleneck}
                      </p>
                    </div>

                    {/* Conscious Fix Card */}
                    <div
                      className="rounded-2xl border p-3.5 sm:p-4 mb-4"
                      style={{
                        backgroundColor: `${pillar.accent}0F`,
                        borderColor: `${pillar.accent}40`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0"
                          style={{ color: pillar.accent }}
                        />
                        <span
                          className="font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider"
                          style={{ color: pillar.accent }}
                        >
                          Conscious Actionable Fix
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#0C2D3A] font-semibold leading-relaxed pl-6">
                        {pillar.consciousFix}
                      </p>
                    </div>

                    {/* Executive Quote */}
                    <div className="rounded-xl border-l-4 pl-3.5 py-1 mb-6 bg-slate-50/60" style={{ borderLeftColor: pillar.accent }}>
                      <p className="text-xs sm:text-sm italic font-serif text-[#335C6D] leading-relaxed">
                        &ldquo;{pillar.quote}&rdquo;
                      </p>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
                        style={{
                          backgroundColor: pillar.accent,
                          boxShadow: `0 10px 25px -5px ${pillar.accent}70`,
                        }}
                      >
                        <span>Master Pillar 0{pillar.number} Mentorship</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <span className="text-[11px] font-mono font-semibold text-slate-500">
                        1-on-1 Grounded Calibration
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SCREEN 3: REAL-LIFE SOCIAL POWER DYNAMICS & DE-ESCALATION SIMULATOR
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-14 select-text">
        <div className="rounded-3xl border border-sky-900/15 bg-gradient-to-br from-white via-[#F4FAFC] to-sky-50/50 p-6 sm:p-9 shadow-md">
          
          <div className="max-w-2xl mb-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0284C7]">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Real-Life Social Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082F49] mt-1 font-serif">
              De-Escalation &amp; Poise in the Social Field
            </h2>
            <p className="text-xs sm:text-sm text-[#4B6B78] mt-1 font-medium">
              Click any high-stakes social scenario below to see the instant shift from reactive insecurity to sovereign presence:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {SOCIAL_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveScenarioIdx(idx)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  activeScenarioIdx === idx
                    ? 'bg-[#0C4A6E] text-white shadow-sm -translate-y-0.5'
                    : 'bg-white border border-sky-900/10 text-[#0C2D3A] hover:bg-sky-50'
                }`}
              >
                <span>{sc.name}: {sc.category}</span>
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* The Trigger & Trap */}
            <div className="md:col-span-5 rounded-2xl border border-rose-200 bg-[#FFF5F5] p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-rose-700 block mb-1">
                  Trigger ({activeScenario.category})
                </span>
                <h3 className="text-base font-bold text-[#2A151B] mb-2.5">
                  {activeScenario.scenario}
                </h3>
                <div className="rounded-xl border border-rose-200 bg-white/85 p-3">
                  <span className="font-mono text-xs font-bold uppercase text-rose-800 block mb-1">
                    ❌ The Reactive Trap:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4C1D24] leading-relaxed font-medium">
                    {activeScenario.instinctTrap}
                  </p>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-rose-700">
                Result: Diminishes presence &amp; leaks status
              </span>
            </div>

            {/* The Grounded Protocol */}
            <div className="md:col-span-7 rounded-2xl border border-sky-300 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#0284C7] block mb-1">
                  ✅ The Grounded Protocol (What to Say):
                </span>
                <p className="text-base sm:text-lg text-[#082F49] font-serif italic leading-relaxed my-3 bg-sky-50/70 p-4 rounded-xl border border-sky-100">
                  {activeScenario.script}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-[#0369A1]">
                  <CheckCircle2 className="h-4 w-4 text-[#0284C7] shrink-0" />
                  <span>Mental Shift: {activeScenario.shift}</span>
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-sky-900/10 flex items-center justify-between text-xs font-mono text-[#0284C7] font-bold">
                <span>Practiced in 1-on-1 Social Mentorship</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 4: THE 5 SOCIAL CALIBRATION SHIFTS (Matrix)
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12 sm:py-16 select-text">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0284C7]">
            Social Calibration Matrix
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#082F49] mt-1 font-serif">
            5 Transformation Focuses
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4B6B78] font-medium">
            From superficial performative anxiety to grounded, magnetic social authority:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {CALIBRATION_SHIFTS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-sky-900/10 bg-white/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all duration-300 hover:border-sky-400 hover:-translate-y-1"
            >
              <div>
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-wider block mb-1"
                  style={{ color: item.accent }}
                >
                  Focus 0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-[#082F49] mb-3">
                  {item.dimension}
                </h3>

                <div className="rounded-xl bg-rose-50/70 border border-rose-100 p-2.5 mb-2.5">
                  <span className="font-mono text-[9px] font-bold uppercase text-rose-700 block mb-0.5">
                    ❌ Old Friction:
                  </span>
                  <p className="text-xs text-[#4C1D24] leading-snug">
                    {item.oldTrap}
                  </p>
                </div>

                <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-2.5">
                  <span
                    className="font-mono text-[9px] font-bold uppercase block mb-0.5"
                    style={{ color: item.accent }}
                  >
                    ✦ Conscious Shift:
                  </span>
                  <p className="text-xs text-[#082F49] font-medium leading-snug">
                    {item.consciousShift}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-sky-900/10 flex items-center justify-between text-[11px] font-mono text-[#0284C7] font-semibold">
                <span>Calibrated</span>
                <Check className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SCREEN 5: EDITORIAL QUOTE & 10 DIMENSIONS HUB NAVIGATION
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 text-center select-text">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-20 bg-sky-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#0284C7]" />
          <span className="h-px w-20 bg-sky-900/20" />
        </div>

        <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#082F49] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Reputation is what people whisper in your absence; integrity is who you remain when nobody is watching.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0284C7]">
          — Pranav Mahajan &bull; Dimension 05
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/parenting-child"
            className="inline-flex items-center gap-2.5 rounded-full border border-sky-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#082F49] shadow-xs transition hover:bg-white hover:border-sky-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Parenting &amp; Child Development</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#0284C7] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0369A1]"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/student-life"
            className="inline-flex items-center gap-2.5 rounded-full border border-sky-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#082F49] shadow-xs transition hover:bg-white hover:border-sky-400"
          >
            <span>Next: Student Life &amp; Youth</span>
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
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0284C7] text-white shadow-2xl hover:bg-[#0369A1] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in"
          title="Back to Top"
        >
          <ArrowLeft className="h-5 w-5 rotate-90" />
        </button>
      )}

      {/* Full Site Official Footer */}
      <Footer />
    </div>
  );
}
