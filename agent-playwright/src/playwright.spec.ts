import { test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker } from "@visual-regression-tracker/agent-playwright";

type TestFixtures = {
  vrt: PlaywrightVisualRegressionTracker;
};

const test = base.extend<{}, TestFixtures>({
  vrt: [
    async ({ browserName }, use) => {
      await use(new PlaywrightVisualRegressionTracker(browserName));
    },
    { scope: "worker" },
  ],
});

test.beforeAll(async ({ vrt }) => {
  await vrt.start();
});

test.afterAll(async ({ vrt }) => {
  await vrt.stop();
});

test.describe("Visual test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://google.com/");
  });

  test("Home page", async ({ page, vrt }) => {
    await vrt.trackPage(page, "Home page");
  });

  test("Logo", async ({ page, vrt }) => {
    const logo = await page.$("[alt='Google']");
    await vrt.trackElementHandle(logo, "Logo");
  });

  test("Search result page", async ({ page, vrt }) => {
    await page.type("[name='q']", "Visual regression tracker");
    await page.press("[name='q']", "Enter");
    await page.waitForSelector("#search");

    await vrt.trackPage(page, "Search result page", {
      diffTollerancePercent: 0,
      ignoreAreas: [
        {
          x: 0,
          y: 0,
          width: 800,
          height: 500,
        },
      ],
      screenshotOptions: {
        fullPage: false,
      },
      agent: {
        os: "iOS",
        device: "MackBook 13",
      },
    });
  });
});
