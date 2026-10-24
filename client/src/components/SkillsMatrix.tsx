'use client';

import React from 'react';
import { Cpu, Globe, Server, Cloud, Search, Sparkles, Check } from 'lucide-react';

export default function SkillsMatrix() {
  const skillCategories = [
    {
      title: 'Frontend & 3D WebGL',
      icon: Globe,
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/40',
      skills: [
        'Next.js 15 (App Router, Turbopack)',
        'React 19 & Server Components',
        'TypeScript Architecture',
        'Tailwind CSS & Modern Design Systems',
        'Framer Motion & Micro-interactions',
        'Three.js / WebGL / Canvas 60FPS',
        'Lighthouse 100/100 Core Web Vitals',
      ],
    },
    {
      title: 'Backend & Distributed Systems',
      icon: Server,
      color: 'from-purple-500 to-indigo-500',
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800/40',
      skills: [
        'Node.js & Express.js',
        'RESTful & GraphQL API Design',
        'PostgreSQL / Prisma ORM',
        'MongoDB / NoSQL Data Modeling',
        'Redis Caching & Session Stores',
        'Rate Limiting, Helmet & API Security',
        'Microservices & Event-Driven Architecture',
      ],
    },
    {
      title: 'DevOps & Cloud Scale',
      icon: Cloud,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
      skills: [
        'Docker Containerization',
        'Vercel Enterprise & Edge Networks',
        'AWS (EC2, S3, CloudFront)',
        'Automated CI/CD Pipelines (GitHub Actions)',
        'Nginx Reverse Proxy & Load Balancing',
        'Monitoring, Telemetry & Logging',
      ],
    },
    {
      title: 'Technical SEO & Conversion',
      icon: Search,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
      skills: [
        'Schema.org Rich JSON-LD Microdata',
        'Server-Side Rendering (SSR/SSG/ISR)',
        'Dynamic OpenGraph & Twitter Cards',
        'Automated XML Sitemaps & Robots Control',
        'Semantic HTML5 & Accessibility (WCAG)',
        'Sub-second TTFB & Edge Caching',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow orb */}
      <div className="glow-orb-purple w-[450px] h-[450px] top-1/2 -left-40 opacity-30" />

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Fullstack Competency
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Technical <span className="gradient-accent">Mastery &amp; Tech Stack</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Every tool is selected with one uncompromising purpose: ultra-fast page speed, resilient infrastructure, and top organic search ranking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-cyan-400" />
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                <span>Production Proficiency</span>
                <span className="text-emerald-400 font-semibold">100%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
