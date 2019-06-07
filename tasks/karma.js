/* eslint-disable no-console */

const nPath = require('path');
const yargs = require('yargs');
const webpack = require('webpack');
const { Server, constants } = require('karma');

const WPConf = require('../webpack/webpack.spec.config');



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
let tests = args.file || '*';



const testFiles = nPath.resolve(`specs/${tests}.spec.js`);
const reporters = ['progress', 'coverage-istanbul'];



let names = tests === '*' ? 'all' : tests;
if (Array.isArray(tests)) {
  names = tests.join(', ');
  tests = `@(${tests.join('|')})`;
}

console.log('Running tests:', names);



webpack(WPConf(tests), (err, stats) => {
  if (err) { return console.error(err); }
  if (stats.hasErrors()) { return console.log(stats); }

  console.log('Tests built');
  console.log('Launching test runner');



  const server = new Server(
    {
      basePath: '',
      frameworks: ['mocha'],

      files: [
        { pattern: 'test/assets/style.css', watched: false },
        { pattern: testFiles, watched: false }
      ],

      plugins: [
        'karma-mocha',
        'karma-mocha-reporter',
        'karma-firefox-launcher',
        'karma-coverage-istanbul-reporter'
      ],

      browserConsoleLogOptions: {
        level: 'log',
        format: '%b %T: %m',
        terminal: true
      },

      reporters,
      colors: true,
      logLevel: constants.LOG_INFO,

      browsers: ['FirefoxHeadless'],

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
    },
    (exitCode) => {
      console.log('Karma has exited with ' + exitCode);
      process.exit(exitCode);
    });

  server.start();
});
