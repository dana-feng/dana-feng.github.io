import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import About from './pages/About'
import Publications from './pages/Publications'
import Art from './pages/Art'
import Signature from './components/Signature'

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/art" element={<Art />} />
        </Routes>
        <Signature />
      </div>
    </Router>
  )
}

export default App

