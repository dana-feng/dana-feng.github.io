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
            role="switch"
            aria-checked={theme === 'dark'}
            className={`theme-switch theme-switch-${theme}`}
            onClick={() => { toggleTheme(); dismissHint() }}
            aria-label="dark mode"
          >
            <span className="theme-switch-knob" aria-hidden="true" />
          </button>
          {showHint && <span className="hint-bubble hint-bubble-toggle">tap to change theme</span>}
        </span>
        <p className="publication-award">last updated november 2026</p>
      </footer>
    </div>
  )
}

export default Signature
