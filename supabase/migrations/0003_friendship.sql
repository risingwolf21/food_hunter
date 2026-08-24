alter table profiles
  add column username text unique;

alter table profiles
  add constraint username_format check (username ~ '^[a-z0-9_]{3,20}$');

  create table public.friendships (
  id uuid not null default gen_random_uuid(),
  requester_id uuid not null,
  addressee_id uuid not null,
  status text not null default 'pending',
  created_at timestamp with time zone not null default now(),
  constraint friendships_pkey primary key (id),
  constraint friendships_requester_id_fkey foreign key (requester_id) references profiles (id) on delete cascade,
  constraint friendships_addressee_id_fkey foreign key (addressee_id) references profiles (id) on delete cascade,
  constraint friendships_no_self_friend check (requester_id <> addressee_id),
  constraint friendships_status_check check (status in ('pending', 'accepted'))
) tablespace pg_default;

-- Verhindert, dass A→B und B→A gleichzeitig existieren (unabhängig davon, wer anfragt)
create unique index friendships_unique_pair
  on public.friendships (least(requester_id, addressee_id), greatest(requester_id, addressee_id));

  alter table friendships enable row level security;

create policy "Beteiligte sehen ihre Freundschaften"
  on friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Nutzer verschickt Anfrage als er selbst"
  on friendships for insert
  with check (auth.uid() = requester_id);

create policy "Nur Empfänger bestätigt eine Anfrage"
  on friendships for update
  using (auth.uid() = addressee_id)
  with check (auth.uid() = addressee_id);

create policy "Beteiligte können Anfrage/Freundschaft löschen"
  on friendships for delete
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

  create or replace function search_profiles(search_term text)
returns table (id uuid, username text, display_name text)
language sql
security definer
set search_path = public
as $$
  select id, username, display_name
  from profiles
  where ( username ilike '%' || search_term || '%' or
    display_name ilike '%' || search_term || '%')
    and username is not null
    and id <> auth.uid()
  limit 20
$$;

grant execute on function search_profiles(text) to authenticated;

drop policy if exists "Nutzer sieht eigenes Profil";

create policy "Nutzer sieht alle Profile"
  on profiles for select
  using (true);
