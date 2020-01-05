import parse from './parse-standard'
import faker from 'faker'

describe('parse', () => {
  it('returns null options given null options', () => {
    expect(
      parse({ options: null, meta: null, code: null, lines: null }).options
    ).toEqual({})
  })

  it('returns merged options and meta', () => {
    expect(
      parse({ options: { foo: 'bar' }, meta: { foo: 'baz' } }).options
    ).toEqual({
      foo: 'baz',
    })
  })

  it('returns raw code', () => {
    const code = faker.random.word()
    expect(parse({ code }).code.raw).toBe(code)
  })

  it('returns lines emphasise metadata', () => {
    const lines = [1, 2, 3]

    const parsed = parse({
      meta: {
        em: ['1+', 2],
      },
      lines: lines.map(l => ({ id: l, tokens: [] })),
    })

    const lineEms = parsed.lines.map(l => l.meta.em)
    expect(lineEms).toEqual(['+', true, false])
  })

  it('returns lines highlight metadata with ranges', () => {
    const lines = [1, 2, 3, 4, 5, 6]

    const parsed = parse({
      meta: {
        em: ['1-2', '3-4+', '5-6-'],
      },
      lines: lines.map(l => ({ id: l, tokens: [] })),
    })

    const lineEms = parsed.lines.map(l => l.meta.em)
    expect(lineEms).toEqual([true, true, '+', '+', '-', '-'])
  })

  it('returns lines emphasise metadata', () => {
    const lines = [1, 2, 3]

    const parsed = parse({
      meta: {
        dem: ['1+', 2],
      },
      lines: lines.map(l => ({ id: l, tokens: [] })),
    })

    const lineDems = parsed.lines.map(l => l.meta.dem)
    expect(lineDems).toEqual(['+', true, false])
  })

  it('returns lines highlight metadata with ranges', () => {
    const lines = [1, 2, 3, 4, 5, 6]

    const parsed = parse({
      meta: {
        dem: ['1-2', '3-4+', '5-6-'],
      },
      lines: lines.map(l => ({ id: l, tokens: [] })),
    })

    const lineDems = parsed.lines.map(l => l.meta.dem)
    expect(lineDems).toEqual([true, true, '+', '+', '-', '-'])
  })
})
