import { PlaywrightVisualRegressionTracker } from "@visual-regression-tracker/agent-playwright";

export default async function globalSetup() {
  // Workers and the teardown join this build through the shared ciBuildId.
  process.env.VRT_CIBUILDID ||= new Date().toISOString();
  await new PlaywrightVisualRegressionTracker("chromium").start();
}
