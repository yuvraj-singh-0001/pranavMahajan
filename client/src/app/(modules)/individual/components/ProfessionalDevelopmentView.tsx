'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Briefcase,
  DollarSign,
  Award,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Building2,
  Shield,
  Target,
  Zap,
  ChevronRight,
  BarChart3,
  Sliders,
  Check,
  Activity,
  Layers,
  Compass,
  Sparkles,
  PieChart,
} from 'lucide-react';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';

// 4 Signature Executive & Venture Breakthrough Modes
const EXECUTIVE_MODES = [
  {
    id: 'gravitas',
    label: 'Executive Gravitas',
    tag: '01 • PRESENCE',
    accentColor: '#059669', // Emerald Green
    accentBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    icon: Award,
    headingTheme: 'Executive Gravitas',
    rule: 'Economy of words creates authority',
    tip: 'Drop nervous verbal fillers and eliminate approval-seeking head nods. Sovereign silence commands elite boardrooms.',
    radarLabel: 'Executive Stature: 98%',
    activePhrase: 'Pause for 3 full seconds before responding to high-stakes queries. Stillness is leverage.',
  },
  {
    id: 'venture',
    label: 'Antifragile Venture',
    tag: '02 • SCALE',
    accentColor: '#0D9488', // Deep Teal
    accentBg: 'bg-teal-50 border-teal-200 text-teal-900',
    icon: Building2,
    headingTheme: 'Antifragile Scale',
    rule: 'Distribution precedes production',
    tip: 'Stop building in isolated secrecy. Validate unit economics and lock in captive distribution before spending capital.',
    radarLabel: 'Commercial Moat: 96%',
    activePhrase: 'Price for transformative outcomes rather than billable hours to unlock 10x margins.',
  },
  {
    id: 'capital',
    label: 'Capital Architecture',
    tag: '03 • WEALTH',
    accentColor: '#D97706', // Amber Gold
    accentBg: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: DollarSign,
    headingTheme: 'Sovereign Wealth',
    rule: 'Cashflow buys freedom, not status',
    tip: 'Eradicate lifestyle inflation. Channel free cashflow into liquid assets and compounding equity moats on Day 1.',
    radarLabel: 'Runway Sovereignty: 99%',
    activePhrase: 'Automate a 40%+ capital sweep on the first day of each month into non-correlated assets.',
  },
  {
    id: 'pivot',
    label: 'Asymmetric Leverage',
    tag: '04 • LEVERAGE',
    accentColor: '#2563EB', // Royal Sapphire
    accentBg: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: Target,
    headingTheme: 'Asymmetric Moat',
    rule: 'Build a category of one',
    tip: 'Refuse to compete in crowded corporate rat races. Synthesize rare complementary skills into an irreplaceable monopoly.',
    radarLabel: 'Market Moat: 97%',
    activePhrase: 'Combine domain mastery with high-stakes deal fluency to negotiate equity, not just salary.',
  },
];

