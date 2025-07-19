/// <reference types="vitest" />
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
  build: {
    rollupOptions: {
      input: process.env.BUILD_SSR
        ? {
            main: path.resolve(__dirname, 'index-ssr.html'),
          }
        : {
            main: path.resolve(__dirname, 'index.html'),
          },
    },
  },
});
