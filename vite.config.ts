import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/LightTrailNetworkWebsite/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mentorship App",
        short_name: "MentorApp",
        start_url: "/LightTrailNetworkWebsite/",
        display: "standalone",
        theme_color: "#ffffff",
        icons: [
          { src: "/LightTrailNetworkWebsite/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/LightTrailNetworkWebsite/pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
