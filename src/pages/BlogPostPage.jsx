import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StickyCTA from '../components/StickyCTA'
import { getArticleBySlug, articles } from '../blog/articles.jsx'
import { useSeo } from '../hooks/useSeo'

const categoryColor = {
  'HPP & Biaya': '#c9a96e',
  'Tips Bisnis': '#7cb89a',
  'Bakery': '#b07a9e',
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  useSeo(article && {
    title: `${article.title} | Tata Data Dapur`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      articleSection: article.category,
      inLanguage: 'id-ID',
      author: { '@type': 'Organization', name: 'Tata Data Dapur' },
      publisher: {
        '@type': 'Organization',
        name: 'Tata Data Dapur',
        logo: { '@type': 'ImageObject', url: 'https://tatadatadapur.my.id/assets/td-logo.png' },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://tatadatadapur.my.id/blog/${article.slug}`,
      },
    },
  })

  if (!article) return <Navigate to="/blog" replace />

  const { title, category, publishedAt, readTime, image, imageAlt, Content } = article
  const otherArticles = articles.filter(a => a.slug !== slug).slice(0, 2)

  return (
    <div style={{ background: '#FFFCF8', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ position: 'relative', height: '400px', overflow: 'hidden', marginTop: '64px' }}>
        <img
          src={image}
          alt={imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,8,0.15) 0%, rgba(26,18,8,0.5) 100%)' }} />
      </div>

      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginTop: '-48px', position: 'relative', zIndex: 10, background: 'white', borderRadius: '16px', padding: '32px 40px', boxShadow: '0 4px 32px rgba(26,18,8,0.12)', marginBottom: '0' }}>
          <span style={{
            display: 'inline-block',
            background: '#fdf6ec',
            color: categoryColor[category] || '#c9a96e',
            border: `1px solid ${categoryColor[category] || '#c9a96e'}`,
            borderRadius: '20px',
            padding: '3px 12px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.3px',
            marginBottom: '14px',
          }}>
            {category}
          </span>
          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: 700,
            color: '#1B1208',
            letterSpacing: '-0.8px',
            lineHeight: 1.25,
            marginBottom: '14px',
          }}>
            {title}
          </h1>
          <p style={{ fontSize: '13px', color: '#9B7B5A' }}>
            {publishedAt} · {readTime} baca
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '32px 40px 40px', marginBottom: '40px', boxShadow: '0 4px 32px rgba(26,18,8,0.06)' }}>
          <Content />
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1B1208 0%, #3D2510 100%)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '12px' }}>
            Tata Data Dapur
          </p>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#FFFCF8', letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: '16px' }}>
            Hitung HPP otomatis, pantau stok, laporan keuangan lengkap — bayar sekali, pakai selamanya.
          </h2>
          <a
            href="https://wa.me/6287850755050"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#c9a96e',
              color: '#1B1208',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
            }}
          >
            Coba Gratis Sekarang
          </a>
        </div>

        {otherArticles.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: 700, color: '#1B1208', marginBottom: '20px' }}>
              Artikel Lainnya
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {otherArticles.map(a => (
                <Link key={a.slug} to={`/blog/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,18,8,0.07)' }}>
                    <img src={a.image} alt={a.imageAlt} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                    <div style={{ padding: '16px' }}>
                      <p style={{ fontSize: '12px', color: '#9B7B5A', marginBottom: '6px' }}>{a.category}</p>
                      <p style={{ fontFamily: 'Fraunces, serif', fontSize: '15px', fontWeight: 700, color: '#1B1208', lineHeight: 1.3 }}>{a.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>

      <Footer />
      <StickyCTA />
    </div>
  )
}
