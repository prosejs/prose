/** @jsx jsx */
import React from 'react'
import { jsx, useThemeUI } from 'theme-ui'
import LineNumber from './LineNumber.jsx'
import Token from './Token.jsx'
import Symbol from './Symbol.jsx'

const getLineStyle = ({ theme, meta }) => {
  if (!meta) {
    return null
  }

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
  if (!meta) {
    return null
  }

  const { dem } = meta

  if (dem) {
    return {
      color: theme.colors.muted ? `${theme.colors.muted} !important` : null,
    }
  }

  return null
}

const getSymbol = ({ meta }) => {
  if (!meta) {
    return null
  }

  const { em, dem } = meta
  return dem ? getSymbolType(dem) : getSymbolType(em)
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

const CodeLine = ({
  meta,
  tokens,
  lineNumber,
  lineNumbersEnabled,
  lineProps,
  getTokenProps,
}) => {
  const context = useThemeUI()
  const { theme } = context

  const symbol = getSymbol({ meta })

  return (
    <React.Fragment>
      {lineNumbersEnabled && <LineNumber lineNumber={lineNumber} />}
      <div
        {...lineProps}
        sx={{
          ...getLineStyle({
            theme,
            meta,
          }),
          paddingLeft: '0.5rem',
        }}
      >
        {symbol && (
          <Symbol symbol={symbol} style={getTokenStyle({ theme, meta })} />
        )}
        {tokens.map(token => (
          <Token
            key={token.id}
            token={token}
            tokenStyle={getTokenStyle({ theme, meta })}
            {...getTokenProps({ token })}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

CodeLine.defaultProps = {
  meta: null,
  tokens: [],
  lineNumber: 1,
  lineNumbersEnabled: true,
  getTokenProps: ({ token }) => ({
    children: token.data.content,
  }),
}

export default CodeLine
