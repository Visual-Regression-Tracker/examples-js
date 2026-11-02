# Visual Regression Tracker examples for JavaScript

Each folder is a separate project with its own `package.json` and README. The examples open https://the-internet.herokuapp.com or a public Storybook headless and track screenshots in a [Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker) 6.0 server.

| Example                              | Stack                                             | Client                                                                            |
| ------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| [agent-playwright](agent-playwright) | Playwright Test (TypeScript), one build per run   | [agent-playwright](https://github.com/Visual-Regression-Tracker/agent-playwright) |
| [agent-cypress](agent-cypress)       | Cypress                                           | [agent-cypress](https://github.com/Visual-Regression-Tracker/agent-cypress)       |
| [agent-codeceptjs](agent-codeceptjs) | CodeceptJS 3 with the WebDriver helper            | [agent-codeceptjs](https://github.com/Visual-Regression-Tracker/agent-codeceptjs) |
| [storybook](storybook)               | Storybook stories with Playwright                 | [agent-playwright](https://github.com/Visual-Regression-Tracker/agent-playwright) |
| [sdk](sdk)                           | Playwright library (TypeScript), the SDK directly | [sdk-js](https://github.com/Visual-Regression-Tracker/sdk-js)                     |

The examples connect with `vrt.json` or `VRT_*` environment variables, the way [sdk-js reads its configuration](https://github.com/Visual-Regression-Tracker/sdk-js#configure); agent-codeceptjs sets it in `codecept.conf.js` instead. `vrt.json.example` holds the URL, API key and project of a fresh local install; copy it to `vrt.json` and change what differs.

CI runs every example against a VRT server started from [.github/vrt/docker-compose.yml](.github/vrt/docker-compose.yml).
