import React, { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

const slides = [
  { src: '/assets/app/dashboard.png',    label: 'Dashboard',   desc: 'Ringkasan bisnis harian' },
  { src: '/assets/app/laporan.png',      label: 'Laporan',     desc: 'Laba rugi lengkap + grafik' },
  { src: '/assets/app/produk.png',       label: 'Produk & HPP', desc: 'Resep + kalkulasi otomatis' },
  { src: '/assets/app/penjualan.png',    label: 'Penjualan',   desc: 'Riwayat transaksi & margin' },
  { src: '/assets/app/bahan-baku.png',   label: 'Bahan Baku',  desc: 'Stok & harga rata-rata' },
  { src: '/assets/app/pembelian.png',    label: 'Pembelian',   desc: 'Histori pembelian bahan' },
  { src: '/assets/app/pengeluaran.png',  label: 'Pengeluaran', desc: 'Biaya operasional tercatat' },
]

export default function AppSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const imgRef = useRef(null)
  const captionRef = useRef(null)
  const timerRef = useRef(null)

  const goTo = useCallback((idx) => {
    if (isAnimating || idx === current) return
    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(idx)
        setIsAnimating(false)
      },
    })

    tl.to(imgRef.current, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' })
      .to(captionRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '<')
      .call(() => {
        setCurrent(idx)
      })
      .fromTo(imgRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
      .fromTo(captionRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        '-=0.3'
      )
  }, [current, isAnimating])

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % slides.length
        if (!isAnimating && imgRef.current) {
          gsap.timeline()
            .to(imgRef.current, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' })
            .fromTo(imgRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
            )
          if (captionRef.current) {
            gsap.timeline()
              .to(captionRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
              .fromTo(captionRef.current,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.1'
              )
          }
        }
        return next
      })
    }, 3800)
    return () => clearInterval(timerRef.current)
  }, [isAnimating])

  return (
    <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>
      {/* Browser chrome frame */}
      <div style={{
        background: '#1B1208',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(27,18,8,0.32), 0 8px 24px rgba(27,18,8,0.16)',
        border: '1px solid rgba(196,154,63,0.15)',
      }}>
        {/* Title bar */}
        <div style={{
          background: '#2A1A0C',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#FF6057','#FEBC2E','#28C840'].map((c, i) => (
              <span key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block' }} />
            ))}
          </div>
          {/* URL bar */}
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.06)',
            borderRadius: '6px', padding: '4px 12px',
            fontSize: '11px', color: 'rgba(255,255,255,0.35)',
            fontFamily: 'DM Mono, monospace',
            textAlign: 'center', letterSpacing: '0.02em',
          }}>
            app.tatadatadapur.id
          </div>
          <div style={{ width: '52px' }} />
        </div>

        {/* Screenshot */}
        <div style={{ position: 'relative', lineHeight: 0, background: '#F4EDE0', minHeight: '320px' }}>
          <img
            ref={imgRef}
            key={current}
            src={slides[current].src}
            alt={slides[current].label}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
          />
          {/* Subtle vignette bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: 'linear-gradient(to top, rgba(27,18,8,0.18) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Caption bar */}
        <div
          ref={captionRef}
          style={{
            background: '#2A1A0C',
            padding: '12px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#F4EDE0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {slides[current].label}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginLeft: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {slides[current].desc}
            </span>
          </div>
          {/* Slide counter */}
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono, monospace' }}>
            {String(current + 1).padStart(2,'0')}/{String(slides.length).padStart(2,'0')}
          </span>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '7px',
              height: '7px',
              borderRadius: '99px',
              background: i === current ? '#B5532A' : 'rgba(181,83,42,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, background 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
