/* eslint-disable no-console */

const nPath = require('path');
const cp = require('child_process');
const fs = require('fs-promise');
const glob = require('glob-promise');

fs.remove(nPath.resolve('jsdoc'))
  .then(() => glob('./!(karma)*.js'))
  .then((files) => {
    files = files.map((file) => nPath.relative(process.cwd(), file));
    return new Promise((resolve, reject) =>
      cp.exec(`jsdoc ${files.join(' ')} -d jsdoc`, (err) => err ? reject(err) : resolve())
    );
  })
  .then(() => { console.log('\nJSDoc done'); })
  .catch((err) => {
    console.error(err.messsage);
    console.error(err.stack);
  });