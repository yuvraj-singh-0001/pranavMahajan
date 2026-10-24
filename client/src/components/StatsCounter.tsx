'use client';

import React from 'react';
import { Award, CheckCircle2, Flame, Gauge, Users, Zap } from 'lucide-react';

export default function StatsCounter() {
  const stats = [
    {
      label: 'Delivered Projects',
      value: '45+',
      subtext: 'Production Next.js & Node apps',
      icon: CheckCircle2,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      label: 'Years of Experience',
      value: '6+ Years',
      subtext: 'High-scale web engineering',
      icon: Flame,
      color: 'from-purple-400 to-indigo-500',
    },
    {
      label: 'Client Satisfaction',
      value: '99.4%',
      subtext: '5-Star reviews & repeat clients',
      icon: Users,
      color: 'from-emerald-400 to-teal-500',
    },
    {
      label: 'Google Lighthouse Score',
      value: '100/100',
      subtext: 'Core Web Vitals & Speed Index',
      icon: Gauge,
      color: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <section className="relative z-10 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className={`text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1 tracking-tight`}>
                {stat.value}
              </div>
              <p className="text-xs text-slate-400">{stat.subtext}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
