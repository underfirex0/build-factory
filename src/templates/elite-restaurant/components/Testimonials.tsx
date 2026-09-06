'use client';

import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

// Hard rule from the template brief: only render what's actually in the data.
// No fallback fabricated review is ever written here.
export function Testimonials({ content }: { content: TemplateContent }) {
  if (content.testimonials.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-20 bg-[#0f0d0b]">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h2 className="font-serif text-[#f5ede1]" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
          What people say
        </h2>
        {content.stats?.rating && (
          <span className="text-[#c9a876] font-mono text-sm">
            {content.stats.rating.toFixed(1)} ★ · {content.stats.reviewCount} reviews
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.testimonials.map((t, i) => (
          <motion.blockquote
            key={t.authorName + i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border-l-2 border-[#c9a876] pl-5"
          >
            <p className="text-[#e8dcc8] text-lg font-serif leading-snug">"{t.text}"</p>
            <footer className="text-[#a89c88] text-sm mt-3">
              {t.authorName} {t.source && <span>· {t.source}</span>}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
