# agent-playwright with Playwright Test

[src/playwright.spec.ts](src/playwright.spec.ts) tracks a page, an element and a full-page screenshot with [agent-playwright](https://github.com/Visual-Regression-Tracker/agent-playwright). [global-setup.ts](global-setup.ts) starts one VRT build for the whole run and [global-teardown.ts](global-teardown.ts) stops it, so parallel workers report into the same build. A `VRT_CIBUILDID` set in the environment is used as the build's CI id.

## Prerequisites

- Node.js 22 or later
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

`enableSoftAssert` is on: the agent logs a failed check instead of throwing, so the tests pass and print a link to each test run.

- First run: `No baseline` for "Home page", "Heading" and "Checkboxes page". The VRT UI shows a build with three new test runs. Approve them to make them the baseline for the branch.
- Next runs: nothing is logged while the pages look the same. When one changes, `Difference found`, and the build shows the diff to approve or reject.

Set `enableSoftAssert` to `false` to make new and changed screenshots fail the tests.
