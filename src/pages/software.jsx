import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'

export default props => {
  const items = []
  const { title, subtitle } = props.data.site.siteMetadata
  const posts = props.data.allMarkdownRemark.edges
  posts.forEach((post) => {
    items.push(<Post data={post} key={post.node.fields.slug} />)
  })

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={subtitle} />
      </Helmet>
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          {items}
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query {
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
        filter: { frontmatter: { category: {eq: "Software"}, layout: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
            tagSlugs
          }
          frontmatter {
            title
            date
            category
            tags
          }
          excerpt
        }
      }
    }
  }
`
