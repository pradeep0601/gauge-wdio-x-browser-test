const { assert } = require('chai');

const { browsers: { name: { SAFARI } } } = require('../../lib/constants');
const { wdio } = require('../../lib/wdio-config');

step('Click an element with selector: <selector>', async (selector) => {
  const elem = await wdio.client.$(selector);
  // TODO: Element click doesn't work on Safari 13
  // https://github.com/webdriverio/webdriverio/issues/4565
  if (process.env.BROWSER === SAFARI) {
    const isClickable = await elem.isClickable();
    assert.isTrue(isClickable, `Element with selector: ${selector} is not clickable`);
    await wdio.client.execute(`document.querySelector("${selector}").click()`);
  } else {
    await elem.click();
  }
});

step('Click an element with selector: <selector> if exists', async (selector) => {
  await wdio.client.pause(5000);
  const elem = await wdio.client.$(selector);
  if (await elem.isExisting) {
    if (process.env.BROWSER === SAFARI) {
      const isClickable = await elem.isClickable();
      assert.isTrue(isClickable, `Element with selector: ${selector} is not clickable`);
      await wdio.client.execute(`document.querySelector("${selector}").click()`);
    } else {
      await elem.click();
    }
  }
});
