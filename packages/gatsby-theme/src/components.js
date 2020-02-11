/** @jsx jsx */
import React from 'react' // required
import { jsx } from 'theme-ui'
import Code, { fromMdxProps } from '@prose/code'
import deepmerge from '@utilz/deepmerge'

const getDefaultMappings = componentOptions => {
  const { code } = componentOptions
  return {
    pre: ({ children }) => <>{children}</>,
    code: props => <Code {...fromMdxProps(props)} options={code} />,
  }
}

export const getComponents = mappings => componentOptions => {
  const defaultMappings = getDefaultMappings(componentOptions)
  return deepmerge(
    defaultMappings,
    mappings ? mappings(componentOptions) : null
  )
}

export default getComponents()
