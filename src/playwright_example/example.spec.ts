import { chromium, Browser, Page, BrowserContext } from 'playwright'
import { VisualRegressionTracker, Config } from '@visual-regression-tracker/sdk-js'

const config: Config = {
    apiUrl: "http://localhost:4200",
    branchName: "develop",
    projectId: "76f0c443-9811-4f4f-b1c2-7c01c5775d9a",
    token: "F5Z2H0H2SNMXZVHX0EA4YQM1MGDD",
};
const vrt = new VisualRegressionTracker(config);

describe('Playwright example', () => {

    let browser: Browser
    let context: BrowserContext
    let page: Page
    const imageOptions = {
        os: "Mac",
        browser: "Chrome",
        viewport: "800x600",
        device: "PC",
        diffTollerancePercent: 0,
    }

    beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
    })

    afterAll(() => {
        browser.close()
    })

    it('Search', async () => {
        await page.goto('https://google.com/');

        await vrt.track({
            name: "Search page",
            imageBase64: (await page.screenshot()).toString('base64'),
            ...imageOptions
        });

        await page.type("[name='q']", 'Visual regression tracker')
        await page.press("[name='q']", 'Enter');
        await page.waitForSelector('#search');

        await vrt.track({
            name: "Result page",
            imageBase64: (await page.screenshot()).toString('base64'),
            ...imageOptions
        });
    })
})