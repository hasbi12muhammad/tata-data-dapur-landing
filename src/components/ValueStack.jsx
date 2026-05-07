import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Tahu profit harian tanpa hitung manual',
    desc: 'Buka app, angka sudah ada. Tidak perlu kalkulator, tidak perlu Excel.',
  },
  {
    title: 'Stok selalu terpantau real-time',
    desc: 'Ada notifikasi sebelum stok habis. Tidak ada lagi kehabisan di tengah rush hour.',
  },
  {
    title: 'HPP akurat meski bahan baku naik',
    desc: 'Harga jual kamu selalu didasarkan data nyata, bukan tebakan.',
  },
  {
    title: 'Cek bisnis dari mana saja, kapan saja',
    desc: 'Di rumah, di pasar, atau sambil nunggu anak sekolah. Semua ada di HP.',
  },
  {
    title: 'Laporan siap pakai, siap kirim',
    desc: 'Export PDF atau Excel dalam satu klik. Rapi, profesional, langsung arsip.',
  },
  {
    title: 'Tidak ada tagihan bulanan selamanya',
    desc: 'Bayar sekali hari ini. Gunakan seterusnya. Tidak ada biaya tersembunyi.',
  },
]

export default function ValueStack() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          y: 25, opacity: 0, duration: 0.55,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="value"
      ref={sectionRef}
      style={{ background: '#1A1208', padding: '88px 24px' }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: 'rgba(200,67,26,0.15)',
          border: '1px solid rgba(200,67,26,0.3)',
          color: '#F5A25A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px', marginBottom: '20px',
        }}>
          Yang kamu dapatkan
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 700, letterSpacing: '-0.8px',
          color: '#fff', marginBottom: '8px', lineHeight: 1.2,
        }}>
          Bukan sekedar aplikasi.<br />Ini ketenangan pikiran kamu.
        </h2>

        <p style={{ fontSize: '15px', color: '#8A7060', marginBottom: '40px' }}>
          Setiap fitur dirancang untuk satu tujuan: bikin kamu lebih tenang jalankan bisnis.
        </p>

        {/* Value grid */}
        <div
          className="value-grid-2col"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
        >
          {values.map((v, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: '18px',
                transition: 'background 0.2s, border-color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(200,67,26,0.08)'
                e.currentTarget.style.borderColor = 'rgba(200,67,26,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <div style={{
                width: '28px', height: '28px',
                background: 'rgba(93,202,135,0.15)',
                border: '1px solid rgba(93,202,135,0.25)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', marginBottom: '10px',
                color: '#5DCA87',
              }}>
                ✓
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F5E6D0', marginBottom: '4px', lineHeight: 1.3 }}>{v.title}</div>
              <div style={{ fontSize: '12px', color: '#6B5A42', lineHeight: 1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
