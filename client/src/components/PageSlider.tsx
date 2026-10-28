'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Hero from './Hero';
import Identify, { PersonaType } from './Identify';
import GetInTouch from './GetInTouch';
import CelestialRocketTransition from './CelestialRocketTransition';
import Footer from './Footer';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

export default function PageSlider() {
  const [current, setCurrent] = useState(0);
  const [boardState, setBoardState] = useState<'idle' | 'sweeping-forward' | 'sweeping-backward'>('idle');
  const [rocketActive, setRocketActive] = useState(false);
  const [rocketTargetIndex, setRocketTargetIndex] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonNudged, setButtonNudged] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [identifyMode, setIdentifyMode] = useState<'cards' | 'coming-soon'>('cards');
  const identifyBackRef = useRef<(() => void) | null>(null);
  const identifyPromptRef = useRef<(() => void) | null>(null);
  const identifyResetRef = useRef<(() => void) | null>(null);
  const isFirstGestureActiveRef = useRef(false);
  const isPrimedForSecondScrollRef = useRef(false);
  const firstGestureTimerRef = useRef<NodeJS.Timeout | null>(null);
  const secondScrollExpireTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nudgeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLockedRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const slidesRef = useRef<(HTMLDivElement | HTMLElement | null)[]>([]);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bottomPrimedRef = useRef(false);
  const bottomPrimeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const topPrimedRef = useRef(false);
  const topPrimeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 3 Primary Slides:
  // 0: Hero (Want to live your dream life)
  // 1: Persona Selection (Please Identify Yourself As)
  // 2: Get In Touch (Executive Speaking & Inquiry Desk)
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
    setFooterOpen(false);
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
    setFooterOpen(false);
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
      if (targetIndex === 1) {
        setSelectedPersona(null);
        identifyResetRef.current?.();
      }
      setFooterOpen(false);
      bottomPrimedRef.current = false;
      topPrimedRef.current = false;
      isFirstGestureActiveRef.current = false;
      isPrimedForSecondScrollRef.current = false;
      if (firstGestureTimerRef.current) clearTimeout(firstGestureTimerRef.current);
      if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
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
    const handleWheel = (e: WheelEvent) => {
      // Slide 0: Absolute Lock
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
      }, 380);

      const activeSlide = slidesRef.current[current];

      // Last Slide (Slide 2: Get In Touch) & Footer Drawer handling
      if (current === totalSlides - 1) {
        if (footerOpen) {
          return;
        } else {
          if (activeSlide) {
            const isScrollable = activeSlide.scrollHeight > activeSlide.clientHeight + 16;
            const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 16;
            const isAtTop = activeSlide.scrollTop <= 12;

            if (e.deltaY > 0) {
              if (isScrollable && !isAtBottom) {
                wheelAccumulatorRef.current = 0;
                return;
              }
              wheelAccumulatorRef.current += e.deltaY;
              if (wheelAccumulatorRef.current >= 220) {
                wheelAccumulatorRef.current = 0;
                e.preventDefault();
                setFooterOpen(true);
              }
              return;
            } else {
              if (isScrollable && !isAtTop) {
                wheelAccumulatorRef.current = 0;
                return;
              }
              wheelAccumulatorRef.current += e.deltaY;
              if (wheelAccumulatorRef.current <= -220) {
                wheelAccumulatorRef.current = 0;
                e.preventDefault();
                prevSlide();
              }
              return;
            }
          }
        }
      }

      // Slide 1 (Identify / Persona Selection):
      // Allow user to comfortably scroll down, read content smoothly, and only transition on intentional strong scroll
      if (activeSlide) {
        const isScrollable = activeSlide.scrollHeight > activeSlide.clientHeight + 16;
        const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 16;
        const isAtTop = activeSlide.scrollTop <= 12;

        if (e.deltaY > 0) {
          // If there is scrollable content below, let user scroll naturally and smoothly!
          if (isScrollable && !isAtBottom) {
            wheelAccumulatorRef.current = 0;
            isFirstGestureActiveRef.current = false;
            isPrimedForSecondScrollRef.current = false;
            return;
          }

          // Case 1: First scroll gesture
          // Show "Please choose your identity" prompt and trap the entire 1st flick
          if (!isPrimedForSecondScrollRef.current) {
            isFirstGestureActiveRef.current = true;

            if (!selectedPersona) {
              identifyPromptRef.current?.();
            }

            // While the 1st flick is ongoing, keep extending gesture timer
            if (firstGestureTimerRef.current) clearTimeout(firstGestureTimerRef.current);
            firstGestureTimerRef.current = setTimeout(() => {
              // 1st scroll motion has completely stopped! Now ready for 2nd scroll.
              isFirstGestureActiveRef.current = false;
              isPrimedForSecondScrollRef.current = true;
              wheelAccumulatorRef.current = 0;

              // Give user 3.8 seconds to perform their 2nd scroll
              if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
              secondScrollExpireTimerRef.current = setTimeout(() => {
                isPrimedForSecondScrollRef.current = false;
              }, 3800);
            }, 300);

            // 1st scroll NEVER advances!
            return;
          }

          // If the 1st scroll flick events are still trickling in, ignore
          if (isFirstGestureActiveRef.current) {
            return;
          }

          // Case 2: Genuine 2ND SCROLL GESTURE! ("phir agar dusre baar scroll karta hai to next page aayega")
          wheelAccumulatorRef.current += e.deltaY;

          if (wheelAccumulatorRef.current >= 50 || Math.abs(e.deltaY) >= 40) {
            wheelAccumulatorRef.current = 0;
            isPrimedForSecondScrollRef.current = false;
            isFirstGestureActiveRef.current = false;
            if (firstGestureTimerRef.current) clearTimeout(firstGestureTimerRef.current);
            if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
            e.preventDefault();
            nextSlide();
          }
          return;
        } else {
          // If on Slide 1 in Coming Soon view, scroll UP returns directly to 6 Cards!
          if (current === 1 && identifyMode === 'coming-soon' && identifyBackRef.current) {
            wheelAccumulatorRef.current = 0;
            topPrimedRef.current = false;
            e.preventDefault();
            identifyBackRef.current();
            return;
          }

          // If there is scrollable content above, let user scroll naturally upwards!
          if (isScrollable && !isAtTop) {
            wheelAccumulatorRef.current = 0;
            topPrimedRef.current = false;
            return;
          }

          // User is at the top!
          wheelAccumulatorRef.current += e.deltaY;
          if (wheelAccumulatorRef.current <= -160) {
            wheelAccumulatorRef.current = 0;

            if (!topPrimedRef.current) {
              // 1ST TIME AT TOP: Prime it, do not return yet!
              topPrimedRef.current = true;
              if (topPrimeTimerRef.current) clearTimeout(topPrimeTimerRef.current);
              topPrimeTimerRef.current = setTimeout(() => {
                topPrimedRef.current = false;
              }, 2200);
              return;
            }

            // 2ND TIME AT TOP:
            topPrimedRef.current = false;
            if (topPrimeTimerRef.current) clearTimeout(topPrimeTimerRef.current);
            e.preventDefault();
            prevSlide();
          }
          return;
        }
      } else {
        wheelAccumulatorRef.current += e.deltaY;
        if (wheelAccumulatorRef.current >= 240) {
          wheelAccumulatorRef.current = 0;
          e.preventDefault();
          nextSlide();
        } else if (wheelAccumulatorRef.current <= -240) {
          wheelAccumulatorRef.current = 0;
          e.preventDefault();
          prevSlide();
        }
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

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (current === 1) {
          if (!isPrimedForSecondScrollRef.current) {
            isPrimedForSecondScrollRef.current = true;
            if (!selectedPersona) {
              identifyPromptRef.current?.();
            }
            if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
            secondScrollExpireTimerRef.current = setTimeout(() => {
              isPrimedForSecondScrollRef.current = false;
            }, 3800);
            return;
          }
          isPrimedForSecondScrollRef.current = false;
          if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
          nextSlide();
          return;
        }
        if (current === totalSlides - 1) {
          setFooterOpen(true);
        } else {
          nextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'ArrowDown') {
        const activeSlide = slidesRef.current[current];
        if (activeSlide && activeSlide.scrollHeight > activeSlide.clientHeight + 8) {
          const isAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 12;
          if (!isAtBottom) {
            activeSlide.scrollBy({ top: 120, behavior: 'smooth' });
            return;
          }
        }
        if (current === 1) {
          if (!isPrimedForSecondScrollRef.current) {
            isPrimedForSecondScrollRef.current = true;
            if (!selectedPersona) {
              identifyPromptRef.current?.();
            }
            if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
            secondScrollExpireTimerRef.current = setTimeout(() => {
              isPrimedForSecondScrollRef.current = false;
            }, 3800);
            return;
          }
          isPrimedForSecondScrollRef.current = false;
          if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
          nextSlide();
          return;
        }
        if (current === totalSlides - 1) {
          setFooterOpen(true);
        } else {
          nextSlide();
        }
      } else if (e.key === 'ArrowUp') {
        const activeSlide = slidesRef.current[current];
        if (activeSlide && activeSlide.scrollHeight > activeSlide.clientHeight + 8) {
          const isAtTop = activeSlide.scrollTop <= 8;
          if (!isAtTop) {
            activeSlide.scrollBy({ top: -120, behavior: 'smooth' });
            return;
          }
        }
        prevSlide();
      } else if (e.key === 'Escape') {
        if (current === 1 && identifyMode === 'coming-soon' && identifyBackRef.current) {
          identifyBackRef.current();
          return;
        }
        if (footerOpen) setFooterOpen(false);
        else setMenuOpen(false);
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

      const activeSlide = slidesRef.current[current];
      const isScrollable = activeSlide ? (activeSlide.scrollHeight > activeSlide.clientHeight + 8) : false;
      const isAtBottom = activeSlide ? (activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - 10) : true;
      const isAtTop = activeSlide ? (activeSlide.scrollTop <= 8) : true;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 28) {
          if (diffX > 0) nextSlide();
          else prevSlide();
        }
      } else {
        if (diffY > 55 && (!isScrollable || isAtBottom)) {
          if (current === 1) {
            if (!isPrimedForSecondScrollRef.current) {
              isPrimedForSecondScrollRef.current = true;
              if (!selectedPersona) {
                identifyPromptRef.current?.();
              }
              if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
              secondScrollExpireTimerRef.current = setTimeout(() => {
                isPrimedForSecondScrollRef.current = false;
              }, 3800);
              return;
            }
            isPrimedForSecondScrollRef.current = false;
            if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
            nextSlide();
            return;
          }
          if (!bottomPrimedRef.current) {
            bottomPrimedRef.current = true;
            if (bottomPrimeTimerRef.current) clearTimeout(bottomPrimeTimerRef.current);
            bottomPrimeTimerRef.current = setTimeout(() => {
              bottomPrimedRef.current = false;
            }, 2200);
            return;
          }
          bottomPrimedRef.current = false;
          nextSlide();
        } else if (diffY < -55 && (!isScrollable || isAtTop)) {
          if (!topPrimedRef.current) {
            topPrimedRef.current = true;
            if (topPrimeTimerRef.current) clearTimeout(topPrimeTimerRef.current);
            topPrimeTimerRef.current = setTimeout(() => {
              topPrimedRef.current = false;
            }, 2200);
            return;
          }
          topPrimedRef.current = false;
          prevSlide();
        }
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
      if (bottomPrimeTimerRef.current) clearTimeout(bottomPrimeTimerRef.current);
      if (topPrimeTimerRef.current) clearTimeout(topPrimeTimerRef.current);
    };
  }, [current, totalSlides, footerOpen, nextSlide, prevSlide, triggerButtonNudge]);

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
          className={`slide-item bg-[#090807] text-slate-100 relative overflow-hidden select-text ${
            current === 1 ? 'quill-active-slide' : ''
          }`}
        >
          <Identify
            isActive={current === 1}
            onSelectPersona={(p) => setSelectedPersona(p)}
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

        {/* SLIDE 2: GET IN TOUCH (Direct Speaking Desk & Booking) */}
        <div
          ref={(el) => { slidesRef.current[2] = el; }}
          className="slide-item bg-[#090807] text-slate-100 relative overflow-y-auto overflow-x-hidden select-text"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(223,165,71,0.06),transparent_65%)] pointer-events-none" />
          <GetInTouch
            selectedPersona={selectedPersona}
            onBackToPathway={() => goToSlide(1, 'backward')}
          />
        </div>
      </div>

      {/* LUXURY MASTER FOOTER DRAWER */}
      <Footer
        isOpen={footerOpen}
        onClose={() => setFooterOpen(false)}
        onNavigateSlide={(idx) => {
          setFooterOpen(false);
          goToSlide(idx);
        }}
      />

      {/* FLOATING CORNER CONTROLS */}
      <div data-chrome="true" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => {
              if (current > 0) prevSlide();
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
              if (current === 1) {
                if (!isPrimedForSecondScrollRef.current) {
                  isPrimedForSecondScrollRef.current = true;
                  if (!selectedPersona) {
                    identifyPromptRef.current?.();
                  }
                  if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
                  secondScrollExpireTimerRef.current = setTimeout(() => {
                    isPrimedForSecondScrollRef.current = false;
                  }, 3800);
                  return;
                }
                isPrimedForSecondScrollRef.current = false;
                if (secondScrollExpireTimerRef.current) clearTimeout(secondScrollExpireTimerRef.current);
                nextSlide();
                return;
              }
              if (current === totalSlides - 1 && !footerOpen) {
                setFooterOpen(true);
              } else {
                nextSlide();
              }
            }}
            className="w-9 h-9 rounded-full bg-[#18130f]/90 border border-amber-500/40 flex items-center justify-center shadow-lg transition-all hover:bg-[#251e18] text-slate-200 hover:text-white cursor-pointer"
            aria-label="Next Slide / Open Footer"
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
              03 &bull; Get In Touch
            </button>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
            >
              04 &bull; Sign Up / Register
            </Link>
            <button
              onClick={() => {
                setFooterOpen(true);
                setMenuOpen(false);
              }}
              className="block w-full py-3 text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              05 &bull; Master Sanctum &amp; Footer
            </button>
          </div>

          <div className="text-center text-xs text-slate-400 pt-4 border-t border-amber-500/20">
            &copy; 2026 Pranav Mahajan Official &bull; Wisdom &bull; Leadership &bull; Stillness
          </div>
        </div>
      )}
    </div>
  );
}
