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
  ArrowLeft,
  Check,
  Sparkles,
  Clock,
} from 'lucide-react';
import QuillCursor from './QuillCursor';

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
  onGoToPersonaPage?: (persona: PersonaType) => void;
  onBackToHero?: () => void;
  onViewModeChange?: (mode: 'cards' | 'coming-soon') => void;
  backRef?: React.MutableRefObject<(() => void) | null>;
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
  onViewModeChange,
  backRef,
}: IdentifyProps) {
  const [selected, setSelected] = useState<PersonaType>('student');
  const [viewMode, setViewMode] = useState<'cards' | 'coming-soon'>('cards');
  const [flipState, setFlipState] = useState<'idle' | 'flipping-forward' | 'flipping-backward'>('idle');
  const [headingWriting, setHeadingWriting] = useState(false);
  // Track sequential one-by-one card emergence (0 to 6 cards formed like magic)
  const [revealedCardCount, setRevealedCardCount] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasTriggeredSequenceRef = useRef(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  // Pre-generate noise buffer once to eliminate CPU hitches on the main thread during animations
  const getAudioResources = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      if (!noiseBufferRef.current) {
        const bufferSize = Math.floor(ctx.sampleRate * 0.55);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        noiseBufferRef.current = buffer;
      }
      return { ctx, buffer: noiseBufferRef.current };
    } catch {
      return null;
    }
  };

  // Synthesize realistic soft paper turn sound instantly from pre-allocated buffer
  const playPaperTurnSound = () => {
    try {
      const res = getAudioResources();
      if (!res) return;
      const { ctx, buffer } = res;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(650, ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.25);
      bandpass.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.55);
      bandpass.Q.value = 1.1;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.065, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.54);
      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 0.55);
    } catch {
      // Audio is an enhancement
    }
  };

  const handleContinue = () => {
    if (flipState !== 'idle') return;
    setFlipState('flipping-forward');
    playPaperTurnSound();
    setTimeout(() => {
      setViewMode('coming-soon');
      setFlipState('idle');
    }, 880);
  };

  const handleBackToCards = () => {
    if (flipState !== 'idle') return;
    setFlipState('flipping-backward');
    playPaperTurnSound();
    setTimeout(() => {
      setViewMode('cards');
      setFlipState('idle');
    }, 880);
  };

  // Sync backRef to allow parent container (PageSlider) to trigger return to cards
  useEffect(() => {
    if (backRef) {
      backRef.current = handleBackToCards;
    }
    return () => {
      if (backRef) {
        backRef.current = null;
      }
    };
  }, [backRef, handleBackToCards]);

  // Sync viewMode changes to parent
  useEffect(() => {
    if (onViewModeChange) {
      onViewModeChange(viewMode);
    }
  }, [viewMode, onViewModeChange]);

  // When on Coming Soon page, scrolling UP (mouse wheel or trackpad) returns to Choose Role (6 Cards)
  useEffect(() => {
    if (!isActive || viewMode !== 'coming-soon' || flipState !== 'idle') return;

    let accumulatedDelta = 0;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        accumulatedDelta += e.deltaY;
        if (accumulatedDelta <= -50) {
          accumulatedDelta = 0;
          e.preventDefault();
          e.stopPropagation();
          handleBackToCards();
        }
      } else {
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, [isActive, viewMode, flipState]);

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
    <div
      className={`relative w-full h-full min-h-screen overflow-hidden bg-[#090807] text-slate-100 flex flex-col justify-center items-center pt-12 sm:pt-16 pb-6 px-4 sm:px-8 select-text selection:bg-[#dfa547] selection:text-black ${
        isActive ? 'quill-active-slide' : ''
      }`}
    >
      {/* Antique Golden Quill Pen Custom Cursor (Active only on Slide 1) */}
      <QuillCursor isActive={!!isActive} />

      {/* 1. FULL-WIDTH BACKGROUND VIDEO (Immediately fades out on flip so it never lingers) */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center w-full h-full transition-opacity duration-300 ease-out ${
          viewMode === 'coming-soon' || flipState === 'flipping-forward'
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
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

      {/* Home-Page Style Ambient Golden Atmosphere (Active when on Coming Soon view) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out z-0 ${
          viewMode === 'coming-soon' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-[#dfa547]/10 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] rounded-full bg-[#b8731b]/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(223,165,71,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#dfa547_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* 2. AUTHENTIC BOOK PAGE TURN CONTAINER */}
      <div
        className={`relative z-10 w-full flex items-center justify-center ${
          viewMode === 'coming-soon' && flipState === 'idle' ? 'max-w-4xl' : 'book-turn-stage'
        }`}
      >
        {/* PAGE 1: 6 CARDS & HEADING (The 3D Turning Leaf) */}
        {(viewMode === 'cards' || flipState !== 'idle') && (
          <div
            className={`w-full flex flex-col items-center justify-center relative z-20 ${
              flipState === 'flipping-forward'
                ? 'animate-leaf-turn-forward'
                : flipState === 'flipping-backward'
                ? 'animate-leaf-turn-backward'
                : ''
            }`}
          >
            {/* Curled Paper Specular Sheen during flip */}
            {flipState !== 'idle' && <div className="book-leaf-curl-shine" />}
            {/* Top Heading */}
            <div
              style={{
                clipPath: headingWriting ? 'inset(0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
                transition: 'clip-path 2.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.2s ease-out, transform 2.2s ease-out',
              }}
              className={`relative z-10 text-center max-w-3xl mx-auto flex-shrink-0 mb-2 sm:mb-3 ${
                headingWriting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <span className="font-serif italic text-white text-xl sm:text-2xl md:text-3xl tracking-wide font-light">
                  How Do You Want to
                </span>
                <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white py-0.5 sm:py-1">
                Experience?
              </h1>

              <div className="flex items-center justify-center gap-2.5 text-white/90 mt-1 sm:mt-1.5">
                <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <span className="text-sm tracking-widest text-amber-300 font-serif">❖</span>
                <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-white/80 to-transparent" />
              </div>
            </div>

            {/* 6 Cards */}
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
                      {isJustForming && (
                        <div className="absolute -inset-1 rounded-2xl bg-amber-400/20 blur-md pointer-events-none animate-pulse" />
                      )}

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

                      <div className="absolute inset-1 rounded-lg border border-[#7a4817]/70 pointer-events-none group-hover:border-[#96581c]" />
                      <div className="absolute inset-1.5 rounded-md border border-[#8f561f]/40 pointer-events-none" />

                      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[#542d0a] pointer-events-none" />
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[#542d0a] pointer-events-none" />
                      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[#542d0a] pointer-events-none" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[#542d0a] pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-1 py-0.5">
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#8c5208] border border-amber-300 text-white flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#2b1405] group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                        </div>

                        <h3 className="font-serif font-bold text-sm sm:text-base text-[#231104] tracking-tight leading-snug">
                          {persona.title}
                        </h3>

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

            {/* Bottom Button */}
            <div
              className={`relative z-10 w-full max-w-4xl mx-auto flex items-center justify-end mt-3 sm:mt-4 transition-all duration-700 ease-out ${
                buttonsVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <button
                onClick={handleContinue}
                className="ochre-pill-button py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-bold shadow-xl hover:shadow-[0_0_25px_rgba(223,165,71,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span>Continue as {currentOption.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: COMING SOON PAGE (Normal Home-Page Style Screen) */}
        {(viewMode === 'coming-soon' || flipState !== 'idle') && (
          <div
            className={`w-full max-w-3xl mx-auto py-10 sm:py-16 px-6 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 ${
              flipState !== 'idle' ? 'absolute inset-0 z-10 my-auto pointer-events-none' : 'relative z-20'
            } ${
              flipState === 'flipping-forward'
                ? 'animate-leaf-reveal-forward'
                : flipState === 'flipping-backward'
                ? 'animate-leaf-conceal-backward'
                : 'animate-in fade-in duration-500'
            }`}
          >
            {/* Back Button */}
            <div>
              <button
                onClick={handleBackToCards}
                className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-amber-200/90 hover:text-white px-5 py-2.5 rounded-full border border-[#dfa547]/40 bg-[#dfa547]/10 hover:bg-[#dfa547]/20 transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(223,165,71,0.3)] hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#dfa547] group-hover:-translate-x-1 transition-transform" />
                <span>← Back to Choose Role</span>
              </button>
            </div>

            {/* Persona Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#dfa547]/20 via-[#c58525]/10 to-transparent border border-[#dfa547]/40 flex items-center justify-center text-[#dfa547] shadow-[0_0_35px_rgba(223,165,71,0.25)]">
              {React.createElement(currentOption.icon, {
                className: 'w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]',
              })}
            </div>

            {/* Grand Metallic Satin Gold Headline Matching Home Page - Letter-by-Letter Calligraphy Write-in */}
            <div className="space-y-2.5">
              <h1
                key={currentOption.id}
                className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.12] select-text"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 28px rgba(223, 165, 71, 0.35))',
                }}
              >
                {`${currentOption.title} Page`.split('').map((char, index) => (
                  <span
                    key={index}
                    style={{
                      animationDelay: `${60 + index * 36}ms`,
                    }}
                    className="animate-letter-write-in"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>

              <p
                style={{ animationDelay: `${120 + `${currentOption.title} Page`.length * 36}ms` }}
                className="font-serif italic text-amber-200/70 text-sm sm:text-lg max-w-xl mx-auto animate-letter-write-in"
              >
                Exclusive keynote sessions, transformation frameworks, and tailored mentorship for {currentOption.title}s.
              </p>
            </div>

            {/* Antique Flourish Divider */}
            <div
              style={{ animationDelay: `${220 + `${currentOption.title} Page`.length * 36}ms` }}
              className="flex items-center justify-center gap-3 text-amber-300/80 w-full max-w-xs mx-auto animate-letter-write-in"
            >
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#dfa547]/80 to-transparent" />
              <span className="text-xs font-serif leading-none text-amber-300">❖</span>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#dfa547]/80 to-transparent" />
            </div>

            {/* Glowing Royal Coming Soon Badge */}
            <div
              style={{ animationDelay: `${320 + `${currentOption.title} Page`.length * 36}ms` }}
              className="inline-flex items-center gap-3 px-7 py-3 sm:px-9 sm:py-3.5 rounded-full bg-gradient-to-r from-[#dfa547]/15 via-[#dfa547]/25 to-[#dfa547]/15 border border-[#dfa547]/50 text-amber-200 shadow-[0_0_35px_rgba(223,165,71,0.3)] animate-letter-write-in"
            >
              <Clock className="w-5 h-5 text-[#dfa547] animate-pulse" />
              <span className="font-serif-luxury text-xl sm:text-3xl font-bold tracking-wide text-amber-100">
                Coming Soon...
              </span>
              <Sparkles className="w-4 h-4 text-amber-300/90" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
