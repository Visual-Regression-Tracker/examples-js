# agent-cypress

[cypress/e2e/vrt.cy.js](cypress/e2e/vrt.cy.js) tracks a page, an element and a fixture image with [agent-cypress](https://github.com/Visual-Regression-Tracker/agent-cypress). [cypress.config.js](cypress.config.js) registers the plugin, and [cypress/support/e2e.js](cypress/support/e2e.js) adds the `cy.vrt*` commands.

## Prerequisites

- Node.js 26 or later
- A running [Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker) 6.0 server and its API key

## Setup

- Copy `vrt.json.example` to `vrt.json` and set your connection, or use the [`VRT_*` environment variables](https://github.com/Visual-Regression-Tracker/sdk-js#or-as-environment-variables), which override the file. The plugin reads them when `env.visualRegressionTracker` is not set in `cypress.config.js`.
- Install dependencies: `npm install`

## Run

```sh
npm test
```

Or open the Cypress app with `npx cypress open`.

## What to expect

`enableSoftAssert` is on: the agent logs a failed check instead of failing the test, so the spec passes and prints a link to each test run.

- First run: `No baseline` for "Home page", "Heading" and "Fixture image". The VRT UI shows a build with three new test runs. Approve them to make them the baseline for the branch.
- Next runs: nothing is logged while the page looks the same. When it changes, `Difference found`, and the build shows the diff to approve or reject.

Set `enableSoftAssert` to `false` to make new and changed screenshots fail the test.
