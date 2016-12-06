/* eslint-disable no-console */

const nPath = require('path');
const fs = require('fs-promise');
const glob = require('glob-promise');
const babel = require('babel-core');

const babelConfig = {
  plugins: [['transform-es2015-modules-commonjs', { strict: false, loose: false }]]
};

fs.remove(nPath.resolve('cjs'))
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
              nPath.resolve(`cjs/${nPath.relative(process.cwd(), file)}`),
              babel.transform(code, babelConfig).code
            )
          )
          .then(() => process.stdout.write('.'))
      )
    )
  )
  .then(() => { console.log('\nFiles sucessfully converted to CJS'); })
  .catch((err) => {
    console.error(err.messsage);
    console.error(err.stack);
  });
