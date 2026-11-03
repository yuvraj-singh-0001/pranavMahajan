'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  Landmark,
  Network,
  ShieldCheck,
  UsersRound,
  X,
} from 'lucide-react';
import Footer from './Footer';
import { useSectionUrl } from '@/hooks/useSectionUrl';

const priorities = [
  {
    number: '01',
    icon: Compass,
    label: 'LEADERSHIP CLARITY',
    title: 'Make sound decisions in complex moments.',
    body: 'Create space to step back, read the wider context, and act with purpose when priorities compete.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    label: 'PEOPLE & RESILIENCE',
    title: 'Help public teams stay steady through change.',
    body: 'Support the people carrying demanding responsibilities with practical ways to manage pressure and renew their focus.',
  },
  {
    number: '03',
    icon: Network,
    label: 'CULTURE & TRUST',
    title: 'Turn shared purpose into everyday action.',
    body: 'Strengthen communication, accountability, and the small behaviours that help departments work together.',
  },
];

const journey = [
  { number: '01', title: 'Understand the mandate', text: 'Start with your department’s priorities, people, and the moment the organisation is navigating.' },
  { number: '02', title: 'Shape the experience', text: 'Build a keynote or leadership session around the audience and outcomes that matter.' },
  { number: '03', title: 'Equip people to act', text: 'Give participants useful ideas and practices they can carry into their work.' },
  { number: '04', title: 'Keep progress moving', text: 'Connect the shared experience to practical next steps for teams and leaders.' },
];

const navItems = [
  { href: '#top', label: 'Overview' },
  { href: '#priorities', label: 'Priorities' },
  { href: '#approach', label: 'Our approach' },
];

