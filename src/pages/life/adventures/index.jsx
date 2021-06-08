import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../../components/Layout'
import Adventure from '../../../components/Adventure'
import InfiniteScroll from '../../../components/InfiniteScroll'

const component = props => {
  const adventures = props.data.allMarkdownRemark.edges

  return (
    <Layout {...props}>
      <h1 className='page__title'>Adventures</h1>
      Bushwacking, world trotting, hiking, trouble making - you name it!
      <InfiniteScroll items={adventures} sectionFactory={section} />
    </Layout>
  )
}

const section = (item, index) => {
  return <Adventure key={index} adventure={item.node.frontmatter} />
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "adventures"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            date
            pics {
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