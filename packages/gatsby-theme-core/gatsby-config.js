const invoke = name => options =>
  options[name] ? options[name](options) : () => {}

module.exports = invoke('config')
