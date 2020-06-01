import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  PlaywrightVisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/agent-playwright";

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  projectId: "90e3b95d-6468-4771-a2e7-7bc7d3ca2b1b",
  apiKey: "W5KJ9ZGXRV458AH1XZEJ8WF284ED",
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
