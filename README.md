# Besucht – Restaurant-Entdeckungs-PWA (Phase 1: MVP)

Vite + React + TypeScript + shadcn/ui + Tailwind v4 + Supabase (Auth + DB) + OpenStreetMap/Overpass.

## Was schon fertig ist

- Kompletter Projekt-Scaffold, kompiliert und baut fehlerfrei (`npm run build` geprüft)
- shadcn-Komponenten (Button, Card, Badge, Input) manuell nach Standard-Konvention angelegt,
  da der Sandbox-Zugriff auf die shadcn-Registry blockiert war. Funktional identisch –
  `components.json` ist vorbereitet, `npx shadcn add <component>` funktioniert bei dir normal.
- Supabase-Migration (`supabase/migrations/0001_init.sql`) mit Tabellen + RLS-Policies
- Overpass-Client (`src/features/restaurants/overpass.ts`) – lädt Restaurants ohne API-Key
- Auth-Flow (Magic Link), Standort setzen, Restaurant-Liste, Als-besucht-markieren
- PWA-Setup (installierbar, Manifest, Overpass-Responses werden gecacht)

## Was du noch tun musst

### 1. Supabase-Projekt anlegen
1. Auf [supabase.com](https://supabase.com) ein neues Projekt erstellen (Region: Frankfurt, wegen Latenz)
2. Unter **Project Settings → API** die `Project URL` und den `anon public` Key kopieren
3. Im Projektordner: `cp .env.example .env` und beide Werte eintragen

### 2. Datenbank-Schema einspielen
Im Supabase Dashboard unter **SQL Editor** den Inhalt von `supabase/migrations/0001_init.sql`
einfügen und ausführen. Das legt `profiles`, `restaurants`, `visits` inkl. RLS-Policies und den
Trigger an, der bei Registrierung automatisch ein Profil erstellt.

Alternativ mit der Supabase CLI (falls du sie nutzt):
```bash
npx supabase link --project-ref <dein-projekt-ref>
npx supabase db push
```

### 3. Auth konfigurieren
Unter **Authentication → URL Configuration**:
- Site URL: `http://localhost:5173` (lokal) bzw. deine Produktions-URL
- Redirect URLs: dieselbe URL ergänzen

Magic Link ist standardmäßig aktiv, kein weiterer Anbieter nötig für Phase 1.

### 4. Echte DB-Types generieren (optional, aber empfohlen)
`src/types/database.types.ts` ist aktuell von Hand geschrieben, passend zur Migration.
Sobald das Projekt existiert, ersetzen mit:
```bash
npx supabase gen types typescript --project-id <dein-projekt-ref> > src/types/database.types.ts
```

### 5. Lokal starten
```bash
npm install
npm run dev
```

### 6. PWA-Icons ergänzen
`vite.config.ts` referenziert `/icon-192.png` und `/icon-512.png` in `public/` – aktuell noch
Platzhalter-Namen ohne Dateien. Zwei PNGs (192×192, 512×512) in `public/` ablegen, sonst
schlägt die Installierbarkeit auf manchen Geräten fehl.

## Bekannte Einschränkungen (bewusst für Phase 1 ausgelassen)

- **Kein Kartenview**, nur Liste sortiert nach Distanz (Karte ist guter nächster Schritt,
  z.B. mit `react-leaflet` + OSM-Tiles – ebenfalls kostenlos, passt zum Overpass-Ansatz)
- **Kein Rate-Limiting/Caching-Layer** vor Overpass – bei viel Traffic sollte man einen
  eigenen Cache-Server davorschalten, die öffentliche Overpass-Instanz ist fair-use
- **Keine Bewertung/Notiz-UI** – das DB-Feld (`visits.rating`, `visits.note`) existiert
  bereits, nur noch keine Eingabemaske
- Badges (Phase 2) und Freundesliste (Phase 3) sind bewusst nicht enthalten – siehe unten

## Phase 2 – Badges (nächster Schritt, noch nicht implementiert)

```sql
create table achievements (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,       -- z.B. 'five_visits'
  name text not null,
  description text
);

create table user_achievements (
  user_id uuid references profiles(id),
  achievement_id uuid references achievements(id),
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);
```
Freischaltung serverseitig via Postgres-Trigger auf `visits` (nicht im Client berechnen,
sonst manipulierbar).

## Phase 3 – Freundesliste (später)

```sql
create table friendships (
  user_id uuid references profiles(id),
  friend_id uuid references profiles(id),
  status text check (status in ('pending','accepted')) not null default 'pending',
  primary key (user_id, friend_id)
);
```
RLS-Policy für `visits`-SELECT müsste dann um "sichtbar für akzeptierte Freunde" erweitert werden.
