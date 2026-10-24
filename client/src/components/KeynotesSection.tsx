'use client';

import React, { useState } from 'react';
import { Sparkles, Clock, Users, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface Keynote {
  id: string;
  title: string;
  category: string;
  audience: string;
  duration: string;
  summary: string;
  outcomes: string[];
  featured: boolean;
}

const keynotes: Keynote[] = [
  {
    id: 'keynote-1',
    title: 'The Unstoppable Mind: Mastering Inner Resilience',
    category: 'Mental Toughness & Mindset',
    audience: 'Corporate Leaders, Founders & Visionaries',
    duration: '60-90 Mins Keynote',
    summary:
      'How to eliminate subconscious self-doubt, re-wire cognitive barriers, and sustain supreme focus amidst market volatility and high-stakes corporate pressure.',
    outcomes: [
      'Subconscious mental reframing techniques',
      'Transmuting acute stress into relentless creative fuel',
      'Cognitive resilience blueprint under high uncertainty',
    ],
    featured: true,
  },
  {
    id: 'keynote-2',
    title: 'Awakening Conscious Leadership & Purpose',
    category: 'Executive Leadership',
    audience: 'CEOs, Global Executives & Change-makers',
    duration: '45-75 Mins Keynote / Half-Day Workshop',
    summary:
      'Moving beyond transactional management to inspire deep loyalty, empathy, and high-velocity innovation across distributed global teams.',
    outcomes: [
      'Radiating an unshakeable executive presence',
      'Building a psychologically fearless team culture',
      'Harmonizing intense ambition with profound life purpose',
    ],
    featured: true,
  },
  {
    id: 'keynote-3',
    title: 'The Art of Inner Stillness: Modern Zen for Peak Achievers',
    category: 'Spiritual Mastery & Wellness',
    audience: 'All Audiences & International Summits',
    duration: '60 Mins Experiential Talk + Guided Immersion',
    summary:
      'Ancient Vedic and Zen mindfulness principles adapted for modern high-speed life to eliminate burnout and awaken sustained creative flow.',
    outcomes: [
      '5-minute daily nervous system reset technique',
      'Mindful decision-making matrix for hyper-growth',
      'Cultivating effortless inner calm at any moment',
    ],
    featured: true,
  },
  {
    id: 'keynote-4',
    title: 'Unleashing the Hero Within: Defying Ordinary',
    category: 'Youth & High Motivation',
    audience: 'Colleges, Universities & Youth Conventions',
    duration: '60 Mins Electrifying Keynote',
    summary:
      'An energetic, heart-stirring session inspiring individuals to shatter self-imposed ceilings, silence inner critics, and pursue audacious dreams.',
    outcomes: [
      'Courage to take immediate, massive action',
      'Overcoming paralyzing fear of failure or judgment',
      'Forging an unshakeable identity rooted in strength',
    ],
    featured: false,
  },
];

export default function KeynotesSection() {
  const [selectedKeynote, setSelectedKeynote] = useState<Keynote | null>(null);

  return (
    <section id="keynotes" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          Signature Keynote Presentations
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Keynote Programs That <span className="gradient-gold-text">Ignite Audiences</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Tailored keynote addresses that blend dynamic storytelling, profound spiritual insights, and actionable mental frameworks.
        </p>
      </div>

      {/* Grid of Keynote Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {keynotes.map((keynote) => (
          <div
            key={keynote.id}
            className="light-glass-panel light-glass-hover rounded-3xl p-8 border border-amber-200/50 flex flex-col justify-between group"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3.5 py-1 rounded-full">
                  {keynote.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {keynote.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors mb-3 leading-snug">
                {keynote.title}
              </h3>

              {/* Summary */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {keynote.summary}
              </p>

              {/* Audience Fit */}
              <div className="mb-6 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/40 flex items-center gap-2.5 text-xs text-slate-700">
                <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span><strong>Target Audience:</strong> {keynote.audience}</span>
              </div>

              {/* Outcomes list */}
              <div className="space-y-2 mb-8">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Takeaways for Attendees:
                </div>
                {keynote.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Customizable for Summits &amp; Retreats
              </span>
              <a
                href="#booking"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-all shadow-sm group-hover:shadow-md"
              >
                Inquire For This Topic
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
