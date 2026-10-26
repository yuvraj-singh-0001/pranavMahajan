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
  Sparkles,
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
  const [headingWriting, setHeadingWriting] = useState(false);
  // Track sequential one-by-one card emergence (0 to 6 cards formed like magic)
  const [revealedCardCount, setRevealedCardCount] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasTriggeredSequenceRef = useRef(false);

  const clearAllTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const resetAllAnimations = () => {
    clearAllTimers();
    hasTriggeredSequenceRef.current = false;
    setHeadingWriting(false);
    setRevealedCardCount(0);
    setButtonsVisible(false);
  };

  // Magic Sequence: Runs as video reaches 40% progress
  const triggerMagicFormationSequence = () => {
    if (hasTriggeredSequenceRef.current) return;
    hasTriggeredSequenceRef.current = true;

    // 1. Heading begins writing in immediately at 40%
    setHeadingWriting(true);

    // 2. Cards materialize ONE-BY-ONE in a clean, smooth cascade
    const initialDelay = 400; // Brief lead time for heading write-in
    const cardInterval = 320; // Smooth sequential cadence

    PERSONAS.forEach((_, index) => {
      const cardTimer = setTimeout(() => {
        setRevealedCardCount(index + 1);
      }, initialDelay + index * cardInterval);
      timeoutsRef.current.push(cardTimer);
    });

    // 3. Bottom button glides in smoothly after the last card
    const btnTimer = setTimeout(() => {
      setButtonsVisible(true);
    }, initialDelay + PERSONAS.length * cardInterval + 350);
    timeoutsRef.current.push(btnTimer);
  };

  // Synchronize playback with isActive
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      resetAllAnimations();
      video.currentTime = 0;
      // Fast video playback as requested
      video.playbackRate = 1.65;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts autoplay, trigger sequence smoothly
          triggerMagicFormationSequence();
        });
      }

      // Safety fallback timer
      const fallbackTimer = setTimeout(() => {
        triggerMagicFormationSequence();
      }, 5000);
      timeoutsRef.current.push(fallbackTimer);
    } else {
      video.pause();
      resetAllAnimations();
    }

    return () => {
      clearAllTimers();
    };
  }, [isActive]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Start writing text as soon as video reaches 40% progress
    const progress = video.currentTime / video.duration;
    if (progress >= 0.40 && !hasTriggeredSequenceRef.current) {
      triggerMagicFormationSequence();
    }
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      // Freeze on final unrolled frame without disappearing or looping
      video.pause();
    }
    // If not already triggered, trigger sequence now smoothly
    if (!hasTriggeredSequenceRef.current) {
      triggerMagicFormationSequence();
    }
  };

  const handleSelect = (id: PersonaType) => {
    setSelected(id);
    if (onSelectPersona) {
      onSelectPersona(id);
    }
  };

  const currentOption = PERSONAS.find((p) => p.id === selected) || PERSONAS[0];

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#090807] text-slate-100 flex flex-col justify-center items-center pt-12 sm:pt-16 pb-6 px-4 sm:px-8 select-text selection:bg-[#dfa547] selection:text-black">
      {/* 1. FULL-WIDTH BACKGROUND VIDEO (Full width across all screen sizes like a native video) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center w-full h-full">
        <video
          ref={videoRef}
          src="/ssecond-screen.mp4"
          playsInline
          muted
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center brightness-105"
          style={{ width: '100%', minWidth: '100%' }}
        />
      </div>

      {/* 2. TOP HEADING (Original majestic size) */}
      <div
        style={{
          clipPath: headingWriting ? 'inset(0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
          transition: 'clip-path 2.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.2s ease-out, transform 2.2s ease-out',
        }}
        className={`relative z-10 text-center max-w-3xl mx-auto space-y-0.5 sm:space-y-1 flex-shrink-0 mb-2 sm:mb-3 ${
          headingWriting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'
        }`}
      >
        {/* Sub-line: How Do You Want to (Original size) */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <span className="font-serif italic text-white text-xl sm:text-2xl md:text-3xl tracking-wide font-light">
            How Do You Want to
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </div>

        {/* Grand Headline: Experience? (Original size) */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight py-0.5">
          Experience?
        </h1>

        {/* Antique Flourish Divider */}
        <div className="flex items-center justify-center gap-2.5 text-white/90">
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <span className="text-sm tracking-widest text-amber-300 font-serif">❖</span>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-white/80 to-transparent" />
        </div>
      </div>

      {/* 3. THE 6 CARDS: (Spacious gap between cards) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto py-1 sm:py-2">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {PERSONAS.map((persona, index) => {
            const IconComponent = persona.icon;
            const isSelected = selected === persona.id;
            const isFormed = index < revealedCardCount;
            const isJustForming = index === revealedCardCount - 1;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelect(persona.id)}
                style={{
                  transitionDuration: '750ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`group relative text-left rounded-xl p-3 sm:p-3.5 md:p-4 cursor-pointer transition-all transform ${
                  isFormed
                    ? isSelected
                      ? 'opacity-100 scale-[1.03] translate-y-0 shadow-[0_0_25px_rgba(223,165,71,0.7)] ring-2 ring-[#dfa547]'
                      : 'opacity-100 scale-100 translate-y-0 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(60,30,10,0.45)]'
                    : 'opacity-0 scale-95 translate-y-6 blur-[1px] pointer-events-none'
                }`}
              >
                {/* Golden Magic Birth Shimmer Flare when card materializes */}
                {isJustForming && (
                  <div className="absolute -inset-1 rounded-2xl bg-amber-400/20 blur-md pointer-events-none animate-pulse" />
                )}

                {/* Antique Parchment Plaque Background */}
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
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#8c5208] border border-amber-300 text-white flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
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

      {/* 4. BOTTOM ACTION BUTTON (Shifted to right side directly under cards, lifted slightly higher) */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto flex items-center justify-end mt-3 sm:mt-4 transition-all duration-700 ease-out ${
          buttonsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={() => onGoToPersonaPage(selected)}
          className="ochre-pill-button py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-bold shadow-xl hover:shadow-[0_0_25px_rgba(223,165,71,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <span>Continue as {currentOption.title}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
