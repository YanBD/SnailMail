import {defineConfig} from '@playwright/test'

export default defineConfig({

  testDir: './playwright_tests',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:5173'
    },

})