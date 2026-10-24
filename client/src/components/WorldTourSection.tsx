'use client';

import React from 'react';
import { Calendar, MapPin, Ticket, Sparkles, ArrowRight } from 'lucide-react';

export default function WorldTourSection() {
  const events = [
    {
      id: 'ev-1',
      event: 'Global Leadership & Mindset Summit 2026',
      location: 'Dubai Opera, UAE',
      date: 'November 14, 2026',
      badge: 'Flagship Keynote',
      seats: 'Auditorium • 2,000 Leaders',
      status: 'Registration Open',
    },
    {
      id: 'ev-2',
      event: 'Awaken Retreat: 3 Days of Spiritual Immersion',
      location: 'Rishikesh, Himalayas, India',
      date: 'December 05 - 08, 2026',
      badge: 'Exclusive Immersion',
      seats: 'Intimate Group • 40 Seekers Only',
      status: 'Few Spots Left',
    },
    {
      id: 'ev-3',
      event: 'World Innovators & Human Potential Conference',
      location: 'Singapore EXPO, Singapore',
      date: 'January 22, 2027',
      badge: 'Keynote & Panel',
      seats: 'Global Audience • 5,000+ Attendees',
      status: 'Announced',
    },
  ];

  return (
    <section id="tour" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          Live Appearances
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Upcoming <span className="gradient-gold-text">World Tour &amp; Retreats</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Experience the transformational frequency in person. Pranav Mahajan speaks live on stages across the world.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="light-glass-panel light-glass-hover rounded-2xl p-6 border border-amber-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-3 py-0.5 rounded-full">
                  {ev.badge}
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {ev.status}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {ev.event}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {ev.location}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {ev.date}
                </span>
                <span className="text-slate-400">&bull; {ev.seats}</span>
              </div>
            </div>

            <a
              href="#booking"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-amber-600 transition-colors shadow-sm self-start sm:self-center"
            >
              Inquire / Reserve
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
