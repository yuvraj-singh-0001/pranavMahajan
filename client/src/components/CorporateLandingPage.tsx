'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import Footer from './Footer';

const steps = [
  { number: '01', title: 'Listen', text: 'Understand your people, priorities, and the moment your organisation is facing.' },
  { number: '02', title: 'Align', text: 'Shape a keynote or leadership session around a clear, relevant outcome.' },
  { number: '03', title: 'Move forward', text: 'Leave teams with ideas and actions they can carry into their everyday work.' },
];

export default function CorporateLandingPage() {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const edgeScrollRef = useRef(0);
  const edgeScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>('[data-corporate-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { root, threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const handleEdgeScroll = (event: WheelEvent) => {
      if (menuOpen || Math.abs(event.deltaY) < 24) return;
      const atTop = root.scrollTop <= 3;
      const atBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 4;
      const fastUpAtTop = atTop && event.deltaY < 0;
      const fastDownAtBottom = atBottom && event.deltaY > 0;

      if (!fastUpAtTop && !fastDownAtBottom) {
        edgeScrollRef.current = 0;
        return;
      }

      edgeScrollRef.current += event.deltaY;
      if (edgeScrollTimerRef.current) clearTimeout(edgeScrollTimerRef.current);
      edgeScrollTimerRef.current = setTimeout(() => { edgeScrollRef.current = 0; }, 280);

      if (edgeScrollRef.current <= -140) {
        edgeScrollRef.current = 0;
        window.history.back();
      } else if (edgeScrollRef.current >= 140) {
        edgeScrollRef.current = 0;
        window.history.forward();
      }
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;
      if (menuOpen || startY === null) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;
      const distance = endY - startY;
      const atTop = root.scrollTop <= 3;
      const atBottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 4;
      if (atTop && distance > 120) window.history.back();
      else if (atBottom && distance < -120) window.history.forward();
    };

    root.addEventListener('wheel', handleEdgeScroll, { passive: true });
    root.addEventListener('touchstart', handleTouchStart, { passive: true });
    root.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      root.removeEventListener('wheel', handleEdgeScroll);
      root.removeEventListener('touchstart', handleTouchStart);
      root.removeEventListener('touchend', handleTouchEnd);
      if (edgeScrollTimerRef.current) clearTimeout(edgeScrollTimerRef.current);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <div ref={scrollRootRef} className="corporate-scroll h-dvh overflow-y-auto overflow-x-clip text-[#17233D]">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 sm:px-10 sm:py-4 lg:px-16">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button type="button" aria-label="Go back to the previous page" title="Back" onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign('/')} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3155FF]/20 bg-[#FFF4DC]/85 text-[#3155FF] transition hover:bg-[#A8D5BA] sm:h-10 sm:w-10"><ArrowLeft className="h-4 w-4" /></button>
          <Link href="/" aria-label="Pranav Mahajan home" className="inline-flex items-center">
          <img src="/pranav_mahajan_transparent.png" alt="Pranav Mahajan" className="h-10 w-auto object-contain sm:h-14" />
          </Link>
        </div>
        <div className="pointer-events-auto flex items-center gap-2.5">
          <Link href="/signup" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#3155FF] px-4 text-xs font-bold text-white shadow-[0_8px_22px_rgba(49,85,255,.22)] transition hover:-translate-y-0.5 hover:bg-[#2446E8] sm:px-5 sm:text-sm">Sign Up</Link>
          <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-xl border border-[#3155FF]/30 bg-[#17233D] text-white shadow-md transition hover:bg-[#243455] sm:h-10 sm:w-10 sm:rounded-2xl">
            {menuOpen ? <X className="h-5 w-5 text-[#A8D5BA]" /> : <><span className="h-0.5 w-4 rounded-full bg-white" /><span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#A8D5BA]" /><span className="h-0.5 w-4 rounded-full bg-white" /></>}
          </button>
        </div>
      </header>

      <button type="button" aria-label="Close navigation menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className={`fixed inset-0 z-40 bg-[#17233D]/20 backdrop-blur-sm transition-opacity ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-label="Corporate navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(22rem,88vw)] flex-col bg-[#FFF4DC] px-6 pb-8 pt-24 shadow-2xl transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#3155FF]">NAVIGATE</p>
        <a href="#top" onClick={() => setMenuOpen(false)} className="border-b border-[#17233D]/10 py-5 text-lg font-semibold">Corporate home</a>
        <a href="#approach" onClick={() => setMenuOpen(false)} className="border-b border-[#17233D]/10 py-5 text-lg font-semibold">Our approach</a>
        <a href="#outcomes" onClick={() => setMenuOpen(false)} className="border-b border-[#17233D]/10 py-5 text-lg font-semibold">What teams build</a>
        <Link href="/signup" onClick={() => setMenuOpen(false)} className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#3155FF] px-5 text-sm font-bold text-white">Plan a conversation <ArrowRight className="h-4 w-4" /></Link>
      </aside>

      <main>
        <section id="top" className="corporate-hero relative isolate w-full overflow-hidden">
          <div aria-hidden="true" className="corporate-hero-wash pointer-events-none absolute -right-40 top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[#A8D5BA]/50 blur-[100px] sm:h-[720px] sm:w-[720px]" />
          <div className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-12 px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:min-h-[820px] lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:px-16 lg:pt-28">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3155FF]/15 bg-white/75 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#3155FF] shadow-sm sm:text-xs"><span className="h-2 w-2 rounded-full bg-[#A8D5BA] ring-4 ring-[#A8D5BA]/25" /> Leadership, people & organisational growth</p>
            <h1 className="max-w-2xl text-[2.7rem] font-semibold leading-[.99] tracking-[-.06em] text-[#17233D] sm:text-6xl lg:text-[4.65rem]">Lead with clarity.<br />Build teams that <span className="corporate-title-accent">thrive.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#526078] sm:text-lg sm:leading-8">Meaningful leadership begins with people. Give your team space to reset, reconnect, and move forward with a stronger sense of purpose.</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#69758A] sm:text-base sm:leading-7">Keynotes and experiences for executives, people leaders, and organisations navigating change, growth, and the demands of modern work.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/signup" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#3155FF] px-6 text-sm font-bold text-white shadow-[0_12px_26px_rgba(49,85,255,.24)] transition hover:-translate-y-0.5 hover:bg-[#2446E8]">Plan a corporate session <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <a href="#approach" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#3155FF] transition hover:bg-white/70">Explore the approach <ArrowDown className="h-4 w-4" /></a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#17233D]/10 pt-5 text-xs font-medium text-[#526078] sm:text-sm">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#3155FF]" /> Leadership focus</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#3155FF]" /> Resilient teams</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#3155FF]" /> Practical momentum</span>
            </div>
          </div>

          <div className="corporate-visual-wrap relative mx-auto flex min-h-[390px] w-full max-w-[600px] items-center justify-center sm:min-h-[470px] lg:justify-self-end">
            <div aria-hidden="true" className="corporate-visual-orbit corporate-visual-orbit-one absolute h-[300px] w-[300px] rounded-full border border-[#3155FF]/15 sm:h-[390px] sm:w-[390px]" />
            <div aria-hidden="true" className="corporate-visual-orbit corporate-visual-orbit-two absolute h-[230px] w-[230px] rounded-full border border-dashed border-[#3155FF]/20 sm:h-[310px] sm:w-[310px]" />
            <div className="corporate-leadership-panel relative z-10 w-[min(100%,390px)] rounded-[2rem] border border-white/60 bg-[#3155FF] p-5 text-white shadow-[0_34px_85px_rgba(38,64,190,.3)] sm:rounded-[2.5rem] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.22em] text-white/65">TEAM MOMENTUM</p><p className="mt-1 text-sm font-semibold">Leadership snapshot</p></div>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#A8D5BA] text-[#17233D]"><Sparkles className="h-5 w-5" /></span>
              </div>
              <div className="py-6">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#DCE5FF]">A HEALTHIER WAY FORWARD</p>
                <h2 className="mt-2 max-w-[18rem] font-serif text-3xl font-semibold leading-[1.05] sm:text-4xl">People first.<br />Progress follows.</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"><Brain className="h-5 w-5 text-[#A8D5BA]" /><p className="mt-4 text-xs text-white/65">Leadership</p><p className="mt-1 text-sm font-semibold">Clearer thinking</p></div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"><Users className="h-5 w-5 text-[#FFF4DC]" /><p className="mt-4 text-xs text-white/65">Culture</p><p className="mt-1 text-sm font-semibold">Stronger trust</p></div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#FFF4DC] px-4 py-3 text-[#17233D] shadow-lg shadow-[#17233D]/10">
                <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A8D5BA]"><BarChart3 className="h-4 w-4" /></span><div><p className="text-[10px] font-medium text-[#526078]">GROWTH IN MOTION</p><p className="text-xs font-bold">Small shifts. Lasting impact.</p></div></div>
                <ArrowRight className="h-4 w-4 text-[#3155FF]" />
              </div>
            </div>
            <div className="corporate-float-chip absolute left-0 top-[16%] z-20 rounded-2xl border border-white/90 bg-[#FFF4DC] px-4 py-3 shadow-[0_16px_35px_rgba(23,35,61,.13)] sm:-left-3"><span className="font-mono text-[8px] font-bold uppercase tracking-[.18em] text-[#3155FF]">01 / FOCUS</span><p className="mt-1 text-xs font-bold text-[#17233D]">Clear direction</p></div>
            <div className="corporate-float-chip corporate-float-chip-lower absolute bottom-[12%] right-0 z-20 rounded-2xl border border-white/90 bg-[#A8D5BA] px-4 py-3 shadow-[0_16px_35px_rgba(23,35,61,.13)] sm:-right-2"><span className="font-mono text-[8px] font-bold uppercase tracking-[.18em] text-[#3155FF]">02 / CULTURE</span><p className="mt-1 text-xs font-bold text-[#17233D]">People moving together</p></div>
          </div>
          </div>
        </section>

        <section id="approach" className="mx-auto w-full max-w-[1440px] scroll-mt-24 px-5 pb-16 pt-8 sm:px-10 sm:pb-20 sm:pt-10 lg:px-16 lg:pb-24 lg:pt-12">
          <div data-corporate-reveal className="mb-4 max-w-3xl sm:mb-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#3155FF] sm:text-xs">A HUMAN-CENTRED APPROACH</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.045em] text-[#17233D] sm:text-5xl">Strong organisations start with how people feel, think, and work.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#526078] sm:text-base sm:leading-8">When people have clarity and the confidence to navigate pressure, teams can bring more of their ability to the work that matters.</p>
          </div>
          <figure id="outcomes" className="mx-auto w-full max-w-5xl">
            <img
              src="/Cycle%20Process%20Infographic.png"
              alt="Cycle Process infographic showing seven connected steps around a continuous process"
              className="h-auto w-full object-contain"
            />
          </figure>
        </section>

        <section className="relative overflow-hidden bg-[#A8D5BA]/45 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-[#3155FF]/10 sm:h-[34rem] sm:w-[34rem]" />
          <div className="relative mx-auto grid max-w-[1312px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div data-corporate-reveal>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#3155FF] sm:text-xs">FROM INTENTION TO ACTION</p>
              <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-.045em] text-[#17233D] sm:text-5xl">A thoughtful experience, shaped around your people.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#43536A] sm:text-base sm:leading-8">Every organisation is at a different point. Start with the conversation, then create a session that meets the moment.</p>
            </div>
            <div className="divide-y divide-[#17233D]/15">
              {steps.map((step, index) => (
                <article key={step.number} data-corporate-reveal className="grid gap-3 py-6 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-8" style={{ transitionDelay: `${index * 100}ms` }}>
                  <span className="font-serif text-4xl font-semibold leading-none text-[#3155FF]">{step.number}</span>
                  <div><h3 className="text-lg font-semibold text-[#17233D] sm:text-xl">{step.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-[#43536A] sm:text-base sm:leading-7">{step.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div data-corporate-reveal className="corporate-cta relative mx-auto max-w-[1312px] overflow-hidden rounded-[2rem] bg-[#3155FF] px-6 py-10 text-white shadow-[0_28px_75px_rgba(49,85,255,.24)] sm:px-12 sm:py-14 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-36 h-80 w-80 rounded-full border border-white/20 sm:h-[30rem] sm:w-[30rem]" />
            <div className="relative z-10 max-w-3xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#DCE5FF] sm:text-xs">A STRONGER NEXT CHAPTER</p><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.045em] sm:text-5xl">Make space for the people behind the progress.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">Tell us what your organisation is working through and what you want your people to take forward.</p></div>
            <Link href="/signup" className="group relative z-10 mt-8 inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#FFF4DC] px-6 text-sm font-bold text-[#17233D] transition hover:-translate-y-0.5 hover:bg-white lg:mt-0">Start a conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </section>
      </main>

      <Footer
        onNavigateHome={() => { window.location.href = '/'; }}
        onNavigateRoles={() => { window.location.href = '/'; }}
        onNavigateContact={() => { window.location.href = '/signup'; }}
      />

      <style jsx global>{`
        .corporate-scroll { background: #FFF4DC; scroll-behavior: smooth; }
        .corporate-hero { background: radial-gradient(ellipse at 72% 5%, rgba(168,213,186,.35), transparent 38%), linear-gradient(145deg, #FFF4DC 0%, #fff9ec 55%, #F8F0DE 100%); }
        .corporate-title-accent { color: #3155FF; text-shadow: 0 10px 35px rgba(49,85,255,.12); }
        .corporate-visual-wrap { perspective: 1400px; }
        .corporate-leadership-panel { transform: rotateY(-9deg) rotateX(3deg); animation: corporate-panel-arrive 900ms cubic-bezier(.16,1,.3,1) both, corporate-panel-float 7s ease-in-out 900ms infinite; }
        .corporate-visual-orbit-one { animation: corporate-orbit 32s linear infinite; }
        .corporate-visual-orbit-two { animation: corporate-orbit 24s linear infinite reverse; }
        .corporate-float-chip { animation: corporate-chip-float 5s ease-in-out infinite; }
        .corporate-float-chip-lower { animation-delay: -2.2s; }
        [data-corporate-reveal] { opacity: 0; filter: blur(7px); transform: translateY(26px); transition: opacity 650ms ease, transform 700ms cubic-bezier(.16,1,.3,1), filter 700ms ease; }
        [data-corporate-reveal].is-visible { opacity: 1; filter: blur(0); transform: translateY(0); }
        @keyframes corporate-panel-arrive { from { opacity: 0; transform: translateY(26px) rotateY(-16deg) rotateX(6deg) scale(.96); } to { opacity: 1; transform: rotateY(-9deg) rotateX(3deg) scale(1); } }
        @keyframes corporate-panel-float { 0%,100% { translate: 0 0; } 50% { translate: 0 -9px; } }
        @keyframes corporate-orbit { to { rotate: 360deg; } }
        @keyframes corporate-chip-float { 0%,100% { translate: 0 0; } 50% { translate: 0 -7px; } }
        @media (max-width: 639px) { .corporate-leadership-panel { transform: none; } }
        @media (prefers-reduced-motion: reduce) { .corporate-leadership-panel,.corporate-visual-orbit-one,.corporate-visual-orbit-two,.corporate-float-chip { animation: none; } [data-corporate-reveal] { opacity: 1; filter: none; transform: none; transition: none; } }
      `}</style>
    </div>
  );
}
