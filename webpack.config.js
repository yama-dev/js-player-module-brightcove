const pkg = require('./package.json');

const comment = `/*! @${pkg.author}/${pkg.name} version:${pkg.version} repository:${pkg.repository.url} copyright:${pkg.author} licensed:${pkg.license} */`;

const env = process.env.NODE_ENV;

if(!env) process.exit(1);

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const webpackPlugEnv = new webpack.EnvironmentPlugin({
  VERSION: pkg.version,
  DEBUG: false
});

const config = {
  mode: env,
  target: ['web', 'es5'],
  entry: {
    'js-player-module-brightcove': './src/js-player-module-brightcove.ts',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: {
      name: 'PLAYER_MODULE_BRIGHTCOVE',
      type: 'umd',
      export: 'PLAYER_MODULE_BRIGHTCOVE',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ]
  },
  plugins: [
    webpackPlugEnv
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            preamble: comment,
            comments: false,
          },
          compress: {
            drop_console: false
          }
        },
      }),
    ],
  }
};

module.exports = config;
