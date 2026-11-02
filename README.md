# Visual Regression Tracker examples for JavaScript

Each folder is a separate project with its own `package.json` and README:

- [agent-playwright (TS)](agent-playwright): Playwright Test with a global setup and teardown
- [agent-cypress (JS)](agent-cypress)
- [agent-codeceptjs (JS)](agent-codeceptjs): CodeceptJS 3 with the WebDriver helper
- [Storybook + agent-playwright (JS)](storybook)
- [sdk-js (TS)](sdk): the SDK directly, with Playwright and Jest

The examples connect to `http://localhost:4200` with the default API key and
project of a fresh [Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker)
install. Change that in each example's configuration.
