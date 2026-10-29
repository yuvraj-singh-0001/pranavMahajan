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
  Volume2,
  VolumeX,
  RotateCcw,
} from 'lucide-react';
import QuillCursor from './QuillCursor';
import ScholarPenCursor from './ScholarPenCursor';

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
  promptRef?: React.MutableRefObject<(() => void) | null>;
  resetRef?: React.MutableRefObject<(() => void) | null>;
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
  promptRef,
  resetRef,
}: IdentifyProps) {
  const [selected, setSelected] = useState<PersonaType | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [shakePrompt, setShakePrompt] = useState(false);
  const promptTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [viewMode, setViewMode] = useState<'cards' | 'coming-soon'>('cards');
  const [flipState, setFlipState] = useState<'idle' | 'flipping-forward' | 'flipping-backward'>('idle');
  const [headingWriting, setHeadingWriting] = useState(false);
  // Track sequential one-by-one card emergence (0 to 6 cards formed like magic)
  const [revealedCardCount, setRevealedCardCount] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const studentVideoRef = useRef<HTMLVideoElement>(null);
  const [studentAudioMuted, setStudentAudioMuted] = useState(true);
  const [studentVideoPlaying, setStudentVideoPlaying] = useState(false);
  const [studentVideoEnded, setStudentVideoEnded] = useState(false);
  const [schoolFrame, setSchoolFrame] = useState(0);
  const schoolCanvasRef = useRef<HTMLCanvasElement>(null);
  const schoolFrameRef = useRef(0);
  const schoolDisplayedFrameRef = useRef(0);
  const schoolImageCacheRef = useRef(new Map<number, HTMLImageElement>());
  const schoolTouchYRef = useRef<number | null>(null);
  const backToCardsRef = useRef<(() => void) | null>(null);
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

  const triggerPrompt = () => {
    setShowPrompt(true);
    setShakePrompt(true);
    if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
    promptTimerRef.current = setTimeout(() => {
      setShowPrompt(false);
      setShakePrompt(false);
    }, 2800);
  };

  const handleContinue = () => {
    if (!selected) {
      triggerPrompt();
      return;
    }
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
    if (studentVideoRef.current) {
      studentVideoRef.current.pause();
      studentVideoRef.current.currentTime = 0;
    }
    setStudentVideoPlaying(false);
    setStudentVideoEnded(false);
    setFlipState('flipping-backward');
    playPaperTurnSound();
    setTimeout(() => {
      setSelected(null);
      if (onSelectPersona) {
        onSelectPersona(null as any);
      }
      setViewMode('cards');
      setFlipState('idle');
    }, 880);
  };

  backToCardsRef.current = handleBackToCards;

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

  // Sync promptRef to allow parent container (PageSlider) to trigger "Please choose your identity" prompt
  useEffect(() => {
    if (promptRef) {
      promptRef.current = triggerPrompt;
    }
    return () => {
      if (promptRef) {
        promptRef.current = null;
      }
    };
  }, [promptRef]);

  // Sync resetRef to allow parent container (PageSlider) to reset card selection when navigating back
  useEffect(() => {
    if (resetRef) {
      resetRef.current = () => {
        setSelected(null);
        setShowPrompt(false);
        setShakePrompt(false);
        setViewMode('cards');
      };
    }
    return () => {
      if (resetRef) {
        resetRef.current = null;
      }
    };
  }, [resetRef]);

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
    if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
    setSelected(null);
    setShowPrompt(false);
    setShakePrompt(false);
    setViewMode('cards');
    hasTriggeredSequenceRef.current = false;
    setHeadingWriting(false);
    setRevealedCardCount(0);
    setButtonsVisible(false);
    if (studentVideoRef.current) {
      studentVideoRef.current.pause();
      studentVideoRef.current.currentTime = 0;
    }
    setStudentVideoEnded(false);
    setStudentVideoPlaying(false);
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
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      setShowPrompt(false);
      setShakePrompt(false);
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
    if (selected === id) {
      handleContinue();
      return;
    }
    setSelected(id);
    setShowPrompt(false);
    setShakePrompt(false);
    if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
    if (onSelectPersona) {
      onSelectPersona(id);
    }
  };

  const currentOption = selected ? PERSONAS.find((p) => p.id === selected) : null;
  const comingSoonOption = currentOption || PERSONAS[0];

  // Synchronize Student video playback when entering/exiting student view
  useEffect(() => {
    if (
      viewMode === 'coming-soon' &&
      (selected === 'student' || (!selected && comingSoonOption.id === 'student')) &&
      flipState === 'idle'
    ) {
      const v = studentVideoRef.current;
      if (v) {
        v.currentTime = 0;
        v.playbackRate = 1.0;
        setStudentVideoEnded(false);
        setStudentVideoPlaying(true);
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay fallback
          });
        }
      }
    } else if (viewMode === 'cards') {
      const v = studentVideoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
      setStudentVideoPlaying(false);
      setStudentVideoEnded(false);
    }
  }, [viewMode, selected, flipState, comingSoonOption.id]);

  // Scroll through the supplied full-HD campus frames instead of auto-playing them.
  useEffect(() => {
    const isSchoolExperience = isActive && viewMode === 'coming-soon' && selected === 'school' && flipState === 'idle';
    if (viewMode === 'cards') {
      schoolFrameRef.current = 0;
      schoolDisplayedFrameRef.current = 0;
      setSchoolFrame(0);
      const canvas = schoolCanvasRef.current;
      canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (!isSchoolExperience) return;

    const frameCount = 352;
    let animationId = 0;
    let lastFrameTime = 0;
    let requestPlayback = () => {};
    const drawFrame = (frame: number) => {
      const image = schoolImageCacheRef.current.get(frame);
      const canvas = schoolCanvasRef.current;
      const context = canvas?.getContext('2d');
      if (!image?.complete || !image.naturalWidth || !canvas || !context) return false;
      if (canvas.width !== image.naturalWidth || canvas.height !== image.naturalHeight) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
      }
      context.drawImage(image, 0, 0);
      return true;
    };
    const ensureLoaded = (frame: number) => {
      if (frame < 0 || frame >= frameCount || schoolImageCacheRef.current.has(frame)) return;
      const image = new Image();
      image.decoding = 'async';
      schoolImageCacheRef.current.set(frame, image);
      image.onload = () => {
        if (frame === schoolDisplayedFrameRef.current) drawFrame(frame);
        requestPlayback();
      };
      image.src = `/site%20for%20motivation%20and%20growth/frames/frame_${String(frame).padStart(3, '0')}.webp`;
    };
    const warmFramesAhead = () => {
      const current = schoolDisplayedFrameRef.current;
      const target = Math.round(schoolFrameRef.current);
      const direction = target >= current ? 1 : -1;
      const end = direction > 0 ? Math.min(frameCount - 1, current + 14) : Math.max(0, current - 14);
      for (let frame = direction > 0 ? current + 1 : current - 1; direction > 0 ? frame <= end : frame >= end; frame += direction) {
        ensureLoaded(frame);
      }
    };
    const advance = (now: number) => {
      animationId = 0;
      const current = schoolDisplayedFrameRef.current;
      const target = Math.round(schoolFrameRef.current);
      if (current === target) return;
      if (now - lastFrameTime >= 25) {
        const direction = target > current ? 1 : -1;
        const nextFrame = current + direction;
        warmFramesAhead();
        if (drawFrame(nextFrame)) {
          schoolDisplayedFrameRef.current = nextFrame;
          lastFrameTime = now;
          for (const cachedFrame of schoolImageCacheRef.current.keys()) {
            if (Math.abs(cachedFrame - nextFrame) > 24) schoolImageCacheRef.current.delete(cachedFrame);
          }
        }
      }
      if (schoolDisplayedFrameRef.current !== Math.round(schoolFrameRef.current)) {
        animationId = requestAnimationFrame(advance);
      }
    };
    requestPlayback = () => {
      if (!animationId) animationId = requestAnimationFrame(advance);
    };
    const firstFrame = schoolImageCacheRef.current.get(0);
    if (firstFrame?.complete && firstFrame.naturalWidth) {
      drawFrame(0);
    } else {
      ensureLoaded(0);
    }

    const scrubFrames = (scrollDelta: number) => {
      if (!scrollDelta) return;
      const currentFrame = schoolFrameRef.current;
      if (scrollDelta < 0 && currentFrame <= 0) {
        if (schoolDisplayedFrameRef.current <= 0) backToCardsRef.current?.();
        return;
      }
      const nextFrame = Math.max(0, Math.min(frameCount - 1, currentFrame + scrollDelta * 0.18));
      schoolFrameRef.current = nextFrame;
      const targetFrame = Math.round(nextFrame);
      setSchoolFrame(targetFrame);
      warmFramesAhead();
      requestPlayback();
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 0.1) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      scrubFrames(event.deltaY);
    };
    const onTouchStart = (event: TouchEvent) => {
      schoolTouchYRef.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY;
      if (touchY === undefined || schoolTouchYRef.current === null) return;
      const scrollDelta = schoolTouchYRef.current - touchY;
      schoolTouchYRef.current = touchY;
      if (Math.abs(scrollDelta) < 0.1) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      scrubFrames(scrollDelta * 2.4);
    };
    const onTouchEnd = () => {
      schoolTouchYRef.current = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('touchstart', onTouchStart, true);
      window.removeEventListener('touchmove', onTouchMove, true);
      window.removeEventListener('touchend', onTouchEnd, true);
      schoolTouchYRef.current = null;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isActive, viewMode, selected, flipState]);

  const handleToggleStudentAudio = () => {
    const v = studentVideoRef.current;
    if (!v) return;
    const nextMuted = !studentAudioMuted;
    v.muted = nextMuted;
    setStudentAudioMuted(nextMuted);
  };

  const handleReplayStudentVideo = () => {
    const v = studentVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setStudentVideoEnded(false);
    setStudentVideoPlaying(true);
    v.play().catch(() => {});
  };

  const handleStudentVideoEnded = () => {
    const v = studentVideoRef.current;
    if (v) {
      v.pause();
    }
    setStudentVideoEnded(true);
  };

  return (
    <div
      className={`relative w-full h-full min-h-screen overflow-hidden bg-[#090807] text-slate-100 flex flex-col justify-center items-center pt-12 sm:pt-16 pb-6 px-4 sm:px-8 select-text selection:bg-[#dfa547] selection:text-black ${
        isActive ? 'quill-active-slide' : ''
      } ${
        isActive && viewMode === 'coming-soon' && comingSoonOption.id === 'student'
          ? 'student-scholar-mode'
          : ''
      }`}
    >
      {/* Antique Golden Quill Pen Custom Cursor (Active only on Slide 1 Cards view & other personas) */}
      <QuillCursor
        isActive={!!isActive && (viewMode === 'cards' || comingSoonOption.id !== 'student')}
      />

      {/* Real Education Scholar's Golden Fountain Pen Nib (Active exclusively on Student Experience) */}
      {isActive && viewMode === 'coming-soon' && comingSoonOption.id === 'student' ? (
        <ScholarPenCursor isActive />
      ) : null}

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

      {/* 2. STUDENT IMMERSIVE CINEMATIC BACKGROUND PORTAL (Mounted for instant preloading, active on student coming-soon) */}
      <div
        className={`absolute inset-0 z-0 overflow-hidden flex items-center justify-center transition-all duration-1000 ease-out pointer-events-none ${
          viewMode === 'coming-soon' && (selected === 'student' || (!selected && comingSoonOption.id === 'student'))
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-105'
        }`}
      >
        {/* Golden Core Light Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1050px] h-[500px] sm:h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,165,71,0.22)_0%,rgba(197,133,37,0.12)_45%,transparent_75%)] blur-[90px] sm:blur-[130px]" />

        {/* Smooth Feathered Video Layer with Radial Vignette Mask */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={studentVideoRef}
            src="/Students_pushing_open_doors_90ab1189.mp4"
            playsInline
            muted={studentAudioMuted}
            preload="auto"
            onEnded={handleStudentVideoEnded}
            className={`w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.10] saturate-[1.08] transition-all duration-1000 ease-out ${
              studentVideoPlaying ? 'scale-100' : 'scale-105'
            }`}
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 85% at 50% 50%, black 50%, rgba(0,0,0,0.6) 78%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 90% 85% at 50% 50%, black 50%, rgba(0,0,0,0.6) 78%, transparent 100%)',
            }}
          />

          {/* Seamless Obsidian Vignette Blends (Zero hard edges anywhere) */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#090807] via-[#090807]/75 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090807] via-[#090807]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-[#090807] via-[#090807]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-[#090807] via-[#090807]/70 to-transparent pointer-events-none" />

          {/* Ambient Radial Shading for High-Contrast Typography */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(9,8,7,0.30)_0%,rgba(9,8,7,0.70)_80%,#090807_100%)] pointer-events-none" />

          {/* Golden Mesh Shimmer matching site theme */}
          <div className="absolute inset-0 bg-[radial-gradient(#dfa547_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
        </div>
      </div>

      {/* Full-HD campus sequence provided in the motivation and growth folder. */}
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700 ease-out ${
          viewMode === 'coming-soon' && selected === 'school' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <canvas
          ref={schoolCanvasRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            backgroundImage: 'url(/site%20for%20motivation%20and%20growth/frames/frame_000.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* 3. Home-Page Style Ambient Golden Atmosphere (Active when on Coming Soon view for other personas) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out z-0 ${
          viewMode === 'coming-soon' && selected !== 'school' && (selected !== 'student' && comingSoonOption.id !== 'student') ? 'opacity-100' : 'opacity-0'
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
                          backgroundImage: isSelected
                            ? 'linear-gradient(180deg, #b56b3e 0%, #9D5A31 50%, #854722 100%)'
                            : 'linear-gradient(180deg, #aa6338 0%, #9D5A31 50%, #8c4e28 100%)',
                          backgroundColor: '#9D5A31',
                          boxShadow: isSelected
                            ? 'inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.35), 0 0 25px rgba(223, 165, 71, 0.65)'
                            : 'inset 0 1px 2px rgba(255, 255, 255, 0.28), inset 0 -1px 2px rgba(0, 0, 0, 0.35), 0 6px 18px rgba(0, 0, 0, 0.35)',
                        }}
                      />

                      <div className="absolute inset-1 rounded-lg border border-[#fde68a]/35 pointer-events-none group-hover:border-[#fde68a]/75 transition-colors" />
                      <div className="absolute inset-1.5 rounded-md border border-amber-300/20 pointer-events-none" />

                      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[#fde68a]/85 pointer-events-none" />
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[#fde68a]/85 pointer-events-none" />
                      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[#fde68a]/85 pointer-events-none" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[#fde68a]/85 pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-1 py-0.5">
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#dfa547] border border-amber-200 text-black flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-amber-100 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-xs">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                        </div>

                        <h3 className="font-serif font-bold text-sm sm:text-base text-white tracking-tight leading-snug drop-shadow-xs transition-colors">
                          {persona.title}
                        </h3>

                        <div className="flex items-center justify-center gap-1.5 w-full max-w-[100px] text-amber-200/80 pt-0.5">
                          <span className="h-[1px] flex-1 bg-amber-200/40" />
                          <span className="text-[8px] leading-none text-amber-200">❖</span>
                          <span className="h-[1px] flex-1 bg-amber-200/40" />
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
                className={`py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 rounded-full ${
                  selected
                    ? 'ochre-pill-button hover:shadow-[0_0_25px_rgba(223,165,71,0.5)]'
                    : 'bg-gradient-to-r from-[#2a1c0d]/90 via-[#3a2712]/90 to-[#2a1c0d]/90 border border-[#dfa547]/60 text-amber-200/90 hover:text-white hover:border-[#dfa547] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                } ${shakePrompt && !selected ? 'animate-button-attention' : ''}`}
              >
                {selected && currentOption ? (
                  <>
                    <span>Continue as {currentOption.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>First choose your identity</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: COMING SOON / STUDENT EXPERIENCE PAGE */}
        {(viewMode === 'coming-soon' || flipState !== 'idle') && (
          <div
            className={`w-full max-w-3xl mx-auto py-5 sm:py-16 px-3 sm:px-6 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 ${
              flipState !== 'idle' ? 'absolute inset-0 z-10 my-auto pointer-events-none' : 'relative z-20'
            } ${
              flipState === 'flipping-forward'
                ? 'animate-leaf-reveal-forward'
                : flipState === 'flipping-backward'
                ? 'animate-leaf-conceal-backward'
                : 'animate-in fade-in duration-500'
            }`}
          >
            {comingSoonOption.id === 'student' ? (
              /* STUDENT EXPERIENCE: CINEMATIC CODED PORTAL */
              <div className="w-full flex flex-col items-center justify-center space-y-4 sm:space-y-6">
                {/* Navigation and Audio/Replay Bar */}
                <div className="w-full flex items-center justify-between gap-3 max-w-xl mx-auto">
                  <button
                    onClick={handleBackToCards}
                    className="group inline-flex shrink-0 items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-sm font-bold text-amber-200/90 hover:text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#dfa547]/50 bg-[#140e09]/85 hover:bg-[#22160c] backdrop-blur-md transition-all cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(223,165,71,0.35)] hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#dfa547] group-hover:-translate-x-1 transition-transform" />
                    <span>← Back to Choose Role</span>
                  </button>

                  <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={handleToggleStudentAudio}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-full border border-[#dfa547]/40 bg-[#140e09]/85 backdrop-blur-md text-amber-200 hover:text-white hover:border-[#dfa547] transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                      title={studentAudioMuted ? 'Turn on sound' : 'Mute sound'}
                    >
                      {studentAudioMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                          <span className="hidden sm:inline">Sound Off</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#dfa547] animate-pulse" />
                          <span className="hidden sm:inline">Sound On</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReplayStudentVideo}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-full border border-[#dfa547]/40 bg-[#140e09]/85 backdrop-blur-md text-amber-200 hover:text-white hover:border-[#dfa547] transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                      title="Replay doors animation"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Replay</span>
                    </button>
                  </div>
                </div>

                {/* Persona Icon Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#dfa547]/25 via-[#c58525]/15 to-[#120d08]/80 border border-[#dfa547]/50 flex items-center justify-center text-[#dfa547] shadow-[0_0_35px_rgba(223,165,71,0.3)] backdrop-blur-md animate-in zoom-in-75 duration-500">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]" />
                </div>

                {/* Scholar's Golden Pen Status Pill */}
                <div
                  style={{ animationDelay: '300ms' }}
                  className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full border border-amber-400/35 bg-[#16100a]/80 backdrop-blur-md text-[10px] sm:text-[11px] font-serif text-amber-200/90 shadow-[0_0_15px_rgba(223,165,71,0.2)] animate-letter-write-in"
                >
                  <span className="text-[#dfa547] text-xs">❖</span>
                  <span>Scholar&apos;s Pen Active — Write Your Own Future</span>
                  <span className="text-[#dfa547] text-xs">❖</span>
                </div>

                {/* Grand Metallic Satin Gold Headline - Letter-by-Letter Calligraphy Write-in */}
                <div className="space-y-2.5">
                  <h1
                    key="student-page-title"
                    className="font-serif-luxury text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.12] select-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 28px rgba(223, 165, 71, 0.45))',
                    }}
                  >
                    {'Student Gateway'.split('').map((char, index) => (
                      <span
                        key={index}
                        style={{
                          animationDelay: `${60 + index * 36}ms`,
                        }}
                        className="animate-letter-write-in inline-block"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h1>

                  <p
                    style={{ animationDelay: '550ms' }}
                    className="font-serif italic text-amber-100/90 text-xs sm:text-lg max-w-xl mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] animate-letter-write-in"
                  >
                    Pushing open the doors to excellence, leadership, and boundless possibilities.
                  </p>
                </div>

                {/* Antique Flourish Divider */}
                <div
                  style={{ animationDelay: '700ms' }}
                  className="flex items-center justify-center gap-3 text-amber-300/80 w-full max-w-xs mx-auto animate-letter-write-in"
                >
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#dfa547]/80 to-transparent" />
                  <span className="text-xs font-serif leading-none text-amber-300">❖</span>
                  <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#dfa547]/80 to-transparent" />
                </div>

                {/* Glowing Royal Coming Soon Badge */}
                <div
                  style={{ animationDelay: '850ms' }}
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#dfa547]/20 via-[#dfa547]/30 to-[#dfa547]/20 border border-[#dfa547]/60 text-amber-200 shadow-[0_0_40px_rgba(223,165,71,0.4)] backdrop-blur-md animate-letter-write-in"
                >
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfa547] animate-pulse" />
                  <span className="font-serif-luxury text-lg sm:text-3xl font-bold tracking-wide text-amber-100">
                    Coming Soon...
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300/90" />
                </div>
              </div>
            ) : comingSoonOption.id === 'school' ? (
              <div className="fixed inset-x-0 top-5 z-30 flex flex-col items-center gap-4 px-5 text-center sm:top-8">
                <button
                  onClick={handleBackToCards}
                  className="group inline-flex items-center gap-2 rounded-full border border-amber-100/75 px-5 py-2.5 text-xs font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition hover:bg-amber-100/15 sm:text-sm"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Choose Role
                </button>
                <div className="space-y-1 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  <h1 className="font-serif-luxury text-2xl font-bold sm:text-4xl">Welcome to your school</h1>
                  <p className="text-sm font-medium sm:text-base">Scroll down to move forward through the campus</p>
                </div>
                <div className="w-44 space-y-1.5 sm:w-56">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/40">
                    <div
                      className="h-full rounded-full bg-amber-300 transition-[width] duration-75"
                      style={{ width: `${(schoolFrame / 351) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    <span>Campus entry</span>
                    <span>Explore</span>
                  </div>
                </div>
              </div>
            ) : (
              /* OTHER PERSONAS: ORIGINAL COMING SOON VIEW (PRESERVED 100%) */
              <>
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
                  {React.createElement(comingSoonOption.icon, {
                    className: 'w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]',
                  })}
                </div>

                {/* Grand Metallic Satin Gold Headline Matching Home Page - Letter-by-Letter Calligraphy Write-in */}
                <div className="space-y-2.5">
                  <h1
                    key={comingSoonOption.id}
                    className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.12] select-text"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 28px rgba(223, 165, 71, 0.35))',
                    }}
                  >
                    {`${comingSoonOption.title} Page`.split('').map((char, index) => (
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
                    style={{ animationDelay: `${120 + `${comingSoonOption.title} Page`.length * 36}ms` }}
                    className="font-serif italic text-amber-200/70 text-sm sm:text-lg max-w-xl mx-auto animate-letter-write-in"
                  >
                    Exclusive keynote sessions, transformation frameworks, and tailored mentorship for {comingSoonOption.title}s.
                  </p>
                </div>

                {/* Antique Flourish Divider */}
                <div
                  style={{ animationDelay: `${220 + `${comingSoonOption.title} Page`.length * 36}ms` }}
                  className="flex items-center justify-center gap-3 text-amber-300/80 w-full max-w-xs mx-auto animate-letter-write-in"
                >
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#dfa547]/80 to-transparent" />
                  <span className="text-xs font-serif leading-none text-amber-300">❖</span>
                  <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#dfa547]/80 to-transparent" />
                </div>

                {/* Glowing Royal Coming Soon Badge */}
                <div
                  style={{ animationDelay: `${320 + `${comingSoonOption.title} Page`.length * 36}ms` }}
                  className="inline-flex items-center gap-3 px-7 py-3 sm:px-9 sm:py-3.5 rounded-full bg-gradient-to-r from-[#dfa547]/15 via-[#dfa547]/25 to-[#dfa547]/15 border border-[#dfa547]/50 text-amber-200 shadow-[0_0_35px_rgba(223,165,71,0.3)] animate-letter-write-in"
                >
                  <Clock className="w-5 h-5 text-[#dfa547] animate-pulse" />
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold tracking-wide text-amber-100">
                    Coming Soon...
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300/90" />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* "Please choose your identity" prompt notification banner */}
      <div
        className={`fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          showPrompt
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#18120b]/95 border border-[#dfa547]/90 text-amber-100 shadow-[0_0_35px_rgba(223,165,71,0.6)] backdrop-blur-md">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfa547] animate-pulse flex-shrink-0" />
          <span className="font-serif text-xs sm:text-sm md:text-base font-semibold tracking-wide text-amber-100 whitespace-nowrap">
            Please choose your identity
          </span>
          <span className="text-[10px] text-amber-400/80">❖</span>
        </div>
      </div>
    </div>
  );
}
