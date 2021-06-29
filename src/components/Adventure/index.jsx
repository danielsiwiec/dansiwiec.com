import React from 'react'
import moment from 'moment'
import Img from 'gatsby-image'
import './style.scss'

const component = ({ adventure: { title, date, pics } }) => {
  return (
    <div>
      <h2>{title} {moment(date).format('MMM YYYY')}</h2>
      {pics.map((pic, p) => (
        <div className='adventure-image' key={p}>
          <Img fluid={pic.childImageSharp.fluid} title='blah' />
        </div>
      ))}
    </div>
  )
}

export default component
