create extension if not exists unaccent;

create or replace function public.handle_new_user()
returns trigger as $$
declare
  base_username text;
  final_username text;
  suffix int := 0;
begin
  -- Rohen Namen aus dem Signup-Metadata in ein gültiges Username-Format bringen:
  -- kleinschreiben, ß -> ss, Umlaute/Akzente transliterieren, Leerzeichen -> _,
  -- alles außerhalb [a-z0-9_] entfernen, auf 20 Zeichen kappen.
  base_username := lower(coalesce(new.raw_user_meta_data->>'full_name', ''));
  base_username := replace(base_username, 'ß', 'ss');
  base_username := unaccent(base_username);
  base_username := regexp_replace(base_username, '\s+', '_', 'g');
  base_username := regexp_replace(base_username, '[^a-z0-9_]', '', 'g');
  base_username := left(base_username, 20);

  -- Zu kurz (leerer Name, Name nur aus Sonderzeichen o.ä.) -> Fallback auf user_<zufall>
  if length(base_username) < 3 then
    base_username := 'user_' || substr(replace(new.id::text, '-', ''), 1, 8);
  end if;

  final_username := base_username;

  -- Kollision (gleicher Name schon vergeben) -> _2, _3, ... anhängen, dabei
  -- die 20-Zeichen-Grenze einhalten
  while exists (select 1 from public.profiles where username = final_username) loop
    suffix := suffix + 1;
    final_username := left(base_username, 20 - length('_' || suffix::text)) || '_' || suffix::text;
  end loop;

  insert into public.profiles (id, username, display_name) values (new.id, final_username, coalesce(new.raw_user_meta_data->>'full_name', NULL));
  return new;
end;
$$ language plpgsql security definer;