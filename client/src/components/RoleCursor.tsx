'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Building, GraduationCap, Landmark, School, User, Users } from 'lucide-react';
import type { PersonaType } from './Identify';

interface RoleCursorProps {
  role: PersonaType;
  isActive: boolean;
}

const ROLE_CURSOR: Record<PersonaType, { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; color: string; glow: string }> = {
  student: { icon: GraduationCap, color: '#f5c66d', glow: 'rgba(245, 198, 109, 0.4)' },
  individual: { icon: User, color: '#ffe4a3', glow: 'rgba(245, 190, 93, 0.38)' },
  school: { icon: School, color: '#b9e5ff', glow: 'rgba(85, 183, 235, 0.34)' },
  corporate: { icon: Building, color: '#ffe09a', glow: 'rgba(244, 174, 58, 0.4)' },
  government: { icon: Landmark, color: '#ffd27a', glow: 'rgba(245, 160, 44, 0.38)' },
  ngo: { icon: Users, color: '#c7edb4', glow: 'rgba(116, 194, 99, 0.36)' },
  parent: { icon: Users, color: '#fbcfe8', glow: 'rgba(244, 114, 182, 0.36)' },
};

export default function RoleCursor({ role, isActive }: RoleCursorProps) {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const artwork = ROLE_CURSOR[role];
    if (!isActive || !cursor || !artwork) return;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!hoverQuery.matches) return;

    const oldCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';
    let frame = 0;
    const icon = cursor.querySelector<HTMLElement>('[data-role-cursor-icon="true"]');

    const moveCursor = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const ease = motionQuery.matches ? 1 : 0.24;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      cursor.style.transform = `translate3d(${current.x - 18}px, ${current.y - 18}px, 0)`;
      frame = window.requestAnimationFrame(moveCursor);
    };

    const handleMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      const target = event.target as HTMLElement | null;
      const overChrome = Boolean(target?.closest('header, nav, footer, [data-chrome="true"], [data-footer="true"]'));
      cursor.style.opacity = overChrome ? '0' : '1';
      document.body.style.cursor = overChrome ? oldCursor : 'none';
    };

    const handleLeave = () => {
      cursor.style.opacity = '0';
    };

    const handleDown = () => {
      if (icon) icon.style.transform = 'scale(.84) rotate(-8deg)';
    };

    const handleUp = () => {
      if (icon) icon.style.transform = '';
    };

    const handleEnter = () => {
      cursor.style.opacity = '1';
    };

    frame = window.requestAnimationFrame(moveCursor);
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.style.cursor = oldCursor;
    };
  }, [isActive, mounted, role]);

  const artwork = ROLE_CURSOR[role];
  if (!mounted || !isActive || !artwork) return null;
  const Icon = artwork.icon;

  return createPortal(
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999999] opacity-0 will-change-transform"
      style={{ transition: 'opacity 140ms ease-out' }}
    >
      <span
        className="absolute -inset-2 rounded-full blur-md"
        style={{ background: artwork.glow }}
        data-role-cursor-glow="true"
      />
      <span
        className="absolute -inset-[7px] rounded-full border border-amber-100/20"
        style={{ borderTopColor: artwork.color, borderRightColor: `${artwork.color}66` }}
        data-role-cursor-orbit="true"
      >
        <span
          className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ background: artwork.color, color: artwork.color }}
        />
      </span>
      <span
        className="absolute -right-[9px] -top-[8px] h-1 w-1 rounded-full"
        style={{ background: artwork.color, boxShadow: `0 0 9px ${artwork.color}` }}
        data-role-cursor-spark="true"
      />
      <span
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-amber-100/70 bg-[#17110a]/85 shadow-[0_0_16px_rgba(223,165,71,0.35)] backdrop-blur-sm"
        style={{ color: artwork.color }}
        data-role-cursor-icon="true"
      >
        <Icon size={21} strokeWidth={1.8} />
      </span>
      <style>{`
        @keyframes role-cursor-breathe { 0%, 100% { transform: scale(.82); opacity: .45; } 50% { transform: scale(1.12); opacity: .9; } }
        @keyframes role-cursor-float { 0%, 100% { translate: 0 0; rotate: -4deg; } 50% { translate: 0 -2px; rotate: 3deg; } }
        [data-role-cursor-glow="true"] { animation: role-cursor-breathe 2.4s ease-in-out infinite; }
        [data-role-cursor-orbit="true"] { animation: role-cursor-orbit 7s linear infinite; }
        [data-role-cursor-spark="true"] { animation: role-cursor-spark 1.8s ease-in-out infinite; }
        [data-role-cursor-icon="true"] { animation: role-cursor-float 3s ease-in-out infinite; }
        @keyframes role-cursor-orbit { to { rotate: 360deg; } }
        @keyframes role-cursor-spark { 0%, 100% { opacity: .35; scale: .7; } 50% { opacity: 1; scale: 1.25; } }
        @media (prefers-reduced-motion: reduce) { [data-role-cursor-glow="true"], [data-role-cursor-orbit="true"], [data-role-cursor-spark="true"], [data-role-cursor-icon="true"] { animation: none !important; } }
      `}</style>
    </div>,
    document.body,
  );
}

