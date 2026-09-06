'use client';

import { motion } from 'framer-motion';

export function DemoBanner() {
  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-[#1E2B26] text-[#FBF9F5] text-xs sm:text-sm px-4 py-2.5 flex items-center justify-center gap-3 text-center font-warm"
    >
      <span>Preview — this is a demo. We'll use your real photos once you activate.</span>
      <a href="#book" className="underline underline-offset-2 shrink-0">
        Activate
      </a>
    </motion.div>
  );
}
