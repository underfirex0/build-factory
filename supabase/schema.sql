-- BuildFactory core schema
-- Everything in the product (leads, templates, sites, CRM pipeline, billing)
-- reads and writes against these tables. This is the single source of truth
-- that keeps the CRM, the build engine, and the live sites in sync.

create extension if not exists "uuid-ossp";

-- ============================================================
-- COMPANIES (the businesses we scrape / build sites for)
-- ============================================================
create table companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,               -- restaurant, dentist, salon, gym...
  city text not null,
  phone text,
  whatsapp text,
  address text,
  hours jsonb,                          -- [{day, open, close, closed}]
  description text,
  rating numeric,
  review_count int,
  source text default 'apify_scrape',   -- how this record entered the system
  raw_scrape jsonb,                     -- full original scrape payload, kept for re-enrichment
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table company_media (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  kind text not null check (kind in ('logo','hero','gallery')),
  url text not null,
  is_placeholder boolean default true,  -- true until the business submits real photos
  alt text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table company_reviews (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  source text default 'google_maps',    -- real reviews only, never fabricated
  review_date date,
  created_at timestamptz default now()
);

-- ============================================================
-- TEMPLATES (the design system — versioned, reusable, multi-tenant)
-- ============================================================
create table templates (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,            -- matches /src/templates/<slug>
  name text not null,
  vertical text not null,               -- which business category this targets
  tier text not null check (tier in ('starter','pro','elite')),
  version int not null default 1,
  content_schema_version text not null, -- which TemplateContent contract shape it expects
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- SITES (one row per business+template deployment; NOT one deploy per site —
-- rendering is multi-tenant, resolved by hostname/slug at request time)
-- ============================================================
create table sites (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  template_id uuid references templates(id),
  slug text unique not null,            -- <slug>.yako.studio
  custom_domain text,
  status text not null default 'demo' check (status in ('demo','active','archived')),
  seo_title text,
  seo_description text,
  view_count int default 0,
  last_viewed_at timestamptz,
  activated_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- BUILDS (a bulk-build job — many sites created in one shot)
-- ============================================================
create table build_jobs (
  id uuid primary key default uuid_generate_v4(),
  template_id uuid references templates(id),
  status text not null default 'queued' check (status in ('queued','running','completed','failed')),
  total_count int not null,
  success_count int default 0,
  failed_count int default 0,
  created_by uuid,                      -- references app_users(id)
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table build_job_items (
  id uuid primary key default uuid_generate_v4(),
  build_job_id uuid references build_jobs(id) on delete cascade,
  company_id uuid references companies(id),
  site_id uuid references sites(id),
  status text not null default 'pending' check (status in ('pending','success','failed')),
  error text
);

-- ============================================================
-- CRM PIPELINE
-- ============================================================
create table app_users (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text unique not null,
  role text not null default 'rep' check (role in ('admin','rep')),
  created_at timestamptz default now()
);

create table deals (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  site_id uuid references sites(id),
  owner_id uuid references app_users(id),
  stage text not null default 'scraped' check (
    stage in ('scraped','demo_built','demo_sent','demo_viewed','replied','paid','activated','lost')
  ),
  value numeric,
  payment_method text,
  paid_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table activities (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references deals(id) on delete cascade,
  user_id uuid references app_users(id),
  channel text not null check (channel in ('whatsapp','call','email','note','system')),
  content text not null,
  created_at timestamptz default now()
);

create table invoices (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references deals(id) on delete cascade,
  amount numeric not null,
  status text not null default 'pending' check (status in ('pending','paid','partial')),
  issued_at timestamptz default now(),
  paid_at timestamptz
);

create index idx_sites_company on sites(company_id);
create index idx_deals_stage on deals(stage);
create index idx_activities_deal on activities(deal_id);
create index idx_company_media_company on company_media(company_id);
