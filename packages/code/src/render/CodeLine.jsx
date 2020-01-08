/** @jsx jsx */
import React from 'react'
import { jsx, useThemeUI } from 'theme-ui'
import LineNumber from './LineNumber'
import Token from './Token'
import Symbol from './Symbol'

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

const getSymbol = ({ meta }) => {
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
        {symbol && (
          <Symbol
            symbol={symbol}
            style={getTokenStyle({ theme, meta: line.meta })}
          />
        )}
        {line.data.tokens.map(token => (
          <Token
            key={token.id}
            token={token}
            style={getTokenStyle({ theme, meta: line.meta })}
            getTokenProps={getTokenProps}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default CodeLine
