import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import 'prismjs/themes/prism.css'
import favicon from '../../../static/favicon.png'

export default props => {
  const { children } = props

  return (
    <div className='layout'>
      <Helmet
        defaultTitle='Blog by Dan Siwiec'
        link={[
          { rel: 'icon', type: 'image/png', href: `${favicon}` }
        ]}
      />
      {children}
    </div>
  )
}
