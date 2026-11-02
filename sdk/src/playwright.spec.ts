import { chromium, Browser, Page } from "playwright";
import { VisualRegressionTracker } from "@visual-regression-tracker/sdk-js";

jest.setTimeout(30000);

const vrt = new VisualRegressionTracker();

let browser: Browser;
let page: Page;

describe("Playwright example", () => {
  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage({ viewport: { width: 800, height: 600 } });
    await vrt.start();
  });

  afterAll(async () => {
    await browser.close();
    await vrt.stop();
  });

  beforeEach(async () => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  it("Home page", async () => {
    await vrt.track({
      name: "Home page",
      imageBuffer: await page.screenshot(),
    });
  });

  it("Checkboxes page", async () => {
    await page.getByRole("link", { name: "Checkboxes" }).click();
    await page.getByRole("checkbox").first().check();

    await vrt.track({
      name: "Checkboxes page",
      imageBuffer: await page.screenshot(),
      os: process.platform,
      browser: "chromium",
      viewport: "800x600",
      device: "PC",
      diffTollerancePercent: 0,
      ignoreAreas: [{ x: 0, y: 500, width: 800, height: 100 }],
    });
  });
});
