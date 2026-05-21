-- =============================================================
-- Dreamer's Way Consultancy — Multi-Country Education Platform
-- =============================================================
-- Streams supported: Medical, Engineering, Higher Education, MBA, etc.
-- Destinations: Nepal, India, UK, USA, Japan (extensible)
-- Source: Indian students -> Nepal (medical)
--         Nepali students -> India (engineering), UK/USA/Japan (higher ed)
-- =============================================================

create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------
-- COUNTRIES (destinations)
-- ------------------------------------------------------------------
create table if not exists public.countries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  code text unique not null,                 -- 'nepal', 'india', 'uk', 'usa', 'japan'
  name text not null,
  flag_emoji text,
  hero_image_url text,
  tagline text,
  short_description text,
  long_description text,
  is_active boolean default true,
  display_order int default 0,
  capital text,
  currency text,
  language text,
  intake_months text[],
  avg_tuition_range text,
  avg_living_cost text,
  visa_type text,
  visa_process_summary text,
  why_study jsonb,
  popular_cities text[],
  popular_streams text[],
  process_steps jsonb,
  required_documents text[],
  scholarships_available_summary text,
  seo_title text,
  seo_description text,
  seo_keywords text[]
);

create index if not exists idx_countries_active on public.countries(is_active, display_order);

-- ------------------------------------------------------------------
-- STREAMS (fields of study)
-- ------------------------------------------------------------------
create table if not exists public.streams (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  code text unique not null,
  name text not null,
  icon text,
  short_description text,
  long_description text,
  display_order int default 0,
  is_active boolean default true
);

-- ------------------------------------------------------------------
-- UNIVERSITIES / COLLEGES
-- ------------------------------------------------------------------
create table if not exists public.universities (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  slug text unique not null,
  name text not null,
  short_name text,
  country_code text not null references public.countries(code) on delete restrict,
  stream_codes text[] not null default '{}',

  city text,
  address text,
  hospital_address text,
  established_year text,
  university_type text,
  affiliation text,
  ranking_text text,
  bed_capacity text,

  description text,
  short_description text,
  highlights text[],
  facilities text[],
  recognised_by text[],

  programs jsonb,
  programs_bachelor text[],
  programs_pg text[],

  tuition_range text,
  scholarship_available boolean default false,
  scholarship_info text,
  eligibility text,
  application_deadline text,
  language_requirements text,
  intake_info text,

  nearest_borders jsonb,
  access_modes jsonb,
  additional_info text,

  logo_url text,
  cover_image_url text,
  gallery_images text[],

  website_url text,
  contact_email text,
  contact_phone text,

  is_featured boolean default false,
  is_active boolean default true,
  display_order int default 0,

  seo_title text,
  seo_description text,
  seo_keywords text[]
);

create index if not exists idx_universities_country on public.universities(country_code);
create index if not exists idx_universities_streams on public.universities using gin(stream_codes);
create index if not exists idx_universities_featured on public.universities(is_featured, is_active);

-- ------------------------------------------------------------------
-- SCHOLARSHIPS
-- ------------------------------------------------------------------
create table if not exists public.scholarships (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  slug text unique not null,
  country_code text references public.countries(code) on delete set null,
  stream_codes text[] default '{}',
  provider text,
  scholarship_type text,
  amount text,
  eligibility text,
  benefits text,
  deadline_text text,
  application_link text,
  description text,
  cover_image_url text,
  is_featured boolean default false,
  is_active boolean default true,
  display_order int default 0
);

create index if not exists idx_scholarships_country on public.scholarships(country_code);

-- ------------------------------------------------------------------
-- SUCCESS STORIES
-- ------------------------------------------------------------------
create table if not exists public.success_stories (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  student_name text not null,
  photo_url text,
  from_country text,
  to_country_code text references public.countries(code) on delete set null,
  stream_code text,
  university text,
  program text,
  batch_year text,
  rating int default 5,
  short_quote text,
  story text,
  video_url text,
  is_featured boolean default false,
  display_order int default 0
);

