'use client';

import React, { useEffect, useRef } from 'react';

interface MaskedPortalCanvasProps {
  currentSlide: number;
  word: string;
}

export default function MaskedPortalCanvas({ currentSlide, word }: MaskedPortalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 1200);
    const height = (canvas.height = 700);

    // Warm, radiant solar palettes for Motivational Speaker & Spiritual Guru
    const palettes = [
      ['#f59e0b', '#d97706', '#fbbf24', '#ea580c', '#fef3c7'], // Slide 0: AWAKEN (Golden Solar Awakening)
      ['#ea580c', '#d97706', '#f97316', '#dc2626', '#ffedd5'], // Slide 1: RESILIENCE (Fiery Willpower)
      ['#0284c7', '#0369a1', '#38bdf8', '#0ea5e9', '#e0f2fe'], // Slide 2: LEADERSHIP (Clarity & Vision)
      ['#059669', '#047857', '#10b981', '#34d399', '#d1fae5'], // Slide 3: WISDOM (Serene Vedic Zen)
      ['#d97706', '#ea580c', '#f59e0b', '#c2410c', '#fef3c7'], // Slide 4: CONNECT (Radiant Global Unity)
    ];

    let t = 0;
    const activePalette = palettes[currentSlide % palettes.length];

    // High performance flowing light orbs
    const orbs = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2.2,
      vy: (Math.random() - 0.5) * 2.2,
      r: Math.random() * 90 + 40,
      color: activePalette[Math.floor(Math.random() * activePalette.length)],
    }));

    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Warm radiant base
      ctx.fillStyle = '#fffdf9';
      ctx.fillRect(0, 0, width, height);

      // Render glowing plasma inside text
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        o.x += Math.sin(t + i) * 2.5 + o.vx;
        o.y += Math.cos(t + i) * 2.5 + o.vy;

        if (o.x < -100) o.x = width + 100;
        if (o.x > width + 100) o.x = -100;
        if (o.y < -100) o.y = height + 100;
        if (o.y > height + 100) o.y = -100;

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(0.6, o.color + 'aa');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentSlide]);

  return (
    <div className="relative w-full h-[320px] sm:h-[460px] md:h-[560px] flex items-center justify-center light-portal-wrapper">
      {/* Offscreen Live Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-0 pointer-events-none"
      />

      {/* 
        SVG with Mask: Video/Plasma plays INSIDE the bold text and cutout geometry!
        Styled for the bright luxury light theme.
      */}
      <svg
        viewBox="0 0 1000 580"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={`light-portal-mask-${currentSlide}`} x="0" y="0" width="1000" height="580">
            {/* Black background masks out canvas */}
            <rect x="0" y="0" width="1000" height="580" fill="black" />

            {/* Giant Cutout Typography where the glowing animation shows INSIDE */}
            <text
              x="500"
              y="320"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="900"
              fontSize="160"
              letterSpacing="6"
              fill="white"
            >
              {word}
            </text>

            {/* Architectural accent cuts */}
            <rect x="240" y="80" width="520" height="4" fill="white" rx="2" />
            <rect x="340" y="500" width="320" height="4" fill="white" rx="2" />
            <circle cx="500" cy="80" r="12" fill="white" />
            <circle cx="500" cy="500" r="10" fill="white" />
          </mask>
        </defs>

        {/* Ambient frosted glass container with warm amber border */}
        <rect
          x="80"
          y="30"
          width="840"
          height="520"
          rx="36"
          fill="rgba(255, 255, 255, 0.85)"
          stroke="rgba(217, 119, 6, 0.28)"
          strokeWidth="1.5"
        />

        {/* ForeignObject rendering the radiant glowing plasma strictly INSIDE the text mask */}
        <foreignObject
          x="0"
          y="0"
          width="1000"
          height="580"
          mask={`url(#light-portal-mask-${currentSlide})`}
        >
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7),transparent_60%)] animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/20 to-black/10" />
          </div>
        </foreignObject>

        {/* Crisp golden typography outline overlay */}
        <text
          x="500"
          y="320"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-geist-sans), sans-serif"
          fontWeight="900"
          fontSize="160"
          letterSpacing="6"
          fill="none"
          stroke="#d97706"
          strokeWidth="2.5"
          className="pointer-events-none"
        >
          {word}
        </text>
      </svg>
    </div>
  );
}
