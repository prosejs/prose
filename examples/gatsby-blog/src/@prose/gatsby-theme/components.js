import React from 'react'
import { getComponents } from '@prose/gatsby-theme/src/components'
import Code, { fromMdxProps } from '@prose/code'
import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-javascript'

export default getComponents(componentOptions => ({
  code: props => (
    <Code {...fromMdxProps(props)} options={componentOptions} prism={Prism} />
  ),
}))
