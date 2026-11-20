import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext'

function Signature() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('themeHintSeen')) return
    const showTimer = setTimeout(() => setShowHint(true), 800)
    const hideTimer = setTimeout(() => dismissHint(), 6000)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  function dismissHint() {
    setShowHint(false)
    localStorage.setItem('themeHintSeen', '1')
  }

  return (
    <div>
      <footer className="signature">
        <span className="signature-name" onClick={() => navigate('/')}>dana feng</span>
        <span className="theme-toggle-wrap">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => { toggleTheme(); dismissHint() }}
            aria-label={theme === 'dark' ? 'switch to light mode' : 'switch to dark mode'}
          >
            {theme === 'dark' ? (
              // a drawn crescent moon
              <svg viewBox="0 0 20 20" className="theme-icon" aria-hidden="true">
                <path d="M13.5 3.2 A7.2 7.2 0 1 0 16.8 14 A5.8 5.8 0 1 1 13.5 3.2 Z" />
              </svg>
            ) : (
              // a drawn sun with short rays
              <svg viewBox="0 0 20 20" className="theme-icon" aria-hidden="true">
                <circle cx="10" cy="10" r="3.6" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line key={a} x1="10" y1="2.2" x2="10" y2="4.4" transform={`rotate(${a} 10 10)`} />
                ))}
              </svg>
            )}
          </button>
          {showHint && <span className="hint-bubble hint-bubble-toggle">tap to change theme</span>}
        </span>
        <p className="publication-award">last updated november 2026</p>
      </footer>
    </div>
  )
}

export default Signature
