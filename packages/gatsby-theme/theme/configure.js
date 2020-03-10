/** @jsx jsx */
const React = require('react')
const { jsx } = require('theme-ui')
const { Code, fromMdxProps } = require('@prose/code')
const { deepmerge } = require('@utilz/deepmerge')

const getDefaultMappings = componentOptions => {
  const { code } = componentOptions
  return {
    pre: ({ children }) => jsx(React.Fragment, null, children),
    code: props => jsx(Code, { ...fromMdxProps(props), options: { code } }),
  }
}

const configureComponents = mappings => componentOptions => {
  const defaultMappings = getDefaultMappings(componentOptions)
  return deepmerge(
    defaultMappings,
    mappings ? mappings(componentOptions) : null
  )
}

module.exports = {
  configureComponents,
}
