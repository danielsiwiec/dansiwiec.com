import React from 'react'
import Helmet from 'react-helmet'
import PostTemplateDetails from '../components/PostTemplateDetails'

class PostTemplate extends React.Component {
  render () {
    const { title } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const postTitle = post.frontmatter.title
    const excerpt = post.excerpt

    return (
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name='description' content={excerpt} />
        </Helmet>
        <PostTemplateDetails {...this.props} />
      </div>
    )
  }
}

export default PostTemplate

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
      }
      excerpt
    }
  }
`
