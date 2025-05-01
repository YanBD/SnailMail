import {defineConfig} from '@playwright/test'

export default defineConfig({

  testDir: './playwright_tests',
  projects: [
    {name: 'Chromium', use: {browserName: 'chromium'}},
    {name: 'WebKit', use: {browserName: 'webkit'}},
    {name: 'Firefox', use: {browserName: 'firefox'}},
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:5173'
    },

})