/** @jsx jsx */
import React from 'react' // required
import { jsx } from 'theme-ui'
import Code, { fromMdxProps } from '@prose/code'

const getComponents = componentOptions => {
  const { code } = componentOptions
  return {
    pre: ({ children }) => <>{children}</>,
    code: props => <Code {...fromMdxProps(props)} options={code} />,
  }
}

export default getComponents
