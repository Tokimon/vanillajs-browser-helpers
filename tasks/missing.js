/* eslint-disable no-console */

const path = require('path');
const glob = require('glob-promise');

const files = glob('./!(karma)*.js')
  .then((files) => files.map((f) => path.basename(f, '.js')));

const tests = glob('./test/*.spec.js')
  .then((files) => files.map((f) => path.basename(f, '.spec.js')));

Promise.all([files, tests])
  .then((res) => res[0].filter((f) => res[1].indexOf(f) === -1))
  .then((files) => files.length ? files.forEach((f) => console.log(f)) : console.log('No files'))
  .catch((err) => console.error(err));
