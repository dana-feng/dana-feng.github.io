import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signature() {
  const navigate = useNavigate()

  return (
    <div>
      <footer className="signature">
        <span className="signature-name" onClick={() => navigate('/')}>dana feng</span>
        <p className="publication-award">last updated august 2026</p>
      </footer>
    </div>
  )
}

export default Signature
