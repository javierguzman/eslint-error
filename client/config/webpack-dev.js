const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const { commonBundler, configPath, outputPath } = require('./webpack-common');

// eslint-disable-next-line
const devBundler = (env, argv) => {
  const mode = 'development';
  const devtool = 'eval-source-map'; // not needed, just to make bundle easier to understand
  const target = 'web';
  const output = {
    filename: 'blabla.[name].bundle.js',
    path: outputPath,
    publicPath: '/'
  };
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(configPath, 'template-dev.html'),
      favicon: '../../common/assets/images/facebook.png'
    }),
    new ESLintPlugin({
      overrideConfigFile: path.resolve(configPath, '.eslintrc.development.json')
    }),
    new BundleAnalyzerPlugin()
  ];
  const webpackModule = {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // 2. Inject Javascript CSS into the DOM
          'css-loader' // 1. Transform CSS to Javascript
        ]
      }
    ]
  };

  const devServer = {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    },
    static: {
      directory: outputPath,
      publicPath: '/'
    },
    hot: true,
    open: true,
    host: 'local-ip'
  };

  return {
    devServer,
    target,
    mode,
    devtool,
    output,
    plugins,
    module: webpackModule
  };
};

module.exports = (env, argv) => merge(commonBundler(env, argv), devBundler(env, argv));
