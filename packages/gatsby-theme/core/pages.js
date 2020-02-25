const { deepmerge } = require('@utilz/deepmerge')

const isDevelopment = () => process.env.NODE_ENV !== 'production'

exports.createPage = page => async api => {
  const { actions } = api
  const { createPage: gatsbyCreatePage } = actions

  gatsbyCreatePage(page)
}

exports.createDetailNextPreviousPage = ({
  entityName,
  listQuery,
  component,
  include,
}) => async api => {
  const { graphql, actions, reporter } = api
  const { createPage } = actions

  if (!entityName) {
    reporter.panic('No detail next/previous page entity name specified.')
  }

  if (!component) {
    reporter.panic('No detail next/previous page component specified.')
  }

  const defaultListQuery = `{
    all${entityName}(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`

  const query = listQuery ? listQuery({ entityName }) : defaultListQuery
  const results = await graphql(query)

  if (results.errors) {
    reporter.panic(results.errors)
  }

  const nodes = results.data[`all${entityName}`].edges.map(n => n.node)

  const predicate = include || (() => true)

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index]

    if (!predicate({ node, index })) {
      continue
    }

    const previous = index === nodes.length - 1 ? null : nodes[index + 1]
    const next = index === 0 ? null : nodes[index - 1]
    const { slug } = node

    createPage({
      path: slug,
      component,
      context: {
        id: node.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
      },
    })
  }
}

exports.pagesWithDraft = obj =>
  deepmerge(
    {
      listQuery: ({ entityName }) => `{
    all${entityName}(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          slug
          draft
        }
      }
    }
  }`,
      include: ({ node }) => {
        if (isDevelopment()) {
          return true
        }

        return !node.draft
      },
    },
    obj
  )
