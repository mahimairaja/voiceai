// @ts-check
// voiceai.mahimai.ca: a static site rendered from README.md and README_zh.md. `npm run sync`
// parses both READMEs into src/data/readme.json before every dev and build run.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://voiceai.mahimai.ca',
  trailingSlash: 'always',
  integrations: [react()],
});
