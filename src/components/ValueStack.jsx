import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SpiceImg from './SpiceImg'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AV = '/assets/components/'
const floatV = (r=0, d='4s', delay='0s') => ({ transform: `rotate(${r}deg)`, animation: `float ${d} ease-in-out infinite ${delay}`, '--rotate': `${r}deg` })

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Tahu profit harian tanpa hitung manual',
    desc: 'Buka app, angka sudah ada. Tidak perlu kalkulator, tidak perlu Excel.',
  },
  {
    title: 'Stok selalu terpantau real-time',
    desc: 'Setiap transaksi memperbarui stok otomatis. Kamu tahu persis kondisi bahan baku tanpa cek manual.',
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
      style={{ background: '#1B1208', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating illustrations — low opacity on dark bg */}
      <div style={{ position: 'absolute', top: '28px', right: '16px', zIndex: 0, opacity: 0.18 }}>
        <div style={floatV(15, '5s', '0.3s')}><SpiceImg src={`${AV}11.webp`} bg="ink" width={120} height={105} /></div>
      </div>
      <div style={{ position: 'absolute', bottom: '36px', left: '12px', zIndex: 0, opacity: 0.15 }}>
        <div style={floatV(-12, '4.8s', '1.2s')}><SpiceImg src={`${AV}16.webp`} bg="ink" width={100} height={90} /></div>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 0, opacity: 0.12 }}>
        <div style={floatV(8, '6.2s', '0.8s')}><SpiceImg src={`${AV}21.webp`} bg="ink" width={85} height={85} /></div>
      </div>
      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: 'rgba(181,83,42,0.15)',
          border: '1px solid rgba(181,83,42,0.3)',
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

        <p style={{ fontSize: '15px', color: '#C4B098', marginBottom: '40px' }}>
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
                e.currentTarget.style.background = 'rgba(181,83,42,0.08)'
                e.currentTarget.style.borderColor = 'rgba(181,83,42,0.2)'
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
                marginBottom: '10px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5DCA87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F5E6D0', marginBottom: '4px', lineHeight: 1.3 }}>{v.title}</div>
              <div style={{ fontSize: '12px', color: '#A89880', lineHeight: 1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
