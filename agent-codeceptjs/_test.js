Feature('');

Scenario('test something', (I) => {
    I.amOnPage('https://github.com');
    I.track('GitHub', {
        os: "windows",
        device: 'device',
        diffTollerancePercent: 0,
    });

    I.track('GitHub1', {
        os: "windows",
        diffTollerancePercent: 0,
    });

    I.track('GitHub2', {
        device: 'device',
        diffTollerancePercent: 0,
    });
});
