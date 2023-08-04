import { defineConfig } from "cypress";
import { addVisualRegressionTrackerPlugin } from "@visual-regression-tracker/agent-cypress";

/**
 * @see https://docs.cypress.io/guides/references/configuration
 */
export default defineConfig({
  e2e: {
    baseUrl: "https://www.google.com/",
    specPattern: "cypress/integration/*.spec.js",

    setupNodeEvents(on, config) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config
      addVisualRegressionTrackerPlugin(on, config);
    },
  },
  video: false,
  screenshotOnRunFailure: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  env: {
    visualRegressionTracker: {
      apiUrl: "http://localhost:4200",
      apiKey: "DEFAULTUSERAPIKEYTOBECHANGED",
      project: "Default project",
      branchName: "master",
      enableSoftAssert: true,
    },
  },
});
