'use client';

import React from 'react';
import { Compass, Shield, Flame, Mountain, Heart, Feather } from 'lucide-react';

export default function PhilosophySection() {
  const pillars = [
    {
      step: '01',
      title: 'Unshakeable Inner Stillness',
      sanskrit: 'Shanti & Sthirata',
      description:
        'Chaos in your external enterprise is only a reflection of internal turbulence. Pranav teaches high-stakes leaders how to access zero-reactivity mental states under extreme pressure.',
      icon: Feather,
      color: 'from-amber-500 to-orange-500',
    },
    {
      step: '02',
      title: 'Cognitive Mindset Mastery',
      sanskrit: 'Sankalpa Shakti',
      description:
        'Rewire the subconscious stories that sabotage your trajectory. Transform fear from a paralyzing roadblock into high-octane fuel for breakthrough execution.',
      icon: Flame,
      color: 'from-orange-500 to-red-500',
    },
    {
      step: '03',
      title: 'Conscious Leadership & Vision',
      sanskrit: 'Dharma Alignment',
      description:
        'True influence cannot be coerced through authority; it is naturally attracted through authenticity, radical empathy, and uncompromised ethical clarity.',
      icon: Compass,
      color: 'from-amber-600 to-amber-700',
    },
    {
      step: '04',
      title: 'Fearless Peak Execution',
      sanskrit: 'Karma Yoga',
      description:
        'Disciplined, daily devotion to your highest purpose. Moving past mere goals to establish an unbreakable system of momentum that inspires millions.',
      icon: Mountain,
      color: 'from-yellow-600 to-amber-600',
    },
  ];

  return (
    <section id="philosophy" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
          <Heart className="w-3.5 h-3.5 text-amber-700" />
          The Core Methodology
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          The 4 Pillars of <span className="gradient-gold-text">Transformational Mastery</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Synthesizing 5,000 years of contemplative Vedic insight with contemporary cognitive neuroscience to awaken the leader within you.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.step}
              className="light-glass-panel light-glass-hover rounded-3xl p-7 flex flex-col justify-between border border-amber-200/50 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-amber-700/80 tracking-widest">
                    PILLAR {pillar.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                </div>

                <div className="text-xs font-serif italic text-amber-800/70 mb-1">
                  {pillar.sanskrit}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-100 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                <span>Integrated Practice</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
