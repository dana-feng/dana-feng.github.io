import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sections = ['about', 'research', 'art']

function pathFor(id) {
  return id === 'about' ? '/' : `/${id}`
}

function Navigation() {
  const navigate = useNavigate()
  const [active, setActive] = useState('about')

  // Highlight whichever section fills the middle of the viewport, and keep the
  // URL in sync so the address bar is shareable without adding history entries
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.id
          setActive(id)
          if (window.location.pathname !== pathFor(id)) {
            window.history.replaceState(window.history.state, '', pathFor(id))
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="top-nav" aria-label="sections">
      {sections.map((id) => (
        <button
          key={id}
          type="button"
          className={`nav-link${active === id ? ' nav-link-active' : ''}`}
          onClick={() => navigate(pathFor(id))}
          aria-current={active === id ? 'true' : undefined}
        >
          {id}
        </button>
      ))}
    </nav>
  )
}

export default Navigation
