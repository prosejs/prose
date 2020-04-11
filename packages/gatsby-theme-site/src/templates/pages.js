import { graphql } from 'gatsby'
import Pages from '../components/pages'

export default Pages

export const query = graphql`
  query SitePagesQuery {
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
