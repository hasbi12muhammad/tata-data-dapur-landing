import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'Manajemen stok dengan sistem FIFO — otomatis real-time',
  'HPP otomatis — update saat harga bahan baku berubah',
  'Fitur resep produk + kalkulasi biaya produksi per item',
  'Laporan keuangan lengkap — mingguan, bulanan, atau custom',
  'Catat penjualan, pembelian, dan pengeluaran operasional',
  'Export laporan ke PDF & Excel',
  'Akses dari HP kapan saja, di mana saja',
  'Update fitur gratis selamanya',
]

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
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }
      if (barRef.current) {
        gsap.from(barRef.current, {
          width: '0%', duration: 1.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 90%',
            once: true,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{ background: '#FFFCF8', padding: '88px 24px' }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: '#FEF3ED', color: '#C8431A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px',
          border: '1px solid #F5D0BC', marginBottom: '20px',
        }}>
          Harga
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 700, letterSpacing: '-0.8px',
          color: '#1A1208', marginBottom: '8px', lineHeight: 1.2,
        }}>
          Cukup <em style={{ color: '#C8431A', fontStyle: 'italic' }}>sekali bayar.</em><br />
          Tanpa langganan. Selamanya.
        </h2>

        <p style={{ fontSize: '15px', color: '#6B4A35', marginBottom: '36px', maxWidth: '500px' }}>
          Kamu tidak perlu terus membayar untuk sistem yang seharusnya sudah milikmu. Satu kali investasi — dan Tata Data Dapur menjadi bagian permanen dari bisnismu.
        </p>

        {/* Pricing card */}
        <div
          ref={cardRef}
          style={{
            background: '#fff',
            border: '2px solid #C8431A',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(200,67,26,0.14)',
          }}
        >
          {/* Badge */}
          <div style={{
            background: '#C8431A', color: '#fff',
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
              background: '#FEF3ED', border: '1px solid #F5D0BC',
              borderRadius: '14px', padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '20px',
            }}>
              <span style={{ fontSize: '22px' }}>⏳</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', color: '#9E3212', lineHeight: 1.5, fontWeight: 800, display: 'block', marginBottom: '2px' }}>
                  11 dari 15 slot sudah terisi
                </div>
                <div style={{ fontSize: '12px', color: '#9E3212', lineHeight: 1.5 }}>
                  Setelah penuh, harga kembali ke normal. Tidak ada pengecualian.
                </div>
                {/* Progress bar */}
                <div style={{ height: '6px', background: '#F5D0BC', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
                  <div
                    ref={barRef}
                    style={{
                      height: '100%', width: '73%',
                      background: '#C8431A', borderRadius: '99px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#6B4A35' }}>Rp</span>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '52px', fontWeight: 700, color: '#1A1208', letterSpacing: '-2px' }}>99K</span>
            </div>
            <div style={{
              fontSize: '13px', color: '#C8431A', fontWeight: 700,
              marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              ✓ &nbsp;Bayar sekali · Pakai selamanya · Tidak ada biaya tambahan
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #EDD9C8', margin: '20px 0' }} />

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#2C1A0E' }}>
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
              href="#"
              style={{
                display: 'flex', justifyContent: 'center',
                width: '100%', padding: '18px',
                background: '#C8431A', color: '#fff',
                borderRadius: '99px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '16px', fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(200,67,26,0.28)',
                animation: 'pulse-btn 3s infinite',
                transition: 'background 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#9E3212'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8431A'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Saya Mau Beli Sekarang — Rp 99K →
            </a>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              {['🔒 Tanpa kontrak', '⚡ Langsung bisa pakai', '📞 Support via WhatsApp'].map((badge, i) => (
                <span key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', color: '#6B4A35', fontWeight: 600,
                  padding: '5px 12px',
                  background: '#FEF7F1', border: '1px solid #EDD9C8',
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
