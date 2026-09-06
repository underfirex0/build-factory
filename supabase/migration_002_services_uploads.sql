-- Run this in Supabase SQL Editor. Safe to run even if you're not sure —
-- everything is guarded with IF NOT EXISTS so it won't error on things
-- that already exist from your first schema run.

create table if not exists company_services (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  description text,
  price text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists upload_tokens (
  token uuid primary key default uuid_generate_v4(),
  deal_id uuid references deals(id) on delete cascade,
  company_id uuid references companies(id) on delete cascade,
  used_at timestamptz,
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '14 days')
);

create index if not exists idx_company_services_company on company_services(company_id);
