import React from 'react'
import {
  GarlicIllustration, StarAniseIllustration, ChiliIllustration,
  OnionIllustration, MortarPestleIllustration,
} from './illustrations/index'

const footerLinks = {
  'Produk': ['Fitur', 'Cara Kerja', 'Harga', 'FAQ'],
  'Ekosistem': ['Tata Data Bahari', 'Tata Data Toko', 'Blog', 'Komunitas'],
  'Kontak': ['WhatsApp', 'Email', 'Instagram', 'LinkedIn'],
}

export default function Footer() {
  return (
    <footer style={{
      background: '#1B1208', position: 'relative', overflow: 'hidden',
      paddingTop: '64px', paddingBottom: '64px',
      paddingLeft: '48px', paddingRight: '48px',
    }}>
      {/* Decorative corner illustrations */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'rgba(244,237,224,0.06)', zIndex: 0 }}>
        <MortarPestleIllustration style={{ width: 100, height: 88 }} />
      </div>
      <div style={{ position: 'absolute', top: '20px', right: '30px', color: 'rgba(244,237,224,0.05)', zIndex: 0, transform: 'rotate(15deg)' }}>
        <GarlicIllustration style={{ width: 80, height: 92 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '60px', right: '80px', color: 'rgba(196,154,63,0.08)', zIndex: 0, transform: 'rotate(-10deg)' }}>
        <StarAniseIllustration style={{ width: 60, height: 60 }} />
      </div>
      <div style={{ position: 'absolute', top: '40px', left: '180px', color: 'rgba(244,237,224,0.04)', zIndex: 0, transform: 'rotate(20deg)' }}>
        <ChiliIllustration style={{ width: 28, height: 55 }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px', marginBottom: '0',
        }}>
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px', height: '34px', background: '#F4EDE0',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic',
                  fontSize: '0.9rem', color: '#1B1208', fontWeight: 400, letterSpacing: '-0.02em',
                }}>
                  td
                </span>
              </div>
              <span style={{
                fontFamily: 'Fraunces, Georgia, serif', fontSize: '0.95rem',
                color: '#F4EDE0', fontWeight: 400,
              }}>
                Tata Data Dapur
              </span>
            </div>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem',
              color: 'rgba(244,237,224,0.52)', lineHeight: 1.65,
              maxWidth: '240px', margin: 0,
            }}>
              Kelola keuangan dapur kamu dengan data. Hitung HPP, pantau profit, dan buat keputusan lebih cerdas.
            </p>
            <div style={{ marginTop: '24px' }}>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
                color: 'rgba(244,237,224,0.28)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: '10px',
              }}>
                Bagian dari
              </div>
              <div style={{
                fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic',
                fontSize: '0.85rem', color: 'rgba(196,154,63,0.7)',
              }}>
                Ekosistem Tata Data
              </div>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.62rem',
                color: 'rgba(244,237,224,0.3)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: '18px',
              }}>
                {group}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{
                      fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem',
                      color: 'rgba(244,237,224,0.52)', textDecoration: 'none',
                      transition: 'color 0.2s ease', display: 'inline-block',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F4EDE0'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.52)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(244,237,224,0.07)',
          paddingTop: '24px', marginTop: '48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.65rem',
            color: 'rgba(244,237,224,0.3)', letterSpacing: '0.03em',
          }}>
            © 2026 Tata Data — Made with ♥ in Indonesia
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.65rem',
                color: 'rgba(244,237,224,0.3)', textDecoration: 'none',
                letterSpacing: '0.03em', transition: 'color 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,237,224,0.62)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,237,224,0.3)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
