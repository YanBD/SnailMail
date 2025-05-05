import {defineConfig, devices} from '@playwright/test'

export default defineConfig({

  testDir: './playwright_tests',
  projects: [
    {name: 'Chromium', use: { ...devices['Desktop Chrome']}},
    {name: 'Firefox', use: { ...devices['Desktop Firefox']}},
    {name: 'WebKit', use: {...devices['Desktop Safari']}},    
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:5173'
    },

})