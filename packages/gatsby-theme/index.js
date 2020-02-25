const core = require('./core/index')
const { configureComponents } = require('./src/components')

module.exports = {
  ...core,
  configureComponents,
}
