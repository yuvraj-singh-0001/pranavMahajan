'use client';

import React, { useState } from 'react';
import { ArrowUp, Send, Check, Sun, Globe, Video, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // offline fallback
    }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f5f1eb] border-t border-amber-200/60 pt-16 pb-12 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-amber-200/50">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">
                Pranav Mahajan
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Global Keynote Speaker, Mindset Architect &amp; Spiritual Mentor. Transforming leadership, human consciousness, and peak performance worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-amber-200/70 flex items-center justify-center text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors shadow-xs"
                aria-label="YouTube Channel"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-amber-200/70 flex items-center justify-center text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors shadow-xs"
                aria-label="Instagram Profile"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-amber-200/70 flex items-center justify-center text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#philosophy" className="hover:text-amber-700 transition-colors">Core Philosophy</a></li>
              <li><a href="#keynotes" className="hover:text-amber-700 transition-colors">Keynote Programs</a></li>
              <li><a href="#tour" className="hover:text-amber-700 transition-colors">World Tour &amp; Retreats</a></li>
              <li><a href="#wisdom" className="hover:text-amber-700 transition-colors">Daily Wisdom Spark</a></li>
              <li><a href="#booking" className="hover:text-amber-700 transition-colors">Booking &amp; Availability</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Daily Morning Consciousness
            </h4>
            <p className="text-xs text-slate-600">
              Receive Pranav’s morning reflections on discipline, stillness, and relentless high performance.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-xl bg-white border border-amber-200/80 text-xs text-slate-900 outline-none flex-1 focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-xs text-emerald-700 block font-medium">
                ✓ Subscribed to Daily Morning Consciousness.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 Pranav Mahajan. All rights reserved. Designed for transcendent impact.
          </p>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js &bull; Node.js Fullstack</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white border border-amber-200/70 text-slate-600 hover:text-amber-700 shadow-xs cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
