import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://onlineresumats.com',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/500') &&
        !page.includes('/privacy-policy') &&
        !page.includes('/terms'),
      serialize(item) {
        // Higher priority for tool pages
        if (item.url === 'https://onlineresumats.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (
          item.url.includes('ats-score-checker') ||
          item.url.includes('cover-letter-generator') ||
          item.url.includes('domain-converter') ||
          item.url.includes('resume-keywords')
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      }
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['pdfjs-dist']
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf-worker': ['pdfjs-dist']
          }
        }
      }
    }
  }
});
