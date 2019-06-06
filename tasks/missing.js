/* eslint-disable no-console */

const path = require('path');
const glob = require('globby');

const getBasename = (ext) => (files) => files.map((f) => path.basename(f, ext));

const files = glob('./!(karma|webpack)*.js').then(getBasename('.js'));
const tests = glob('./test/*.spec.js').then(getBasename('.spec.js'));

Promise.all([files, tests])
  .then((res) => res[0].filter((f) => res[1].indexOf(f) === -1))
  .then((files) => files.length ? files.forEach((f) => console.log(f)) : console.log('No files is missing a test file'))
  .catch((err) => console.error(err));
