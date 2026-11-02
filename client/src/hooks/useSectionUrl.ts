'use client';

import { useEffect } from 'react';

/** Syncs scrollable page sections to reloadable paths and restores them on browser history navigation. */
export function useSectionUrl(
  rootRef: { current: HTMLElement | null },
  basePath: string,
  initialSection?: string,
  active = true,
) {
  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-url-section]'));
    let suppressUpdatesUntil = Date.now() + 700;
    let activePath = window.location.pathname;
    const pathFor = (section: string) => section === 'top' ? basePath : `${basePath}/${section}`;
    const scrollToPath = (path: string) => {
      const requested = path.slice(basePath.length).split('/').filter(Boolean)[0] || 'top';
      const target = sections.find((section) => section.dataset.urlSection === requested)
        ?? (requested === 'focus' || requested === 'exam-confidence' ? sections.find((section) => section.dataset.urlSection === 'the-approach') : undefined)
        ?? sections[0];
      if (!target) return;
      suppressUpdatesUntil = Date.now() + 800;
      const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
      root.scrollTo({ top, behavior: 'smooth' });
    };
    const restoreFromUrl = () => {
      activePath = window.location.pathname;
      scrollToPath(activePath);
    };

    if (initialSection) {
      const requestedPath = pathFor(initialSection);
      if (window.location.pathname !== requestedPath) window.history.replaceState(window.history.state, '', requestedPath);
      activePath = requestedPath;
      scrollToPath(requestedPath);
    } else if (window.location.pathname !== basePath) {
      scrollToPath(window.location.pathname);
    }
    window.addEventListener('popstate', restoreFromUrl);
    const observer = new IntersectionObserver((entries) => {
      if (Date.now() < suppressUpdatesUntil) return;
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const section = visible?.target as HTMLElement | undefined;
      if (!section?.dataset.urlSection) return;
      const nextPath = pathFor(section.dataset.urlSection);
      if (nextPath === activePath) return;
      activePath = nextPath;
      window.history.pushState({ section: section.dataset.urlSection }, '', nextPath);
    }, { root, threshold: [0.15, 0.35, 0.6], rootMargin: '-30% 0px -45% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', restoreFromUrl);
    };
  }, [rootRef, basePath, initialSection, active]);
}
