// @ts-check
import { defineConfig } from 'astro/config';

// Project site served at https://crakindee2k-a11y.github.io/iut-knowledge/
export default defineConfig({
  site: 'https://crakindee2k-a11y.github.io',
  base: '/iut-knowledge',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
