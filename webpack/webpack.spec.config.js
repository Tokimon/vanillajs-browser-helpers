const { basename, resolve } = require('path');
const glob = require('globby');

module.exports = (files) => {
  const { entry, include } = glob.sync(`./test/${files}.spec.js`)
    .reduce((map, file) => {
      const name = basename(file, '.spec.js');
      map.entry[name] = file;
      map.include.push(`**/${name}.js`);
      return map;
    }, { entry: {}, include: [] });

  return {
    entry,
    mode: 'development',
    stats: 'errors-only',
    output: {
      path: resolve('specs'),
      filename: '[name].spec.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        'last 2 Chrome versions',
                        'last 2 Firefox versions'
                      ]
                    }
                  }
                ]
              ],
              plugins: [
                ['babel-plugin-istanbul', { include }],
                'babel-plugin-rewire-exports'
              ]
            }
          }
        }
      ]
    }
  };
};
