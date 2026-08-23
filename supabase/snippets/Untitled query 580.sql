create policy "Eingeloggte Nutzer können Restaurants aktualisieren"
  on restaurants for update
  to authenticated
  using (true)
  with check (true);