const wdioConfig = require('../../lib/wdio-config');

const { getSessionInfo } = require('../../lib/browser-stack-utils');

let client;

beforeSuite(async () => {
  client = await wdioConfig.getClient(process.env.BROWSER);
  await client.maximizeWindow();
});

afterSuite(async () => {
  if (process.env.BSTACK) {
    const { sessionId } = client;
    const sessionInfo = await getSessionInfo(sessionId);
    const { automation_session: { public_url } } = sessionInfo;
    console.info(`Browser Stack DashBoard Url: ${public_url}`);
    gauge.message(`<a href=${public_url} target='%5Fblank'>Click to check Browser Stack's DashBoard!!</a>`);
  }
  await client.deleteSession();
});
