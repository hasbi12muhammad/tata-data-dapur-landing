import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const chartBars = [40, 60, 45, 80, 55, 90, 70]

function BarChart() {
  const barsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barsRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: barsRef.current[0], start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '72px', marginTop: '16px' }}>
      {chartBars.map((h, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          style={{ flex: 1, height: `${h}%`, background: '#C49A3F', borderRadius: '3px 3px 0 0', opacity: 0.55 + i * 0.05 }}
        />
      ))}
    </div>
  )
}

const CalcIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(181,83,42,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="7" x2="16" y2="7"/>
    <line x1="8" y1="11" x2="10" y2="11"/><line x1="14" y1="11" x2="16" y2="11"/>
    <line x1="8" y1="15" x2="10" y2="15"/><line x1="14" y1="15" x2="16" y2="15"/>
    <line x1="8" y1="19" x2="10" y2="19"/><line x1="14" y1="19" x2="16" y2="19"/>
  </svg>
)

const BoxIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(181,83,42,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector('h2'), {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cream = {
    background: '#FBF6EC',
    border: '1px solid rgba(181,83,42,0.1)',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 24px rgba(27,18,8,0.06)',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '260px',
  }

  const dark = {
    background: '#1B1208',
    border: '1px solid rgba(196,154,63,0.15)',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 24px rgba(27,18,8,0.18)',
    position: 'relative',
    overflow: 'hidden',
    flex: 1.55,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '260px',
  }

  return (
    <section
      id="fitur"
      ref={sectionRef}
      style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '48px', paddingRight: '48px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          color: '#1B1208', marginBottom: '44px',
          fontWeight: 400, textAlign: 'center',
        }}>
          Semua yang dapur butuhkan, <em>sudah ada.</em>
        </h2>

        <div ref={cardsRef} style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>

          {/* 01 — HPP Otomatis */}
          <div style={cream}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '2.2rem', color: '#B5532A', opacity: 0.35, lineHeight: 1 }}>01</span>
                <CalcIcon />
              </div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: '#B5532A', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '10px' }}>HPP Otomatis</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.25rem', color: '#1B1208', fontWeight: 400, lineHeight: 1.2, margin: 0, marginBottom: '12px' }}>Kalkulasi instan setiap resep</h3>
            </div>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.83rem', color: 'rgba(27,18,8,0.58)', lineHeight: 1.65, margin: 0 }}>
              Hitung HPP setiap menu secara otomatis dan akurat, tanpa perhitungan manual.
            </p>
          </div>

          {/* 02 — Laporan Profit Harian (dark center) */}
          <div style={dark}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '2.2rem', color: '#C49A3F', opacity: 0.45, lineHeight: 1 }}>02</span>
              </div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: '#C49A3F', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '10px' }}>Laporan Profit Harian</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.45rem', color: '#FBF6EC', fontWeight: 400, lineHeight: 1.2, margin: 0, marginBottom: '10px', maxWidth: '260px' }}>Pantau penjualan, HPP, dan profit</h3>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.83rem', color: 'rgba(251,246,236,0.5)', lineHeight: 1.65, margin: 0 }}>
                Visualisasi yang mudah dipahami setiap hari.
              </p>
            </div>
            <div>
              <BarChart />
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(d => (
                  <div key={d} style={{ flex: 1, fontFamily: '"DM Mono", monospace', fontSize: '0.48rem', color: 'rgba(251,246,236,0.25)', textAlign: 'center' }}>{d}</div>
                ))}
              </div>
            </div>
          </div>

          {/* 03 — Kelola Bahan Baku */}
          <div style={cream}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '2.2rem', color: '#B5532A', opacity: 0.35, lineHeight: 1 }}>03</span>
                <BoxIcon />
              </div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: '#B5532A', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '10px' }}>Kelola Bahan Baku</div>
              <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.25rem', color: '#1B1208', fontWeight: 400, lineHeight: 1.2, margin: 0, marginBottom: '12px' }}>Catat stok, harga beli, dan pemakaian</h3>
            </div>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.83rem', color: 'rgba(27,18,8,0.58)', lineHeight: 1.65, margin: 0 }}>
              Pantau stok bahan baku secara real-time.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
