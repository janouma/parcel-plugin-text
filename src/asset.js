'use strict'

// const {readFile} = require('fs')
const {Asset} = require('parcel-bundler')

/* function read (file) {
  return new Promise((resolve, reject) => {
    readFile(file, (error, content) => {
      if (!error) {
        resolve(content)
      } else {
        reject(error)
      }
    })
  })
} */

module.exports = class TextAsset extends Asset {
  constructor (name, pkg, options) {
    super(name, pkg, options)
    this.type = 'js'
  }

  generate () {
    const content = this.contents
      .replace(/\r|\n/g, '')
      .replace(/'/g, "\\'")

    // DEBUG
    console.log({
      loaded: this.name // ,
      // content
    })
    // END DEBUG

    return [{
      type: 'js',
      value: `module.exports = '${content}'`
    }]

    /* // require coffeescript, installed locally in the app
    let coffee = await localRequire('coffeescript', this.name);

    // Transpile Module using CoffeeScript and parse result as ast format through babylon
    let transpiled = coffee.compile(this.contents, {
      sourceMap: this.options.sourceMaps
    });

    let sourceMap;
    if (transpiled.sourceMap) {
      sourceMap = transpiled.sourceMap.generate();
      sourceMap.sources = [this.relativeName];
      sourceMap.sourcesContent = [this.contents];
    }

    return [
      {
        type: 'js',
        value: this.options.sourceMaps ? transpiled.js : transpiled,
        sourceMap
      }
    ]; */
  }
}
