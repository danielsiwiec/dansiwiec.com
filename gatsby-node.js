const _ = require('lodash')
const path = require('path')
const slash = require('slash')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve('./src/templates/page-template.jsx')
  const raceTemplate = path.resolve('./src/templates/race-template.jsx')

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              layout
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw new Error(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(edge => {
    if (_.get(edge, 'node.frontmatter.layout') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(pageTemplate),
        context: { slug: edge.node.fields.slug }
      })
    } else if (_.get(edge, 'node.frontmatter.layout') === 'race') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(raceTemplate),
        context: { slug: edge.node.fields.slug }
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
