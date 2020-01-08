/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

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

export default LineNumber
