const invoke = name => options => (options ? options[name](options) : () => {})

module.exports = invoke('config')
