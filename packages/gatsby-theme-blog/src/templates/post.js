import { graphql } from 'gatsby'
import PostPage from '../components/post'

export default PostPage

export const query = graphql`
  query($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    blogPost(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      sourceUri
      title
      subTitle
      draft
      tags
      keywords
      date(formatString: "MMMM DD, YYYY")
      category {
        id
        name
      }
      maturity
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      subTitle
      draft
      date(formatString: "MMMM DD, YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      subTitle
      draft
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
