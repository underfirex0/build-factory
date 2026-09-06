'use client';

import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

// Only what's actually in the data ever renders — no fallback quote is ever written here.
export function Testimonials({ content }: { content: TemplateContent }) {
  if (content.testimonials.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-20 bg-[#FBF9F5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-[#1E2B26] mb-10" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)' }}>
          What patients say
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {content.testimonials.map((t, i) => (
            <motion.div
              key={t.authorName + i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#F3EFE7] rounded-2xl p-6"
            >
              <p className="font-warm text-[#1E2B26] leading-relaxed">"{t.text}"</p>
              <p className="font-warm text-[#5C6E64] text-sm mt-4">
                {t.authorName} {t.source && <span>· {t.source}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
