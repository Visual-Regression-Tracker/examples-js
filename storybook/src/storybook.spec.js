const { after, before, describe, it } = require("node:test");
const { chromium } = require("playwright");
const {
  PlaywrightVisualRegressionTracker,
} = require("@visual-regression-tracker/agent-playwright");

const storybookUrl =
  "https://uber.github.io/react-vis/website/dist/storybook/iframe.html";
let browser;
let page;
let vrt;

describe("Storybook example", () => {
  before(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    vrt = new PlaywrightVisualRegressionTracker(chromium.name());
    await vrt.start();
  });

  after(async () => {
    await browser.close();
    await vrt.stop();
  });

  it("Single area chart", async () => {
    const componentUrlParams =
      "?selectedKind=Series%2FAreaSeries%2FBase&selectedStory=Single%20Area%20chart";

    await page.goto(storybookUrl + componentUrlParams);

    await vrt.trackPage(page, "Single area chart");
  });

  for (const [componentName, componentUrlParams] of [
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
  ]) {
    it(componentName, async () => {
      await page.goto(storybookUrl + componentUrlParams);

      await vrt.trackPage(page, componentName);
    });
  }
});
