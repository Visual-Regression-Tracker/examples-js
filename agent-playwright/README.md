# agent-playwright with Playwright Test

- Install dependencies: `npm install`, then `npx playwright install chromium`
- Set the connection in `vrt.json` or with `VRT_*` environment variables
- Run the tests: `npm test`

`global-setup.ts` starts one VRT build for the whole run and `global-teardown.ts`
stops it, so parallel workers report into the same build. A `VRT_CIBUILDID`
set in the environment is used as the build's CI id.
