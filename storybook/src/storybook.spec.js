const { chromium } = require("playwright");
const {
  PlaywrightVisualRegressionTracker,
} = require("@visual-regression-tracker/agent-playwright");

jest.setTimeout(30000);

const config = {
  apiUrl: "http://localhost:4200",
  branchName: "develop",
  project: "Default project",
  apiKey: "0TK0P0NQP6MNFQQPTYYBN27JRAA5",
  enableSoftAssert: true,
  ciBuildId: new Date().getTime().toString(36),
};
const storybookUrl =
  "https://uber.github.io/react-vis/website/dist/storybook/iframe.html";
let browserType = chromium;
let browser;
let context;
let page;
let vrt;

describe("Storybook example", () => {
  beforeAll(async () => {
    browser = await browserType.launch();
    context = await browser.newContext();
    page = await context.newPage();
    vrt = new PlaywrightVisualRegressionTracker(browserType, config);
    await vrt.start();
  });

  afterAll(async () => {
    await browser.close();
    await vrt.stop();
  });

  it("Signle area chart", async () => {
    const componentUrlParams =
      "?selectedKind=Series%2FAreaSeries%2FBase&selectedStory=Single%20Area%20chart";

    await page.goto(storybookUrl + componentUrlParams);

    await vrt.trackPage(page, "Single area chart");
  });

  it.each([
    [
      "single VerticalBarSeries",
      "?selectedKind=Series%2FVerticalBarSeries%2FBase&selectedStory=single%20VerticalBarSeries",
    ],
    [
      "single HorizontalBarSeries",
      "?selectedKind=Series%2FHorizontalBarSeries%2FBase&selectedStory=single%20HorizontalBarSeries",
    ],
    [
      "Discrete color legend",
      "?selectedKind=Legends&selectedStory=Discrete%20color%20legend",
    ],
    [
      "Continuous Color Legend",
      "?selectedKind=Legends&selectedStory=Continuous%20Color%20Legend",
    ],
  ])("%s", async (componentName, componentUrlParams) => {
    await page.goto(storybookUrl + componentUrlParams);

    await vrt.trackPage(page, componentName);
  });
});
