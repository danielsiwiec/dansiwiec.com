module.exports = {
  siteMetadata: {
    url: 'https://dansiwiec.com',
    title: 'Blog by Dan Siwiec',
    subtitle: 'On things making me happy in life',
    copyright: '© All rights reserved.',
    disqusShortname: '',
    menu: [
      {
        label: 'Life',
        path: '/life/'
      },
      {
        label: 'Work',
        path: '/software/'
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
      instagram: 'dansiwiec'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
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
              maxWidth: 960
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
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`roboto:400,400i,500,700`]
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss-sass'
  ]
}
