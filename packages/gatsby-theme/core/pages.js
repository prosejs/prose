exports.createPage = page => async api => {
  const { actions } = api
  const { createPage: gatsbyCreatePage } = actions

  gatsbyCreatePage(page)
}

exports.createDetailNextPreviousPage = ({
  entityName,
  component,
}) => async api => {
  const { graphql, actions, reporter } = api
  const { createPage } = actions

  if (!entityName) {
    reporter.panic('No detail next/previous page entity name specified.')
  }

  if (!component) {
    reporter.panic('No detail next/previous page component specified.')
  }

  const listQuery = `{
    all${entityName}(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`

  const results = await graphql(listQuery)

  if (results.errors) {
    reporter.panic(results.errors)
  }

  const nodes = results.data[`all${entityName}`].edges.map(n => n.node)

  nodes.forEach((node, index) => {
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
  })
}