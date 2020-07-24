const { Helper } = codeceptjs;
const fs = require('fs');
const path = require('path');
const VisualRegressionTracker = require('@visual-regression-tracker/sdk-js').VisualRegressionTracker;

class VisualRegressionTrackerHelper extends Helper {
  vrt;

  constructor(config) {
    super();
    this.vrt = new VisualRegressionTracker(config)
  }

  /**
   * @param name {String} name of the page you want to track
   * @param diffTollerancePercent {Number} set acceptable difference from baseline, between `0-100`. Default `1`
    */
  async track(name, options) {

    const helper = this._getHelper()
    const filepath = path.join(global.output_dir, `${name}-${Date.now()}.png`);
    console.log(global.output_dir)
    const image = await helper.saveScreenshot(filepath)
    // fs.unlinkSync(filepath)

    return this.vrt.track({
      name,
      imageBase64: image.toString("base64"),
      ...options
    })
  }

  _getHelper() {
    if (this.helpers['Playwright']) {
      return this.helpers['Playwright'];
    }
    if (this.helpers['Puppeteer']) {
      return this.helpers['Puppeteer'];
    }
    if (this.helpers['WebDriver']) {
      return this.helpers['WebDriver'];
    }
    if (this.helpers['Appium']) {
      return this.helpers['Appium'];
    }
    if (this.helpers['WebDriverIO']) {
      return this.helpers['WebDriverIO'];
    }
    if (this.helpers['TestCafe']) {
      return this.helpers['TestCafe'];
    }

    throw new Error('No matching helper found. Supported helpers: WebDriver/Appium/Puppeteer/TestCafe');
  }
}

module.exports = VisualRegressionTrackerHelper;
