'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Hero from './Hero';
import Identify, { PersonaType } from './Identify';
import GetInTouch from './GetInTouch';
import CelestialRocketTransition from './CelestialRocketTransition';
import Footer from './Footer';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface PageSliderProps {
  initialPersona?: PersonaType;
}

export default function PageSlider({ initialPersona }: PageSliderProps) {
  const [current, setCurrent] = useState(initialPersona ? 1 : 0);
  const [boardState, setBoardState] = useState<'idle' | 'sweeping-forward' | 'sweeping-backward'>('idle');
  const [rocketActive, setRocketActive] = useState(false);
  const [rocketTargetIndex, setRocketTargetIndex] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonNudged, setButtonNudged] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(initialPersona ?? null);
  const [identifyMode, setIdentifyMode] = useState<'cards' | 'coming-soon'>(initialPersona ? 'coming-soon' : 'cards');
  const identifyBackRef = useRef<(() => void) | null>(null);
  const identifyPromptRef = useRef<(() => void) | null>(null);
  const identifyResetRef = useRef<(() => void) | null>(null);

  // Gesture & Priming Refs for Bottom Navigation (Forward)
  const isBottomPrimedRef = useRef(false);
  const isBottomGestureActiveRef = useRef(false);
  const bottomGestureTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bottomExpireTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Gesture & Priming Refs for Top Navigation (Backward)
  const isTopPrimedRef = useRef(false);
  const isTopGestureActiveRef = useRef(false);
  const topGestureTimerRef = useRef<NodeJS.Timeout | null>(null);
  const topExpireTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nudgeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLockedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const slidesRef = useRef<(HTMLDivElement | HTMLElement | null)[]>([]);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // A hard refresh from a role URL starts the full site cleanly at Home.
  useEffect(() => {
    if (!initialPersona) return;
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type !== 'reload') return;

    window.history.replaceState(null, '', '/');
    setCurrent(0);
    setSelectedPersona(null);
    setIdentifyMode('cards');
    identifyResetRef.current?.();
  }, [initialPersona]);

  // 3 Primary Slides:
  // 0: Hero (Want to live your dream life)
  // 1: Persona Selection (Please Identify Yourself As)
  // 2: Get In Touch (Executive Speaking Desk & Golden Light Footer)
  const totalSlides = 3;

  const triggerButtonNudge = useCallback(() => {
    setButtonNudged(true);
    if (nudgeTimeoutRef.current) clearTimeout(nudgeTimeoutRef.current);
    nudgeTimeoutRef.current = setTimeout(() => {
      setButtonNudged(false);
    }, 1800);
  }, []);

  const handleRocketApproach = useCallback(() => {
    setCurrent(rocketTargetIndex);
    slidesRef.current[rocketTargetIndex]?.scrollTo({ top: 0, behavior: 'instant' });
  }, [rocketTargetIndex]);

  const handleRocketComplete = useCallback(() => {
    setCurrent(rocketTargetIndex);
    if (rocketTargetIndex === 1) {
      setSelectedPersona(null);
      identifyResetRef.current?.();
    }
    setRocketActive(false);
    isLockedRef.current = false;
    slidesRef.current[rocketTargetIndex]?.scrollTo({ top: 0, behavior: 'instant' });
  }, [rocketTargetIndex]);

  const handleRocketSkip = useCallback(() => {
    setCurrent(rocketTargetIndex);
    if (rocketTargetIndex === 1) {
      setSelectedPersona(null);
      identifyResetRef.current?.();
    }
    setRocketActive(false);
    isLockedRef.current = false;
    slidesRef.current[rocketTargetIndex]?.scrollTo({ top: 0, behavior: 'instant' });
  }, [rocketTargetIndex]);

  const goToSlide = useCallback((targetIndex: number, explicitDirection?: 'forward' | 'backward') => {
    if (isLockedRef.current || rocketActive) return;
    if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === current) return;

    // Leaving Hero (Slide 0) going forward -> Trigger high-speed rocket transit
    if (current === 0 && targetIndex > 0) {
      isLockedRef.current = true;
      setRocketTargetIndex(targetIndex);
      setRocketActive(true);
      return;
    }

    isLockedRef.current = true;
    const isForward = explicitDirection ? explicitDirection === 'forward' : targetIndex > current;

    // Trigger the royal gold sweeping board matching Get In Touch button
    setBoardState(isForward ? 'sweeping-forward' : 'sweeping-backward');

    // Switch slide halfway through board sweep
    setTimeout(() => {
      setCurrent(targetIndex);
      if (targetIndex === 1 && current === 0) {
        setSelectedPersona(null);
        identifyResetRef.current?.();
      }
      isBottomPrimedRef.current = false;
      isBottomGestureActiveRef.current = false;
      isTopPrimedRef.current = false;
      isTopGestureActiveRef.current = false;
      if (bottomGestureTimerRef.current) clearTimeout(bottomGestureTimerRef.current);
      if (bottomExpireTimerRef.current) clearTimeout(bottomExpireTimerRef.current);
      if (topGestureTimerRef.current) clearTimeout(topGestureTimerRef.current);
      if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
      slidesRef.current[targetIndex]?.scrollTo({ top: 0, behavior: 'instant' });
    }, 420);

    setTimeout(() => {
      setBoardState('idle');
      isLockedRef.current = false;
    }, 870);
  }, [current, totalSlides, rocketActive]);

  const nextSlide = useCallback(() => {
    if (current < totalSlides - 1) {
      goToSlide(current + 1, 'forward');
    }
  }, [current, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    // If on Slide 1 in Coming Soon view, return to 6 Cards instead of leaving to Hero
    if (current === 1 && identifyMode === 'coming-soon' && identifyBackRef.current) {
      identifyBackRef.current();
      return;
    }
    if (current > 0) {
      goToSlide(current - 1, 'backward');
    }
  }, [current, identifyMode, goToSlide]);

  // Wheel listener: user can read down page before slide transition triggers!
  useEffect(() => {
    const getEffectiveScrollContainer = (): HTMLElement | null => {
      const slide = slidesRef.current[current];
      if (!slide) return null;
      if (current === 1 && identifyMode === 'coming-soon') {
        const rolePanel = slide.querySelector<HTMLElement>('[data-role-panel="true"]');
        if (rolePanel) return rolePanel;
      }
      if (slide.scrollHeight > slide.clientHeight + 16) {
        return slide as HTMLElement;
      }
      const inner = slide.querySelector<HTMLElement>('.overflow-y-auto, [data-role-panel="true"]');
      if (inner && inner.scrollHeight > inner.clientHeight + 16) {
        return inner;
      }
      return slide as HTMLElement;
    };

    const handleWheel = (e: WheelEvent) => {
      // Slide 0: Absolute Lock on Hero
      if (current === 0) {
        e.preventDefault();
        if (Math.abs(e.deltaY) > 2 || Math.abs(e.deltaX) > 2) {
          triggerButtonNudge();
        }
        return;
      }

      if (isLockedRef.current || rocketActive) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 3) return;

      if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);
      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 350);

      const activeSlide = getEffectiveScrollContainer();
      const isScrollable = activeSlide ? activeSlide.scrollHeight > activeSlide.clientHeight + 16 : false;
      const isAtBottom = activeSlide
        ? activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 20
        : true;
      const isAtTop = activeSlide ? activeSlide.scrollTop <= 14 : true;

      // Terminal Slide (Slide 2: Get In Touch & Footer)
      if (current === totalSlides - 1) {
        if (e.deltaY < 0) {
          // Scrolling UP:
          if (isScrollable && !isAtTop) {
            wheelAccumulatorRef.current = 0;
            isTopPrimedRef.current = false;
            return;
          }
          wheelAccumulatorRef.current += e.deltaY;
          const isFastUpScroll = Math.abs(e.deltaY) >= 75 || wheelAccumulatorRef.current <= -150;
          if (isFastUpScroll) {
            wheelAccumulatorRef.current = 0;
            isTopPrimedRef.current = false;
            e.preventDefault();
            prevSlide();
            return;
          }

          if (!isTopPrimedRef.current) {
            isTopGestureActiveRef.current = true;
            if (topGestureTimerRef.current) clearTimeout(topGestureTimerRef.current);
            topGestureTimerRef.current = setTimeout(() => {
              isTopGestureActiveRef.current = false;
              isTopPrimedRef.current = true;
              if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
              topExpireTimerRef.current = setTimeout(() => {
                isTopPrimedRef.current = false;
              }, 3000);
            }, 280);
            return;
          }

          if (isTopGestureActiveRef.current) return;

          wheelAccumulatorRef.current = 0;
          isTopPrimedRef.current = false;
          if (topGestureTimerRef.current) clearTimeout(topGestureTimerRef.current);
          if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
          e.preventDefault();
          prevSlide();
          return;
        } else {
          // Scrolling DOWN on Footer:
          if (isScrollable && !isAtBottom) {
            wheelAccumulatorRef.current = 0;
            return; // Let user scroll down through footer content
          }
          // Once at the bottom of the footer: TERMINUS! Nothing below it!
          e.preventDefault();
          wheelAccumulatorRef.current = 0;
          return;
        }
      }

      // Slide 1: Experience Identity & Role Pages
      if (current === 1) {
        if (e.deltaY > 0) {
          // Scrolling DOWN:
          if (identifyMode === 'cards') {
            if (isScrollable && !isAtBottom) {
              wheelAccumulatorRef.current = 0;
              return;
            }
            if (!selectedPersona) {
              wheelAccumulatorRef.current += e.deltaY;
              if (wheelAccumulatorRef.current >= 150) {
                identifyPromptRef.current?.();
                wheelAccumulatorRef.current = 0;
              }
              return;
            }
            wheelAccumulatorRef.current += e.deltaY;
            if (e.deltaY >= 150 || wheelAccumulatorRef.current >= 420) {
              wheelAccumulatorRef.current = 0;
              e.preventDefault();
              nextSlide();
            }
            return;
          }

          // In Coming Soon role page (e.g. Student page):
          // Step 1: Let user scroll all the way down through page and footer!
          // "niche jo mere footer hai isako ek bar pura niche tak jane"
          if (isScrollable && !isAtBottom) {
            wheelAccumulatorRef.current = 0;
            isBottomPrimedRef.current = false;
            isBottomGestureActiveRef.current = false;
            if (bottomGestureTimerRef.current) clearTimeout(bottomGestureTimerRef.current);
            if (bottomExpireTimerRef.current) clearTimeout(bottomExpireTimerRef.current);
            return; // Allow natural vertical reading down to footer
          }

          // At the footer edge, require a deliberate fast scroll to advance.
          // Gentle trackpad movement is swallowed here so it cannot accidentally
          // carry the user onto the next slide.
          wheelAccumulatorRef.current += e.deltaY;
          e.preventDefault();
          if (e.deltaY >= 150 || wheelAccumulatorRef.current >= 420) {
            wheelAccumulatorRef.current = 0;
            isBottomPrimedRef.current = false;
            isBottomGestureActiveRef.current = false;
            nextSlide();
          }
          return;
        } else {
          // Scrolling UP:
          if (identifyMode === 'cards') {
            if (isScrollable && !isAtTop) {
              wheelAccumulatorRef.current = 0;
              return;
            }
            wheelAccumulatorRef.current += e.deltaY;
            const isFastUpScroll = Math.abs(e.deltaY) >= 150 || wheelAccumulatorRef.current <= -420;
            if (isFastUpScroll) {
              wheelAccumulatorRef.current = 0;
              isTopPrimedRef.current = false;
              e.preventDefault();
              prevSlide();
            } else {
              e.preventDefault();
            }
            return;
          }

          // In Coming Soon role page (e.g. Student page):
          // Step 1: Let user scroll naturally upwards from footer to cards!
          if (isScrollable && !isAtTop) {
            wheelAccumulatorRef.current = 0;
            isTopPrimedRef.current = false;
            isTopGestureActiveRef.current = false;
            if (topGestureTimerRef.current) clearTimeout(topGestureTimerRef.current);
            if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
            return; // Allow natural vertical reading upwards
          }

          // At the top edge, move back only on a deliberate fast upward scroll.
          wheelAccumulatorRef.current += e.deltaY;
          e.preventDefault();
          if (e.deltaY <= -150 || wheelAccumulatorRef.current <= -420) {
            wheelAccumulatorRef.current = 0;
            isTopPrimedRef.current = false;
            isTopGestureActiveRef.current = false;
            prevSlide();
          }
          return;
        }
      }

      // General fallback
      wheelAccumulatorRef.current += e.deltaY;
      if (wheelAccumulatorRef.current >= 200) {
        wheelAccumulatorRef.current = 0;
        e.preventDefault();
        nextSlide();
      } else if (wheelAccumulatorRef.current <= -200) {
        wheelAccumulatorRef.current = 0;
        e.preventDefault();
        prevSlide();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (current === 0) {
        if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
          triggerButtonNudge();
          return;
        }
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
        const activeSlide = getEffectiveScrollContainer();
        const isScrollable = activeSlide ? activeSlide.scrollHeight > activeSlide.clientHeight + 8 : false;
        const isAtBottom = activeSlide
          ? activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 14
          : true;

        if (current === totalSlides - 1) {
          if (activeSlide && isScrollable && !isAtBottom) {
            activeSlide.scrollBy({ top: 120, behavior: 'smooth' });
          }
          return;
        }

        if (activeSlide && isScrollable && !isAtBottom) {
          activeSlide.scrollBy({ top: 120, behavior: 'smooth' });
          return;
        }

        if (current === 1 && identifyMode === 'cards' && !selectedPersona) {
          identifyPromptRef.current?.();
          return;
        }

        if (!isBottomPrimedRef.current) {
          isBottomPrimedRef.current = true;
          if (bottomExpireTimerRef.current) clearTimeout(bottomExpireTimerRef.current);
          bottomExpireTimerRef.current = setTimeout(() => {
            isBottomPrimedRef.current = false;
          }, 3000);
          return;
        }

        isBottomPrimedRef.current = false;
        if (bottomExpireTimerRef.current) clearTimeout(bottomExpireTimerRef.current);
        nextSlide();
        return;
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
        const activeSlide = getEffectiveScrollContainer();
        const isScrollable = activeSlide ? activeSlide.scrollHeight > activeSlide.clientHeight + 8 : false;
        const isAtTop = activeSlide ? activeSlide.scrollTop <= 8 : true;

        if (activeSlide && isScrollable && !isAtTop) {
          activeSlide.scrollBy({ top: -120, behavior: 'smooth' });
          return;
        }

        if (!isTopPrimedRef.current) {
          isTopPrimedRef.current = true;
          if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
          topExpireTimerRef.current = setTimeout(() => {
            isTopPrimedRef.current = false;
          }, 3000);
          return;
        }

        isTopPrimedRef.current = false;
        if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
        prevSlide();
        return;
      } else if (e.key === 'Escape') {
        if (current === 1 && identifyMode === 'coming-soon' && identifyBackRef.current) {
          identifyBackRef.current();
          return;
        }
        setMenuOpen(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (current === 0) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (current === 0) {
        const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
        const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
        if (Math.abs(diffY) > 15 || Math.abs(diffX) > 15) {
          triggerButtonNudge();
        }
        return;
      }

      const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

      const activeSlide = getEffectiveScrollContainer();
      const isScrollable = activeSlide ? activeSlide.scrollHeight > activeSlide.clientHeight + 16 : false;
      const isAtBottom = activeSlide
        ? activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 20
        : true;
      const isAtTop = activeSlide ? activeSlide.scrollTop <= 16 : true;

      // Horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 28) {
          if (diffX > 0) {
            if (current === 1 && identifyMode === 'cards' && !selectedPersona) {
              identifyPromptRef.current?.();
              return;
            }
            nextSlide();
          } else {
            prevSlide();
          }
        }
        return;
      }

      // Vertical swipe: Swiping UP (diffY > 45, scrolling down)
      if (diffY > 45) {
        if (current === totalSlides - 1) {
          return;
        }
        if (isScrollable && !isAtBottom) {
          return;
        }
        if (current === 1 && identifyMode === 'cards' && !selectedPersona) {
          identifyPromptRef.current?.();
          return;
        }

        if (current === 1 && identifyMode === 'coming-soon') {
          if (diffY >= 180) nextSlide();
          return;
        }

        if (diffY > 90 || isBottomPrimedRef.current) {
          isBottomPrimedRef.current = false;
          nextSlide();
        } else {
          isBottomPrimedRef.current = true;
          if (bottomExpireTimerRef.current) clearTimeout(bottomExpireTimerRef.current);
          bottomExpireTimerRef.current = setTimeout(() => {
            isBottomPrimedRef.current = false;
          }, 3000);
        }
        return;
      }

      // Vertical swipe: Swiping DOWN (diffY < -45, scrolling up)
      if (diffY < -45) {
        if (isScrollable && !isAtTop) {
          return;
        }

        if (current === 1 && identifyMode === 'coming-soon') {
          if (diffY <= -180) prevSlide();
          return;
        }

        if (diffY < -90 || isTopPrimedRef.current) {
          isTopPrimedRef.current = false;
          prevSlide();
        } else {
          isTopPrimedRef.current = true;
          if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
          topExpireTimerRef.current = setTimeout(() => {
            isTopPrimedRef.current = false;
          }, 3000);
        }
        return;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (nudgeTimeoutRef.current) clearTimeout(nudgeTimeoutRef.current);
      if (bottomGestureTimerRef.current) clearTimeout(bottomGestureTimerRef.current);
      if (bottomExpireTimerRef.current) clearTimeout(bottomExpireTimerRef.current);
      if (topGestureTimerRef.current) clearTimeout(topGestureTimerRef.current);
      if (topExpireTimerRef.current) clearTimeout(topExpireTimerRef.current);
    };
  }, [current, identifyMode, selectedPersona, totalSlides, nextSlide, prevSlide, triggerButtonNudge]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090807] text-slate-100 select-text">
      {/* Radiant Subtle Warm Ambient Glows */}
      <div className="sunrise-glow w-[600px] h-[600px] -top-32 -left-32 opacity-35" />
      <div className="sunrise-glow w-[650px] h-[650px] top-1/2 -right-36 opacity-25" />

      {/* ULTRA-FAST 3.2X CELESTIAL TRANSITION VIDEO OVERLAY */}
      <CelestialRocketTransition
        isActive={rocketActive}
        onComplete={handleRocketComplete}
        onApproachArrival={handleRocketApproach}
        onSkip={handleRocketSkip}
        sourceTitle="Welcome Sanctum"
        targetTitle="Persona Discovery"
        playbackSpeed={3.2}
      />

      {/* ROYAL GOLD SLIDING BOARD (Matching Get In Touch Button) */}
      {boardState !== 'idle' && (
        <div className={`lishbos-slide-board ${boardState}`} />
      )}

      {/* TOP HEADER NAVBAR */}
      <header data-chrome="true" className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 py-2.5 sm:py-5 flex items-center justify-between pointer-events-none bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-amber-500/15 sm:border-b-0 transition-all duration-500">
        <button
          onClick={() => goToSlide(0)}
          className="pointer-events-auto flex items-center gap-2 text-left group cursor-pointer transition-transform hover:scale-105"
        >
          <img
            src="/pranav_mahajan_transparent.png"
            alt="Pranav Mahajan Logo"
            className="h-10 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)]"
          />
        </button>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3.5 sm:px-5 text-xs font-bold tracking-wide rounded-full text-amber-200 border border-amber-500/50 bg-[#1e1710]/80 hover:bg-[#2e2318] hover:border-amber-400 hover:text-white transition-all shadow-[0_4px_16px_rgba(223,165,71,0.2)] hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            Sign Up
          </Link>

          <button
            onClick={() => goToSlide(2)}
            className="hidden sm:inline-flex ochre-pill-button py-2 px-5 text-xs font-bold shadow-md hover:shadow-lg"
          >
            Get In Touch
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-xs bg-[#16120e]/90 hover:bg-[#221b14] border border-amber-500/30 text-white backdrop-blur-md"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-amber-300" />
            ) : (
              <>
                <span className="w-4 h-0.5 rounded-full bg-slate-200" />
                <span className="w-3 h-0.5 bg-[#dfa547] rounded-full self-start ml-3.5" />
                <span className="w-4 h-0.5 rounded-full bg-slate-200" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* CONTINUOUS HORIZONTAL SLIDING TRACK (3 SLIDES) */}
      <div
        className="slide-track"
        style={{
          transform: `translateX(-${current * 100}vw)`,
          transition: rocketActive ? 'none' : undefined,
        }}
      >
        {/* SLIDE 0: HERO (Want to live your dream life) */}
        <Hero
          onStart={() => goToSlide(1, 'forward')}
          buttonNudged={buttonNudged}
        />

        {/* SLIDE 1: EXPERIENCE IDENTITY (Royal Parchment Scroll) */}
        <div
          ref={(el) => { slidesRef.current[1] = el; }}
          className={`slide-item bg-[#090807] text-slate-100 relative ${
            current === 1 && identifyMode === 'cards' ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'
          } select-text ${
            current === 1 ? 'quill-active-slide' : ''
          }`}
        >
          <Identify
            initialPersona={initialPersona}
            isActive={current === 1}
            onSelectPersona={(persona) => {
              setSelectedPersona(persona);
              const rolePath = persona ? `/${persona}` : '/';
              if (window.location.pathname !== rolePath) {
                window.history.replaceState(null, '', rolePath);
              }
            }}
            onGoToPersonaPage={(p) => {
              setSelectedPersona(p);
              goToSlide(2, 'forward');
            }}
            onBackToHero={() => goToSlide(0, 'backward')}
            onViewModeChange={setIdentifyMode}
            backRef={identifyBackRef}
            promptRef={identifyPromptRef}
            resetRef={identifyResetRef}
          />
        </div>

        {/* SLIDE 2: GET IN TOUCH (Direct Speaking Desk & Booking with Golden Light Footer) */}
        <div
          ref={(el) => { slidesRef.current[2] = el; }}
          className="slide-item bg-[#090807] text-slate-100 relative overflow-y-auto overflow-x-hidden select-text flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(223,165,71,0.06),transparent_65%)] pointer-events-none" />
          <div className="w-full relative z-10 flex-1">
            <GetInTouch
              selectedPersona={selectedPersona}
              onBackToPathway={() => goToSlide(1, 'backward')}
            />
          </div>
          {/* Full Width Luxury Golden Light Theme Footer */}
          <Footer
            onNavigateHome={() => goToSlide(0)}
            onNavigateRoles={() => goToSlide(1)}
            onNavigateContact={() => {}}
          />
        </div>
      </div>

      {/* FLOATING CORNER CONTROLS */}
      <div data-chrome="true" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => {
              if (current > 0 || (current === 1 && identifyMode === 'coming-soon')) prevSlide();
            }}
            disabled={current === 0}
            className={`w-9 h-9 rounded-full bg-[#18130f]/90 border border-amber-500/40 flex items-center justify-center shadow-lg transition-all ${
              current === 0 ? 'opacity-35 cursor-not-allowed text-slate-500' : 'hover:bg-[#251e18] text-slate-200 hover:text-white cursor-pointer'
            }`}
            aria-label="Previous Slide"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (current === 0) {
                triggerButtonNudge();
                return;
              }
              if (current === 1 && identifyMode === 'cards' && !selectedPersona) {
                identifyPromptRef.current?.();
                return;
              }
              if (current === totalSlides - 1) {
                // At the footer: nothing below it!
                return;
              }
              nextSlide();
            }}
            disabled={current === totalSlides - 1}
            className={`w-9 h-9 rounded-full bg-[#18130f]/90 border border-amber-500/40 flex items-center justify-center shadow-lg transition-all ${
              current === totalSlides - 1
                ? 'opacity-35 cursor-not-allowed text-slate-500 border-amber-500/20'
                : 'hover:bg-[#251e18] text-slate-200 hover:text-white cursor-pointer'
            }`}
            aria-label="Next Slide"
            title={current === totalSlides - 1 ? 'End of page' : 'Next Slide'}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FULLSCREEN OVERLAY MENU */}
      {menuOpen && (
        <div data-chrome="true" className="fixed inset-0 z-50 bg-[#090807]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-200 text-white">
          <div className="flex items-center justify-between">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan"
              className="h-14 sm:h-18 w-auto object-contain drop-shadow-[0_4px_20px_rgba(223,165,71,0.4)]"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#18130f] border border-amber-500/40 shadow-xs cursor-pointer text-amber-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-md mx-auto w-full space-y-4 text-center my-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block mb-2">
              Directory // Experience
            </span>
            <button
              onClick={() => {
                goToSlide(0);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-200 hover:text-[#dfa547] transition-colors cursor-pointer"
            >
              01 &bull; Welcome (Home)
            </button>
            <button
              onClick={() => {
                goToSlide(1);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-200 hover:text-[#dfa547] transition-colors cursor-pointer"
            >
              02 &bull; Choose Role
            </button>
            <button
              onClick={() => {
                goToSlide(2);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-200 hover:text-[#dfa547] transition-colors cursor-pointer"
            >
              03 &bull; Get In Touch &amp; Secretariat
            </button>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
            >
              04 &bull; Sign Up / Register
            </Link>
          </div>

          <div className="text-center text-xs text-slate-400 pt-4 border-t border-amber-500/20">
            &copy; 2026 Pranav Mahajan Official &bull; Wisdom &bull; Leadership &bull; Stillness
          </div>
        </div>
      )}
    </div>
  );
}
