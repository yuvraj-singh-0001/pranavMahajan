'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Brain,
  Check,
  GraduationCap,
  Target,
  X,
} from 'lucide-react';
import Footer from './Footer';

const navigation = [
  { href: '#top', label: 'Home' },
  { href: '#the-approach', label: 'Student pathways' },
];

const outcomes = [
  {
    number: '01',
    icon: Target,
    eyebrow: 'FOCUS',
    title: 'Give your attention a direction',
    text: 'Explore practical ways to settle distractions, return to the task in front of you, and make study time feel more intentional.',
  },
  {
    number: '02',
    icon: Brain,
    eyebrow: 'EXAM CONFIDENCE',
    title: 'Meet important moments with a calmer mind',
    text: 'Build a more composed approach to preparation, revision, and exams—so pressure does not get to define your potential.',
  },
  {
    number: '03',
    icon: BookOpenCheck,
    eyebrow: 'GROWTH',
    title: 'Turn effort into steady progress',
    text: 'Strengthen the mindset and everyday routines that help you keep learning, recover from setbacks, and move towards your goals.',
  },
];

const studentChallenges = [
  {
    problem: 'It is hard to stay focused while studying.',
    response: 'Break study time into clear, manageable sessions. When attention wanders, pause, reset, and return to one task at a time.',
  },
  {
    problem: 'Exam pressure makes it difficult to feel confident.',
    response: 'Build confidence through preparation, calm reflection, and noticing the progress you make along the way.',
  },
  {
    problem: 'A setback can make it tough to know what to do next.',
    response: 'Treat mistakes as information. Identify one lesson, choose one next step, and keep moving forward steadily.',
  },
];

