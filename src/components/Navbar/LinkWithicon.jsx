import React from 'react'
import { Link } from 'react-router-dom'

import { NavLink } from 'react-router-dom'
import './LinkWithicon.css'

const LinkWithicon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink className={sidebar ? 'aligncenter sidebar_link' : 'aligncenter links'} to={link}>
      {title} <img className='link_emoji' src={emoji} alt='' />
    </NavLink>
  )
}

export default LinkWithicon