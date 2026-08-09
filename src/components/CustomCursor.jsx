import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [visible, setVisible] = useState(false)

  const cursorX = useTransform(mouseX, v => v - 2)
  const cursorY = useTransform(mouseY, v => v - 2)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    <motion.div
      className="custom-cursor"
      style={{ opacity: visible ? 1 : 0, x: cursorX, y: cursorY }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <line x1="2" y1="2" x2="14" y2="14" stroke="#EDE7D9" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <circle cx="15" cy="15" r="1.4" fill="#EDE7D9" opacity="0.9" />
      </svg>
    </motion.div>
  )
}

export default CustomCursor
