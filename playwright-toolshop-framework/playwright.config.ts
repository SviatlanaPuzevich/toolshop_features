import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './tests/config/testConfig.js';

/**
 * Configuration of the test automation framework.
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/specs',
  /* Run tests in files in parallel. */
  fullyParallel: true,
  /* Fail the build on CI if a test.only was left in the source code. */
  forbidOnly: testConfig.isCi,
  retries: testConfig.retries,
  workers: testConfig.workers,
  timeout: testConfig.testTimeout,
  expect: {
    timeout: testConfig.expectTimeout,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: testConfig.baseUrl,
    headless: testConfig.headless,
    /* Collect a trace and a screenshot only when a test needs to be investigated. */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
  ],

  /* Configure projects for major browsers. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
