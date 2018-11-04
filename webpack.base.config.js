const { resolve } = require('path');

module.exports = (include) => {
  return {
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
                ['babel-plugin-istanbul', { include }]
              ]
            }
          }
        }
      ]
    }
  };
};
