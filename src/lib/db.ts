import { mockSites, mockDemoContent, mockActiveContent } from './mock-data';
import type { TemplateContent } from './schema';

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

  const templateSlug = site.templateId === 't1' ? 'elite-restaurant' : 'elite-restaurant'; // only one built so far
  const content = site.status === 'active' ? mockActiveContent : mockDemoContent;

  return { templateSlug, content };
}