-- ------------------------------------------------------------------
-- BLOG / RESOURCES
-- ------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  country_codes text[] default '{}',
  stream_codes text[] default '{}',
  tags text[] default '{}',
  author text,
  author_photo_url text,
  reading_time_minutes int,
  published_at date default current_date,
  is_published boolean default true,
  is_featured boolean default false,
  seo_title text,
  seo_description text
);

create index if not exists idx_blog_published on public.blog_posts(is_published, published_at desc);
create index if not exists idx_blog_country on public.blog_posts using gin(country_codes);

-- ------------------------------------------------------------------
-- FAQs
-- ------------------------------------------------------------------
create table if not exists public.faqs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  question text not null,
  answer text not null,
  category text default 'general',
  country_code text references public.countries(code) on delete set null,
  stream_code text,
  display_order int default 0,
  is_active boolean default true
);

-- ------------------------------------------------------------------
-- SERVICES
-- ------------------------------------------------------------------
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  title text not null,
  slug text unique not null,
  short_description text,
  long_description text,
  icon text,
  image_url text,
  features text[],
  display_order int default 0,
  is_active boolean default true
);

-- ------------------------------------------------------------------
-- NOTICES
-- ------------------------------------------------------------------
create table if not exists public.notices (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  title text not null,
  content text,
  publish_date date default current_date,
  attachment_url text,
  country_codes text[] default '{}',
  is_important boolean default false
);

-- ------------------------------------------------------------------
-- TEAM
-- ------------------------------------------------------------------
create table if not exists public.team_members (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  designation text not null,
  photo_url text,
  bio text,
  email text,
  phone text,
  linkedin_url text,
  display_order int default 0
);

-- ------------------------------------------------------------------
-- CONTACT / INQUIRY
-- ------------------------------------------------------------------
create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  email text,
  phone text not null,
  current_country text,
  interested_country_code text references public.countries(code) on delete set null,
  interested_stream_code text,
  preferred_intake text,
  message text not null,
  status text default 'new'
);

create index if not exists idx_contacts_status on public.contacts(status, created_at desc);

-- ------------------------------------------------------------------
-- SITE SETTINGS
-- ------------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value jsonb,
  updated_at timestamptz default now()
);

-- ==================================================================
-- ROW LEVEL SECURITY
-- ==================================================================
alter table public.countries        enable row level security;
alter table public.streams          enable row level security;
alter table public.universities     enable row level security;
alter table public.scholarships     enable row level security;
alter table public.success_stories  enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.faqs             enable row level security;
alter table public.services         enable row level security;
alter table public.notices          enable row level security;
alter table public.team_members     enable row level security;
alter table public.contacts         enable row level security;
alter table public.site_settings    enable row level security;

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'countries','streams','universities','scholarships','success_stories',
    'blog_posts','faqs','services','notices','team_members','site_settings'
  ]) loop
    execute format('drop policy if exists "%s public read" on public.%I', t, t);
    execute format('create policy "%s public read" on public.%I for select using (true)', t, t);
    execute format('drop policy if exists "%s admin insert" on public.%I', t, t);
    execute format('create policy "%s admin insert" on public.%I for insert with check (auth.role() = ''authenticated'')', t, t);
    execute format('drop policy if exists "%s admin update" on public.%I', t, t);
    execute format('create policy "%s admin update" on public.%I for update using (auth.role() = ''authenticated'')', t, t);
    execute format('drop policy if exists "%s admin delete" on public.%I', t, t);
    execute format('create policy "%s admin delete" on public.%I for delete using (auth.role() = ''authenticated'')', t, t);
  end loop;
end $$;

drop policy if exists "contacts public insert" on public.contacts;
create policy "contacts public insert" on public.contacts for insert with check (true);
drop policy if exists "contacts admin select" on public.contacts;
create policy "contacts admin select" on public.contacts for select using (auth.role() = 'authenticated');
drop policy if exists "contacts admin update" on public.contacts;
create policy "contacts admin update" on public.contacts for update using (auth.role() = 'authenticated');
drop policy if exists "contacts admin delete" on public.contacts;
create policy "contacts admin delete" on public.contacts for delete using (auth.role() = 'authenticated');

