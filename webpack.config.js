const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const yargs = require('yargs');
const webpack = require('webpack');

const argv = yargs.argv;
const isDev = argv.mode === 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    core: ['./assets/js/src/index.js', '/assets/css/src/style.scss']
  },
  output: {
    filename: './assets/js/build/bundle.[name].min.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/css/build/[name].min.css',
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./assets/js/build/*', './assets/css/build/*']
    }),

    new VueLoaderPlugin(),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin(),
  //     new CssMinimizerPlugin()
  //   ]
  // }
};