const { includes, isEmpty } = require('lodash');
const loadGruntTasks = require('load-grunt-tasks');

const {
  GAUGE_BASE_DIR, DEFAULT_RETRIES_COUNT, browsers: { name: { IE, CHROME } }, platforms: { OS: { MacOS_X } },
} = require('./gauge/lib/constants');


module.exports = (grunt) => {
  // load grunt npm packages
  loadGruntTasks(grunt);

  let tags;

  if (grunt.option('tags') && !isEmpty(grunt.option('tags'))) {
    tags = `--tags ${grunt.option('tags')}`;
  }

  let retry;
  if (grunt.option('retry')) {
    let retryCount = grunt.option('retry');
    if (retryCount === true) {
      grunt.log.writeln(`Retry count NOT found, continuing with DEFAULT_RETRIES_COUNT: ${DEFAULT_RETRIES_COUNT}`);
      retryCount = DEFAULT_RETRIES_COUNT;
    }
    retry = `--max-retries-count=${retryCount}`;
  }

  if (grunt.option('mac')) {
    process.env.PLATFORM_NAME = MacOS_X;
  }
  const browserList = ['chrome', 'firefox', 'ie', 'edge', 'safari'];
  const browser = grunt.option('browser');

  if (browser) {
    if (!includes(browserList, browser)) {
      grunt.fail.warn(`browser option value should be one of the: ${browserList}`);
    }
    // in case of "ie", we have to set internet explorer as browser name
    process.env.BROWSER = browser === 'ie' ? IE : browser;
  } else {
    // setting chrome as a default browser
    process.env.BROWSER = CHROME;
  }

  // Execute on browserstack
  if (grunt.option('bstack')) {
    process.env.BSTACK = true;
  }
  // option for headless mode
  if (grunt.option('headless')) {
    if (process.env.BROWSER !== 'chrome' && process.env.BROWSER !== 'firefox') {
      grunt.fail.warn('headless mode is only supported for chrome or firefox');
    }
    process.env.HEADLESS = true;
  }

  grunt.initConfig({
    selenium_standalone: {
      options: {
        stopOnExit: true,
      },
      testserver: {
        // check for more recent versions of selenium here:
        // https://selenium-release.storage.googleapis.com/index.html
        baseURL: 'https://selenium-release.storage.googleapis.com',
        version: '3.7.0',
        drivers: {
          // check for more recent versions of chrome driver here:
          // https://chromedriver.storage.googleapis.com/index.html
          chrome: {
            version: '2.39',
            arch: process.arch,
            baseURL: 'https://chromedriver.storage.googleapis.com',
          },
          ie: {
            // check for more recent versions of internet explorer driver here:
            // https://selenium-release.storage.googleapis.com/index.html
            version: '3.7.0',
            arch: process.arch,
            baseURL: 'https://selenium-release.storage.googleapis.com',
          },
          edge: {
            version: '17.17134',
            arch: process.arch,
            baseURL: 'https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver',
          },
          firefox: {
            version: '0.26.0',
            arch: process.arch,
            baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
          },
        },
        logger: (message) => {
          grunt.log.writeln(message);
        },
      },
    },
    run: {
      options: {
      },
      specs: {
        exec: `gauge run ${GAUGE_BASE_DIR} ${tags} ${retry}`,
      },
    },
  });

  // Aliases
  grunt.registerTask('install-drivers', 'selenium_standalone:testserver:install');
  grunt.registerTask('start-server', 'selenium_standalone:testserver:start');
  grunt.registerTask('stop-server', 'selenium_standalone:testserver:stop');
  grunt.registerTask('specs', 'run:specs');

  grunt.registerTask('gauge-tests', () => {
    const tasks = [];
    if (!process.env.BSTACK) {
      tasks.push('start-server');
      tasks.unshift('install-drivers');
    }
    tasks.push('specs');
    grunt.task.run(tasks);
  });
};
