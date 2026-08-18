-- Hommage — full schema export
-- Run this FIRST in the SQL editor of your own Supabase project.

-- ---------- Types ----------
do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.enquiry_type as enum ('vendor', 'collaborator', 'event_artist', 'hospitality', 'other');
exception when duplicate_object then null; end $$;

-- ---------- Shared trigger fn ----------
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- user_roles ----------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can view their own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- ---------- posts (events / journal / upcoming) ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  body text not null default '',
  media_url text,
  media_type text,
  event_date text,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.posts to anon;
grant select, insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;

alter table public.posts enable row level security;

create policy "Posts are publicly readable"
  on public.posts for select to anon, authenticated using (true);
create policy "Admins can insert posts"
  on public.posts for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update posts"
  on public.posts for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete posts"
  on public.posts for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create trigger update_posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at_column();

-- ---------- site_settings (homepage hero) ----------
create table if not exists public.site_settings (
  id text primary key,
  hero_url text,
  hero_type text,
  hero_aspect text not null default 'full',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.site_settings to anon;
grant select, insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;

alter table public.site_settings enable row level security;

create policy "Settings are publicly readable"
  on public.site_settings for select to anon, authenticated using (true);
create policy "Admins can insert settings"
  on public.site_settings for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update settings"
  on public.site_settings for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger update_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.update_updated_at_column();

-- ---------- enquiries (contact form) ----------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  enquiry_type public.enquiry_type not null default 'other',
  location text,
  message text not null,
  created_at timestamptz not null default now()
);

grant insert on public.enquiries to anon, authenticated;
grant all on public.enquiries to service_role;

alter table public.enquiries enable row level security;

create policy "Anyone can submit an enquiry"
  on public.enquiries for insert to anon, authenticated
  with check (true);

-- ---------- Storage bucket for admin media uploads ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', false)
on conflict (id) do nothing;

create policy "Admins can upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Authenticated can read media"
  on storage.objects for select to authenticated
  using (bucket_id = 'media');
