import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Sidebar from '../components/Sidebar'
import CategoryTemplateDetails from '../components/CategoryTemplateDetails'
import Layout from '../components/Layout'

export default props => {
  const { title } = props.data.site.siteMetadata
  const { category } = props.pathContext

  return (
    <Layout>
      <div>
        <Helmet title={`${category} - ${title}`} />
        <Sidebar {...props} />
        <CategoryTemplateDetails {...props} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($category: String) {
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
        filter: { frontmatter: { category: { eq: $category }, layout: { eq: "post" }, draft: { ne: true } } },
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
