const { wdio } = require('../../lib/wdio-config');

step('Enter text: <textContent> into input field with selector: <selector>', async (textContent, selector) => {
  const element = await wdio.client.$(selector);
  await element.setValue(textContent);
});
