'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // loaders: utils.cssLoaders({
  //   sourceMap: sourceMapEnabled,
  //   extract: isProduction
  // }),
  loaders: {
    css: 'vue-style-loader!css-loader',
    less: 'vue-style-loader!css-loader!less-loader'
  },
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postLoaders: {
    html: 'babel-loader'
  }
}