drop policy if exists "Public image read" on storage.objects;
create policy "Public image read" on storage.objects for select using (bucket_id = 'images');
drop policy if exists "Admin image upload" on storage.objects;
create policy "Admin image upload" on storage.objects for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
drop policy if exists "Admin image delete" on storage.objects;
create policy "Admin image delete" on storage.objects for delete using (bucket_id = 'images' and auth.role() = 'authenticated');

-- ==================================================================
-- SEED DATA
-- ==================================================================
insert into public.countries (code, name, flag_emoji, tagline, short_description, is_active, display_order, capital, currency, language, intake_months, avg_tuition_range, avg_living_cost, visa_type, popular_cities, popular_streams, seo_title, seo_description) values
('nepal', 'Nepal', '🇳🇵', 'Affordable, high-quality MBBS in the heart of the Himalayas',
 'Nepal is one of the most popular destinations for Indian students pursuing MBBS, BDS and other medical programs. NMC-recognized colleges, English-medium teaching, and a curriculum closely aligned with India.',
 true, 1, 'Kathmandu', 'NPR', 'Nepali / English', array['September','October','November'],
 '₹35–60 Lakh (full course)', '₹8,000–15,000 / month', 'Student Visa',
 array['Kathmandu','Pokhara','Biratnagar','Chitwan','Bharatpur'],
 array['medical'],
 'Study MBBS in Nepal 2026 — Top NMC Recognized Medical Colleges',
 'Affordable MBBS in Nepal for Indian students. Compare top NMC-recognized medical colleges, fees, eligibility, NEET requirements and admission process with Dreamer''s Way Consultancy.'),

('india', 'India', '🇮🇳', 'World-class engineering education at competitive cost',
 'India offers some of the world''s top engineering and technology programs. With globally ranked institutes, vibrant tech ecosystem and English-medium instruction, India is a top choice for Nepali students.',
 true, 2, 'New Delhi', 'INR', 'English / Hindi', array['July','August'],
 '₹1.5–8 Lakh / year', '₹8,000–20,000 / month', 'Student Visa (X-Visa)',
 array['Bengaluru','Delhi','Mumbai','Pune','Chennai','Hyderabad'],
 array['engineering'],
 'Study Engineering in India for Nepali Students — B.Tech / BE Admissions',
 'Top engineering colleges in India for Nepali students. B.Tech, BE, M.Tech admissions, fees, scholarships and visa guidance — all in one place with Dreamer''s Way Consultancy.'),

('uk', 'United Kingdom', '🇬🇧', 'Globally ranked universities, 2-year graduate work visa',
 'The UK is home to some of the world''s oldest and most prestigious universities. With shorter program durations, post-study work visa and global recognition, UK is ideal for Nepali students seeking quality higher education.',
 true, 3, 'London', 'GBP', 'English', array['September','January'],
 '£12,000–35,000 / year', '£900–1,400 / month', 'Student Visa (Tier 4)',
 array['London','Manchester','Edinburgh','Birmingham','Glasgow','Coventry'],
 array['higher-education'],
 'Study in UK from Nepal — Top Universities, Scholarships & Visa Guide',
 'Complete guidance for Nepali students to study in the UK. Top universities, course selection, scholarships, IELTS prep, visa filing and accommodation — Dreamer''s Way Consultancy.'),

('usa', 'United States', '🇺🇸', 'Ivy League ambition, the world''s most diverse academia',
 'The USA hosts the largest number of top-ranked universities globally. With flexible curriculum, strong research culture and OPT/STEM work opportunities, USA remains the #1 dream destination for Nepali students.',
 true, 4, 'Washington D.C.', 'USD', 'English', array['August','January'],
 '$15,000–55,000 / year', '$800–1,800 / month', 'Student Visa (F-1)',
 array['New York','Boston','San Francisco','Los Angeles','Chicago','Seattle'],
 array['higher-education'],
 'Study in USA from Nepal — F-1 Visa, SAT, Universities & Scholarships',
 'Step-by-step guidance for Nepali students to study in the USA. University shortlisting, SAT/GRE/GMAT, I-20, F-1 visa interview and scholarships with Dreamer''s Way.'),

