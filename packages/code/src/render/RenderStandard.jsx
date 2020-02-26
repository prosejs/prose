/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import Title from './Title.jsx'
import CodeLine from './CodeLine.jsx'

const getLabelProps = (label, linesEnabled) => {
  if (!label) {
    return null
  }

  return {
    '::before': {
      content: `"${label.title}"`,
      fontSize: 1,
      fontFamily: 'body',
      color: label.color,
      backgroundColor: label.backgroundColor,
      padding: '0 0.5rem 0.2rem 0.5rem',
      borderRadius: '0 0 0.5rem 0.5rem',
      margin: 0,
      position: 'absolute',
      left: linesEnabled ? '2rem' : '1rem',
      top: 0,
      textTransform: 'uppercase',
      variant: 'components.code.languageLabel',
    },
  }
}

const getLabel = languageLabels => language => {
  if (!language) {
    return null
  }

  if (language === 'none') {
    return null
  }

  const label = languageLabels[language]
  if (!label) {
    return {
      ...languageLabels['default'],
      title: language,
    }
  }

  return label
}

const RenderStandard = ({
  parsed,
  language,
  getPreProps,
  getLineProps,
  getTokenProps,
  languageLabels,
}) => {
  const { options, lines } = parsed

  const label = getLabel(languageLabels)(language)

  return (
    <React.Fragment>
      {options.title && (
        <Title borderColor={label.backgroundColor}>{options.title}</Title>
      )}
      <div style={{ position: 'relative' }}>
        <Styled.pre
          {...getPreProps()}
          sx={{
            display: 'grid',
            padding: `${label ? '1.5rem' : '1rem'} 0.5rem 1rem 0.5rem`,
            gridTemplateColumns: options.lines.enabled ? 'auto 1fr' : '1fr',
            margin: 0,
            overflowX: 'scroll',
            ...getLabelProps(label, options.lines.enabled),
            variant: 'components.code.pre', // TODO: move all variant uses to util function and make 'components.code' configurable in options
          }}
        >
          {lines.map((line, i) => (
            <CodeLine
              key={line.data.id}
              lineNumber={options.lines.start + i}
              lineNumbersEnabled={options.lines.enabled}
              meta={line.meta}
              tokens={line.data.tokens}
              lineProps={getLineProps({ line: line.data })}
              getTokenProps={getTokenProps}
            />
          ))}
        </Styled.pre>
      </div>
    </React.Fragment>
  )
}

export default RenderStandard
