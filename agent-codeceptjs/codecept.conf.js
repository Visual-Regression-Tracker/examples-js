const { setHeadlessWhen } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    WebDriver: {
      url: "https://myapp.com",
      browser: "chrome",
      host: "127.0.0.1",
      port: 4444,
      restart: false,
      windowSize: "800x600",
      desiredCapabilities: {
        chromeOptions: {
          args: [/*"--headless",*/ "--disable-gpu", "--no-sandbox"],
        },
      },
    },
    // TestCafe : {
    //   url: "http://localhost",
    //   waitForTimeout: 15000,
    //   show: true,
    //   browser: "chrome"
    // },
    // Puppeteer : {
    //   url: "http://localhost",
    //   restart: false,
    //   waitForNavigation: "networkidle0",
    //   waitForAction: 500
    // },
    // Playwright: {
    //   url: 'http://localhost',
    //   show: true,
    //   browser: 'chromium'
    // },
    VisualRegressionTrackerHelper: {
      require: "@visual-regression-tracker/agent-codeceptjs",
      apiUrl: "http://localhost:4200",
      branchName: "master",
      project: "Default project",
      apiKey: "M7X93CSR67MH76NNKCQ6KDQS18K8",
    },
  },
  include: {
    I: "./steps_file.js",
  },
  bootstrap: null,
  mocha: {},
  name: "agent-codeceptjs",
  plugins: {
    wdio: {
      enabled: true,
      services: ["selenium-standalone"],
    },
    retryFailedStep: {
      enabled: false,
    },
    screenshotOnFail: {
      enabled: false,
    },
  },
};
