import React from 'react'

// Research image should be in public folder
const researchImage = '/research.png'

// Helper function to highlight "dana feng" in author lists
function highlightAuthor(text) {
  const parts = text.split(/(dana feng\*?)/i)
  return parts.map((part, index) => {
    if (part.match(/^dana feng\*?$/i)) {
      return <span key={index} className="highlight-author">{part}</span>
    }
    return part
  })
}

function Publications() {
  return (
    <main className="publications-container">
      <div className="publications-content">
        <div className="diagrams-section">
          <div className="diagram-box">
            <div className="research-image-wrapper">
              <img src={researchImage} alt="research diagrams" className="research-image" />
            </div>
          </div>
        </div>

        <div className="publications-list">
          <div className="publication-item">
            <h3 className="publication-title">from junior to senior: allocating agency and navigating professional growth in agentic ai-mediated software engineering</h3>
            <p className="publication-authors">{highlightAuthor('dana feng*, bhada yun*, april wang')}</p>
            <p className="publication-venue">chi 2026</p>
            <p className="publication-award">⭐ best paper</p>
          </div>

          <div className="publication-item">
            <h3 className="publication-title">generative ai in knowledge work: design implications for data navigation and decision-making</h3>
            <p className="publication-authors">{highlightAuthor('bhada yun*, dana feng*, ace chen, afshin nikzad, niloufar salehi')}</p>
            <p className="publication-venue">chi 2025</p>
            <p className="publication-award">⭐ best paper honorable mention</p>
          </div>

          <div className="publication-item">
            <h3 className="publication-title">ai phenomenology for understanding human-ai experiences across eras</h3>
            <p className="publication-authors">{highlightAuthor('bhada yun, evgenia taranova, dana feng, renn su, april wang')}</p>
            <p className="publication-venue">chi 2026 workshop on human-ai interaction alignment</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Publications
