import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navigation() {
  const navigate = useNavigate()

  function handleNav(e, path, sectionId) {
    e.preventDefault()
    // If already on root, just scroll directly
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', path)
    } else {
      // Navigate to route, ScrollToSection will handle the scroll
      navigate(path)
    }
  }

  return (
    <nav className="top-nav">
      <a href="/" onClick={(e) => handleNav(e, '/', 'about')}>about</a>
      <a href="/publications" onClick={(e) => handleNav(e, '/publications', 'publications')}>publications</a>
      <a href="/art" onClick={(e) => handleNav(e, '/art', 'art')}>art</a>
    </nav>
  )
}

export default Navigation