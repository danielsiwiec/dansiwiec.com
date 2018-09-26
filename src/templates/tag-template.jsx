import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Sidebar from '../components/Sidebar'
import TagTemplateDetails from '../components/TagTemplateDetails'

export default props => {
  const { title } = props.data.site.siteMetadata
  const { tag } = props.pathContext

  return (
    <div>
      <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
      <Sidebar {...props} />
      <TagTemplateDetails {...props} />
    </div>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          gravatar
          email
          github
          linkedin
          instagram
        }
      }
    }
    allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
          }
          excerpt
        }
      }
    }
  }
`
