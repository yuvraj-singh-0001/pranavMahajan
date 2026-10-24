'use client';

import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Pranav’s keynote electrified our annual global summit. Over 2,000 corporate leaders were on their feet with emotion. His message of conscious resilience stayed with our teams for months.',
      author: 'Elena Rostova',
      role: 'Chief People Officer',
      company: 'Aura Global Technologies, Zurich',
      rating: 5,
    },
    {
      quote:
        'Rarely do you encounter a speaker who bridges profound spiritual depth with actionable corporate leadership strategy. Pranav Mahajan is truly in a league of his own.',
      author: 'Marcus Vance',
      role: 'Founder & Managing Director',
      company: 'World Visionaries Forum, Singapore',
      rating: 5,
    },
    {
      quote:
        'Pranav transformed how our executive board handles crisis and volatility. His session was the exact mental catalyst we needed. Truly unforgettable impact.',
      author: 'Dr. Aarav Sharma',
      role: 'Dean & Executive Director',
      company: 'Apex Leadership Institute',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          Global Trust &amp; Impact
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Praise From <span className="gradient-gold-text">World Leaders &amp; Organizers</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Hear how Pranav Mahajan’s speaking transforms audiences, unlocks latent potential, and creates lasting change.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="light-glass-panel light-glass-hover rounded-3xl p-8 border border-amber-200/50 flex flex-col justify-between relative group"
          >
            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6 text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-700 text-sm leading-relaxed italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-amber-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{t.author}</div>
                <div className="text-xs text-slate-500">
                  {t.role} &bull; <span className="text-amber-700">{t.company}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
