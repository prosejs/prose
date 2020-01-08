/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

const Token = ({ token, style, getTokenProps }) => (
  <span
    {...getTokenProps({ token })}
    sx={{
      fontSize: 1,
      ...style,
    }}
  />
)

export default Token
