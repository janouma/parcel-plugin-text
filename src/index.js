'use strict'

const packageName = require('../package.json').name
const cosmiconfig = require('cosmiconfig')
const log = require('loglevel')

log.setLevel(process.env.LOG_LEVEL || 'info')

module.exports = async function init (bundler) {
  const explorer = cosmiconfig(packageName)
  let config

  try {
    const result = await explorer.search()
    config = result.config
  } catch (e) {
    log.trace(e)
  }

  const extensions = (config && (config.extensions || config.extentions)) || ['txt']

  for (const ext of extensions) {
    bundler.addAssetType(ext, require.resolve('./asset'))
  }
}
