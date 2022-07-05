import {defineConfig} from 'cypress';

export default defineConfig({
  env: {
    TEST_USER_EMAIL: 'kontism@gmail.com',
    TEST_USER_PASSWORD: 'v$4f85z9isP.ibu',
  },
  e2e: {
    baseUrl: 'http://localhost:19006',
    // iPhone 12 Pro screen dimensions
    viewportHeight: 844,
    viewportWidth: 390,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
