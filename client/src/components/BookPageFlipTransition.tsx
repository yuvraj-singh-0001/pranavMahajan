'use client';

import React, { useEffect } from 'react';

export type BookFlipState = 'idle' | 'flipping-forward' | 'flipping-backward';

interface BookPageFlipTransitionProps {
  state: BookFlipState;
}

export default function BookPageFlipTransition({ state }: BookPageFlipTransitionProps) {
  // Play subtle paper flip audio using Web Audio API synthesis
  useEffect(() => {
    if (state === 'idle') return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create gentle paper friction sound
      const bufferSize = Math.floor(ctx.sampleRate * 0.42);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(800, ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.2);
      bandpass.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.42);
      bandpass.Q.value = 1.4;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.41);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.42);
    } catch {
      // Audio is an enhancement; gracefully continue if restricted
    }
  }, [state]);

  if (state === 'idle') return null;

  const isForward = state === 'flipping-forward';

  return (
    <div className="book-flip-stage" aria-hidden="true">
      {/* 1. Underlying dynamic shadow cast onto revealed page */}
      <div className="book-underneath-shadow" />

      {/* 2. Left Spine Shadow (The book's binding crease) */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/80 via-black/35 to-transparent z-40 pointer-events-none" />

      {/* 3. The 3D Turning Page Leaf */}
      <div
        className={`book-page-leaf ${
          isForward ? 'animate-book-flip-forward' : 'animate-book-flip-backward'
        }`}
      >
        {/* FRONT FACE (Facing reader before turn) */}
        <div className="book-leaf-face book-leaf-front p-8 sm:p-16 flex flex-col justify-between">
          {/* Antique Double Border & Notches */}
          <div className="absolute inset-4 sm:inset-8 border border-[#7a4817]/60 pointer-events-none rounded-xl" />
          <div className="absolute inset-5 sm:inset-10 border border-[#8f561f]/30 pointer-events-none rounded-lg" />

          {/* Corner Notches */}
          <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-[#542d0a]" />
          <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-[#542d0a]" />
          <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-[#542d0a]" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-[#542d0a]" />

          {/* Spine Binding Shading on Left */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#3d1e05]/70 via-[#542d0a]/25 to-transparent pointer-events-none" />

          {/* Top Leaf Header Flourish */}
          <div className="relative z-10 flex items-center justify-between opacity-80 pt-4">
            <span className="text-xs uppercase font-serif tracking-widest text-[#542d0a] font-bold">
              Ancient Manuscript &bull; Folio VII
            </span>
            <span className="text-xs font-serif text-[#784415]">❖</span>
          </div>

          {/* Center Royal Watermark Crest */}
          <div className="relative z-10 my-auto text-center opacity-70 space-y-4">
            <img
              src="/pranav_mahajan_transparent.png"
              alt=""
              className="h-16 sm:h-24 w-auto mx-auto object-contain brightness-50 sepia"
            />
            <div className="flex items-center justify-center gap-3 text-[#542d0a]/70 max-w-xs mx-auto">
              <span className="h-[1px] flex-1 bg-[#542d0a]/40" />
              <span className="text-xs leading-none">❖</span>
              <span className="h-[1px] flex-1 bg-[#542d0a]/40" />
            </div>
            <p className="font-serif italic text-sm text-[#542d0a]/75 tracking-wider">
              Turning to Chapter Experience
            </p>
          </div>

          {/* Bottom Leaf Footer */}
          <div className="relative z-10 flex items-center justify-between opacity-70 pb-4 text-[#542d0a] text-xs font-serif">
            <span>&copy; Pranav Mahajan</span>
            <span>Folio 02 &bull; Persona Discovery</span>
          </div>

          {/* Curvature Light Reflection */}
          <div className="book-leaf-curl-shine" />
        </div>

        {/* BACK FACE (Verso side revealed when rotated past 90 degrees) */}
        <div className="book-leaf-face book-leaf-back p-8 sm:p-16 flex flex-col justify-between">
          {/* Antique Border */}
          <div className="absolute inset-4 sm:inset-8 border border-[#7a4817]/60 pointer-events-none rounded-xl" />
          <div className="absolute inset-5 sm:inset-10 border border-[#8f561f]/30 pointer-events-none rounded-lg" />

          {/* Spine Binding Shading on Right (because page is flipped) */}
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#3d1e05]/75 via-[#542d0a]/30 to-transparent pointer-events-none" />

          {/* Top Leaf Header */}
          <div className="relative z-10 flex items-center justify-between opacity-80 pt-4">
            <span className="text-xs font-serif text-[#784415]">❖</span>
            <span className="text-xs uppercase font-serif tracking-widest text-[#542d0a] font-bold">
              Folio VIII &bull; Journey Continued
            </span>
          </div>

          {/* Center Crest */}
          <div className="relative z-10 my-auto text-center opacity-65 space-y-3">
            <span className="text-3xl text-[#542d0a]">❖</span>
            <p className="font-serif italic text-sm text-[#542d0a]/80 tracking-widest">
              Wisdom &bull; Leadership &bull; Stillness
            </p>
          </div>

          {/* Bottom Leaf Footer */}
          <div className="relative z-10 flex items-center justify-between opacity-70 pb-4 text-[#542d0a] text-xs font-serif">
            <span>Folio 03 &bull; Persona Gateway</span>
            <span>&copy; Pranav Mahajan</span>
          </div>

          {/* Curvature Light Reflection */}
          <div className="book-leaf-curl-shine" />
        </div>
      </div>
    </div>
  );
}
