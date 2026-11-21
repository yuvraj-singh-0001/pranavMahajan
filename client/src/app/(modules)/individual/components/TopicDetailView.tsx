'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Compass, Sparkles, BookOpen, X } from 'lucide-react';
import { getTopicById, TOPICS } from '@/data/topicsData';
import Footer from '@/components/Footer';
import RoleCursor from '@/components/RoleCursor';
import LoveRelationshipsView from './LoveRelationshipsView';
import HealthWellbeingView from './HealthWellbeingView';
import PersonalDevelopmentView from './PersonalDevelopmentView';
import ParentingChildView from './ParentingChildView';
import SocialRelationshipsView from './SocialRelationshipsView';
import StudentLifeView from './StudentLifeView';

const navigation = [
  { href: '/individual#top', label: 'Explore Life & Growth' },
  { href: '/individual#pathways', label: 'Personal growth pathways' },
  { href: '/individual#problem', label: 'Common challenges' },
  { href: '/individual#next-step', label: 'Take the next step' },
];

export default function TopicDetailView({ slug }: { slug: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement>(null);

  const topic = getTopicById(slug);

  // Trigger entrance animations & scroll to top when topic/slug loads or changes
  useEffect(() => {
    setMounted(false);
    if (scrollRootRef.current) {
      scrollRootRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    const timer = setTimeout(() => {
      setMounted(true);
    }, 40);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!topic) return null;

  if (topic.id === 'love-relationships') {
    return <LoveRelationshipsView />;
  }

  if (topic.id === 'health-wellbeing') {
    return <HealthWellbeingView />;
  }

  if (topic.id === 'personal-development') {
    return <PersonalDevelopmentView />;
  }

  if (topic.id === 'parenting-child') {
    return <ParentingChildView />;
  }

  if (topic.id === 'social-relationships') {
    return <SocialRelationshipsView />;
  }

  if (topic.id === 'student-life') {
    return <StudentLifeView />;
  }

  const currentIndex = TOPICS.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? TOPICS[currentIndex - 1] : TOPICS[TOPICS.length - 1];
  const nextTopic = currentIndex < TOPICS.length - 1 ? TOPICS[currentIndex + 1] : TOPICS[0];

  return (
    <div
      ref={scrollRootRef}
      className="h-dvh overflow-y-auto overflow-x-clip scroll-smooth bg-[#FBF7EE] text-[#203029] antialiased selection:bg-amber-200"
      style={{
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <RoleCursor role="individual" isActive />

      {/* Top Ambient Loading / Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[70] h-1 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          width: mounted ? '100%' : '0%',
          opacity: mounted ? 0 : 1,
          background: `linear-gradient(90deg, #dfa547 0%, ${topic.accent} 50%, #c58525 100%)`,
          boxShadow: `0 0 12px ${topic.accent}`,
        }}
      />

      {/* Standard Official Header (Identical to all landing pages - No color change on scroll, No extra buttons) */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-amber-500/15 bg-black/40 px-4 py-2.5 backdrop-blur-md sm:border-b-0 sm:bg-transparent sm:px-10 lg:px-14 2xl:px-20 sm:py-5 sm:backdrop-blur-none">
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
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-amber-500/50 bg-[#1e1710]/90 px-3.5 py-1.5 text-xs font-bold tracking-wide text-amber-200 shadow-[0_4px_16px_rgba(223,165,71,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-[#2e2318] hover:text-white sm:px-5 sm:py-2"
          >
            Sign Up
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-xl border border-amber-500/30 bg-[#16120e]/90 text-white shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-[#221b14] hover:border-amber-400 active:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-amber-300" />
            ) : (
              <>
                <span className="h-0.5 w-4 rounded-full bg-slate-200" />
                <span className="ml-3.5 h-0.5 w-3 self-start rounded-full bg-[#dfa547]" />
                <span className="h-0.5 w-4 rounded-full bg-slate-200" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Backdrop for Navigation Drawer */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-[#11100d]/35 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
      />

      {/* Slide-out Navigation Drawer */}
      <aside
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(22rem,88vw)] flex-col border-l border-[#8E7650]/20 bg-[#F6F0E5] px-6 pb-8 pt-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between border-b border-[#8E7650]/15 pb-5">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A6328]">
              NAVIGATION
            </p>
            <p className="mt-1 text-lg font-semibold text-[#203029]">Personal growth</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8E7650]/20 bg-[#FFFCF7] text-[#485C4B] transition hover:bg-[#EEE5D5]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Main navigation" className="mt-6 flex flex-col gap-2">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-base font-semibold text-[#3F4B40] transition hover:border-[#8E7650]/15 hover:bg-[#FFFCF7]"
            >
              <span>
                <span className="mr-3 font-mono text-xs text-[#9A6F32]">0{index + 1}</span>
                {item.label}
              </span>
              <ArrowRight className="h-4 w-4 text-[#8A6328] transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-[#ECE3D3] p-5">
          <p className="text-sm leading-6 text-[#586056]">
            Ready to explore a more intentional next chapter?
          </p>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#253D2D] px-5 text-sm font-semibold text-white transition hover:bg-[#35543D]"
          >
            Sign up <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* Hero Section with Staggered Entrance Animation */}
      <section className="relative overflow-hidden px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:px-8 sm:pb-16 lg:px-14 lg:pb-20">
        {/* Background Ambient Glow with Smooth Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[680px] rounded-full blur-3xl transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, ${topic.accent} 0%, transparent 70%)`,
            opacity: mounted ? 0.38 : 0,
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge Icon (Scale & Fade Entrance) */}
          <div
            className={`mx-auto mb-4 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
              }`}
          >
            <div
              className={`flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${topic.badgeBg}`}
              style={{ boxShadow: `0 12px 30px ${topic.glowColor}` }}
            >
              {topic.iconRenderer('h-8 w-8 sm:h-9 sm:w-9 text-white')}
            </div>
          </div>

          {/* Subtitle tag */}
          <p
            className={`font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8A6328] transition-all duration-700 delay-75 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
          >
            Dimension of Life & Growth
          </p>

          {/* Main Title */}
          <h1
            className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#162a1c] transition-all duration-700 delay-100 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            {topic.title}
          </h1>

          {/* Tagline */}
          <p
            className={`mt-4 text-base sm:text-lg lg:text-xl font-medium text-[#485C4B] max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-150 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            {topic.tagline}
          </p>

          {/* Summary Paragraph */}
          <p
            className={`mt-4 text-sm sm:text-base text-[#5c685d] max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            {topic.summary}
          </p>

          {/* Quote Card */}
          <div
            className={`mt-8 mx-auto max-w-2xl rounded-2xl border border-amber-800/15 bg-white/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm transition-all duration-700 delay-250 ease-out hover:shadow-md hover:border-amber-500/30 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <p className="italic text-sm sm:text-base text-[#2e4033] font-serif leading-relaxed">
              &ldquo;{topic.quote}&rdquo;
            </p>
            <p className="mt-2 text-xs font-bold tracking-wide uppercase font-mono text-[#8A6328]">
              — Pranav Mahajan
            </p>
          </div>

          {/* Quick Action & Next Pathways Hub */}
          <div
            className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left transition-all duration-700 delay-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
          >
            <Link
              href="/signup"
              className="group flex flex-col justify-between rounded-2xl border border-amber-900/15 bg-white/90 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/40"
            >
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A6328]">Mentorship</p>
                <h3 className="mt-1 text-sm font-bold text-[#1f3325] group-hover:text-amber-900">Start 1-on-1 Mentorship</h3>
                <p className="mt-1 text-xs text-[#5d685c]">Personalized guidance in this dimension</p>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#8A6328]">
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/individual#pathways"
              className="group flex flex-col justify-between rounded-2xl border border-amber-900/15 bg-white/90 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/40"
            >
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A6328]">Framework</p>
                <h3 className="mt-1 text-sm font-bold text-[#1f3325] group-hover:text-amber-900">3 Growth Pathways</h3>
                <p className="mt-1 text-xs text-[#5d685c]">Explore practical practice cycles</p>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#8A6328]">
                <span>Explore Pathways</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/individual#top"
              className="group flex flex-col justify-between rounded-2xl border border-amber-900/15 bg-white/90 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-500/40"
            >
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A6328]">Life & Growth</p>
                <h3 className="mt-1 text-sm font-bold text-[#1f3325] group-hover:text-amber-900">All 10 Dimensions</h3>
                <p className="mt-1 text-xs text-[#5d685c]">Return to the interactive infinity map</p>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#8A6328]">
                <span>View All Dimensions</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Focus Pillars Section */}
      <section
        className={`relative px-4 py-12 sm:px-8 sm:py-16 lg:px-14 max-w-6xl mx-auto transition-all duration-700 delay-350 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8A6328]">
            Core Focus Areas
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1a2e20]">
            The 4 Pillars of Mastery in this Dimension
          </h2>
          <p className="mt-2 text-sm text-[#556456]">
            Targeted principles and practical frameworks Pranav Mahajan guides you through.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {topic.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="group relative rounded-3xl border border-amber-900/10 bg-white/95 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-mono font-extrabold text-white shadow-xs transition-transform duration-300 group-hover:scale-110"
                  style={{ background: topic.accent }}
                >
                  0{idx + 1}
                </span>
                <Sparkles className="h-4 w-4 text-amber-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e20] group-hover:text-amber-950 transition-colors">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#58645a]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection Prompts & Expected Outcomes Section */}
      <section
        className={`px-4 py-12 sm:px-8 sm:py-16 lg:px-14 max-w-6xl mx-auto transition-all duration-700 delay-400 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Reflection Prompts */}
          <div className="rounded-3xl border border-amber-900/10 bg-[#f4ebdc]/70 p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-5 w-5 text-[#8A6328]" />
              <h3 className="text-lg font-extrabold text-[#1a2e20]">
                Key Reflection Prompts
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5d685c] mb-6">
              Take a quiet moment to reflect on these questions before starting mentorship:
            </p>
            <ul className="space-y-4">
              {topic.reflectionQuestions.map((q) => (
                <li key={q} className="flex gap-3 text-sm text-[#273d2d] leading-relaxed">
                  <span className="shrink-0 text-amber-600 font-bold">&bull;</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expected Outcomes */}
          <div className="rounded-3xl border border-amber-900/10 bg-white/95 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-emerald-700" />
              <h3 className="text-lg font-extrabold text-[#1a2e20]">
                Measurable Growth Outcomes
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5d685c] mb-6">
              What shifts when you cultivate consistency and clarity in this sphere:
            </p>
            <ul className="space-y-3.5">
              {topic.keyOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm text-[#273d2d] leading-relaxed">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className={`px-4 py-12 sm:px-8 sm:py-16 lg:px-14 max-w-4xl mx-auto text-center transition-all duration-700 delay-450 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        <div
          className="rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
          style={{
            background: `linear-gradient(135deg, #162a1c 0%, #1e3a27 50%, #102619 100%)`,
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full blur-2xl opacity-30"
            style={{ background: topic.accent }}
          />

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Ready to explore your growth in {topic.title}?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Take the first step toward clarity, steady resilience, and purposeful habits through 1-on-1 personalized mentorship.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/signup"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#dfa547] px-8 text-sm font-bold text-[#162a1c] shadow-lg transition-all duration-300 hover:bg-[#e8b55d] hover:scale-105 active:scale-95"
            >
              <span>Begin Mentorship in this Topic</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/individual#top"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10"
            >
              Explore All 10 Dimensions
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next Topic Navigation Bar */}
      <section className="px-4 py-8 sm:px-8 lg:px-14 max-w-6xl mx-auto border-t border-amber-900/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/individual/${prevTopic.id}`}
            className="group flex items-center gap-3 rounded-2xl border border-amber-900/10 bg-white/70 px-5 py-3 text-left transition-all duration-300 hover:border-amber-900/25 hover:bg-white hover:-translate-x-1 hover:shadow-xs w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 text-[#8A6328] transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="text-[10px] font-mono uppercase text-[#8A6328] font-bold">Previous Topic</p>
              <p className="text-xs sm:text-sm font-bold text-[#1f3325]">{prevTopic.title}</p>
            </div>
          </Link>

          <Link
            href="/individual#top"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#8A6328] hover:underline"
          >
            All 10 Topics
          </Link>

          <Link
            href={`/individual/${nextTopic.id}`}
            className="group flex items-center justify-between sm:justify-start gap-3 rounded-2xl border border-amber-900/10 bg-white/70 px-5 py-3 text-right transition-all duration-300 hover:border-amber-900/25 hover:bg-white hover:translate-x-1 hover:shadow-xs w-full sm:w-auto"
          >
            <div>
              <p className="text-[10px] font-mono uppercase text-[#8A6328] font-bold">Next Topic</p>
              <p className="text-xs sm:text-sm font-bold text-[#1f3325]">{nextTopic.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#8A6328] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
