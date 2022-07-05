import {defineConfig} from 'cypress';

export default defineConfig({
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
