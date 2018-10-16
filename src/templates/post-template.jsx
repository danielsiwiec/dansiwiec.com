import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import PostTemplateDetails from '../components/PostTemplateDetails'

export default props => {
  const { title } = props.data.site.siteMetadata
  const post = props.data.markdownRemark
  const postTitle = post.frontmatter.title
  const excerpt = post.excerpt

  return (
    <Layout {...props}>
      <Helmet>
        <title>{`${postTitle} - ${title}`}</title>
        <meta name='description' content={excerpt} />
      </Helmet>
      <PostTemplateDetails {...props} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
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
        categorySlug
      }
      frontmatter {
        title
        tags
        date
        category
        cover {
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
        }
      }
      excerpt
      timeToRead
    }
  }
`
