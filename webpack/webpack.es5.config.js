const { resolve, basename } = require('path');
const glob = require('globby');

module.exports = (env) => {
  const entry = glob.sync('./*.js')
    .reduce((map, file) => {
      map[basename(file, '.js')] = './' + file;
      return map;
    }, {});

  const conf = {
    entry,
    mode: 'production',
    stats: 'minimal',
    output: {
      path: resolve('es5'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/env', { targets: { browsers: ['IE 9'] } }]
              ]
            }
          }
        }
      ]
    }
  };

  return conf;
};
