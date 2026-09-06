import type { Deal, Site, Template, TemplateContent } from './schema';

// This file is the ONLY place mock data lives. Every page imports from here.
// Swap these functions for real Supabase queries in /src/lib/db.ts when ready —
// the page components never need to change, since they're typed against
// the same schema either way.

export const mockTemplates: Template[] = [
  { id: 't1', slug: 'elite-restaurant', name: 'Maison — Elite Restaurant', vertical: 'restaurant', tier: 'elite', version: 3, isActive: true },
  { id: 't2', slug: 'pro-dental', name: 'Clarity — Pro Dental', vertical: 'dentist', tier: 'pro', version: 2, isActive: true },
  { id: 't3', slug: 'elite-salon', name: 'Lumière — Elite Salon', vertical: 'salon', tier: 'elite', version: 1, isActive: true },
  { id: 't4', slug: 'starter-fitness', name: 'Forge — Starter Gym', vertical: 'gym', tier: 'starter', version: 1, isActive: true },
];

export const mockDeals: Deal[] = [
  { id: 'd1', companyId: 'c1', companyName: 'Le Riad Bleu', companyCity: 'Casablanca', siteId: 's1', ownerName: 'Yassine', stage: 'demo_sent', lastActivityAt: '2026-09-04' },
  { id: 'd2', companyId: 'c2', companyName: 'Cabinet Dentaire Atlas', companyCity: 'Rabat', siteId: 's2', ownerName: 'Salma', stage: 'demo_viewed', lastActivityAt: '2026-09-05' },
  { id: 'd3', companyId: 'c3', companyName: 'Salon Lumière', companyCity: 'Marrakech', siteId: 's3', ownerName: 'Yassine', stage: 'replied', lastActivityAt: '2026-09-05' },
  { id: 'd4', companyId: 'c4', companyName: 'FitZone Gym', companyCity: 'Tanger', siteId: 's4', ownerName: 'Salma', stage: 'paid', value: 4500, lastActivityAt: '2026-09-03' },
  { id: 'd5', companyId: 'c5', companyName: 'Pizzeria Napoli', companyCity: 'Casablanca', siteId: 's5', ownerName: 'Yassine', stage: 'activated', value: 6000, lastActivityAt: '2026-08-30' },
  { id: 'd6', companyId: 'c6', companyName: 'Clinique Sourire', companyCity: 'Fès', ownerName: 'Salma', stage: 'scraped', lastActivityAt: '2026-09-06' },
  { id: 'd7', companyId: 'c7', companyName: 'Barber\'s Corner', companyCity: 'Casablanca', siteId: 's7', ownerName: 'Yassine', stage: 'demo_built', lastActivityAt: '2026-09-06' },
  { id: 'd8', companyId: 'c8', companyName: 'Yoga Loft', companyCity: 'Rabat', stage: 'lost', lastActivityAt: '2026-08-20' },
];

export const mockSites: Site[] = [
  { id: 's1', companyId: 'c1', companyName: 'Le Riad Bleu', templateId: 't1', templateName: 'Maison — Elite Restaurant', slug: 'le-riad-bleu', status: 'demo', viewCount: 12, createdAt: '2026-09-01' },
  { id: 's2', companyId: 'c2', companyName: 'Cabinet Dentaire Atlas', templateId: 't2', templateName: 'Clarity — Pro Dental', slug: 'cabinet-atlas', status: 'demo', viewCount: 31, createdAt: '2026-09-02' },
  { id: 's3', companyId: 'c3', companyName: 'Salon Lumière', templateId: 't3', templateName: 'Lumière — Elite Salon', slug: 'salon-lumiere', status: 'demo', viewCount: 8, createdAt: '2026-09-02' },
  { id: 's4', companyId: 'c4', companyName: 'FitZone Gym', templateId: 't4', templateName: 'Forge — Starter Gym', slug: 'fitzone', status: 'demo', viewCount: 19, createdAt: '2026-08-28' },
  { id: 's5', companyId: 'c5', companyName: 'Pizzeria Napoli', templateId: 't1', templateName: 'Maison — Elite Restaurant', slug: 'pizzeria-napoli', customDomain: 'pizzerianapoli.ma', status: 'active', viewCount: 204, createdAt: '2026-08-15' },
  { id: 's7', companyId: 'c7', companyName: "Barber's Corner", templateId: 't3', templateName: 'Lumière — Elite Salon', slug: 'barbers-corner', status: 'demo', viewCount: 2, createdAt: '2026-09-06' },
];

export const mockDemoContent: TemplateContent = {
  status: 'demo',
  business: {
    id: 'c1',
    name: 'Le Riad Bleu',
    category: 'restaurant',
    city: 'Casablanca',
    phone: '+212 522 00 00 00',
    whatsapp: '+212 600 00 00 00',
    address: '12 Rue des Fleurs, Casablanca',
    hours: [
      { day: 'Mon–Fri', open: '12:00', close: '23:00' },
      { day: 'Sat–Sun', open: '13:00', close: '00:00' },
    ],
    description:
      'A modern Moroccan bistro blending traditional riad architecture with contemporary Mediterranean cuisine.',
    rating: 4.7,
    reviewCount: 214,
  },
  brand: { primaryColor: '#8C3A2B', secondaryColor: '#D9B88F' },
  media: {
    heroImages: [{ url: '/placeholder/restaurant-hero.jpg', isPlaceholder: true, alt: 'Restaurant interior, placeholder' }],
    gallery: [
      { url: '/placeholder/restaurant-1.jpg', isPlaceholder: true, alt: 'Dish placeholder' },
      { url: '/placeholder/restaurant-2.jpg', isPlaceholder: true, alt: 'Dish placeholder' },
      { url: '/placeholder/restaurant-3.jpg', isPlaceholder: true, alt: 'Interior placeholder' },
    ],
  },
  services: [
    { name: 'Tasting Menu', description: 'Five-course seasonal tasting menu', price: '450 MAD' },
    { name: 'Private Dining', description: 'Riad courtyard reserved for up to 12 guests', price: 'On request' },
  ],
  testimonials: [
    { authorName: 'Amine K.', text: 'Best tagine I\'ve had in Casablanca, and the courtyard setting is stunning.', rating: 5, source: 'Google Reviews', date: '2026-07-12' },
    { authorName: 'Sara B.', text: 'Service was attentive and the wine pairing suggestions were spot on.', rating: 5, source: 'Google Reviews', date: '2026-06-30' },
  ],
  stats: { rating: 4.7, reviewCount: 214 },
  social: [{ platform: 'instagram', url: 'https://instagram.com/leriaudbleu' }],
  seo: {
    title: 'Le Riad Bleu — Modern Moroccan Bistro in Casablanca',
    description: 'A modern Moroccan bistro in the heart of Casablanca, blending riad architecture with contemporary cuisine.',
  },
};

export const mockActiveContent: TemplateContent = {
  ...mockDemoContent,
  status: 'active',
  media: {
    heroImages: [{ url: '/real/riad-bleu-hero.jpg', isPlaceholder: false, alt: 'Le Riad Bleu courtyard at dusk' }],
    gallery: [
      { url: '/real/riad-bleu-1.jpg', isPlaceholder: false, alt: 'Signature tagine dish' },
      { url: '/real/riad-bleu-2.jpg', isPlaceholder: false, alt: 'Courtyard seating' },
      { url: '/real/riad-bleu-3.jpg', isPlaceholder: false, alt: 'Chef plating a dish' },
    ],
  },
};
