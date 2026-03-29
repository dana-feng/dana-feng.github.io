import React, { useEffect, useRef, useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { SiGooglescholar } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const profileImage = 'https://i.imgur.com/ysUtbzn.jpeg'

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz'

function useScramble(target, duration = 1400, trigger = 0) {
  const [text, setText] = useState('')

  useEffect(() => {
    let frame = 0
    const totalFrames = Math.floor(duration / 30)

    const tick = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      setText(
        target.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i / target.length < progress * 1.4) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join('')
      )
      if (frame >= totalFrames) {
        setText(target)
        clearInterval(tick)
      }
    }, 30)

    return () => clearInterval(tick)
  }, [target, trigger])

  return text
}

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function highlightAuthor(text) {
  const parts = text.split(/(dana feng\*?)/i)
  return parts.map((part, index) => {
    if (part.match(/^dana feng\*?$/i)) {
      return <span key={index} className="highlight-author">{part}</span>
    }
    return part
  })
}

const publications = [
  {
    title: 'from junior to senior: allocating agency and navigating professional growth in agentic ai-mediated software engineering',
    url: 'https://programs.sigchi.org/chi/2026/program/content/222340',
    authors: 'dana feng*, bhada yun*, april wang',
    venue: 'chi 2026',
    award: '🏅 best paper honorable mention',
    abstract: 'Juniors enter as AI-natives, seniors adapted mid-career. AI is not just changing how engineers code-it is reshaping who holds agency across work and professional growth. We contribute junior-senior accounts on their usage of agentic AI through a three-phase mixed-methods study: ACTA combined with a Delphi process with 5 seniors, an AI-assisted debugging task with 10 juniors, and blind reviews of junior prompt histories by 5 more seniors. We found that agency in software engineering is primarily constrained by organizational policies rather than individual preferences, with experienced developers maintaining control through detailed delegation while novices struggle between over-reliance and cautious avoidance. Seniors leverage pre-AI foundational instincts to steer modern tools and possess valuable perspectives for mentoring juniors in their early AI-encouraged career development. From synthesis of results, we suggest three practices that focus on preserving agency in software engineering for coding, learning, and mentorship, especially as AI grows increasingly autonomous.'
  },
  {
    title: 'generative ai in knowledge work: design implications for data navigation and decision-making',
    url: 'https://programs.sigchi.org/chi/2025/program/content/188449',
    authors: 'bhada yun*, dana feng*, ace chen, afshin nikzad, niloufar salehi',
    venue: 'chi 2025',
    award: '🏅 best paper honorable mention',
    abstract: "Our study of 20 knowledge workers revealed a common challenge: the difficulty of synthesizing unstructured information scattered across multiple platforms to make informed decisions. Drawing on their vision of an ideal knowledge synthesis tool, we developed Yodeai, an AI-enabled system, to explore both the opportunities and limitations of AI in knowledge work. Through a user study with 16 product managers, we identified three key requirements for Generative AI in knowledge work: adaptable user control, transparent collaboration mechanisms, and the ability to integrate background knowledge with external information. However, we also found significant limitations, including overreliance on AI, user isolation, and contextual factors outside the AI's reach.As AI tools become increasingly prevalent in professional settings, we propose design principles that emphasize adaptability to diverse workflows, accountability in personal and collaborative contexts, and context- aware interoperability to guide the development of human - centered AI systems for product managers and knowledge workers."
  },
  {
    title: 'ai phenomenology for understanding human-ai experiences across eras',
    url: 'https://arxiv.org/pdf/2603.09020',
    authors: 'bhada yun, evgenia taranova, dana feng, renn su, april wang',
    venue: 'chi 2026 workshop on human-ai interaction alignment',
    award: null,
    abstract: `There is no 'ordinary' when it comes to AI. The human-AI experience is extraordinarily complex and specific to each person, yet dominant measures such as usability scales and engagement metrics flatten away nuance. We argue for AI phenomenology: a research stance that asks "How did it feel?" beyond the standard questions of "How well did it perform?" when interacting with AI systems. AI phenomenology acts as a paradigm for bidirectional human-AI alignment as it foregrounds users' first-person perceptions and interpretations of AI systems over time. We motivate AI phenomenology as a framework that captures how alignment is experienced, negotiated, and updated between users and AI systems. Tracing a lineage from Husserl through postphenomenology to Actor-Network Theory, and grounding our argument in three studies-two longitudinal studies with "Day", an AI companion, and a multi-method study of agentic AI in software engineering-we contribute a set of replicable methodological toolkits for conducting AI phenomenology research: instruments for capturing lived experience across personal and professional contexts, three design concepts (translucent design, agency-aware value alignment, temporal co-evolution tracking), and a concrete research agenda. We offer this toolkit not as a new paradigm but as a practical scaffold that researchers can adapt as AI systems-and the humans who live alongside them-continue to co-evolve.`
  }
]

