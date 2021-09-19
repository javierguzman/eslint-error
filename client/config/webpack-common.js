const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const imageminGIF = require('imagemin-gifsicle');
const imageminJPEG = require('imagemin-mozjpeg');
const imageminPNG = require('imagemin-pngquant');
const imageminSVG = require('imagemin-svgo');
const webpack = require('webpack');

// __dirname is config folder!
const configPath = path.resolve(__dirname);
const rootPath = path.resolve(__dirname, '..');
const outputPath = path.resolve(rootPath, 'dist');
const srcPath = path.resolve(rootPath, 'src');

// eslint-disable-next-line
const commonBundler = (env, argv) => {
  const context = srcPath;

  const entry = {
    main: './index.js'
  };

  const plugins = [
    new DuplicatePackageCheckerPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(rootPath, 'assets', 'locales'),
    //       to: path.resolve(outputPath, 'locales')
    //     },
    //     {
    //       from: path.resolve(configPath, 'manifestTemplate.json'),
    //       to: path.resolve(outputPath, 'manifest.json')
    //     },
    //     {
    //       from: path.resolve(configPath, 'robots.txt'),
    //       to: path.resolve(outputPath, 'robots.txt')
    //     }
    //   ]
    // }),
    new WebpackManifestPlugin({
      fileName: 'assets-manifest.json'
    }),
    // new webpack.DefinePlugin(commonEnvironmentVariables),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ];

  const webpackModule = {
    rules: [
      {
        test: /\.(t)sx?$/,
        use: {
          loader: 'ts-loader'
        },
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              root: configPath,
              rootMode: 'root'
            }
          }
        ]
      },
      {
        test: /\.(md)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'markdown'
          }
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images'
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                imageminGIF({
                  interlaced: false
                }),
                imageminJPEG({
                  progressive: true,
                  arithmetic: false
                }),
                imageminPNG({
                  floyd: 0.5,
                  speed: 2
                }),
                imageminSVG({
                  plugins: [{ removeTitle: true }, { convertPathData: false }]
                })
              ]
            }
          }
        ]
      }
    ]
  };

  /**
   * "modules" presumably looks in the current directory, then in the parent, etc.
   * This is to import stuff like "component/blabla" instead of "./component/blabla"
   * */
  const resolve = {
    modules: [srcPath, 'node_modules'],
    alias: {
      '@Header': path.resolve(srcPath, 'Features', 'Header'),
      '@Common': path.resolve(rootPath, '..', 'common'),
      '@Images': path.resolve(rootPath, '..', 'common', 'assets', 'images')
    },
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    fallback: { path: false }
  };

  return {
    context,
    entry,
    plugins,
    resolve,
    module: webpackModule
  };
};

exports.commonBundler = commonBundler;

exports.configPath = configPath;
exports.rootPath = rootPath;
exports.outputPath = outputPath;
exports.srcPath = srcPath;
