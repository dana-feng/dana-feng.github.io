import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const sections = ['about', 'research', 'art']

function sectionForPath(pathname) {
  if (pathname === '/research') return 'research'
  if (pathname === '/art') return 'art'
  return 'about'
}

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const active = sectionForPath(location.pathname)
  const currentIndex = sections.indexOf(active)

  function goTo(offset) {
    const nextIndex = (currentIndex + offset + sections.length) % sections.length
    const id = sections[nextIndex]
    navigate(id === 'about' ? '/' : `/${id}`)
  }

  return (
    <nav className="top-nav">
      <button type="button" className="nav-arrow" onClick={() => goTo(-1)} aria-label="previous section">
        ^
      </button>
      <button type="button" className="nav-arrow nav-arrow-down" onClick={() => goTo(1)} aria-label="next section">
        ^
      </button>
    </nav>
  )
}

export default Navigation
