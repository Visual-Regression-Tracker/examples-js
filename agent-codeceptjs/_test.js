Feature("");

BeforeSuite((I) => {
  I.vrtStart();
});

AfterSuite((I) => {
  I.vrtStop();
});

Scenario("test something", (I) => {
  I.amOnPage("https://github.com");

  I.vrtTrack("Default");

  I.vrtTrack("Additional options", {
    os: "windows",
    device: "device",
    browser: "chrome",
    diffTollerancePercent: 13,
  });
});