export default function StudentLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRoot = pageScrollRef.current;
    if (!scrollRoot) return;
    const sections = scrollRoot.querySelectorAll<HTMLElement>('[data-student-reveal]');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { root: scrollRoot, threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  return (
    <div ref={pageScrollRef} className="student-page-scroller h-dvh overflow-y-auto overflow-x-clip bg-[#F7F1E5] text-[#163D29]">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-amber-500/15 bg-black/40 px-4 py-2.5 backdrop-blur-md transition-all duration-500 sm:border-b-0 sm:bg-transparent sm:px-12 sm:py-5 sm:backdrop-blur-none">
        <Link href="/" aria-label="Pranav Mahajan home" className="pointer-events-auto inline-flex items-center">
          <img
            src="/pranav_mahajan_transparent.png"
            alt="Pranav Mahajan"
            className="h-10 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)] sm:h-16 md:h-20"
          />
        </Link>
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-amber-500/50 bg-[#1e1710]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-amber-200 shadow-[0_4px_16px_rgba(223,165,71,0.2)] backdrop-blur-md transition hover:scale-105 hover:border-amber-400 hover:bg-[#2e2318] hover:text-white sm:px-5 sm:py-2">
            Sign Up
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-amber-500/30 bg-[#16120e]/90 text-white shadow-xs backdrop-blur-md transition hover:bg-[#221b14] sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            {menuOpen ? <X className="h-5 w-5 text-amber-300" /> : <>
              <span className="h-0.5 w-4 rounded-full bg-slate-200" />
              <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#dfa547]" />
              <span className="h-0.5 w-4 rounded-full bg-slate-200" />
            </>}
          </button>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-[#07110c]/35 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-[#927644]/20 bg-[#F7F1E5] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-emerald-900/10 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#41845C]">NAVIGATION</p>
            <p className="mt-1 text-lg font-semibold text-[#123D27]">Student growth</p>
          </div>
          <button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#927644]/20 bg-[#FFFCF7] text-[#28784B] transition hover:bg-[#F0E8D9]"><X className="h-5 w-5" /></button>
        </div>
        <nav aria-label="Main navigation" className="mt-6 flex flex-col gap-2">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-base font-semibold text-[#31513D] transition hover:border-[#927644]/15 hover:bg-[#FFFCF7]">
              <span><span className="mr-3 font-mono text-xs text-[#59A877]">0{index + 1}</span>{item.label}</span>
              <ArrowRight className="h-4 w-4 text-[#58A979] transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl bg-[#F0E8D9] p-5">
          <p className="text-sm leading-6 text-[#53695A]">Ready to take the next step in your student journey?</p>
          <Link href="/signup" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#123D27] px-5 text-sm font-semibold text-white transition hover:bg-[#1b5938]">
            Sign up <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      <main className="flex flex-col">
        <section id="top" className="order-1 relative mx-auto grid min-h-[760px] max-w-7xl scroll-mt-24 items-center gap-10 px-5 pb-16 pt-28 sm:px-10 sm:pt-36 lg:min-h-[800px] lg:grid-cols-[1.05fr_.95fr] lg:gap-4 lg:px-16 lg:pt-36">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#318153] shadow-sm sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#58BD7B]" /> A student growth experience
            </p>
            <h1 className="max-w-2xl text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#153D2A] sm:text-6xl lg:text-[4.6rem]">
              Learn with focus.<br />
              <span className="text-[#8A6328]">Grow with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#53695A] sm:text-lg sm:leading-8">
              A practical mindset experience for students who want to feel more focused in their studies, calmer around exams, and confident about the possibilities ahead.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/signup" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#123D27] px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#1b5938]">
                Explore the student experience <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#the-approach" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#28784B] transition hover:bg-white/70">
                Discover the approach <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-emerald-900/10 pt-5 text-xs font-medium text-[#587261] sm:text-sm">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#45A66A]" /> Focus & study habits</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#45A66A]" /> Exam calm & confidence</span>
            </div>
          </div>

          <div aria-label="Student focus and growth" className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center">
            <div className="absolute h-[76%] w-[76%] rounded-full bg-[#B8F7D0]/75 blur-2xl" />
            <div className="student-hero-ring absolute inset-[6%] rounded-full border border-[#3E9A61]/25 border-t-[#3E9A61]/80">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#52B77A] shadow-[0_0_16px_#52B77A]" />
            </div>
            <div className="student-hero-ring-reverse absolute inset-[18%] rounded-full border border-dashed border-[#3E9A61]/30" />
            <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[#B8F7D0] text-center shadow-[0_20px_70px_rgba(39,128,76,0.18)] sm:h-44 sm:w-44">
              <GraduationCap className="mb-2 h-8 w-8 text-[#28784B]" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#28784B]">Your potential</span>
              <span className="mt-1 font-serif text-2xl font-bold text-[#123D27]">in focus</span>
            </div>
            <span className="absolute right-[17%] top-[12%] h-3 w-3 rounded-full bg-[#52B77A] shadow-[0_0_20px_#52B77A]" />
          </div>
          <a href="#the-approach" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#6B8C76] transition hover:text-[#28784B] lg:inline-flex">
            Scroll to explore <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </section>

        <section id="the-approach" className="order-2 scroll-mt-24 mx-auto max-w-7xl px-5 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
          <h2 className="sr-only">Explore focus, exam confidence, and student growth</h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {outcomes.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.number} data-student-reveal className={`student-topic-card student-topic-card-${item.number} group relative isolate flex min-h-[310px] flex-col overflow-hidden rounded-[1.75rem] border border-[#927644]/20 bg-[#FFFCF7]/90 p-6 shadow-[0_16px_50px_rgba(64,48,23,0.07)] sm:p-7`} style={{ transitionDelay: `${(Number(item.number) - 1) * 170}ms` }}>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#58A979]">{item.number} <span className="text-emerald-900/25">/ 03</span></span>
                    <span className="student-card-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#58714F] transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#41845C]">{item.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-[#8A6328] sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#53695A] sm:text-[15px]">{item.text}</p>
                  <a href="/signup" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#28784B]">
                    Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="order-3 mx-auto w-full max-w-7xl px-5 pb-16 pt-8 sm:px-10 sm:pb-20 lg:px-16">
          <div data-student-reveal className="border-t border-[#927644]/20 pt-10 sm:pt-14">
            <div className="grid gap-5 sm:grid-cols-[.8fr_1.2fr] sm:gap-12">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A6328] sm:text-xs">THE CHALLENGE & A WAY FORWARD</p>
                <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#153D2A] sm:text-4xl">When studies feel difficult, start with one helpful shift.</h2>
              </div>
              <div className="divide-y divide-[#927644]/15">
                {studentChallenges.map((item, index) => (
                  <article key={item.problem} data-student-reveal className="grid gap-2 py-5 sm:grid-cols-[.85fr_1.15fr] sm:gap-8 sm:py-6" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div>
                      <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A6F32]">CHALLENGE 0{index + 1}</p>
                      <h3 className="text-base font-semibold leading-snug text-[#163D29] sm:text-lg">{item.problem}</h3>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#41845C]">A HELPFUL RESPONSE</p>
                      <p className="text-sm leading-6 text-[#53695A] sm:text-base sm:leading-7">{item.response}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="order-4 px-5 pb-16 sm:px-10 sm:pb-20 lg:px-16">
          <div data-student-reveal className="mx-auto flex max-w-7xl flex-col items-start gap-7 rounded-[2rem] bg-[#123D27] px-6 py-10 text-white shadow-[0_24px_80px_rgba(18,61,39,0.18)] sm:px-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:px-16">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#B8F7D0] sm:text-xs">YOUR NEXT CHAPTER STARTS WITH ONE STEP</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Make room for focus, confidence, and possibility.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50/75 sm:text-base sm:leading-7">Tell us what you are looking for, and take the first step towards a more intentional student journey.</p>
            </div>
            <Link href="/signup" className="group inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-[#B8F7D0] px-6 text-sm font-bold text-[#123D27] transition hover:-translate-y-0.5 hover:bg-white">
              Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

      </main>

      <Footer
        onNavigateHome={() => { window.location.href = '/'; }}
        onNavigateRoles={() => { window.location.href = '/'; }}
        onNavigateContact={() => { window.location.href = '/signup'; }}
      />

      <style jsx global>{`
        @keyframes studentOrbit { to { transform: rotate(360deg); } }
        .student-page-scroller { background-image: radial-gradient(ellipse at 76% 12%, rgba(221,192,132,.18), transparent 32%), linear-gradient(150deg, #FBF7EE 0%, #F7F1E5 54%, #F5EDDE 100%); }
        .student-hero-ring { animation: studentOrbit 32s linear infinite; }
        .student-hero-ring-reverse { animation: studentOrbit 42s linear infinite reverse; }
        [data-student-reveal] { opacity: 0; filter: blur(7px); transform: translateY(30px) scale(.98); transition: opacity 650ms ease, transform 720ms cubic-bezier(.16,1,.3,1), filter 700ms ease; }
        [data-student-reveal].is-visible { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
        .student-topic-card[data-student-reveal] { transform-style: preserve-3d; }
        .student-topic-card-01[data-student-reveal] { transform: perspective(900px) translate3d(-42px, 24px, 0) rotateY(7deg) scale(.97); }
        .student-topic-card-02[data-student-reveal] { transform: perspective(900px) translate3d(0, 42px, 0) scale(.94); }
        .student-topic-card-03[data-student-reveal] { transform: perspective(900px) translate3d(42px, 24px, 0) rotateY(-7deg) scale(.97); }
        .student-topic-card-01[data-student-reveal].is-visible,
        .student-topic-card-02[data-student-reveal].is-visible,
        .student-topic-card-03[data-student-reveal].is-visible { transform: perspective(900px) translate3d(0,0,0) rotateY(0) scale(1); }
        .student-topic-card-01 .student-card-icon { animation: studentIconPulse 3.8s ease-in-out infinite; }
        .student-topic-card-02 .student-card-icon { animation: studentIconFloat 3.2s ease-in-out infinite; }
        .student-topic-card-03 .student-card-icon { animation: studentIconTilt 4.4s ease-in-out infinite; }
        .student-topic-card::after { content: ''; position: absolute; top: -45%; bottom: -45%; left: -55%; width: 34%; transform: skewX(-18deg); background: linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent); opacity: 0; pointer-events: none; }
        .student-topic-card.is-visible::after { animation: studentCardGleam 1.15s cubic-bezier(.16,1,.3,1) .2s both; }
        .student-topic-card.is-visible:hover { transform: translateY(-7px) scale(1.01); border-color: rgba(146,118,68,.38); box-shadow: 0 28px 70px rgba(64,48,23,.14); }
        @keyframes studentCardGleam { 0% { transform: translateX(0) skewX(-18deg); opacity: 0; } 24% { opacity: .65; } 100% { transform: translateX(520%) skewX(-18deg); opacity: 0; } }
        @keyframes studentIconPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes studentIconFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes studentIconTilt { 0%,100% { transform: rotate(0); } 50% { transform: rotate(4deg); } }
        @media (prefers-reduced-motion: reduce) {
          .student-hero-ring, .student-hero-ring-reverse { animation: none; }
          .student-topic-card.is-visible::after { animation: none; }
          .student-card-icon { animation: none !important; }
          [data-student-reveal] { opacity: 1; filter: none; transform: none; transition: none; }
        }
      `}</style>
    </div>
  );
}
