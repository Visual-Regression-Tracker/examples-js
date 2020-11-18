import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  VisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/sdk-js";
jest.setTimeout(30000);

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  project: "Default project",
  apiKey: "0TK0P0NQP6MNFQQPTYYBN27JRAA5",
  enableSoftAssert: true,
  ciBuildId: new Date().getTime().toString(36),
};
const vrt = new VisualRegressionTracker(config);

let browser: Browser;
let context: BrowserContext;
let page: Page;

describe("Playwright example", () => {
  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      viewport: {
        width: 800,
        height: 600,
      },
    });
    page = await context.newPage();
    await vrt.start();
  });

  afterAll(async () => {
    await browser.close();
    await vrt.stop();
  });

  beforeEach(async () => {
    await page.goto("https://google.com/");
  });

  it("Home page", async () => {
    await vrt.track({
      name: "Home page",
      imageBase64: (await page.screenshot()).toString("base64"),
    });
  });

  it("Search result page", async () => {
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
      ignoreAreas: [
        {
          x: 100,
          y: 300,
          width: 600,
          height: 700,
        },
      ],
    });
  });
});
