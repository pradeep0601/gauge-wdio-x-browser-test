const { remote } = require('webdriverio');
const { isEmpty, parseInt } = require('lodash');
const {
  browsers: {
    name: {
      CHROME, EDGE, FIREFOX, IE, SAFARI,
    },
  }, browserStackConfig, wdioDefaultOptions,
} = require('../lib/constants');

/**
 * Gets browser version
 * Set browser version into env (gauge.properties) to get picked
 *
 * @param  {String} browserName
 */
const getBrowserVersion = (browserName) => {
  let browserVersion;
  switch (browserName) {
    case CHROME:
      browserVersion = process.env.CHROME_VERSION;
      break;
    case FIREFOX:
      browserVersion = process.env.FIREFOX_VERSION;
      break;
    case IE:
      browserVersion = process.env.IE_VERSION;
      break;
    case EDGE:
      browserVersion = process.env.EDGE_VERSION;
      break;
    case SAFARI:
      browserVersion = process.env.SAFARI_VERSION;
      break;
    default:
      break;
  }
  return browserVersion;
};

/**
 * Returns capability of given browser
 * @param {String} browserName
 */
const getBrowserCapabilities = (browserName) => {
  const browserVersion = getBrowserVersion(browserName);
  const capabilities = {
    browserName,
  };

  if (browserVersion) {
    capabilities.browserVersion = browserVersion;
  }

  if (process.env.PLATFORM_NAME) {
    capabilities.platformName = process.env.PLATFORM_NAME;
  }

  if (process.env.PLATFORM_VERSION) {
    capabilities.platformVersion = process.env.PLATFORM_VERSION;
  }

  switch (browserName) {
    case CHROME:
      if (process.env.HEADLESS) {
        return {
          ...capabilities,
          'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu'],
          },
        };
      }
      break;
    case FIREFOX:
      if (process.env.HEADLESS) {
        return {
          ...capabilities,
          'moz:firefoxOptions': {
            args: ['-headless'],
          },
        };
      }
      break;
    case IE:
      return {
        ...capabilities,
        'se:ieOptions': {
          ignoreZoomSetting: true,
          requireWindowFocus: true,
        },
      };
    default:
      break;
  }
  return capabilities;
};

/**
 * Gets browser capabilities
 * @param  {String} browserName
 */
const getOptions = (browserName) => {
  const options = {};
  options.capabilities = getBrowserCapabilities(browserName);
  options.logLevel = process.env.LOG_LEVEL || wdioDefaultOptions.DEFAULT_LOG_LEVEL;
  if (process.env.BSTACK) {
    const { PROTOCOL, HOSTNAME, PORT } = browserStackConfig;
    options.user = process.env.BROWSERSTACK_USERNAME;
    options.key = process.env.BROWSERSTACK_ACCESS_KEY;
    options.port = parseInt(PORT);
    options.protocol = PROTOCOL;
    options.hostname = HOSTNAME;
    options.capabilities.project = 'gauge-wdio-cross-browser-project';
    options.capabilities.build = 'gauge-wdio-cross-browser-build';
  }
  return options;
};

const wdio = {
  client: {},
};

/**
 * Instantiate the client by using given wdio options
 * @param  {Object} wdioOptions
 * @param  {String} wdioOptions.browserName (required)
 */
const getClient = async (browserName) => {
  if (!browserName) {
    throw Error('wdioConfig.getClient expected argument: browserName');
  }

  const options = getOptions(browserName);
  wdio.client = !isEmpty(wdio.client) || (await remote(options));
  return wdio.client;
};

module.exports = {
  getClient,
  wdio,
};
