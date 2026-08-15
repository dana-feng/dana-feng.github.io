import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext'

function Signature() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <footer className="signature">
        <span className="signature-name" onClick={() => navigate('/')}>dana feng</span>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'switch to light mode' : 'switch to dark mode'}
        >
          {theme === 'dark' ? '🌙' : '🌑'}
        </button>
        <p className="publication-award">last updated august 2026</p>
      </footer>
    </div>
  )
}

export default Signature
