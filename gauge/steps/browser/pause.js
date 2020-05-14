const { wdio } = require('../../lib/wdio-config');

step('Wait for <waitInSec> seconds', async (waitInSec) => {
  await wdio.client.pause(waitInSec * 1000);
});
