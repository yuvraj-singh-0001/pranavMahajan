'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  User,
  School,
  Building,
  Landmark,
  Users,
  ArrowRight,
  Check,
  RotateCcw,
} from 'lucide-react';

export type PersonaType =
  | 'student'
  | 'individual'
  | 'school'
  | 'corporate'
  | 'government'
  | 'ngo'
  | 'parent';

interface IdentifyProps {
  isActive?: boolean;
  onSelectPersona?: (persona: PersonaType) => void;
  onGoToPersonaPage: (persona: PersonaType) => void;
  onBackToHero?: () => void;
}

interface PersonaOption {
  id: PersonaType;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PERSONAS: PersonaOption[] = [
  {
    id: 'student',
    title: 'Student',
    icon: GraduationCap,
  },
  {
    id: 'individual',
    title: 'Individual',
    icon: User,
  },
  {
    id: 'school',
    title: 'Educational Institution',
    icon: School,
  },
  {
    id: 'corporate',
    title: 'Corporate / Business',
    icon: Building,
  },
  {
    id: 'government',
    title: 'Government Department',
    icon: Landmark,
  },
  {
    id: 'ngo',
    title: 'NGO / Social Sector',
    icon: Users,
  },
];

export default function Identify({
  isActive = true,
  onSelectPersona,
  onGoToPersonaPage,
  onBackToHero,
}: IdentifyProps) {
  const [selected, setSelected] = useState<PersonaType>('student');
  const [contentVisible, setContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play video seamlessly as fullscreen background overlay & freeze on final frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      setContentVisible(false);
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts autoplay, show content immediately
          setContentVisible(true);
        });
      }

      // Cards smoothly draw in as scroll unrolls (timed at 1.4s)
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      revealTimerRef.current = setTimeout(() => {
        setContentVisible(true);
      }, 1400);
    } else {
      video.pause();
      setContentVisible(false);
    }

    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, [isActive]);

  const handleVideoEnded = () => {
    setContentVisible(true);
    const video = videoRef.current;
    if (video) {
      // Freeze on final unrolled scroll frame without disappearing or looping
      video.pause();
    }
  };

  const handleSelect = (id: PersonaType) => {
    setSelected(id);
    if (onSelectPersona) {
      onSelectPersona(id);
    }
  };

  const replayScroll = () => {
    const video = videoRef.current;
    if (!video) return;
    setContentVisible(false);
    video.currentTime = 0;
    video.play().catch(() => {});
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => {
      setContentVisible(true);
    }, 1400);
  };

  const currentOption = PERSONAS.find((p) => p.id === selected) || PERSONAS[0];

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#090807] text-slate-100 flex flex-col justify-between items-center pt-24 sm:pt-28 pb-8 px-4 sm:px-8 select-text selection:bg-[#dfa547] selection:text-black">
      {/* 1. FULL-SCREEN BACKGROUND VIDEO OVERLAY (No boxes, no frames, 100% immersive) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="/ssecond-screen.mp4"
          playsInline
          muted
          preload="auto"
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center brightness-105 contrast-110"
        />

        {/* Ambient Dark Vignette overlay so video blends seamlessly into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-transparent to-[#090807]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(9,8,7,0.75)_95%)] pointer-events-none" />

        {/* Left & Right Golden Ambient Rays (matching reference image) */}
        <div className="absolute top-0 left-0 w-[450px] h-[550px] bg-[radial-gradient(ellipse_at_top_left,rgba(223,165,71,0.22)_0%,transparent_65%)] blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[450px] h-[550px] bg-[radial-gradient(ellipse_at_top_right,rgba(223,165,71,0.22)_0%,transparent_65%)] blur-2xl pointer-events-none" />
      </div>

      {/* 2. TOP HEADING (Safely below fixed navbar, completely visible without any clipping) */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-1 sm:space-y-1.5 flex-shrink-0 animate-in fade-in duration-500">
        {/* Sub-line: How Do You Want to */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#dfa547]/60 to-transparent" />
          <span className="font-serif italic text-amber-200/90 text-lg sm:text-2xl md:text-3xl tracking-wide font-normal drop-shadow-[0_2px_12px_rgba(223,165,71,0.45)]">
            How Do You Want to
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#dfa547]/60 to-transparent" />
        </div>

        {/* Grand Headline: Experience? */}
        <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#fff3cf] via-[#dfa547] to-[#ffe29a] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(223,165,71,0.6)] leading-none py-1">
          Experience?
        </h1>

        {/* Antique Flourish Divider */}
        <div className="flex items-center justify-center gap-2 text-amber-400/80">
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#dfa547]/70" />
          <span className="text-xs tracking-widest text-[#dfa547] font-serif">❖</span>
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#dfa547]/70" />
        </div>
      </div>

      {/* 3. THE 6 PARCHMENT CARDS (Directly overlapping the unrolled scroll in the center) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex items-center justify-center my-auto py-2 sm:py-4">
        <div
          className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4.5 transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {PERSONAS.map((persona, index) => {
            const IconComponent = persona.icon;
            const isSelected = selected === persona.id;

            return (
              <button
                key={persona.id}
                onClick={() => handleSelect(persona.id)}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                className={`group relative text-left rounded-xl p-3 sm:p-3.5 md:p-4 cursor-pointer transition-all duration-300 transform ${
                  isSelected
                    ? 'scale-[1.03] shadow-[0_0_25px_rgba(223,165,71,0.7)] ring-2 ring-[#dfa547]'
                    : 'hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(60,30,10,0.45)]'
                }`}
              >
                {/* Antique Parchment Plaque Background (Engraved look matching image) */}
                <div
                  className="absolute inset-0 rounded-xl transition-all"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(180deg, #fcebc7 0%, #f6dfab 50%, #eecf93 100%)'
                      : 'linear-gradient(180deg, rgba(247, 233, 199, 0.94) 0%, rgba(239, 219, 175, 0.94) 50%, rgba(228, 203, 153, 0.94) 100%)',
                    boxShadow:
                      'inset 0 1px 3px rgba(255, 255, 255, 0.8), inset 0 -1px 3px rgba(110, 60, 20, 0.25), 0 4px 14px rgba(40, 20, 5, 0.35)',
                  }}
                />

                {/* Double-line Antique Engraved Border with Corner Notches */}
                <div className="absolute inset-1 rounded-lg border border-[#7a4817]/70 pointer-events-none group-hover:border-[#96581c]" />
                <div className="absolute inset-1.5 rounded-md border border-[#8f561f]/40 pointer-events-none" />

                {/* Corner Antique Notches */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[#542d0a] pointer-events-none" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[#542d0a] pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[#542d0a] pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[#542d0a] pointer-events-none" />

                {/* Card Content (Dark Sepia Typography matching reference image) */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-1 py-0.5">
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#8c5208] border border-amber-300 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Engraved Dark Sepia Icon */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#2b1405] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>

                  {/* Persona Title in Classical Serif */}
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#231104] tracking-tight leading-snug">
                    {persona.title}
                  </h3>

                  {/* Antique Decorative Divider Line (— ❖ —) */}
                  <div className="flex items-center justify-center gap-1.5 w-full max-w-[100px] text-[#784415]/65 pt-0.5">
                    <span className="h-[1px] flex-1 bg-[#784415]/50" />
                    <span className="text-[8px] leading-none">❖</span>
                    <span className="h-[1px] flex-1 bg-[#784415]/50" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM ACTION & NAVIGATION BAR */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 flex-shrink-0 transition-all duration-500 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {/* Back button & Replay icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onBackToHero && (
            <button
              onClick={onBackToHero}
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              &larr; Back to Welcome
            </button>
          )}

          <button
            onClick={replayScroll}
            title="Replay unrolling animation"
            className="p-1.5 sm:p-2 rounded-full border border-amber-500/30 text-amber-300/80 hover:text-white hover:border-amber-400 bg-[#16110c]/80 transition-all cursor-pointer hover:rotate-180 duration-500"
            aria-label="Replay Scroll"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Proceed Button */}
        <div>
          <button
            onClick={() => onGoToPersonaPage(selected)}
            className="ochre-pill-button py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-bold shadow-xl hover:shadow-[0_0_25px_rgba(223,165,71,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <span>Continue as {currentOption.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
