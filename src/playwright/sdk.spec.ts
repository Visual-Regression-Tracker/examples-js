import { chromium, Browser, Page, BrowserContext } from 'playwright'
import { VisualRegressionTracker, Config } from '@visual-regression-tracker/sdk-js'

const config: Config = {
    apiUrl: "http://localhost:4200",
    branchName: "develop",
    projectId: "733c148e-ef70-4e6d-9ae5-ab22263697cc",
    apiKey: "BAZ0EG0PRH4CRQPH19ZKAVADBP9E",
};
const vrt = new VisualRegressionTracker(config);

describe('Playwright example', () => {

    let browser: Browser
    let context: BrowserContext
    let page: Page

    beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext({
            viewport: {
                width: 800,
                height: 600
            }
        });
        page = await context.newPage();
    })

    afterAll(() => {
        browser.close()
    })

    it('Search', async () => {
        await page.goto('https://google.com/');

        await vrt.track({
            name: "Home page1",
            imageBase64: (await page.screenshot()).toString('base64')
        });

        await page.type("[name='q']", 'Visual regression tracker')
        await page.press("[name='q']", 'Enter');
        await page.waitForSelector('#search');

        await vrt.track({
            name: "Search result page1",
            imageBase64: (await page.screenshot({
                fullPage: true
            })).toString('base64'),
            os: "Mac",
            browser: "Chrome",
            viewport: "800x600",
            device: "PC",
            diffTollerancePercent: 0,
        });
    })
})