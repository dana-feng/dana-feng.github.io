import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { leafPath } from './vineShapes'

const sections = ['about', 'research', 'art', 'projects']

function pathFor(id) {
  return id === 'about' ? '/' : `/${id}`
}

// the active tab's underline: a little vine that grows left to right,
// puts out two leaves and opens a flower at the end
function VineUnderline({ width }) {
  const reduceMotion = useReducedMotion()
  const w = Math.max(width, 20)
  const end = w - 5
  const pts = []
  for (let x = 1; x <= end; x += 2) pts.push(`${x.toFixed(1)} ${(6 + 1.3 * Math.sin(x / 5)).toFixed(1)}`)
  const yAt = (x) => 6 + 1.3 * Math.sin(x / 5)
  const leaves = [
    { x: w * 0.3, angle: -130 },
    { x: w * 0.58, angle: 40 },
  ]
  const grow = (delay) =>
    reduceMotion
      ? {}
      : { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.6, ease: 'easeOut', delay } }

  return (
    <svg className="nav-vine" width={w + 6} height="14" aria-hidden="true">
      <motion.path
        d={`M${pts.join(' L')}`}
        className="vine-stem nav-vine-stem"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x.toFixed(1)} ${yAt(l.x).toFixed(1)}) rotate(${l.angle})`}>
          <motion.path d={leafPath(4.5)} className="vine-leaf" {...grow(0.25 + i * 0.25)} style={{ originX: 0, originY: 0.5 }} />
        </g>
      ))}
      <motion.g {...grow(0.85)} style={{ originX: 0.5, originY: 0.5 }}>
        {[0, 1, 2, 3, 4].map((p) => (
          <circle
            key={p}
            cx={end + Math.cos((p / 5) * Math.PI * 2) * 1.7}
            cy={yAt(end) + Math.sin((p / 5) * Math.PI * 2) * 1.7}
            r="1.3"
            className="vine-petal-2"
          />
        ))}
        <circle cx={end} cy={yAt(end)} r="0.9" className="vine-flower-center" />
      </motion.g>
    </svg>
  )
}

function NavLink({ id, active, onClick }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth)
  }, [])
  return (
    <button
      type="button"
      className={`nav-link${active ? ' nav-link-active' : ''}`}
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
    >
      <span ref={ref} className="nav-link-label">{id}</span>
      {active && <VineUnderline width={width} />}
    </button>
  )
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
        <NavLink key={id} id={id} active={active === id} onClick={() => navigate(pathFor(id))} />
      ))}
    </nav>
  )
}

export default Navigation
