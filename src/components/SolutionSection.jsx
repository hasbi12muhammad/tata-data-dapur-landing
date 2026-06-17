import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SpiceImg from './SpiceImg'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const A = '/assets/components/'
const floatSt = (r=0, d='4s', delay='0s') => ({ transform: `rotate(${r}deg)`, animation: `float ${d} ease-in-out infinite ${delay}`, '--rotate': `${r}deg` })

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  {
    num: '1',
    title: 'HPP otomatis — meski harga bahan baku naik setiap minggu',
    desc: 'Sistem otomatis menghitung HPP real-time berdasarkan harga beli terbaru. Kamu selalu tahu: produk ini masih untung atau sudah nombok.',
  },
  {
    num: '2',
    title: 'Stok terpantau — bahkan saat lagi hectic sekalipun',
    desc: 'Setiap transaksi langsung memperbarui stok otomatis. Kalau lagi ramai dan belum sempat catat bahan masuk, bisa catat penjualan dulu — app tandai bahan yang minus dan siapkan form restock satu ketuk saat kamu sudah sempat.',
  },
  {
    num: '3',
    title: 'Resep produk + kalkulasi HPP per item',
    desc: 'Masukkan resep sekali. Aplikasi langsung hitung biaya produksi per produk — dan update otomatis saat harga bahan berubah.',
  },
  {
    num: '4',
    title: 'Laporan keuangan lengkap — kapan saja, periode apa saja',
    desc: 'Mingguan, bulanan, atau custom. Omzet, HPP, laba bersih, pengeluaran operasional — tersaji rapi, bisa diekspor ke PDF atau Excel.',
  },
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B5532A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A090" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const WarnIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4933A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const compareRows = [
  { feat: 'Cocok untuk kuliner & produksi ringan', tdd: <CheckIcon/>, other: <><XIcon/> <span>Terlalu umum</span></>, otherType: 'no' },
  { feat: 'HPP otomatis (harga fluktuatif)', tdd: <CheckIcon/>, other: <><XIcon/> <span>Manual</span></>, otherType: 'no' },
  { feat: 'Resep + kalkulasi biaya produksi', tdd: <CheckIcon/>, other: <><XIcon/> <span>Tidak tersedia</span></>, otherType: 'no' },
  { feat: 'Bayar sekali, pakai selamanya', tdd: <CheckIcon/>, other: <><XIcon/> <span>Langganan bulanan</span></>, otherType: 'no' },
  { feat: 'Export PDF & Excel', tdd: <CheckIcon/>, other: <><WarnIcon/> <span>Bayar ekstra</span></>, otherType: 'maybe' },
]

export default function SolutionSection() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.1,
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
      id="solution"
      ref={sectionRef}
      style={{ background: '#FBF6EC', padding: '88px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating illustrations */}
      <div style={{ position: 'absolute', top: '32px', right: '18px', zIndex: 0, opacity: 0.65 }}>
        <div style={floatSt(12, '5s', '0.5s')}><SpiceImg src={`${A}5.png`} bg="cream" width={110} height={95} /></div>
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '14px', zIndex: 0, opacity: 0.6 }}>
        <div style={floatSt(-10, '4.5s', '1s')}><SpiceImg src={`${A}14.png`} bg="cream" width={95} height={85} /></div>
      </div>
      <div style={{ position: 'absolute', top: '45%', left: '10px', zIndex: 0, opacity: 0.45 }}>
        <div style={floatSt(8, '6s', '2s')}><SpiceImg src={`${A}22.png`} bg="cream" width={80} height={80} /></div>
      </div>
      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(181,83,42,0.06)', color: '#B5532A',
          fontSize: '11px', fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: '99px',
          border: '1px solid rgba(181,83,42,0.2)', marginBottom: '20px',
        }}>
          Solusi
        </span>

        <h2 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: 700, letterSpacing: '-0.8px',
          lineHeight: 1.2, color: '#1B1208',
          marginBottom: '12px',
        }}>
          Bukan tambah kerjaan.<br />Justru bikin jauh lebih ringan.
        </h2>

        <p style={{ fontSize: '16px', color: '#5A3D25', marginBottom: '44px', maxWidth: '500px' }}>
          Tata Data Dapur dirancang khusus untuk bisnis kuliner dan produksi ringan, bukan aplikasi serba ada yang akhirnya nggak ada yang kepake.
        </p>

        {/* Solution cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {solutions.map((s, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                display: 'flex', gap: '18px',
                background: '#fff',
                border: '1px solid rgba(181,83,42,0.18)',
                borderRadius: '14px', padding: '20px 22px',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(181,83,42,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: '36px', height: '36px', minWidth: '36px',
                background: 'rgba(181,83,42,0.06)', border: '1px solid rgba(181,83,42,0.2)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 800, color: '#B5532A',
                flexShrink: 0,
              }}>
                {s.num}
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1B1208', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontSize: '14px', color: '#5A3D25', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div
          ref={el => cardRefs.current[solutions.length] = el}
          style={{ marginTop: '48px' }}
        >
          <div style={{ fontSize: '13px', color: '#8B7060', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Dibanding aplikasi lain
          </div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid rgba(181,83,42,0.18)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7060', borderBottom: '1px solid rgba(181,83,42,0.18)' }}>Fitur</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', background: '#B5532A', color: '#fff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', borderBottom: '1px solid rgba(181,83,42,0.18)' }}>Tata Data Dapur</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8B7060', borderBottom: '1px solid rgba(181,83,42,0.18)' }}>Aplikasi Lain</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '13px 14px', borderBottom: i < compareRows.length - 1 ? '1px solid rgba(181,83,42,0.18)' : 'none', color: '#1B1208', verticalAlign: 'middle' }}>{row.feat}</td>
                    <td style={{ padding: '13px 14px', borderBottom: i < compareRows.length - 1 ? '1px solid rgba(181,83,42,0.18)' : 'none', textAlign: 'center', background: '#FBF6EC' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{row.tdd}</span>
                    </td>
                    <td style={{
                      padding: '13px 14px',
                      borderBottom: i < compareRows.length - 1 ? '1px solid rgba(181,83,42,0.18)' : 'none',
                      fontSize: '13px',
                      fontWeight: 500,
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: row.otherType === 'no' ? '#C4A090' : '#D4933A' }}>{row.other}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
