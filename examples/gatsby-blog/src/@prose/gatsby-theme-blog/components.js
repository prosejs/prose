import React from 'react'
import { configureComponents } from '@prose/gatsby-theme-blog'
import { Code, fromMdxProps, renderStandard } from '@prose/code'
import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-javascript'

export const getComponents = configureComponents(componentOptions => {
  const render = renderStandard({
    languageLabels: {
      csharp: {
        title: 'c#',
        color: '#fff',
        backgroundColor: '#9f76db',
      },
    },
  })
  return {
    code: props => (
      <Code
        {...fromMdxProps(props)}
        options={componentOptions.code}
        prism={Prism}
        render={render}
      />
    ),
  }
})
