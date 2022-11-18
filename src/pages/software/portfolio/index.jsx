import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../../components/Layout'

import PortfolioItem from '../../../components/PortfolioItem'

const component = props => {
  const projects = props.data.allMarkdownRemark.edges

  return (
    <Layout {...props}>
      <h1 className='page__title'>Pet Projects</h1>
      <div className='columns is-multiline'>
        {projects.map(project => (
          <div className='column is-half' key={project.node.frontmatter.title}>
            <PortfolioItem project={project.node.frontmatter} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "portfolio"}}}, sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          frontmatter {
            title
            date
            description
            url
            stack
            pic {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    site {
      ...SiteInformation
    }
  }
`

export default component
