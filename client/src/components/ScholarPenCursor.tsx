'use client';

import React, { useEffect, useState, useRef, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

interface ScholarPenCursorProps {
  isActive: boolean;
}

interface InkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface LaserSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
}

const subscribeToNothing = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ScholarPenCursor({ isActive }: ScholarPenCursorProps) {
  const mounted = useSyncExternalStore(subscribeToNothing, getClientSnapshot, getServerSnapshot);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isOverSpecialChrome, setIsOverSpecialChrome] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inkDots, setInkDots] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [penWidth, setPenWidth] = useState(104);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<InkParticle[]>([]);
  const laserSegmentsRef = useRef<LaserSegment[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastEmitPosRef = useRef<{ x: number; y: number } | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoverSupportedRef = useRef(true);
  const touchHideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const moveGlowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cursorElementRef = useRef<HTMLDivElement | null>(null);
  const cursorMoveFrameRef = useRef<number | null>(null);
  const pendingPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasPositionRef = useRef(false);
  const penWidthRef = useRef(104);

  // Audio Context for soft fountain pen paper write stroke
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playPenStrokeSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Soft paper scratch/fountain pen nib contact
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.value = 3.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.04);
    } catch {
      // Audio is an enhancement
    }
  };

  useEffect(() => {
    isHoverSupportedRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const updatePenWidth = () => {
      const nextWidth = window.matchMedia('(max-width: 639px)').matches ? 76 : 104;
      penWidthRef.current = nextWidth;
      setPenWidth(nextWidth);
    };
    updatePenWidth();
    window.addEventListener('resize', updatePenWidth);
    return () => window.removeEventListener('resize', updatePenWidth);
  }, []);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 4000);
  }, []);

  const queueCursorPosition = useCallback((x: number, y: number) => {
    pendingPositionRef.current = { x, y };
    if (!hasPositionRef.current) {
      hasPositionRef.current = true;
      setPos({ x, y });
    }
    setIsVisible(true);
    if (cursorMoveFrameRef.current !== null) return;
    cursorMoveFrameRef.current = requestAnimationFrame(() => {
      cursorMoveFrameRef.current = null;
      const point = pendingPositionRef.current;
      const cursor = cursorElementRef.current;
      if (!point || !cursor) return;
      const width = penWidthRef.current;
      cursor.style.transform = `translate3d(${point.x - (188 / 1080) * width}px, ${point.y - (899 / 1080) * width}px, 0)`;
    });
  }, []);

  useEffect(() => {
    const point = pendingPositionRef.current;
    const cursor = cursorElementRef.current;
    if (!point || !cursor) return;
    cursor.style.transform = `translate3d(${point.x - (188 / 1080) * penWidth}px, ${point.y - (899 / 1080) * penWidth}px, 0)`;
  }, [isVisible, penWidth]);

  // Canvas golden ink calligraphy trail loop
  useEffect(() => {
    if (!isActive || !isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#dfa547';
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      const laserSegments = laserSegmentsRef.current;
      for (let i = laserSegments.length - 1; i >= 0; i--) {
        const segment = laserSegments[i];
        segment.alpha -= 0.035;
        if (segment.alpha <= 0) {
          laserSegments.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = segment.alpha;
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#ffd66b';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ffb21c';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(segment.x1, segment.y1);
        ctx.lineTo(segment.x2, segment.y2);
        ctx.stroke();
        ctx.strokeStyle = '#fff6ce';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 7;
        ctx.stroke();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, isVisible]);

  // Spawn golden ink trail
  const spawnInk = useCallback((x: number, y: number, isDot = false) => {
    const colors = ['#fffbeb', '#fef08a', '#dfa547', '#f59e0b', '#d97706'];
    const count = isDot ? 8 : 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isDot ? Math.random() * 1.8 + 0.8 : Math.random() * 0.6 + 0.2;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 3,
        y: y + (Math.random() - 0.5) * 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isDot ? 0 : 0.25),
        size: isDot ? Math.random() * 2.2 + 1.2 : Math.random() * 1.8 + 0.9,
        alpha: 0.9,
        decay: isDot ? Math.random() * 0.03 + 0.02 : Math.random() * 0.04 + 0.025,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    if (particlesRef.current.length > 50) {
      particlesRef.current.splice(0, particlesRef.current.length - 50);
    }
  }, []);

  const spawnLaserTrail = useCallback((x: number, y: number) => {
    const last = lastEmitPosRef.current;
    if (last && Math.hypot(x - last.x, y - last.y) > 2) {
      laserSegmentsRef.current.push({ x1: last.x, y1: last.y, x2: x, y2: y, alpha: 0.95 });
      if (laserSegmentsRef.current.length > 90) laserSegmentsRef.current.splice(0, 30);
    }
    lastEmitPosRef.current = { x, y };
    spawnInk(x, y, false);
  }, [spawnInk]);

  useEffect(() => {
    if (!isActive) {
      hasPositionRef.current = false;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('quill-mode');
        document.body.classList.remove('quill-mode');
        document.body.style.cursor = '';
      }
      return;
    }

    if (typeof document !== 'undefined' && isHoverSupportedRef.current) {
      document.documentElement.classList.add('quill-mode');
      document.body.classList.add('quill-mode');
      document.body.style.cursor = 'none';
    }

    const checkInteractiveAndChrome = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isChrome = Boolean(
        target?.closest?.('header, nav, footer, [data-chrome="true"], [data-footer="true"]')
      );
      setIsOverSpecialChrome(isChrome);

      const isInteractive = Boolean(
        target?.closest?.(
          'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-interactive="true"]'
        )
      );
      setIsHoveringInteractive(isInteractive);

      if (typeof document !== 'undefined' && isHoverSupportedRef.current) {
        document.body.style.cursor = isChrome ? '' : 'none';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      queueCursorPosition(clientX, clientY);
      setIsMoving(true);
      if (moveGlowTimerRef.current) clearTimeout(moveGlowTimerRef.current);
      moveGlowTimerRef.current = setTimeout(() => setIsMoving(false), 180);
      resetIdleTimer();
      checkInteractiveAndChrome(e);

      spawnLaserTrail(clientX, clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      resetIdleTimer();
      playPenStrokeSound();
      spawnInk(e.clientX, e.clientY, true);

      const newDot = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setInkDots((prev) => [...prev.slice(-3), newDot]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      resetIdleTimer();
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      hasPositionRef.current = false;
      setIsIdle(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      queueCursorPosition(e.clientX, e.clientY);
      resetIdleTimer();
      checkInteractiveAndChrome(e);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (touchHideTimerRef.current) clearTimeout(touchHideTimerRef.current);
      queueCursorPosition(touch.clientX, touch.clientY);
      lastEmitPosRef.current = { x: touch.clientX, y: touch.clientY };
      setIsClicking(true);
      spawnInk(touch.clientX, touch.clientY, true);
      setInkDots((prev) => [...prev.slice(-3), { id: Date.now() + Math.random(), x: touch.clientX, y: touch.clientY }]);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      queueCursorPosition(touch.clientX, touch.clientY);
      setIsMoving(true);
      if (moveGlowTimerRef.current) clearTimeout(moveGlowTimerRef.current);
      moveGlowTimerRef.current = setTimeout(() => setIsMoving(false), 180);
      spawnLaserTrail(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      setIsClicking(false);
      lastEmitPosRef.current = null;
      touchHideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        hasPositionRef.current = false;
      }, 550);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (touchHideTimerRef.current) clearTimeout(touchHideTimerRef.current);
      if (moveGlowTimerRef.current) clearTimeout(moveGlowTimerRef.current);
      if (cursorMoveFrameRef.current !== null) cancelAnimationFrame(cursorMoveFrameRef.current);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('quill-mode');
        document.body.classList.remove('quill-mode');
        document.body.style.cursor = '';
      }
    };
  }, [isActive, queueCursorPosition, resetIdleTimer, spawnInk, spawnLaserTrail]);

  // Clean ink ripple dots
  useEffect(() => {
    if (inkDots.length === 0) return;
    const timer = setTimeout(() => {
      setInkDots((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [inkDots]);

  if (!mounted || !isActive || !pos || !isVisible) {
    return null;
  }

  // Anchor to the visible nib in the source PNG's 1080×949 canvas.
  const tipOffsetX = (188 / 1080) * penWidth;
  const tipOffsetY = (899 / 1080) * penWidth;

  const content = (
    <>
      {/* 1. Golden Calligraphy Ink Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[999998]"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* 2. Golden Ink Click Ripples */}
      {!isOverSpecialChrome &&
        inkDots.map((d) => (
          <span
            key={d.id}
            className="fixed pointer-events-none rounded-full z-[999998] animate-ping"
            style={{
              left: `${d.x - 7}px`,
              top: `${d.y - 7}px`,
              width: '14px',
              height: '14px',
              background: 'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(223, 165, 71, 0.4) 60%, transparent 100%)',
              boxShadow: '0 0 14px rgba(223, 165, 71, 0.85)',
            }}
          />
        ))}

      {/* 3. Master Scholar's Golden Fountain Pen Nib (Real PNG Asset) */}
      <div
        ref={cursorElementRef}
        className={`fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none ${
          isOverSpecialChrome ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        style={{
          transition: isOverSpecialChrome ? 'opacity 0.15s ease-out, transform 0.15s ease-out' : 'none',
        }}
      >
        <div
          className="relative"
          style={{
            transformOrigin: `${tipOffsetX}px ${tipOffsetY}px`,
            transform: isClicking
              ? 'scale(0.92) rotate(-8deg)'
              : isHoveringInteractive
              ? 'scale(1.06) rotate(4deg)'
              : isIdle
              ? 'scale(1.02) rotate(-2deg)'
              : 'scale(1) rotate(0deg)',
            transition: 'transform 0.14s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
          }}
        >
          {/* Soft moving aura stays centered on the exact writing tip */}
          <div
            className={`absolute rounded-full pointer-events-none blur-md ${isIdle ? 'animate-pulse' : ''}`}
            style={{
              left: `${tipOffsetX - 25}px`,
              top: `${tipOffsetY - 25}px`,
              width: '50px',
              height: '50px',
              opacity: isMoving || isHoveringInteractive || isIdle ? 0.72 : 0.24,
              background: 'radial-gradient(circle, rgba(255,226,154,0.9) 0%, rgba(223,165,71,0.42) 38%, transparent 74%)',
              transition: 'opacity 220ms ease, transform 320ms ease',
              transform: isMoving || isHoveringInteractive ? 'scale(1.22)' : 'scale(0.92)',
            }}
          />

          {/* Luxury gold and black ballpoint used as the student cursor */}
          <img
            src="/Luxury%20Gold%20and%20Black%20Ballpoint%20Pen%20(1).png"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{ width: `${penWidth}px` }}
            className="h-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] drop-shadow-[0_0_18px_rgba(223,165,71,0.65)] select-none pointer-events-none"
          />

          {/* Precision Iridium Tip Gleam */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${tipOffsetX}px`,
              top: `${tipOffsetY}px`,
              width: '3px',
              height: '3px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 8px #fef08a, 0 0 14px #dfa547',
            }}
          />
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}
