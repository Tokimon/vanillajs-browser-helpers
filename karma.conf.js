'use strict';

/* eslint-disable no-console */

const nPath = require('path');
const yargs = require('yargs');



const saucelabsBrowsers = {
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest'
  },
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'edge',
    platform: 'Windows 10',
    version: 'latest'
  },
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
    extendedDebugging: true,
    version: 'latest'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'macOS 10.13',
    version: 'latest'
  },
  sl_ie11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11.0'
  },
  sl_ie10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10.0'
  },
  sl_ie9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9.0'
  }
};



const args = yargs
  .option('root', {
    alias: 'r',
    describe: 'Root path to search for the test directory',
    type: 'string',
    choices: ['.', 'es5', 'cjs'],
    default: '.'
  })
  .option('test', {
    alias: 't',
    describe: 'Which test to load (* for all)',
    type: 'array'
  })
  .option('local', {
    alias: 's',
    describe: 'Test local browsers',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h')
  .argv;



// --- Tests to run ---
let tests = args.test || [];
const nameLen = tests.length;

if(tests.indexOf('*') > -1 || !nameLen) { tests = '*'; }

if(Array.isArray(tests)) {
  tests = nameLen > 1 ? `@(${tests.join('|')})` : tests[0];
}

const testFiles = nPath.resolve(args.root, `test/${tests}.spec.js`);
const reporters = ['progress', 'coverage-istanbul', 'saucelabs'];


function getSauceLabsCredentials() {
  try {
    return require('./.saucelabs.json');
  } catch(e) {
    const { SAUCE_USERNAME, SAUCE_ACCESS_KEY } = process.env;
    return { SAUCE_USERNAME, SAUCE_ACCESS_KEY };
  }
}


// --- Log choices before stat ---
console.log('Test files:', testFiles);



// --- The actual config ---
module.exports = function(config) {
  const { SAUCE_USERNAME, SAUCE_ACCESS_KEY } = getSauceLabsCredentials();
  const { TRAVIS_BUILD_NUMBER, TRAVIS_JOB_NUMBER } = process.env;

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-dom', 'chai', 'chai-sinon'],

    files: [
      { pattern: 'test/assets/style.css', watched: false },
      { pattern: testFiles, watched: false }
    ],

    preprocessors: { [testFiles]: ['webpack'] },

    plugins: [
      'karma-chai',
      'karma-chai-dom',
      'karma-chai-sinon',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sauce-launcher',
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-coverage-istanbul-reporter'
    ],

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    webpack: {
      mode: 'development',
      stats: 'minimal',
      output: {
        path: nPath.resolve('specs'),
        filename: '[name].spec.js'
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js/,
            loader: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    targets: { browsers: ['ie 9'] },
                    useBuiltIns: 'usage'
                  }]
                ],
                plugins: [
                  // TODO: Correct to only include selected test files
                  ['babel-plugin-istanbul', { 'exclude': ['**/*.spec.js', 'test/assets/**'] }]
                ]
              }
            }
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters,
    colors: true,
    logLevel: config.LOG_INFO,

    // browsers: Object.keys(customLaunchers),
    browsers: args.local ? ['Chrome'] : Object.keys(saucelabsBrowsers),

    sauceLabs: {
      testName: 'VanillaJS Browser Helpers Tests',
      build: TRAVIS_BUILD_NUMBER,
      username: SAUCE_USERNAME,
      accessKey: SAUCE_ACCESS_KEY,
      tunnelIdentifier: TRAVIS_JOB_NUMBER,
      connectOptions: {
        username: SAUCE_USERNAME,
        accessKey: SAUCE_ACCESS_KEY,
        tunnelIdentifier: TRAVIS_JOB_NUMBER
      }
    },

    customLaunchers: saucelabsBrowsers,

    coverageIstanbulReporter: {
      reports: ['text', 'text-summary', 'lcovonly'],
      dir: nPath.resolve('coverage'),
      combineBrowserReports: true,
      'report-config': {
        lcovonly: {
          dir: 'coverage',
          subdir: 'lcov'
        }
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: 5
  });
};
