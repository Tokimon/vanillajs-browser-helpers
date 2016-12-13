'use strict';

/* eslint-disable no-console */

const nPath = require('path');

const rollupBabel = require('rollup-plugin-babel');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupIstanbul = require('rollup-plugin-istanbul');
const rollupCJS = require('rollup-plugin-commonjs');
const rollupIncludePaths = require('rollup-plugin-includepaths');

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
  .option('root', {
    alias: 'r',
    describe: 'Root path to search for the test directory',
    type: 'string',
    choices: ['.', 'cjs'],
    default: '.'
  })
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



let tests = args.test || [];
const nameLen = tests.length;

if(tests.indexOf('*') > -1 || !nameLen) { tests = '*'; }

if(Array.isArray(tests)) {
  tests = nameLen > 1 ? `@(${tests.join('|')})` : tests[0];
}

if(args.browser && args.browser.length) {
  browsers = args.browser;
}

browsers = browsers.map((browser) => browserTypes[browser.toLowerCase()]);

const testFiles = nPath.resolve(args.root, `test/${tests}.spec.js`);

const babelConfig = {
  plugins: []
};

babelConfig.plugins = babelConfig.plugins.concat([
  'transform-es2015-arrow-functions',
  'transform-es2015-block-scoped-functions',
  'transform-es2015-block-scoping',
  'transform-es2015-computed-properties',
  'transform-es2015-destructuring',
  'transform-es2015-duplicate-keys',
  'transform-es2015-parameters',
  'transform-es2015-spread',
  'transform-es2015-template-literals',
  'transform-proto-to-assign',
  'transform-es2015-shorthand-properties'
]);

const reporters = [args.simple ? 'progress' : 'mocha'];

const rollupPlugins = [
  rollupIncludePaths({ paths: [''], include: {} }),
  rollupNode({ jsnext: true, main: true }),
  rollupCJS({ sourceMap: false }),
  rollupBabel(babelConfig)
];

if(args.coverage) {
  if(args.root !== 'cjs') {
    rollupPlugins.push(rollupIstanbul({ include: [`./${tests}.js`], embedSource: true }));
    reporters.push('istanbul');
    console.log('ADDING COVERAGE REPORT');
  } else {
    console.log('COVERAGE REPORTING IS NOT AVAILABLE FOR CJS TESTS');
  }
}

console.log('Browsers:', browsers.join(', '));
console.log('Test files:', testFiles);

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-dom', 'chai', 'chai-sinon'],

    files: [
      'test/assets/style.css',
      'test/assets/init-test.js',
      // 'test/assets/polyfills/*.js',
      testFiles
    ],

    preprocessors: { [testFiles]: ['rollup'] },

    rollupPreprocessor: {
      plugins: rollupPlugins,
      format: 'iife',
      exports: 'named',
      moduleName: 'test',
      sourceMap: false
    },

    reporters,
    colors: true,
    logLevel: config.LOG_INFO,

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
