'use strict';

const nPath = require('path');

const rollupBuble = require('rollup-plugin-buble');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupIstanbul = require('rollup-plugin-istanbul');
const rollupCJS = require('rollup-plugin-commonjs');

const args = require('args')
  .option('tests', 'Testfiles to load (* for all))', '*')
  .option('browsers', 'which browsers to test', ['Chrome', 'Firefox', 'IE', 'IE10', 'IE9'])
  .parse(process.argv);

let names = args.tests;

if(Array.isArray(names)) {
  names = names.indexOf('*') > -1 ? '*' : `@(${args.tests.join('|')})`;
}

const testFiles = nPath.resolve(`test/${names}.spec.js`);

console.log('Test files: ', testFiles);

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
      plugins: [
        rollupNode({ jsnext: true, main: true }),
        rollupCJS({ sourceMap: false }),
        rollupBuble(),
        rollupIstanbul({ include: [`./${names}.js`] })
      ],
      format: 'iife',
      exports: 'none',
      sourceMap: false
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Array.isArray(args.browsers) ? args.browsers : [args.browsers],

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

    coverageReporter: {
      dir: './coverage',

      reporters: [
        { type: 'text' }
    //     { type: 'html', dir: 'coverage', subdir: 'reports' },
    //     { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
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
