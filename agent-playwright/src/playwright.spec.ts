import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  PlaywrightVisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/agent-playwright";

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  project: "Default project",
  apiKey: "CPKVK4JNK24NVNPNGVFQ853HXXEG",
};

jest.setTimeout(30000);

describe("Playwright example", () => {
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
  });

  afterAll(async () => {
    await browser.close();
  });

  it("Search", async () => {
    await page.goto("https://google.com/");

    await vrt.track(page, "Home page");

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
