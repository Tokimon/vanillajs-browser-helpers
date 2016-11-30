'use strict';

const nPath = require('path');

const rollupBuble = require('rollup-plugin-buble');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupIstanbul = require('rollup-plugin-istanbul');
const rollupCJS = require('rollup-plugin-commonjs');

const yargs = require('yargs');



const browserTypes = {
  chrome: 'Chrome',
  firefox: 'Firefox',
  edge: 'Edge',
  ie: 'IE',
  ie10: 'IE10',
  ie9: 'IE9'
};

let browsers = Object.keys(browserTypes);



const args = yargs
  .option('test', {
    alias: 't',
    describe: 'Which test to load (* for all)',
    type: 'array'
  })
  .option('browser', {
    alias: 'b',
    describe: 'Which browser to test',
    type: 'array',
    choices: browsers
  })
  .option('coverage', {
    alias: 'c',
    describe: 'Add coverage report',
    type: 'boolean'
  })
  .option('simple', {
    alias: 's',
    describe: 'Use a simple repoter',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h')
  .argv;



let names = args.test || [];
const nameLen = names.length;

if(names.indexOf('*') > -1 || !nameLen) { names = '*'; }

if(Array.isArray(names)) {
  names = nameLen > 1 ? `@(${names.join('|')})` : names[0];
}

if(args.browser && args.browser.length) {
  browsers = args.browser;
}

browsers = browsers.map((browser) => browserTypes[browser.toLowerCase()]);

const testFiles = nPath.resolve(`test/${names}.spec.js`);

const rollupPlugins = [
  rollupNode({ jsnext: true, main: true }),
  rollupCJS({ sourceMap: false }),
  rollupBuble()
];

const reporters = [args.simple ? 'progress' : 'mocha'];

if(args.coverage) {
  rollupPlugins.push(rollupIstanbul({ include: [`./${names}.js`], embedSource: true }));
  reporters.push('istanbul');
}



console.log('Browsers:', browsers.join(', '));
console.log('Test files:', testFiles);

module.exports = function(config) {
  config.set({
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-dom', 'chai', 'chai-sinon'],

    // list of files / patterns to load in the browser
    files: [
      'test/assets/style.css',
      'test/assets/init-test.js',
      'test/assets/polyfills/*.js',
      testFiles
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { [testFiles]: ['rollup'] },

    rollupPreprocessor: {
      plugins: rollupPlugins,
      format: 'iife',
      exports: 'none',
      sourceMap: false
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers,

    customLaunchers: {
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      },

      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      }
    },

    istanbulReporter: {
      dir: './coverage',

      reporters: [
        { type: 'text' },
        { type: 'text-summary' },
        { type: 'lcovonly', dir: 'coverage', subdir: 'lcov' }
      ]
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: 10
  });
};
