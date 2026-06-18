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
          Cukup <em style={{ color: '#B5532A', fontStyle: 'italic' }}>sekali bayar,</em><br />
          tanpa langganan, selamanya.
        </h2>

        <p style={{ fontSize: '15px', color: '#5A3D25', marginBottom: '36px', maxWidth: '500px' }}>
          Kamu tidak perlu terus membayar untuk sesuatu yang seharusnya sudah milikmu.
          Bayar sekali hari ini, Tata Data Dapur jadi milikmu selamanya.
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
            Harga Spesial: Bayar Sekali, Akses Selamanya
          </div>

          {/* Body */}
          <div style={{ padding: '32px 28px' }}>
            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', lineHeight: 1 }}>
                <span style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '16px', fontWeight: 500,
                  color: '#8B7060', letterSpacing: '0',
                }}>Rp</span>
                <span style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(44px, 10vw, 60px)',
                  fontWeight: 400, color: '#1B1208',
                  letterSpacing: '-2px', lineHeight: 1,
                }}>175.000</span>
              </div>
              <p style={{ fontSize: '12px', color: '#8B7060', marginTop: '8px', letterSpacing: '0.01em' }}>
                Bayar sekali · Pakai selamanya · Tanpa biaya tambahan
              </p>
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
                    marginTop: '1px', flexShrink: 0,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2D6A2D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="/beli"
              style={{
                display: 'flex', justifyContent: 'center', textAlign: 'center',
                width: '100%', padding: '18px',
                background: '#B5532A', color: '#fff',
                borderRadius: '99px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '16px', fontWeight: 800,
                textDecoration: 'none',
                animation: 'pulse-btn 3s infinite',
                transition: 'background 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8B3D1A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#B5532A'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Saya Mau Beli Sekarang · Rp 175.000
            </a>

            {/* Trust badges — centered */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
              {[
                {
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
                  text: 'Tanpa kontrak',
                },
                {
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                  text: 'Langsung bisa pakai',
                },
                {
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                  text: 'Support via WhatsApp',
                },
              ].map((badge, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', color: '#5A3D25', fontWeight: 600,
                  padding: '5px 12px',
                  background: '#F4EDE0', border: '1px solid rgba(181,83,42,0.2)',
                  borderRadius: '99px',
                }}>
                  {badge.icon}
                  {badge.text}
                </span>
              ))}
            </div>

            {/* Undecided escape hatch */}
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#8B7060' }}>
              Belum yakin?{' '}
              <a
                href="/help"
                style={{ color: '#B5532A', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                Lihat dulu tampilan aplikasinya →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
