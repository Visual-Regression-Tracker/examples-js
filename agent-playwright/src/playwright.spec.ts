import { test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker } from "@visual-regression-tracker/agent-playwright";

const test = base.extend<{}, { vrt: PlaywrightVisualRegressionTracker }>({
  vrt: [
    async ({ browserName }, use) => {
      const vrt = new PlaywrightVisualRegressionTracker(browserName);
      await vrt.start();
      await use(vrt);
    },
    { scope: "worker" },
  ],
});

test.describe("Visual test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Home page", async ({ page, vrt }) => {
    await vrt.trackPage(page, "Home page");
  });

  test("Heading", async ({ page, vrt }) => {
    await vrt.trackElementHandle(page.locator("h1.heading"), "Heading");
  });

  test("Checkboxes page", async ({ page, vrt }) => {
    await page.getByRole("link", { name: "Checkboxes" }).click();
    await page.getByRole("checkbox").first().check();

    await vrt.trackPage(page, "Checkboxes page", {
      diffTollerancePercent: 0,
      ignoreAreas: [{ x: 0, y: 600, width: 1280, height: 120 }],
      screenshotOptions: { fullPage: true },
      agent: { os: process.platform, device: "PC" },
    });
  });
});
