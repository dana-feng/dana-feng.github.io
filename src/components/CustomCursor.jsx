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
      {/* a leaf whose tip is the pointer */}
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 2 C14 2 21 9 19 19 C9 21 2 14 2 2 Z" className="cursor-leaf" />
        <path d="M2 2 L19 19 L23 23" className="cursor-vein" />
      </svg>
    </motion.div>
  )
}

export default CustomCursor
