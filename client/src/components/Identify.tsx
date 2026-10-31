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
  initialPersona?: PersonaType;
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

export interface RoleExperienceConfig {
  id: PersonaType;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  videoSrc: string;
  badgeLabel: string;
  headingLines: string[];
  subtitle: string;
  storageKey: string;
}

export const ROLE_EXPERIENCES: Record<PersonaType, RoleExperienceConfig> = {
  student: {
    id: 'student',
    title: 'Student',
    icon: GraduationCap,
    videoSrc: '/studentpanel.mp4',
    badgeLabel: 'Student Gateway',
    headingLines: ['This is the', 'student pages'],
    subtitle: "Pushing open the doors to excellence, leadership, and boundless possibilities with Pranav Mahajan's youth masterclasses.",
    storageKey: 'pravan_student_video_watched',
  },
  school: {
    id: 'school',
    title: 'Educational Institution',
    icon: School,
    videoSrc: '/school-role.mp4',
    badgeLabel: 'Educational Institution',
    headingLines: ['This is my', 'edu page'],
    subtitle: 'Empowering academic excellence, youth leadership culture, and transformative teacher-student synergy.',
    storageKey: 'pravan_school_video_watched',
  },
  individual: {
    id: 'individual',
    title: 'Individual',
    icon: User,
    videoSrc: '/Individual.mp4',
    badgeLabel: 'Individual Gateway',
    headingLines: ['This is my', 'Individual page'],
    subtitle: 'Personal transformation, peak subconscious focus, and life-changing self-mastery frameworks.',
    storageKey: 'pravan_individual_video_watched',
  },
  corporate: {
    id: 'corporate',
    title: 'Corporate / Business',
    icon: Building,
    videoSrc: '/Video_prompt_for_collage_animation_40b3e6b1_1080p%20(online-video-cutter.com).mp4',
    badgeLabel: 'Corporate / Business',
    headingLines: ['This is my', 'Corporate', 'Business page'],
    subtitle: 'Executive peak performance, high-impact leadership culture, and organizational breakthrough mastery.',
    storageKey: 'pravan_corporate_video_watched',
  },
  government: {
    id: 'government',
    title: 'Government Department',
    icon: Landmark,
    videoSrc: '/gvtanimetion.mp4',
    badgeLabel: 'Government Department',
    headingLines: ['This is my', 'Government Page'],
    subtitle: 'Strategic institutional vision, nation-building synergy, and transformative public governance keynote programs.',
    storageKey: 'pravan_government_video_watched',
  },
  ngo: {
    id: 'ngo',
    title: 'NGO / Social Sector',
    icon: Users,
    videoSrc: '/animetion%20video%20(2)%20(online-video-cutter.com).mp4',
    badgeLabel: 'NGO / Social Sector',
    headingLines: ['This is my', 'NGO Page'],
    subtitle: 'Grassroots empowerment, sustainable social impact, and uplifting community transformation.',
    storageKey: 'pravan_ngo_video_watched',
  },
  parent: {
    id: 'parent',
    title: 'Conscious Parenting',
    icon: Users,
    videoSrc: '/animetion%20video%20(2)%20(online-video-cutter.com).mp4',
    badgeLabel: 'Conscious Parenting',
    headingLines: ['This is my', 'Parenting Page'],
    subtitle: 'Nurturing conscious families, mindful communication, and emotional resilience for modern parents.',
    storageKey: 'pravan_parent_video_watched',
  },
};

