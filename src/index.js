'use strict'

module.exports = function init (bundler) {
  bundler.addAssetType('vueml', require.resolve('./asset'))
}
