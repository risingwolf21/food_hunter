-- 2. Bewertungen: eine pro Nutzer+Restaurant, änderbar
create table
  ratings (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    restaurant_id uuid not null references restaurants (id) on delete cascade,
    rating smallint not null check (rating between 1 and 5),
    created_at timestamptz not null default now (),
    updated_at timestamptz not null default now (),
    unique (user_id, restaurant_id)
  );

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger ratings_set_updated_at before
update on ratings for each row execute procedure public.set_updated_at ();

alter table ratings enable row level security;

create policy "Bewertungen sind für alle eingeloggten Nutzer sichtbar" on ratings for
select
  to authenticated using (true);

create policy "Nutzer legt eigene Bewertung an" on ratings for insert
with
  check (auth.uid () = user_id);

create policy "Nutzer bearbeitet eigene Bewertung" on ratings for
update using (auth.uid () = user_id)
with
  check (auth.uid () = user_id);

create policy "Nutzer löscht eigene Bewertung" on ratings for delete using (auth.uid () = user_id);

create table
  comments (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    restaurant_id uuid not null references restaurants (id) on delete cascade,
    body text not null check (char_length(body) between 1 and 1000),
    created_at timestamptz not null default now (),
    updated_at timestamptz not null default now ()
  );

create trigger comments_set_updated_at before
update on comments for each row execute procedure public.set_updated_at ();

create index comments_restaurant_id_idx on comments (restaurant_id);

alter table comments enable row level security;

create policy "Kommentare sind für alle eingeloggten Nutzer sichtbar" on comments for
select
  to authenticated using (true);

create policy "Nutzer legt eigenen Kommentar an" on comments for insert
with
  check (auth.uid () = user_id);

create policy "Nutzer bearbeitet eigenen Kommentar" on comments for
update using (auth.uid () = user_id)
with
  check (auth.uid () = user_id);

create policy "Nutzer löscht eigenen Kommentar" on comments for delete using (auth.uid () = user_id);

-- 4. public_profiles: bewusst OHNE security_invoker - läuft mit Owner-Rechten und umgeht
-- damit die restriktive profiles-RLS (auth.uid() = id). Sicher, weil NUR id+username
-- exponiert werden, nie home_lat/home_lng. So können Kommentare/Ratings fremder Nutzer
-- deren Username anzeigen, ohne die profiles-Policy selbst aufweichen zu müssen.
create view
  public_profiles as
select
  id,
  username
from
  profiles;

grant
select
  on public_profiles to authenticated;


-- 5. Rating-Durchschnitt pro Restaurant. HIER security_invoker=true (Best Practice,
-- PG15+) - ändert praktisch nichts, weil ratings eh public-select ist, aber explizit
-- statt implizit RLS-konform.
create view restaurant_rating_summary
with (security_invoker = true) as
select
  restaurant_id,
  round(avg(rating)::numeric, 2) as avg_rating,
  count(*) as rating_count
from ratings
group by restaurant_id;

drop function if exists friend_activity_feed(int);

create or replace function friend_activity_feed(result_limit int default 30)
returns table (
  activity_type text,
  activity_id uuid,
  friend_id uuid,
  friend_username text,
  restaurant_id uuid,
  restaurant_name text,
  cuisine text,
  rating smallint,
  comment_body text,
  occurred_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  with friend_ids as (
    select case when requester_id = auth.uid() then addressee_id else requester_id end as friend_id
    from friendships
    where status = 'accepted' and (requester_id = auth.uid() or addressee_id = auth.uid())
  )
  select 'visited', v.id, v.user_id, p.username, v.restaurant_id, r.name, r.cuisine,
         null::smallint, null::text, v.visited_at::timestamptz as occurred_at
  from visits v
  join friend_ids f on f.friend_id = v.user_id
  join profiles p on p.id = v.user_id
  join restaurants r on r.id = v.restaurant_id

  union all

  select 'rated', rt.id, rt.user_id, p.username, rt.restaurant_id, r.name, r.cuisine,
         rt.rating, null::text, rt.updated_at as occurred_at
  from ratings rt
  join friend_ids f on f.friend_id = rt.user_id
  join profiles p on p.id = rt.user_id
  join restaurants r on r.id = rt.restaurant_id

  union all

  select 'commented', c.id, c.user_id, p.username, c.restaurant_id, r.name, r.cuisine,
         null::smallint, c.body, c.created_at as occurred_at
  from comments c
  join friend_ids f on f.friend_id = c.user_id
  join profiles p on p.id = c.user_id
  join restaurants r on r.id = c.restaurant_id

  order by occurred_at desc
  limit result_limit
$$;

grant execute on function friend_activity_feed(int) to authenticated;