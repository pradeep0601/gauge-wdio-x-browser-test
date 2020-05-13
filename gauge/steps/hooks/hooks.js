const path = require('path');
const shortUuid = require('short-uuid');

const wdioConfig = require('../../lib/wdio-config');

const { getSessionInfo } = require('../../lib/browser-stack-utils');

let client;

beforeSuite(async () => {
  client = await wdioConfig.getClient(process.env.BROWSER);
  if (process.env.BROWSER !== 'edge') {
    await client.maximizeWindow();
  }
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

gauge.customScreenshotWriter = async () => {
  const uuid = shortUuid.generate();
  const screenshotFilePath = path.join(
    process.env.gauge_screenshots_dir,
    `screenshot-${uuid.substring(0, 11)}.png`
  );
  await client.saveScreenshot(screenshotFilePath);
  console.info(`Saving screenshot at: ${process.env.gauge_screenshots_dir}`, false);
  return path.basename(screenshotFilePath);
};
