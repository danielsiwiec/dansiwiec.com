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
            <table>
              <tr>
                <th>Distance</th>
                <th>Place</th>
                <th>Tracker</th>
                <th>Results</th>
              </tr>
              <tr>
                <td>{page.frontmatter.distance}</td>
                <td>{page.frontmatter.place}</td>
                <td><a href={page.frontmatter.garmin} target='_blank' rel='noopener noreferrer'>Here</a></td>
                <td><a href={page.frontmatter.results} target='_blank' rel='noopener noreferrer'>Here</a></td>
              </tr>
            </table>
            <div className='page__body' dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        </div>
      </div>
    </div>
  )
}
