'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

export function Gallery({ content }: { content: TemplateContent }) {
  if (content.media.gallery.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {content.media.gallery.map((img, i) => (
          <motion.div
            key={img.url}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
            className="relative aspect-[4/5]"
          >
            <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="(min-width: 640px) 33vw, 100vw" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
