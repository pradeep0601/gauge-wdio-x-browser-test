const { assert } = require('chai');

const { wdio } = require('../../lib/wdio-config');


step('Verify an element with selector: <selector> does not exist', async (selector) => {
  const elem = await wdio.client.$(selector);
  const isElemExists = await elem.isExisting();
  assert.isFalse(isElemExists, `Element with selector: ${selector} exists`);
});
