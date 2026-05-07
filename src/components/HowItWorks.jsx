import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'

const A = '/assets/components/'

const floatStyle = (r = 0, d = '4s', delay = '0s') => ({
  transform: `rotate(${r}deg)`,
  animation: `float ${d} ease-in-out infinite ${delay}`,
  '--rotate': `${r}deg`,
})

const steps = [
  {
    icon: '🏪',
    title: 'Input produk & resep sekali di awal',
    desc: 'Masukkan daftar menu, harga jual, resep (bahan + takaran), dan stok awal bahan baku. Proses ini hanya dilakukan sekali.',
    detail: '⏱ Sekitar 15–30 menit setup awal',
  },
  {
    icon: '🧾',
    title: 'Catat transaksi harian seperti biasa',
    desc: 'Setiap penjualan dan pembelian dicatat. Stok otomatis berkurang. HPP otomatis terhitung. Kamu tinggal input, sisanya dikerjain sistem.',
    detail: '⚡ Kurang dari 30 detik per transaksi',
  },
  {
    icon: '📊',
    title: 'Lihat laporan kapan saja dari HP',
    desc: 'Buka aplikasi, pilih periode, dan semua angka sudah ada. Profit, HPP, stok, pengeluaran operasional — tanpa hitung ulang, tanpa ribet.',
    detail: '📥 Export PDF / Excel satu klik',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const stepsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        gsap.from(stepsRef.current.querySelectorAll('.step-item'), {
          x: -30, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const noiseUrl = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

  return (
    <section
      id="how"
      ref={sectionRef}
      style={{
        background: '#1B1208',
        padding: '88px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.04, backgroundImage: noiseUrl, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />

      {/* Corner illustrations */}
      <div className="hiw-corner-illus" style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1 }}>
        <div style={floatStyle(-5, '5s', '0.5s')}>
          <SpiceImg src={`${A}7.png`} bg="dark" width={120} height={120} />
        </div>
      </div>
      <div className="hiw-corner-illus" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
        <div style={floatStyle(10, '4.5s', '1s')}>
          <SpiceImg src={`${A}8.png`} bg="dark" width={130} height={85} />
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: 'rgba(181,83,42,0.06)', color: '#B5532A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px',
          border: '1px solid rgba(181,83,42,0.2)', marginBottom: '20px',
        }}>
          Cara kerja
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 700, letterSpacing: '-0.8px',
          lineHeight: 1.2, color: '#fff',
          marginBottom: '12px',
        }}>
          Simpel. Langsung pakai.<br />Tidak perlu training.
        </h2>

        <p style={{ fontSize: '16px', color: '#5A3D25', marginBottom: '44px', maxWidth: '500px' }}>
          Tiga langkah dan bisnis kamu sudah punya sistem yang benar.
        </p>

        {/* Steps vertical */}
        <div ref={stepsRef} style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
          {/* Vertical connector line */}
          <div style={{
            position: 'absolute', left: '27px', top: '56px', bottom: '56px',
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(181,83,42,0.2), transparent)',
          }} />

          {steps.map((step, i) => (
            <div
              key={i}
              className="step-item"
              style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                paddingBottom: i < steps.length - 1 ? '36px' : '0',
                position: 'relative',
              }}
            >
              {/* Circle number */}
              <div style={{
                width: '56px', height: '56px', minWidth: '56px',
                background: '#B5532A', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', position: 'relative', zIndex: 1,
                boxShadow: '0 4px 16px rgba(181,83,42,0.3)',
                flexShrink: 0,
              }}>
                {step.icon}
              </div>

              {/* Body */}
              <div style={{ paddingTop: '10px' }}>
                <div style={{ fontSize: '17px', fontWeight: 700, color: '#F5E6D0', marginBottom: '6px' }}>{step.title}</div>
                <div style={{ fontSize: '14px', color: '#6B5A42', lineHeight: 1.6, marginBottom: '8px' }}>{step.desc}</div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(181,83,42,0.06)', color: '#B5532A',
                  fontSize: '12px', fontWeight: 600,
                  padding: '4px 12px', borderRadius: '99px',
                }}>
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '44px', textAlign: 'center' }}>
          <a
            href="#pricing"
            style={{
              background: '#B5532A', color: '#fff',
              padding: '16px 32px', borderRadius: '99px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px', fontWeight: 800,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 24px rgba(181,83,42,0.28)',
              transition: 'background 0.2s, transform 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Mulai Sekarang →
          </a>
        </div>
      </div>
    </section>
  )
}
