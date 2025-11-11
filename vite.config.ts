import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Website/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mentorship App",
        short_name: "MentorApp",
        start_url: "/Website/",
        display: "standalone",
        theme_color: "#ffffff",
        icons: [
          { src: "/Website/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/Website/pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
