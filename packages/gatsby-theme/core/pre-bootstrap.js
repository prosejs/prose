const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const Debug = require('debug')

const debug = Debug('gatsby-theme')

// Ensure that content directories exist at site-level
exports.createPaths = paths => api => {
  const { store } = api
  const { program } = store.getState()

  const dirs = paths.map(p => path.join(program.directory, p))

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}
