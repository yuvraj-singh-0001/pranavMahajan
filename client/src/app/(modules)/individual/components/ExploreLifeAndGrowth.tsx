'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TOPICS, type TopicItem } from '@/data/topicsData';

// Module-level static filtered arrays (prevents re-creation on every render)
const LEFT_TOPICS = TOPICS.filter((t) => t.column === 'left');
const RIGHT_TOPICS = TOPICS.filter((t) => t.column === 'right');

interface FlowerConnectorData {
  stemPath: string; // The organic curved stem from infinity loop
  midBeadX: number; // Mid-stem bead
  midBeadY: number;
  startX: number; // Point on infinity loop
  startY: number;
  endX: number; // Point where stem reaches card edge
  endY: number;
  accent: string;
  id: string;
  side: 'left' | 'right';
  seqIndex: number; // Sequential animation order (0 to 9)
}

export interface ExploreLifeAndGrowthProps {
  id?: string;
  dataUrlSection?: string;
  className?: string;
}

export default function ExploreLifeAndGrowth({
  id = 'top',
  dataUrlSection = 'top',
  className = '',
}: ExploreLifeAndGrowthProps = {}) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rightCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [connectors, setConnectors] = useState<{
    left: FlowerConnectorData[];
    right: FlowerConnectorData[];
    svgWidth: number;
    svgHeight: number;
  }>({ left: [], right: [], svgWidth: 1200, svgHeight: 650 });

  // Calculates smooth curved Bezier lines from the 3D infinity loop directly to card edges
  const recalculateConnectors = useCallback(() => {
    if (!containerRef.current || !centerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const infRect = centerRef.current.getBoundingClientRect();

    if (cRect.width === 0 || cRect.height === 0) return;

    // Center coordinates of the Infinity Loop component
    const infCenterX = infRect.left - cRect.left + infRect.width / 2;
    const infCenterY = infRect.top - cRect.top + infRect.height / 2 + 10;
    const loopRadiusX = infRect.width * 0.32;
    const loopRadiusY = infRect.height * 0.28;

    const leftData: FlowerConnectorData[] = [];
    leftCardRefs.current.forEach((el, index) => {
      if (!el) return;
      const cardRect = el.getBoundingClientRect();
      const topic = LEFT_TOPICS[index];
      if (!topic) return;

      // Origin on the outer rim of the left infinity loop
      const angleRad = (topic.loopAngle * Math.PI) / 180;
      const startX = infCenterX - loopRadiusX * 0.78 + Math.cos(angleRad + Math.PI) * (loopRadiusX * 0.44);
      const startY = infCenterY + Math.sin(angleRad) * (loopRadiusY * 0.88);

      // Card anchor point on its right/inner edge
      const endX = cardRect.right - cRect.left;
      const endY = cardRect.top - cRect.top + cardRect.height / 2;

      // Smooth organic S-curve control points directly from infinity loop to card edge
      const dx = endX - startX;
      const cp1X = startX + dx * 0.42;
      const cp1Y = startY;
      const cp2X = startX + dx * 0.84;
      const cp2Y = endY;

      const stemPath = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

      // Parametric point at t = 0.5 along the cubic Bezier curve for the mid-stem node bead
      const midBeadX = 0.125 * startX + 0.375 * cp1X + 0.375 * cp2X + 0.125 * endX;
      const midBeadY = 0.125 * startY + 0.375 * cp1Y + 0.375 * cp2Y + 0.125 * endY;

      leftData.push({
        stemPath,
        midBeadX,
        midBeadY,
        startX,
        startY,
        endX,
        endY,
        accent: topic.accent,
        id: topic.id,
        side: 'left',
        seqIndex: topic.seqIndex,
      });
    });

    const rightData: FlowerConnectorData[] = [];
    rightCardRefs.current.forEach((el, index) => {
      if (!el) return;
      const cardRect = el.getBoundingClientRect();
      const topic = RIGHT_TOPICS[index];
      if (!topic) return;

      // Origin on the outer rim of the right infinity loop
      const angleRad = (topic.loopAngle * Math.PI) / 180;
      const startX = infCenterX + loopRadiusX * 0.78 + Math.cos(angleRad) * (loopRadiusX * 0.44);
      const startY = infCenterY + Math.sin(angleRad) * (loopRadiusY * 0.88);

      // Card anchor point on its left/inner edge
      const endX = cardRect.left - cRect.left;
      const endY = cardRect.top - cRect.top + cardRect.height / 2;

      // Smooth organic S-curve control points directly from infinity loop to card edge
      const dx = endX - startX;
      const cp1X = startX + dx * 0.42;
      const cp1Y = startY;
      const cp2X = startX + dx * 0.84;
      const cp2Y = endY;

      const stemPath = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

      // Parametric point at t = 0.5 along the cubic Bezier curve for the mid-stem node bead
      const midBeadX = 0.125 * startX + 0.375 * cp1X + 0.375 * cp2X + 0.125 * endX;
      const midBeadY = 0.125 * startY + 0.375 * cp1Y + 0.375 * cp2Y + 0.125 * endY;

      rightData.push({
        stemPath,
        midBeadX,
        midBeadY,
        startX,
        startY,
        endX,
        endY,
        accent: topic.accent,
        id: topic.id,
        side: 'right',
        seqIndex: topic.seqIndex,
      });
    });

    if (leftData.length === LEFT_TOPICS.length && rightData.length === RIGHT_TOPICS.length) {
      setConnectors((prev) => {
        // Prevent unnecessary re-renders if dimensions & endpoints haven't changed
        if (
          prev.left.length === leftData.length &&
          prev.right.length === rightData.length &&
          Math.abs(prev.svgWidth - cRect.width) < 1 &&
          Math.abs(prev.svgHeight - cRect.height) < 1 &&
          Math.abs((prev.left[0]?.endY ?? 0) - (leftData[0]?.endY ?? 0)) < 1
        ) {
          return prev;
        }
        return {
          left: leftData,
          right: rightData,
          svgWidth: cRect.width,
          svgHeight: cRect.height,
        };
      });
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    // Initial measurement after component is attached to DOM
    const timer = setTimeout(() => {
      recalculateConnectors();
    }, 60);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        recalculateConnectors();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          recalculateConnectors();
        }, 150);
      });
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      ro?.disconnect();
    };
  }, [recalculateConnectors]);

  // Combine and sort connectors by sequential order (01 -> 02 -> 03 ... -> 10)
  const allConnectors = [...connectors.left, ...connectors.right].sort(
    (a, b) => a.seqIndex - b.seqIndex
  );

  return (
    <section
      id={id}
      data-url-section={dataUrlSection}
      className={`relative mx-auto w-full max-w-[1880px] min-h-dvh lg:h-dvh lg:max-h-dvh flex flex-col justify-center px-3.5 sm:px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 pt-12 pb-4 sm:pt-14 sm:pb-6 lg:pt-16 lg:pb-6 overflow-hidden ${className}`}
    >
      {/* Background Pastel Waves & Ethereal Fluid Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-violet-200/40 via-purple-100/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-28 h-[550px] w-[550px] rounded-full bg-gradient-to-tl from-cyan-200/35 via-teal-100/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full bg-radial from-indigo-100/30 via-purple-50/15 to-transparent blur-3xl"
      />

      {/* Decorative Pastel Organic Wave Ribbon at Top and Bottom */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 w-full h-24 sm:h-32 opacity-65"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C240 70 480 30 720 55C960 80 1200 20 1440 35V0H0Z"
          fill="url(#top-wave-grad)"
        />
        <defs>
          <linearGradient id="top-wave-grad" x1="0" y1="0" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fae8ff" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 w-full h-24 sm:h-32 opacity-65"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 85C280 50 560 100 840 70C1120 40 1320 85 1440 75V120H0V85Z"
          fill="url(#bottom-wave-grad)"
        />
        <defs>
          <linearGradient id="bottom-wave-grad" x1="0" y1="0" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#f3e8ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#cffafe" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header Area */}
      <div className="relative z-10 mx-auto mb-2 sm:mb-2.5 lg:mb-3 xl:mb-3.5 max-w-3xl text-center shrink-0">
        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-3.5xl xl:text-4xl 2xl:text-4.5xl font-extrabold tracking-tight text-[#1e1b4b]">
          Explore{' '}
          <span className="bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
            Life & Growth
          </span>
        </h1>

        {/* Decorative Wave Underline */}
        <div className="mx-auto mt-1 flex justify-center">
          <svg
            className="h-2.5 w-28 sm:w-36 text-indigo-400/80"
            viewBox="0 0 160 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 9C26 2 48 10 78 4C108 -2 134 10 158 5"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Mindmap Layout Container */}
      <div ref={containerRef} className="relative z-10 mx-auto w-full max-w-[1800px]">
        
        {/* Dynamic Desktop SVG Connectors Canvas with Sequential One-by-One Connection Animation */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block overflow-visible"
          width={connectors.svgWidth}
          height={connectors.svgHeight}
          viewBox={`0 0 ${connectors.svgWidth} ${connectors.svgHeight}`}
        >
          <defs>
            <filter id="flower-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render All Connectors Choreographed in 01 -> 02 -> 03 ... -> 10 order */}
          {allConnectors.map((c) => {
            const isHovered = activeTopic === c.id;
            // Choreographed sequential delay for each line (one by one)
            const startDelay = 220 + c.seqIndex * 140;
            const drawDuration = 620;

            return (
              <g key={`conn-${c.id}`} className="transition-all duration-300">
                {/* 1. Organic Curved Stem Line with One-by-One Sequential Drawing Animation */}
                <path
                  d={c.stemPath}
                  fill="none"
                  stroke={c.accent}
                  strokeWidth={isHovered ? 3.2 : 2.2}
                  strokeOpacity={isHovered ? 1 : 0.85}
                  strokeLinecap="round"
                  filter={isHovered ? 'url(#flower-glow)' : undefined}
                  style={{
                    strokeDasharray: 600,
                    animation: `lineDrawSeq ${drawDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${startDelay}ms both`,
                    transition: 'stroke-width 0.3s, stroke-opacity 0.3s',
                  }}
                />

                {/* 2. Flowing Energy Pulse Stream along the Stem (Starts after line connects) */}
                <path
                  d={c.stemPath}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2.5 : 1.8}
                  strokeLinecap="round"
                  strokeDasharray="18 140"
                  className="energy-stream"
                  style={{
                    animation: `energyFlow ${3.2 + (c.seqIndex % 4) * 0.4}s linear infinite ${startDelay + 650}ms, energyFadeIn 0.5s ease-out ${startDelay + 650}ms both`,
                  }}
                />

                {/* 3. Origin Node Dot on the Infinity Loop Perimeter */}
                <g
                  style={{
                    transformOrigin: `${c.startX}px ${c.startY}px`,
                    animation: `nodePop 360ms cubic-bezier(0.34, 1.56, 0.64, 1) ${startDelay}ms both`,
                  }}
                >
                  <circle
                    cx={c.startX}
                    cy={c.startY}
                    r={isHovered ? 4.8 : 3.6}
                    fill="#ffffff"
                    stroke={c.accent}
                    strokeWidth="2.2"
                  />
                  <circle
                    cx={c.startX}
                    cy={c.startY}
                    r="1.8"
                    fill={c.accent}
                  />
                </g>

                {/* 4. Mid-Stem Small Synaptic Node Ring Bead */}
                <g
                  style={{
                    transformOrigin: `${c.midBeadX}px ${c.midBeadY}px`,
                    animation: `nodePop 360ms cubic-bezier(0.34, 1.56, 0.64, 1) ${startDelay + 300}ms both`,
                  }}
                >
                  <circle
                    cx={c.midBeadX}
                    cy={c.midBeadY}
                    r={isHovered ? 4.2 : 3}
                    fill="#ffffff"
                    stroke={c.accent}
                    strokeWidth="1.8"
                  />
                  <circle
                    cx={c.midBeadX}
                    cy={c.midBeadY}
                    r="1.3"
                    fill={c.accent}
                  />
                </g>

                {/* 5. Terminal Connection Node Bead Right at the Edge of the Card */}
                <g
                  style={{
                    transformOrigin: `${c.endX}px ${c.endY}px`,
                    animation: `nodePop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) ${startDelay + 520}ms both`,
                  }}
                >
                  {/* Pulsing Outer Aura on Hover */}
                  {isHovered && (
                    <circle
                      cx={c.endX}
                      cy={c.endY}
                      r="8"
                      fill={c.accent}
                      opacity="0.4"
                      className="animate-ping"
                    />
                  )}
                  {/* Outer Ring Bead */}
                  <circle
                    cx={c.endX}
                    cy={c.endY}
                    r={isHovered ? 5.5 : 4.2}
                    fill="#ffffff"
                    stroke={c.accent}
                    strokeWidth="2.2"
                  />
                  {/* Inner Jewel Core */}
                  <circle
                    cx={c.endX}
                    cy={c.endY}
                    r="2"
                    fill={c.accent}
                  />
                </g>
              </g>
            );
          })}
        </svg>

        {/* Large Desktop Mindmap Layout (>= lg) with 3 Columns */}
        <div className="relative hidden lg:grid lg:grid-cols-[1fr_240px_1fr] xl:grid-cols-[1fr_290px_1fr] 2xl:grid-cols-[1fr_340px_1fr] lg:items-center lg:gap-3 xl:gap-5 2xl:gap-7">
          
          {/* LEFT COLUMN: 5 Topics */}
          <div className="relative z-10 flex flex-col gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
            {LEFT_TOPICS.map((topic, index) => (
              <TopicCard
                key={topic.id}
                ref={(el) => {
                  leftCardRefs.current[index] = el;
                }}
                topic={topic}
                isHovered={activeTopic === topic.id}
                onMouseEnter={() => setActiveTopic(topic.id)}
                onMouseLeave={() => setActiveTopic(null)}
                animationDelay={220 + topic.seqIndex * 140 + 380}
              />
            ))}
          </div>

          {/* CENTERPIECE: 3D Infinity Loop with Sprouting Leaves */}
          <div ref={centerRef} className="relative z-10 flex flex-col items-center justify-center px-1 py-1">
            <InfinityCenterpiece activeTopicId={activeTopic} />
          </div>

          {/* RIGHT COLUMN: 5 Topics */}
          <div className="relative z-10 flex flex-col gap-2 sm:gap-2.5 xl:gap-3 2xl:gap-3.5">
            {RIGHT_TOPICS.map((topic, index) => (
              <TopicCard
                key={topic.id}
                ref={(el) => {
                  rightCardRefs.current[index] = el;
                }}
                topic={topic}
                isHovered={activeTopic === topic.id}
                onMouseEnter={() => setActiveTopic(topic.id)}
                onMouseLeave={() => setActiveTopic(null)}
                animationDelay={220 + topic.seqIndex * 140 + 380}
              />
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Responsive Layout (< lg) */}
        <div className="flex flex-col gap-5 lg:hidden">
          {/* Centered Infinity visual on mobile */}
          <div className="flex justify-center py-1">
            <InfinityCenterpiece activeTopicId={activeTopic} isMobile />
          </div>

          {/* Clean 2-column or 1-column responsive list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {TOPICS.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isHovered={activeTopic === topic.id}
                onMouseEnter={() => setActiveTopic(topic.id)}
                onMouseLeave={() => setActiveTopic(null)}
                animationDelay={100 + topic.seqIndex * 70}
              />
            ))}
          </div>
        </div>
      </div>


      <style jsx global>{`
        @keyframes lineDrawSeq {
          0% {
            stroke-dashoffset: 600;
            opacity: 0;
          }
          3% {
            opacity: 0.95;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.95;
          }
        }

        @keyframes nodePop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          65% {
            transform: scale(1.35);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes energyFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.85;
          }
        }

        @keyframes floatLoop {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.015);
          }
        }
        .infinity-float {
          animation: floatLoop 6s ease-in-out infinite;
        }

        @keyframes energyFlow {
          from {
            stroke-dashoffset: 140;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .energy-stream {
          animation: energyFlow linear infinite;
        }
      `}</style>
    </section>
  );
}

/**
 * Single Topic Pill Card
 * - Professional refined executive size (balanced and elegant, not oversized)
 * - Number badge box is removed
 * - Links to individual topic page `/individual/[topicId]`
 */
const TopicCard = React.forwardRef<
  HTMLAnchorElement,
  {
    topic: TopicItem;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    animationDelay?: number;
  }
>(function TopicCard(
  { topic, onMouseEnter, onMouseLeave, animationDelay = 0 },
  ref
) {
  return (
    <Link
      ref={ref}
      href={`/individual/${topic.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative flex w-full items-center gap-2.5 sm:gap-3 xl:gap-3.5 rounded-full border bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 xl:px-4.5 xl:py-2.5 2xl:px-5 2xl:py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)] ${topic.cardBorder}`}
      style={{
        background: `linear-gradient(90deg, ${topic.cardTintStart} 0%, #ffffff 45%, #ffffff 100%)`,
        animation: `cardEntrance 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay}ms both`,
      }}
    >
      {/* Dynamic Hover Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 20px ${topic.glowColor}`,
        }}
      />

      {/* Left: Icon Squircle Badge (Professional compact size) */}
      <div
        className={`flex h-9 w-9 sm:h-9.5 sm:w-9.5 xl:h-10 xl:w-10 2xl:h-10.5 2xl:w-10.5 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-108 ${topic.badgeBg}`}
      >
        {topic.iconRenderer('h-4.5 w-4.5 sm:h-5 sm:w-5 xl:h-5.5 xl:w-5.5')}
      </div>

      {/* Title Text (Refined executive font size, clear and balanced) */}
      <div className="min-w-0 flex-1 pl-0.5 pr-1.5">
        <h3 className="font-sans text-[11.5px] sm:text-xs lg:text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-bold leading-tight sm:leading-snug text-slate-900 group-hover:text-indigo-950 transition-colors">
          {topic.title}
        </h3>
      </div>

      {/* Right: Circular Arrow Button (Sleek and polished) */}
      <div className="shrink-0 ml-auto pr-0.5">
        <div
          className={`flex h-7 w-7 sm:h-7.5 sm:w-7.5 xl:h-8 xl:w-8 items-center justify-center rounded-full border bg-white shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:translate-x-0.5 ${topic.arrowBorder} ${topic.arrowHoverBg}`}
        >
          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
});
TopicCard.displayName = 'TopicCard';

/**
 * 3D Glossy Infinity Loop Centerpiece with Sprouting Leaves matching Reference
 */
function InfinityCenterpiece({
  activeTopicId,
  isMobile = false,
}: {
  activeTopicId: string | null;
  isMobile?: boolean;
}) {
  return (
    <div className="infinity-float relative flex flex-col items-center justify-center">
      {/* Ambient Radial Backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-r from-purple-400/25 via-indigo-300/20 to-teal-400/25 blur-3xl"
      />

      {/* SVG Canvas for 3D Infinity Loop & Sprouting Leaves */}
      <svg
        className={`relative z-10 ${
          isMobile
            ? 'h-28 w-48 sm:h-32 sm:w-56'
            : 'h-36 w-52 xl:h-44 xl:w-64 2xl:h-48 2xl:w-72'
        } drop-shadow-[0_18px_38px_rgba(99,102,241,0.28)] transition-transform duration-500 hover:scale-105`}
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Left Ribbon Gradient (Purple -> Violet -> Blue) */}
          <linearGradient id="inf-3d-left" x1="45" y1="55" x2="160" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="35%" stopColor="#a855f7" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Right Ribbon Gradient (Cyan -> Turquoise -> Green) */}
          <linearGradient id="inf-3d-right" x1="160" y1="55" x2="275" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Top Leaf Left Gradient */}
          <linearGradient id="leaf-left-3d" x1="160" y1="75" x2="135" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          {/* Top Leaf Right Gradient */}
          <linearGradient id="leaf-right-3d" x1="160" y1="75" x2="185" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="45%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Sprout Stem Gradient */}
          <linearGradient id="stem-grad-3d" x1="160" y1="95" x2="160" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* 3D Specular Sheen */}
          <linearGradient id="specular-highlight" x1="50" y1="65" x2="270" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
          </linearGradient>

          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3D Shadow beneath Infinity */}
        <path
          d="M 160 115 C 205 160, 275 160, 275 115 C 275 70, 205 70, 160 115 C 115 160, 45 160, 45 115 C 45 70, 115 70, 160 115 Z"
          fill="none"
          stroke="rgba(15, 23, 42, 0.10)"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0, 7)"
        />

        {/* Left Infinity Lobe */}
        <path
          d="M 160 115 C 115 160, 45 160, 45 115 C 45 70, 115 70, 160 115 Z"
          fill="none"
          stroke="url(#inf-3d-left)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Infinity Lobe */}
        <path
          d="M 160 115 C 205 160, 275 160, 275 115 C 275 70, 205 70, 160 115 Z"
          fill="none"
          stroke="url(#inf-3d-right)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3D Front Overlap Twist */}
        <path
          d="M 136 91 C 152 107, 168 123, 184 139"
          fill="none"
          stroke="url(#inf-3d-right)"
          strokeWidth="28"
          strokeLinecap="round"
        />

        {/* 3D Glossy Light Sheen */}
        <path
          d="M 160 115 C 205 160, 275 160, 275 115 C 275 70, 205 70, 160 115 Z"
          fill="none"
          stroke="url(#specular-highlight)"
          strokeWidth="2.5"
          opacity="0.65"
        />

        {/* Sprouting Green Leaves on Top of Infinity */}
        <g className="transition-transform duration-300 hover:scale-110 origin-[160px_90px]">
          {/* Sprout Stem */}
          <path
            d="M 160 98 C 160 82, 159 66, 160 52"
            stroke="url(#stem-grad-3d)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Left Leaf */}
          <path
            d="M 160 58 C 144 56, 122 46, 130 24 C 144 22, 160 38, 160 58 Z"
            fill="url(#leaf-left-3d)"
            filter="url(#soft-glow)"
          />
          <path
            d="M 160 58 C 152 48, 140 38, 134 29"
            stroke="#bbf7d0"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Right Leaf */}
          <path
            d="M 160 54 C 176 52, 198 38, 190 16 C 174 14, 160 32, 160 54 Z"
            fill="url(#leaf-right-3d)"
            filter="url(#soft-glow)"
          />
          <path
            d="M 160 54 C 168 44, 180 32, 186 21"
            stroke="#dcfce7"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Base Node Connection */}
          <circle cx="160" cy="98" r="4.5" fill="#22c55e" />
          <circle cx="160" cy="98" r="2" fill="#86efac" />
        </g>
      </svg>
    </div>
  );
}
