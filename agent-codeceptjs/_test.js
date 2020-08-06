Feature('');

Scenario('test something', (I) => {
    I.amOnPage('https://github.com');

    I.track('Default');

    I.track('Additional options', {
        os: "windows",
        device: 'device',
        browser: 'chrome',
        diffTollerancePercent: 13,
    });
});
