import React, { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

const slides = [
  { src: '/assets/app/dashboard.png',    label: 'Dashboard',    desc: 'Ringkasan bisnis harian' },
  { src: '/assets/app/laporan.png',      label: 'Laporan',      desc: 'Laba rugi lengkap + grafik' },
  { src: '/assets/app/produk.png',       label: 'Produk & HPP', desc: 'Resep + kalkulasi otomatis' },
  { src: '/assets/app/penjualan.png',    label: 'Penjualan',    desc: 'Riwayat transaksi & margin' },
  { src: '/assets/app/bahan-baku.png',   label: 'Bahan Baku',   desc: 'Stok & harga rata-rata' },
  { src: '/assets/app/pembelian.png',    label: 'Pembelian',    desc: 'Histori pembelian bahan' },
  { src: '/assets/app/pengeluaran.png',  label: 'Pengeluaran',  desc: 'Biaya operasional tercatat' },
]

const len = slides.length

function mod(n, m) { return ((n % m) + m) % m }

export default function AppSlider() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)            // 1 = forward, -1 = backward
  const [animating, setAnimating] = useState(false)
  const autoRef  = useRef(null)

  // Refs for the three visible frames
  const prevRef  = useRef(null)
  const mainRef  = useRef(null)
  const nextRef  = useRef(null)
  const captRef  = useRef(null)

  // ---------- animate transition ----------
  const animateTo = useCallback((newIdx, direction) => {
    if (animating) return
    setAnimating(true)
    clearInterval(autoRef.current)

    const DIST   = direction > 0 ? '-6%' : '6%'
    const DIST_IN = direction > 0 ? '6%' : '-6%'

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(newIdx)
        setAnimating(false)
        // Reset transforms so next render starts clean
        gsap.set([prevRef.current, mainRef.current, nextRef.current, captRef.current], { clearProps: 'all' })
      },
    })

    // Main exits
    tl.to(mainRef.current, {
      opacity: 0,
      x: DIST,
      scale: 0.96,
      duration: 0.38,
      ease: 'power2.inOut',
    }, 0)

    // Caption exits
    tl.to(captRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.22,
      ease: 'power2.in',
    }, 0)

    // Side preview on destination side: grow toward center
    const sideRef = direction > 0 ? nextRef : prevRef
    tl.to(sideRef.current, {
      opacity: 1,
      scale: 1.04,
      filter: 'blur(0px)',
      duration: 0.38,
      ease: 'power2.inOut',
    }, 0)

    // New main enters
    tl.fromTo(mainRef.current,
      { opacity: 0, x: DIST_IN, scale: 0.96 },
      { opacity: 1, x: '0%', scale: 1, duration: 0.46, ease: 'expo.out' },
      0.28
    )

    // Caption enters
    tl.fromTo(captRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.34, ease: 'power3.out' },
      0.46
    )
  }, [animating])

  const goNext = useCallback(() => {
    if (animating) return
    const n = mod(current + 1, len)
    setDir(1)
    animateTo(n, 1)
  }, [current, animating, animateTo])

  const goPrev = useCallback(() => {
    if (animating) return
    const n = mod(current - 1, len)
    setDir(-1)
    animateTo(n, -1)
  }, [current, animating, animateTo])

  const goTo = useCallback((idx) => {
    if (animating || idx === current) return
    const d = idx > current ? 1 : -1
    setDir(d)
    animateTo(idx, d)
  }, [current, animating, animateTo])

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(goNext, 4000)
    return () => clearInterval(autoRef.current)
  }, [goNext])

  const prevIdx = mod(current - 1, len)
  const nextIdx = mod(current + 1, len)

  // ─────────────────────────────────────────
  return (
    <div style={{ width: '100%', userSelect: 'none' }}>

      {/* ── 3-SLOT TRACK ── */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr 1fr',
        gap: '12px',
        alignItems: 'center',
      }}>

        {/* ── PREV PREVIEW ── */}
        <div
          ref={prevRef}
          onClick={goPrev}
          style={{
            cursor: 'pointer',
            borderRadius: '10px',
            overflow: 'hidden',
            opacity: 0.32,
            filter: 'blur(2.5px)',
            transform: 'scale(0.92)',
            transformOrigin: 'right center',
            transition: 'opacity 0.25s, transform 0.25s',
            boxShadow: '0 4px 16px rgba(27,18,8,0.12)',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.filter = 'blur(1.5px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.32'; e.currentTarget.style.filter = 'blur(2.5px)' }}
        >
          <img
            src={slides[prevIdx].src}
            alt={slides[prevIdx].label}
            style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16/10' }}
          />
        </div>

        {/* ── MAIN SLIDE ── */}
        <div style={{ position: 'relative' }}>
          {/* Browser chrome — no URL bar */}
          <div style={{
            background: '#1B1208',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 28px 72px rgba(27,18,8,0.36), 0 6px 20px rgba(27,18,8,0.2)',
            border: '1px solid rgba(196,154,63,0.18)',
          }}>
            {/* Title bar (traffic lights only) */}
            <div style={{
              background: '#2A1A0C',
              padding: '9px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {['#FF6057','#FEBC2E','#28C840'].map((c, i) => (
                <span key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />
              ))}
            </div>

            {/* Screenshot */}
            <div ref={mainRef} style={{ lineHeight: 0, background: '#F4EDE0', position: 'relative' }}>
              <img
                key={current}
                src={slides[current].src}
                alt={slides[current].label}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              {/* Bottom vignette */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px',
                background: 'linear-gradient(to top, rgba(27,18,8,0.2), transparent)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Caption */}
            <div ref={captRef} style={{
              background: '#2A1A0C',
              padding: '11px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '13px', fontWeight: 700, color: '#F4EDE0',
                }}>
                  {slides[current].label}
                </span>
                <span style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '11px', color: 'rgba(255,255,255,0.35)',
                }}>
                  {slides[current].desc}
                </span>
              </div>
              <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px', color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.05em',
              }}>
                {String(current + 1).padStart(2,'0')}/{String(len).padStart(2,'0')}
              </span>
            </div>
          </div>

          {/* ── ARROW BUTTONS — overlapping edges ── */}
          <button
            onClick={goPrev}
            aria-label="Sebelumnya"
            style={{
              position: 'absolute', left: '-20px', top: '50%',
              transform: 'translateY(-60%)',
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: 'rgba(27,18,8,0.82)',
              border: '1px solid rgba(196,154,63,0.25)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.18s, transform 0.18s',
              boxShadow: '0 4px 12px rgba(27,18,8,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(-60%) scale(1.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(27,18,8,0.82)'; e.currentTarget.style.transform = 'translateY(-60%) scale(1)' }}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={goNext}
            aria-label="Berikutnya"
            style={{
              position: 'absolute', right: '-20px', top: '50%',
              transform: 'translateY(-60%)',
              width: '40px', height: '40px',
              borderRadius: '50%',
              background: 'rgba(27,18,8,0.82)',
              border: '1px solid rgba(196,154,63,0.25)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.18s, transform 0.18s',
              boxShadow: '0 4px 12px rgba(27,18,8,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(-60%) scale(1.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(27,18,8,0.82)'; e.currentTarget.style.transform = 'translateY(-60%) scale(1)' }}
          >
            <ChevronRight />
          </button>
        </div>

        {/* ── NEXT PREVIEW ── */}
        <div
          ref={nextRef}
          onClick={goNext}
          style={{
            cursor: 'pointer',
            borderRadius: '10px',
            overflow: 'hidden',
            opacity: 0.32,
            filter: 'blur(2.5px)',
            transform: 'scale(0.92)',
            transformOrigin: 'left center',
            transition: 'opacity 0.25s, transform 0.25s',
            boxShadow: '0 4px 16px rgba(27,18,8,0.12)',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.filter = 'blur(1.5px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.32'; e.currentTarget.style.filter = 'blur(2.5px)' }}
        >
          <img
            src={slides[nextIdx].src}
            alt={slides[nextIdx].label}
            style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16/10' }}
          />
        </div>
      </div>

      {/* ── DOT INDICATORS ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '18px' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? '22px' : '6px',
              height: '6px',
              borderRadius: '99px',
              background: i === current ? '#B5532A' : 'rgba(181,83,42,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Icon components ──
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4EDE0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
