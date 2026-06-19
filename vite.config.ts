import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function siteUrlForMode(env: Record<string, string>, mode: string) {
  const configured = env.VITE_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  if (mode === 'development') return 'http://localhost:5173';
  return '';
}

function injectSiteUrl(content: string, siteUrl: string) {
  return content.replaceAll('__SITE_URL__', siteUrl);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = siteUrlForMode(env, mode);

  return {
    plugins: [
      react(),
      {
        name: 'seo-site-url',
        transformIndexHtml(html) {
          return injectSiteUrl(html, siteUrl);
        },
        closeBundle() {
          if (!siteUrl) return;

          for (const file of ['robots.txt', 'sitemap.xml']) {
            const filePath = resolve(__dirname, 'public', file);
            try {
              const content = injectSiteUrl(readFileSync(filePath, 'utf-8'), siteUrl);
              writeFileSync(resolve(__dirname, 'dist', file), content);
            } catch {
              // public file may be missing during partial builds
            }
          }
        },
      },
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
