import React from 'react'
import Layout from '../Layout'
import './style.scss'

export default props => {
  const page = props.data.markdownRemark

  return (
    <Layout {...props}>
      <div className='page'>
        <h1 className='page__title'>{page.frontmatter.title}</h1>
        <table>
          <tr>
            <th>Distance</th>
            <td>{page.frontmatter.distance}</td>
          </tr>
          <tr>
            <th>Place</th>
            <td>{page.frontmatter.place}</td>
          </tr>
          <tr>
            <th>Tracker</th>
            <td><a href={page.frontmatter.garmin} target='_blank' rel='noopener noreferrer'>Here</a></td>
          </tr>
          <tr>
            <th>Results</th>
            <td><a href={page.frontmatter.results} target='_blank' rel='noopener noreferrer'>Here</a></td>
          </tr>
        </table>
        <div className='page__body' dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </Layout>
  )
}
