const { deepmerge } = require('@utilz/deepmerge')

const getOptions = themeOptions => {
  const defaultOptions = {
    mdx: {
      enabled: true,
    },
    definitions: [],
  }

  const options = deepmerge(defaultOptions, themeOptions)

  // TODO: validate options against schema
  return options
}

module.exports = {
  getOptions,
}
