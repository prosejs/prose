import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import { urlResolve } from 'gatsby-core-utils'

const replaceLast = (value, find, replace) => {
  if (!value) {
    return value
  }

  const index = value.lastIndexOf(find)

  if (index === -1) {
    return value
  }

  return `${value.substring(0, index)}${replace}${value.substring(
    index + find.length
  )}`
}

// TODO: make trailing slash an option, default to none, always normalise
const defaultNormalise = (
  slug // normalize use of trailing slash
) => {
  if (!slug) {
    return slug
  }

  if (slug.endsWith('/')) {
    return slug.substring(0, slug.length - 1)
  }

  return slug
}

export const getSlug = normalise => (basePath, node, getNode) => {
  const resolvedNormaliser = normalise || defaultNormalise

  if (node.frontmatter.slug) {
    if (path.isAbsolute(node.frontmatter.slug)) {
      // absolute paths take precedence
      return resolvedNormaliser(node.frontmatter.slug)
    }

    // otherwise a relative slug gets turned into a sub path
    return resolvedNormaliser(urlResolve(basePath, node.frontmatter.slug))
  }

  // otherwise use the filepath function from gatsby-source-filesystem
  const fileNode = getNode(node.parent)
  if (!fileNode) {
    return null
  }

  const source = fileNode.sourceInstanceName

  const filePath = createFilePath({
    node: fileNode,
    getNode,
    basePath: source.path,
  })

  return resolvedNormaliser(urlResolve(basePath, filePath))
}
