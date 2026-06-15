-- ============================================================
-- Dreamer's Way Consultancy — schema sync migration
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- It is idempotent: safe to run multiple times.
--
-- Fixes:
--   1. contacts form failing with PGRST204 "Could not find the
--      'current_country' column" — adds the missing columns.
--   2. admin "Add University/College" failing — ensures the universities
--      columns exist and the new country codes are present so the
--      country_code foreign key resolves.
-- ============================================================

-- ------------------------------------------------------------------
-- 1. CONTACTS — add any missing columns the contact form writes
-- ------------------------------------------------------------------
alter table public.contacts add column if not exists current_country         text;
alter table public.contacts add column if not exists interested_country_code text;
alter table public.contacts add column if not exists interested_stream_code  text;
alter table public.contacts add column if not exists preferred_intake        text;
alter table public.contacts add column if not exists message                 text;
alter table public.contacts add column if not exists email                   text;
alter table public.contacts add column if not exists status                  text default 'new';

-- Make sure the public can insert (form runs with the anon key)
alter table public.contacts enable row level security;
drop policy if exists "contacts public insert" on public.contacts;
create policy "contacts public insert" on public.contacts for insert with check (true);

-- ------------------------------------------------------------------
-- 2. UNIVERSITIES — add any missing columns the admin form writes
-- ------------------------------------------------------------------
alter table public.universities add column if not exists short_name            text;
alter table public.universities add column if not exists stream_codes          text[] default '{}';
alter table public.universities add column if not exists city                  text;
alter table public.universities add column if not exists address               text;
alter table public.universities add column if not exists hospital_address      text;
alter table public.universities add column if not exists established_year       text;
alter table public.universities add column if not exists university_type        text;
alter table public.universities add column if not exists affiliation            text;
alter table public.universities add column if not exists ranking_text           text;
alter table public.universities add column if not exists bed_capacity           text;
alter table public.universities add column if not exists description            text;
alter table public.universities add column if not exists short_description      text;
alter table public.universities add column if not exists highlights             text[];
alter table public.universities add column if not exists facilities             text[];
alter table public.universities add column if not exists recognised_by          text[];
alter table public.universities add column if not exists programs_bachelor      text[];
alter table public.universities add column if not exists programs_pg            text[];
alter table public.universities add column if not exists tuition_range          text;
alter table public.universities add column if not exists scholarship_info       text;
alter table public.universities add column if not exists eligibility            text;
alter table public.universities add column if not exists application_deadline   text;
alter table public.universities add column if not exists language_requirements  text;
alter table public.universities add column if not exists intake_info            text;
alter table public.universities add column if not exists additional_info        text;
alter table public.universities add column if not exists logo_url               text;
alter table public.universities add column if not exists cover_image_url        text;
alter table public.universities add column if not exists website_url            text;
alter table public.universities add column if not exists contact_email          text;
alter table public.universities add column if not exists contact_phone          text;
alter table public.universities add column if not exists is_featured            boolean default false;
alter table public.universities add column if not exists is_active              boolean default true;

-- ------------------------------------------------------------------
-- 3. COUNTRIES — seed the 7 active destinations
--    (DO NOTHING preserves any existing rows / richer data)
-- ------------------------------------------------------------------
insert into public.countries (code, name, flag_emoji, tagline, display_order, is_active) values
  ('nepal',      'Nepal',          '🇳🇵', 'Medical (MBBS / BDS)',     1, true),
  ('india',      'India',          '🇮🇳', 'MBBS, Engineering & Nursing', 2, true),
  ('uk',         'United Kingdom', '🇬🇧', 'Higher Education',          3, true),
  ('usa',        'United States',  '🇺🇸', 'Higher Education',          4, true),
  ('bangladesh', 'Bangladesh',     '🇧🇩', 'Medical (MBBS / BDS)',     5, true),
  ('canada',     'Canada',         '🇨🇦', 'Higher Education',          6, true),
  ('russia',     'Russia',         '🇷🇺', 'Medical & Engineering',     7, true)
on conflict (code) do nothing;

-- ------------------------------------------------------------------
-- 4. STREAMS / DEPARTMENTS — seed the 5 fields of study
-- ------------------------------------------------------------------
insert into public.streams (code, name, icon, display_order, is_active) values
  ('doctor',      'Doctor',                'Stethoscope', 1, true),
  ('engineer',    'Engineer',              'Cpu',         2, true),
  ('bhs',         'BHS (Health Sciences)', 'HeartPulse',  3, true),
  ('nursing',     'Nursing',               'Activity',    4, true),
  ('agriculture', 'Agriculture',           'Sprout',      5, true)
on conflict (code) do nothing;

-- ------------------------------------------------------------------
-- 5. Reload the PostgREST schema cache so the new columns are visible
--    immediately (otherwise you may still get PGRST204 for a minute).
-- ------------------------------------------------------------------
notify pgrst, 'reload schema';
