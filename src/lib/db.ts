import {
  mockSites,
  mockDemoContent,
  mockActiveContent,
  mockDentalDemoContent,
  mockDentalActiveContent,
} from './mock-data';
import type { TemplateContent } from './schema';

// template id -> (slug, demo content, active content). Extend this map each
// time a new template is registered — same source of truth as the preview
// route's TEMPLATE_REGISTRY, just keyed by id instead of slug since that's
// what a `sites` row stores.
const TEMPLATE_CONTENT_BY_ID: Record<string, { slug: string; demo: TemplateContent; active: TemplateContent }> = {
  t1: { slug: 'elite-restaurant', demo: mockDemoContent, active: mockActiveContent },
  t2: { slug: 'pro-dental', demo: mockDentalDemoContent, active: mockDentalActiveContent },
};

/**
 * Swap this file's internals for real Supabase queries when you connect a
 * project — every caller (CRM pages, /site/[slug]) already goes through here,
 * so nothing else needs to change.
 *
 * Real version sketch:
 *   const { data } = await supabase.from('sites').select(`
 *     *, companies(*, company_media(*), company_reviews(*)), templates(*)
 *   `).eq('slug', slug).single();
 *   // then map the row shape into TemplateContent
 */
export async function getSiteContentBySlug(
  slug: string,
): Promise<{ templateSlug: string; content: TemplateContent } | null> {
  const site = mockSites.find((s) => s.slug === slug);
  if (!site) return null;

  const entry = TEMPLATE_CONTENT_BY_ID[site.templateId];
  if (!entry) return null;

  const content = site.status === 'active' ? entry.active : entry.demo;
  return { templateSlug: entry.slug, content };
}
