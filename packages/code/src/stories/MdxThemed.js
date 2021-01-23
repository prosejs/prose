/** @jsxImportSource theme-ui */
import React from 'react'
import { Code, fromMdxProps } from '../index'
import Themed from './Themed'
import MDX from '@mdx-js/runtime'

const MdxThemed = ({ theme, meta, code }) => {
  const child = `
\`\`\`${meta}
${code}
\`\`\``

  return (
    <Themed theme={theme}>
      <MDX
        components={{
          pre: ({ children }) => <React.Fragment>{children}</React.Fragment>,
          code: (props) => <Code {...fromMdxProps(props)} />,
        }}
      >
        {child}
      </MDX>
    </Themed>
  )
}

export default MdxThemed