function PublicationItem({ pub }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="publication-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="publication-title">
        <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.title}</a>
      </h3>
      <p className="publication-authors">{highlightAuthor(pub.authors)}</p>
      <p className="publication-venue">{pub.venue}</p>
      {pub.award && <p className="publication-award">{pub.award}</p>}
      <AnimatePresence>
        {hovered && (
          <motion.p
            className="publication-abstract"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {pub.abstract}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const artItems = [
  {
    src: 'https://i.imgur.com/QlRLdEt.png',
    alt: 'artwork by Dana Feng for Salswee',
    label: 'salswee',
    href: 'https://salswee.com/pages/about',
    description: 'artwork featured on their website and social media',
  },
  {
    src: 'https://i.imgur.com/mmkhYmK.jpeg',
    alt: 'artwork by Dana Feng for Kuih Cafe',
    label: 'kuih cafe',
    href: 'https://www.instagram.com/p/DUuB0PEDoR1/?hl=en&img_index=1',
    description: 'pastry boxes, stickers, and wall art',
  },
  {
    src: 'https://i.imgur.com/fFhrGHm.jpeg',
    alt: 'artwork by Dana Feng for Duo Cafe',
    label: 'duo cafe',
    href: 'https://www.instagram.com/p/DNlSQxXNfZa/?hl=en',
    description: 'large menu prints that hang in their shop',
  },
]

function ArtItem({ item, onImageClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="art-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={item.src}
        alt={item.alt}
        className="art-card-img"
        onClick={() => onImageClick(item)}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        style={{ cursor: 'none' }}
      />
      <div className="art-card-body">
        <h3 className="art-card-title">
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="highlight">{item.label}</a>
        </h3>
        <AnimatePresence>
          {hovered && (
            <motion.p
              className="art-card-description"
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 6 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              {item.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ArtGrid() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (lightbox === null) return
    const close = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [lightbox])

  return (
    <>
      <div className="art-cards-grid">
        {artItems.map((item, i) => (
          <ArtItem key={i} item={item} onImageClick={setLightbox} />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              className="lightbox-img"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ResearchInterests() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="publication-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="publication-award" style={{ textAlign: 'center' }}>research interests</p>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="publication-abstract"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ marginBottom: 10 }}>
              i aim to understand not only how tools are built, but also why they are built and how they, in turn, shape the people who use them. as someone who actively works with and is affected by rapidly evolving technologies (especially ai), i am attentive to the ways these tools influence how knowledge workers collaborate, learn, and develop expertise. this includes both their benefits and their unintended consequences, such as shifts in agency, increased reliance or cognitive offloading, or the amplification and mitigation of challenges like imposter syndrome.
            </p>
            <p style={{ marginBottom: 10 }}>
              i aim to bridge academia and industry by grounding research in the lived realities of knowledge workers while seeing how we can make improvements. my goal is to both study and build systems that meaningfully support human development, rather than simply optimizing for efficiency.
            </p>
            <p style={{ marginBottom: 8 }}>some questions i've been thinking about lately:</p>
            <ul className="research-blurb-list">
              <li>how can we increase feelings of accomplishment, agency, and meaningful contribution when using ai for coding?</li>
              <li>what kinds of systems can support the development of foundational skills, even when ai is capable of performing the underlying tasks?</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProfilePicture() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -10, y: dx * 10 })
  }

  return (
    <motion.div
      ref={ref}
      className="profile-picture-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
    >
      <img src={profileImage} alt="dana feng" className="profile-picture" />
    </motion.div>
  )
}

function About() {
  const [scrambleTrigger, setScrambleTrigger] = useState(0)
  const scrambledName = useScramble('dana feng', 1400, scrambleTrigger)

  return (
    <motion.main
      className="about-container"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >

      {/* About Section */}
      <div id="about" className="about-content">
        <h1
          className="section-heading"
          onMouseEnter={() => setScrambleTrigger(t => t + 1)}
          style={{ cursor: 'none' }}
        >
          {scrambledName}
        </h1>
        <FadeIn delay={0.1}>
          <div className="profile-section">
            <ProfilePicture />
            <div className="social-links">
              <a href="mailto:danafeng308@gmail.com" className="social-link"><MdEmail /></a>
              <a href="https://scholar.google.com/citations?user=m4FSnfcAAAAJ&hl=en&authuser=1&oi=ao" target="_blank" rel="noopener noreferrer" className="social-link"><SiGooglescholar /></a>
              <a href="https://www.linkedin.com/in/dana-feng/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-section">
            <p className="about-text">
              hi! i'm dana feng 🌻, an independent human-computer interaction (hci) researcher and software engineer (at <a href="https://www.twosigma.com/" target="_blank" rel="noopener noreferrer">two sigma</a>), based in nyc. in my free time, i'm also an artist / illustrator, and have created work for various nyc cafes and bakeries.
            </p>

            <p className="about-text">
              my research interests lie in <span className="highlight">interaction design</span>, <span className="highlight">information synthesis</span>, <span className="highlight">socio-technical systems</span>, and <span className="highlight">social computing</span>.  I am particularly interested in building and evaluating new and existing technological systems, practices, and interfaces within knowledge work contexts.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Publications Section */}
      <div className="about-section-divider" />
      <div id="publications" className="publications-content">
        <FadeIn>
          <h2 className="section-heading">publications</h2>
        </FadeIn>

        <div className="publications-list">
          {publications.map((pub, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <PublicationItem pub={pub} />
            </FadeIn>
          ))}

          <FadeIn delay={0.24}>
            <ResearchInterests />
          </FadeIn>
        </div>
      </div>

      {/* Art Section */}
      <div className="about-section-divider" />
      <div id="art" className="art-content">
        <FadeIn>
          <h2 className="section-heading">
            <a href="https://danascorner.vercel.app/" target="_blank" rel="noopener noreferrer" className="section-heading-link">art</a>
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <ArtGrid />
        </FadeIn>
      </div>

    </motion.main>
  )
}

export default About
