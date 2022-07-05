import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    viewportHeight: 844,
    viewportWidth: 390,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
