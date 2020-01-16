import React from 'react'
import { MDXRenderer } from '@prose/gatsby-theme'
console.log(MDXRenderer)

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
