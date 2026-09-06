'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { TemplateContent } from '@/lib/schema';

export function Hero({ content }: { content: TemplateContent }) {
  const hero = content.media.heroImages[0];
  const { business, stats } = content;

  return (
    <section className="relative px-6 sm:px-12 pt-16 sm:pt-24 pb-20 bg-[#FBF9F5] overflow-hidden">
      <div className="grid sm:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          {stats?.rating && (
            <div className="flex items-center gap-2 mb-6 text-[#1E2B26]/70 font-warm text-sm">
              <span className="text-[#C98C7D]">★★★★★</span>
              <span>{stats.rating.toFixed(1)} from {stats.reviewCount} patients</span>
            </div>
          )}
          <h1
            className="font-display text-[#1E2B26]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', lineHeight: 1.08 }}
          >
            {business.description ? business.description.split('.')[0] : business.name}
          </h1>
          <p className="font-warm text-[#5C6E64] mt-5 max-w-md" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)' }}>
            {business.name} · {business.city}
          </p>
          <a
            href="#book"
            className="inline-block mt-8 bg-[#6E8F7C] text-[#FBF9F5] font-warm px-7 py-3.5 rounded-full hover:bg-[#5C7A69] transition-colors"
          >
            Book an appointment
          </a>
        </div>

        <div className="relative aspect-[4/5]">
          {/* One orchestrated hero moment: an organic blob mask reveals the
              photo on load — everything else on the page stays calm. */}
          <motion.div
            initial={{ clipPath: 'inset(15% 15% 85% 15% round 40% 60% 30% 70%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 42% 58% 40% 60%)' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {hero && (
              <Image src={hero.url} alt={hero.alt} fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
            )}
          </motion.div>
          {/* Soft organic accent shape behind the photo, echoing the calming
              "abstract shapes" pattern common to the best dental sites */}
          <div
            className="absolute -z-10 -bottom-8 -right-8 w-40 h-40 bg-[#C98C7D]/30"
            style={{ borderRadius: '42% 58% 40% 60% / 60% 40% 60% 40%' }}
          />
        </div>
      </div>
    </section>
  );
}
