import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [visible, setVisible] = useState(false)

  const cursorX = useTransform(mouseX, v => v - 8)
  const cursorY = useTransform(mouseY, v => v - 10)

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
      ^
    </motion.div>
  )
}

export default CustomCursor