// 5 Real-World Executive & Financial Dilemmas vs Conscious Mentorship Solutions (Hero Selector)
const CAREER_CHALLENGES = [
  {
    id: 'corporate-plateau',
    stageLabel: 'Corporate Plateau & Politics',
    problem: 'Grinding 14-hour days hoping merit will get noticed, while political self-promoters get fast-tracked over you.',
    solution: 'Executive Visibility & Stakeholder Diplomacy: Proactively aligning with key decision-makers and articulating commercial impact.',
    action: 'Send a weekly 3-bullet executive synthesis of commercial milestones directly to leadership.',
    accent: '#059669',
    tag: '01 • STRATEGIC ADVANCEMENT',
  },
  {
    id: 'entrepreneurial-burnout',
    stageLabel: 'Founder Burnout & Cashflow',
    problem: 'Trapped in endless operational firefighting, volatile monthly revenue, and 80-hour workweeks with zero freedom.',
    solution: 'Antifragile Systems & High-Yield Pricing: Transitioning from bespoke service hustle to standardized, scalable value engines.',
    action: 'Discontinue the bottom 20% high-maintenance clients and double pricing on your signature high-leverage offer.',
    accent: '#0D9488',
    tag: '02 • COMMERCIAL SCALABILITY',
  },
  {
    id: 'lifestyle-creep',
    stageLabel: 'Golden Handcuffs & Wealth Leak',
    problem: 'High six-figure earnings evaporating into taxes, luxury EMIs, and consumption, leaving near-zero real liquid runway.',
    solution: 'Automated Sovereign Capital Allocation: Funneling 40%+ of free cashflow into income-producing assets before lifestyle spending.',
    action: 'Automate a Day-1 capital sweep into compounding non-correlated assets before any discretionary expenditure.',
    accent: '#D97706',
    tag: '03 • WEALTH ARCHITECTURE',
  },
  {
    id: 'high-stakes-rooms',
    stageLabel: 'Imposter Syndrome in Elite Rooms',
    problem: 'Shrinking in boardrooms with titans, speaking too fast, and nervously seeking external validation for your ideas.',
    solution: 'Sovereign Gravitas & Strategic Stillness: Decoupling internal self-worth from room status; speaking with calm economy of words.',
    action: 'Drop physical shoulders, eliminate nervous verbal fillers, and embrace 3 seconds of calm silence before answering.',
    accent: '#2563EB',
    tag: '04 • EXECUTIVE GRAVITAS',
  },
  {
    id: 'deal-negotiation',
    stageLabel: 'Giving Away Deal Margins',
    problem: 'Slashing your consulting fee or equity valuation immediately when a prospect pushes back out of fear of losing the deal.',
    solution: 'Asymmetric Leverage & Calm Walkaway Sovereignty: Anchor value high and welcome walkaway clarity without desperation.',
    action: 'Never negotiate against yourself in real time. Pause, smile, and say: “Here is why our terms reflect guaranteed execution.”',
    accent: '#10B981',
    tag: '05 • NEGOTIATION SOVEREIGNTY',
  },
];

