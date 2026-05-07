import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      style={{ background: '#FEF7F1', padding: '88px 24px' }}
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
          Testimoni
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(24px, 3vw, 34px)',
          fontWeight: 700, letterSpacing: '-0.6px',
          color: '#1A1208', marginBottom: '8px', lineHeight: 1.2,
        }}>
          Sudah dipakai pemilik usaha<br />seperti kamu
        </h2>

        <p style={{ fontSize: '15px', color: '#6B4A35', marginBottom: '40px' }}>
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
                border: '1px solid #EDD9C8',
                borderRadius: '14px', padding: '20px 22px',
                position: 'relative',
              }}
            >
              {/* Quote mark decoration */}
              <div style={{
                position: 'absolute', top: '10px', right: '18px',
                fontFamily: 'Fraunces, serif',
                fontSize: '64px', color: '#F5D0BC',
                lineHeight: 1, pointerEvents: 'none',
                userSelect: 'none',
              }}>"</div>

              <div style={{ color: '#F5A25A', fontSize: '14px', marginBottom: '10px', letterSpacing: '2px' }}>★★★★★</div>
              <p style={{ fontSize: '15px', color: '#2C1A0E', lineHeight: 1.7, marginBottom: '14px', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: '#FEF3ED', border: '2px solid #F5D0BC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 800, color: '#C8431A',
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1208' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#A0836E' }}>{t.biz}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
