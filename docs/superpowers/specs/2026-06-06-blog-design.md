# Blog Feature Design — Tata Data Dapur

## Overview

Tambah fitur blog statis (hardcoded) ke landing page untuk meningkatkan SEO organik. Target keyword: HPP resep, aplikasi kasir vs HPP, keuangan bisnis bakery.

## Routes

- `/blog` — halaman index blog
- `/blog/:slug` — halaman artikel individual

## Halaman `/blog`

**Layout C (featured + grid):**
- Hero section: judul "Tips & Panduan Bisnis Kuliner" + subtitle
- Artikel featured (pertama): gambar besar, kategori tag, judul, cuplikan 2–3 kalimat, estimasi baca, tombol "Baca Selengkapnya"
- Grid 2 kolom di bawah: 2 artikel sisanya sebagai kartu (gambar, kategori, judul, cuplikan, estimasi baca)
- CTA section di bawah: ajak ke landing page utama

## Halaman `/blog/:slug`

- Navbar sama seperti landing page (import komponen yang sudah ada)
- Gambar header full-width dengan overlay
- Meta: kategori tag, judul H1, tanggal publish, estimasi baca
- Body artikel: ~800–1000 kata, subheading H2/H3 mengandung keyword SEO
- CTA di bawah artikel: "Coba Tata Data Dapur — Bayar Sekali, Pakai Selamanya" → link ke landing page utama
- Footer sama seperti landing page

## Data Artikel (hardcoded)

Disimpan di `src/blog/articles.js` sebagai array of objects:

```js
{
  slug: 'cara-hitung-hpp-resep',
  title: '...',
  excerpt: '...',
  category: 'HPP & Biaya',
  readTime: '5 menit',
  publishedAt: '2026-06-06',
  image: 'https://images.unsplash.com/...',
  content: '...' // HTML string atau JSX
}
```

## Artikel

1. **Cara Hitung HPP Resep Makanan Secara Otomatis**
   - Slug: `cara-hitung-hpp-resep`
   - Keyword target: cara hitung hpp resep, hpp otomatis kuliner, rumus hpp makanan
   - Kategori: HPP & Biaya

2. **Beda Aplikasi Kasir dan Aplikasi HPP — Mana yang Kamu Butuhkan?**
   - Slug: `aplikasi-kasir-vs-hpp`
   - Keyword target: aplikasi kasir kuliner, aplikasi hpp, beda kasir dan hpp
   - Kategori: Tips Bisnis

3. **Cara Kelola Keuangan Bisnis Bakery agar Tidak Rugi**
   - Slug: `keuangan-bisnis-bakery`
   - Keyword target: keuangan bisnis bakery, hpp bakery, manajemen keuangan toko kue
   - Kategori: Bakery

## Gambar

Ambil dari Unsplash (gratis, query relevan per artikel: "food cost calculation", "bakery kitchen", "restaurant cashier"). URL langsung dari Unsplash CDN, tidak perlu download.

## Styling

- Font: Plus Jakarta Sans (sudah ada di project)
- Warna aksen: `#c9a96e` (sama seperti landing page)
- Background: `#faf8f4` (warm off-white, sama seperti landing page)
- Komponen yang di-reuse: Navbar, Footer, StickyCTA

## Sitemap

Tambahkan 3 URL artikel baru ke `public/sitemap.xml`.

## Tidak dalam scope

- CMS / database
- Komentar
- Search artikel
- Pagination (artikel masih sedikit)
- RSS feed