('japan', 'Japan', '🇯🇵', 'Innovation, scholarships and a culture that values learners',
 'Japan combines technological excellence with rich culture, generous scholarships (MEXT, JASSO) and a safe society. English-taught programs and post-study work opportunities make it an emerging top choice.',
 true, 5, 'Tokyo', 'JPY', 'Japanese / English', array['April','October'],
 '¥500,000–1,500,000 / year', '¥80,000–120,000 / month', 'Student Visa',
 array['Tokyo','Osaka','Kyoto','Nagoya','Fukuoka'],
 array['higher-education'],
 'Study in Japan from Nepal — MEXT, JASSO Scholarships & Universities',
 'Study in Japan from Nepal with full guidance. English-taught universities, MEXT scholarship, JLPT prep, visa and accommodation — Dreamer''s Way Consultancy.')
on conflict (code) do nothing;

insert into public.streams (code, name, icon, short_description, display_order) values
('medical', 'Medical', 'Stethoscope', 'MBBS, BDS, MD, MS and allied medical sciences', 1),
('engineering', 'Engineering', 'Cpu', 'B.Tech, BE, M.Tech and emerging tech specializations', 2),
('higher-education', 'Higher Education', 'GraduationCap', 'Bachelors, Masters and PhD across diverse disciplines', 3),
('mba', 'MBA & Management', 'Briefcase', 'MBA, executive MBA and business analytics programs', 4)
on conflict (code) do nothing;

insert into public.services (title, slug, short_description, icon, display_order, features) values
('University Shortlisting', 'university-shortlisting', 'Data-driven shortlists matched to your profile, budget and goals.', 'Target', 1,
  array['Profile evaluation','Country-fit analysis','Budget & ROI mapping','Backup options']),
('Admission Counselling', 'admission-counselling', 'End-to-end help with applications, SOPs, LORs and interviews.', 'FileText', 2,
  array['SOP / Essay review','LOR drafting','Application tracking','Interview prep']),
('Test Preparation', 'test-prep', 'IELTS, TOEFL, SAT, GRE, GMAT, JLPT — guided prep with experts.', 'BookOpen', 3,
  array['Diagnostic test','Personalized study plan','Mock tests','Score guarantee plans']),
('Visa Guidance', 'visa-guidance', 'Documentation, financial planning, interview prep and filing.', 'Plane', 4,
  array['Document checklist','Financial planning','Mock visa interview','Filing & follow-up']),
('Scholarship Assistance', 'scholarship-assistance', 'Identify and apply to scholarships you actually qualify for.', 'Award', 5,
  array['Scholarship matching','Essay support','Deadline tracking','Renewal guidance']),
('Pre-departure & Post-arrival', 'pre-departure', 'Forex, accommodation, SIM, airport pickup and settling-in.', 'PlaneTakeoff', 6,
  array['Forex & banking','Accommodation booking','Travel & insurance','Community connect'])
on conflict (slug) do nothing;

insert into public.faqs (question, answer, category, display_order) values
('Which countries do you support?', 'We help Indian students pursue MBBS/BDS in Nepal, and Nepali students pursue engineering in India and higher education in the UK, USA and Japan.', 'general', 1),
('Is there a consultation fee?', 'Initial consultation is free. Service charges depend on the package — we share transparent pricing after evaluating your profile.', 'general', 2),
('Do you guarantee admission?', 'We do not sell guarantees — we maximize your chances with the right shortlist, strong applications and timely follow-up. Our admission success rate is over 95%.', 'general', 3),
('Can I apply without IELTS/TOEFL?', 'Some universities offer conditional admission or accept MOI (Medium of Instruction) letters. We''ll guide you based on the destination and course.', 'general', 4)
on conflict do nothing;
