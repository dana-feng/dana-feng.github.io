import React, { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const sections = ['about', 'publications', 'art']

function sectionForPath(pathname) {
  if (pathname === '/publications') return 'publications'
  if (pathname === '/art') return 'art'
  return 'about'
}

function MagneticLink({ href, children, className, onClick }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setOffset({ x: dx * 5, y: dy * 5 })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  )
}

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const active = sectionForPath(location.pathname)

  function handleNav(e, path) {
    e.preventDefault()
    navigate(path)
  }

  return (
    <nav className="top-nav">
      {sections.map((id) => (
        <MagneticLink
          key={id}
          href={id === 'about' ? '/' : `/${id}`}
          className={active === id ? 'active' : ''}
          onClick={(e) => handleNav(e, id === 'about' ? '/' : `/${id}`)}
        >
          {id}
        </MagneticLink>
      ))}
    </nav>
  )
}

export default Navigation
