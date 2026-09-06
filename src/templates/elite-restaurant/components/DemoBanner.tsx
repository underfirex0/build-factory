'use client';

import { motion } from 'framer-motion';

/** Renders only when content.status === 'demo'. Tasteful, not a watermark —
 *  the sales pitch lives in the quality of the site, not the disclaimer. */
export function DemoBanner() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-[#1a1a1a] text-[#f0e6d8] text-xs sm:text-sm px-4 py-2 flex items-center justify-center gap-3 text-center"
    >
      <span>Preview — this is a demo. We'll use your real photos once you activate.</span>
      <a href="#contact" className="underline underline-offset-2 shrink-0">
        Activate
      </a>
    </motion.div>
  );
}
