"use strict";

const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CopyWebpack = [
  new CopyWebpackPlugin([
    { from: 'assets/*', to: './' }
  ], {})
];

const HtmlWebpack = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'deploy-template.html'
  }),
  new HtmlWebpackExternalsPlugin({
    outputPath: 'dist',
    externals: [
      {
        module: 'jquery',
        entry: 'dist/jquery.js',
        global: 'jQuery',
      },
      {
        module: 'popper.js',
        entry: 'dist/umd/popper.min.js',
        global: 'Popper'
      },
      {
        module: 'bootstrap',
        entry: 'dist/js/bootstrap.js',
        global: 'bootstrap'
      },
      {
        module: 'font-awesome',
        entry: {
          path: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
          type: 'css'
        }
      },
      {
        module: 'bootstrap',
        entry: 'dist/css/bootstrap.css'
      },
      {
        module: 'jsoneditor',
        entry: 'dist/jsoneditor.min.css'
      }
    ]
  })];

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./src/app.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.less$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: "less-loader"
            }
          ]
        })
      }
    ]
  },
  output: {
    path: debug ? __dirname : path.join(__dirname, "dist"),
    filename: debug ? "./src/client.js" : '[name].[contenthash].js'
  },
  plugins: debug ? [new ExtractTextPlugin('styles/styles.css')] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('styles.css')
  ].concat(HtmlWebpack).concat(CopyWebpack),
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  mode: debug ? 'development' : 'production'
};