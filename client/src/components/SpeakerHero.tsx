'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Play, Award, Globe, Users, HeartHandshake } from 'lucide-react';

export default function SpeakerHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Warm golden sparks floating upwards like embers of inspiration
    interface Ember {
      x: number;
      y: number;
      vy: number;
      vx: number;
      radius: number;
      alpha: number;
      color: string;
    }

    const embers: Ember[] = [];
    const emberColors = ['#f59e0b', '#d97706', '#fbbf24', '#f97316'];
    const count = Math.min(Math.floor(width / 24), 50);

    for (let i = 0; i < count; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(Math.random() * 0.7 + 0.3),
        vx: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.6 + 0.25,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx;

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.globalAlpha = e.alpha;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#fffdf9] via-[#faf8f5] to-[#f5f1eb]">
      {/* Warm Golden Embers Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
        aria-hidden="true"
      />

      {/* Sunbeam Radiant Glows */}
      <div className="sunbeam-orb-gold w-[600px] h-[600px] -top-32 -left-32 opacity-70" />
      <div className="sunbeam-orb-rose w-[650px] h-[650px] top-1/4 -right-40 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Distinction Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full light-glass-panel border border-amber-300/60 text-xs font-bold text-amber-800 uppercase tracking-widest mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Global Keynote Speaker &bull; Mindset Architect &bull; Spiritual Mentor
        </div>

        {/* Commanding Keynote Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6 max-w-5xl mx-auto">
          Awaken Your Inner Power. <br />
          <span className="gradient-gold-text">Master Your Mind.</span> <br />
          Transcend Every Limit.
        </h1>

        {/* Speaker Mission & Bio */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          I am <strong className="text-slate-900 font-semibold">Pranav Mahajan</strong>. For over a
          decade, I have guided Fortune 500 executives, world athletes, and visionary creators to
          dissolve subconscious fear, attain inner stillness, and lead with fearless authenticity.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 hover:from-amber-700 hover:to-orange-600 transition-all duration-300 shadow-xl shadow-amber-600/25 hover:shadow-2xl hover:shadow-amber-600/35 hover:-translate-y-0.5"
          >
            Check Keynote Availability
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#wisdom"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-slate-700 light-glass-panel hover:bg-white hover:text-amber-700 transition-all duration-300 border border-amber-200/60 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            Receive Daily Wisdom Spark
          </a>
        </div>

        {/* Global Authority Metrics Strip */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl light-glass-panel border border-amber-200/50 shadow-lg text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">500K+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Minds Transformed</div>
          </div>
          <div className="p-3 border-l border-amber-200/40">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">180+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Keynotes Delivered</div>
          </div>
          <div className="p-3 border-l border-amber-200/40">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">24+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Countries Toured</div>
          </div>
          <div className="p-3 border-l border-amber-200/40">
            <div className="text-2xl sm:text-3xl font-black text-orange-600 tracking-tight">4.98 / 5</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Keynote Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
