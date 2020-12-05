import { graphql } from 'gatsby'
import PostsPage from '../components/posts'

export default PostsPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
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
          category {
            id
            name
          }
          maturity
        }
      }
    }
  }
`
