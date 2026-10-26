'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Mail,
  Copy,
  Check,
  Compass,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Building,
} from 'lucide-react';

interface FooterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSlide: (index: number) => void;
}

export default function Footer({ isOpen, onClose, onNavigateSlide }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('speaking@pranavmahajan.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Semi-transparent Backdrop when Drawer is Open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 transition-opacity"
        />
      )}

      {/* Main Drawer Container */}
      <div className="relative z-40 max-h-[85vh] sm:max-h-[82vh] overflow-y-auto bg-gradient-to-b from-[#14100c] via-[#0e0c0a] to-[#090807] border-t-2 border-amber-500/40 text-slate-200 shadow-2xl p-6 sm:p-10 select-text">
        {/* Top Floating Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan Logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(223,165,71,0.3)]"
            />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-300">
              Master Sanctum &bull; Global Secretariat
            </span>
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1612] hover:bg-[#251e18] border border-amber-500/35 text-amber-200 hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <span>Close Footer</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Multi-Column Detailed Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left pt-8">
          {/* Column 1: Directory Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#dfa547]" />
              Sanctum Pathways
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigateSlide(0)}
                  className="text-slate-300 hover:text-[#dfa547] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfa547]" />
                  01 &bull; Welcome Sanctum (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSlide(1)}
                  className="text-slate-300 hover:text-[#dfa547] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfa547]" />
                  02 &bull; Persona Discovery (Choose Role)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSlide(2)}
                  className="text-amber-300 font-bold hover:text-white hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfa547] animate-ping" />
                  03 &bull; Get In Touch &amp; Speaking Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Sacred Offerings */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#dfa547]" />
              Sacred Offerings
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                Vedic Mindfulness Executive Circles
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                Keynote: The Unstoppable Mind In Chaos
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                Awaken 3-Day Himalayan Stillness
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                Youth Mental Mastery Initiative
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                Corporate Cognitive Burnout Audit
              </li>
            </ul>
          </div>

          {/* Column 3: Executive Email & Direct Desk */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#dfa547]" />
              Executive Desk
            </h4>
            <div className="p-3.5 rounded-2xl bg-[#191511] border border-amber-500/30 shadow-md space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Official Direct Email:
              </div>
              <a
                href="mailto:speaking@pranavmahajan.com"
                className="font-bold text-amber-200 hover:text-white text-xs sm:text-sm break-all block"
              >
                speaking@pranavmahajan.com
              </a>
              <button
                onClick={copyEmailToClipboard}
                className="w-full py-1.5 px-3 rounded-lg bg-[#221b14] hover:bg-[#2b2219] border border-amber-500/25 text-[11px] font-bold text-amber-200 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#dfa547]" />
                    <span>Copy Official Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Column 4: Quick WhatsApp & Bureau */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#dfa547]" />
              Direct Bureau Connect
            </h4>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#1a1511] hover:bg-[#231b14] border border-amber-500/25 hover:border-amber-400/60 transition-all flex items-center gap-3 group shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-white group-hover:text-amber-200 truncate">WhatsApp Desk</div>
                <div className="text-[10px] text-slate-400 truncate">Keynote Coordinator</div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-300 ml-auto flex-shrink-0" />
            </a>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Global representations in New Delhi, Mumbai, Dubai, and Singapore.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500 pt-8 mt-8 border-t border-amber-500/20">
          &copy; 2026 Pranav Mahajan Official &bull; Wisdom &bull; Leadership &bull; Stillness. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
