import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.png",
        "apple-touch-icon.png",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
      ],
      manifest: {
        name: "Arabia World",
        short_name: "Arabia",
        description:
          "Apprends la langue du Coran, découvre la beauté de l’arabe et construis ton propre dictionnaire.",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
  ],
});
