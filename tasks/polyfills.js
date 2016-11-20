const nPath = require('path');
const glob = require('glob-promise');

const rollup = require('rollup');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupCJS = require('rollup-plugin-commonjs');

glob(nPath.resolve('polyfills/*.js'))
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
        const dest = nPath.resolve('test/assets/polyfills', nPath.basename(file));

        return bundle.write({
          format: 'iife',
          dest
        });
      });
  })));
