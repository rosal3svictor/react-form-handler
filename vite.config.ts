/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // This will expose all of the API's method from Vite into the project
    globals: true,
    environment: 'jsdom',
    // This file will run at the beginning of every test run
    setupFiles: ['./src/testsSetup.ts'],
  },
});
