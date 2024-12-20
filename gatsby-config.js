const lost = require('lost')
const pxtorem = require('postcss-pxtorem')
const path = require('path')

module.exports = {
  siteMetadata: {
    url: 'https://dansiwiec.com',
    title: 'Blog by Dan Siwiec',
    subtitle: 'On things making me happy in life',
    copyright: '© All rights reserved.',
    disqusShortname: 'dansiwiec',
    menu: [
      {
        label: 'Life',
        path: '/life/',
        subs: [
          {
            label: 'Adventures',
            path: '/life/adventures'
          },
          {
            label: 'Sports',
            path: '/life/sports'
          },
          {
            label: 'Brrr!!!',
            path: '/life/cold'
          }
        ]
      },
      {
        label: 'Software',
        path: '/software/',
        subs: [
          {
            label: 'Pet Projects',
            path: '/software/portfolio'
          },
          {
            label: 'Blog @ Medium',
            external: true,
            path: 'https://medium.com/dan-on-coding'
          }
        ]
      },
      {
        label: 'About me',
        path: '/about/'
      }
    ],
    author: {
      name: 'Dan Siwiec',
      gravatar: '68bd7e9fae5683e8c63be22f8eb5b543',
      email: 'daniel.siwiec@gmail.com',
      github: 'danielsiwiec',
      linkedin: 'dsiwiec',
      instagram: 'dansiwiec',
      medium: 'dan-on-coding',
      strava: '11726996'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src/pages'),
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              showCaptions: true
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-61588022-3' }
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto:400,400i,500,700']
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width'
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
          })
        ]
      }
    },
    'gatsby-plugin-catch-links'
  ]
}
