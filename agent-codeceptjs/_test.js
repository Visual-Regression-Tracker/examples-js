Feature("Some feature");

BeforeSuite((I) => {
  I.vrtStart();
});

AfterSuite((I) => {
  I.vrtStop();
});

Scenario("test something", (I) => {
  I.amOnPage("https://github.com");

  I.vrtTrack("Default");

  I.click("[name='user[login]']");
  I.type("some login");

  I.vrtTrack("Additional options", {
    os: "windows",
    device: "device",
    browser: "chrome",
    diffTollerancePercent: 0,
    ignoreAreas: [
      {
        x: 10,
        y: 10,
        width: 100,
        height: 200,
      },
    ],
  });
});
