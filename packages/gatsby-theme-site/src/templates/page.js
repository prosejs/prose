import { graphql } from 'gatsby'
import Page from '../components/page'

export default Page

export const query = graphql`
  query PageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    page(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      subTitle
      draft
      tags
      keywords
      date(formatString: "MMMM DD, YYYY")
    }
    previous: page(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      subTitle
      draft
      date(formatString: "MMMM DD, YYYY")
    }
    next: page(id: { eq: $nextId }) {
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
