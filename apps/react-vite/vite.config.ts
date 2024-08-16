/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: './',
  plugins: [react() /*, viteTsconfigPaths()*/],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**', 'packages/**'],
    coverage: {
      include: ['src/**']
    },
    alias: {
      // NOTE: 解决诸如 Error: Failed to resolve import "@/testing/test-utils" from "src/lib/__tests__/authorization.test.tsx". Does the file exist?
      // https://vitest.dev/guide/common-errors
      '@/': new URL('./src/', import.meta.url).pathname
    }
  },
  optimizeDeps: { exclude: ['fsevents'] },
  build: {
    rollupOptions: {
      external: ['fs/promises'],
      output: {
        experimentalMinChunkSize: 3500
      }
    }
  }
})
