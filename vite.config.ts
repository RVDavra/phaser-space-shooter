import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Space Shooter",
        short_name: "Space Shooter",
        description: "Space Shooter",
        theme_color: "#000000",
        icons: [
          {
            src: "/assets/icons/icons-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icons/icons-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icons/icons-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
