import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import { urlResolve } from 'gatsby-core-utils'

const defaultNormalise = (
  slug // normalize use of trailing slash
) => slug.replace(/\/*$/, `/`) // TODO: make trailing slash an option, default to none, always normalise

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
