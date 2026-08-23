-- Phase 1: Profile, Restaurant-Cache (aus OSM) und Visits

create extension if not exists "pgcrypto";

-- 1. Profiles: erweitert auth.users um Wohnort + Anzeigename
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  home_lat double precision,
  home_lng double precision,
  home_label text, -- z.B. "München, Maxvorstadt" - nur zur Anzeige
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Nutzer sieht eigenes Profil"
  on profiles for select
  using (auth.uid() = id);

create policy "Nutzer bearbeitet eigenes Profil"
  on profiles for update
  using (auth.uid() = id);

create policy "Nutzer legt eigenes Profil an"
  on profiles for insert
  with check (auth.uid() = id);

-- Profil automatisch bei Registrierung anlegen
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Restaurants: Cache der von Overpass/OSM geladenen Orte.
-- Wird beim ersten "Besucht"-Klick client-seitig upserted, damit visits
-- einen stabilen Fremdschlüssel statt der volatilen OSM-ID referenzieren.
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  osm_id bigint unique not null,
  name text not null,
  lat double precision not null,
  lng double precision not null,
  address text,
  cuisine text,
  created_at timestamptz not null default now()
);

alter table restaurants enable row level security;

create policy "Restaurants sind für eingeloggte Nutzer lesbar"
  on restaurants for select
  to authenticated
  using (true);

create policy "Eingeloggte Nutzer können Restaurants cachen"
  on restaurants for insert
  to authenticated
  with check (true);

-- 3. Visits: eine Zeile pro Besuch
create table visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  visited_at date not null default current_date,
  rating smallint check (rating between 1 and 5),
  note text,
  created_at timestamptz not null default now()
);

alter table visits enable row level security;

create policy "Nutzer sieht eigene Visits"
  on visits for select
  using (auth.uid() = user_id);

create policy "Nutzer legt eigene Visits an"
  on visits for insert
  with check (auth.uid() = user_id);

create policy "Nutzer bearbeitet eigene Visits"
  on visits for update
  using (auth.uid() = user_id);

create policy "Nutzer löscht eigene Visits"
  on visits for delete
  using (auth.uid() = user_id);

create index visits_user_id_idx on visits (user_id);
create index visits_restaurant_id_idx on visits (restaurant_id);
