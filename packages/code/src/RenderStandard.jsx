/** @jsx jsx */
import React from 'react'
import { jsx, Styled, useThemeUI } from 'theme-ui'

const getLineStyle = ({ theme, meta }) => {
  const { em, dem } = meta
  if (dem) {
    return null
  }

  if (em) {
    return {
      backgroundColor: theme.colors.muted,
    }
  }

  return null
}

const getTokenStyle = ({ theme, meta }) => {
  const { dem } = meta

  if (dem) {
    return {
      color: theme.colors.muted ? `${theme.colors.muted} !important` : null,
    }
  }

  return null
}

const getSymbolType = value => {
  switch (value) {
    case '+':
      return '+'
    case '-':
      return '-'
    default:
      return null
  }
}

const getSymbol = ({ meta }) => {
  const { em, dem } = meta
  return dem ? getSymbolType(dem) : getSymbolType(em)
}

const Title = ({ children, borderColor }) => (
  <Styled.pre
    as="div"
    sx={{ backgroundColor: 'pre.backgroundColor' }}
    sx={{ padding: '0.8rem', borderBottom: `1px solid ${borderColor}` }}
  >
    <p
      sx={{
        fontSize: 1,
        color: '#866c5b',
        margin: 0,
        fontFamily: 'body',
      }}
    >
      {children}
    </p>
  </Styled.pre>
)

export const languageLabels = {
  javascript: {
    title: 'js',
    backgroundColor: '#f7de1e',
  },
  jsx: {
    title: 'jsx',
    backgroundColor: '#61dafb',
  },
  graphql: {
    title: 'GraphQL',
    backgroundColor: '#e10098',
    color: 'white',
  },
  html: {
    title: 'html',
    backgroundColor: '#005a9c',
    color: 'white',
  },
  mdx: {
    title: 'mdx',
    backgroundColor: '#f9ac00',
    color: 'white',
    fontWeight: 'body',
  },
  shell: {
    title: 'shell',
  },
  bash: {
    title: 'bash',
  },
  yaml: {
    title: 'yaml',
    backgroundColor: '#ffa8df',
  },
  md: {
    title: 'md',
  },
  json: {
    title: 'json',
    backgroundColor: 'linen',
  },
  diff: {
    title: 'diff',
    backgroundColor: '#e6ffed',
  },
  text: {
    title: 'text',
    backgroundColor: 'white',
  },
  flow: {
    title: 'flow',
    backgroundColor: '#e88d36',
  },
}

const defaultLabelColor = '#232129'

const getLabelProps = (label, linesEnabled) => {
  if (!label) {
    return null
  }

  return {
    '::before': {
      content: `"${label.title}"`,
      fontSize: 1,
      fontFamily: 'body',
      color: label.color || defaultLabelColor,
      backgroundColor: label.backgroundColor,
      padding: '0 0.5rem 0.2rem 0.5rem',
      borderRadius: '0 0 0.5rem 0.5rem',
      margin: 0,
      position: 'absolute',
      left: linesEnabled ? '2rem' : '1rem',
      top: 0,
      textTransform: 'uppercase',
    },
  }
}

const getLabel = language => {
  if (!language) {
    return null
  }

  if (language === 'none') {
    return null
  }

  const label = languageLabels[language]
  if (!label) {
    return {
      title: language,
      color: defaultLabelColor,
    }
  }

  return label
}

const LineNumber = ({ lineNumber }) => (
  <div
    sx={{
      display: 'flex',
      alignItems: 'center',
      fontSize: 1,
      borderRight: '1px solid #ccc', // TODO: get all these values from theme, with fallback
      paddingRight: '0.5rem',
    }}
  >
    <span>{lineNumber}</span>
  </div>
)

const Symbol = ({ symbol, theme, meta }) => (
  <span
    sx={{
      fontSize: 1,
      ...getTokenStyle({ theme, meta }),
    }}
  >
    {symbol}&nbsp;
  </span>
)

const Token = ({ token, theme, meta, getTokenProps }) => (
  <span
    {...getTokenProps({ token })}
    sx={{
      fontSize: 1,
      ...getTokenStyle({ theme, meta }),
    }}
  />
)

const CodeLine = ({
  line,
  lineNumber,
  lineNumbersEnabled,
  getLineProps,
  getTokenProps,
}) => {
  const context = useThemeUI()
  const { theme } = context
  const symbol = getSymbol({ meta: line.meta })

  return (
    <React.Fragment>
      {lineNumbersEnabled && <LineNumber lineNumber={lineNumber} />}
      <div
        {...getLineProps({ line: line.data })}
        sx={{
          ...getLineStyle({
            theme,
            meta: line.meta,
          }),
          paddingLeft: '0.5rem',
        }}
      >
        {symbol && <Symbol symbol={symbol} theme={theme} meta={line.meta} />}
        {line.data.tokens.map(token => (
          <Token
            key={token.id}
            token={token}
            theme={theme}
            meta={line.meta}
            getTokenProps={getTokenProps}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

const RenderStandard = ({
  parsed,
  language,
  getPreProps,
  getLineProps,
  getTokenProps,
}) => {
  const { options, lines } = parsed

  const label = getLabel(language)

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
            ...getLabelProps(label, options.lines.enabled),
          }}
        >
          {lines.map((line, i) => (
            <CodeLine
              key={line.data.id}
              lineNumber={options.lines.start + i}
              lineNumbersEnabled={options.lines.enabled}
              line={line}
              getLineProps={getLineProps}
              getTokenProps={getTokenProps}
            />
          ))}
        </Styled.pre>
      </div>
    </React.Fragment>
  )
}

export default RenderStandard
