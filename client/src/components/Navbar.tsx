'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Keynotes', href: '#keynotes' },
    { name: 'World Tour', href: '#tour' },
    { name: 'Daily Wisdom', href: '#wisdom' },
    { name: 'Praise', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/90 backdrop-blur-xl border-b border-amber-200/50 shadow-md shadow-amber-950/[0.03] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Name & Seal */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 p-[1.5px] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#fffdfa] rounded-[10px] flex items-center justify-center">
              <Sun className="w-5 h-5 text-amber-600 animate-spin-slow" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight block group-hover:text-amber-700 transition-colors">
              Pranav Mahajan
            </span>
            <span className="text-[11px] text-amber-800/80 font-medium tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Accepting 2026-2027 Keynotes
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 light-glass-panel px-5 py-2 rounded-full border border-amber-200/40">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-sm font-medium text-slate-700 hover:text-amber-700 rounded-full transition-colors hover:bg-amber-50/70"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 hover:from-amber-700 hover:to-orange-600 transition-all duration-300 shadow-md shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-600/30 hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-100" />
            Book For Keynote
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-amber-700 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fffdfa]/95 border-b border-amber-200/60 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-xl backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium text-slate-800 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-500 shadow-md"
            >
              Book For Keynote
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
