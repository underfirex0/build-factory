import type { TemplateContent } from '@/lib/schema';
import { SmoothScroll } from './components/SmoothScroll';
import { DemoBanner } from './components/DemoBanner';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';

/**
 * The one integration surface for this template. Takes ONLY `content` —
 * no hardcoded business data anywhere in this tree. Renders identically
 * for any business; demo vs active is handled purely by content.status.
 */
export function EliteRestaurantTemplate({ content }: { content: TemplateContent }) {
  return (
    <SmoothScroll>
      <div className="bg-[#0f0d0b] font-sans">
        {content.status === 'demo' && <DemoBanner />}
        <Hero content={content} />
        <Services content={content} />
        <Gallery content={content} />
        <Testimonials content={content} />
        <Contact content={content} />
      </div>
    </SmoothScroll>
  );
}
