-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Colleges Table
create table public.colleges (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text unique not null,
  address text,
  hospital_address text,
  established_year text,
  bed_capacity text,
  college_type text not null, -- 'Government', 'Private', 'Community'
  affiliation text not null, -- 'Tribhuvan University', 'Kathmandu University', 'Autonomous', etc.
  facilities text[], -- Array of strings e.g. ['Hostel', 'Library']
  programs jsonb, -- Flexible structure for different levels (Bachelors, Masters, etc.)
  description text,
  logo_url text,
  cover_image_url text,
  gallery_images text[], -- Array of image URLs
  is_featured boolean default false,
  website_url text,
  contact_email text,
  contact_phone text
);

-- Notices Table
create table public.notices (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text,
  publish_date date default current_date,
  attachment_url text, -- PDF or Image
  is_important boolean default false
);

-- Team Members Table (for About Us)
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  designation text not null,
  photo_url text,
  bio text,
  display_order integer default 0
);

-- Storage Buckets (You must create these in Supabase Dashboard -> Storage)
-- 'images': Public bucket for logos, covers, gallery
-- 'documents': Public bucket for notice attachments

-- Row Level Security (RLS)
alter table public.colleges enable row level security;
alter table public.notices enable row level security;
alter table public.team_members enable row level security;

-- Policies
-- Allow public read access
create policy "Public colleges are viewable by everyone" on public.colleges for select using (true);
create policy "Public notices are viewable by everyone" on public.notices for select using (true);
create policy "Public team viewable by everyone" on public.team_members for select using (true);

-- Allow authenticated users (admins) to insert/update/delete
-- NOTE: In a real app, you'd check for a specific role. For now, we assume any authenticated user is admin per requirements.
create policy "Admins can insert colleges" on public.colleges for insert with check (auth.role() = 'authenticated');
create policy "Admins can update colleges" on public.colleges for update using (auth.role() = 'authenticated');
create policy "Admins can delete colleges" on public.colleges for delete using (auth.role() = 'authenticated');

create policy "Admins can insert notices" on public.notices for insert with check (auth.role() = 'authenticated');
create policy "Admins can update notices" on public.notices for update using (auth.role() = 'authenticated');
create policy "Admins can delete notices" on public.notices for delete using (auth.role() = 'authenticated');

create policy "Admins can insert team" on public.team_members for insert with check (auth.role() = 'authenticated');
create policy "Admins can update team" on public.team_members for update using (auth.role() = 'authenticated');
create policy "Admins can delete team" on public.team_members for delete using (auth.role() = 'authenticated');


-- Contacts / Inquiries Table
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text,
  phone text not null,
  subject text,
  message text not null,
  status text default 'new' -- 'new', 'read', 'archived'
);

alter table public.contacts enable row level security;

-- Allow anyone to insert (public inquiry form)
create policy "Anyone can insert contacts" on public.contacts for insert with check (true);

-- Allow admins to read/update/delete
create policy "Admins can view contacts" on public.contacts for select using (auth.role() = 'authenticated');
create policy "Admins can update contacts" on public.contacts for update using (auth.role() = 'authenticated');
create policy "Admins can delete contacts" on public.contacts for delete using (auth.role() = 'authenticated');

-- Modify Colleges Table for Rich Data (Run this if table exists, or update the create table above)
-- For a fresh run, it's better to update the CREATE TABLE statement, but for migration:
alter table public.colleges add column if not exists recognised_by text[];
alter table public.colleges add column if not exists hospital_address text;
alter table public.colleges add column if not exists highlights text[];
alter table public.colleges add column if not exists nearest_borders jsonb; -- Array of {name: string, distance: string}
alter table public.colleges add column if not exists access_modes jsonb; -- Array of {mode: string, description: string}
alter table public.colleges add column if not exists programs_bachelor text[];
alter table public.colleges add column if not exists programs_pg text[];
alter table public.colleges add column if not exists additional_info text;

-- Storage Policies (You need to create a bucket named 'images' in Supabase Dashboard)
-- We can't create buckets via SQL in standard Supabase easily, assume user creates it or we use API.
-- But we can set policies for objects.

-- Policy to allow public to view images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Policy to allow authenticated users (admins) to upload images
create policy "Admin Upload"
on storage.objects for insert
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Policy to allow admins to delete images
create policy "Admin Delete"
on storage.objects for delete
using ( bucket_id = 'images' and auth.role() = 'authenticated' );
