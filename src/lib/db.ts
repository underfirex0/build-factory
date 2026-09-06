import { isSupabaseConfigured } from './supabase/config';
import { createServiceClient } from './supabase/server';
import { getPlaceholderMedia } from './placeholder-media';
import {
  mockSites,
  mockDeals,
  mockTemplates,
  mockDemoContent,
  mockActiveContent,
  mockDentalDemoContent,
  mockDentalActiveContent,
} from './mock-data';
import type { TemplateContent, Deal, Site, Template } from './schema';

/**
 * The single data-access layer. Every page and server action goes through
 * here — nothing else imports mock-data.ts or a Supabase client directly.
 * In mock mode (no env vars) everything reads mock-data.ts, exactly as it
 * has since the first version of this app. In connected mode, every
 * function below queries the real tables from supabase/schema.sql instead.
 */

const TEMPLATE_CONTENT_BY_ID: Record<string, { slug: string; demo: TemplateContent; active: TemplateContent }> = {
  t1: { slug: 'elite-restaurant', demo: mockDemoContent, active: mockActiveContent },
  t2: { slug: 'pro-dental', demo: mockDentalDemoContent, active: mockDentalActiveContent },
};

// ---------------------------------------------------------------------------
// READS
// ---------------------------------------------------------------------------

export async function getDeals(): Promise<Deal[]> {
  if (!isSupabaseConfigured) return mockDeals;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('deals')
    .select('id, stage, value, updated_at, companies(id, name, city), app_users(full_name)')
    .order('updated_at', { ascending: false });

  if (error) throw new Error(`getDeals: ${error.message}`);

  return (data ?? []).map((row: any) => ({
    id: row.id,
    companyId: row.companies?.id,
    companyName: row.companies?.name ?? 'Unknown',
    companyCity: row.companies?.city ?? '',
    ownerName: row.app_users?.full_name,
    stage: row.stage,
    value: row.value ?? undefined,
    lastActivityAt: row.updated_at,
  }));
}

export async function getDealByCompanyId(companyId: string): Promise<Deal | null> {
  const deals = await getDeals();
  return deals.find((d) => d.companyId === companyId) ?? null;
}

export async function getSites(): Promise<Site[]> {
  if (!isSupabaseConfigured) return mockSites;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('sites')
    .select('id, slug, custom_domain, status, view_count, created_at, company_id, template_id, companies(name), templates(name)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`getSites: ${error.message}`);

  return (data ?? []).map((row: any) => ({
    id: row.id,
    companyId: row.company_id,
    companyName: row.companies?.name ?? 'Unknown',
    templateId: row.template_id,
    templateName: row.templates?.name ?? 'Unknown template',
    slug: row.slug,
    customDomain: row.custom_domain ?? undefined,
    status: row.status,
    viewCount: row.view_count ?? 0,
    createdAt: row.created_at,
  }));
}

export async function getSiteById(siteId: string): Promise<Site | null> {
  const sites = await getSites();
  return sites.find((s) => s.id === siteId) ?? null;
}

export async function getActivities(dealId: string): Promise<{ channel: string; content: string; createdAt: string }[]> {
  if (!isSupabaseConfigured) return []; // mock mode has no per-deal activity log yet

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('activities')
    .select('channel, content, created_at')
    .eq('deal_id', dealId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`getActivities: ${error.message}`);
  return (data ?? []).map((row: any) => ({ channel: row.channel, content: row.content, createdAt: row.created_at }));
}

export async function getTemplates(): Promise<Template[]> {
  if (!isSupabaseConfigured) return mockTemplates;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('templates')
    .select('id, slug, name, vertical, tier, version, is_active')
    .eq('is_active', true);

  if (error) throw new Error(`getTemplates: ${error.message}`);

  return (data ?? []).map((row: any) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    vertical: row.vertical,
    tier: row.tier,
    version: row.version,
    isActive: row.is_active,
  }));
}

/** Powers /site/[slug] — resolves a hostname/slug to the business content a
 *  template should render. This is the read path the middleware rewrite ends up at. */
export async function getSiteContentBySlug(
  slug: string,
): Promise<{ templateSlug: string; content: TemplateContent } | null> {
  if (!isSupabaseConfigured) {
    const site = mockSites.find((s) => s.slug === slug);
    if (!site) return null;
    const entry = TEMPLATE_CONTENT_BY_ID[site.templateId];
    if (!entry) return null;
    return { templateSlug: entry.slug, content: site.status === 'active' ? entry.active : entry.demo };
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('sites')
    .select(`
      status, seo_title, seo_description,
      templates(slug),
      companies(
        id, name, category, city, phone, whatsapp, address, hours, description, rating, review_count,
        company_media(kind, url, is_placeholder, alt, sort_order),
        company_reviews(author_name, rating, text, source, review_date),
        company_services(name, description, price, image_url, sort_order)
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  const company = (data as any).companies;
  const media: any[] = company?.company_media ?? [];
  const reviews: any[] = company?.company_reviews ?? [];

  const content: TemplateContent = {
    status: (data as any).status,
    business: {
      id: company.id,
      name: company.name,
      category: company.category,
      city: company.city,
      phone: company.phone,
      whatsapp: company.whatsapp,
      address: company.address,
      hours: company.hours ?? undefined,
      description: company.description,
      rating: company.rating,
      reviewCount: company.review_count,
    },
    brand: { primaryColor: '#6E8F7C' }, // TODO: source from a real brand table once templates need per-business brand color
    media: (media.filter((m) => m.kind === 'hero').length > 0 || media.filter((m) => m.kind === 'gallery').length > 0)
      ? {
          heroImages: media.filter((m) => m.kind === 'hero').map((m) => ({ url: m.url, isPlaceholder: m.is_placeholder, alt: m.alt ?? '' })),
          gallery: media.filter((m) => m.kind === 'gallery').map((m) => ({ url: m.url, isPlaceholder: m.is_placeholder, alt: m.alt ?? '' })),
        }
      : getPlaceholderMedia(company.category, company.id), // no real photos yet — category-matched placeholders instead of a blank hero
    services: (company?.company_services ?? [])
      .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((s: any) => ({ name: s.name, description: s.description, price: s.price, imageUrl: s.image_url })),
    testimonials: reviews.map((r) => ({
      authorName: r.author_name,
      text: r.text,
      rating: r.rating,
      source: r.source,
      date: r.review_date,
    })),
    stats: { rating: company.rating, reviewCount: company.review_count },
    seo: {
      title: (data as any).seo_title ?? company.name,
      description: (data as any).seo_description ?? company.description ?? '',
    },
  };

  return { templateSlug: (data as any).templates.slug, content };
}
