import { fromMdxProps } from './from-mdx-props'

describe('fromMdxProps', () => {
  it('throws exception for undefined props', () => {
    expect(() => fromMdxProps()).toThrow('No props specified.')
  })

  it('throws exception for null props', () => {
    expect(() => fromMdxProps(null)).toThrow('No props specified.')
  })

  it('returns null values for empty object', () => {
    expect(fromMdxProps({})).toEqual({
      language: null,
      meta: null,
      code: null,
    })
  })

  it('returns null language for null className', () => {
    expect(fromMdxProps({ className: null }).language).toBeNull()
  })

  it('returns null code for null children', () => {
    expect(fromMdxProps({ children: null }).code).toBeNull()
  })

  it('returns null language for className not prefixed with language-', () => {
    expect(fromMdxProps({ className: 'foo' }).language).toBeNull()
  })

  it('returns null language for className with only language- prefix', () => {
    expect(fromMdxProps({ className: 'language-' }).language).toBeNull()
  })

  it('returns null language for className with only language- prefix and whitespace', () => {
    expect(fromMdxProps({ className: '  language-  ' }).language).toBeNull()
  })

  it('returns language for className with language prefix', () => {
    expect(fromMdxProps({ className: 'language-foo' }).language).toBe('foo')
  })

  it('returns language for className with language prefix and whitespace', () => {
    expect(fromMdxProps({ className: '  language-foo  ' }).language).toBe('foo')
  })

  it('returns trimmed children as code', () => {
    expect(fromMdxProps({ children: '  foo  ' }).code).toBe('foo')
  })

  it('returns null language for className with language prefix with leading text', () => {
    expect(fromMdxProps({ className: 'foolanguage-foo' }).language).toBeNull()
  })

  it('returns null language for className with language prefix with leading and trailing text', () => {
    expect(
      fromMdxProps({ className: 'foolanguage-foo foo' }).language
    ).toBeNull()
  })

  it('returns null language for className with language-undefined', () => {
    expect(
      fromMdxProps({ className: 'language-undefined' }).language
    ).toBeNull()
  })

  it('returns expected language for multiple classes', () => {
    expect(
      fromMdxProps({ className: 'language-javascript css-1q7q4hh' }).language
    ).toBe('javascript')
  })
})
