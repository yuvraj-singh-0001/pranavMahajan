'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { PersonaType } from './Identify';

interface PersonaSalesComingSoonProps {
  persona?: PersonaType;
  onBack?: () => void;
  onOpenContact?: () => void;
}

const PERSONA_TITLES: Record<PersonaType, string> = {
  student: 'Student Page',
  individual: 'Individual Page',
  school: 'Educational Institution Page',
  corporate: 'Corporate / Business Page',
  government: 'Government Department Page',
  ngo: 'NGO / Social Sector Page',
  parent: 'Conscious Parenting Page',
};

export default function PersonaSalesComingSoon({
  persona = 'student',
  onBack,
}: PersonaSalesComingSoonProps) {
  const pageHeading = PERSONA_TITLES[persona] || 'Individual Page';

  return (
    <div className="w-full h-full min-h-screen bg-[#0c0a08] text-slate-100 flex flex-col items-center justify-center relative select-text px-4 sm:px-8 py-16 overflow-hidden">
      {/* 1. WARM GOLDEN STAGE & CELESTIAL BACKLIGHT AURAS (Matching Slide 0 & 1 Lighting) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[480px] sm:h-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,165,71,0.26)_0%,rgba(197,133,37,0.15)_40%,rgba(184,115,27,0.04)_70%,transparent_85%)] blur-[70px] sm:blur-[105px] pointer-events-none z-0" />
      <div className="absolute top-1/6 left-1/4 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-[#dfa547]/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/6 right-1/4 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full bg-[#b8731b]/9 blur-[130px] pointer-events-none z-0" />

      {/* Subtle warm golden ambient vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(9,8,7,0.7)_85%,#090807_100%)] pointer-events-none z-0" />

      {/* 2. ROYAL ANTIQUE PLAQUE CONTAINER (Matching the Scroll Cards & Royal Theme) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-[#1b1510]/90 via-[#14100c]/95 to-[#0d0a07]/98 border border-[#dfa547]/40 shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(223,165,71,0.22)] p-8 sm:p-14 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-7 backdrop-blur-md">
        {/* Antique Corner Engraved Notches */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-500/60 pointer-events-none" />

        {/* Back Button */}
        <div>
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 hover:text-white px-4 py-1.5 rounded-full border border-amber-500/40 bg-[#1e1711]/90 hover:bg-[#2c2117] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#dfa547]" />
              <span>← Back to Choose Role</span>
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 hover:text-white px-4 py-1.5 rounded-full border border-amber-500/40 bg-[#1e1711]/90 hover:bg-[#2c2117] transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-[#dfa547]" />
              <span>← Back to Home</span>
            </Link>
          )}
        </div>

        {/* 1. Grand Heading with Satin Metallic Gold Gradient (Matching Hero) */}
        <h1
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.12] select-text"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 28px rgba(223, 165, 71, 0.35))',
          }}
        >
          {pageHeading}
        </h1>

        {/* Antique Flourish Divider (— ❖ —) */}
        <div className="flex items-center justify-center gap-3 text-amber-300/80 w-full max-w-xs mx-auto">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#dfa547]/70 to-transparent" />
          <span className="text-xs font-serif leading-none text-amber-300">❖</span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#dfa547]/70 to-transparent" />
        </div>

        {/* 2. Coming Soon Glowing Royal Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/60 text-amber-200 shadow-[0_0_30px_rgba(223,165,71,0.35)]">
          <Clock className="w-5 h-5 text-[#dfa547] animate-pulse" />
          <span className="font-serif-luxury text-xl sm:text-3xl font-bold tracking-wide text-amber-100">
            Coming Soon...
          </span>
          <Sparkles className="w-4 h-4 text-amber-300/80" />
        </div>
      </div>
    </div>
  );
}
