'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  School,
  Heart,
  UserCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export type PersonaType = 'student' | 'parent' | 'school' | 'individual';

interface IdentifyProps {
  onSelectPersona?: (persona: PersonaType) => void;
  onGoToPersonaPage: (persona: PersonaType) => void;
  onBackToHero?: () => void;
}

export default function Identify({
  onSelectPersona,
  onGoToPersonaPage,
  onBackToHero,
}: IdentifyProps) {
  const [selected, setSelected] = useState<PersonaType>('student');

  const personas = [
    {
      id: 'student' as const,
      title: 'Student',
      subtitle: 'School & College Seekers',
      tagline: 'Peak Focus & Exam Calm',
      icon: GraduationCap,
      badge: 'Youth Potential',
      highlights: [
        'Overcoming exam anxiety, self-doubt & academic burnout',
        'Subconscious concentration techniques for 10x retention',
        'Direct alignment with purpose & high-confidence mindsets',
      ],
      actionLabel: 'Connect as Student',
    },
    {
      id: 'school' as const,
      title: 'School / College',
      subtitle: 'Campuses & Institutions',
      tagline: 'Keynotes & Assemblies',
      icon: School,
      badge: '180+ Stages',
      highlights: [
        'High-voltage annual day keynotes & youth transformation summits',
        'Faculty stress-relief & compassionate educational leadership',
        'Empowering youth resilience against screen addictions & peer pressure',
      ],
      actionLabel: 'Connect as Institution',
    },
    {
      id: 'parent' as const,
      title: 'Parent',
      subtitle: 'Conscious Parenting',
      tagline: 'Family Bonding & Empathy',
      icon: Heart,
      badge: 'Sacred Sanctum',
      highlights: [
        'Bridging the generational gap with rebellious teenagers',
        'Conscious digital detox & calm non-reactive communication',
        'Cultivating emotional sanctuary inside modern homes',
      ],
      actionLabel: 'Connect as Parent',
    },
    {
      id: 'individual' as const,
      title: 'Individual',
      subtitle: 'Executives & Professionals',
      tagline: 'Stress Mastery & Purpose',
      icon: UserCheck,
      badge: 'Executive Coaching',
      highlights: [
        'C-Suite burnout immunity & emotional self-regulation',
        'Balancing hyper-ambition with deep inner stillness',
        'Vedic mindfulness frameworks for decision clarity & life purpose',
      ],
      actionLabel: 'Connect as Executive',
    },
  ];

  const currentPersona = personas.find((p) => p.id === selected) || personas[0];

  const handleCardClick = (id: PersonaType) => {
    setSelected(id);
    if (onSelectPersona) {
      onSelectPersona(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-10 lg:px-12 pt-20 sm:pt-14 pb-28 sm:pb-14 relative z-10 flex flex-col justify-center my-auto slide-content-anim">
      {/* Top Heading Area */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#dfa547]" />
          Personalized Mentorship Pathway
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Please Identify Yourself As
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Select who you are to reveal your tailored keynote themes, specialized mindfulness tools, and dedicated transformation roadmap.
        </p>
      </div>

      {/* 4 Selectable Persona Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
        {personas.map((persona) => {
          const IconComponent = persona.icon;
          const isSelected = selected === persona.id;
          return (
            <button
              key={persona.id}
              onClick={() => handleCardClick(persona.id)}
              className={`text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative cursor-pointer group flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-[#231b14] via-[#1a140f] to-[#120e0a] border-[#dfa547] shadow-[0_0_30px_rgba(223,165,71,0.35)] scale-[1.02]'
                  : 'bg-[#14100c]/90 hover:bg-[#1c1611] border-amber-500/20 hover:border-amber-400/50 shadow-lg'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dfa547] block animate-ping" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#b8731b] to-[#dfa547] text-white shadow-md'
                        : 'bg-[#221a13] border border-amber-500/30 text-amber-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-200">
                    {persona.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    {persona.title}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium">
                    {persona.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-500/15 mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 group-hover:text-white transition-colors">
                  {persona.tagline}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected
                      ? 'text-[#dfa547] translate-x-1'
                      : 'text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Persona Breakdown Reaction Showcase */}
      <div className="rounded-3xl bg-[#14100c] border border-amber-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#dfa547]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          <div className="lg:col-span-8 space-y-3.5 text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="w-4 h-4 text-[#dfa547]" />
              Tailored Program Blueprint: {currentPersona.title}
            </div>
            <div className="text-sm sm:text-base font-bold text-white leading-snug">
              Specialized keynote tracks &amp; immersive growth frameworks for {currentPersona.title}s.
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {currentPersona.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dfa547] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center gap-2.5">
            <Link
              href={`/${selected}`}
              className="ochre-pill-button py-3 px-5 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg w-full flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] text-center"
            >
              <span>Explore {currentPersona.title} Hub</span>
              <span className="text-[10px] bg-black/40 text-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Coming Soon
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onGoToPersonaPage(selected)}
              className="py-2.5 px-4 text-xs font-semibold rounded-full border border-amber-500/35 text-amber-200/90 hover:text-white hover:border-amber-400 bg-[#1e1711]/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Direct Booking Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Click Hub to view dedicated sales page or Desk to book directly
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Row */}
      <div className="pt-4 flex items-center justify-between text-xs">
        {onBackToHero ? (
          <button
            onClick={onBackToHero}
            className="text-slate-400 hover:text-white uppercase font-bold tracking-wider cursor-pointer flex items-center gap-1.5"
          >
            &larr; Back to Welcome
          </button>
        ) : <div />}
        <button
          onClick={() => onGoToPersonaPage(selected)}
          className="text-amber-300 hover:text-white uppercase font-bold tracking-wider cursor-pointer flex items-center gap-1.5"
        >
          <span>Get In Touch &amp; Booking</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
