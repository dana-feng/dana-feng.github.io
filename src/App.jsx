import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import About from './pages/About'
import Signature from './components/Signature'
import DrawingCanvas from './components/DrawingCanvas'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <Router>
      <div>
        <DrawingCanvas />
        <Navigation />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/publications" element={<About />} />
          <Route path="/art" element={<About />} />
        </Routes>
        <Signature />
        <CustomCursor />
      </div>
    </Router>
  )
}

export default App
