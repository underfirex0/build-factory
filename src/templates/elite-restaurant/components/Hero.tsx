'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { TemplateContent } from '@/lib/schema';

export function Hero({ content }: { content: TemplateContent }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: any;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // One deliberate, orchestrated hero moment: the image slowly scales/
        // parallaxes on scroll while the title drifts and fades — a single
        // choreographed sequence, not scattered per-element effects.
        gsap.to(imgRef.current, {
          scale: 1.15,
          yPercent: 15,
          ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(titleRef.current, {
          yPercent: -30,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top top', end: '60% top', scrub: true },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  const hero = content.media.heroImages[0];

  return (
    <section className="relative h-[100svh] overflow-hidden">
      <div ref={imgRef} className="absolute inset-0 -z-10">
        {hero && (
          <Image src={hero.url} alt={hero.alt} fill priority className="object-cover" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      </div>

      <div className="relative h-full flex flex-col justify-end px-6 sm:px-12 pb-16 max-w-4xl">
        <p className="text-[#e8dcc8] text-sm tracking-wide mb-3">{content.business.city}</p>
        <h1
          ref={titleRef}
          className="font-serif text-[#f5ede1]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 1.02 }}
        >
          {content.business.name}
        </h1>
        <p className="text-[#d8cbb4] mt-4 max-w-md" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
          {content.business.description}
        </p>
      </div>
    </section>
  );
}
