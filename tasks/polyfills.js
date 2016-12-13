/* eslint-disable no-console */

const nPath = require('path');
const fs = require('fs-promise');
const glob = require('glob-promise');

const rollup = require('rollup');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupCJS = require('rollup-plugin-commonjs');

fs.remove('polyfills/out')
  .then(() => glob(nPath.resolve('polyfills/*.js')))
  .then((files) => Promise.all(files.map((file) => {
    return rollup.rollup({
      entry: file,
      sourceMap: false,
      exports: 'none',
      plugins: [
        rollupNode({ jsnext: true, main: true }),
        rollupCJS({ sourceMap: false })
      ]
    })
      .then((bundle) => {
        process.stdout.write('.');

        const dest = nPath.resolve('polyfills/out', nPath.basename(file));

        return bundle.write({
          format: 'iife',
          dest
        });
      });
  })))
  .then(() => console.log('\nPOLYFILLS successfully build'));
