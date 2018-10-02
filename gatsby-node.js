const _ = require('lodash')
const path = require('path')
const slash = require('slash')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/post-template.jsx')
  const pageTemplate = path.resolve('./src/templates/page-template.jsx')
  const tagTemplate = path.resolve('./src/templates/tag-template.jsx')
  const categoryTemplate = path.resolve('./src/templates/category-template.jsx')

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
              tags
              layout
              category
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
    } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(postTemplate),
        context: { slug: edge.node.fields.slug }
      })

      let tags = []
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }

      tags = _.uniq(tags)
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`
        createPage({
          path: tagPath,
          component: tagTemplate,
          context: { tag }
        })
      })

      let categories = []
      if (_.get(edge, 'node.frontmatter.category')) {
        categories = categories.concat(edge.node.frontmatter.category)
      }

      categories = _.uniq(categories)
      categories.forEach(category => {
        const categoryPath = `/categories/${_.kebabCase(category)}/`
        createPage({
          path: categoryPath,
          component: categoryTemplate,
          context: { category }
        })
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

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${_.kebabCase(tag)}/`)
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(node.frontmatter.category)}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}
