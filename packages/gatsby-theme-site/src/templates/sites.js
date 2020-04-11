import { graphql } from 'gatsby'
import SitesPage from '../components/sites'

export default SitesPage

export const query = graphql`
  query SitesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPage(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          excerpt
          slug
          title
          subTitle
          draft
          date(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
`
