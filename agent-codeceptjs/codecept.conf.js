exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "https://the-internet.herokuapp.com",
      browser: "chromium",
      windowSize: "1280x720",
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
