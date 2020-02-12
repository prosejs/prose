import React from 'react'
import { Styled } from 'theme-ui'
import { MDXRenderer as PluginMDXRenderer } from 'gatsby-plugin-mdx'

// TODO: not currently used, review if needed
const MDXRenderer = ({ children }) => (
  <Styled.root>
    <PluginMDXRenderer>{children}</PluginMDXRenderer>
  </Styled.root>
)

export default MDXRenderer
