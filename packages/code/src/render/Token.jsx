/** @jsxImportSource theme-ui */

const Token = ({ token, tokenStyle, ...props }) => {
  return (
    <span
      {...props}
      sx={{
        fontSize: 1,
        ...tokenStyle,
        variant: 'components.code.token',
      }}
    />
  )
}

export default Token
