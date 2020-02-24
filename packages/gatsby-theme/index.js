const core = require('./core')
const { configureComponents } = require('./src/components')

console.log(core)
module.exports = {
  ...core,
  configureComponents,
}
