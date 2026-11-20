import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { appear, leafPath, sway, tendrilPath } from './vineShapes'

// A little vine that climbs around the rounded corners of whatever it wraps
// (a card, the profile photo frame). It hugs the border, pushes its leaves
// outward so they don't cover the content, grows in when scrolled into view,
// then sways like the vines in the page margins.

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) || 1
}

function seeded(seed) {
  let s = seed % 2147483647 || 1
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// a point on the rounded-rectangle border, walking clockwise from the start
// of the top edge, with the outward-facing normal at that point
function borderPoint(w, h, r, dist) {
  const arc = (Math.PI * r) / 2
  const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 4 * arc
  let s = ((dist % perimeter) + perimeter) % perimeter
  const segments = [
    { len: w - 2 * r, at: (t) => ({ x: r + t, y: 0, nx: 0, ny: -1 }) },
    { len: arc, center: [w - r, r], start: -Math.PI / 2 },
    { len: h - 2 * r, at: (t) => ({ x: w, y: r + t, nx: 1, ny: 0 }) },
    { len: arc, center: [w - r, h - r], start: 0 },
    { len: w - 2 * r, at: (t) => ({ x: w - r - t, y: h, nx: 0, ny: 1 }) },
    { len: arc, center: [r, h - r], start: Math.PI / 2 },
    { len: h - 2 * r, at: (t) => ({ x: 0, y: h - r - t, nx: -1, ny: 0 }) },
    { len: arc, center: [r, r], start: Math.PI },
  ]
  for (const seg of segments) {
    if (s <= seg.len) {
      if (seg.at) return seg.at(s)
      const a = seg.start + s / r
      return { x: seg.center[0] + r * Math.cos(a), y: seg.center[1] + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) }
    }
    s -= seg.len
  }
  return { x: r, y: 0, nx: 0, ny: -1 }
}

function cornerDistance(w, h, r, corner) {
  const arc = (Math.PI * r) / 2
  const marks = [
    w - 2 * r + arc / 2, // top right
    w - 2 * r + (h - 2 * r) + arc * 1.5, // bottom right
    2 * (w - 2 * r) + (h - 2 * r) + arc * 2.5, // bottom left
    2 * (w - 2 * r) + 2 * (h - 2 * r) + arc * 3.5, // top left
  ]
  return marks[corner]
}

const FLOWER_TYPES = ['round', 'daisy', 'four', 'bell', 'cluster']

function pickFlower(rand) {
  return {
    type: FLOWER_TYPES[Math.floor(rand() * FLOWER_TYPES.length)],
    color: 1 + Math.floor(rand() * 4),
    scale: 0.45 + rand() * 0.2,
    turn: rand() * 360,
  }
}

function Flower({ f }) {
  const petal = `vine-petal vine-petal-${f.color}`
  let body
  if (f.type === 'daisy') {
    body = (
      <>
        {Array.from({ length: 8 }, (_, p) => (
          <ellipse key={p} cx="5" cy="0" rx="4.2" ry="1.6" transform={`rotate(${p * 45})`} className={petal} />
        ))}
        <circle r="2.4" className="vine-flower-center" />
      </>
    )
  } else if (f.type === 'four') {
    body = (
      <>
        {[0, 90, 180, 270].map((a) => (
          <ellipse key={a} cx="3.6" cy="0" rx="3.6" ry="2.8" transform={`rotate(${a})`} className={petal} />
        ))}
        <circle r="1.6" className="vine-flower-center" />
      </>
    )
  } else if (f.type === 'bell') {
    body = (
      <>
        <path d="M0 -6 Q0.6 -2 0 0" className="vine-tendril" />
        <path d="M-4 0 C-4 -4 4 -4 4 0 L5 4 L2.5 3 L0 5 L-2.5 3 L-5 4 Z" className={petal} />
      </>
    )
  } else if (f.type === 'cluster') {
    body = (
      <>
        {[[-3.5, -1], [3, -2.5], [0.5, 3.5]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[0, 1, 2, 3, 4].map((p) => (
              <circle key={p} cx={Math.cos((p / 5) * Math.PI * 2) * 2} cy={Math.sin((p / 5) * Math.PI * 2) * 2} r="1.6" className={petal} />
            ))}
            <circle r="1" className="vine-flower-center" />
          </g>
        ))}
      </>
    )
  } else {
    body = (
      <>
        {[0, 1, 2, 3, 4].map((p) => (
          <circle key={p} cx={Math.cos((p / 5) * Math.PI * 2) * 5} cy={Math.sin((p / 5) * Math.PI * 2) * 5} r="3.8" className={petal} />
        ))}
        <circle r="2.8" className="vine-flower-center" />
      </>
    )
  }
  return <g transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.type === 'bell' ? 0 : f.turn.toFixed(0)}) scale(${f.scale.toFixed(2)})`}>{body}</g>
}

function buildVine(w, h, r, from, length, rand, leafScale, bloomChance = 0) {
  const step = 3
  const pts = []
  const leaves = []
  const tendrils = []
  const blooms = []
  let nextLeaf = 6 + rand() * 6
  let side = 1
  for (let d = 0; d <= length; d += step) {
    const p = borderPoint(w, h, r, from + d)
    // wander a little in and out across the border line
    const off = 1.6 * Math.sin(d / 11) + 1
    const x = p.x + p.nx * off
    const y = p.y + p.ny * off
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`)

    if (d >= nextLeaf && d < length - 4) {
      // direction of travel is the normal turned a quarter clockwise
      const tx = -p.ny
      const ty = p.nx
      const outward = side > 0
      const lean = outward ? 0.8 : 0.45
      const dx = tx * Math.cos(lean) + p.nx * (outward ? 1 : -1) * Math.sin(lean)
      const dy = ty * Math.cos(lean) + p.ny * (outward ? 1 : -1) * Math.sin(lean)
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      if (rand() < bloomChance) {
        // a flower sitting just outside the border
        blooms.push({ x: p.x + p.nx * 3, y: p.y + p.ny * 3, ...pickFlower(rand) })
      } else if (rand() < 0.14) {
        tendrils.push({ x, y, angle, side, size: 5 * leafScale })
      } else {
        leaves.push({ x, y, angle, size: (outward ? 6 + rand() * 2.5 : 4 + rand() * 1.5) * leafScale })
      }
      side = rand() < 0.75 ? 1 : -1 // mostly outward, sometimes tucked in
      nextLeaf = d + 10 + rand() * 10
    }
  }
  const tip = borderPoint(w, h, r, from + length)
  const end = { x: tip.x, y: tip.y, ...pickFlower(rand) }
  return { d: `M${pts.join(' L')}`, leaves, tendrils, blooms, end }
}

