import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'

gsap.registerPlugin(ScrollTrigger)

const A = '/assets/components/'

const features = [
  'HPP otomatis — update saat harga bahan baku berubah',
  'Fitur resep produk + kalkulasi biaya produksi per item',
  'Laporan keuangan lengkap — mingguan, bulanan, atau custom',
  'Catat penjualan, pembelian, dan pengeluaran operasional',
  'Export laporan ke PDF & Excel',
  'Akses dari HP kapan saja, di mana saja',
  'Update fitur gratis selamanya',
]

const floatStyle = (r = 0, d = '4s', delay = '0s') => ({
  transform: `rotate(${r}deg)`,
  animation: `float ${d} ease-in-out infinite ${delay}`,
  '--rotate': `${r}deg`,
})

export default function Pricing() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 40, opacity: 0, duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{ background: '#FBF6EC', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating illustrations */}
      <div style={{ position: 'absolute', top: '40px', left: '20px', zIndex: 0, opacity: 0.7 }}>
        <div style={floatStyle(-12, '5s', '0.3s')}>
          <SpiceImg src={`${A}13.png`} bg="cream" width={100} height={90} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '60px', right: '24px', zIndex: 0, opacity: 0.65 }}>
        <div style={floatStyle(10, '4.5s', '1.5s')}>
          <SpiceImg src={`${A}20.png`} bg="cream" width={90} height={90} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '35%', right: '16px', zIndex: 0, opacity: 0.5 }}>
        <div style={floatStyle(-8, '6s', '0.8s')}>
          <SpiceImg src={`${A}24.png`} bg="cream" width={75} height={75} />
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: 'rgba(181,83,42,0.08)', color: '#B5532A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px',
          border: '1px solid rgba(181,83,42,0.2)', marginBottom: '20px',
        }}>
          Harga
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 700, letterSpacing: '-0.8px',
          color: '#1B1208', marginBottom: '8px', lineHeight: 1.2,
        }}>
          Cukup <em style={{ color: '#B5532A', fontStyle: 'italic' }}>sekali bayar.</em><br />
          Tanpa langganan. Selamanya.
        </h2>

        <p style={{ fontSize: '15px', color: '#5A3D25', marginBottom: '36px', maxWidth: '500px' }}>
          Kamu tidak perlu terus membayar untuk sistem yang seharusnya sudah milikmu.
          Satu kali investasi — dan Tata Data Dapur menjadi bagian permanen dari bisnismu.
        </p>

        {/* Pricing card */}
        <div
          ref={cardRef}
          style={{
            background: '#fff',
            border: '2px solid #B5532A',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(181,83,42,0.14)',
          }}
        >
          {/* Badge */}
          <div style={{
            background: '#B5532A', color: '#fff',
            textAlign: 'center', padding: '10px 24px',
            fontSize: '12px', fontWeight: 800,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            🔥 Harga Spesial — Terbatas untuk 15 Pengguna Pertama
          </div>

          {/* Body */}
          <div style={{ padding: '32px 28px' }}>
            {/* Urgency bar */}
            <div style={{
              background: 'rgba(181,83,42,0.06)', border: '1px solid rgba(181,83,42,0.2)',
              borderRadius: '14px', padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '24px',
            }}>
              <span style={{ fontSize: '22px' }}>⏳</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', color: '#8B3D1A', lineHeight: 1.5, fontWeight: 800, display: 'block', marginBottom: '2px' }}>
                  11 dari 15 slot sudah terisi
                </div>
                <div style={{ fontSize: '12px', color: '#8B3D1A', lineHeight: 1.5 }}>
                  Setelah penuh, harga kembali ke normal. Tidak ada pengecualian.
                </div>
                <div style={{ height: '6px', background: 'rgba(181,83,42,0.18)', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
                  <div
                    ref={barRef}
                    style={{ height: '100%', width: '73%', background: '#B5532A', borderRadius: '99px' }}
                  />
                </div>
              </div>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#5A3D25' }}>Rp</span>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '56px', fontWeight: 700, color: '#1B1208', letterSpacing: '-2px', lineHeight: 1 }}>175.000</span>
            </div>
            <div style={{
              fontSize: '13px', color: '#B5532A', fontWeight: 700,
              marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              ✓ &nbsp;Bayar sekali · Pakai selamanya · Tidak ada biaya tambahan
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(181,83,42,0.15)', margin: '20px 0' }} />

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#1B1208' }}>
                  <span style={{
                    width: '20px', height: '20px', minWidth: '20px',
                    background: '#EBF5EB', border: '1px solid #7BC47B',
                    borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: '#2D6A2D', marginTop: '1px', flexShrink: 0,
                  }}>✓</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="https://onetap.id/tata-data/tatadata-dapurmu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', justifyContent: 'center',
                width: '100%', padding: '18px',
                background: '#B5532A', color: '#fff',
                borderRadius: '99px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '16px', fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(181,83,42,0.32)',
                animation: 'pulse-btn 3s infinite',
                transition: 'background 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Saya Mau Beli Sekarang — Rp 175.000 →
            </a>

            {/* Trust badges — centered */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
              {['🔒 Tanpa kontrak', '⚡ Langsung bisa pakai', '📞 Support via WhatsApp'].map((badge, i) => (
                <span key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', color: '#5A3D25', fontWeight: 600,
                  padding: '5px 12px',
                  background: '#F4EDE0', border: '1px solid rgba(181,83,42,0.2)',
                  borderRadius: '99px',
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
