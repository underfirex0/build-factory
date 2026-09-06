-- Run this AFTER migration_002_services_uploads.sql, in the SQL Editor.
-- Populates the real tables with the same sample data shown in earlier
-- screenshots, so your live app isn't just empty once connected.
-- Safe to run once — running it twice will create duplicate rows since
-- these aren't guarded with ON CONFLICT (there's nothing meaningful to
-- conflict on yet). If you need to reset, delete the rows first.

-- Reps
insert into app_users (id, full_name, email, role) values
  ('d0000000-0000-0000-0000-000000000001', 'Yassine', 'yassine@buildfactory.example', 'rep'),
  ('d0000000-0000-0000-0000-000000000002', 'Salma', 'salma@buildfactory.example', 'rep');

-- Templates (only elite-restaurant and pro-dental have real components behind
-- them right now — salon/gym rows exist so the Templates page matches, but
-- their Preview links will 404 until those templates are built)
insert into templates (id, slug, name, vertical, tier, version, content_schema_version, is_active) values
  ('a0000000-0000-0000-0000-000000000001', 'elite-restaurant', 'Maison — Elite Restaurant', 'restaurant', 'elite', 3, 'v1', true),
  ('a0000000-0000-0000-0000-000000000002', 'pro-dental', 'Clarity — Pro Dental', 'dentist', 'pro', 2, 'v1', true),
  ('a0000000-0000-0000-0000-000000000003', 'elite-salon', 'Lumière — Elite Salon', 'salon', 'elite', 1, 'v1', true),
  ('a0000000-0000-0000-0000-000000000004', 'starter-fitness', 'Forge — Starter Gym', 'gym', 'starter', 1, 'v1', true);

-- Companies
insert into companies (id, name, category, city, phone, whatsapp, address, hours, description, rating, review_count) values
  ('b0000000-0000-0000-0000-000000000001', 'Le Riad Bleu', 'restaurant', 'Casablanca', '+212522000000', '+212600000000', '12 Rue des Fleurs, Casablanca',
   '[{"day":"Mon–Fri","open":"12:00","close":"23:00"},{"day":"Sat–Sun","open":"13:00","close":"00:00"}]',
   'A modern Moroccan bistro blending traditional riad architecture with contemporary Mediterranean cuisine.', 4.7, 214),
  ('b0000000-0000-0000-0000-000000000002', 'Cabinet Dentaire Atlas', 'dentist', 'Rabat', '+212537000000', '+212600112233', '8 Avenue Fal Ould Oumeir, Rabat',
   '[{"day":"Mon–Fri","open":"09:00","close":"18:30"},{"day":"Saturday","open":"09:00","close":"13:00"},{"day":"Sunday","open":"","close":"","closed":true}]',
   'A calm, modern dental practice in Rabat focused on gentle preventive care and same-day treatments.', 4.9, 187),
  ('b0000000-0000-0000-0000-000000000003', 'Salon Lumière', 'salon', 'Marrakech', '+212524000000', null, null, null, null, null, null),
  ('b0000000-0000-0000-0000-000000000004', 'FitZone Gym', 'gym', 'Tanger', '+212539000000', null, null, null, null, null, null),
  ('b0000000-0000-0000-0000-000000000005', 'Pizzeria Napoli', 'restaurant', 'Casablanca', '+212522111111', null, null, null, null, null, null),
  ('b0000000-0000-0000-0000-000000000006', 'Clinique Sourire', 'dentist', 'Fès', '+212535000000', null, null, null, null, null, null),
  ('b0000000-0000-0000-0000-000000000007', 'Barber''s Corner', 'salon', 'Casablanca', '+212522222222', null, null, null, null, null, null),
  ('b0000000-0000-0000-0000-000000000008', 'Yoga Loft', 'gym', 'Rabat', '+212537111111', null, null, null, null, null, null);

