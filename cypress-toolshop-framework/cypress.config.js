import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com/',
    retries: { runMode: 2, openMode: 0 },
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'electron') {
          if (browser.isHeadless) {
            launchOptions.args.push('--window-size=1920,1080');
          }
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          launchOptions.args.push('-width=1920');
          launchOptions.args.push('-height=1080');
        }

        return launchOptions;
      });

      return config;
    },
  },
});
