import { z } from 'zod';

/**
 * This file is the single source of truth for data shape across:
 * - the CRM pages (leads, pipeline, sites)
 * - the build engine (bulk assign template -> companies)
 * - every template's `content` prop (see /src/templates/*)
 *
 * If you change a field here, it must stay in sync with supabase/schema.sql.
 */

export const dealStageSchema = z.enum([
  'scraped',
  'demo_built',
  'demo_sent',
  'demo_viewed',
  'replied',
  'paid',
  'activated',
  'lost',
]);
export type DealStage = z.infer<typeof dealStageSchema>;

export const DEAL_STAGES: { value: DealStage; label: string }[] = [
  { value: 'scraped', label: 'Scraped' },
  { value: 'demo_built', label: 'Demo built' },
  { value: 'demo_sent', label: 'Demo sent' },
  { value: 'demo_viewed', label: 'Demo viewed' },
  { value: 'replied', label: 'Replied' },
  { value: 'paid', label: 'Paid' },
  { value: 'activated', label: 'Activated' },
  { value: 'lost', label: 'Lost' },
];

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  city: z.string(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  hours: z
    .array(
      z.object({
        day: z.string(),
        open: z.string(),
        close: z.string(),
        closed: z.boolean().optional(),
      }),
    )
    .optional(),
  description: z.string().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
});
export type Company = z.infer<typeof companySchema>;

export const mediaItemSchema = z.object({
  url: z.string(),
  isPlaceholder: z.boolean(),
  alt: z.string(),
});
export type MediaItem = z.infer<typeof mediaItemSchema>;

export const testimonialSchema = z.object({
  authorName: z.string(),
  text: z.string(),
  rating: z.number().min(1).max(5),
  source: z.string().optional(),
  date: z.string().optional(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const serviceItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type ServiceItem = z.infer<typeof serviceItemSchema>;

/**
 * The exact contract every template must render from — nothing hardcoded,
 * everything sourced from this object. This mirrors buildfactory-template-brief.md.
 */
export const templateContentSchema = z.object({
  status: z.enum(['demo', 'active']),
  business: companySchema,
  brand: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string().optional(),
    logoUrl: z.string().optional(),
  }),
  media: z.object({
    heroImages: z.array(mediaItemSchema),
    gallery: z.array(mediaItemSchema),
  }),
  services: z.array(serviceItemSchema),
  testimonials: z.array(testimonialSchema),
  stats: z
    .object({
      rating: z.number().optional(),
      reviewCount: z.number().optional(),
      yearsInBusiness: z.number().optional(),
    })
    .optional(),
  social: z.array(z.object({ platform: z.string(), url: z.string() })).optional(),
  badges: z.array(z.string()).optional(), // real credentials only, e.g. "Ordre National des Médecins Dentistes" — never invented
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImageUrl: z.string().optional(),
  }),
});
export type TemplateContent = z.infer<typeof templateContentSchema>;

export const templateSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  vertical: z.string(),
  tier: z.enum(['starter', 'pro', 'elite']),
  version: z.number(),
  isActive: z.boolean(),
});
export type Template = z.infer<typeof templateSchema>;

export const siteSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  companyName: z.string(),
  templateId: z.string(),
  templateName: z.string(),
  slug: z.string(),
  customDomain: z.string().optional(),
  status: z.enum(['demo', 'active', 'archived']),
  viewCount: z.number(),
  createdAt: z.string(),
});
export type Site = z.infer<typeof siteSchema>;

export const dealSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  companyName: z.string(),
  companyCity: z.string(),
  siteId: z.string().optional(),
  ownerName: z.string().optional(),
  stage: dealStageSchema,
  value: z.number().optional(),
  lastActivityAt: z.string().optional(),
});
export type Deal = z.infer<typeof dealSchema>;
