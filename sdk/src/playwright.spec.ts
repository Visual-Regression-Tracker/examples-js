import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  VisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/sdk-js";

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  project: "Default project",
  apiKey: "WB2EG43V2745N3QP6A6RPRQ5D7X6",
};
const vrt = new VisualRegressionTracker(config);

jest.setTimeout(30000);

describe("Playwright example", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      viewport: {
        width: 800,
        height: 600,
      },
    });
    page = await context.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it("Search", async () => {
    await page.goto("https://google.com/");

    await vrt.track({
      name: "Home page",
      imageBase64: (await page.screenshot()).toString("base64"),
    });

    await page.type("[name='q']", "Visual regression tracker");
    await page.press("[name='q']", "Enter");
    await page.waitForSelector("#search");

    await vrt.track({
      name: "Search result page",
      imageBase64: (
        await page.screenshot({
          fullPage: false,
        })
      ).toString("base64"),
      os: "Mac",
      browser: "Chrome",
      viewport: "800x600",
      device: "PC",
      diffTollerancePercent: 0,
    });
  });
});
