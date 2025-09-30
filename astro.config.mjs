// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // The site property should be your final deployed URL
  site: 'https://cooptacular.github.io',
  base: undefined,
  // Only use base path for GitHub Pages deployments
  // For Netlify/Vercel, leave this undefined (no base path)

 integrations: [mdx()],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  //adapter: netlify({
  //  imageCDN: false,
  // }),
});