// 4 Core Strategic Engines (2x2 Bento Matrix)
const EXECUTIVE_ARENAS = [
  {
    number: '01',
    themeName: 'Executive Gravitas',
    title: 'Executive Presence & Stakeholder Diplomacy',
    category: 'LEADERSHIP COMMAND',
    accent: '#059669',
    icon: Award,
    rootBottleneck: 'Silent execution syndrome: doing outstanding work that stays invisible to the C-suite and board.',
    consciousFix: 'Executive Saliency Framework: Communicating outcomes in commercial dollars and enterprise risk mitigation.',
    keyRule: 'You are paid for perceived certainty and leadership, not effort',
    quote: 'True authority does not shout to be heard; it is the calmest voice in the room that everyone leans in to catch.',
    ctaTopic: 'Executive Presence & Corporate Leadership Mentorship',
    metrics: [
      { label: 'Room Influence', val: '98%', status: 'Full Command' },
      { label: 'Stakeholder Trust', val: 'Tier 1', status: 'Direct Ear' },
      { label: 'Verbal Precision', val: '100%', status: 'Zero Filler' },
    ],
  },
  {
    number: '02',
    themeName: 'Venture Architecture',
    title: 'Antifragile Commercial Architecture & Moats',
    category: 'ENTREPRENEURIAL VALUE',
    accent: '#0D9488',
    icon: Building2,
    rootBottleneck: 'Linear commoditization: building features nobody pays for and trading time for volatile monthly invoices.',
    consciousFix: 'Category-of-One Venture Design: Engineering proprietary distribution and asymmetric pricing moats.',
    keyRule: 'Never compete in price wars. Build an unfair monopolistic niche',
    quote: 'A business that depends on daily heroics is just an exhausting job with payroll obligations.',
    ctaTopic: 'Entrepreneurial Scaling & Commercial Moat Mentorship',
    metrics: [
      { label: 'Gross Margin', val: '82%', status: 'High Yield' },
      { label: 'LTV/CAC Ratio', val: '4.8x', status: 'Antifragile' },
      { label: 'Founder Freedom', val: 'Autonomous', status: 'Systemized' },
    ],
  },
  {
    number: '03',
    themeName: 'Capital Architecture',
    title: 'Sovereign Wealth & Capital Allocation',
    category: 'FINANCIAL INDEPENDENCE',
    accent: '#D97706',
    icon: DollarSign,
    rootBottleneck: 'Golden handcuffs: high corporate salary masked by crippling lifestyle inflation and zero real liquid autonomy.',
    consciousFix: 'The Sovereign Wealth Funnel: Automated capital routing into non-correlated compounding assets and cashflow equity.',
    keyRule: 'True wealth is the ability to say “no” to anything that compromises your integrity',
    quote: 'Wealth is what you do not see: the unbought status symbols and the quiet freedom to control your own calendar.',
    ctaTopic: 'Wealth Architecture & Capital Allocation Mentorship',
    metrics: [
      { label: 'Liquid Runway', val: '36+ Mo', status: 'Total Freedom' },
      { label: 'Savings Rate', val: '45%+', status: 'Automated' },
      { label: 'Passive Yield', val: 'Calibrated', status: 'Compounding' },
    ],
  },
  {
    number: '04',
    themeName: 'Asymmetric Leverage',
    title: 'High-Stakes Deal Negotiation & Equity Moats',
    category: 'COMMERCIAL LEVERAGE',
    accent: '#2563EB',
    icon: Target,
    rootBottleneck: 'Accepting standard industry compensation packages and giving away enterprise upside out of timidity.',
    consciousFix: 'Asymmetric Deal Structuring: Exchanging strategic value for equity, profit-share, and long-term royalties.',
    keyRule: 'Salaries pay bills; equity and commercial royalties build generational autonomy',
    quote: 'In any negotiation, the party with the deepest internal stillness and ready walkaway clarity holds all the leverage.',
    ctaTopic: 'Deal Negotiation & Equity Structuring Mentorship',
    metrics: [
      { label: 'Equity Exposure', val: 'Active', status: 'Capital Upside' },
      { label: 'Walkaway Poise', val: 'Unshakeable', status: 'Zero Fear' },
      { label: 'Deal Velocity', val: '2.5x', status: 'Optimized' },
    ],
  },
];

