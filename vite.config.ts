import { defineConfig, loadEnv } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"


export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');
  const BASE_URL = env.VITE_GITHUB_PAGES ? '/food_hunter/' : '/'

  return {
    base: BASE_URL,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg"],
        manifest: {
          name: "Besucht",
          short_name: "Besucht",
          description: "Restaurants in deiner Nähe entdecken und besuchte markieren",
          theme_color: "#0f172a",
          background_color: "#0f172a",
          display: "standalone",
          start_url: BASE_URL,
          icons: [
            { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          ],
        },
        workbox: {
          // Overpass/OSM-Antworten cachen, damit die zuletzt geladene Liste offline sichtbar bleibt
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/overpass-api\.de\/.*/,
              handler: "NetworkFirst",
              options: {
                cacheName: "overpass-cache",
                expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    }
  }
})
