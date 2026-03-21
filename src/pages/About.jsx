import React from 'react'
import { MdEmail } from 'react-icons/md'
import { SiGooglescholar } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

const profileImage = 'https://i.imgur.com/ysUtbzn.jpeg'

function highlightAuthor(text) {
  const parts = text.split(/(dana feng\*?)/i)
  return parts.map((part, index) => {
    if (part.match(/^dana feng\*?$/i)) {
      return <span key={index} className="highlight-author">{part}</span>
    }
    return part
  })
}

function About() {
  return (
    <main className="about-container">

      {/* About Section */}
      <div id="about" className="about-content">
        <h2 className="section-heading">dana feng</h2>
        <div className="profile-section">
          <div className="profile-picture-wrapper">
            <img src={profileImage} alt="dana feng" className="profile-picture" />
          </div>
          <div className="social-links">
            <a href="mailto:danafeng308@gmail.com" className="social-link"><MdEmail /></a>
            <a href="https://scholar.google.com/citations?user=m4FSnfcAAAAJ&hl=en&authuser=1&oi=ao" target="_blank" rel="noopener noreferrer" className="social-link"><SiGooglescholar /></a>
            <a href="https://www.linkedin.com/in/dana-feng/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
          </div>
        </div>

        <div className="text-section">
          <p className="about-text">
            hi! i'm dana 🌻, an independent human-computer interaction (hci) researcher and software engineer (at <a href="https://www.twosigma.com/" target="_blank" rel="noopener noreferrer">two sigma</a>), based in nyc. in my free time, i’m also an artist / illustrator, and have created work for various nyc cafes and bakeries.
          </p>

          <p className="about-text">
            my research interests lie in <span className="highlight">interaction design</span>, <span className="highlight">information synthesis</span>, <span className="highlight">socio-technical systems</span>, and <span className="highlight">social computing</span>.  I am particularly interested in building and evaluating new and existing technological systems, practices, and interfaces within knowledge work contexts.
          </p>
          <p className="about-text contact">
            i’m actively looking for research collaborations! feel free to reach out at <span className="highlight">danafeng308@gmail.com</span>.
          </p>
        </div>
      </div>

      {/* Publications Section */}
      <div className="about-section-divider" />
      <div id="publications" className="publications-content">
        <h2 className="section-heading">publications</h2>

        <div className="publications-list">
          <div className="publication-item">
            <h3 className="publication-title">
              <a href="https://programs.sigchi.org/chi/2026/program/content/222340" target="_blank" rel="noopener noreferrer">
                from junior to senior: allocating agency and navigating professional growth in agentic ai-mediated software engineering
              </a>
            </h3>
            <p className="publication-authors">{highlightAuthor('dana feng*, bhada yun*, april wang')}</p>
            <p className="publication-venue">chi 2026</p>
            <p className="publication-award">🏅 best paper honorable mention</p>
          </div>

          <div className="publication-item">
            <h3 className="publication-title">
              <a href="https://programs.sigchi.org/chi/2025/program/content/188449" target="_blank" rel="noopener noreferrer">
                generative ai in knowledge work: design implications for data navigation and decision-making
              </a>
            </h3>
            <p className="publication-authors">{highlightAuthor('bhada yun*, dana feng*, ace chen, afshin nikzad, niloufar salehi')}</p>
            <p className="publication-venue">chi 2025</p>
            <p className="publication-award">🏅 best paper honorable mention</p>
          </div>
          <div className="publication-item">
            <h3 className="publication-title">
              <a href="https://arxiv.org/pdf/2603.09020" target="_blank" rel="noopener noreferrer">
                ai phenomenology for understanding human-ai experiences across eras
              </a>
            </h3>
            <p className="publication-authors">{highlightAuthor('bhada yun, evgenia taranova, dana feng, renn su, april wang')}</p>
            <p className="publication-venue">chi 2026 workshop on human-ai interaction alignment</p>
          </div>
          <div className="publication-item research-blurb">
            <h3 className="publication-award" style={{ marginBottom: '12px', textAlign: 'center' }}>research interests</h3>            <p className="publication-authors">
              i am particularly interested not only in how tools are built, but in why they are built and how they, in turn, shape the people who use them. as someone who actively works with and is affected by rapidly evolving technologies (especially ai), i am attentive to the ways these tools influence how knowledge workers collaborate, learn, and develop expertise. this includes both their benefits and their unintended consequences, such as shifts in agency, increased reliance or cognitive offloading, or the amplification and mitigation of challenges like imposter syndrome.
            </p>

            <p className="publication-authors">
              i aim to bridge academia and industry by grounding research in the lived realities of knowledge workers while seeing how we can make improvements. my goal is to both study and build systems that meaningfully support human development, rather than simply optimizing for efficiency.
            </p>

            <p className="publication-authors">
              some questions i've been thinking about lately include:
            </p>

            <ul className="publication-authors research-blurb-list">
              <li>how can we increase feelings of accomplishment, agency, and meaningful contribution when using ai for coding?</li>
              <li>what kinds of systems can support the development of foundational skills, even when ai is capable of performing the underlying tasks?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Art Section */}
      <div className="about-section-divider" />
      <div id="art" className="art-content">
        <h2 className="section-heading">
          <a href="https://danascorner.vercel.app/" target="_blank" rel="noopener noreferrer" className="section-heading-link">art</a>
        </h2>

        <div className="art-grid">
          <img src="https://i.imgur.com/QlRLdEt.png" alt="salswee" className="art-thumb" />
          <img src="https://i.imgur.com/mmkhYmK.jpeg" alt="kuih" className="art-thumb" />
          <img src="https://i.imgur.com/fFhrGHm.jpeg" alt="duo" className="art-thumb" />
        </div>

        <div className="art-text-section">
          <div className="art-box">
            <h3 className="art-box-title">
              <a href="https://salswee.com/" target="_blank" rel="noopener noreferrer" className="art-box-link"><span className="highlight">salswee</span></a>
            </h3>
            <p>artwork featured on their website and social media !!</p>
          </div>
          <div className="art-box">
            <h3 className="art-box-title">
              <a href="https://www.instagram.com/kuihcafe/" target="_blank" rel="noopener noreferrer" className="art-box-link"><span className="highlight">kuih cafe</span></a>
            </h3>
            <p>pastry boxes, stickers, and wall art &lt;3</p>
          </div>
          <div className="art-box">
            <h3 className="art-box-title">
              <a href="https://www.instagram.com/duocafe.nyc/" target="_blank" rel="noopener noreferrer" className="art-box-link"><span className="highlight">duo cafe</span></a>
            </h3>
            <p>large menu prints that hang in their shop :)</p>
          </div>
        </div>
      </div>

    </main>
  )
}

export default About