import React from 'react'
import Layout from '../Layout'
import './style.scss'

export default props => {
  const page = props.data.markdownRemark

  return (
    <Layout {...props}>
      <div className='page'>
        <h1 className='page__title'>{page.frontmatter.title}</h1>
        <div className='page__body' dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </Layout>
  )
}
