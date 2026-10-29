'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface GoldenKeyCursorProps {
  isActive: boolean;
}

interface StardustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  isSpark: boolean;
}

export default function GoldenKeyCursor({ isActive }: GoldenKeyCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isOverSpecialChrome, setIsOverSpecialChrome] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<StardustParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastEmitPosRef = useRef<{ x: number; y: number } | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoverSupportedRef = useRef(true);

  // Audio Context for authentic brass key tumbler click
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playKeyClickSound = () => {
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

      // 1. High metallic brass contact tap
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);

      oscGain.gain.setValueAtTime(0.08, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);

      // 2. Heavy tumblers mechanical lock engagement
      const osc2 = ctx.createOscillator();
      const osc2Gain = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(480, now + 0.015);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.09);

      osc2Gain.gain.setValueAtTime(0.05, now + 0.015);
      osc2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc2.connect(osc2Gain);
      osc2Gain.connect(ctx.destination);
      osc2.start(now + 0.015);
      osc2.stop(now + 0.09);
    } catch {
      // Audio enhancement safe fallback
    }
  };

  // Mount on client
  useEffect(() => {
    setMounted(true);
    isHoverSupportedRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 3500);
  }, []);

  // Canvas resize and render loop
  useEffect(() => {
    if (!isActive || !isHoverSupportedRef.current) return;

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
        ctx.shadowBlur = p.isSpark ? 10 : 5;

        if (p.isSpark) {
          // Celestial diamond spark
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Cross twinkle
          ctx.strokeStyle = '#fff5cf';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2, p.y);
          ctx.lineTo(p.x + p.size * 2, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2);
          ctx.lineTo(p.x, p.y + p.size * 2);
          ctx.stroke();
        } else {
          // Soft golden ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  // Spawn stardust on mouse movement
  const spawnStardust = (x: number, y: number, isBurst = false) => {
    const colors = ['#ffffff', '#fef08a', '#dfa547', '#f59e0b', '#d97706'];
    const count = isBurst ? 14 : 2;

    for (let i = 0; i < count; i++) {
      const angle = isBurst ? (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4 : Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 2.8 + 1.2 : Math.random() * 0.9 + 0.3;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isBurst ? 0 : 0.4),
        size: isBurst ? Math.random() * 2.5 + 1.5 : Math.random() * 2.2 + 1,
        alpha: 1,
        decay: isBurst ? Math.random() * 0.025 + 0.02 : Math.random() * 0.035 + 0.025,
        color: colors[Math.floor(Math.random() * colors.length)],
        isSpark: isBurst || Math.random() > 0.65,
      });
    }

    if (particlesRef.current.length > 70) {
      particlesRef.current.splice(0, particlesRef.current.length - 70);
    }
  };

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

      if (typeof document !== 'undefined') {
        document.body.style.cursor = isChrome ? '' : 'none';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });
      setIsVisible(true);
      resetIdleTimer();
      checkInteractiveAndChrome(e);

      // Throttle particle emission by distance
      const last = lastEmitPosRef.current;
      if (!last || Math.hypot(clientX - last.x, clientY - last.y) > 12) {
        spawnStardust(clientX, clientY, false);
        lastEmitPosRef.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      resetIdleTimer();
      playKeyClickSound();
      spawnStardust(e.clientX, e.clientY, true);
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
      checkInteractiveAndChrome(e);
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

  if (!mounted || !isActive || !pos || !isVisible || !isHoverSupportedRef.current) {
    return null;
  }

  // Key geometry: Tip of the key (the active picking notch) sits directly at (0, 0) of the mouse pointer
  const content = (
    <>
      {/* 1. Stardust & Celestial Embers Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[999998]"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* 2. Antique Master Key of Potential */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none ${
          isOverSpecialChrome ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: isOverSpecialChrome ? 'opacity 0.15s ease-out, transform 0.15s ease-out' : 'none',
        }}
      >
        <div
          className="relative"
          style={{
            transformOrigin: '2px 2px',
            transform: isClicking
              ? 'rotate(42deg) scale(0.92)'
              : isHoveringInteractive
              ? 'rotate(24deg) scale(1.08)'
              : isIdle
              ? 'rotate(4deg) scale(1.02)'
              : 'rotate(0deg) scale(1)',
            transition: 'transform 0.18s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          }}
        >
          {/* Subtle Celestial Ambient Aura when hovering or idle */}
          {(isHoveringInteractive || isIdle) && (
            <div
              className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-amber-400/30 blur-md pointer-events-none animate-pulse"
              style={{ transform: 'scale(1.3)' }}
            />
          )}

          {/* Precision Royal Master Key Vector Art */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_10px_rgba(223,165,71,0.65)] select-none pointer-events-none"
          >
            <defs>
              {/* Metallic 24K Brushed Gold Shading */}
              <linearGradient id="royalGoldKey" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="18%" stopColor="#fef08a" />
                <stop offset="42%" stopColor="#dfa547" />
                <stop offset="70%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <linearGradient id="innerFiligreeGold" x1="28" y1="28" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#dfa547" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>

              <filter id="keyGlint" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* A. KEY BIT (The antique notched teeth at top-left) */}
            {/* Main shaft line from (4, 4) to (38, 38) */}
            <path
              d="M 2 2 L 6 6 L 5 11 L 8 10 L 9 14 L 13 13 L 14 17 L 17 14 L 38 35"
              stroke="url(#royalGoldKey)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* B. ENGRAVED SHAFT COLLARS / RINGS */}
            <circle cx="20" cy="20" r="2.6" fill="url(#royalGoldKey)" />
            <circle cx="25" cy="25" r="2.2" fill="url(#royalGoldKey)" />

            {/* C. ORNATE ROYAL CREST BOW (Key Handle at bottom-right) */}
            {/* Outer Clover Filigree Ring */}
            <circle
              cx="40"
              cy="40"
              r="10.5"
              stroke="url(#royalGoldKey)"
              strokeWidth="2.8"
              fill="rgba(24, 18, 11, 0.65)"
            />
            {/* Inner Filigree Ring */}
            <circle
              cx="40"
              cy="40"
              r="7"
              stroke="url(#innerFiligreeGold)"
              strokeWidth="1.4"
              strokeDasharray="2 1.5"
              fill="none"
            />

            {/* Center Celestial Star Cutout ❖ */}
            <path
              d="M 40 34.5 L 41.5 38.5 L 45.5 40 L 41.5 41.5 L 40 45.5 L 38.5 41.5 L 34.5 40 L 38.5 38.5 Z"
              fill="url(#royalGoldKey)"
            />

            {/* Top Crown Knot on Handle */}
            <circle cx="48.5" cy="48.5" r="2" fill="url(#royalGoldKey)" />
            <circle cx="49" cy="33" r="1.5" fill="url(#royalGoldKey)" />
            <circle cx="33" cy="49" r="1.5" fill="url(#royalGoldKey)" />

            {/* D. TIP ACTIVE BEACON (Hotspot at exactly (2, 2)) */}
            <circle
              cx="2"
              cy="2"
              r="2"
              fill="#ffffff"
              filter="url(#keyGlint)"
            />
            <circle
              cx="2"
              cy="2"
              r="1"
              fill="#fef08a"
            />
          </svg>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}

