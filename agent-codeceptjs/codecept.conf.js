exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    WebDriver: {
      url: "https://the-internet.herokuapp.com",
      browser: "chrome",
      windowSize: "1280x720",
      desiredCapabilities: {
        "goog:chromeOptions": { args: ["--headless=new"] },
      },
    },
    VisualRegressionTrackerHelper: {
      require: "@visual-regression-tracker/agent-codeceptjs",
      apiUrl: "http://localhost:4200",
      apiKey: "DEFAULTUSERAPIKEYTOBECHANGED",
      project: "Default project",
      branchName: "master",
      enableSoftAssert: true,
      ciBuildId: new Date().toISOString(),
    },
  },
  include: {
    I: "./steps_file.js",
  },
  name: "agent-codeceptjs",
};
