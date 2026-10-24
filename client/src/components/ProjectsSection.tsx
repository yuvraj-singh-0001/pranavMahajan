'use client';

import React, { useState } from 'react';
import { ExternalLink, Code2, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  metrics: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
}

const initialProjects: Project[] = [
  {
    id: 'project-1',
    title: 'OmniFlow AI - Enterprise Workflow Engine',
    category: 'Fullstack SaaS',
    description: 'Autonomous AI-agent workflow platform processing over 12M events/day. Sub-100ms API response time, zero-downtime microservice architecture built with Next.js & Node.js.',
    technologies: ['Next.js 15', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    metrics: '3.4x Workflow Speedup • 12M+ Monthly Events',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 'project-2',
    title: 'Vortex 3D Studio - Immersive WebGL Experience',
    category: '3D & Creative Tech',
    description: 'Interactive 3D product visualizer with real-time dynamic lighting, spatial audio, and smooth 60fps canvas scrubbing for luxury e-commerce brands.',
    technologies: ['Three.js', 'React Three Fiber', 'Next.js', 'GLSL Shaders', 'Tailwind'],
    metrics: '60 FPS Flawless Rendering • +82% Conversion Rate',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 'project-3',
    title: 'QuantumPay - Cross-Border Settlement Gateway',
    category: 'Fintech Platform',
    description: 'Enterprise multi-currency payment platform with bank-grade security, instant webhooks, and automated compliance auditing.',
    technologies: ['Node.js', 'Express', 'Next.js', 'Docker', 'PostgreSQL', 'Stripe API'],
    metrics: '$48M+ Transaction Volume • 99.99% Uptime SLA',
    featured: true,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 'project-4',
    title: 'Apex Cloud Orchestrator',
    category: 'DevOps / Infrastructure',
    description: 'Real-time cluster monitoring and telemetry dashboard with dynamic anomaly detection, sub-second latency updates, and automated auto-scaling rules.',
    technologies: ['Next.js', 'WebSockets', 'Node.js', 'Tailwind CSS', 'TimescaleDB'],
    metrics: '-42% Cloud Spend • Instant Alerts',
    featured: false,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
];

const categories = ['All', 'Fullstack SaaS', '3D & Creative Tech', 'Fintech Platform', 'DevOps / Infrastructure'];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? initialProjects
      : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Engineered for Production
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Featured <span className="gradient-accent">Case Studies &amp; Projects</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          High-performance fullstack systems, interactive 3D web applications, and mission-critical cloud solutions.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group relative glass-panel rounded-3xl p-7 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
                  {project.category}
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Production Ready
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                {project.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Metric Card */}
              <div className="mb-6 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{project.metrics}</span>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.05] text-slate-300 border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => setActiveModalProject(project)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                View Architecture Breakdown
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors"
                  aria-label="Visit live application"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Architecture Breakdown Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-2xl w-full rounded-3xl p-8 border border-white/20 shadow-2xl relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {activeModalProject.category}
                </span>
                <h4 className="text-2xl font-bold text-white mt-1">
                  {activeModalProject.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {activeModalProject.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h5 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Architecture &amp; Core Highlights
                </h5>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>SSR &amp; Edge caching implemented with Next.js App Router for instant TTFB.</li>
                  <li>Modular Node.js microservices with failover redundancy and Redis caching.</li>
                  <li>100% Mobile responsiveness and automated SEO structured schema.</li>
                  <li>Measured impact: {activeModalProject.metrics}</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg"
              >
                Build Similar Architecture
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
