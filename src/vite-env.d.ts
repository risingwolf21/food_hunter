/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare const APP_VERSION: string;

interface ViteTypeOptions {
  // By adding this line, you can make the type of importMetaEnv strict
  // to disallow unknown keys.
  strictimportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_GIT_COMMIT: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GITHUB_PAGES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
