import React from 'react'
import Helmet from 'react-helmet'
import '../assets/scss/init.scss'
import 'prismjs/themes/prism.css'

export default props => {
  const { children } = props

  return (
    <div className='layout'>
      <Helmet defaultTitle='Blog by John Doe' />
      {children()}
    </div>
  )
}
