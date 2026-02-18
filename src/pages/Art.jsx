import React from 'react'

// Art image should be in public folder
const artImage = '/art.png'

function Art() {
  return (
    <main className="art-container">
      <div className="art-content">
        <div className="art-image-section">
          <div className="art-image-wrapper">
            <img src={artImage} alt="art portfolio" className="art-image" />
          </div>
        </div>
        <div className="art-text-section">


          <div className="art-box">
            <h3 className="art-box-title"><span className="highlight">salswee</span></h3>
            <ul className="art-list">
              <li>artwork featured on their website and social media</li>
            </ul>
          </div>

          <div className="art-box">
            <h3 className="art-box-title"><span className="highlight">duo cafe</span></h3>
            <ul className="art-list">
              <li>large menu prints that hang in their shop</li>
            </ul>
          </div>

          <div className="art-box">
            <h3 className="art-box-title"><span className="highlight">kuih cafe</span></h3>
            <ul className="art-list">
              <li>stickers</li>
              <li>small selection of menu prints</li>
              <li>pastry box designs</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Art
