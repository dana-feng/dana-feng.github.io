import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function EasterEgg() {
  const [flowers, setFlowers] = useState([])
  const bufferRef = useRef('')

  useEffect(() => {
    const handleKey = (e) => {
      bufferRef.current = (bufferRef.current + e.key).slice(-9)
      if (bufferRef.current.toLowerCase().includes('sunflower')) {
        bufferRef.current = ''
        const newFlowers = Array.from({ length: 10 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * (window.innerWidth - 60),
          delay: Math.random() * 0.4,
        }))
        setFlowers(prev => [...prev, ...newFlowers])
        setTimeout(() => {
          setFlowers(prev => prev.filter(f => !newFlowers.some(n => n.id === f.id)))
        }, 2500)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <AnimatePresence>
      {flowers.map(flower => (
        <motion.div
          key={flower.id}
          className="easter-egg-flower"
          style={{ left: flower.x }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -(window.innerHeight + 80), opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut', delay: flower.delay }}
        >
          🌻
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

export default EasterEgg
