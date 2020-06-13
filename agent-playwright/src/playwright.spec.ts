import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  PlaywrightVisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/agent-playwright";

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  projectId: "733c148e-ef70-4e6d-9ae5-ab22263697cc",
  apiKey: "BAZ0EG0PRH4CRQPH19ZKAVADBP9E",
};

describe("Playwright example", () => {
  let browserType = chromium;
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let vrt: PlaywrightVisualRegressionTracker;

  beforeAll(async () => {
    browser = await browserType.launch({ headless: true });
    context = await browser.newContext({
      viewport: {
        width: 1800,
        height: 1600,
      },
    });
    page = await context.newPage();
    vrt = new PlaywrightVisualRegressionTracker(config, browserType);
  });

  afterAll(() => {
    browser.close();
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
        fullPage: true,
      },
      agent: {
        os: "Mac",
        device: "PC",
      },
    });
  });
});
