const { wdio } = require('../lib/wdio-config');

step('Wait for <waitInSec> seconds', async (waitInSec) => {
  await wdio.client.pause(waitInSec * 1000);
});

step('Wait for display of an element with selector: <selector>', async (selector) => {
  const elem = await wdio.client.$(selector);
  await elem.waitForDisplayed();
});

step('Wait <waitInSec> seconds for display of an element with selector: <selector>', async (waitInSec, selector) => {
  const elem = await wdio.client.$(selector);
  await elem.waitForDisplayed(waitInSec * 1000);
});

step('Wait until display of text: <textContnt> for element with selector: <selector>', async (textContnt, selector) => {
  await wdio.client.waitUntil(async () => {
    const elem = await wdio.client.$(selector);
    return await elem.getText() === textContnt;
  }, 5000, `${textContnt} not displayed in 5s`);
});
