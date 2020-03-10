const core = require('./core/index')
const { configureComponents } = require('./theme/configure')

module.exports = {
  ...core,
  configureComponents,
}
