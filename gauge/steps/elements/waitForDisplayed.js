const { wdio } = require('../../lib/wdio-config');

step('Wait for display of an element with selector: <selector>', async (selector) => {
  const elem = await wdio.client.$(selector);
  await elem.waitForDisplayed();
});

step('Wait <waitInSec> seconds for display of an element with selector: <selector>', async (waitInSec, selector) => {
  const elem = await wdio.client.$(selector);
  await elem.waitForDisplayed(waitInSec * 1000);
});
