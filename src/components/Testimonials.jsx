import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SpiceImg from './SpiceImg'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AT = '/assets/components/'
const floatT = (r=0, d='4s', delay='0s') => ({ transform: `rotate(${r}deg)`, animation: `float ${d} ease-in-out infinite ${delay}`, '--rotate': `${r}deg` })

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    initials: 'SR',
    name: 'Sari R.',
    biz: 'Pemilik Kedai Kopi & Bakery, Surabaya',
    quote: 'Dulu tiap malam harus hitung ulang di buku, sering salah, sering pusing. Sekarang tinggal buka HP sebelum tidur, semua sudah ada. Lebih tenang, lebih fokus ke dapur.',
  },
  {
    initials: 'BW',
    name: 'Budi W.',
    biz: 'Owner Toko Kue Rumahan, Bandung',
    quote: 'Yang bikin saya pindah ke Tata Data adalah fitur resep + HPP-nya. Harga telur naik, saya langsung tahu harus naik harga jual berapa. Nggak perlu nebak-nebak lagi.',
  },
  {
    initials: 'DP',
    name: 'Dewi P.',
    biz: 'Catering Rumahan, Jakarta Selatan',
    quote: 'Dua tahun pakai aplikasi langganan Rp 150 ribu per bulan tapi setengah fiturnya nggak kepake. Tata Data bayar sekali, semua yang saya butuh ada. Nyesal nggak pindah lebih awal.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.65,
          ease: 'power3.out',
          delay: i * 0.12,
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
      id="trust"
      ref={sectionRef}
      style={{ background: '#FBF6EC', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating illustrations */}
      <div style={{ position: 'absolute', top: '30px', left: '16px', zIndex: 0, opacity: 0.55 }}>
        <div style={floatT(-8, '5.5s', '0.4s')}><SpiceImg src={`${AT}17.png`} bg="cream" width={95} height={85} /></div>
      </div>
      <div style={{ position: 'absolute', bottom: '44px', right: '18px', zIndex: 0, opacity: 0.5 }}>
        <div style={floatT(12, '4.7s', '1.1s')}><SpiceImg src={`${AT}19.png`} bg="cream" width={100} height={90} /></div>
      </div>
      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section tag */}
        <span style={{
          display: 'inline-block',
          background: 'rgba(181,83,42,0.06)', color: '#B5532A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px',
          border: '1px solid rgba(181,83,42,0.2)', marginBottom: '20px',
        }}>
          Testimoni
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(24px, 3vw, 34px)',
          fontWeight: 700, letterSpacing: '-0.6px',
          color: '#1B1208', marginBottom: '8px', lineHeight: 1.2,
        }}>
          Sudah dipakai pemilik usaha<br />seperti kamu
        </h2>

        <p style={{ fontSize: '15px', color: '#5A3D25', marginBottom: '40px' }}>
          Mereka juga pernah bingung. Sekarang tidak lagi.
        </p>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                background: '#fff',
                border: '1px solid rgba(181,83,42,0.18)',
                borderRadius: '14px', padding: '20px 22px',
                position: 'relative',
              }}
            >
              {/* Quote mark decoration */}
              <div style={{
                position: 'absolute', top: '10px', right: '18px',
                fontFamily: 'Fraunces, serif',
                fontSize: '64px', color: 'rgba(181,83,42,0.2)',
                lineHeight: 1, pointerEvents: 'none',
                userSelect: 'none',
              }}>"</div>

              <div style={{ color: '#F5A25A', fontSize: '14px', marginBottom: '10px', letterSpacing: '2px' }}>★★★★★</div>
              <p style={{ fontSize: '15px', color: '#1B1208', lineHeight: 1.7, marginBottom: '14px', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(181,83,42,0.06)', border: '2px solid rgba(181,83,42,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 800, color: '#B5532A',
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1B1208' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#8B7060' }}>{t.biz}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
