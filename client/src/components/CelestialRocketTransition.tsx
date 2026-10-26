'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CelestialRocketTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  onApproachArrival?: () => void; // Triggered at ~70% to pre-position destination slide
  onSkip?: () => void;
  sourceTitle?: string;
  targetTitle?: string;
  playbackSpeed?: number; // Speed multiplier (e.g. 3.2x)
}

export default function CelestialRocketTransition({
  isActive,
  onComplete,
  onApproachArrival,
  onSkip,
  playbackSpeed = 3.2,
}: CelestialRocketTransitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const hasTriggeredCompleteRef = useRef(false);
  const hasTriggeredApproachRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      hasTriggeredCompleteRef.current = false;
      hasTriggeredApproachRef.current = false;
      setIsFadingOut(false);
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
    }
  }, [isActive, playbackSpeed]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (video.playbackRate !== playbackSpeed) {
      video.playbackRate = playbackSpeed;
    }

    const current = video.currentTime;
    const duration = video.duration;
    const pct = Math.min(100, Math.round((current / duration) * 100));

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
      {/* 1. CINEMATIC TRANSITION VIDEO (FULL SCREEN & CLEAN) */}
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

      {/* 2. SUBTLE LUXURY VIGNETTE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(184,115,27,0.15) 75%, rgba(9,8,7,0.8) 100%)',
        }}
      />

      {/* 3. LUXURY DARK OBSIDIAN & GOLDEN PORTAL DISSOLVE LAYER */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-400 ease-out ${
          isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(223,165,71,0.2) 0%, rgba(18,14,10,0.88) 55%, #090807 100%)',
        }}
      />

      {/* 4. ONLY SKIP BUTTON (TOP RIGHT) */}
      {onSkip && (
        <div className="absolute top-6 sm:top-8 right-6 sm:right-10 z-50">
          <button
            onClick={onSkip}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-black/65 hover:bg-black/95 backdrop-blur-xl border border-amber-500/40 hover:border-amber-300 text-amber-200 text-xs uppercase font-mono tracking-widest font-bold hover:text-white transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            aria-label="Skip Animation"
          >
            <span>Skip</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      )}
    </div>
  );
}
