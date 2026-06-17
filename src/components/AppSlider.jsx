/**
 * AppSlider — clean GSAP crossfade carousel
 *
 * Architecture:
 *  - currentRef (useRef) = source of truth for index, never causes re-render
 *  - animatingRef (useRef) = lock flag, never causes re-render
 *  - React state (displayIdx) only updates AFTER animation ends → triggers side-preview refresh
 *  - GSAP animates the img DOM node's opacity directly (no React re-render during flight)
 *  → zero glitch, zero conflict
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ImageLightbox from './ImageLightbox'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

const SLIDES = [
  { src: '/assets/app/dashboard.png',    label: 'Dashboard',    desc: 'Ringkasan bisnis harian' },
  { src: '/assets/app/laporan.png',      label: 'Laporan',      desc: 'Laba rugi lengkap + grafik' },
  { src: '/assets/app/produk.png',       label: 'Produk & HPP', desc: 'Resep + kalkulasi otomatis' },
  { src: '/assets/app/penjualan.png',    label: 'Penjualan',    desc: 'Riwayat transaksi & margin' },
  { src: '/assets/app/bahan-baku.png',   label: 'Bahan Baku',   desc: 'Stok & harga rata-rata' },
  { src: '/assets/app/pembelian.png',    label: 'Pembelian',    desc: 'Histori pembelian bahan' },
  { src: '/assets/app/pengeluaran.png',  label: 'Pengeluaran',  desc: 'Biaya operasional tercatat' },
]
const N = SLIDES.length
const wrap = (i) => ((i % N) + N) % N

export default function AppSlider() {
  const isMobile = useIsMobile()

  // displayIdx drives React rendering (side previews + dots + caption)
  const [displayIdx, setDisplayIdx] = useState(0)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Refs — never trigger re-renders
  const currentRef   = useRef(0)
  const animatingRef = useRef(false)
  const autoRef      = useRef(null)

  // DOM refs
  const sliderRootRef = useRef(null)
  const imgRef     = useRef(null)
  const captRef    = useRef(null)
  const prevImgRef = useRef(null)
  const nextImgRef = useRef(null)

  // ─── core transition ───────────────────────────────────────────────
  const transitionTo = useCallback((targetIdx) => {
    if (animatingRef.current) return
    if (targetIdx === currentRef.current) return

    animatingRef.current = true
    const img  = imgRef.current
    const capt = captRef.current
    if (!img) { animatingRef.current = false; return }

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false
      },
    })

    // 1. Fade out current main image + caption
    tl.to(img, {
      opacity: 0,
      scale: 0.97,
      duration: 0.28,
      ease: 'power2.in',
    }, 0)
    if (capt) tl.to(capt, { opacity: 0, y: 4, duration: 0.2, ease: 'power2.in' }, 0)

    // 2. Mid-point: swap src + update state (React re-render happens here — img already invisible)
    tl.call(() => {
      currentRef.current = targetIdx
      img.src = SLIDES[targetIdx].src
      img.alt = SLIDES[targetIdx].label
      setDisplayIdx(targetIdx) // triggers side preview + dot + caption update
    })

    // 3. Fade in new image + caption
    tl.fromTo(img,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.42, ease: 'expo.out' },
      '+=0.02'
    )
    if (capt) tl.fromTo(capt,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out' },
      '<0.08'
    )
  }, [])

  // ─── navigation helpers ────────────────────────────────────────────
  const goNext = useCallback(() => {
    transitionTo(wrap(currentRef.current + 1))
  }, [transitionTo])

  const goPrev = useCallback(() => {
    transitionTo(wrap(currentRef.current - 1))
  }, [transitionTo])

  const goTo = useCallback((idx) => {
    transitionTo(wrap(idx))
  }, [transitionTo])

  // ─── auto-play ────────────────────────────────────────────────────
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(goNext, 4200)
  }, [goNext])

  useEffect(() => {
    resetAuto()
    return () => clearInterval(autoRef.current)
  }, [resetAuto])

  const handleArrow = useCallback((fn) => {
    fn()
    resetAuto()
  }, [resetAuto])

  // ─── touch swipe on mobile ─────────────────────────────────────────
  useEffect(() => {
    const el = sliderRootRef.current
    if (!el) return
    let startX = 0
    const onStart = (e) => { startX = e.touches[0].clientX }
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 48) handleArrow(dx < 0 ? goNext : goPrev)
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [handleArrow, goNext, goPrev])

  // ─── derived ──────────────────────────────────────────────────────
  const prevIdx = wrap(displayIdx - 1)
  const nextIdx = wrap(displayIdx + 1)

  // ─── render ───────────────────────────────────────────────────────
  return (
    <div ref={sliderRootRef} className="app-slider-root" style={{ width: '100%', userSelect: 'none' }}>

      {/* ── 3-COLUMN TRACK ─────────────────────────────────────── */}
      <div className="app-slider-track" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 7fr 1fr',
        gap: '14px',
        alignItems: 'center',
      }}>

        {/* LEFT PREVIEW */}
        <PreviewPane
          ref={prevImgRef}
          src={SLIDES[prevIdx].src}
          alt={SLIDES[prevIdx].label}
          onClick={() => handleArrow(goPrev)}
          origin="right center"
        />

        {/* MAIN FRAME */}
        <div style={{ position: 'relative' }}>
          <div style={{
            background: '#1B1208',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(27,18,8,0.38), 0 8px 24px rgba(27,18,8,0.22)',
            border: '1px solid rgba(196,154,63,0.2)',
          }}>
            {/* Title bar — traffic lights only, no URL */}
            <div style={{
              background: '#2A1A0C',
              padding: '9px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {['#FF6057','#FEBC2E','#28C840'].map((c, i) => (
                <span key={i} style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: c, display: 'inline-block', flexShrink: 0,
                }} />
              ))}
            </div>

            {/* Screenshot — single stable DOM node, src swapped by GSAP */}
            <div
              style={{ lineHeight: 0, background: '#F4EDE0', position: 'relative', cursor: isMobile ? 'default' : 'zoom-in' }}
              onClick={() => setLightboxOpen(true)}
              title="Klik untuk perbesar"
            >
              <img
                ref={imgRef}
                src={SLIDES[0].src}
                alt={SLIDES[0].label}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              {/* Zoom hint badge */}
              {(
              <div style={{
                position: 'absolute', bottom: '10px', right: '10px',
                background: 'rgba(27,18,8,0.65)', backdropFilter: 'blur(6px)',
                borderRadius: '8px', padding: '5px 8px',
                display: 'flex', alignItems: 'center', gap: '5px',
                pointerEvents: 'none',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Perbesar</span>
              </div>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '56px',
                background: 'linear-gradient(to top, rgba(27,18,8,0.22), transparent)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Caption */}
            <div ref={captRef} style={{
              background: '#2A1A0C',
              padding: '12px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: '#F4EDE0' }}>
                  {SLIDES[displayIdx].label}
                </span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.38)' }}>
                  {SLIDES[displayIdx].desc}
                </span>
              </div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>
                {String(displayIdx + 1).padStart(2,'0')}/{String(N).padStart(2,'0')}
              </span>
            </div>
          </div>

          {/* ARROW — LEFT */}
          <ArrowBtn side="left" onClick={() => handleArrow(goPrev)} />

          {/* ARROW — RIGHT */}
          <ArrowBtn side="right" onClick={() => handleArrow(goNext)} />
        </div>

        {/* RIGHT PREVIEW */}
        <PreviewPane
          ref={nextImgRef}
          src={SLIDES[nextIdx].src}
          alt={SLIDES[nextIdx].label}
          onClick={() => handleArrow(goNext)}
          origin="left center"
        />
      </div>

      {/* DOT INDICATORS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '18px' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAuto() }}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === displayIdx ? '22px' : '6px',
              height: '6px',
              borderRadius: '99px',
              background: i === displayIdx ? '#B5532A' : 'rgba(181,83,42,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
            }}
          />
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <ImageLightbox
          slides={SLIDES}
          startIndex={displayIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}

/* ── Sub-components ──────────────────────────────────────────────── */

const PreviewPane = React.forwardRef(({ src, alt, onClick, origin }, ref) => (
  <div
    onClick={onClick}
    style={{
      cursor: 'pointer',
      borderRadius: '10px',
      overflow: 'hidden',
      opacity: 0.28,
      filter: 'blur(3px)',
      transform: 'scale(0.88)',
      transformOrigin: origin,
      transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
      boxShadow: '0 4px 20px rgba(27,18,8,0.15)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.opacity = '0.52'
      e.currentTarget.style.filter = 'blur(1px)'
      e.currentTarget.style.transform = 'scale(0.92)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.opacity = '0.28'
      e.currentTarget.style.filter = 'blur(3px)'
      e.currentTarget.style.transform = 'scale(0.88)'
    }}
  >
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16/10' }}
    />
  </div>
))
PreviewPane.displayName = 'PreviewPane'

function ArrowBtn({ side, onClick }) {
  const isLeft = side === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Sebelumnya' : 'Berikutnya'}
      className={isLeft ? 'app-slider-arrow-left' : 'app-slider-arrow-right'}
      style={{
        position: 'absolute',
        [isLeft ? 'left' : 'right']: '-18px',
        top: '50%',
        transform: 'translateY(-65%)',
        width: '38px', height: '38px',
        borderRadius: '50%',
        background: 'rgba(27,18,8,0.85)',
        border: '1px solid rgba(196,154,63,0.28)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        boxShadow: '0 4px 14px rgba(27,18,8,0.35)',
        transition: 'background 0.18s ease, transform 0.18s ease',
        outline: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#B5532A'
        e.currentTarget.style.transform = 'translateY(-65%) scale(1.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(27,18,8,0.85)'
        e.currentTarget.style.transform = 'translateY(-65%) scale(1)'
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="#F4EDE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={isLeft ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
      </svg>
    </button>
  )
}
