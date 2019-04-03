'use strict'

const packageName = require('../package.json').name
const cosmiconfig = require('cosmiconfig')
const log = require('loglevel')

module.exports = async function(bundler) {
  const explorer = cosmiconfig(packageName)
  let config

  try {
    const result = await explorer.search()
    config = result.config
  } catch (e) {
    log.trace(e)
  }

  const extentions = (config && config.extentions) || ['txt']

  for (const ext of extentions) {
    bundler.addAssetType(ext, require.resolve('./asset'))
  }
};
