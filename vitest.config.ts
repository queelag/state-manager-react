import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/index.ts'],
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['lcov']
    },
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}']
  }
})