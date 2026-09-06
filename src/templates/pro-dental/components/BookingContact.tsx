import type { TemplateContent } from '@/lib/schema';

export function BookingContact({ content }: { content: TemplateContent }) {
  const { business } = content;
  return (
    <section id="book" className="px-6 sm:px-12 py-24 bg-[#1E2B26] text-center">
      <h2 className="font-display text-[#FBF9F5] mb-4" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)' }}>
        Book your visit
      </h2>
      <p className="font-warm text-[#C8D3CC] mb-8">{business.phone}</p>
      <a
        href={business.whatsapp ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}` : '#'}
        className="inline-block bg-[#6E8F7C] text-[#FBF9F5] font-warm px-8 py-4 rounded-full hover:bg-[#7FA08D] transition-colors"
      >
        Message on WhatsApp
      </a>
      {business.hours && (
        <div className="mt-10 font-warm text-[#8FA69A] text-sm space-y-1">
          {business.hours.map((h) => (
            <div key={h.day}>
              {h.day}: {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
