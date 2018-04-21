import React from 'react'
import Helmet from 'react-helmet'
import Sidebar from '../components/Sidebar'
import CategoryTemplateDetails from '../components/CategoryTemplateDetails'

export default props => {
  const { title } = props.data.site.siteMetadata
  const { category } = props.pathContext

  return (
    <div>
      <Helmet title={`${category} - ${title}`} />
      <Sidebar {...props} />
      <CategoryTemplateDetails {...props} />
    </div>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
