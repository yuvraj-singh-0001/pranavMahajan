'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, Brain, Compass, Target, X } from 'lucide-react';
import Footer from './Footer';

const navigation = [
  { href: '#top', label: 'Home' },
  { href: '#pathways', label: 'Personal growth' },
  { href: '#next-step', label: 'Take the next step' },
];

const pathways = [
  {
    number: '01',
    icon: Compass,
    label: 'CLARITY',
    title: 'Understand what matters to you',
    description: 'Make space to reflect on your priorities, strengths, and the direction you want your next chapter to take.',
    action: 'Explore clarity',
    accent: '#8A6328',
  },
  {
    number: '02',
    icon: Brain,
    label: 'RESILIENCE',
    title: 'Meet change with a steadier mindset',
    description: 'Explore practical ways to respond to pressure, navigate transitions, and move forward with greater self-trust.',
    action: 'Build resilience',
    accent: '#607B5E',
  },
  {
    number: '03',
    icon: Target,
    label: 'PURPOSEFUL HABITS',
    title: 'Turn intention into everyday progress',
    description: 'Build small, meaningful routines that support the goals and personal growth that matter to you.',
    action: 'Find your next step',
    accent: '#9A5B43',
  },
];

const reflections = [
  {
    challenge: 'There are many responsibilities, but little time to think about your own direction.',
    response: 'Pause to name what matters most, then choose one realistic next step that fits your life right now.',
  },
  {
    challenge: 'A change in work, family, study, or life stage brings uncertainty.',
    response: 'Use reflection and practical mindset tools to recognise what you can influence and adapt at your own pace.',
  },
  {
    challenge: 'You want to grow, but it is hard to keep new intentions going.',
    response: 'Start with simple repeatable actions, notice what helps, and adjust your routine as your needs change.',
  },
];

