import React from 'react'
// import { MDXRenderer } from '@prose/gatsby-theme'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const BlogPost = ({
  data: {
    blogPost,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  return (
    <>
      <MDXRenderer>{blogPost.body}</MDXRenderer>
    </>
  )
}

export default BlogPost
