const { configureComponents } = require('../configure')

const getComponents = configureComponents()

console.log('get', getComponents)
module.exports = {
  getComponents,
}
