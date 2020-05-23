const preBootstrap = require('./pre-bootstrap')
const schema = require('./schema')
const nodes = require('./nodes')
const pages = require('./pages')
const config = require('./config')
const coreConfig = require('./core-config')
const toSourceUri = require('./to-source-uri')

module.exports = {
  ...preBootstrap,
  ...schema,
  ...nodes,
  ...pages,
  ...config,
  ...coreConfig,
  ...toSourceUri,
}
