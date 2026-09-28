import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://karlberntorp.github.io',
  integrations: [sitemap({ filter: (page) => new URL(page).pathname !== '/cv/' })],
});
