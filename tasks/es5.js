/* eslint-disable no-console */

const nPath = require('path');
const fs = require('fs-promise');
const glob = require('glob-promise');
const babel = require('babel-core');

const babelConfig = {
  plugins: [
    ['transform-es2015-modules-commonjs', { strict: false, loose: false }],
    'transform-strict-mode',
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
};

fs.remove(nPath.resolve('es5'))
  .then(() => Promise.all([
    glob('./!(karma)*.js'),
    glob('./test/*.js')
  ]))
  .then((files) => files[0].concat(files[1]))
  .then((files) =>
    Promise.all(
      files.map((file) =>
        fs.readFile(file)
          .then((code) =>
            fs.outputFile(
              nPath.resolve(`es5/${nPath.relative(process.cwd(), file)}`),
              babel.transform(code, babelConfig).code
                .replace(/'vanillajs-helpers\//g, '\'vanillajs-helpers/es5/')
            )
          )
          .then(() => process.stdout.write('.'))
      )
    )
  )
  .then(() => { console.log('\nFiles sucessfully converted to ES5'); })
  .catch((err) => {
    console.error(err.messsage);
    console.error(err.stack);
  });
