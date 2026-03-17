import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import About from './pages/About'
import Signature from './components/Signature'

function ScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname.replace('/', '')
    if (path) {
      const el = document.getElementById(path)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname])

  return null
}

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/publications" element={<About />} />
          <Route path="/art" element={<About />} />
        </Routes>
        <Signature />
      </div>
    </Router>
  )
}

export default App