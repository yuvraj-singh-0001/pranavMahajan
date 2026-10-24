'use client';

import React from 'react';
import { Calendar, MapPin, ArrowDown, Sparkles, ArrowUpRight } from 'lucide-react';

export default function StackedSlide4Events() {
  const scrollToNext = () => {
    document.getElementById('slide-5')?.scrollIntoView({ behavior: 'smooth' });
  };

  const events = [
    {
      title: 'Global Leadership & Mindset Summit 2026',
      location: 'Dubai Opera, United Arab Emirates',
      date: 'November 14, 2026',
      badge: 'Flagship Keynote',
      audience: '2,000 Global Leaders',
      status: 'Open For Registration',
    },
    {
      title: 'Awaken Retreat: 3 Days in Stillness',
      location: 'Rishikesh, Himalayas, India',
      date: 'December 05 - 08, 2026',
      badge: 'Spiritual Immersion',
      audience: 'Intimate Cohort of 40 Seekers',
      status: 'Limited Seats Left',
    },
    {
      title: 'World Human Potential & Innovation Expo',
      location: 'Singapore EXPO, Singapore',
      date: 'January 22, 2027',
      badge: 'Keynote & Masterclass',
      audience: '5,000+ Attendees',
      status: 'Just Announced',
    },
  ];

  return (
    <section
      id="slide-4"
      className="sticky top-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#f7f2e8] via-[#f2ece0] to-[#e9e1d2] z-40 px-4 sm:px-8 py-20 rounded-t-[36px] sm:rounded-t-[54px] shadow-[0_-25px_60px_rgba(0,0,0,0.15)] border-t border-amber-300/50 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          Global Appearances
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-tight mb-4 font-bold">
          Upcoming Events
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Check this section to stay updated on recent and upcoming keynote addresses and retreats worldwide. You are always welcome to connect with me.
        </p>

        {/* Events Cards Stack */}
        <div className="space-y-4 max-w-4xl mx-auto mb-12 text-left">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full">
                    {ev.badge}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {ev.status}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                  {ev.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    {ev.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    {ev.date}
                  </span>
                  <span className="text-slate-400">&bull; {ev.audience}</span>
                </div>
              </div>

              <a
                href="#slide-5"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-amber-700 transition-colors shadow-sm self-start sm:self-center"
              >
                Inquire / Reserve
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Scroll down indicator to contact slide */}
        <button
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-amber-50 border border-amber-300 transition-all shadow-md cursor-pointer"
        >
          <span>Connect Soul-To-Soul (Get In Touch)</span>
          <ArrowDown className="w-4 h-4 text-amber-700 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
