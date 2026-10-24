'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Code2, Terminal, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function ParticleHero() {
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

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(width / 18), 75);

    const colors = ['#38bdf8', '#818cf8', '#c084fc', '#34d399'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off edges
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse gentle gravity
        const dxMouse = mouseX - p1.x;
        const dyMouse = mouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p1.x += (dxMouse / distMouse) * 0.4;
          p1.y += (dyMouse / distMouse) * 0.4;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#818cf8';
            ctx.globalAlpha = (1 - dist / 120) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
        aria-hidden="true"
      />

      {/* Ambient background glow orbs */}
      <div className="glow-orb-cyan w-[500px] h-[500px] -top-32 -left-32 opacity-40 animate-pulse-glow" />
      <div className="glow-orb-purple w-[600px] h-[600px] top-1/3 -right-32 opacity-35" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-medium text-cyan-300 mb-8 shadow-lg shadow-cyan-950/40">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Next.js 15 &bull; Node.js Architecture &bull; 100/100 Core Web Vitals
        </div>

        {/* Hero Title with High Impact */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 max-w-5xl mx-auto">
          Architecting High-Speed <br />
          <span className="gradient-accent">Fullstack Web Systems</span> &amp; Modern Experiences
        </h1>

        {/* Hero Description with Clear Value */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          I am <strong className="text-white font-semibold">Pranav Mahajan</strong> — Senior Fullstack
          Engineer crafting lightning-fast Next.js frontend applications, bulletproof Node.js microservices,
          and organic SEO architectures that rank #1 and convert at scale.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5"
          >
            Explore Featured Work
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-slate-200 glass-panel hover:bg-white/[0.08] hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            Request Project Consultation
          </a>
        </div>

        {/* Terminal Card Preview */}
        <div className="max-w-2xl mx-auto rounded-2xl glass-panel border border-white/10 shadow-2xl text-left overflow-hidden">
          <div className="bg-[#0b1021]/90 px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[11px] text-slate-400 font-mono ml-2">pranav@production-cluster:~$</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SYSTEM HEALTH: 100%
            </div>
          </div>
          <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-2">
            <p className="text-slate-400">
              <span className="text-purple-400">const</span> stack = &#123;
            </p>
            <p className="pl-4">
              <span className="text-cyan-400">frontend:</span> &apos;Next.js 15 (App Router, Turbopack, SSR)&apos;,
            </p>
            <p className="pl-4">
              <span className="text-cyan-400">backend:</span> &apos;Node.js &bull; Express &bull; Microservices&apos;,
            </p>
            <p className="pl-4">
              <span className="text-cyan-400">performance:</span> &apos;Lighthouse 100/100 Core Web Vitals&apos;,
            </p>
            <p className="pl-4">
              <span className="text-cyan-400">seo_optimization:</span> &apos;Dynamic JSON-LD &bull; Schema &bull; SSR&apos;,
            </p>
            <p className="pl-4">
              <span className="text-cyan-400">delivery_speed:</span> &apos;Instant TTFB &lt; 85ms&apos;
            </p>
            <p className="text-slate-400">&#125;;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
