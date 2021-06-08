import React from 'react'
import { Link, graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../../../../../components/Layout'

const component = props => {
  const posts = props.data.allMarkdownRemark.edges
  const items = posts.map(post => {
    return race(post.node.frontmatter.date, post.node.frontmatter.title, post.node.fields.slug)
  })

  return (
    <Layout {...props}>
      <h2>Recent races</h2>
      <ul>
        {items}
      </ul>
    </Layout>
  )
}

const race = (date, title, slug) => {
  return (<li key={date}>{moment(date).format('MMMM YYYY')} - <Link to={slug}>{title}</Link></li>)
}

export const pageQuery = graphql`
  query {
    site {
      ...SiteInformation
    }
    allMarkdownRemark(limit: 1000,
      filter: {frontmatter: {category: {eq: "race"}, layout: {eq: "race"}}},
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

export default component