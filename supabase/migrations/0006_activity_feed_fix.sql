drop function friend_activity_feed;

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
  occurred_at timestamptz,
  place_id text
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
         null::smallint, null::text, v.visited_at::timestamptz as occurred_at, r.place_id
  from visits v
  join friend_ids f on f.friend_id = v.user_id
  join profiles p on p.id = v.user_id
  join restaurants r on r.id = v.restaurant_id

  union all

  select 'rated', rt.id, rt.user_id, p.username, rt.restaurant_id, r.name, r.cuisine,
         rt.rating, null::text, rt.updated_at as occurred_at, r.place_id
  from ratings rt
  join friend_ids f on f.friend_id = rt.user_id
  join profiles p on p.id = rt.user_id
  join restaurants r on r.id = rt.restaurant_id

  union all

  select 'commented', c.id, c.user_id, p.username, c.restaurant_id, r.name, r.cuisine,
         null::smallint, c.body, c.created_at as occurred_at, r.place_id
  from comments c
  join friend_ids f on f.friend_id = c.user_id
  join profiles p on p.id = c.user_id
  join restaurants r on r.id = c.restaurant_id

  order by occurred_at desc
  limit result_limit
$$;