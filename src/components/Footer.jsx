import React from 'react'

const footerLinks = {
  'Produk': ['Fitur', 'Cara Kerja', 'Harga', 'FAQ'],
  'Ekosistem': ['Tata Data Bahari', 'Tata Data Toko', 'Blog', 'Komunitas'],
  'Kontak': ['WhatsApp', 'Email', 'Instagram', 'LinkedIn'],
}

export default function Footer() {
  return (
    <footer style={{
      background: '#1B1208',
      paddingTop: '64px',
      paddingBottom: '64px',
      paddingLeft: '48px',
      paddingRight: '48px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top section: 4-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '0',
        }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                background: '#F4EDE0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                  color: '#1B1208',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                }}>
                  td
                </span>
              </div>
              <span style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '0.95rem',
                color: '#F4EDE0',
                fontWeight: 400,
              }}>
                Tata Data Dapur
              </span>
            </div>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.85rem',
              color: 'rgba(244,237,224,0.55)',
              lineHeight: 1.65,
              maxWidth: '240px',
              margin: 0,
            }}>
              Kelola keuangan dapur kamu dengan data. Hitung HPP, pantau profit, dan buat keputusan lebih cerdas.
            </p>

            {/* Tata Data ecosystem hint */}
            <div style={{ marginTop: '24px' }}>
              <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.6rem',
                color: 'rgba(244,237,224,0.3)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>
                Bagian dari
              </div>
              <div style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontStyle: 'italic',
                fontSize: '0.85rem',
                color: 'rgba(196,154,63,0.7)',
              }}>
                Ekosistem Tata Data
              </div>
            </div>
          </div>

          {/* Cols 2-4: Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.62rem',
                color: 'rgba(244,237,224,0.35)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}>
                {group}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '0.85rem',
                        color: 'rgba(244,237,224,0.55)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#F4EDE0'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,237,224,0.55)'}
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
          borderTop: '1px solid rgba(244,237,224,0.08)',
          paddingTop: '24px',
          marginTop: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.65rem',
            color: 'rgba(244,237,224,0.35)',
            letterSpacing: '0.03em',
          }}>
            © 2026 Tata Data — Made with ♥ in Indonesia
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.65rem',
                  color: 'rgba(244,237,224,0.35)',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(244,237,224,0.65)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,237,224,0.35)'}
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
