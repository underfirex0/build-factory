'use client';

import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

export function Treatments({ content }: { content: TemplateContent }) {
  if (content.services.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-20 bg-[#FBF9F5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-[#1E2B26] mb-3" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)' }}>
          Treatments
        </h2>
        <p className="font-warm text-[#5C6E64] mb-10 max-w-lg">
          Upfront pricing, no surprises — because cost shouldn't be the reason you put off a visit.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white rounded-2xl p-6 border border-[#1E2B26]/8"
            >
              <h3 className="font-display text-[#1E2B26] text-lg mb-2">{service.name}</h3>
              {service.description && (
                <p className="font-warm text-[#5C6E64] text-sm mb-4">{service.description}</p>
              )}
              {service.price && (
                <span className="font-warm text-[#6E8F7C] text-sm font-medium">{service.price}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
