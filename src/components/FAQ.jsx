import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SpiceImg from './SpiceImg'
import { SparkleIllustration } from './illustrations/index'

const A = '/assets/components/'

const faqs = [
  {
    q: 'Apakah Tata Data Dapur gratis?',
    a: 'Ada masa uji coba gratis 14 hari, tanpa kartu kredit. Setelah itu kamu bisa pilih paket yang sesuai dengan skala bisnis kamu.',
    defaultOpen: true,
  },
  {
    q: 'Apakah saya harus paham akuntansi untuk menggunakannya?',
    a: 'Tidak perlu. Tata Data Dapur dirancang untuk pemilik warung dan restoran, bukan akuntan. Cukup input bahan baku, harga beli, dan resep — semua perhitungan HPP dan profit dilakukan otomatis oleh sistem.',
  },
  {
    q: 'Bagaimana cara aplikasi ini menghitung HPP?',
    a: 'Kamu input bahan baku beserta harga belinya, lalu buat resep dengan komposisi bahan tiap menu. Sistem otomatis menghitung HPP per porsi berdasarkan data tersebut — akurat, tanpa kalkulator.',
  },
  {
    q: 'Bisnis kuliner apa saja yang cocok menggunakan ini?',
    a: 'Tata Data Dapur cocok untuk warung makan, restoran, kafe, katering, bakeri — intinya semua usaha kuliner yang punya resep dan bahan baku. Kalau kamu masak untuk dijual, aplikasi ini untuk kamu.',
  },
  {
    q: 'Apakah ada bantuan jika saya kesulitan saat setup?',
    a: 'Ada. Kami tersedia via WhatsApp pada jam kerja. Kamu juga bisa hubungi sebelum mendaftar kalau ada yang mau ditanyakan.',
  },
]

function FAQItem({ faq, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <div style={{ borderBottom: '1px dashed rgba(27,18,8,0.18)', paddingTop: '20px', paddingBottom: '20px' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
        <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', color: '#1B1208', fontWeight: 400, flex: 1 }}>{faq.q}</span>
        <span style={{ width: '30px', height: '30px', borderRadius: '50%', border: `1px solid ${open ? 'rgba(181,83,42,0.4)' : 'rgba(27,18,8,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.1rem', color: open ? '#B5532A' : '#1B1208', transition: 'transform 0.3s ease, color 0.3s ease, border-color 0.3s ease', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', fontFamily: 'system-ui', lineHeight: 1 }}>+</span>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '300px' : '0', transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem', color: 'rgba(27,18,8,0.62)', lineHeight: 1.72, margin: 0, paddingTop: '12px' }}>{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.faq-animate'), {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="faq-section" style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '48px', paddingRight: '48px' }}>
      <div className="faq-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '60px', alignItems: 'start' }}>

        {/* Left */}
        <div className="faq-animate" style={{ paddingTop: '20px', position: 'relative' }}>
          {/* Herb illustration */}
          <div className="faq-illus" style={{ position: 'absolute', top: '-20px', right: '-20px', transform: 'rotate(8deg)' }}>
            <SpiceImg src={`${A}4.png`} bg="cream" width={105} height={105} opacity={0.6} />
          </div>
          {/* Basil bottom */}
          <div className="faq-illus" style={{ position: 'absolute', bottom: '-5px', right: '-15px', transform: 'rotate(-5deg)' }}>
            <SpiceImg src={`${A}5.png`} bg="cream" width={90} height={90} opacity={0.5} />
          </div>

          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#B5532A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>— FAQ</div>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#1B1208', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px' }}>
            Pertanyaan yang sering <em>ditanya.</em>
          </h2>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem', color: 'rgba(27,18,8,0.52)', lineHeight: 1.7, margin: 0 }}>
            Ada hal lain yang ingin kamu tanyakan? Hubungi kami langsung.
          </p>
          <a href="https://wa.me/6287850755050" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#1B1208', textDecoration: 'none', borderBottom: '1px solid rgba(27,18,8,0.25)', paddingBottom: '2px', transition: 'opacity 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.62'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Hubungi via WhatsApp
          </a>

          <div style={{ display: 'flex', gap: '8px', marginTop: '40px', alignItems: 'center' }}>
            <SparkleIllustration size={8} style={{ color: '#C49A3F', opacity: 0.6 }} />
            <div style={{ height: '1px', width: '40px', background: 'rgba(27,18,8,0.12)' }} />
            <SparkleIllustration size={6} style={{ color: '#B5532A', opacity: 0.5 }} />
          </div>
        </div>

        {/* Right */}
        <div className="faq-animate">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} defaultOpen={faq.defaultOpen} />)}
        </div>
      </div>
    </section>
  )
}
