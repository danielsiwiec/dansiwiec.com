import React from 'react'
import Sidebar from '../Sidebar'
import './style.scss'

export default props => {
  const page = props.data.markdownRemark

  return (
    <div>
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          <div className='page'>
            <h1 className='page__title'>{page.frontmatter.title}</h1>
            <div className='page__body' dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        </div>
      </div>
    </div>
  )
}
