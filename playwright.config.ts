import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/web',
  use: {
    baseURL: process.env.WEB_BASE_URL || 'http://localhost:8080',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['html', { outputFolder: 'reports/web' }],
    ['junit', { outputFile: 'reports/web/results.xml' }]
  ],
};

export default config; 