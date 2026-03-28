import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const TRAIL_COUNT = 7

function TrailDot({ mouseX, mouseY, index }) {
  const stiffness = Math.max(540 - index * 62, 80)
  const x = useSpring(mouseX, { stiffness, damping: 26, mass: 0.1 })
  const y = useSpring(mouseY, { stiffness, damping: 26, mass: 0.1 })
  const size = Math.max(8 - index * 0.8, 3)
  const ox = useTransform(x, v => v - size / 2)
  const oy = useTransform(y, v => v - size / 2)

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: ox,
        y: oy,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#ECB900',
        pointerEvents: 'none',
        zIndex: 9997,
        opacity: ((TRAIL_COUNT - index) / TRAIL_COUNT) * 0.38,
      }}
    />
  )
}

function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [visible, setVisible] = useState(false)

  const cursorX = useTransform(mouseX, v => v - 5)
  const cursorY = useTransform(mouseY, v => v - 5)

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
    <>
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <TrailDot key={i} mouseX={mouseX} mouseY={mouseY} index={i} />
      ))}
      <motion.div
        className="custom-cursor"
        style={{ opacity: visible ? 1 : 0, x: cursorX, y: cursorY }}
      />
    </>
  )
}

export default CustomCursor
