const { merge } = require('webpack-merge');
const base = require('./webpack.base')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
let config = process.NODE_ENV === 'development' ? dev : prod
module.exports = merge(base, config)