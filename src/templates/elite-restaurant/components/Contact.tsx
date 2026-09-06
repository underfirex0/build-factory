'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block bg-[#c9a876] text-[#0f0d0b] px-8 py-4 font-medium"
    >
      {children}
    </motion.a>
  );
}

export function Contact({ content }: { content: TemplateContent }) {
  const { business, brand } = content;
  return (
    <section id="contact" className="px-6 sm:px-12 py-24 text-center" style={{ backgroundColor: brand.primaryColor }}>
      <h2 className="font-serif text-[#f5ede1] mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
        Reserve a table
      </h2>
      <p className="text-[#e8dcc8] mb-8">{business.phone}</p>
      <MagneticButton href={business.whatsapp ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}` : '#'}>
        Message on WhatsApp
      </MagneticButton>
    </section>
  );
}
