import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  PlaywrightVisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/agent-playwright";
jest.setTimeout(30000);

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  project: "Default project",
  apiKey: "4G16TTD8E54Q6DN1YSXVD8YHSCH3",
  enableSoftAssert: true,
};

let browserType = chromium;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let vrt: PlaywrightVisualRegressionTracker;

describe("Playwright example", () => {
  beforeAll(async () => {
    browser = await browserType.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    vrt = new PlaywrightVisualRegressionTracker(config, browserType);
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
    await vrt.trackPage(page, "Home page");
  });

  it("Logo", async () => {
    const logo = await page.$("#hplogo");
    await vrt.trackElementHandle(logo, "Logo");
  });

  it("Search result page", async () => {
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
