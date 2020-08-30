'use strict'

const {Asset} = require('parcel-bundler')
const log = require('loglevel')

module.exports = class TextAsset extends Asset {
  constructor (name, pkg, options) {
    super(name, pkg, options)
    this.type = 'js'
  }

  generate () {
    const content = JSON.stringify(this.contents);
    log.debug({ loaded: this.name })
    log.trace({ content })

    return [{
      type: 'js',
      value: `module.exports = ${content}`,
    }]
  }
}