export default function GovernmentLandingPage({ initialSection }: { initialSection?: string } = {}) {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useSectionUrl(scrollRootRef, '/government', initialSection);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>('[data-government-reveal]');
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
    }, { root, threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <div ref={scrollRootRef} className="government-page h-dvh overflow-y-auto overflow-x-clip text-[#F4F0E7]">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 sm:px-10 sm:py-4 lg:px-16">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button type="button" aria-label="Go back to the previous page" title="Back" onClick={() => window.history.length > 1 && document.referrer.startsWith(window.location.origin) ? window.history.back() : window.location.assign('/')} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C7A66B]/35 bg-[#101C29]/85 text-[#E7C787] backdrop-blur-md transition hover:bg-[#1B2B3B] sm:h-10 sm:w-10"><ArrowLeft className="h-4 w-4" /></button>
          <Link href="/signup" aria-label="Continue to the next step" title="Next" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C7A66B]/35 bg-[#101C29]/85 text-[#E7C787] backdrop-blur-md transition hover:bg-[#1B2B3B] sm:h-10 sm:w-10"><ArrowRight className="h-4 w-4" /></Link>
          <Link href="/" aria-label="Pranav Mahajan home" className="pointer-events-auto inline-flex items-center">
            <img src="/pranav_mahajan_transparent.png" alt="Pranav Mahajan" className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(199,166,107,0.25)] sm:h-14 md:h-16" />
          </Link>
        </div>
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-[#C7A66B]/50 bg-[#172838]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#E7C787] shadow-[0_4px_16px_rgba(199,166,107,0.14)] backdrop-blur-md transition hover:scale-105 hover:bg-[#24384A] sm:px-5 sm:py-2">Sign Up</Link>
          <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-[#C7A66B]/35 bg-[#101C29]/90 text-white shadow-xs backdrop-blur-md transition hover:bg-[#1B2B3B] sm:h-10 sm:w-10 sm:rounded-2xl">
            {menuOpen ? <X className="h-5 w-5 text-[#E7C787]" /> : <><span className="h-0.5 w-4 rounded-full bg-slate-200" /><span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#C7A66B]" /><span className="h-0.5 w-4 rounded-full bg-slate-200" /></>}
          </button>
        </div>
      </header>

      <button type="button" aria-label="Close navigation menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className={`fixed inset-0 z-40 bg-[#07111B]/55 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-label="Government page navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-[#C7A66B]/20 bg-[#142331] px-6 pb-8 pt-6 text-[#F4F0E7] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#C7A66B]">NAVIGATION</p><p className="mt-1 text-lg font-semibold">Government leadership</p></div>
          <button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#E7C787] transition hover:bg-white/10"><X className="h-5 w-5" /></button>
        </div>
        <nav aria-label="Government page sections" className="mt-6 flex flex-col gap-2">
          {navItems.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-base font-semibold text-[#D4D9D9] transition hover:border-[#C7A66B]/20 hover:bg-white/[0.04] hover:text-[#E7C787]"><span><span className="mr-3 font-mono text-xs text-[#C7A66B]">0{index + 1}</span>{item.label}</span><ArrowRight className="h-4 w-4 text-[#C7A66B] transition-transform group-hover:translate-x-1" /></a>)}
        </nav>
        <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm leading-6 text-[#BBC5C7]">Explore a leadership experience shaped around your public service context.</p><Link href="/signup" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#C7A66B] px-5 text-sm font-bold text-[#101C29] transition hover:bg-[#E3C98F]">Start a conversation <ArrowRight className="h-4 w-4" /></Link></div>
      </aside>

      <main>
        <section id="top" data-url-section="top" className="government-hero relative isolate flex min-h-[780px] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:min-h-[850px] lg:px-16">
          <div aria-hidden="true" className="government-grid absolute inset-0 -z-10 opacity-[0.16]" />
          <div aria-hidden="true" className="absolute -right-40 top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#C7A66B]/10 blur-[100px] sm:h-[44rem] sm:w-[44rem]" />
          <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="government-reveal max-w-3xl" data-government-reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#C7A66B]/30 bg-white/[0.04] px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[.2em] text-[#E7C787] sm:text-[10px]"><Landmark className="h-3.5 w-3.5" /> Government departments <span className="text-[#C7A66B]/50">/</span> a path designed for you</p>
              <p className="mt-9 font-serif text-lg italic text-[#C7A66B] sm:text-xl">Leadership for work that serves everyone.</p>
              <h1 className="mt-3 max-w-3xl text-[2.65rem] font-semibold leading-[1.02] tracking-[-.055em] text-[#F4F0E7] sm:text-6xl lg:text-[4.65rem]">Strengthen the people behind <span className="government-title-accent">public progress.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#C4CBD0] sm:text-lg sm:leading-8">Strategic institutional vision, nation-building purpose, and practical leadership experiences for public governance teams navigating change and responsibility.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/signup" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#C7A66B] px-6 text-sm font-bold text-[#101C29] shadow-[0_12px_30px_rgba(199,166,107,.15)] transition hover:-translate-y-0.5 hover:bg-[#E3C98F]">Plan a government session <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                <a href="#priorities" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#E7C787] transition hover:bg-white/[0.06]">Explore the priorities <ArrowDown className="h-4 w-4" /></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-5 text-xs font-medium text-[#BCC4C8] sm:text-sm">
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#C7A66B]" /> People-centred leadership</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#C7A66B]" /> Resilience through change</span>
              </div>
            </div>

            <div className="government-reveal relative mx-auto flex min-h-[410px] w-full max-w-[560px] items-center justify-center" data-government-reveal style={{ transitionDelay: '140ms' }}>
              <div aria-hidden="true" className="government-orbit absolute h-[min(82vw,430px)] w-[min(82vw,430px)] rounded-full border border-[#C7A66B]/25" />
              <div aria-hidden="true" className="government-orbit government-orbit-inner absolute h-[min(64vw,330px)] w-[min(64vw,330px)] rounded-full border border-dashed border-[#C7A66B]/30" />
              <div className="government-brief relative z-10 w-[min(100%,390px)] rounded-[1.8rem] border border-white/15 bg-[#172838]/95 p-6 shadow-[0_32px_90px_rgba(0,0,0,.42)] sm:rounded-[2.2rem] sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.24em] text-[#C7A66B]">PUBLIC LEADERSHIP BRIEF</p><p className="mt-1.5 text-sm font-medium text-[#F4F0E7]">A shared direction</p></div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C7A66B]/30 bg-[#C7A66B]/10 text-[#E7C787]"><Building2 className="h-5 w-5" /></span>
                </div>
                <div className="py-7">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[.22em] text-[#9AA8AE]">PURPOSE IN PRACTICE</p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-[#F4F0E7] sm:text-[2.15rem]">Trust is built in the way we work.</h2>
                </div>
                <div className="space-y-3">
                  {[['01', 'Clear intent', 'A direction people can understand'], ['02', 'Steady teams', 'People equipped to meet pressure'], ['03', 'Public impact', 'Progress citizens can experience']].map(([number, title, text]) => (
                    <div key={number} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-3">
                      <span className="font-mono text-[10px] font-bold text-[#C7A66B]">{number}</span>
                      <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-[#F4F0E7]">{title}</span><span className="mt-0.5 block text-[10px] text-[#9EABB0]">{text}</span></span>
                      <ArrowUpRight className="h-4 w-4 text-[#C7A66B]/80" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[9px] font-mono font-bold uppercase tracking-[.18em] text-[#9AA8AE]"><span className="h-1.5 w-1.5 rounded-full bg-[#A8B8A0]" /> People. Purpose. Public progress.</div>
              </div>
              <div aria-hidden="true" className="government-orbit-dot absolute right-[8%] top-[12%] h-3 w-3 rounded-full bg-[#D5B778] shadow-[0_0_22px_rgba(213,183,120,.8)]" />
              <span className="absolute bottom-[8%] left-[1%] hidden items-center gap-2 rounded-full border border-white/10 bg-[#172838] px-4 py-2.5 text-[10px] font-medium text-[#D6D9D8] shadow-xl sm:flex"><UsersRound className="h-4 w-4 text-[#C7A66B]" /> Built around the people who serve</span>
            </div>
          </div>
          <a href="#priorities" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[.24em] text-[#AAB4B7] transition hover:text-[#E7C787] lg:inline-flex">Scroll to explore <ArrowDown className="h-3.5 w-3.5" /></a>
        </section>

        <section id="priorities" data-url-section="priorities" className="relative overflow-hidden border-y border-white/[0.08] bg-[#142331] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#C7A66B]/[0.06] blur-[90px]" />
          <div className="relative mx-auto max-w-[1320px]">
            <div data-government-reveal className="mb-12 grid gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-end lg:gap-16">
              <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#C7A66B]">THE WORK AHEAD</p><h2 className="mt-4 max-w-lg font-serif text-3xl leading-tight text-[#F4F0E7] sm:text-5xl">Public leadership is a people practice.</h2></div>
              <p className="max-w-2xl text-sm leading-7 text-[#B5C0C4] sm:text-base sm:leading-8">Institutions deliver their purpose through people. Thoughtful leadership can help teams respond to complexity with greater clarity, care, and shared responsibility.</p>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {priorities.map((item) => {
                const Icon = item.icon;
                return <article key={item.number} data-government-reveal className="government-priority grid gap-5 py-7 sm:grid-cols-[4rem_1fr_1.1fr_auto] sm:items-center sm:gap-7 sm:py-9">
                  <span className="font-mono text-sm font-bold tracking-[.18em] text-[#C7A66B]">{item.number}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C7A66B]/25 bg-[#C7A66B]/[0.07] text-[#E0C58E]"><Icon className="h-5 w-5" /></span>
                  <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.22em] text-[#C7A66B]">{item.label}</p><h3 className="mt-2 max-w-lg text-lg font-semibold leading-snug text-[#F4F0E7] sm:text-xl">{item.title}</h3></div>
                  <p className="max-w-xl text-sm leading-6 text-[#AEB9BD] sm:col-span-2 sm:col-start-3 sm:row-start-2 sm:pl-0 lg:col-span-1 lg:col-start-4 lg:row-start-1">{item.body}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="approach" data-url-section="approach" className="government-approach px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
            <div data-government-reveal className="lg:sticky lg:top-28 lg:h-fit">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#C7A66B]">A PRACTICAL COLLABORATION</p>
              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-[#F4F0E7] sm:text-5xl">From institutional purpose to everyday progress.</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#B5C0C4] sm:text-base sm:leading-8">Each engagement begins with listening. The format and focus are then shaped around your people, setting, and intended outcomes.</p>
              <Link href="/signup" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C7A66B]/50 px-5 text-sm font-semibold text-[#E7C787] transition hover:bg-[#C7A66B] hover:text-[#101C29]">Discuss your context <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative">
              <div aria-hidden="true" className="absolute bottom-5 left-[1.15rem] top-5 w-px bg-gradient-to-b from-[#C7A66B]/70 via-[#C7A66B]/20 to-transparent sm:left-[1.35rem]" />
              <div className="relative space-y-3">
                {journey.map((item) => <article key={item.number} data-government-reveal className="government-step group relative grid grid-cols-[2.5rem_1fr] gap-4 rounded-[1.5rem] border border-white/[0.08] bg-[#172838]/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#C7A66B]/35 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:p-7">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#C7A66B]/50 bg-[#142331] font-mono text-[9px] font-bold text-[#E7C787] sm:h-11 sm:w-11 sm:text-[10px]">{item.number}</span>
                  <div className="pt-1"><h3 className="text-lg font-semibold text-[#F4F0E7] sm:text-xl">{item.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#AEB9BD] sm:text-base sm:leading-7">{item.text}</p></div>
                </article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="impact" data-url-section="impact" className="government-impact relative overflow-hidden border-y border-[#C7A66B]/20 bg-[#C7A66B] px-5 py-16 text-[#101C29] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-40 h-[30rem] w-[30rem] rounded-full border border-[#101C29]/10 sm:h-[38rem] sm:w-[38rem]" />
          <div data-government-reveal className="relative mx-auto flex max-w-[1320px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#263442]/75">PUBLIC PURPOSE, MADE PRACTICAL</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">Equip people to meet the moment—and keep serving with purpose.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-[#263442]/80 sm:text-base sm:leading-8">Bring leaders and teams together around a clearer direction, stronger working relationships, and actions that support the public good.</p></div>
            <Link href="/signup" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#101C29] px-6 text-sm font-semibold text-[#F4F0E7] transition hover:-translate-y-0.5 hover:bg-[#1D3042]">Start a conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </section>
      </main>

      <Footer
        onNavigateHome={() => { window.location.href = '/'; }}
        onNavigateRoles={() => { window.location.href = '/#roles'; }}
        onNavigateContact={() => { window.location.href = '/signup'; }}
      />

      <style jsx global>{`
        .government-page { background: #101C29; scroll-behavior: smooth; }
        .government-hero { background: radial-gradient(ellipse at 78% 44%, rgba(199,166,107,.10), transparent 35%), linear-gradient(135deg, #101C29 0%, #132333 58%, #101C29 100%); }
        .government-grid { background-image: linear-gradient(rgba(220,205,170,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220,205,170,.07) 1px, transparent 1px); background-size: 52px 52px; mask-image: linear-gradient(to bottom, black, transparent 90%); }
        .government-title-accent { color: #D5B778; text-shadow: 0 12px 42px rgba(213,183,120,.18); }
        .government-brief { animation: governmentBriefIn 850ms cubic-bezier(.16,1,.3,1) both, governmentBriefFloat 8s ease-in-out 850ms infinite; }
        .government-orbit { animation: governmentOrbit 34s linear infinite; }
        .government-orbit-inner { animation-duration: 26s; animation-direction: reverse; }
        .government-orbit-dot { animation: governmentDot 4.5s ease-in-out infinite; }
        .government-approach { background: radial-gradient(ellipse at 14% 20%, rgba(199,166,107,.07), transparent 30%), #101C29; }
        .government-impact { background-image: linear-gradient(110deg, rgba(255,255,255,.07), transparent 46%), linear-gradient(135deg, #C7A66B, #B79558); }
        [data-government-reveal] { opacity: 0; filter: blur(6px); transform: translateY(24px); transition: opacity 650ms ease, transform 750ms cubic-bezier(.16,1,.3,1), filter 700ms ease; }
        [data-government-reveal].is-visible { opacity: 1; filter: blur(0); transform: translateY(0); }
        @keyframes governmentBriefIn { from { opacity: 0; transform: perspective(1100px) rotateY(-9deg) translateY(28px) scale(.96); } to { opacity: 1; transform: perspective(1100px) rotateY(-3deg) translateY(0) scale(1); } }
        @keyframes governmentBriefFloat { 0%,100% { translate: 0 0; } 50% { translate: 0 -7px; } }
        @keyframes governmentOrbit { to { rotate: 360deg; } }
        @keyframes governmentDot { 0%,100% { transform: translateY(0); opacity: .8; } 50% { transform: translateY(9px); opacity: 1; } }
        @media (max-width: 639px) { .government-brief { animation-name: governmentBriefIn; } }
        @media (prefers-reduced-motion: reduce) { .government-brief,.government-orbit,.government-orbit-dot { animation: none; } [data-government-reveal] { opacity: 1; filter: none; transform: none; transition: none; } }
      `}</style>
    </div>
  );
}
