import React, { useEffect, useRef } from 'react'

const FADE_MS = 900
const GOLD = '236, 185, 0'
const TAPER_POINTS = 5

function DrawingCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const strokes = []
    let currentStroke = null
    let drawing = false
    let rafId = null

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function toPoint(clientX, clientY) {
      return { x: clientX, y: clientY }
    }

    function widthAt(i, n, baseWidth) {
      const taperIn = Math.min(1, i / TAPER_POINTS)
      const taperOut = Math.min(1, (n - 1 - i) / TAPER_POINTS)
      return baseWidth * Math.min(taperIn, taperOut) + 0.6
    }

    function pathChunk(chunk) {
      if (chunk.length < 3) {
        ctx.moveTo(chunk[0].x, chunk[0].y)
        ctx.lineTo(chunk[chunk.length - 1].x, chunk[chunk.length - 1].y)
      } else {
        ctx.moveTo(chunk[0].x, chunk[0].y)
        for (let i = 1; i < chunk.length - 1; i++) {
          const midX = (chunk[i].x + chunk[i + 1].x) / 2
          const midY = (chunk[i].y + chunk[i + 1].y) / 2
          ctx.quadraticCurveTo(chunk[i].x, chunk[i].y, midX, midY)
        }
        const last = chunk[chunk.length - 1]
        ctx.lineTo(last.x, last.y)
      }
    }

    function drawStroke(stroke, alpha) {
      const points = stroke.points
      const n = points.length
      if (n < 2) return

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // draw in a few continuous chunks (not per-segment) so round line-caps
      // don't stack into a beaded/circular texture along the stroke
      const chunkCount = Math.min(5, Math.max(1, Math.ceil((n - 1) / 4)))
      const chunkSize = Math.ceil((n - 1) / chunkCount)

      for (let c = 0; c < chunkCount; c++) {
        const startIdx = c * chunkSize
        const endIdx = Math.min(n - 1, startIdx + chunkSize)
        if (endIdx <= startIdx) continue
        const midIdx = Math.floor((startIdx + endIdx) / 2)
        const w = widthAt(midIdx, n, stroke.baseWidth) * stroke.jitter[c % stroke.jitter.length]
        const chunk = points.slice(startIdx, endIdx + 1)

        // faint ink-bleed pass — soft and a touch wider, like ink soaking into paper
        ctx.strokeStyle = `rgba(${GOLD}, ${0.22 * alpha})`
        ctx.shadowColor = `rgba(${GOLD}, ${0.3 * alpha})`
        ctx.shadowBlur = 4
        ctx.lineWidth = w * 1.8
        ctx.beginPath()
        pathChunk(chunk)
        ctx.stroke()

        // crisp core line
        ctx.strokeStyle = `rgba(${GOLD}, ${0.85 * alpha})`
        ctx.shadowBlur = 0.5
        ctx.lineWidth = w
        ctx.beginPath()
        pathChunk(chunk)
        ctx.stroke()
      }

      ctx.shadowBlur = 0
    }

    function render(now) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = strokes.length - 1; i >= 0; i--) {
        const stroke = strokes[i]
        let alpha = 1
        if (!stroke.active) {
          const age = now - stroke.finishedAt
          if (age >= FADE_MS) {
            strokes.splice(i, 1)
            continue
          }
          alpha = 1 - age / FADE_MS
        }
        drawStroke(stroke, alpha)
      }

      rafId = requestAnimationFrame(render)
    }

    function start(clientX, clientY) {
      drawing = true
      currentStroke = {
        points: [toPoint(clientX, clientY)],
        active: true,
        finishedAt: null,
        baseWidth: 0.9 + Math.random() * 0.7,
        jitter: Array.from({ length: 5 }, () => 0.8 + Math.random() * 0.4),
      }
      strokes.push(currentStroke)
    }

    function move(clientX, clientY) {
      if (!drawing || !currentStroke) return
      currentStroke.points.push(toPoint(clientX, clientY))
    }

    function end() {
      if (!drawing) return
      drawing = false
      if (currentStroke) {
        currentStroke.active = false
        currentStroke.finishedAt = performance.now()
      }
      currentStroke = null
    }

    function onMouseDown(e) {
      start(e.clientX, e.clientY)
      e.preventDefault()
    }
    function onMouseMove(e) { move(e.clientX, e.clientY) }
    function onMouseUp() { end() }
    function onTouchStart(e) { const t = e.touches[0]; if (t) start(t.clientX, t.clientY) }
    function onTouchMove(e) { const t = e.touches[0]; if (t) move(t.clientX, t.clientY) }
    function onTouchEnd() { end() }

    // Touch-drag is also how you scroll, so on touch devices a single-finger
    // drag can't tell "scroll" and "draw" apart — only draw on devices with a
    // real pointer (mouse/trackpad), same gate the custom cursor already uses.
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches

    window.addEventListener('resize', resize)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseleave', onMouseUp)
    if (hasFinePointer) {
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd)
    }

    resize()
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseleave', onMouseUp)
      if (hasFinePointer) {
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="drawing-canvas" />
}

export default DrawingCanvas
