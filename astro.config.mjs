import { defineConfig } from 'astro/config';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://y-nakanen.github.io',
  base: isDev ? '/' : '/ai-affiliate',
  output: 'static'
});
