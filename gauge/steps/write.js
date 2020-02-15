const { wdio } = require('../lib/wdio-config');

step('Enter text: <textContent> into input field with selector: <selector>', async (textContent, selector) => {
  const elem = await wdio.client.$(selector);
  await elem.setValue(textContent);
});
