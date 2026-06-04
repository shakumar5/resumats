import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://onlineresumats.com',
  integrations: [tailwind()],
  vite: {
    optimizeDeps: {
      exclude: ['pdfjs-dist']
    }
  }
});
