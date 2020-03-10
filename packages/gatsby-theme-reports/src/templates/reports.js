import { graphql } from 'gatsby'
import ReportsPage from '../components/reports'

export default ReportsPage

export const query = graphql`
  query ReportsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allReport(sort: { fields: [date, title], order: DESC }, limit: 1000) {
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
