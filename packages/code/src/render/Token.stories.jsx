/** @jsxImportSource theme-ui */
import Token from './Token'

export default { title: 'render/Token' }

const token = {
  id: 'foo',
  data: {
    types: ['string'],
    content: 'foo',
  },
}

export const withDefault = () => <Token token={token} children="foo" />
