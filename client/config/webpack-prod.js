const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const { commonBundler, configPath, outputPath } = require('./webpack-common');

// eslint-disable-next-line
const prodBundler = (env, argv) => {
  const mode = 'production';
  const devtool = 'source-map';
  const output = {
    filename: 'blabla.[name].[contenthash].bundle.js',
    path: outputPath,
    publicPath: '/'
  };
  const htmlTemplate = 'template-dev.html';
  const optimization = {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
      minSize: 0,
      cacheGroups: {
        externals: {
          test: /[\\/]node_modules[\\/]/,
          name: 'externals'
        }
      }
    },
    moduleIds: 'deterministic'
  };

  const plugins = [
    new ESLintPlugin({
      overrideConfigFile: path.resolve(configPath, '.eslintrc.json')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundleSizeReport'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(configPath, htmlTemplate),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: true,
        useShortDoctype: true
      },
      favicon: '../../common/assets/images/facebook.png'
    }),
    new CleanWebpackPlugin()
  ];

  const webpackModule = {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 2. Extract CSS into files
          'css-loader' // 1. Transform CSS to Javascript
        ]
      }
    ]
  };
  return {
    mode,
    devtool,
    output,
    optimization,
    plugins,
    module: webpackModule
  };
};

module.exports = (env, argv) => merge(commonBundler(env, argv), prodBundler(env, argv));
