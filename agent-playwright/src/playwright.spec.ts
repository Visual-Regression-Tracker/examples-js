import { chromium, Browser, Page, BrowserContext } from "playwright";
import {
  PlaywrightVisualRegressionTracker,
  Config,
} from "@visual-regression-tracker/agent-playwright";

const config: Config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  projectId: "5a0b9771-5deb-4edb-abe7-65c3919ce204",
  apiKey: "F3GCS56KVA4168HAN53YN31ASSVG",
};

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
        fullPage: false,
      },
      agent: {
        os: "iOS",
        device: "MackBook 13",
      },
    });
  });
});
