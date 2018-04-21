import React from 'react'
import './style.scss'
import '../../assets/fonts/fontello-771c82e0/css/fontello.css'

export default props => {
  const author = props.data
  const links = {
    github: author.github,
    linkedin: author.linkedin,
    instagram: author.instagram,
    email: author.email
  }

  return (
    <div className='links'>
      <ul className='links__list'>
        <li className='links__list-item'>
          <a href={`https://www.github.com/${links.github}`} target='_blank' >
            <i className='icon-github' />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.linkedin.com/in/${links.linkedin}`} target='_blank' >
            <i className='icon-linkedin' />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.instagram.com/${links.instagram}`} target='_blank' >
            <i className='icon-instagram' />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`mailto:${links.email}`}>
            <i className='icon-mail' />
          </a>
        </li>
      </ul>
    </div>
  )
}
