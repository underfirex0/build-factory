'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/** Slower, gentler easing than the restaurant template — this site's whole job
 *  is to lower anxiety, not create excitement. Respects prefers-reduced-motion
 *  by not initializing at all. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ duration: 1.4, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 3) });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
