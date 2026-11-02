# agent-codeceptjs with the WebDriver helper

- Install dependencies: `npm install` (WebDriver downloads a matching chromedriver on the first run)
- Set the connection in `codecept.conf.js` (`helpers.VisualRegressionTrackerHelper`)
- Run the tests: `npm test`
- Editor autocompletion for `I`: `npx codeceptjs def`

agent-codeceptjs 4.6.1 needs a helper whose `saveScreenshot` returns the image,
which in CodeceptJS 3 is `WebDriver`; it takes full-page screenshots there.
`overrides` in `package.json` moves the agent onto sdk-js 5.
