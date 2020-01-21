import parse from '@tson/parse'

const getLanguage = className => {
  className = className ? className.trim() : ''

  if (!className.startsWith('language-')) {
    return null
  }

  const matches = className.match(/language-(?<lang>\S*)\s*?/)

  const language =
    matches && matches.groups && matches.groups.lang
      ? matches.groups.lang.trim()
      : null

  return language === 'undefined' ? null : language
}

const getMeta = metastring => {
  if (!metastring) {
    return null
  }

  try {
    return parse(metastring)
  } catch (error) {
    throw new Error(
      `Metastring '${metastring}' is not valid TSON. Ensure you have specified a language if using meta options. ${error.message}`
    )
  }
}

export const fromMdxProps = props => {
  if (!props) {
    throw new Error('No props specified.')
  }

  return {
    language: getLanguage(props.className),
    meta: getMeta(props.metastring),
    code: props.children ? props.children.trim() : null,
  }
}
