// Shared shapes and motion for the little vines drawn around the site

const TAU = Math.PI * 2

// a curl that winds inward, like a pea tendril
export function tendrilPath(size, side) {
  const pts = ['M0 0']
  const turns = 1.6
  const steps = 28
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const r = size * (1 - t * 0.85)
    const a = t * turns * TAU
    const x = size * t * 1.2 + r * Math.sin(a) * 0.5
    const y = side * (r * (1 - Math.cos(a)) * 0.5)
    pts.push(`L${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

export function leafPath(size) {
  return `M0 0 C${size * 0.35} ${-size * 0.45} ${size * 0.8} ${-size * 0.4} ${size} 0 C${size * 0.8} ${size * 0.4} ${size * 0.35} ${size * 0.45} 0 0 Z`
}

// leaves and flowers unfurl slowly once the vine reaches them, a little
// staggered so they don't all pop at once
export const appear = (animate, i = 0) => ({
  initial: animate ? { scale: 0, opacity: 0 } : false,
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: (i * 0.37) % 1.4 },
})

// after that they keep swaying and gently swelling, each at its own pace
export const sway = (i) => ({
  animationDuration: `${6 + ((i * 37) % 40) / 10}s`,
  animationDelay: `${-((i * 1.3) % 8)}s`,
})
