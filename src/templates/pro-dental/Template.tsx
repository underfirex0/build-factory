import type { TemplateContent } from '@/lib/schema';
import { SmoothScroll } from './components/SmoothScroll';
import { DemoBanner } from './components/DemoBanner';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Treatments } from './components/Treatments';
import { SmileGallery } from './components/SmileGallery';
import { Testimonials } from './components/Testimonials';
import { BookingContact } from './components/BookingContact';

/**
 * The one integration surface for this template. Renders purely from
 * `content` — demo vs active, every section's presence, is all data-driven.
 * Design direction: calm over hype (see design-notes.md in this folder) —
 * this exists to lower a patient's anxiety, not to create excitement.
 */
export function ProDentalTemplate({ content }: { content: TemplateContent }) {
  return (
    <SmoothScroll>
      <div className="bg-[#FBF9F5] font-warm">
        {content.status === 'demo' && <DemoBanner />}
        <Hero content={content} />
        <TrustBar content={content} />
        <Treatments content={content} />
        <SmileGallery content={content} />
        <Testimonials content={content} />
        <BookingContact content={content} />
      </div>
    </SmoothScroll>
  );
}
