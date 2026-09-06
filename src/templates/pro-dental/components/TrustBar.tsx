import type { TemplateContent } from '@/lib/schema';

// Renders only fields that are actually present — no fallback "Board Certified"
// or invented credential ever appears here if the data doesn't have one.
export function TrustBar({ content }: { content: TemplateContent }) {
  const { badges, stats } = content;
  if (!badges?.length && !stats?.reviewCount) return null;

  return (
    <div className="border-y border-[#1E2B26]/10 bg-[#F3EFE7]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-4 flex flex-wrap items-center gap-x-8 gap-y-2 justify-center font-warm text-sm text-[#5C6E64]">
        {stats?.reviewCount && <span>{stats.reviewCount}+ patients treated</span>}
        {badges?.map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>
    </div>
  );
}
