const { basename } = require('path');
const glob = require('globby');

const base = require('./webpack.base.config');

module.exports = (env) => {
  const { entry, include } = glob.sync('./test/*.spec.js')
    .reduce((map, file) => {
      const name = basename(file, '.spec.js');
      map.entry[name] = file;
      map.include.push(`**/${name}.js`);
      return map;
    }, { entry: {}, include: [] });

  return Object.assign({ entry }, base(include));
};
