const { toCategories } = require('./category')

describe('toCategories', () => {
  it('should return empty array for undefined', () => {
    expect(toCategories()).toEqual([])
  })

  it('should return empty array for null', () => {
    expect(toCategories(null)).toEqual([])
  })

  it('should throw on boolean', () => {
    expect(() => toCategories(false)).toThrow('Expected category string.')
  })

  it('should throw on object', () => {
    expect(() => toCategories({})).toThrow('Expected category string.')
  })

  it('should throw on array', () => {
    expect(() => toCategories([])).toThrow('Expected category string.')
  })

  it('should return empty array for empty string', () => {
    expect(toCategories('')).toEqual([])
  })

  it('should return empty array for whitespace string', () => {
    expect(toCategories('   ')).toEqual([])
  })

  it('should throw if string contains invalid character', () => {
    expect(() => toCategories('%')).toThrow(
      'Unexpected character in category string.'
    )
  })

  it('should throw if string begins with forward slash', () => {
    expect(() => toCategories('/foo')).toThrow(
      'Category string should not begin with forward slash.'
    )
  })

  it('should throw if string ends with forward slash', () => {
    expect(() => toCategories('foo/')).toThrow(
      'Category string should not end with forward slash.'
    )
  })

  it('should return single category for single word', () => {
    expect(toCategories('foo')).toEqual([
      { name: 'foo', path: 'foo', parent: null, child: null },
    ])
  })

  it('should return two categories for two words', () => {
    expect(toCategories('foo/bar')).toEqual([
      { name: 'foo', path: 'foo', parent: null, child: 'foo/bar' },
      { name: 'bar', path: 'foo/bar', parent: 'foo', child: null },
    ])
  })

  it('should return three categories for three words', () => {
    expect(toCategories('foo/bar/baz')).toEqual([
      { name: 'foo', path: 'foo', parent: null, child: 'foo/bar' },
      { name: 'bar', path: 'foo/bar', parent: 'foo', child: 'foo/bar/baz' },
      { name: 'baz', path: 'foo/bar/baz', parent: 'foo/bar', child: null },
    ])
  })
})
