'use strict';

/* eslint-disable no-console */

const nPath = require('path');
const yargs = require('yargs');

const webpackConf = require('./webpack.base.config');



const args = yargs
  .option('file', {
    alias: 'f',
    describe: 'Which file to test (* for all)',
    type: 'array'
  })
  .help()
  .alias('help', 'h')
  .argv;



// --- Tests to run ---
let tests = args.file || [];

if (Array.isArray(tests)) {
  tests = tests.length > 1 ? `@(${tests.join('|')})` : tests[0];
}

const testFiles = nPath.resolve(`test/${tests}.spec.js`);
const reporters = ['progress', 'coverage-istanbul'];

const include = [`**/${tests}.js`];



// --- Log choices before stat ---
console.log('Running tests:', tests);



// --- The actual config ---
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],

    files: [
      { pattern: 'test/assets/style.css', watched: false },
      { pattern: testFiles, watched: false }
    ],

    preprocessors: { [testFiles]: ['webpack'] },

    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-webpack',
      'karma-coverage-istanbul-reporter'
    ],

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    webpack: webpackConf(include),

    webpackMiddleware: {
      noInfo: true
    },

    reporters,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['ChromeHeadless', 'FirefoxHeadless'],

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