// 4 Real-Life High-Stakes Executive Dilemmas (Simulator)
const EXECUTIVE_DILEMMAS = [
  {
    id: 'boardroom-challenge',
    title: 'Hostile Boardroom Interrogation',
    tag: 'EXECUTIVE COMMAND',
    scenario: 'A senior board member aggressively questions your strategic timeline in front of key stakeholders: “Why is this taking so long?”',
    trap: 'Becoming defensive, reading out 10 pages of operational excuses, or apologizing nervously for market complexity.',
    shift: 'Acknowledge the commercial intent calmly. Reframe the discussion from operational timeline to downside risk protection.',
    script: 'Maintain steady eye contact, pause for 2 seconds, and say: “I appreciate the urgency, Vikram. Our intentional sequencing protected ₹4 Cr in downside exposure. Here is the exact phased milestone for this quarter.”',
    accent: '#059669',
  },
  {
    id: 'cashflow-crunch',
    title: 'Startup Cashflow Squeeze',
    tag: 'FOUNDER SOVEREIGNTY',
    scenario: 'Receivables delayed by 60 days, payroll looming in 10 days, and co-founders spiraling into sleepless panic.',
    trap: 'Borrowing expensive emergency debt or making panic discounts that destroy your brand’s premium perception.',
    shift: 'Panic clouds financial triage. Execute the 48-Hour Capital Acceleration Protocol with current clients.',
    script: 'Call top 3 enterprise accounts with a compelling value proposition: “We are offering an exclusive 8% prepayment incentive if annual retainer is settled by Friday.”',
    accent: '#0D9488',
  },
  {
    id: 'compensation-equity',
    title: 'Negotiating 40% Increase & Equity',
    tag: 'CAREER ADVANCEMENT',
    scenario: 'Annual review discussion where you have driven ₹12 Cr in new revenue, but HR offers a standard 7% band raise.',
    trap: 'Accepting with silent resentment, or angrily threatening to resign without an alternative offer in hand.',
    shift: 'Anchor your compensation to verified revenue generated, and negotiate for performance equity or phantom stock.',
    script: '“I love driving growth here, which is proven by the ₹12 Cr added to our P&L this year. A 7% cost-of-living raise does not reflect this commercial value. Let’s align on a performance equity structure tied to our next milestone.”',
    accent: '#D97706',
  },
  {
    id: 'toxic-client',
    title: 'Walking Away from a Lucrative Toxic Client',
    tag: 'BOUNDARY POISE',
    scenario: 'A client contributing 25% of top-line revenue constantly abuses your team, demands scope creep, and delays payments.',
    trap: 'Tolerating mistreatment out of revenue fear until top employees resign and company morale collapses.',
    shift: 'Clients who respect boundaries become partners; clients who do not will eventually bankrupt your culture.',
    script: '“We value the goals we’ve achieved together. However, our operating model requires clear boundaries and predictable scope. Effective next month, we will transition your account to our standard terms or provide a smooth handoff.”',
    accent: '#2563EB',
  },
];

