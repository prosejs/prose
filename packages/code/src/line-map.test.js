import lineMap from './line-map'
import faker from 'faker'

describe('lineMap', () => {
  it('returns empty object for undefined', () => {
    expect(lineMap()).toEqual({})
  })

  it('returns empty object for undefined', () => {
    expect(lineMap()).toEqual({})
  })

  it('returns empty object for empty array', () => {
    expect(lineMap([])).toEqual({})
  })

  it('throws exception for string', () => {
    expect(() => lineMap(faker.random.word())).toThrow(
      'Value must be an array.'
    )
  })

  it('throws exception for boolean', () => {
    expect(() => lineMap(false)).toThrow('Value must be an array.')
  })

  it('throws exception for number', () => {
    expect(() => lineMap(faker.random.number())).toThrow(
      'Value must be an array.'
    )
  })

  it('returns map for single number element', () => {
    expect(lineMap([1])).toEqual({ 1: true })
  })

  it('returns map for single positive string element', () => {
    expect(lineMap(['1+'])).toEqual({ 1: '+' })
  })

  it('returns map for single negative string element', () => {
    expect(lineMap(['1-'])).toEqual({ 1: '-' })
  })

  it('returns map for multiple number elements', () => {
    expect(lineMap([1, 2, 6])).toEqual({ 1: true, 2: true, 6: true })
  })

  it('returns map for multiple number elements', () => {
    expect(lineMap([1, 2, 6])).toEqual({ 1: true, 2: true, 6: true })
  })

  it('returns map for multiple number elements', () => {
    expect(lineMap(['1', '2', '6'])).toEqual({ 1: true, 2: true, 6: true })
  })

  it('returns map for multiple positive string elements', () => {
    expect(lineMap(['1+', '2+', '6+'])).toEqual({
      1: '+',
      2: '+',
      6: '+',
    })
  })

  it('returns map for multiple negative string elements', () => {
    expect(lineMap(['1-', '2-', '6-'])).toEqual({
      1: '-',
      2: '-',
      6: '-',
    })
  })

  it('throws exception for non numeric value', () => {
    const value = faker.random.word()
    expect(() => lineMap([value])).toThrow(
      `Line number '${value}' is not a valid number.`
    )
  })

  it('throws exception for duplicate numeric value', () => {
    expect(() => lineMap([1, 1])).toThrow(`Line number 1 already has a value.`)
  })

  it('throws exception for duplicate plus', () => {
    expect(() => lineMap(['1++'])).toThrow(
      `Line number '1++' is not a valid number.`
    )
  })

  it('throws exception for duplicate minus', () => {
    expect(() => lineMap(['1--'])).toThrow(
      `Line number '1--' is not a valid number.`
    )
  })

  it('returns map for range', () => {
    expect(lineMap(['1-2'])).toEqual({
      1: true,
      2: true,
    })
  })

  it('returns map for positive range', () => {
    expect(lineMap(['1-2+'])).toEqual({
      1: '+',
      2: '+',
    })
  })

  it('returns map for negative range', () => {
    expect(lineMap(['1-2-'])).toEqual({
      1: '-',
      2: '-',
    })
  })

  it('returns map for range with single numbers', () => {
    expect(lineMap(['1-2', '3+', '4-', '5-6'])).toEqual({
      1: true,
      2: true,
      3: '+',
      4: '-',
      5: true,
      6: true,
    })
  })

  it('throws exception for start range equal to end range', () => {
    expect(() => lineMap(['1-1'])).toThrow(
      'End range number 1 must be greater than start range number 1.'
    )
  })

  it('throws exception for start range greater than end range', () => {
    expect(() => lineMap(['2-1'])).toThrow(
      'End range number 1 must be greater than start range number 2.'
    )
  })

  it('throws exception for range already included by single number', () => {
    expect(() => lineMap([1, '1-2'])).toThrow(
      'Line number 1 already has a value.'
    )
  })

  it('throws exception for range already included by another range', () => {
    expect(() => lineMap(['1-2', '2-3+'])).toThrow(
      'Line number 2 already has a value.'
    )
  })
})