export default function IndividualLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const edgeScrollRef = useRef(0);
  const edgeScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const elements = root.querySelectorAll<HTMLElement>('[data-individual-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { root, threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const handleWheel = (event: WheelEvent) => {
      if (menuOpen || event.deltaY >= -24) {
        if (event.deltaY >= 0) edgeScrollRef.current = 0;
        return;
      }
      if (root.scrollTop > 3) {
        edgeScrollRef.current = 0;
        return;
      }
      edgeScrollRef.current += event.deltaY;
      if (edgeScrollTimerRef.current) clearTimeout(edgeScrollTimerRef.current);
      edgeScrollTimerRef.current = setTimeout(() => { edgeScrollRef.current = 0; }, 300);
      if (edgeScrollRef.current <= -140) {
        edgeScrollRef.current = 0;
        window.history.back();
      }
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;
      if (menuOpen || startY === null || root.scrollTop > 3) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY !== undefined && endY - startY > 120) window.history.back();
    };
    root.addEventListener('wheel', handleWheel, { passive: true });
    root.addEventListener('touchstart', handleTouchStart, { passive: true });
    root.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      root.removeEventListener('wheel', handleWheel);
      root.removeEventListener('touchstart', handleTouchStart);
      root.removeEventListener('touchend', handleTouchEnd);
      if (edgeScrollTimerRef.current) clearTimeout(edgeScrollTimerRef.current);
    };
  }, [menuOpen]);

  return (
    <div ref={scrollRootRef} className="individual-page-scroll h-dvh overflow-y-auto overflow-x-clip text-[#203029]">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-amber-500/15 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-12 sm:py-5 sm:backdrop-blur-none">
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" aria-label="Go back to the previous page" title="Back" onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign('/')} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8E7650]/20 bg-[#FFFCF7]/90 text-[#8A6328] transition hover:bg-[#EEE5D5] sm:h-10 sm:w-10"><ArrowLeft className="h-4 w-4" /></button>
          <Link href="/" aria-label="Pranav Mahajan home" className="inline-flex items-center">
          <img src="/pranav_mahajan_transparent.png" alt="Pranav Mahajan" className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)] sm:h-16 md:h-20" />
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-amber-500/50 bg-[#1e1710]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-amber-200 shadow-[0_4px_16px_rgba(223,165,71,0.2)] backdrop-blur-md transition hover:scale-105 hover:border-amber-400 hover:bg-[#2e2318] hover:text-white sm:px-5 sm:py-2">Sign Up</Link>
          <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-amber-500/30 bg-[#16120e]/90 text-white shadow-xs backdrop-blur-md transition hover:bg-[#221b14] sm:h-10 sm:w-10 sm:rounded-2xl">
            {menuOpen ? <X className="h-5 w-5 text-amber-300" /> : <><span className="h-0.5 w-4 rounded-full bg-slate-200" /><span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#dfa547]" /><span className="h-0.5 w-4 rounded-full bg-slate-200" /></>}
          </button>
        </div>
      </header>

      <button type="button" aria-label="Close navigation menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className={`fixed inset-0 z-40 bg-[#11100d]/35 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-label="Site navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-[#8E7650]/20 bg-[#F6F0E5] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-[#8E7650]/15 pb-5">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A6328]">NAVIGATION</p><p className="mt-1 text-lg font-semibold text-[#203029]">Personal growth</p></div>
          <button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8E7650]/20 bg-[#FFFCF7] text-[#485C4B] transition hover:bg-[#EEE5D5]"><X className="h-5 w-5" /></button>
        </div>
        <nav aria-label="Main navigation" className="mt-6 flex flex-col gap-2">
          {navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-base font-semibold text-[#3F4B40] transition hover:border-[#8E7650]/15 hover:bg-[#FFFCF7]"><span><span className="mr-3 font-mono text-xs text-[#9A6F32]">0{index + 1}</span>{item.label}</span><ArrowRight className="h-4 w-4 text-[#8A6328] transition-transform group-hover:translate-x-1" /></a>)}
        </nav>
        <div className="mt-auto rounded-3xl bg-[#ECE3D3] p-5"><p className="text-sm leading-6 text-[#586056]">Ready to explore a more intentional next chapter?</p><Link href="/signup" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#253D2D] px-5 text-sm font-semibold text-white transition hover:bg-[#35543D]">Sign up <ArrowRight className="h-4 w-4" /></Link></div>
      </aside>

      <main className="flex flex-col">
        <section id="top" className="order-1 relative mx-auto grid min-h-[740px] max-w-7xl scroll-mt-24 items-center gap-10 px-5 pb-16 pt-28 sm:px-10 sm:pt-36 lg:min-h-[790px] lg:grid-cols-[.92fr_1.08fr] lg:gap-4 lg:px-16 lg:pt-36">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8E7650]/15 bg-[#FFFCF7]/80 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#806333] shadow-sm sm:text-xs"><span className="h-2 w-2 rounded-full bg-[#9A8054]" /> Personal growth for every life stage</p>
            <h1 className="max-w-2xl text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#203029] sm:text-6xl lg:text-[4.6rem]">Become more fully yourself.<br /><span className="text-[#8A6328]">At every stage of life.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#586056] sm:text-lg sm:leading-8">A thoughtful space to understand what matters to you, meet change with a steadier mindset, and take meaningful steps forward—wherever you are starting from.</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#6A7067] sm:text-base sm:leading-7">For students, teachers, professionals, parents, and older adults. Open to people of every gender, background, and life experience.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/signup" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#253D2D] px-6 text-sm font-semibold text-white shadow-lg shadow-[#253D2D]/15 transition hover:-translate-y-0.5 hover:bg-[#35543D]">Explore personal growth <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <a href="#pathways" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#765925] transition hover:bg-[#FFFCF7]/70">Discover the approach <ArrowDown className="h-4 w-4" /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#8E7650]/15 pt-5 text-xs font-medium text-[#626A60] sm:text-sm">
              <span className="inline-flex items-center gap-2"><CheckMark /> Personal clarity</span>
              <span className="inline-flex items-center gap-2"><CheckMark /> Habits for meaningful growth</span>
            </div>
          </div>

          <div className="individual-hero-art mx-auto w-full max-w-[760px] lg:justify-self-end lg:translate-x-8 xl:translate-x-12">
            <img
              src="/AI-Guided%20Next%20Move%20Interface.png"
              alt="AI guided next move interface showing clarity, resilience, and purposeful habits"
              className="h-auto w-full rounded-[2rem] object-contain drop-shadow-[0_24px_55px_rgba(64,48,23,0.12)]"
            />
          </div>
          <a href="#pathways" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#7E745F] transition hover:text-[#8A6328] lg:inline-flex">Scroll to explore <ArrowDown className="h-3.5 w-3.5" /></a>
        </section>

        <section id="pathways" className="order-2 mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A6328] sm:text-xs">A PERSONAL PATHWAY</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#203029] sm:text-4xl">Three ways to move forward.</h2>
          </div>
          <div className="individual-pathways-map relative mx-auto max-w-[1080px] py-3 sm:py-5">
            <svg aria-hidden="true" className="individual-path-connectors pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1080 350" preserveAspectRatio="none">
              <defs>
                <marker id="pathway-arrow-clarity" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8A6328" /></marker>
                <marker id="pathway-arrow-resilience" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#607B5E" /></marker>
              </defs>
              <path className="individual-path-flow individual-path-flow-one" d="M330 175 C345 90 375 90 390 175" markerEnd="url(#pathway-arrow-clarity)" />
              <path className="individual-path-flow individual-path-flow-two" d="M690 175 C705 260 735 260 750 175" markerEnd="url(#pathway-arrow-resilience)" />
            </svg>
            <div className="relative z-10 grid grid-cols-1 justify-items-center gap-5 md:grid-cols-3 md:gap-0">
            {pathways.map((item, index) => {
              const Icon = item.icon;
              return <article key={item.number} data-individual-reveal className={`individual-path-node individual-path-node-${index + 1} group relative flex h-[min(84vw,18.75rem)] w-[min(84vw,18.75rem)] flex-col items-center justify-center overflow-hidden rounded-full border-2 bg-[#FBF7EE] px-7 text-center shadow-[0_18px_45px_rgba(64,48,23,0.09)] md:h-[18.75rem] md:w-[18.75rem]`} style={{ transitionDelay: `${index * 180}ms`, borderColor: item.accent, '--node-accent': item.accent } as CSSProperties}>
                <span className="individual-node-sweep absolute inset-[7px] rounded-full border border-transparent border-t-[var(--node-accent)]" />
                <span className="relative z-10 mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFE4D0]" style={{ color: item.accent }}><Icon aria-hidden="true" className="h-5 w-5" /></span>
                <p className="relative z-10 font-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: item.accent }}>{item.number} <span className="opacity-45">/ 03 · {item.label}</span></p>
                <h3 className="relative z-10 mt-2 max-w-[15rem] text-lg font-semibold leading-snug tracking-tight text-[#253D2D] sm:text-xl">{item.title}</h3>
                <p className="relative z-10 mt-2 max-w-[15rem] text-xs leading-5 text-[#586056] sm:text-[13px]">{item.description}</p>
                <Link href="/signup" className="relative z-10 mt-4 inline-flex min-h-9 items-center gap-2 rounded-full border px-4 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#253D2D] hover:text-white" style={{ color: item.accent, borderColor: `${item.accent}66` }}>{item.action}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>
              </article>;
            })}
            </div>
          </div>
        </section>

        <section id="next-step" className="order-3 mx-auto w-full max-w-7xl px-5 pb-16 pt-8 sm:px-10 sm:pb-20 lg:px-16">
          <div data-individual-reveal className="border-t border-[#8E7650]/20 pt-10 sm:pt-14">
            <div className="grid gap-5 sm:grid-cols-[.8fr_1.2fr] sm:gap-12">
              <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A6328] sm:text-xs">COMMON CHALLENGES, PRACTICAL RESPONSES</p><h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#203029] sm:text-4xl">Every chapter can begin with one thoughtful step.</h2></div>
              <div className="divide-y divide-[#8E7650]/15">
                {reflections.map((item, index) => <article key={item.challenge} data-individual-reveal className="grid gap-2 py-5 sm:grid-cols-[.85fr_1.15fr] sm:gap-8 sm:py-6" style={{ transitionDelay: `${index * 100}ms` }}><div><p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A6F32]">A MOMENT 0{index + 1}</p><h3 className="text-base font-semibold leading-snug text-[#203029] sm:text-lg">{item.challenge}</h3></div><div><p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#806333]">A WAY FORWARD</p><p className="text-sm leading-6 text-[#586056] sm:text-base sm:leading-7">{item.response}</p></div></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="next-step" className="order-4 px-5 pb-16 sm:px-10 sm:pb-20 lg:px-16">
          <div data-individual-reveal className="mx-auto flex max-w-7xl flex-col items-start gap-7 rounded-[2rem] bg-[#253D2D] px-6 py-10 text-white shadow-[0_24px_80px_rgba(37,61,45,0.18)] sm:px-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:px-16">
            <div className="max-w-2xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#E7D8B9] sm:text-xs">YOUR NEXT CHAPTER STARTS WITH ONE STEP</p><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Make room for clarity, resilience, and possibility.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#F5F0E6]/75 sm:text-base sm:leading-7">Whatever your age, role, or starting point, tell us what kind of personal growth you are looking for.</p></div>
            <Link href="/signup" className="group inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-[#EFE4D0] px-6 text-sm font-bold text-[#253D2D] transition hover:-translate-y-0.5 hover:bg-white">Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </section>
      </main>

      <Footer onNavigateHome={() => { window.location.href = '/'; }} onNavigateRoles={() => { window.location.href = '/'; }} onNavigateContact={() => { window.location.href = '/signup'; }} />

      <style jsx global>{`
        .individual-page-scroll { background-image: radial-gradient(ellipse at 76% 12%, rgba(221,192,132,.17), transparent 32%), linear-gradient(150deg, #FBF7EE 0%, #F7F1E5 54%, #F5EDDE 100%); }
        .individual-path-flow { fill: none; stroke-width: 2; stroke-dasharray: 5 8; animation: individualPathFlow 9s linear infinite; }
        .individual-path-flow-one { stroke: #8A6328; }
        .individual-path-flow-two { stroke: #607B5E; animation-direction: reverse; }
        .individual-node-sweep { animation: individualNodeSweep 18s linear infinite; opacity: .72; }
        @keyframes individualPathFlow { to { stroke-dashoffset: -156; } }
        @keyframes individualNodeSweep { to { transform: rotate(360deg); } }
        [data-individual-reveal] { opacity: 0; filter: blur(7px); transform: translateY(30px) scale(.98); transition: opacity 650ms ease, transform 720ms cubic-bezier(.16,1,.3,1), filter 700ms ease; }
        [data-individual-reveal].is-visible { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
        .individual-path-node[data-individual-reveal] { transform: translate3d(0,38px,0) scale(.9); transition-duration: 850ms; }
        .individual-path-node[data-individual-reveal].is-visible { transform: translate3d(0,0,0) scale(1); }
        .individual-path-node:hover { transform: translateY(-7px) scale(1.025); box-shadow: 0 28px 65px rgba(64,48,23,.16); }
        .individual-path-node a:hover { color: #fff !important; background: #253D2D; }
        @media (prefers-reduced-motion: reduce) { .individual-path-flow,.individual-node-sweep { animation: none; opacity: 1; } [data-individual-reveal] { opacity: 1; filter: none; transform: none; transition: none; } }
      `}</style>
    </div>
  );
}

function CheckMark() {
  return <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#E7D8B9] text-[10px] font-bold text-[#65512D]">✓</span>;
}
