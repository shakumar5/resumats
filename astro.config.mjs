import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://onlineresumats.com',
  integrations: [tailwind()],

  vite: {
    optimizeDeps: {
      exclude: ['pdfjs-dist']
    }
  },

  output: "hybrid",
  adapter: cloudflare()
});