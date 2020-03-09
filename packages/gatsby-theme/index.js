const core = require('./core/index')
const { configureComponents } = require('./configure')

module.exports = {
  ...core,
  configureComponents,
}
