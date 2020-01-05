import { graphql } from 'gatsby'
import WikisPage from '../components/wikis'

export default WikisPage

export const query = graphql`
  query WikisQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWikiPage(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          excerpt
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
`
