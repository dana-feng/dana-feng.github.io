import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const FINE_POINTER = '(pointer: fine)'

function CustomCursor() {
  // only replace the cursor when there's a real mouse; must match the
  // @media (pointer: fine) rule that hides the system cursor
  const [enabled, setEnabled] = useState(() => window.matchMedia(FINE_POINTER).matches)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [visible, setVisible] = useState(false)

  const cursorX = useTransform(mouseX, v => v - 2)
  const cursorY = useTransform(mouseY, v => v - 2)

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER)
    const change = () => setEnabled(mq.matches)
    mq.addEventListener('change', change)
    return () => mq.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <motion.div
      className="custom-cursor"
      style={{ opacity: visible ? 1 : 0, x: cursorX, y: cursorY }}
    >
      {/* a leaf whose tip is the pointer */}
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 2 C14 2 21 9 19 19 C9 21 2 14 2 2 Z" className="cursor-leaf" />
        <path d="M2 2 L19 19 L23 23" className="cursor-vein" />
      </svg>
    </motion.div>
  )
}

export default CustomCursor
