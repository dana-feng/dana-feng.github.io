import React from 'react'

// Profile image should be in public folder
const profileImage = '/profile.png'

function About() {
  return (
    <main className="about-container">
      <div className="about-content">
        <div className="profile-section">
          <div className="profile-picture-wrapper">
            <img src={profileImage} alt="dana feng" className="profile-picture" />
          </div>
        </div>
        <div className="text-section">
          <p className="about-text">
            hi! i'm dana, an independent <span className="role-box">hci researcher</span>, <span className="role-box">artist</span>, and <span className="role-box">software engineer</span> (at two sigma), based in nyc!
          </p>
          <p className="about-text">
            my research interests lie in <span className="highlight">interaction design</span>, <span className="highlight">information synthesis</span>, <span className="highlight">socio-technical systems</span>, and <span className="highlight">social computing</span>; coming from an industry perspective, i am interested in research that applies to technology and ai adoption in knowledge work.
          </p>
          <p className="about-text contact">
            for research collaborations, please email me at <span className="highlight">danafeng308 AT gmail.com</span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default About
