// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Site should be the final deployed URL (optional)
  site: process.env.SITE || 'https://cooptacular.github.io/',

  // GitHub Pages repo path
  base: process.env.BASE_PATH || '/CooptacularPortfolioAstro/',

  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

});