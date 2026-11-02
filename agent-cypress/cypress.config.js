import { defineConfig } from "cypress";
import { addVisualRegressionTrackerPlugin } from "@visual-regression-tracker/agent-cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com/",
    setupNodeEvents(on, config) {
      addVisualRegressionTrackerPlugin(on, config);
    },
  },
  screenshotOnRunFailure: false,
});
