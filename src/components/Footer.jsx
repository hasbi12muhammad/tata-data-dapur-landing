import React from 'react'
import SpiceImg from './SpiceImg'

const A = '/assets/components/'

const footerLinks = {
  'Produk': [
    { label: 'Fitur', href: '#fitur' },
    { label: 'Cara Kerja', href: '#cara-kerja' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Mulai Gratis', href: '#cta' },
  ],
  'Cocok Untuk': [
    { label: 'Warung Makan', href: '#cta' },
    { label: 'Restoran & Kafe', href: '#cta' },
    { label: 'Katering', href: '#cta' },
    { label: 'Bakeri', href: '#cta' },
  ],
  'Kontak': [
    { label: 'WhatsApp', href: 'https://wa.me/6287850755050' },
    { label: 'Email', href: 'mailto:hasbi12.muhammad@gmail.com' },
    { label: 'Instagram', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer-section" style={{ background: '#1B1208', position: 'relative', overflow: 'hidden', paddingTop: '64px', paddingBottom: '64px', paddingLeft: '48px', paddingRight: '48px' }}>
      {/* Corner illustrations */}
      <div className="footer-corner-illus" style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 0 }}>
        <SpiceImg src={`${A}20.png`} bg="dark" width={165} height={144} />
      </div>
      <div className="footer-corner-illus" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 0 }}>
        <div style={{ transform: 'rotate(12deg)' }}>
          <SpiceImg src={`${A}1.png`} bg="dark" width={132} height={132} />
        </div>
      </div>
      <div className="footer-corner-illus" style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 0 }}>
        <div style={{ transform: 'rotate(-10deg)' }}>
          <SpiceImg src={`${A}7.png`} bg="dark" width={105} height={105} />
        </div>
      </div>
      <div className="footer-corner-illus" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 0 }}>
        <div style={{ transform: 'rotate(18deg)' }}>
          <SpiceImg src={`${A}3.png`} bg="dark" width={63} height={96} opacity={0.35} />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '34px', height: '34px', background: '#1B1208', borderRadius: '50%', border: '1px solid rgba(244,237,224,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                <img src="/assets/td-logo.png" alt="TD" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '0.95rem', color: '#F4EDE0', fontWeight: 400 }}>
                Tata Data Dapur
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', color: 'rgba(244,237,224,0.52)', lineHeight: 1.65, maxWidth: '240px', margin: 0 }}>
              Hitung HPP, pantau profit harian, dan kelola bahan baku — semua dalam satu aplikasi untuk dapur kamu.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.62rem', color: 'rgba(244,237,224,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '18px' }}>{group}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', color: 'rgba(244,237,224,0.52)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F4EDE0'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.52)'}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(244,237,224,0.07)', paddingTop: '24px', marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: 'rgba(244,237,224,0.3)', letterSpacing: '0.03em' }}>
            Made by{' '}
            <a href="https://hasbi-portfolio.pages.dev/" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(244,237,224,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F4EDE0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.55)'}
            >Hasbi</a>
            {' '}· © 2026 Tata Data Dapur
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
