import React from 'react'
import { configureComponents } from '@prose/gatsby-theme/src/components'
import Code, { fromMdxProps } from '@prose/code'
import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-javascript'
import renderStandard from '@prose/code/src/render/render-standard'

console.log(configureComponents)
export const getComponents = configureComponents(componentOptions => {
  console.log(componentOptions)
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
        options={componentOptions}
        prism={Prism}
        render={render}
      />
    ),
  }
})
