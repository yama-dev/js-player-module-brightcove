const webpack = require('webpack');

const config = {
  mode: 'production',
  entry: './src/js-player-module-brightcove.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'js-player-module-brightcove.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  }
};

module.exports = config;
