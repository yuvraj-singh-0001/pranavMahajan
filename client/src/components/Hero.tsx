'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  buttonNudged?: boolean;
}

export default function Hero({ onStart, buttonNudged }: HeroProps) {
  return (
    <section
      aria-label="Welcome - Want to live your dream life"
      className="slide-item slide-item-locked bg-[#090807] relative w-screen h-screen overflow-hidden select-text text-white"
      style={{ overscrollBehavior: 'none', touchAction: 'none' }}
    >
      {/* Subtle Warm Golden Ambient Glows - Gentle on Eyes (Candlelight/Stage Warmth) */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] rounded-full bg-[#dfa547]/8 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#b8731b]/7 blur-[150px] pointer-events-none" />

      {/* LUMINOUS ROYAL GOLDEN BACKLIGHT AURA BEHIND PRESENTER */}
      <div className="absolute bottom-10 left-2 sm:left-12 md:left-20 lg:left-28 xl:left-36 w-[320px] sm:w-[480px] lg:w-[580px] h-[480px] sm:h-[650px] lg:h-[780px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,165,71,0.3)_0%,rgba(197,133,37,0.18)_42%,rgba(184,115,27,0.06)_70%,transparent_85%)] blur-[50px] sm:blur-[85px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 sm:left-10 lg:left-16 w-[360px] sm:w-[520px] h-[100px] bg-[radial-gradient(ellipse_at_bottom,rgba(223,165,71,0.22)_0%,rgba(184,115,27,0.08)_60%,transparent_80%)] blur-[35px] pointer-events-none z-0" />

      {/* PRESENTER PINNED FLUSH TO BOTTOM AND POSITIONED SLIGHTLY LOWER */}
      <div className="absolute -bottom-2 sm:-bottom-4 lg:-bottom-6 xl:-bottom-7 left-2 sm:left-8 md:left-14 lg:left-20 xl:left-28 z-10 flex items-end pointer-events-none select-none">
        <img
          src="/confident_presenter_microphone.png"
          alt="Confident Presenter with Microphone"
          className="h-[64vh] sm:h-[76vh] md:h-[83vh] lg:h-[89vh] xl:h-[94vh] w-auto max-w-[58vw] lg:max-w-[50vw] object-contain object-bottom drop-shadow-[0_15px_45px_rgba(223,165,71,0.32)] block"
        />
      </div>

      {/* CONTENT SECTION: RIGHT-ALIGNED RESPONSIVELY ACROSS ALL LAPTOPS & SCREENS */}
      <div className="w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-end relative z-20 pointer-events-auto slide-content-anim">
        <div className="w-full lg:w-1/2 max-w-xl xl:max-w-2xl space-y-6 sm:space-y-8 text-center lg:text-left my-auto ml-auto">
          {/* Soothing Satin Metallic Gold Heading Matching The Logo */}
          <h1
            className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] select-text"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fbe6af 35%, #dfa547 70%, #b8731b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 24px rgba(223, 165, 71, 0.25))',
            }}
          >
            Want to live your dream life
          </h1>

          {/* The Button with Scroll-Prevention Attention Trigger */}
          <div className="relative inline-block pt-2">
            {buttonNudged && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-900 text-amber-200 text-xs font-bold shadow-2xl border border-amber-400/50 flex items-center gap-2 animate-bounce z-30">
                <span className="text-base">👇</span>
                <span>Please click here to continue!</span>
              </div>
            )}

            <button
              onClick={onStart}
              className={`group relative inline-flex items-center justify-center gap-3.5 px-9 py-4.5 sm:px-11 sm:py-5 rounded-full text-lg sm:text-2xl font-bold text-white transition-all duration-300 cursor-pointer ${
                buttonNudged ? 'animate-button-attention ring-4 ring-[#dfa547]' : ''
              }`}
              style={{
                background: 'linear-gradient(90deg, #b8731b 0%, #dfa547 50%, #c58525 100%)',
                border: '1.5px solid rgba(251, 230, 175, 0.4)',
                boxShadow: '0 12px 32px rgba(184, 115, 27, 0.35), 0 4px 12px rgba(0, 0, 0, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #c58525 0%, #ebb354 50%, #dfa547 100%)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(223, 165, 71, 0.45), 0 4px 12px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #b8731b 0%, #dfa547 50%, #c58525 100%)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(184, 115, 27, 0.35), 0 4px 12px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
              }}
              aria-label="Click Here to Enter and Live in Your Dream Life"
            >
              <span className="select-text tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Click Here</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            </button>
          </div>

          {/* SEO Metadata */}
          <div className="sr-only">
            <h2>Motivational Keynote Speaker - Live in your dream life</h2>
            <p>Discover life-changing mentorship, mindfulness mastery, executive leadership coaching, and inner transformation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
