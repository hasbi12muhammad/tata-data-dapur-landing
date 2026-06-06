# Blog Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tambah fitur blog statis (3 artikel) ke landing page untuk meningkatkan SEO organik, dengan halaman index `/blog` dan halaman artikel `/blog/:slug`.

**Architecture:** Artikel disimpan hardcoded di `src/blog/articles.js` sebagai array of objects dengan konten JSX. Dua halaman baru dibuat sebagai page components (`BlogIndexPage`, `BlogPostPage`) menggunakan pola yang sudah ada (inline styles, Navbar + Footer). Route ditambahkan di `App.jsx`.

**Tech Stack:** React, React Router DOM, inline styles (konsisten dengan codebase), Unsplash CDN untuk gambar

---

## File Structure

| File | Status | Tanggung jawab |
|------|--------|----------------|
| `src/blog/articles.js` | Create | Data + konten semua artikel |
| `src/pages/BlogIndexPage.jsx` | Create | Halaman `/blog` — featured + grid layout |
| `src/pages/BlogPostPage.jsx` | Create | Halaman `/blog/:slug` — artikel individual |
| `src/App.jsx` | Modify | Tambah routes `/blog` dan `/blog/:slug` |
| `public/sitemap.xml` | Modify | Tambah 3 URL artikel |

---

## Task 1: Data artikel — `src/blog/articles.js`

**Files:**
- Create: `src/blog/articles.js`

- [ ] **Step 1: Buat direktori dan file**

```bash
mkdir -p src/blog
```

- [ ] **Step 2: Tulis `src/blog/articles.js` dengan konten lengkap**

