import type { MediaItem } from './schema';

/**
 * Fresh leads from the scraper have zero rows in company_media until someone
 * enriches them or they activate. Rendering a demo with no hero/gallery image
 * at all looks broken, not "clean minimal" — so a bulk-built demo falls back
 * to a curated, category-matched placeholder pool instead of an empty state.
 *
 * These are real, licensed-for-use Unsplash photos, picked deliberately per
 * vertical (never a single hardcoded image repeated across every business —
 * that's the exact thing that made v1 look like a template farm). Selection
 * is deterministic per company (hashed from its id) so the same business
 * always gets the same placeholder set, but different businesses in the same
 * batch don't all get an identical photo.
 */
const POOLS: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
  ],
  dentist: [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09',
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95',
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5',
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe',
  ],
  salon: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df',
    'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6',
  ],
  gym: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f',
  ],
};

const FALLBACK_POOL = POOLS.restaurant; // used if a category has no curated pool yet

function hashToIndex(id: string, mod: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash % mod;
}

function sizedUrl(base: string, w: number, h: number): string {
  return `${base}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export function getPlaceholderMedia(category: string, companyId: string): {
  heroImages: MediaItem[];
  gallery: MediaItem[];
} {
  const pool = POOLS[category.toLowerCase()] ?? FALLBACK_POOL;
  const start = hashToIndex(companyId, pool.length);
  const ordered = [...pool.slice(start), ...pool.slice(0, start)];

  return {
    heroImages: [
      { url: sizedUrl(ordered[0], 1600, 1000), isPlaceholder: true, alt: `${category} placeholder photo` },
    ],
    gallery: ordered.slice(1).map((url) => ({
      url: sizedUrl(url, 800, 1000),
      isPlaceholder: true,
      alt: `${category} placeholder photo`,
    })),
  };
}
