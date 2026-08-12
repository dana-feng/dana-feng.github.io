import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import About from './pages/About'
import Signature from './components/Signature'
import DrawingCanvas from './components/DrawingCanvas'
import CustomCursor from './components/CustomCursor'
import { ThemeProvider } from './ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <DrawingCanvas />
          <Navigation />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/research" element={<About />} />
            <Route path="/art" element={<About />} />
          </Routes>
          <Signature />
          <CustomCursor />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
