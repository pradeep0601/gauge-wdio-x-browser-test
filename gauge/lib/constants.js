module.exports = {
  browsers: {
    name: {
      CHROME: 'chrome',
      EDGE: 'edge',
      FIREFOX: 'firefox',
      IE: 'internet explorer',
      SAFARI: 'safari',
    },
    version: {
      IE: '11',
      EDGE: '18.0',
      CHROME: '78.0',
      FIREFOX: '71.0',
      SAFARI: '13.0',
    },
  },
  platforms: {
    OS: {
      MacOS_X: 'MAC',
      Windows: 'Windows',
    },
    OS_VERSION: {
      MacOS_X_CATALINA: 'Catalina',
      WINDOWS_10: '10',
    },
  },
  browserStackConfig: {
    HOSTNAME: 'hub-cloud.browserstack.com',
    PROTOCOL: 'https',
    PORT: 443,
  },
  wdioDefaultOptions: {
    DEFAULT_DRIVER_SERVER_PORT: 4444,
    DEFAULT_LOG_LEVEL: 'error',
  },
  LOG_LEVEL: 'error',
  DEFAULT_RETRIES_COUNT: 2,
  GAUGE_BASE_DIR: 'gauge/specs',
};
