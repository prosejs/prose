import { graphql } from 'gatsby'
import WikiPage from '../components/wiki'

export default WikiPage

export const query = graphql`
  query WikiPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    wikiPage(id: { eq: $id }) {
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
    }
    previous: wikiPage(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      subTitle
      draft
      date(formatString: "MMMM DD, YYYY")
    }
    next: wikiPage(id: { eq: $nextId }) {
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
