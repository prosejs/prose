const { isNil, isString } = require('@utilz/types')

const toCategories = value => {
  if (isNil(value)) {
    return []
  }

  if (!isString(value)) {
    throw new Error('Expected category string.')
  }

  const val = value.trim()

  if (val.length === 0) {
    return []
  }

  if (!val.match(/([a-z]|[A-Z]|\/|-|[0-9])+/gm)) {
    throw new Error('Unexpected character in category string.')
  }

  if (val.startsWith('/')) {
    throw new Error('Category string should not begin with forward slash.')
  }

  if (val.endsWith('/')) {
    throw new Error('Category string should not end with forward slash.')
  }

  const parts = val.split('/')

  const categoryName = toIndex => {
    if (toIndex >= parts.length) {
      return null
    }

    let result = ''
    for (let i = 0; i <= toIndex; i++) {
      result += parts[i]

      if (i < toIndex) {
        result += '/'
      }
    }

    return result
  }

  const categories = []

  for (let i = 0; i < parts.length; i++) {
    categories.push({
      name: categoryName(i),
      parent: i === 0 ? null : categoryName(i - 1),
      child: i === parts.length - 1 ? null : categoryName(i + 1),
    })
  }

  return categories
}

exports.toCategories = toCategories
