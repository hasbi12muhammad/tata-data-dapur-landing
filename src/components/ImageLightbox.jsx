/**
 * ImageLightbox — fullscreen zoom modal for AppSlider
 * Features:
 *  - GSAP scale+fade open/close animation
 *  - Pinch-to-zoom & scroll-to-zoom
 *  - Touch swipe left/right to navigate
 *  - Swipe down to dismiss
 *  - Tap outside to close
 *  - Keyboard: arrows + Escape
 *  - Mobile-first, 60fps
 */
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

export default function ImageLightbox({ slides, startIndex, onClose }) {
  const [activeIdx, setActiveIdx] = useState(startIndex)
  const [showReset, setShowReset] = useState(false)

  const overlayRef  = useRef(null)
  const containerRef = useRef(null)
  const imgWrapRef  = useRef(null)

  // Zoom / pan state in refs — mutated directly for 60fps (no re-render)
  const zoomRef   = useRef(1)
  const offsetRef = useRef({ x: 0, y: 0 })

  // Stable refs to latest close/activeIdx for event closures
  const onCloseRef    = useRef(onClose)
  const activeIdxRef  = useRef(activeIdx)
  useEffect(() => { onCloseRef.current = onClose },    [onClose])
  useEffect(() => { activeIdxRef.current = activeIdx }, [activeIdx])

  const N = slides.length
  const wrap = (i) => ((i % N) + N) % N

  // ── helpers ──────────────────────────────────────────────────────────
  const applyTransform = useCallback(() => {
    if (!imgWrapRef.current) return
    const z = zoomRef.current
    const { x, y } = offsetRef.current
    imgWrapRef.current.style.transform = `scale(${z}) translate(${x}px, ${y}px)`
  }, [])

  const resetZoom = useCallback((animate = true) => {
    zoomRef.current = 1
    offsetRef.current = { x: 0, y: 0 }
    setShowReset(false)
    if (imgWrapRef.current) {
      if (animate) {
        imgWrapRef.current.style.transition = 'transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94)'
        imgWrapRef.current.style.transform = 'scale(1) translate(0px, 0px)'
        setTimeout(() => {
          if (imgWrapRef.current) imgWrapRef.current.style.transition = 'none'
        }, 300)
      } else {
        imgWrapRef.current.style.transition = 'none'
        applyTransform()
      }
    }
  }, [applyTransform])

  const close = useCallback(() => {
    gsap.to(containerRef.current, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.22, ease: 'power2.in',
      onComplete: () => onCloseRef.current(),
    })
  }, [])

  const goTo = useCallback((idx) => {
    const next = wrap(idx)
    setActiveIdx(next)
    resetZoom(false)
  }, [wrap, resetZoom])

  // ── open animation ───────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.26, ease: 'power2.out' }
    )
    gsap.fromTo(containerRef.current,
      { scale: 0.84, opacity: 0, y: 24 },
      { scale: 1, opacity: 1, y: 0, duration: 0.42, ease: 'expo.out' }
    )
    return () => { document.body.style.overflow = '' }
  }, [])

  // ── slide change animation ───────────────────────────────────────────
  useLayoutEffect(() => {
    if (!imgWrapRef.current) return
    gsap.fromTo(imgWrapRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.28, ease: 'expo.out' }
    )
  }, [activeIdx])

  // ── keyboard ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(activeIdxRef.current + 1)
      else if (e.key === 'ArrowLeft')  goTo(activeIdxRef.current - 1)
      else if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, close])

  // ── touch events (non-passive for pinch preventDefault) ──────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let t = { startX: 0, startY: 0, lastX: 0, lastY: 0, pinchDist: 0, moved: false }

    const pinchDist = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const onStart = (e) => {
      if (e.touches.length === 2) {
        t.pinchDist = pinchDist(e.touches)
      } else {
        t.startX = t.lastX = e.touches[0].clientX
        t.startY = t.lastY = e.touches[0].clientY
        t.moved = false
      }
    }

    const onMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        const dist = pinchDist(e.touches)
        zoomRef.current = Math.min(4, Math.max(1, zoomRef.current * (dist / t.pinchDist)))
        t.pinchDist = dist
        applyTransform()
        setShowReset(zoomRef.current > 1.05)
        return
      }
      t.moved = true
      if (zoomRef.current > 1) {
        e.preventDefault()
        const dx = (e.touches[0].clientX - t.lastX) / zoomRef.current
        const dy = (e.touches[0].clientY - t.lastY) / zoomRef.current
        offsetRef.current.x += dx
        offsetRef.current.y += dy
        applyTransform()
      }
      t.lastX = e.touches[0].clientX
      t.lastY = e.touches[0].clientY
    }

    const onEnd = () => {
      if (!t.moved) return
      const dx = t.lastX - t.startX
      const dy = t.lastY - t.startY
      if (zoomRef.current <= 1.05) {
        if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy)) {
          goTo(activeIdxRef.current + (dx < 0 ? 1 : -1))
        } else if (dy > 90 && Math.abs(dx) < 50) {
          close()
        }
      }
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove',  onMove,  { passive: false })
    el.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [applyTransform, goTo, close])

  // ── scroll-to-zoom (desktop) ─────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      zoomRef.current = Math.min(4, Math.max(1, zoomRef.current * (e.deltaY > 0 ? 0.88 : 1.13)))
      applyTransform()
      setShowReset(zoomRef.current > 1.05)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [applyTransform])

  // ── render ───────────────────────────────────────────────────────────
  const slide = slides[activeIdx]

  return createPortal(
    <div
      ref={overlayRef}
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(8,5,2,0.93)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      {/* ── top bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 3, pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.4)',
          background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: '99px',
        }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); close() }}
          style={{
            pointerEvents: 'all',
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.18s, color 0.18s',
            outline: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── image container ── */}
      <div
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '480px',
          borderRadius: '18px', overflow: 'hidden',
          background: '#1B1208',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(196,154,63,0.14)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Traffic lights */}
        <div style={{
          background: '#2A1A0C', padding: '9px 14px',
          display: 'flex', alignItems: 'center', gap: '6px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {['#FF6057', '#FEBC2E', '#28C840'].map((c, i) => (
            <span key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block' }} />
          ))}
        </div>

        {/* Image — ref for zoom transform */}
        <div style={{ overflow: 'hidden', lineHeight: 0, background: '#F4EDE0', cursor: 'zoom-in' }}>
          <div
            ref={imgWrapRef}
            style={{ transformOrigin: 'center center', willChange: 'transform' }}
          >
            <img
              src={slide.src}
              alt={slide.label}
              draggable={false}
              style={{ width: '100%', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
            />
          </div>
        </div>

        {/* Caption */}
        <div style={{
          background: '#2A1A0C', padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          minHeight: '52px',
        }}>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: '#F4EDE0' }}>
              {slide.label}
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>
              {slide.desc}
            </div>
          </div>
          {showReset && (
            <button
              onClick={(e) => { e.stopPropagation(); resetZoom() }}
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', fontWeight: 600,
                color: '#E8845A', background: 'rgba(181,83,42,0.1)',
                border: '1px solid rgba(181,83,42,0.25)', borderRadius: '99px',
                padding: '4px 12px', cursor: 'pointer', outline: 'none',
                transition: 'background 0.18s',
              }}
            >
              Reset zoom
            </button>
          )}
        </div>
      </div>

      {/* ── dot indicators ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', gap: '6px', marginTop: '20px' }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIdx ? '22px' : '6px', height: '6px',
              borderRadius: '99px', border: 'none', cursor: 'pointer', padding: 0,
              background: i === activeIdx ? '#B5532A' : 'rgba(255,255,255,0.2)',
              transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
            }}
          />
        ))}
      </div>

      {/* ── desktop nav arrows ── */}
      {[
        { side: 'left',  pts: '15 18 9 12 15 6', delta: -1 },
        { side: 'right', pts: '9 18 15 12 9 6',  delta: +1 },
      ].map(({ side, pts, delta }) => (
        <button
          key={side}
          onClick={(e) => { e.stopPropagation(); goTo(activeIdx + delta) }}
          style={{
            position: 'absolute', [side]: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)',
            color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.18s, color 0.18s', zIndex: 2, outline: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={pts} />
          </svg>
        </button>
      ))}

      {/* ── hint ── */}
      <div style={{
        position: 'absolute', bottom: '14px',
        fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px',
        color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em', textAlign: 'center',
        pointerEvents: 'none',
      }}>
        Swipe untuk navigasi · Pinch / scroll untuk zoom
      </div>
    </div>,
    document.body
  )
}