export default function Identify({
  initialPersona,
  isActive = true,
  onSelectPersona,
  onGoToPersonaPage,
  onBackToHero,
  onViewModeChange,
  backRef,
  promptRef,
  resetRef,
}: IdentifyProps) {
  const [selected, setSelected] = useState<PersonaType | null>(initialPersona ?? null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [shakePrompt, setShakePrompt] = useState(false);
  const promptTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [viewMode, setViewMode] = useState<'cards' | 'coming-soon'>(initialPersona ? 'coming-soon' : 'cards');
  const [flipState, setFlipState] = useState<'idle' | 'flipping-forward' | 'flipping-backward'>('idle');
  const [headingWriting, setHeadingWriting] = useState(false);
  // Track sequential one-by-one card emergence (0 to 6 cards formed like magic)
  const [revealedCardCount, setRevealedCardCount] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const roleVideoRef = useRef<HTMLVideoElement>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [hasWatchedRoleVideo, setHasWatchedRoleVideo] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState<Record<string, boolean>>({});
  const [roleVideoPlaying, setRoleVideoPlaying] = useState(false);
  const [roleVideoEnded, setRoleVideoEnded] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('pravan_role_video_watched') === 'true') {
        setHasWatchedRoleVideo(true);
      }
      const watchedMap: Record<string, boolean> = {};
      Object.values(ROLE_EXPERIENCES).forEach((exp) => {
        if (localStorage.getItem(exp.storageKey) === 'true') {
          watchedMap[exp.id] = true;
        }
      });
      setHasWatchedVideo(watchedMap);
    } catch {}
  }, []);

  const toggleGlobalAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
    if (roleVideoRef.current) roleVideoRef.current.muted = nextMuted;
  };

  const handleSkipRoleVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = video.duration || 10;
    }
    clearAllTimers();
    setHeadingWriting(true);
    setRevealedCardCount(PERSONAS.length);
    setButtonsVisible(true);
    hasTriggeredSequenceRef.current = true;
  };

  const handleSkipRoleExperience = () => {
    const activeKey = selected || comingSoonOption.id || 'student';
    const config = ROLE_EXPERIENCES[activeKey];
    if (config) {
      try {
        localStorage.setItem(config.storageKey, 'true');
        setHasWatchedVideo((prev) => ({ ...prev, [config.id]: true }));
      } catch {}
    }
    const v = roleVideoRef.current;
    if (v) {
      v.pause();
    }
    setRoleVideoEnded(true);
  };
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
    setRoleVideoEnded(false);
    setFlipState('flipping-forward');
    playPaperTurnSound();
    setTimeout(() => {
      setViewMode('coming-soon');
      setFlipState('idle');
    }, 880);
  };

  const handleBackToCards = () => {
    if (flipState !== 'idle') return;
    if (roleVideoRef.current) {
      roleVideoRef.current.pause();
      roleVideoRef.current.currentTime = 0;
    }
    setRoleVideoPlaying(false);
    setRoleVideoEnded(false);
    setSelected(null);
    if (onSelectPersona) {
      onSelectPersona(null as any);
    }
    setViewMode('cards');
    setFlipState('idle');
    setRevealedCardCount(PERSONAS.length);
    setButtonsVisible(true);
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
    if (roleVideoRef.current) {
      roleVideoRef.current.pause();
      roleVideoRef.current.currentTime = 0;
    }
    setRoleVideoEnded(false);
    setRoleVideoPlaying(false);
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
      if (viewMode === 'coming-soon') {
        video.pause();
        return;
      }
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
    }

    return () => {
      clearAllTimers();
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      setShowPrompt(false);
      setShakePrompt(false);
    };
  }, [isActive, viewMode]);

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
    setRoleVideoEnded(false);
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
  const activeRole: RoleExperienceConfig = ROLE_EXPERIENCES[selected || comingSoonOption.id] || ROLE_EXPERIENCES.student;

  // Synchronize Role video playback when entering/exiting coming-soon view
  useEffect(() => {
    if (viewMode === 'coming-soon' && flipState === 'idle' && activeRole) {
      setRoleVideoEnded(false);
      setRoleVideoPlaying(true);
      const v = roleVideoRef.current;
      if (v) {
        v.currentTime = 0;
        v.playbackRate = 1.0;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            v.muted = true;
            setIsAudioMuted(true);
            v.play().catch(() => {});
          });
        }
      }
    } else if (viewMode === 'cards') {
      const v = roleVideoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
      setRoleVideoPlaying(false);
      setRoleVideoEnded(false);
    }
  }, [viewMode, selected, flipState, activeRole?.id]);

  const handleRoleTimeUpdate = () => {
    const v = roleVideoRef.current;
    if (!v || !v.duration) return;
    if (v.currentTime / v.duration >= 0.7) {
      if (activeRole) {
        try {
          localStorage.setItem(activeRole.storageKey, 'true');
          setHasWatchedVideo((prev) => ({ ...prev, [activeRole.id]: true }));
        } catch {}
      }
    }
  };

  const handleRoleVideoEnded = () => {
    const v = roleVideoRef.current;
    if (v && v.duration > 0 && v.currentTime < v.duration - 0.6) {
      return;
    }
    if (activeRole) {
      try {
        localStorage.setItem(activeRole.storageKey, 'true');
        setHasWatchedVideo((prev) => ({ ...prev, [activeRole.id]: true }));
      } catch {}
    }
    if (v) {
      v.pause();
    }
    setRoleVideoEnded(true);
  };

  return (
    <div
      className={`relative w-full h-full min-h-screen overflow-hidden ${
        initialPersona === 'student' ? 'bg-transparent' : 'bg-[#090807]'
      } text-slate-100 flex flex-col justify-center items-center pt-12 sm:pt-16 pb-6 px-4 sm:px-8 select-text selection:bg-[#dfa547] selection:text-black ${
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

      {/* TOP CONTROLS: EXACTLY TWO BUTTONS - UNMUTE & SKIP (Skip only on 2nd time onwards / return) */}
      {isActive && (
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-50 flex items-center gap-2.5 pointer-events-auto">
          {/* 1. Unmute / Sound Toggle Button */}
          <button
            onClick={toggleGlobalAudio}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#140e09]/90 hover:bg-[#24170d] backdrop-blur-md border border-[#dfa547]/50 text-amber-200 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(223,165,71,0.4)] cursor-pointer hover:scale-105 active:scale-95 text-xs font-serif font-bold"
            aria-label={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#dfa547] animate-pulse" />
                <span className="hidden sm:inline">Sound On</span>
              </>
            )}
          </button>

          {/* 2. Skip Button on Cards View (Only 2nd time onwards) */}
          {viewMode === 'cards' && hasWatchedRoleVideo && !buttonsVisible && (
            <button
              onClick={handleSkipRoleVideo}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#140e09]/90 hover:bg-[#24170d] backdrop-blur-md border border-[#dfa547]/60 text-amber-200 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(223,165,71,0.4)] cursor-pointer hover:scale-105 active:scale-95 text-xs font-serif font-bold uppercase tracking-wider animate-in fade-in zoom-in-95 duration-300"
              aria-label="Skip to Role Cards"
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dfa547]" />
            </button>
          )}

          {/* 2. Skip Button on Role Experience (Only 2nd time onwards / return) */}
          {viewMode === 'coming-soon' && activeRole && hasWatchedVideo[activeRole.id] && !roleVideoEnded && (
            <button
              onClick={handleSkipRoleExperience}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#140e09]/90 hover:bg-[#24170d] backdrop-blur-md border border-[#dfa547]/60 text-amber-200 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(223,165,71,0.4)] cursor-pointer hover:scale-105 active:scale-95 text-xs font-serif font-bold uppercase tracking-wider animate-in fade-in zoom-in-95 duration-300"
              aria-label={`Skip ${activeRole.title} Video`}
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dfa547]" />
            </button>
          )}
        </div>
      )}

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
          muted={isAudioMuted}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center brightness-105"
          style={{ width: '100%', minWidth: '100%' }}
        />
      </div>

      {/* 2. SEAMLESS 2-PANEL HORIZONTAL SLIDE TRACK (Video -> Page) FOR ALL ROLES */}
      {isActive && viewMode === 'coming-soon' && activeRole ? (
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-auto">
          <div
            className="flex flex-nowrap w-[200vw] h-full will-change-transform transition-transform duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              transform: roleVideoEnded ? 'translateX(-100vw)' : 'translateX(0vw)',
              width: '200vw',
            }}
          >
            {/* PANEL 1: FULL SCREEN ROLE VIDEO (100vw) */}
            <div
              className="relative w-screen min-w-[100vw] max-w-[100vw] h-full flex-shrink-0 flex items-center justify-center overflow-hidden bg-[#090807]"
              style={{ width: '100vw', minWidth: '100vw', maxWidth: '100vw' }}
            >
              {/* Golden Core Light Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1050px] h-[500px] sm:h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,165,71,0.22)_0%,rgba(197,133,37,0.12)_45%,transparent_75%)] blur-[90px] sm:blur-[130px] pointer-events-none" />

              {/* Video Element */}
              <video
                key={activeRole.videoSrc}
                ref={roleVideoRef}
                src={activeRole.videoSrc}
                autoPlay
                playsInline
                muted={isAudioMuted}
                preload="auto"
                onCanPlay={(e) => {
                  const vid = e.currentTarget;
                  if (!roleVideoEnded && viewMode === 'coming-soon') {
                    const p = vid.play();
                    if (p !== undefined) {
                      p.catch(() => {
                        vid.muted = true;
                        setIsAudioMuted(true);
                        vid.play().catch(() => {});
                      });
                    }
                  }
                }}
                onTimeUpdate={handleRoleTimeUpdate}
                onEnded={handleRoleVideoEnded}
                className={`w-full h-full object-cover object-center filter brightness-100 contrast-[1.10] saturate-[1.08] transition-all duration-1000 ease-out ${
                  roleVideoPlaying ? 'scale-100' : 'scale-105'
                }`}
              />

              {/* Golden Mesh Shimmer matching site theme */}
              <div className="absolute inset-0 bg-[radial-gradient(#dfa547_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807]/30 via-transparent to-[#090807]/20 pointer-events-none" />
            </div>

            {/* PANEL 2: ROLE FULL PAGE (100vw, slides in from right side simultaneously) */}
            <div
              className="relative w-screen min-w-[100vw] max-w-[100vw] h-full flex-shrink-0 flex items-center justify-start px-6 sm:px-12 md:px-20 overflow-hidden bg-[#090807]"
              style={{ width: '100vw', minWidth: '100vw', maxWidth: '100vw' }}
            >
              {/* Ambient Golden Core Light Orb */}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] sm:h-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,165,71,0.22)_0%,rgba(197,133,37,0.12)_45%,transparent_75%)] blur-[90px] sm:blur-[130px] pointer-events-none" />

              {/* Golden Mesh Shimmer */}
              <div className="absolute inset-0 bg-[radial-gradient(#dfa547_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

              {/* Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-transparent to-[#090807]/70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090807]/90 via-[#090807]/40 to-transparent pointer-events-none" />

              {/* Page Content */}
              <div className="relative z-10 max-w-2xl text-left pointer-events-auto">
                {/* Category Subtitle Pill */}
                <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120b]/90 border border-[#dfa547]/50 text-amber-200/90 text-xs font-serif font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(223,165,71,0.25)]">
                  {React.createElement(activeRole.icon, {
                    className: 'w-3.5 h-3.5 text-[#dfa547]',
                  })}
                  <span>{activeRole.badgeLabel}</span>
                </div>

                {/* Handwritten Caveat Headline */}
                <h1
                  className="individual-ink-glow font-bold leading-[0.9] text-[#f5c66d] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] text-5xl sm:text-7xl md:text-8xl py-1 select-text"
                  style={{ fontFamily: 'var(--font-caveat), cursive' }}
                  aria-label={activeRole.headingLines.join(' ')}
                >
                  {activeRole.headingLines.map((line, lineIndex) => (
                    <React.Fragment key={`${activeRole.id}-track-line-${lineIndex}`}>
                      {lineIndex > 0 ? <br /> : null}
                      {line.split('').map((char, index) => (
                        <span
                          key={`${activeRole.id}-track-char-${lineIndex}-${index}`}
                          className="animate-letter-write-in"
                          style={{ animationDelay: `${(lineIndex * 10 + index) * 75}ms` }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </React.Fragment>
                  ))}
                </h1>

                {/* Antique Flourish Divider */}
                <div className="my-5 flex items-center gap-3 text-amber-300/80 w-full max-w-xs">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#dfa547]/80 to-transparent" />
                  <span className="text-xs font-serif leading-none text-amber-300">❖</span>
                  <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#dfa547]/80 to-transparent" />
                </div>

                {/* Inspiring Subtitle */}
                <p className="font-serif italic text-amber-200/80 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8">
                  {activeRole.subtitle}
                </p>

                {/* Back to Choose Role Button */}
                <button
                  onClick={handleBackToCards}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-amber-200/60 bg-[#140e09]/90 hover:bg-[#24170d] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-serif font-bold text-amber-100 hover:text-white transition-all shadow-xl hover:shadow-[0_0_25px_rgba(223,165,71,0.4)] cursor-pointer hover:scale-105 active:scale-95 uppercase tracking-wider"
                >
                  <ArrowLeft className="h-4 w-4 text-[#dfa547] transition-transform group-hover:-translate-x-1" />
                  <span>Back to Choose Role</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* 2. AUTHENTIC BOOK PAGE TURN CONTAINER */}
      <div
        className={`relative z-30 w-full flex items-center justify-center ${
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

        {/* PAGE 2: BOOK LEAF REVEAL EFFECT DURING FLIP */}
        {flipState !== 'idle' && (
          <div
            className={`w-full max-w-3xl mx-auto py-5 sm:py-16 px-3 sm:px-6 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 absolute inset-0 z-10 my-auto pointer-events-none ${
              flipState === 'flipping-forward'
                ? 'animate-leaf-reveal-forward'
                : 'animate-leaf-conceal-backward'
            }`}
          />
        )}
      </div>

      {/* "Please choose your identity" prompt notification banner */}
      <div
        className={`absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
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