function VineFrame({ children, seed = 'vine', radius = 8, className = '', blooms = 0.2 }) {
  const ref = useRef(null)
  const [size, setSize] = useState(null)
  const reduceMotion = useReducedMotion()
  const animate = !reduceMotion
  const phoneFlowers = window.matchMedia('(max-width: 768px)').matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const box = el.firstElementChild?.getBoundingClientRect()
      if (box) setSize({ w: box.width, h: box.height })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const vines = useMemo(() => {
    if (!size || size.w < 40) return []
    const { w, h } = size
    const r = Math.min(radius, w / 2, h / 2)
    const rand = seeded(hash(seed))
    const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r
    const corner = Math.floor(rand() * 4)
    const mainLen = perimeter * (0.26 + rand() * 0.1)
    const shortLen = perimeter * (0.1 + rand() * 0.06)
    // leaves read much smaller on a phone, so grow them there
    const phone = window.matchMedia('(max-width: 768px)').matches
    const scale = phone ? 1.5 : w < 220 ? 0.8 : 1
    return [
      { ...buildVine(w, h, r, cornerDistance(w, h, r, corner) - mainLen / 2, mainLen, rand, scale, blooms), flower: true },
      { ...buildVine(w, h, r, cornerDistance(w, h, r, (corner + 2) % 4) - shortLen / 2, shortLen, rand, scale, blooms), flower: blooms > 0 },
    ]
  }, [size, radius, seed, blooms])

  return (
    <div ref={ref} className={`vine-frame ${className}`.trim()}>
      {children}
      {size && (
        <svg className="vine-frame-svg" width={size.w} height={size.h} aria-hidden="true">
          {vines.map((v, vi) => (
            <g key={vi}>
              <motion.path
                d={v.d}
                className="vine-stem vine-frame-stem"
                initial={animate ? { pathLength: 0 } : false}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 3.2, ease: 'easeInOut', delay: vi * 0.6 }}
              />
              {v.leaves.map((l, i) => (
                <g key={`l${i}`} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.angle.toFixed(1)})`}>
                  <g className="vine-leaf-sway" style={sway(i + vi * 5)}>
                    <motion.path
                      d={leafPath(l.size)}
                      className="vine-leaf"
                      {...appear(animate, i + 2)}
                      style={{ originX: 0, originY: 0.5 }}
                    />
                  </g>
                </g>
              ))}
              {v.tendrils.map((t, i) => (
                <g key={`t${i}`} transform={`translate(${t.x.toFixed(1)} ${t.y.toFixed(1)}) rotate(${t.angle.toFixed(1)})`}>
                  <g className="vine-tendril-sway" style={sway(i + 4)}>
                    <motion.path d={tendrilPath(t.size, t.side)} className="vine-tendril" {...appear(animate, i + 3)} style={{ originX: 0, originY: 0.5 }} />
                  </g>
                </g>
              ))}
              {[...v.blooms, ...(v.flower ? [v.end] : [])].map((b, i) => (
                <motion.g key={`f${i}`} {...appear(animate, i + 5)}>
                  <g className="vine-flower-sway" style={sway(vi + i + 9)}>
                    <Flower f={phoneFlowers ? { ...b, scale: b.scale * 1.4 } : b} />
                  </g>
                </motion.g>
              ))}
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}

export default VineFrame
