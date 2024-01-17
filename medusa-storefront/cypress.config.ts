import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    codeCoverage: {
      url: '/api/__coverage__',
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
