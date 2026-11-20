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
        <span className="theme-toggle-wrap">
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            className={`theme-switch theme-switch-${theme}`}
            onClick={toggleTheme}
            aria-label="dark mode"
          >
            <span className="theme-switch-knob" aria-hidden="true" />
          </button>
        </span>
        <p className="publication-award">last updated november 2026</p>
      </footer>
    </div>
  )
}

export default Signature
