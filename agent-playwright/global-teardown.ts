import { PlaywrightVisualRegressionTracker } from "@visual-regression-tracker/agent-playwright";

export default async function globalTeardown() {
  const vrt = new PlaywrightVisualRegressionTracker("chromium");
  await vrt.start();
  await vrt.stop();
}
