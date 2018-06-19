async function main() {
    const webdriverio = require('webdriverio');
    var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

    var sauceUser = process.env.SAUCE_USER || "matan";
    var sauceKey = process.env.SAUCE_KEY || "ec79e940-078b-41d4-91a6-d7d6008cf1ea";

const browserOptions = {
  host: "ondemand.saucelabs.com",
  port: 80,
  path: '/wd/hub',
  desiredCapabilities: {
    services: ['sauce'],
    username: sauceUser,
    accessKey: sauceKey,
    sauceConnect: true,
    browserName: 'chrome',
    platform: 'Mac OS X 10.13',
    version: '65.0',
    chromeOptions: {
      args: [
        'disable-infobars',
      ]
    }
  }
};

    const driver = webdriverio.remote(browserOptions);
    let browser = driver.init();

    // Initialize the eyes SDK and set your private API key.
    const {Eyes, Target} = require('@applitools/eyes.webdriverio');
    const {BatchInfo, FloatingMatchSettings, RectangleSize} = require('@applitools/eyes.sdk.core');
    let eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new ConsoleLogHandler(true));
    let batchInfo = new BatchInfo('WebDriverIO Tests');
    eyes.setBatch(batchInfo);


    try {

        // Start the test and set the browser's viewport size to 800x600.
        await eyes.open(browser, 'Hello World!', 'My first WebdriverIO test!', {width: 800, height: 600});

        // Navigate the browser to the "hello world!" web-site.
        await browser.url('https://applitools.com/helloworld');

        // Visual checkpoint #1.
        await eyes.check('Main Page', Target.window());

        // Click the "Click me!" button.
        await browser.click('button');

        // Visual checkpoint #2.
        await eyes.check('Click!', Target.window());

        // End the test.
        await eyes.close();

    } finally {

        // Close the browser.
        await browser.end();

        // If the test was aborted before eyes.close was called ends the test as aborted.
        await eyes.abortIfNotClosed();

    }

}

main();