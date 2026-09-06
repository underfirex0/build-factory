'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

export function SmileGallery({ content }: { content: TemplateContent }) {
  if (content.media.gallery.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-20 bg-[#F3EFE7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-[#1E2B26] mb-10" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)' }}>
          Our practice
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {content.media.gallery.map((img, i) => (
            <motion.div
              key={img.url}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="(min-width: 640px) 33vw, 100vw" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
