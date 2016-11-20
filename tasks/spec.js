const nPath = require('path');

const glob = require('glob-promise');

const rollup = require('rollup');
const rollupBabel = require('rollup-plugin-babel');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupCJS = require('rollup-plugin-commonjs');

glob(nPath.resolve('test/*.spec.js'))
  .then((files) => Promise.all(files.map((file) => {
    const fileParse = nPath.parse(file);
    return rollup.rollup({
      entry: file,
      sourceMap: false,
      exports: 'none',
      plugins: [
        rollupNode({ jsnext: true, main: true }),
        rollupCJS({ sourceMap: false }),
        rollupBabel({
          presets: [['es2015', { modules: false }]],
          plugins: ['external-helpers']
        })
      ]
    })
      .then((bundle) => {
        const dest = nPath.join('specs', fileParse.base.replace('.spec', ''));

        return bundle.write({
          format: 'iife',
          dest
        });
      });
  })))
  .then(() => console.log('done'))
  .catch((err) => console.error(err.message, err.stack));