export default function ProfessionalDevelopmentView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const activeMode = EXECUTIVE_MODES[activeModeIdx];
  const activeDilemma = EXECUTIVE_DILEMMAS[activeDilemmaIdx];
  const activeChallenge = CAREER_CHALLENGES[activeChallengeIdx];

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
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#F0FDF4] text-[#064E3B] antialiased selection:bg-emerald-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <RoleCursor role="individual" isActive />

      {/* Cyber-Paper Ambient Mesh Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[700px] rounded-full bg-gradient-to-b from-emerald-300/25 via-teal-200/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/2 -right-20 h-[500px] w-[600px] rounded-full bg-gradient-to-b from-amber-300/20 via-yellow-200/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[450px] w-[550px] rounded-full bg-gradient-to-t from-teal-300/15 via-emerald-100/10 to-transparent blur-[120px]" />
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
        className={`fixed inset-0 z-40 bg-[#064E3B]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-emerald-900/15 bg-[#F0FDF4] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-emerald-900/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#059669]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#064E3B]">Career &amp; Wealth Sovereignty</p>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-[#064E3B] transition hover:bg-[#DCFCE7] cursor-pointer"
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
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-[#064E3B] transition hover:border-emerald-900/15 hover:bg-white"
            >
              <span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#059669] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#DCFCE7] p-5 border border-emerald-200">
          <p className="text-sm leading-6 text-[#065F46] font-medium">
            Ready to break executive plateaus, engineer high-margin venture scalability, and achieve generational wealth?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#059669] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#047857]"
          >
            Claim Executive Mentorship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          SCREEN 1: HERO SECTION WITH REALISTIC PANORAMIC BACKGROUND & CROSS-EXECUTIVE DYNAMICS
         ========================================================================= */}
      <section className="relative z-10 min-h-[94vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 select-text overflow-hidden">
        {/* Full-Bleed Photorealistic Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/professional-development-hero.jpg"
            alt="Professional Development, Career Growth & Financial Well-Being"
            className="h-full w-full object-cover object-center lg:object-right"
          />
          {/* Top Luminous White Mist Overlay */}
          <div className="absolute inset-x-0 top-0 h-44 sm:h-60 bg-gradient-to-b from-white/85 via-white/35 to-transparent pointer-events-none" />
          {/* Luminous Soft White/Emerald Mist Gradient Overlay for crystal clear readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:w-[70%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F0FDF4] via-[#F0FDF4]/30 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Vision, Problem/Solution Interactive Explorer & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
              {/* Live Indicator Chip */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-3.5 py-1.5 border border-emerald-200/90 shadow-2xs w-fit mb-3.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#059669]" />
                </span>
                <span className="font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#059669]">
                  Executive Velocity &bull; Commercial Sovereignty
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[#064E3B] font-serif leading-[1.12] tracking-tight">
                Architect Your Career. <br />
                <span className="bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#D97706] bg-clip-text text-transparent">
                  Build Antifragile Wealth.
                </span>
              </h1>

              {/* Minimal Punchy Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-[#065F46] leading-relaxed max-w-xl font-medium">
                From corporate plateaus and entrepreneurial cashflow panic to high-conviction executive authority, Category-of-One venture creation, and generational financial security.
              </p>

              {/* 5 Real Executive & Financial Dilemmas vs Conscious Solutions Selector */}
              <div className="mt-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#065F46]">
                    Real Market Pressures vs. Strategic Breakthroughs:
                  </span>
                  <span className="font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    5 Dimensions
                  </span>
                </div>

                {/* Stage Tabs */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {CAREER_CHALLENGES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveChallengeIdx(idx)}
                      className={`text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                        activeChallengeIdx === idx
                          ? 'bg-[#064E3B] text-white shadow-sm scale-102 ring-2 ring-emerald-400/50'
                          : 'bg-white/90 border border-emerald-200/90 text-[#064E3B] hover:bg-white hover:border-emerald-400'
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
                          The Career Bottleneck / Trap:
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
                          Strategic Breakthrough:
                        </span>
                      </div>
                      <p className="text-xs text-[#064E3B] font-semibold leading-relaxed">
                        {activeChallenge.solution}
                      </p>
                    </div>
                  </div>

                  {/* Immediate Actionable Micro-Step */}
                  <div className="mt-2.5 pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#065F46] font-medium">
                      🎯 <strong className="text-[#064E3B]">Executive Action:</strong> {activeChallenge.action}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#047857] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(5,150,105,0.5)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Claim 1-on-1 Executive Mentorship</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#wealth-cockpit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-3 text-xs sm:text-sm font-bold text-[#064E3B] border border-emerald-200/90 shadow-2xs hover:bg-white hover:border-emerald-400 transition-all cursor-pointer"
                >
                  <span>Wealth &amp; Growth Cockpit &darr;</span>
                </a>

                <a
                  href="#strategic-pillars"
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-3 text-xs sm:text-sm font-bold text-[#059669] hover:text-[#047857] transition-all cursor-pointer"
                >
                  <span>4 Strategic Engines</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Kept completely open so the photorealistic Indian founders & executives in the background photograph are unobstructed */}
            <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* =========================================================================
          SCREEN 2: THE 4 STRATEGIC ENGINES (2x2 BENTO MATRIX)
         ========================================================================= */}
      <section id="strategic-pillars" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-14 sm:py-20 scroll-mt-16 select-text">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 border border-emerald-200/80 shadow-xs mb-3">
            <span className="h-2 w-2 rounded-full bg-[#059669] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#059669]">
              Strategic Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#064E3B] font-serif tracking-tight">
            The 4 Engines of Commercial &amp; Wealth Sovereignty
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#065F46] font-medium max-w-2xl mx-auto">
            Architected to decouple your earning power from passive time-trading into compounding equity, influence, and high-conviction decision-making:
          </p>
        </div>

        {/* 2x2 Bento Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {EXECUTIVE_ARENAS.map((arena, idx) => {
            const Icon = arena.icon;

            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-8 border border-emerald-900/10 bg-gradient-to-br from-white via-[#F0FDF4] to-emerald-50/20 backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(5,150,105,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(5,150,105,0.2)] transition-all duration-300 flex flex-col justify-between"
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
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] font-serif leading-snug mb-3">
                    {arena.title}
                  </h3>

                  {/* High-Tech Interactive Code-Based Telemetry Widget */}
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

                  {/* 1-Line Psychological Bottleneck Card */}
                  <div className="rounded-xl border border-rose-200/80 bg-rose-50/60 p-3 mb-2.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                      <span className="font-mono text-[9.5px] font-bold uppercase text-rose-700 tracking-wider">
                        The Strategic Bottleneck
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
                        Conscious Actionable Protocol
                      </span>
                    </div>
                    <p className="text-xs text-[#064E3B] font-semibold leading-relaxed pl-5">
                      {arena.consciousFix}
                    </p>
                  </div>

                  {/* Executive Law Quote */}
                  <div
                    className="rounded-lg border-l-3 pl-3 py-1 mb-5 bg-emerald-50/50"
                    style={{ borderLeftColor: arena.accent }}
                  >
                    <p className="text-xs italic font-serif text-[#065F46] leading-snug">
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
          SCREEN 3: HIGH-STAKES EXECUTIVE & COMMERCIAL DILEMMA SIMULATOR
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-white via-[#F0FDF4] to-emerald-50/50 p-6 sm:p-9 shadow-md">
          
          <div className="max-w-2xl mb-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span>Executive Simulation &bull; De-Escalation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] mt-1 font-serif">
              Poise &amp; Leverage Under Commercial Pressure
            </h2>
            <p className="text-xs sm:text-sm text-[#065F46] mt-1 font-medium">
              Click any high-stakes boardroom, venture, or financial dilemma below to view the word-for-word executive response:
            </p>
          </div>

          {/* Dilemma Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {EXECUTIVE_DILEMMAS.map((dilemma, idx) => (
              <button
                key={dilemma.id}
                type="button"
                onClick={() => setActiveDilemmaIdx(idx)}
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeDilemmaIdx === idx
                    ? 'bg-[#064E3B] text-white shadow-sm -translate-y-0.5'
                    : 'bg-white border border-emerald-900/10 text-[#064E3B] hover:bg-emerald-50'
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
                    ❌ The Reactive Executive Trap:
                  </span>
                  <p className="text-xs sm:text-sm text-[#4C1D24] leading-relaxed font-medium">
                    {activeDilemma.trap}
                  </p>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-rose-700">
                Result: Bleeds authority, forfeits deal leverage &amp; damages enterprise stature
              </span>
            </div>

            {/* The Grounded Protocol */}
            <div className="md:col-span-7 rounded-2xl border border-emerald-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#059669] block mb-1">
                  ✅ The Sovereign Protocol (Word-for-Word Script):
                </span>
                <p className="text-base sm:text-lg text-[#064E3B] font-serif italic leading-relaxed my-3 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                  {activeDilemma.script}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-semibold text-[#047857]">
                  <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0" />
                  <span>Strategic Shift: {activeDilemma.shift}</span>
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-emerald-900/10 flex items-center justify-between text-xs font-mono text-[#059669] font-bold">
                <span>Practiced in 1-on-1 Executive Mentorship</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SCREEN 4: CORPORATE RAT RACE VS. PRANAV MAHAJAN EXECUTIVE MENTORSHIP
         ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-10 sm:py-16 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">
            The Structural Paradigm Shift
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#064E3B] mt-1 font-serif">
            Why Corporate Grinding Fails vs. Why Mentorship Transforms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Old Corporate Grind */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-mono font-bold text-slate-600 mb-4">
              <span>Generic Corporate / Startup Hustle</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Believes hard work alone gets rewarded, ignoring political dynamics and perception.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Trades 70 hours a week for a fixed paycheck with zero equity upside or leverage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Trapped in golden handcuffs: higher salary immediately matched by higher lifestyle debt.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base">&times;</span>
                <span>Founds startups that mirror consulting chaos instead of scalable, defensible assets.</span>
              </li>
            </ul>
          </div>

          {/* Pranav Mahajan Executive Mentorship */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 p-6 sm:p-8 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#059669] px-3.5 py-1 text-xs font-mono font-bold text-white mb-4">
              <span>Pranav Mahajan Executive Mentorship</span>
            </span>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#064E3B] font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" />
                <span>Executive presence &amp; political diplomacy: command elite rooms and secure sponsor advocacy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" />
                <span>Antifragile venture scalability: build high-margin commercial engines with captive distribution.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" />
                <span>Automated sovereign wealth: build 36+ months of liquid freedom and compounding capital moats.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#059669] shrink-0 mt-0.5" />
                <span>Asymmetric negotiation leverage: structure equity, royalties, and walkaway sovereignty.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl border border-emerald-900/15 bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#064E3B] p-8 sm:p-12 text-center text-white shadow-xl max-w-4xl mx-auto">
          <Briefcase className="h-10 w-10 text-emerald-300 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-4xl font-extrabold font-serif mb-3">
            Build Unshakeable Commercial Sovereignty
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto mb-6">
            Schedule a personalized 1-on-1 executive mentorship session with Pranav Mahajan to calibrate your leadership stature, scale your venture moats, and architect lasting wealth.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300 px-8 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start 1-on-1 Executive Mentorship &rarr;</span>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WEALTH & GROWTH COCKPIT (Interactive Telemetry & Capital Gauge)
          Relocated to bottom to keep Screen 1 airy and panoramic
         ========================================================================= */}
      <section id="wealth-cockpit" className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto py-12 scroll-mt-20 select-text">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 border border-emerald-200/90 shadow-2xs mb-2">
            <BarChart3 className="h-3.5 w-3.5 text-[#059669]" />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#059669]">
              Interactive Cockpit &bull; Live Telemetry
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-serif">
            Executive Velocity &amp; Capital Cockpit
          </h2>
          <p className="text-xs sm:text-sm text-[#065F46] mt-1">
            Toggle between the 4 executive engines to calibrate your commercial posture, venture moats, and automated wealth allocation.
          </p>
        </div>

        {/* 4 Mode Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {EXECUTIVE_MODES.map((mode, idx) => {
            const Icon = mode.icon;
            const isSelected = activeModeIdx === idx;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveModeIdx(idx)}
                className={`flex items-center gap-2 p-3 rounded-2xl border text-left transition-all duration-300 shadow-2xs cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#059669] ring-2 ring-emerald-200 scale-102 shadow-sm'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-emerald-300'
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
        <div className="relative w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#F0FDF4] to-emerald-50/40 border border-emerald-200/90 shadow-[0_20px_50px_-15px_rgba(5,150,105,0.18)] overflow-hidden">
          {/* Ambient Mesh Glow behind widget */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-700"
            style={{ backgroundColor: activeMode.accentColor }}
          />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

          {/* Top System Status Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-emerald-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: activeMode.accentColor }}
                />
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                Commercial State: {activeMode.headingTheme}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-200/80 text-[10.5px] font-mono font-bold text-[#059669]">
              <Target className="h-3 w-3" />
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
                  activeModeIdx === 0 ? '50' : activeModeIdx === 1 ? '30' : activeModeIdx === 2 ? '15' : '40'
                }
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />

              {/* Secondary Teal Inner Arc */}
              <circle
                cx="50"
                cy="50"
                r="34"
                stroke="#0D9488"
                strokeWidth="3.5"
                strokeDasharray="213"
                strokeDashoffset="55"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Core Disc */}
            <div className="absolute flex flex-col items-center justify-center text-center p-4 rounded-full w-36 h-36 sm:w-40 sm:h-40 bg-white/95 border border-emerald-100 shadow-xl backdrop-blur-md">
              <div
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl text-white shadow-md transition-all duration-500 mb-1"
                style={{ backgroundColor: activeMode.accentColor }}
              >
                {React.createElement(activeMode.icon, { className: 'h-5 w-5' })}
              </div>
              <span className="font-mono text-base sm:text-lg font-black text-slate-900 leading-none">
                {activeModeIdx === 0
                  ? '98%'
                  : activeModeIdx === 1
                  ? '4.8x'
                  : activeModeIdx === 2
                  ? '36 Mo'
                  : 'Top 1%'}
              </span>
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-slate-400 mt-0.5">
                {activeModeIdx === 0
                  ? 'Gravitas Index'
                  : activeModeIdx === 1
                  ? 'LTV/CAC Moat'
                  : activeModeIdx === 2
                  ? 'Runway Autonomy'
                  : 'Equity Leverage'}
              </span>
            </div>

            {/* Floating Satellite Telemetry Chips */}
            <div className="absolute -top-1 left-2 sm:left-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sovereignty Active</span>
            </div>

            <div className="absolute -bottom-1 right-2 sm:right-4 rounded-full bg-white/95 px-3 py-1 shadow-sm border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-emerald-600" />
              <span>Capital Velocity: Peak</span>
            </div>
          </div>

          {/* 3-Stage Execution Pipeline */}
          <div className="mt-4 pt-3.5 border-t border-emerald-100 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                Sovereign Commercial Roadmap
              </span>
              <span className="font-mono text-[10.5px] font-bold text-[#059669]">
                Compound Value Cycle
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white p-2.5 border border-slate-200/90 text-center">
                <span className="font-mono text-[8.5px] text-slate-400 uppercase block">Stage 01</span>
                <span className="font-bold text-xs text-slate-800 block mt-0.5">Diagnostic Audit</span>
                <span className="text-[10px] text-slate-500 block truncate">Identify Leaks</span>
              </div>

              <div className="rounded-xl bg-emerald-50/70 p-2.5 border border-emerald-200 text-center relative">
                <span className="font-mono text-[8.5px] text-[#059669] uppercase block font-bold">Stage 02</span>
                <span className="font-bold text-xs text-[#064E3B] block mt-0.5">Asymmetric Moat</span>
                <span className="text-[10px] text-emerald-700 font-semibold block truncate">Scale Pricing</span>
              </div>

              <div className="rounded-xl bg-teal-50/70 p-2.5 border border-teal-200 text-center">
                <span className="font-mono text-[8.5px] text-teal-600 uppercase block font-bold">Stage 03</span>
                <span className="font-bold text-xs text-teal-950 block mt-0.5">Sovereign Wealth</span>
                <span className="text-[10px] text-teal-700 font-semibold block truncate">Liquid Freedom</span>
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
          <span className="h-px w-20 bg-emerald-900/20" />
          <span className="h-2 w-2 rounded-full bg-[#059669]" />
          <span className="h-px w-20 bg-emerald-900/20" />
        </div>

        <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#064E3B] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Wealth and career elevation are the natural byproducts of solving hard problems with exceptional craftsmanship and unshakeable stillness.&rdquo;
        </blockquote>
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#059669]">
          — Pranav Mahajan &bull; Dimension 07
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/individual/student-life"
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#064E3B] shadow-xs transition hover:bg-white hover:border-emerald-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev: Student Life &amp; Youth</span>
          </Link>

          <Link
            href="/individual#top"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#059669] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#047857] cursor-pointer"
          >
            <span>Explore All 10 Dimensions</span>
          </Link>

          <Link
            href="/individual/spirituality-philosophy"
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-900/15 bg-white/90 px-6 py-3 text-sm font-bold text-[#064E3B] shadow-xs transition hover:bg-white hover:border-emerald-400 cursor-pointer"
          >
            <span>Spirituality &amp; Metaphysics</span>
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
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#059669] text-white shadow-2xl hover:bg-[#047857] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in cursor-pointer"
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
