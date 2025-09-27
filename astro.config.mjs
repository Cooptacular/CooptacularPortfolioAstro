// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // The site property should be your final deployed URL
  site: process.env.SITE || 'https://cooptacular.github.io',

  // Only use base path for GitHub Pages deployments
  // For Netlify/Vercel, leave this undefined (no base path)
  base: process.env.BASE_PATH || undefined,

  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  adapter: netlify({
    
  }),
});