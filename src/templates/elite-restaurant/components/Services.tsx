'use client';

import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

export function Services({ content }: { content: TemplateContent }) {
  if (content.services.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-20 bg-[#0f0d0b]">
      <h2 className="font-serif text-[#f5ede1] mb-10" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
        What we offer
      </h2>
      {/* Asymmetric grid — first item wider, rest form a denser row. Only used
          because the content genuinely varies in importance (tasting menu vs
          add-ons), not decoration for its own sake. */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {content.services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={
              i === 0
                ? 'sm:col-span-2 border border-[#2a2621] p-8 flex flex-col justify-between min-h-[220px]'
                : 'border border-[#2a2621] p-6 flex flex-col justify-between'
            }
          >
            <div>
              <h3 className="font-serif text-[#f5ede1] text-xl mb-2">{service.name}</h3>
              {service.description && (
                <p className="text-[#a89c88] text-sm">{service.description}</p>
              )}
            </div>
            {service.price && (
              <span className="text-[#c9a876] font-mono text-sm mt-4">{service.price}</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
