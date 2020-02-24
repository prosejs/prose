const preBootstrap = require('./pre-bootstrap')
const schema = require('./schema')
const nodes = require('./nodes')
const pages = require('./pages')
const config = require('./config')

module.exports = {
  ...preBootstrap,
  ...schema,
  ...nodes,
  ...pages,
  ...config,
}
