import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../../../../../components/Layout'
import Sidebar from '../../../../../components/Sidebar'

export default (props) => {
  const { title, subtitle } = props.data.site.siteMetadata
  const posts = props.data.allMarkdownRemark.edges
  const items = posts.map(post => {
    return race(post.node.frontmatter.date, post.node.frontmatter.title, post.node.fields.slug)
  })

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={subtitle} />
      </Helmet>
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          <h2>Recent races</h2>
          <ul>
            {items}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

const race = (date, title, slug) => {
  return (<li>{moment(date).format('MMMM YYYY')} - <Link to={slug}>{title}</Link></li>)
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
          subs {
            path
            label
            external
          }
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
    allMarkdownRemark(limit: 1000,
      filter: {frontmatter: {category: {eq: "race"}, layout: {eq: "page"}}},
      sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
  
`
