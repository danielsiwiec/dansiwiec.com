import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import 'prismjs/themes/prism.css'
import favicon from '../../../static/favicon.png'
import Sidebar from '../Sidebar'

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
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          {children}
        </div>
      </div>
    </div>
  )
}
