import React from 'react'
import './style.scss'
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope, FaMedium, FaStrava } from 'react-icons/fa'

const component = props => {
  const author = props.data

  return (
    <div className='links'>
      <ul className='links__list'>
        <li className='links__list-item'>
          <a href={`https://www.github.com/${author.github}`} target='_blank' rel='noopener noreferrer'>
            <FaGithub />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://medium.com/${author.medium}`} target='_blank' rel='noopener noreferrer'>
            <FaMedium />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.linkedin.com/in/${author.linkedin}`} target='_blank' rel='noopener noreferrer'>
            <FaLinkedinIn />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.strava.com/athletes/${author.strava}`} target='_blank' rel='noopener noreferrer'>
            <FaStrava />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.instagram.com/${author.instagram}`} target='_blank' rel='noopener noreferrer'>
            <FaInstagram />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`mailto:${author.email}`}>
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default component
