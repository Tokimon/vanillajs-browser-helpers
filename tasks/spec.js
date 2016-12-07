const nPath = require('path');

const fs = require('fs-promise');
const glob = require('glob-promise');

const rollup = require('rollup');
const rollupBabel = require('rollup-plugin-babel');
const rollupNode = require('rollup-plugin-node-resolve');
const rollupCJS = require('rollup-plugin-commonjs');
const rollupIstanbul = require('rollup-plugin-istanbul');

const args = require('yargs')
  .option('instrument', {
    type: 'boolean',
    alias: 'i',
    describe: 'Instrument the code using Istanbul'
  })
  .option('root', {
    alias: 'r',
    describe: 'Root path to search for the test directory',
    type: 'string',
    choices: ['.', 'cjs'],
    default: '.'
  })
  .help()
  .alias('help', 'h')
  .argv;

const plugins = [
  rollupNode({ jsnext: true, main: true }),
  rollupCJS({ sourceMap: false })
];

plugins.push(rollupBabel({
  plugins: [
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
  ]
}));

if(args.instrument && args.root !== 'cjs') {
  plugins.push(rollupIstanbul({ include: [`./*.js`], embedSource: true }));
}

fs.remove(nPath.join('specs', args.root))
  .then(() => glob(nPath.resolve(args.root, 'test/*.spec.js')))
  .then((files) => Promise.all(files.map((file) => {
    return rollup.rollup({
      entry: file,
      sourceMap: false,
      plugins
    })
      .then((bundle) => {
        process.stdout.write('.');
        const dest = nPath.join('specs', nPath.relative(process.cwd(), file.replace(/[\\/]test([\\/])/, '$1')));

        return bundle.write({
          format: 'iife',
          moduleName: nPath.basename(file, '.spec.js'),
          exports: 'named',
          dest
        });
      });
  })))
  .then(() => process.stdout.write('\nSPEC files successfully transpiled\n'))
  .catch((err) => {
    console.log('\n\n-----------');
    console.error(err.message);
    console.error(err.stack);
    console.log('-----------\n');
  });
