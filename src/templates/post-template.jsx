import React from 'react'
import Helmet from 'react-helmet'
import PostTemplateDetails from '../components/PostTemplateDetails'

export default props => {
  const { title } = props.data.site.siteMetadata
  const post = props.data.markdownRemark
  const postTitle = post.frontmatter.title
  const excerpt = post.excerpt

  return (
    <div>
      <Helmet>
        <title>{`${postTitle} - ${title}`}</title>
        <meta name='description' content={excerpt} />
      </Helmet>
      <PostTemplateDetails {...props} />
    </div>
  )
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
        }
        disqusShortname
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        category
      }
      excerpt
    }
  }
`
