import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="top-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        | about
      </Link>
      <Link 
        to="/publications" 
        className={location.pathname === '/publications' ? 'active' : ''}
      >
        | publications
      </Link>
      <Link 
        to="/art" 
        className={location.pathname === '/art' ? 'active' : ''}
      >
        | art
      </Link>
    </nav>
  )
}

export default Navigation

