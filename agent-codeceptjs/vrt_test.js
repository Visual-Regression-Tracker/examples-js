Feature("Visual test");

BeforeSuite(({ I }) => {
  I.vrtStart();
});

AfterSuite(({ I }) => {
  I.vrtStop();
});

Scenario("tracks a page with and without options", ({ I }) => {
  I.amOnPage("/");

  I.vrtTrack("Home page");

  I.click("Inputs");
  I.fillField("input[type=number]", "42");

  I.vrtTrack("Inputs page", {
    os: process.platform,
    device: "PC",
    browser: "chrome",
    diffTollerancePercent: 0,
    ignoreAreas: [{ x: 10, y: 10, width: 100, height: 200 }],
  });
});
