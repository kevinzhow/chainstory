'use strict'

let webpack = require('webpack'),
  _ = require('lodash'),
  path = require('path'),
  HTMLWebpackPlugin = require('html-webpack-plugin')
let config = module.exports = require('./main.config.js')

config.output = _.merge(config.output, {
  path: path.join(config.context + '/../', 'public', 'static'),
  publicPath: 'https://data.zi.com/',
  filename: '[name]-bundle-[chunkhash].js',
  chunkFilename: '[id]-chunk-[chunkhash].js'
})

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new HTMLWebpackPlugin({
    template: '../index.ejs',
    filename: path.join(__dirname) + '/../production/index.html',
    inject: 'body'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
]
