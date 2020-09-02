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
  apiKey: "M7X93CSR67MH76NNKCQ6KDQS18K8",
  enableSoftAssert: true,
};

let browserType = chromium;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let vrt: PlaywrightVisualRegressionTracker;

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

describe("Playwright example", () => {
  beforeEach(async () => {
    await page.goto("https://google.com/");
  });

  it("Home page", async () => {
    await vrt.track(page, "Home page");
  });

  it("Search result page", async () => {
    await page.type("[name='q']", "Visual regression tracker");
    await page.press("[name='q']", "Enter");
    await page.waitForSelector("#search");

    await vrt.track(page, "Search result page", {
      diffTollerancePercent: 0,
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
