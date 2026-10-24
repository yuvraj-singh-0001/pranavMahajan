'use client';

import React, { useState } from 'react';
import { Sparkles, Quote, Copy, Check, RefreshCw, SunMedium } from 'lucide-react';

const fallbackQuotes = [
  'True power does not come from controlling external circumstances, but from mastering the silence within your own mind.',
  'Your doubts create ceilings that your destiny was meant to shatter.',
  'When clarity meets unwavering commitment, miracles become your daily standard.',
  'Peace is not the absence of trouble, but the presence of unshakeable inner alignment.',
  'Master the morning, calm the mind, and the world will make way for your purpose.',
  'Do not wait for motivation. Cultivate discipline, and divine inspiration will follow you.',
  'The mind is a sacred garden. Guard its gates with fierce reverence.',
];

export default function DailyWisdom() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const quote = fallbackQuotes[currentQuoteIndex];

  const handleNextQuote = async () => {
    setIsRotating(true);
    try {
      const res = await fetch('http://localhost:5000/api/quotes/daily');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.quote) {
          // Find or cycle
          const nextIdx = (currentQuoteIndex + 1) % fallbackQuotes.length;
          setCurrentQuoteIndex(nextIdx);
        } else {
          setCurrentQuoteIndex((prev) => (prev + 1) % fallbackQuotes.length);
        }
      } else {
        setCurrentQuoteIndex((prev) => (prev + 1) % fallbackQuotes.length);
      }
    } catch {
      setCurrentQuoteIndex((prev) => (prev + 1) % fallbackQuotes.length);
    } finally {
      setTimeout(() => setIsRotating(false), 300);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote}" — Pranav Mahajan`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="wisdom" className="py-20 relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl p-8 sm:p-12 light-glass-panel border-2 border-amber-300/40 shadow-2xl text-center overflow-hidden">
        {/* Subtle decorative quote emblem */}
        <Quote className="w-20 h-20 text-amber-500/10 absolute -top-4 -left-4 pointer-events-none" />
        <Quote className="w-20 h-20 text-amber-500/10 absolute -bottom-4 -right-4 rotate-180 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6">
          <SunMedium className="w-4 h-4 text-amber-600" />
          Daily Spark of Consciousness
        </div>

        {/* The Quote Statement */}
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-800 leading-snug tracking-tight mb-8 max-w-3xl mx-auto min-h-[90px] flex items-center justify-center">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="text-sm font-semibold text-amber-800 tracking-wide uppercase mb-8">
          — Pranav Mahajan
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleNextQuote}
            disabled={isRotating}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-all shadow-md shadow-amber-600/20 hover:shadow-lg cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            Receive Next Spark
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-amber-50 border border-amber-200/80 transition-colors cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied to Clipboard
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                Share This Quote
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
