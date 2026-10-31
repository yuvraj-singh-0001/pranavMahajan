'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateSlide?: (index: number) => void;
  className?: string;
  onNavigateHome?: () => void;
  onNavigateRoles?: () => void;
  onNavigateContact?: () => void;
}

const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/@pranavmahajan',
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
    color: 'text-red-500',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/pranavmahajan',
    icon: <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />,
    color: 'text-pink-400',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/pranavmahajan',
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z" />,
    color: 'text-sky-400',
  },
  {
    name: 'X',
    url: 'https://x.com/pranavmahajan',
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    color: 'text-white',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/pranavmahajanofficial',
    icon: <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.023 4.388 11.03 10.125 11.927v-8.438H7.078v-3.49h3.047V9.41c0-3.03 1.792-4.708 4.533-4.708 1.312 0 2.686.236 2.686.236v2.97H15.83c-1.491 0-1.956.93-1.956 1.884v2.28h3.328l-.532 3.49h-2.796V24C19.612 23.103 24 18.096 24 12.073z" />,
    color: 'text-blue-500',
  },
];

export default function Footer({
  onNavigateSlide,
  className = '',
  onNavigateHome,
  onNavigateRoles,
  onNavigateContact,
}: FooterProps) {
  const navigate = (index: number) => {
    if (onNavigateSlide) onNavigateSlide(index);
    else if (index === 0) onNavigateHome?.();
    else if (index === 1) onNavigateRoles?.();
    else if (index === 2) onNavigateContact?.();
  };

  return (
    <footer
      data-chrome="true"
      data-footer="true"
      className={`relative w-full overflow-hidden border-t border-amber-500/25 bg-[#090807] px-6 py-8 text-slate-200 sm:px-10 sm:py-10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(223,165,71,0.12),transparent_65%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <img
              src="/pranav_mahajan_transparent.png"
              alt="Pranav Mahajan logo"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </div>
          <p className="mt-2 text-xs font-medium tracking-wide text-amber-100/75 sm:text-sm">
            Global Keynote Speaker <span className="px-1 text-amber-500">•</span> Mindset Architect
          </p>
          <nav aria-label="Social media" className="mt-5 flex flex-wrap items-center gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-[#140e09] transition hover:border-amber-300 hover:bg-[#24190f]"
              >
                <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-current ${social.color}`} aria-hidden="true">
                  {social.icon}
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(0)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 transition hover:text-amber-300"
          >
            About pravan  <ArrowUpRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate(2)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 transition hover:text-amber-300"
          >
            Contact Us <ArrowUpRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
      <div className="relative mx-auto mt-7 w-full max-w-7xl border-t border-amber-500/15 pt-4 text-center text-[11px] text-slate-500 sm:text-left">
        © 2026 Pranav Mahajan. All rights reserved.
      </div>
    </footer>
  );
}
