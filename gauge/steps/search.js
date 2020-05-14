const { wdio } = require('../lib/wdio-config');

step('Go to browserstack home page', async () => {
  await wdio.client.url('https://www.browserstack.com');
});

step('Go to google.com page', async () => {
  await wdio.client.url('https://www.google.com');
});
