alter table restaurants
  drop column osm_id,
  add column place_id text unique not null,
  add column phone text,
  add column website text,
  add column email text,
  add column opening_hours text,
  add column wheelchair_accessible boolean,
  add column wheelchair_limited boolean,
  add column wheelchair_description text,
  add column internet_access boolean,
  add column outdoor_seating boolean,
  add column takeaway boolean,
  add column delivery boolean,
  add column diet_vegan boolean,
  add column diet_vegetarian boolean,
  add column diet_halal boolean,
  add column diet_kosher boolean,
  add column payment_options jsonb,
  add column categories text[],
  add column last_synced_at timestamptz not null default now();

  create policy "Eingeloggte Nutzer können Restaurants aktualisieren"
  on restaurants for update
  to authenticated
  using (true)
  with check (true);