```js
import React from 'react'

const S = {
  p: { marginBottom: '20px', color: '#3D2510', fontSize: '17px', lineHeight: '1.8' },
  h2: {
    fontFamily: 'Fraunces, serif',
    fontSize: '22px',
    fontWeight: 700,
    color: '#1B1208',
    marginTop: '40px',
    marginBottom: '12px',
    letterSpacing: '-0.3px',
  },
  h3: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontSize: '17px',
    fontWeight: 700,
    color: '#1B1208',
    marginTop: '28px',
    marginBottom: '8px',
  },
  ul: { paddingLeft: '20px', marginBottom: '20px', color: '#3D2510', fontSize: '17px', lineHeight: '1.8' },
  li: { marginBottom: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '15px' },
  th: { background: '#f5f0e8', padding: '10px 14px', textAlign: 'left', color: '#1B1208', fontWeight: 700, borderBottom: '2px solid #e8d5b0' },
  td: { padding: '10px 14px', borderBottom: '1px solid #f0e8d8', color: '#3D2510' },
  strong: { color: '#1B1208', fontWeight: 700 },
  callout: {
    background: '#fdf6ec',
    border: '1px solid #e8d5b0',
    borderLeft: '4px solid #c9a96e',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '24px',
    color: '#3D2510',
    fontSize: '16px',
    lineHeight: '1.7',
  },
}

function ContentHPP() {
  return (
    <div>
      <p style={S.p}>
        Setiap pemilik usaha kuliner pasti pernah bertanya: <em>"Sudah jualan tiap hari, tapi kok untungnya tipis?"</em> Jawabannya sering ada di satu tempat yang sering diabaikan — HPP atau Harga Pokok Produksi.
      </p>
      <p style={S.p}>
        HPP adalah total biaya yang kamu keluarkan untuk membuat satu porsi atau satu produk. Tanpa tahu HPP, kamu hanya bisa menebak-nebak apakah harga jualmu sudah menghasilkan keuntungan atau justru nombok.
      </p>

      <h2 style={S.h2}>Apa Itu HPP Resep?</h2>
      <p style={S.p}>
        <strong style={S.strong}>HPP resep</strong> adalah perhitungan biaya bahan baku yang dibutuhkan untuk membuat satu menu. Misalnya, kamu jual nasi goreng seharga Rp 25.000. Tapi berapa biaya yang kamu habiskan untuk beli beras, telur, bumbu, minyak, dan bahan lainnya? Itulah HPP.
      </p>
      <p style={S.p}>
        Tanpa tahu angka ini, kamu tidak bisa tahu apakah harga jualmu sudah menutupi biaya produksi — apalagi menghasilkan keuntungan.
      </p>

      <h2 style={S.h2}>Rumus HPP Makanan yang Sederhana</h2>
      <div style={S.callout}>
        <strong>HPP per porsi</strong> = (Total biaya bahan baku dalam resep) ÷ (Jumlah porsi yang dihasilkan)
      </div>
      <p style={S.p}>Contoh untuk satu porsi nasi goreng:</p>
      <ul style={S.ul}>
        <li style={S.li}>Beras 200g = Rp 2.000</li>
        <li style={S.li}>Telur 1 butir = Rp 2.500</li>
        <li style={S.li}>Bumbu + minyak = Rp 1.500</li>
        <li style={S.li}><strong style={S.strong}>Total HPP = Rp 6.000</strong></li>
      </ul>
      <p style={S.p}>
        Kalau kamu jual Rp 25.000, margin kotormu adalah Rp 19.000 atau 76%. Tapi kalau kamu tidak tahu angka ini, kamu tidak bisa tahu menu mana yang paling menguntungkan.
      </p>

      <h2 style={S.h2}>Masalah Menghitung HPP Secara Manual</h2>
      <p style={S.p}>Menghitung HPP manual terdengar mudah. Tapi masalah mulai muncul saat:</p>
      <ul style={S.ul}>
        <li style={S.li}>Harga bahan baku naik setiap minggu</li>
        <li style={S.li}>Kamu punya banyak menu dengan bahan yang tumpang tindih</li>
        <li style={S.li}>Porsi tidak selalu konsisten antar karyawan</li>
        <li style={S.li}>Kamu lupa update perhitungan setelah belanja terakhir</li>
      </ul>
      <p style={S.p}>
        Banyak pemilik warung yang masih mengandalkan spreadsheet atau bahkan catatan tulis tangan. Ini bisa jalan untuk 3-5 menu, tapi akan kewalahan saat menu bertambah.
      </p>

      <h2 style={S.h2}>Cara Hitung HPP Resep Secara Otomatis</h2>
      <p style={S.p}>Dengan aplikasi manajemen kuliner seperti Tata Data Dapur, prosesnya jadi jauh lebih mudah:</p>
      <ul style={S.ul}>
        <li style={S.li}><strong style={S.strong}>Input resep sekali:</strong> masukkan semua bahan dan takaran untuk setiap menu</li>
        <li style={S.li}><strong style={S.strong}>Hubungkan ke harga bahan baku:</strong> setiap kali kamu update harga beli, HPP semua menu yang pakai bahan itu langsung ikut terupdate</li>
        <li style={S.li}><strong style={S.strong}>Lihat HPP real-time:</strong> kamu tahu persis berapa biaya produksi tiap menu saat ini, bukan berdasarkan harga bulan lalu</li>
      </ul>

      <h2 style={S.h2}>Berapa Persen HPP yang Ideal untuk Bisnis Kuliner?</h2>
      <p style={S.p}>Secara umum, HPP yang sehat untuk bisnis kuliner adalah <strong style={S.strong}>25–35% dari harga jual</strong>. Artinya, dari setiap Rp 100.000 yang masuk, maksimal Rp 35.000 habis untuk bahan baku.</p>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}>Jenis Usaha</th>
            <th style={S.th}>Target HPP Ideal</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={S.td}>Warung makan sederhana</td><td style={S.td}>35–50%</td></tr>
          <tr><td style={S.td}>Kafe / coffee shop</td><td style={S.td}>25–35%</td></tr>
          <tr><td style={S.td}>Bakery & pastry</td><td style={S.td}>30–40%</td></tr>
          <tr><td style={S.td}>Catering</td><td style={S.td}>30–40%</td></tr>
        </tbody>
      </table>

      <h2 style={S.h2}>Kesimpulan</h2>
      <p style={S.p}>
        Menghitung HPP bukan sekadar soal angka — ini tentang memahami kesehatan bisnis kulinermu. Tanpa HPP yang jelas, kamu tidak bisa menentukan harga yang tepat, tidak bisa tahu menu mana yang paling menguntungkan, dan tidak bisa mengambil keputusan saat harga bahan baku naik.
      </p>
      <p style={S.p}>
        Mulai dari yang sederhana: hitung HPP 3 menu terlaris kamu hari ini. Kamu mungkin akan kaget dengan hasilnya.
      </p>
    </div>
  )
}

function ContentKasirVsHPP() {
  return (
    <div>
      <p style={S.p}>
        Kalau kamu sedang cari aplikasi untuk bisnis kuliner, kemungkinan besar kamu akan menemui dua jenis: <strong style={S.strong}>aplikasi kasir (POS)</strong> dan <strong style={S.strong}>aplikasi manajemen HPP</strong>. Keduanya berbeda fungsinya, dan salah pilih bisa bikin kamu bayar untuk fitur yang tidak kamu butuhkan.
      </p>

      <h2 style={S.h2}>Apa Itu Aplikasi Kasir (POS)?</h2>
      <p style={S.p}>
        Aplikasi kasir atau <em>Point of Sale</em> (POS) dirancang untuk mempercepat proses transaksi di bagian depan bisnis — yang pelanggan lihat langsung.
      </p>
      <p style={S.p}>Fitur utama aplikasi kasir:</p>
      <ul style={S.ul}>
        <li style={S.li}>Tampilkan menu ke pelanggan</li>
        <li style={S.li}>Proses pembayaran (tunai, QRIS, kartu)</li>
        <li style={S.li}>Cetak atau kirim struk digital</li>
        <li style={S.li}>Kelola antrian pesanan</li>
        <li style={S.li}>Laporan omzet harian</li>
      </ul>
      <p style={S.p}>
        Aplikasi kasir bagus untuk bisnis yang volume transaksinya tinggi — restoran ramai, kafe yang selalu antre, atau toko dengan banyak pembeli per hari.
      </p>

      <h2 style={S.h2}>Apa Itu Aplikasi HPP / Manajemen Kuliner?</h2>
      <p style={S.p}>
        Aplikasi HPP fokus ke bagian belakang bisnis — bukan transaksi, tapi <strong style={S.strong}>biaya dan profitabilitas</strong>. Pertanyaan yang dijawab: "Apakah saya benar-benar untung?"
      </p>
      <p style={S.p}>Fitur utama aplikasi HPP:</p>
      <ul style={S.ul}>
        <li style={S.li}>Hitung HPP setiap menu secara otomatis</li>
        <li style={S.li}>Pantau stok bahan baku real-time</li>
        <li style={S.li}>Catat pembelian bahan baku</li>
        <li style={S.li}>Laporan laba-rugi lengkap</li>
        <li style={S.li}>Analisis margin per menu</li>
      </ul>

      <h2 style={S.h2}>Perbandingan Langsung</h2>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}></th>
            <th style={S.th}>Aplikasi Kasir</th>
            <th style={S.th}>Aplikasi HPP</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={S.td}>Fokus utama</td><td style={S.td}>Transaksi pelanggan</td><td style={S.td}>Biaya & profitabilitas</td></tr>
          <tr><td style={S.td}>Laporan</td><td style={S.td}>Omzet</td><td style={S.td}>Laba bersih, HPP, margin</td></tr>
          <tr><td style={S.td}>Manajemen stok</td><td style={S.td}>Terbatas</td><td style={S.td}>Lengkap dengan FIFO</td></tr>
          <tr><td style={S.td}>Cocok untuk</td><td style={S.td}>Restoran ramai</td><td style={S.td}>Semua bisnis kuliner</td></tr>
          <tr><td style={S.td}>Pertanyaan yang dijawab</td><td style={S.td}>"Berapa yang terjual?"</td><td style={S.td}>"Berapa yang benar-benar untung?"</td></tr>
        </tbody>
      </table>

      <h2 style={S.h2}>Mana yang Kamu Butuhkan?</h2>
      <p style={S.p}>
        Kalau kamu pemilik warung, catering, atau bakery rumahan yang pertanyaannya adalah <em>"kenapa uangnya habis padahal jualan terus?"</em> — kamu butuh <strong style={S.strong}>aplikasi HPP</strong>, bukan kasir.
      </p>
      <p style={S.p}>
        Kalau kamu restoran dengan banyak meja, kasir dedicated, dan antrian panjang setiap hari — kamu mungkin butuh aplikasi kasir, dan nanti bisa ditambah dengan aplikasi HPP.
      </p>
      <div style={S.callout}>
        <strong>Ingat:</strong> Banyak bisnis kuliner tutup bukan karena sepi pengunjung, tapi karena tidak sadar mereka sebenarnya rugi di setiap transaksi. Aplikasi kasir tidak akan memberitahumu soal itu.
      </div>

      <h2 style={S.h2}>Mulai dari Mana?</h2>
      <p style={S.p}>
        Untuk UMKM kuliner yang baru berkembang, urutan yang masuk akal adalah:
      </p>
      <ul style={S.ul}>
        <li style={S.li}><strong style={S.strong}>Tahap 1:</strong> Pakai aplikasi HPP — kendalikan biaya, pahami margin</li>
        <li style={S.li}><strong style={S.strong}>Tahap 2:</strong> Saat omzet sudah besar dan transaksi harian ramai, tambahkan aplikasi kasir</li>
      </ul>
      <p style={S.p}>
        Jangan terbalik. Banyak pengusaha kuliner beli aplikasi kasir dulu karena terlihat "profesional," tapi tetap tidak tahu kenapa bisnisnya tidak untung.
      </p>
    </div>
  )
}

function ContentBakery() {
  return (
    <div>
      <p style={S.p}>
        Bisnis bakery terlihat menjanjikan — produknya disukai banyak orang, bisa dijalankan dari rumah, dan modal awal relatif terjangkau. Tapi angka tutup usaha di bisnis bakery cukup tinggi. Salah satu penyebab utamanya: <strong style={S.strong}>pengelolaan keuangan yang tidak terstruktur</strong>.
      </p>

      <h2 style={S.h2}>4 Kesalahan Keuangan yang Sering Dilakukan Pemilik Bakery</h2>

      <h3 style={S.h3}>1. Tidak Tahu HPP Per Produk</h3>
      <p style={S.p}>
        Banyak pemilik bakery menentukan harga jual berdasarkan feeling atau melihat harga kompetitor. Padahal dua bakery yang jual croissant dengan harga sama bisa punya biaya produksi yang sangat berbeda — tergantung resep, supplier, dan skala produksi.
      </p>

      <h3 style={S.h3}>2. Tidak Memisahkan Uang Bisnis dan Pribadi</h3>
      <p style={S.p}>
        Ini kesalahan klasik. Uang masuk dari penjualan langsung dipakai untuk kebutuhan pribadi, dan ketika butuh belanja bahan, baru sadar uangnya kurang. Tanpa rekening bisnis yang terpisah, kamu tidak bisa tahu bisnis ini sebenarnya untung atau rugi.
      </p>

      <h3 style={S.h3}>3. Tidak Menghitung Biaya Overhead</h3>
      <p style={S.p}>
        Listrik oven, gas, plastik kemasan, box, label — ini semua biaya yang sering lupa dimasukkan ke HPP. Padahal bisa 10–20% dari total biaya produksi. Kalau tidak dihitung, margin yang kamu kira 40% bisa jadi cuma 20%.
      </p>

      <h3 style={S.h3}>4. Tidak Update HPP Saat Harga Bahan Naik</h3>
      <p style={S.p}>
        Harga tepung terigu naik? Harga butter naik? Banyak pemilik bakery lupa update harga jual karena tidak tahu HPP mereka sudah berubah. Mereka terus jual di harga lama — dan tanpa sadar, margin mereka menipis setiap bulan.
      </p>

      <h2 style={S.h2}>Cara Menghitung HPP Bakery yang Benar</h2>
      <div style={S.callout}>
        <strong>HPP per item</strong> = Biaya bahan baku + Biaya kemasan + Alokasi biaya overhead
      </div>
      <p style={S.p}>Contoh untuk 1 loaf roti tawar:</p>
      <ul style={S.ul}>
        <li style={S.li}>Bahan baku (tepung, ragi, gula, garam, mentega, susu): Rp 12.000</li>
        <li style={S.li}>Kemasan plastik + label: Rp 1.500</li>
        <li style={S.li}>Overhead (listrik, gas — estimasi per loaf): Rp 2.000</li>
        <li style={S.li}><strong style={S.strong}>Total HPP: Rp 15.500</strong></li>
      </ul>
      <p style={S.p}>
        Kalau kamu jual Rp 28.000, margin kotormu adalah Rp 12.500 atau sekitar 45%. Itu angka yang sehat untuk bakery. Tapi kalau kamu tidak tahu angka ini, kamu tidak bisa tahu apakah kenaikan harga tepung bulan ini sudah menggerus marginmu atau belum.
      </p>

      <h2 style={S.h2}>Manfaat Pakai Aplikasi Manajemen untuk Bakery</h2>
      <p style={S.p}>Dengan aplikasi seperti Tata Data Dapur, pengelolaan keuangan bakery jadi lebih mudah:</p>
      <ul style={S.ul}>
        <li style={S.li}>Input resep semua produk sekali di awal</li>
        <li style={S.li}>Setiap harga bahan baku berubah, HPP semua produk ikut update otomatis</li>
        <li style={S.li}>Pantau stok bahan baku — tahu kapan harus belanja sebelum kehabisan</li>
        <li style={S.li}>Lihat laporan laba bersih per periode, bukan hanya omzet</li>
      </ul>

      <h2 style={S.h2}>5 Tips Praktis Kelola Keuangan Bakery</h2>
      <ul style={S.ul}>
        <li style={S.li}><strong style={S.strong}>Pisahkan rekening bisnis dan pribadi</strong> sejak hari pertama</li>
        <li style={S.li}><strong style={S.strong}>Catat setiap pembelian bahan baku</strong> — jangan tunggu akhir bulan</li>
        <li style={S.li}><strong style={S.strong}>Hitung HPP semua produk</strong> sebelum menentukan harga jual</li>
        <li style={S.li}><strong style={S.strong}>Review harga jual setiap 3 bulan</strong> atau saat ada kenaikan bahan baku signifikan</li>
        <li style={S.li}><strong style={S.strong}>Target margin kotor minimal 40%</strong> untuk bisnis bakery yang sehat</li>
      </ul>

      <h2 style={S.h2}>Kesimpulan</h2>
      <p style={S.p}>
        Bisnis bakery yang sukses bukan yang paling enak produknya saja — tapi yang paling disiplin dalam mengelola keuangan. Mulai dari hal sederhana: hitung HPP setiap produk yang kamu jual, pisahkan keuangan bisnis dan pribadi, dan update harga saat biaya produksi naik.
      </p>
      <p style={S.p}>
        Kalau kamu sudah melakukan tiga hal itu, kamu sudah lebih baik dari mayoritas pemilik bakery di Indonesia.
      </p>
    </div>
  )
}

export const articles = [
  {
    slug: 'cara-hitung-hpp-resep',
    title: 'Cara Hitung HPP Resep Makanan Secara Otomatis',
    excerpt: 'Sudah jualan tiap hari tapi untungnya tipis? Jawabannya sering ada di HPP yang tidak dihitung dengan benar. Pelajari rumus HPP resep dan cara menghitungnya otomatis.',
    category: 'HPP & Biaya',
    readTime: '5 menit',
    publishedAt: '6 Juni 2026',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80',
    imageAlt: 'Proses memasak di dapur restoran profesional',
    Content: ContentHPP,
  },
  {
    slug: 'aplikasi-kasir-vs-hpp',
    title: 'Beda Aplikasi Kasir dan Aplikasi HPP — Mana yang Kamu Butuhkan?',
    excerpt: 'Aplikasi kasir dan aplikasi HPP terlihat mirip, tapi fungsinya sangat berbeda. Salah pilih bisa bikin kamu bayar untuk fitur yang tidak kamu butuhkan.',
    category: 'Tips Bisnis',
    readTime: '4 menit',
    publishedAt: '6 Juni 2026',
    image: 'https://images.unsplash.com/photo-1647427017067-8f33ccbae493?w=1200&q=80',
    imageAlt: 'Penggunaan aplikasi POS di restoran',
    Content: ContentKasirVsHPP,
  },
  {
    slug: 'keuangan-bisnis-bakery',
    title: 'Cara Kelola Keuangan Bisnis Bakery agar Tidak Rugi',
    excerpt: 'Banyak bisnis bakery tutup bukan karena produknya tidak laku, tapi karena pengelolaan keuangan yang tidak terstruktur. Ini 4 kesalahan yang harus kamu hindari.',
    category: 'Bakery',
    readTime: '6 menit',
    publishedAt: '6 Juni 2026',
    image: 'https://images.unsplash.com/photo-1528034441002-cdbf746744b4?w=1200&q=80',
    imageAlt: 'Display produk bakery yang menarik',
    Content: ContentBakery,
  },
]

export function getArticleBySlug(slug) {
  return articles.find(a => a.slug === slug) || null
}
```

