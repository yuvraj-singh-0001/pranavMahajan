'use client';

import React from 'react';
import { Calendar, MapPin, ArrowDown, ArrowUpRight } from 'lucide-react';

export default function GaurGopalEventsSlide() {
  const events = [
    {
      title: 'Global Leadership & Mindset Summit 2026',
      location: 'Dubai Opera, United Arab Emirates',
      date: 'November 14, 2026',
      badge: 'Flagship Keynote',
      audience: '2,000 Global Leaders',
      status: 'Registration Open',
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

  const scrollToNext = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="events"
      className="stacked-slide z-30 bg-gradient-to-b from-[#f7f2e6] via-[#f2ecdc] to-[#ebe3d0] px-6 sm:px-12 lg:px-20 py-24 rounded-t-[44px] sm:rounded-t-[54px] shadow-[0_-25px_60px_rgba(0,0,0,0.12)] border-t border-amber-200/80 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          Live Keynotes &amp; Retreats
        </div>

        <h2 className="font-cursive text-5xl sm:text-7xl font-bold text-[#8a5d28] tracking-wide mb-3">
          Upcoming Events
        </h2>

        <p className="text-slate-600 text-base max-w-2xl mx-auto mb-12 font-normal">
          Check this section to stay updated on recent and upcoming keynote addresses and retreats worldwide. You are always welcome to connect with me.
        </p>

        {/* Events Cards Stack */}
        <div className="space-y-5 max-w-4xl mx-auto mb-12 text-left">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full">
                    {ev.badge}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {ev.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-cursive font-bold text-[#8a5d28] group-hover:text-amber-800 transition-colors">
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
                href="#contact"
                className="ochre-pill-button py-2.5 px-5 text-xs font-bold shadow-xs hover:shadow-md self-start sm:self-center"
              >
                Inquire / Reserve
              </a>
            </div>
          ))}
        </div>

        {/* Scroll Next */}
        <button
          onClick={scrollToNext}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-widest cursor-pointer"
        >
          <span>Connect Soul-To-Soul (Get In Touch)</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
