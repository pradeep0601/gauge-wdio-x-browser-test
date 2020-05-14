const { wdio } = require('../../lib/wdio-config');

step('Press enter key', async () => {
  await wdio.client.keys('\uE007');
});
