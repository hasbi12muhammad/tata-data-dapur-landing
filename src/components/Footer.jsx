import React from 'react'
import SpiceImg from './SpiceImg'

const A = '/assets/components/'

const footerLinks = {
  'Produk': ['Fitur', 'Cara Kerja', 'Harga', 'FAQ'],
  'Ekosistem': ['Tata Data Bahari', 'Tata Data Toko', 'Blog', 'Komunitas'],
  'Kontak': [
    { label: 'WhatsApp', href: 'https://wa.me/6287850755050' },
    { label: 'Email', href: 'mailto:hasbi12.muhammad@gmail.com' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#1B1208', position: 'relative', overflow: 'hidden', paddingTop: '64px', paddingBottom: '64px', paddingLeft: '48px', paddingRight: '48px' }}>
      {/* Corner illustrations — 1.5× original, one per corner */}
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 0 }}>
        <SpiceImg src={`${A}20.png`} bg="dark" width={165} height={144} />
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 0 }}>
        <div style={{ transform: 'rotate(12deg)' }}>
          <SpiceImg src={`${A}1.png`} bg="dark" width={132} height={132} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 0 }}>
        <div style={{ transform: 'rotate(-10deg)' }}>
          <SpiceImg src={`${A}7.png`} bg="dark" width={105} height={105} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 0 }}>
        <div style={{ transform: 'rotate(18deg)' }}>
          <SpiceImg src={`${A}3.png`} bg="dark" width={63} height={96} opacity={0.35} />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '34px', height: '34px', background: '#F4EDE0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                <img src="/assets/td-logo.png" alt="TD" style={{ width: '26px', height: '26px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '0.95rem', color: '#F4EDE0', fontWeight: 400 }}>
                Tata Data Dapur
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', color: 'rgba(244,237,224,0.52)', lineHeight: 1.65, maxWidth: '240px', margin: 0 }}>
              Kelola keuangan dapur kamu dengan data. Hitung HPP, pantau profit, dan buat keputusan lebih cerdas.
            </p>
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: 'rgba(244,237,224,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Bagian dari</div>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(196,154,63,0.7)' }}>Ekosistem Tata Data</div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.62rem', color: 'rgba(244,237,224,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '18px' }}>{group}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => {
                  const label = typeof link === 'string' ? link : link.label
                  const href = typeof link === 'string' ? '#' : link.href
                  return (
                    <li key={label}>
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', color: 'rgba(244,237,224,0.52)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#F4EDE0'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.52)'}
                      >{label}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(244,237,224,0.07)', paddingTop: '24px', marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: 'rgba(244,237,224,0.3)', letterSpacing: '0.03em' }}>
            Made by{' '}
            <a href="https://hasbi-portfolio.pages.dev/" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(244,237,224,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F4EDE0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.55)'}
            >Hasbi</a>
            {' '}· © 2026 Tata Data
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: 'rgba(244,237,224,0.3)', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,237,224,0.62)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.3)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
