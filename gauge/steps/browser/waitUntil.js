const { wdio } = require('../../lib/wdio-config');

step('Wait until display of text: <textContnt> for element with selector: <selector>', async (textContnt, selector) => {
  await wdio.client.waitUntil(async () => {
    const elem = await wdio.client.$(selector);
    return await elem.getText() === textContnt;
  }, 5000, `${textContnt} not displayed in 5s`);
});
