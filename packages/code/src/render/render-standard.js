import React from 'react'
import RenderStandard from './RenderStandard.jsx'
import { deepmerge } from '@utilz/deepmerge'
import defaultLanguageLabels from './language-labels'

export const renderStandard = options => props => {
  const { languageLabels } = options || {}
  const resolvedLanguageLabels = deepmerge(
    defaultLanguageLabels,
    languageLabels
  )

  return <RenderStandard {...props} languageLabels={resolvedLanguageLabels} />
}
