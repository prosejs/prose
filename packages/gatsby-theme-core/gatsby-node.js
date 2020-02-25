const invoke = name => (api, options) =>
  options[name] ? options[name](api) : () => {}

exports.onPreBootstrap = invoke('onPreBootstrap')
exports.createSchemaCustomization = invoke('createSchemaCustomization')
exports.onCreateNode = invoke('onCreateNode')
exports.createPages = invoke('createPages')
