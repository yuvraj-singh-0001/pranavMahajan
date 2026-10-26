'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface QuillCursorProps {
  isActive: boolean;
}

export default function QuillCursor({ isActive }: QuillCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverSpecialChrome, setIsOverSpecialChrome] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoverSupportedRef = useRef(true);

  // Mount on client
  useEffect(() => {
    setMounted(true);
    isHoverSupportedRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  // 6-second idle timer
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 6000);
  }, []);

  useEffect(() => {
    if (!isActive || !isHoverSupportedRef.current) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      setIsVisible(false);
      setIsIdle(false);
      setIsOverSpecialChrome(false);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('quill-mode');
        document.body.classList.remove('quill-mode');
        document.body.style.cursor = '';
      }
      return;
    }

    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('quill-mode');
      document.body.classList.add('quill-mode');
      document.body.style.cursor = 'none';
    }

    const checkSpecialChrome = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      // Only special external navigation chrome (top navbar / header, footer drawer, corner chevrons)
      // shows the real pointer hand. Everywhere else (all text, cards, buttons, parchment), only the Quill pen is visible!
      const isChrome = Boolean(
        target?.closest('header, nav, footer, [data-chrome="true"], [data-footer="true"]')
      );
      setIsOverSpecialChrome(isChrome);
      if (typeof document !== 'undefined') {
        if (isChrome) {
          document.body.style.cursor = '';
        } else {
          document.body.style.cursor = 'none';
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      resetIdleTimer();
      checkSpecialChrome(e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      resetIdleTimer();

      // Golden ink ripple on click at the nib tip
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const isChrome = Boolean(
        target?.closest('header, nav, footer, [data-chrome="true"], [data-footer="true"]')
      );
      if (!isChrome) {
        const newRipple = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setRipples((prev) => [...prev.slice(-3), newRipple]);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      resetIdleTimer();
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsIdle(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      resetIdleTimer();
      checkSpecialChrome(e);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('quill-mode');
        document.body.classList.remove('quill-mode');
        document.body.style.cursor = '';
      }
    };
  }, [isActive, resetIdleTimer]);

  // Clean ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 550);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!mounted || !isActive || !pos || !isVisible || !isHoverSupportedRef.current) {
    return null;
  }

  // 2X Bada Majestic Quill Pen: 140px width, 93.3px height (original 1536x1024 ratio)
  // Nib / tip is at the bottom-left corner of the feather
  const tipOffsetX = 2.2;
  const tipOffsetY = 90;

  const content = (
    <>
      {/* 1. Subtle Golden Calligraphy Ink Ripple on Click */}
      {!isOverSpecialChrome &&
        ripples.map((r) => (
          <span
            key={r.id}
            className="fixed pointer-events-none rounded-full z-[999998] animate-ping"
            style={{
              left: `${r.x - 8}px`,
              top: `${r.y - 8}px`,
              width: '16px',
              height: '16px',
              background: 'radial-gradient(circle, rgba(223, 165, 71, 0.95) 0%, rgba(223, 165, 71, 0) 70%)',
              boxShadow: '0 0 12px rgba(223, 165, 71, 0.8)',
            }}
          />
        ))}

      {/* 2. Master 2X Antique Golden Quill Pen Cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none ${
          isOverSpecialChrome ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        style={{
          transform: `translate3d(${pos.x - tipOffsetX}px, ${pos.y - tipOffsetY}px, 0)`,
          transition: isOverSpecialChrome ? 'opacity 0.15s ease-out, transform 0.15s ease-out' : 'none',
        }}
      >
        <div
          className={`relative transition-transform duration-100 ease-out ${
            isClicking
              ? 'scale-[0.93] rotate-[-7deg] translate-y-[3px] translate-x-[1px]'
              : isIdle
              ? 'animate-quill-idle'
              : ''
          }`}
          style={{
            transformOrigin: `${tipOffsetX}px ${tipOffsetY}px`,
          }}
        >
          {/* Subtle golden ambient aura when idle (> 6s) */}
          {isIdle && (
            <div
              className="absolute inset-0 rounded-full bg-amber-400/25 blur-md pointer-events-none animate-pulse"
              style={{ transform: 'scale(1.15)' }}
            />
          )}

          {/* Genuine Antique Golden Quill Pen Asset (2X Size: 140px width) */}
          <img
            src="/Antique%20Golden%20Quill%20Pen.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="w-[140px] h-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.75)] drop-shadow-[0_0_12px_rgba(223,165,71,0.5)] select-none pointer-events-none"
          />

          {/* Golden precision ink-point tip beacon */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${tipOffsetX - 2}px`,
              top: `${tipOffsetY - 2}px`,
              width: '4px',
              height: '4px',
              backgroundColor: '#dfa547',
              boxShadow: '0 0 8px #ffe29a',
            }}
          />
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}
