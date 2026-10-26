'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, Navigation, Zap, CheckCircle2 } from 'lucide-react';

interface CelestialRocketTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  onApproachArrival?: () => void; // Triggered at ~76% to pre-position destination slide
  onSkip?: () => void;
  sourceTitle?: string;
  targetTitle?: string;
  playbackSpeed?: number; // Speed multiplier (e.g. 2.0x for fast, thrilling energy stream)
}

export default function CelestialRocketTransition({
  isActive,
  onComplete,
  onApproachArrival,
  onSkip,
  sourceTitle = 'Welcome Sanctum',
  targetTitle = 'Persona Discovery',
  playbackSpeed = 3.2, // Ultra-fast, lightning-speed energy conduit
}: CelestialRocketTransitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00.0');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [transitStatus, setTransitStatus] = useState('ENGAGING ENERGY STREAM');
  const hasTriggeredCompleteRef = useRef(false);
  const hasTriggeredApproachRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      hasTriggeredCompleteRef.current = false;
      hasTriggeredApproachRef.current = false;
      setIsFadingOut(false);
      setProgress(0);
      setTransitStatus('⚡ WARP CONDUIT ENGAGED • LIGHT-SPEED');
      video.currentTime = 0;
      video.playbackRate = playbackSpeed;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video auto-play prevented or interrupted:', err);
        });
      }
    } else {
      video.pause();
      setIsFadingOut(false);
      setProgress(0);
    }
  }, [isActive, playbackSpeed]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Enforce ultra-fast playback speed continuously
    if (video.playbackRate !== playbackSpeed) {
      video.playbackRate = playbackSpeed;
    }

    const current = video.currentTime;
    const duration = video.duration;
    const pct = Math.min(100, Math.round((current / duration) * 100));
    setProgress(pct);

    // Formatted micro-timer: e.g. 00:01.4
    const secs = Math.floor(current);
    const ms = Math.floor((current % 1) * 10);
    setCurrentTimeStr(`00:0${secs}.${ms}`);

    // Dynamic Journey Status based on real energy stream transit
    if (pct < 25) {
      setTransitStatus('⚡ WARP CONDUIT ENGAGED • LIGHT-SPEED');
    } else if (pct < 75) {
      setTransitStatus('🌀 ULTRA-FAST HYPERSPACE TRANSIT // 3.2X');
    } else if (pct < 90) {
      setTransitStatus('💫 APPROACHING DESTINATION PORTAL');
    } else {
      setTransitStatus('🎯 DELIVERING YOU TO PERSONA DISCOVERY');
    }

    // 1. PRE-ARRIVAL DOCKING: Trigger at ~70% so destination slide activates underneath
    if (pct >= 70 && !hasTriggeredApproachRef.current) {
      hasTriggeredApproachRef.current = true;
      if (onApproachArrival) {
        onApproachArrival();
      }
    }

    // 2. SEAMLESS DISSOLVE: Starts crisp before end of video
    if (((duration > 0.35 && current >= duration - 0.28) || pct >= 88) && !isFadingOut) {
      setIsFadingOut(true);
    }
  };

  const handleEnded = () => {
    if (!hasTriggeredCompleteRef.current) {
      hasTriggeredCompleteRef.current = true;
      setIsFadingOut(true);
      onComplete();
    }
  };

  const handleVideoError = () => {
    console.error('Video error encountered, falling back to complete transition');
    if (!hasTriggeredCompleteRef.current) {
      hasTriggeredCompleteRef.current = true;
      onComplete();
    }
  };

  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] w-screen h-screen overflow-hidden select-none pointer-events-auto transition-all duration-400 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.04] blur-xs pointer-events-none' : 'opacity-100 scale-100 blur-0'
      }`}
      style={{ backgroundColor: '#090807' }}
    >
      {/* 1. CINEMATIC TRANSITION VIDEO (FAST & PUNCHY) */}
      <video
        ref={videoRef}
        src="/animetion%20video%20(2)%20(online-video-cutter.com).mp4"
        playsInline
        muted
        preload="auto"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = playbackSpeed;
        }}
        onPlay={(e) => {
          e.currentTarget.playbackRate = playbackSpeed;
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none brightness-110 contrast-115"
      >
        <source src="/animetion%20video%20(2)%20(online-video-cutter.com).mp4" type="video/mp4" />
        <source src="/transition_animetion_2.mp4" type="video/mp4" />
      </video>

      {/* 2. DIRECTIONAL SPEED STREAKS / WARP VIGNETTE (Giving genuine page-to-page travel sensation) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 30%, rgba(184,115,27,0.2) 70%, rgba(9,8,7,0.85) 100%)',
        }}
      />
      {/* Cosmic Golden Horizon Speed Beam */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent blur-xs pointer-events-none animate-pulse" />

      {/* 3. LUXURY DARK OBSIDIAN & GOLDEN PORTAL DISSOLVE LAYER (Melts seamlessly into Slide 1 dark theme) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-400 ease-out ${
          isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(223,165,71,0.22) 0%, rgba(18,14,10,0.88) 55%, #090807 100%)',
        }}
      />

      {/* 4. LUXURY CORNER VIEW-FINDER TICKS */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-amber-300/45 pointer-events-none" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-amber-300/45 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-amber-300/45 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-amber-300/45 pointer-events-none" />

      {/* 5. TOP JOURNEY BREADCRUMB: SHOWING PAGE 01 -> PAGE 02 TRAVEL */}
      <div className="absolute top-6 sm:top-8 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-14 pointer-events-none">
        {/* Dynamic Journey Flight Track */}
        <div className="inline-flex items-center gap-2.5 sm:gap-4 px-4 sm:px-6 py-2 rounded-full bg-black/75 backdrop-blur-xl border border-amber-500/40 shadow-2xl">
          {/* Origin */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="font-mono text-[9px] sm:text-xs tracking-wider uppercase font-bold text-slate-300">
              {sourceTitle}
            </span>
          </div>

          {/* Animated Trajectory Vector Line */}
          <div className="relative w-14 sm:w-28 h-1.5 bg-amber-950/80 rounded-full overflow-hidden border border-amber-500/30">
            <div
              className="h-full bg-gradient-to-r from-[#dfa547] via-amber-200 to-white transition-all duration-75 rounded-full shadow-[0_0_8px_#dfa547]"
              style={{ width: `${progress}%` }}
            />
            {/* Moving Pulsing Traveler Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] transition-all duration-75"
              style={{ left: `calc(${Math.min(94, Math.max(0, progress))}% - 4px)` }}
            />
          </div>

          {/* Destination */}
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${progress >= 76 ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
            <span className="font-mono text-[9px] sm:text-xs tracking-wider uppercase font-bold text-amber-300 flex items-center gap-1">
              <span>{targetTitle}</span>
              <Navigation className="w-3 h-3 text-amber-300 transform rotate-45 inline" />
            </span>
          </div>
        </div>

        {/* Minimalist Skip Button */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/70 hover:bg-black/95 backdrop-blur-xl border border-amber-500/40 hover:border-amber-300 text-amber-200 text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold hover:text-white transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Skip</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        )}
      </div>

      {/* 6. CENTER HUD: STATUS TELEMETRY & ARRIVAL ANNOUNCEMENT */}
      <div className="absolute top-1/4 sm:top-1/3 left-0 right-0 flex flex-col items-center justify-center pointer-events-none px-4">
        {/* Dynamic Status Capsule */}
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-black/65 backdrop-blur-lg border border-amber-400/40 text-amber-100 shadow-2xl transition-all duration-300">
          <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-amber-200">
            {transitStatus}
          </span>
        </div>

        {/* Luminous Arrival Drop-off Banner when nearing destination */}
        {progress >= 76 && (
          <div className="mt-3 inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-emerald-950/85 border border-emerald-500/50 text-emerald-200 font-mono text-[10px] sm:text-xs tracking-wider uppercase shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Delivering you to {targetTitle}...</span>
          </div>
        )}
      </div>

      {/* 7. BOTTOM LASER-GOLD PROGRESS BAR & REAL-TIME TELEMETRY METRICS */}
      <div className="absolute bottom-6 sm:bottom-9 left-6 right-6 sm:left-20 sm:right-20 z-40 flex flex-col items-center gap-2.5 pointer-events-none">
        {/* Laser Journey Progress Track */}
        <div className="relative w-full max-w-lg h-[3px] bg-black/60 border border-amber-500/30 rounded-full overflow-hidden backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-300 to-white transition-all duration-75 ease-out rounded-full shadow-[0_0_14px_#dfa547]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Metrics Row */}
        <div className="flex items-center justify-between w-full max-w-lg text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-200/90 px-1">
          <span className="flex items-center gap-1.5 opacity-90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            CONDUIT // {currentTimeStr}
          </span>
          <span className="font-bold text-amber-300 flex items-center gap-1 tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-300" />
            TRAVERSING {progress}%
          </span>
          <span className="text-amber-300/90 font-bold flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#dfa547]" />
            FAST {playbackSpeed}X
          </span>
        </div>
      </div>
    </div>
  );
}