-- Real content for the two working templates
insert into company_media (company_id, kind, url, is_placeholder, alt, sort_order) values
  ('b0000000-0000-0000-0000-000000000001', 'hero', '/placeholder/restaurant-hero.jpg', true, 'Restaurant interior, placeholder', 0),
  ('b0000000-0000-0000-0000-000000000001', 'gallery', '/placeholder/restaurant-1.jpg', true, 'Dish placeholder', 0),
  ('b0000000-0000-0000-0000-000000000001', 'gallery', '/placeholder/restaurant-2.jpg', true, 'Dish placeholder', 1),
  ('b0000000-0000-0000-0000-000000000001', 'gallery', '/placeholder/restaurant-3.jpg', true, 'Interior placeholder', 2),
  ('b0000000-0000-0000-0000-000000000002', 'hero', '/placeholder/dental-hero.jpg', true, 'Dental practice interior, placeholder', 0),
  ('b0000000-0000-0000-0000-000000000002', 'gallery', '/placeholder/dental-1.jpg', true, 'Treatment room placeholder', 0),
  ('b0000000-0000-0000-0000-000000000002', 'gallery', '/placeholder/dental-2.jpg', true, 'Reception placeholder', 1),
  ('b0000000-0000-0000-0000-000000000002', 'gallery', '/placeholder/dental-3.jpg', true, 'Waiting area placeholder', 2),
  ('b0000000-0000-0000-0000-000000000005', 'hero', '/real/pizzeria-hero.jpg', false, 'Pizzeria Napoli dining room', 0),
  ('b0000000-0000-0000-0000-000000000005', 'gallery', '/real/pizzeria-1.jpg', false, 'Wood-fired oven', 0);

insert into company_reviews (company_id, author_name, rating, text, source, review_date) values
  ('b0000000-0000-0000-0000-000000000001', 'Amine K.', 5, 'Best tagine I''ve had in Casablanca, and the courtyard setting is stunning.', 'Google Reviews', '2026-07-12'),
  ('b0000000-0000-0000-0000-000000000001', 'Sara B.', 5, 'Service was attentive and the wine pairing suggestions were spot on.', 'Google Reviews', '2026-06-30'),
  ('b0000000-0000-0000-0000-000000000002', 'Nadia R.', 5, 'First dentist visit in years that didn''t make me anxious — genuinely gentle and clear about every step.', 'Google Reviews', '2026-08-02'),
  ('b0000000-0000-0000-0000-000000000002', 'Karim T.', 5, 'Same-day appointment for a chipped tooth, fixed within the hour. Very professional.', 'Google Reviews', '2026-07-18');

insert into company_services (company_id, name, description, price, sort_order) values
  ('b0000000-0000-0000-0000-000000000001', 'Tasting Menu', 'Five-course seasonal tasting menu', '450 MAD', 0),
  ('b0000000-0000-0000-0000-000000000001', 'Private Dining', 'Riad courtyard reserved for up to 12 guests', 'On request', 1),
  ('b0000000-0000-0000-0000-000000000002', 'Check-up & Cleaning', 'Full exam, cleaning, and X-rays if needed', '300 MAD', 0),
  ('b0000000-0000-0000-0000-000000000002', 'Teeth Whitening', 'In-office whitening, one session', '1,200 MAD', 1),
  ('b0000000-0000-0000-0000-000000000002', 'Invisalign', 'Clear aligner treatment, full course', 'From 18,000 MAD', 2),
  ('b0000000-0000-0000-0000-000000000002', 'Dental Implants', 'Single implant, consultation included', 'From 6,500 MAD', 3);

-- Sites (Clinique Sourire and Yoga Loft have no site yet, matching the earlier screenshots)
insert into sites (id, company_id, template_id, slug, custom_domain, status, view_count) values
  ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'le-riad-bleu', null, 'demo', 12),
  ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'cabinet-atlas', null, 'demo', 31),
  ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'salon-lumiere', null, 'demo', 8),
  ('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'fitzone', null, 'demo', 19),
  ('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'pizzeria-napoli', 'pizzerianapoli.ma', 'active', 204),
  ('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000003', 'barbers-corner', null, 'demo', 2);

-- Deals — the real pipeline, matching the stages shown earlier
insert into deals (company_id, site_id, owner_id, stage, value, payment_method, paid_at) values
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'demo_sent', null, null, null),
  ('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'demo_viewed', null, null, null),
  ('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 'replied', null, null, null),
  ('b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000002', 'paid', 4500, 'Cash', now()),
  ('b0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000001', 'activated', 6000, 'Bank transfer', now()),
  ('b0000000-0000-0000-0000-000000000006', null, 'd0000000-0000-0000-0000-000000000002', 'scraped', null, null, null),
  ('b0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000001', 'demo_built', null, null, null),
  ('b0000000-0000-0000-0000-000000000008', null, null, 'lost', null, null, null);