- [ ] **Step 3: Commit**

```bash
git add src/blog/articles.js
git commit -m "feat: add blog article data with 3 SEO-optimized articles"
```

---

## Task 2: Halaman index blog — `src/pages/BlogIndexPage.jsx`

**Files:**
- Create: `src/pages/BlogIndexPage.jsx`

- [ ] **Step 1: Buat `src/pages/BlogIndexPage.jsx`**

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StickyCTA from '../components/StickyCTA'
import { articles } from '../blog/articles'

const featured = articles[0]
const rest = articles.slice(1)

const tag = (label, color = '#c9a96e') => ({
  display: 'inline-block',
  background: '#fdf6ec',
  color,
  border: `1px solid ${color}`,
  borderRadius: '20px',
  padding: '3px 12px',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.3px',
  marginBottom: '10px',
})

export default function BlogIndexPage() {
  return (
    <div style={{ background: '#FFFCF8', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ paddingTop: '120px', paddingBottom: '48px', textAlign: 'center', padding: '120px 24px 48px' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '12px' }}>
          Blog
        </p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, color: '#1B1208', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px' }}>
          Tips & Panduan Bisnis Kuliner
        </h1>
        <p style={{ fontSize: '17px', color: '#5C3D1E', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
          Artikel praktis soal HPP, manajemen stok, dan keuangan untuk pemilik bisnis kuliner Indonesia.
        </p>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Featured article */}
        <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(26,18,8,0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,18,8,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(26,18,8,0.08)' }}
          >
            <img
              src={featured.image}
              alt={featured.imageAlt}
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '28px 32px' }}>
              <span style={tag(featured.category === 'HPP & Biaya' ? '#c9a96e' : featured.category === 'Tips Bisnis' ? '#7cb89a' : '#b07a9e')}>
                {featured.category}
              </span>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#1B1208', letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: '12px' }}>
                {featured.title}
              </h2>
              <p style={{ color: '#5C3D1E', fontSize: '16px', lineHeight: 1.7, marginBottom: '16px' }}>
                {featured.excerpt}
              </p>
              <p style={{ fontSize: '13px', color: '#9B7B5A' }}>
                {featured.publishedAt} · {featured.readTime} baca
              </p>
            </div>
          </div>
        </Link>

        {/* Grid artikel lainnya */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {rest.map(article => (
            <Link key={article.slug} to={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(26,18,8,0.07)',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,18,8,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,18,8,0.07)' }}
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '20px 24px' }}>
                  <span style={tag(article.category === 'HPP & Biaya' ? '#c9a96e' : article.category === 'Tips Bisnis' ? '#7cb89a' : '#b07a9e')}>
                    {article.category}
                  </span>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 700, color: '#1B1208', letterSpacing: '-0.3px', lineHeight: 1.3, marginBottom: '10px' }}>
                    {article.title}
                  </h3>
                  <p style={{ color: '#5C3D1E', fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>
                    {article.excerpt}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9B7B5A' }}>
                    {article.publishedAt} · {article.readTime} baca
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <StickyCTA />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/BlogIndexPage.jsx
git commit -m "feat: add BlogIndexPage with featured + grid layout"
```

---

## Task 3: Halaman artikel — `src/pages/BlogPostPage.jsx`

**Files:**
- Create: `src/pages/BlogPostPage.jsx`

- [ ] **Step 1: Buat `src/pages/BlogPostPage.jsx`**

```jsx
import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StickyCTA from '../components/StickyCTA'
import { getArticleBySlug, articles } from '../blog/articles'

const categoryColor = {
  'HPP & Biaya': '#c9a96e',
  'Tips Bisnis': '#7cb89a',
  'Bakery': '#b07a9e',
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <Navigate to="/blog" replace />

  const { title, category, publishedAt, readTime, image, imageAlt, Content } = article

  const otherArticles = articles.filter(a => a.slug !== slug).slice(0, 2)

  return (
    <div style={{ background: '#FFFCF8', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero image */}
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden', marginTop: '64px' }}>
        <img
          src={image}
          alt={imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,8,0.15) 0%, rgba(26,18,8,0.5) 100%)' }} />
      </div>

      {/* Article */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>

        {/* Meta */}
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

        {/* Content */}
        <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '32px 40px 40px', marginBottom: '40px', boxShadow: '0 4px 32px rgba(26,18,8,0.06)' }}>
          <Content />
        </div>

        {/* CTA */}
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
            href="https://app.tatadatadapur.my.id"
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

        {/* Artikel lainnya */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/BlogPostPage.jsx
git commit -m "feat: add BlogPostPage with article content and related articles"
```

---

## Task 4: Tambah routes di `App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Import kedua halaman baru**

Tambahkan dua baris import setelah baris `import RefundPage from './pages/RefundPage'`:

```js
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
```

- [ ] **Step 2: Tambah dua route baru**

Tambahkan setelah `<Route path="/refund" element={<RefundPage />} />`:

```jsx
<Route path="/blog" element={<BlogIndexPage />} />
<Route path="/blog/:slug" element={<BlogPostPage />} />
```

- [ ] **Step 3: Verifikasi manual**

Jalankan dev server:
```bash
npm run dev
```

Buka browser dan cek:
- `http://localhost:5173/blog` → tampil halaman index dengan 1 artikel featured + 2 kartu
- `http://localhost:5173/blog/cara-hitung-hpp-resep` → tampil artikel lengkap
- `http://localhost:5173/blog/tidak-ada` → redirect ke `/blog`

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add /blog and /blog/:slug routes"
```

---

## Task 5: Update `public/sitemap.xml`

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Tambah 3 URL artikel ke sitemap**

Tambahkan sebelum tag penutup `</urlset>`:

```xml
  <url>
    <loc>https://tatadatadapur.my.id/blog</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tatadatadapur.my.id/blog/cara-hitung-hpp-resep</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tatadatadapur.my.id/blog/aplikasi-kasir-vs-hpp</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tatadatadapur.my.id/blog/keuangan-bisnis-bakery</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

- [ ] **Step 2: Commit + push**

```bash
git add public/sitemap.xml
git commit -m "feat: add blog URLs to sitemap"
git push origin main
```

---

## Checklist Akhir

Setelah semua task selesai, verifikasi:

- [ ] `/blog` tampil dengan 1 artikel featured besar + 2 kartu di bawah
- [ ] `/blog/cara-hitung-hpp-resep` tampil artikel lengkap dengan gambar header
- [ ] `/blog/aplikasi-kasir-vs-hpp` tampil artikel lengkap
- [ ] `/blog/keuangan-bisnis-bakery` tampil artikel lengkap
- [ ] Klik "Coba Gratis Sekarang" di CTA artikel mengarah ke app
- [ ] Mobile view terlihat rapi (grid jadi 1 kolom di layar kecil)
- [ ] Submit ulang sitemap di Google Search Console setelah deploy
