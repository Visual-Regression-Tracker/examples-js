# sdk-js with Playwright

[src/playwright.spec.ts](src/playwright.spec.ts) drives the browser with the [Playwright](https://playwright.dev/docs/library) library and tracks screenshots with [sdk-js](https://github.com/Visual-Regression-Tracker/sdk-js) directly. The tests run on Node's built-in test runner, which runs TypeScript as is.

## Prerequisites

- Node.js 26 or later
- A running [Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker) 6.0 server and its API key

## Setup

- Copy `vrt.json.example` to `vrt.json` and set your connection, or use the [`VRT_*` environment variables](https://github.com/Visual-Regression-Tracker/sdk-js#or-as-environment-variables), which override the file
- Install dependencies: `npm install`
- Install the browser: `npx playwright install chromium`

## Run

```sh
npm test
```

## What to expect

`enableSoftAssert` is on: the SDK logs a failed check instead of throwing, so the tests pass and print a link to each test run.

- First run: `No baseline` for "Home page" and "Checkboxes page". The VRT UI shows a build with two new test runs. Approve them to make them the baseline for the branch.
- Next runs: nothing is logged while the pages look the same. When one changes, `Difference found`, and the build shows the diff to approve or reject.

Set `enableSoftAssert` to `false` to make new and changed screenshots fail the tests.
