const nPath = require('path');

const glob = require('glob-promise');

const rollup = require('rollup');
const rollupBuble = require('rollup-plugin-buble');
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
        rollupBuble()
      ]
    })
      .then((bundle) => {
        process.stdout.write('.');
        const dest = nPath.join('specs', fileParse.base.replace('.spec', ''));

        return bundle.write({
          format: 'iife',
          dest
        });
      });
  })))
  .then(() => process.stdout.write('\ndone\n'))
  .catch((err) => {
    console.log('\n\n-----------');
    console.error(err.message);
    console.error(err.stack);
    console.log('-----------\n');
  });
