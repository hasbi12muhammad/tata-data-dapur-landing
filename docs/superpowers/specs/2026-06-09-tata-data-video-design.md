# Design Spec: Video Promosi Tata Data Dapur

**Date:** 2026-06-09  
**Status:** Approved  

---

## Overview

Satu Remotion project menghasilkan 4 komposisi video promosi untuk **Tata Data Dapur** — web app SaaS pencatatan bisnis kuliner & produksi ringan.

**Benang merah semua video:**
> Catat pembelian bahan baku → HPP otomatis berubah → Stok terupdate → Laporan akurat

---

## Spesifikasi Teknis

| Parameter | Nilai |
|-----------|-------|
| Framework | Remotion (React + TypeScript) |
| FPS | 30 |
| Format output | 9:16 (1080×1920), 16:9 (1920×1080), 1:1 (1080×1080) |
| Gaya visual | Warm Cream — background #F4EDE0, ilustrasi rempah melayang |
| Narasi | Teks on-screen + musik background royalty-free |
| Komposisi | 4 video (A-30s, A-60s, B-60s, C-60s) |
| Total output | 4 komposisi × 3 format = **12 video** |

---

## Brand Tokens

```ts
// src/tokens.ts
export const colors = {
  cream:    '#F4EDE0',
  creamLight: '#FBF6EC',
  dark:     '#1B1208',
  rust:     '#B5532A',
  gold:     '#C49A3F',
  muted:    '#5A3D25',
}

export const fonts = {
  heading: 'Fraunces, Georgia, serif',
  body:    '"Plus Jakarta Sans", system-ui, sans-serif',
  mono:    '"DM Mono", monospace',
}

export const fps = 30
```

---

## Struktur Project

```
tata-data-video/
├── src/
│   ├── Root.tsx                  # Daftarkan semua komposisi + 3 format
│   ├── tokens.ts                 # Brand colors, fonts, timing
│   ├── compositions/
│   │   ├── VideoA30.tsx          # Pain→Solusi 30s
│   │   ├── VideoA60.tsx          # Pain→Solusi 60s
│   │   ├── VideoB60.tsx          # Feature Showcase 60s
│   │   └── VideoC60.tsx          # Day-in-the-life 60s
│   ├── scenes/
│   │   ├── HookScene.tsx         # Pain point hook
│   │   ├── AgitateScene.tsx      # Agitasi masalah
│   │   ├── SolutionScene.tsx     # Introduce Tata Data Dapur
│   │   ├── PurchaseScene.tsx     # Catat pembelian → HPP berubah (CORE)
│   │   ├── StockScene.tsx        # Stok terupdate (CORE)
│   │   ├── HPPScene.tsx          # HPP otomatis per menu (CORE)
│   │   ├── ReportScene.tsx       # Laporan profit
│   │   ├── SalesScene.tsx        # Catat penjualan
│   │   ├── PriceScene.tsx        # Rp 175.000 bayar sekali
│   │   ├── CTAScene.tsx          # CTA + URL
│   │   ├── ShowcaseScene.tsx     # UI walkthrough (B only)
│   │   └── DayScene.tsx          # Day-in-life moments (C only)
│   └── components/
│       ├── BrandText.tsx         # Fraunces + Plus Jakarta Sans
│       ├── AppScreen.tsx         # Screenshot dengan frame HP (9:16) atau browser (16:9)
│       ├── SpiceFloat.tsx        # Ilustrasi rempah melayang animasi
│       ├── Logo.tsx              # td-logo.png
│       ├── BarChart.tsx          # Animated bar chart untuk laporan
│       └── HPPCounter.tsx        # Angka HPP yang berubah animasi (key visual)
├── public/
│   ├── td-logo.png               # dari tata-data-dapur-land-page/public/assets/
│   ├── screenshots/
│   │   ├── bahan-baku.png
│   │   ├── dashboard.png
│   │   ├── laporan.png
│   │   ├── pembelian.png
│   │   ├── pengeluaran.png
│   │   ├── penjualan.png
│   │   └── produk.png
│   ├── illustrations/            # components/1.png – 25.png
│   └── music/
│       └── background.mp3        # Royalty-free warm/upbeat (Pixabay/Freepd)
└── remotion.config.ts
```

---

## Komposisi & Scene Breakdown

### Video A — Pain→Solusi→Demo→CTA (30s = 900 frames)

| # | Scene | Durasi | Frames | Copy | Asset |
|---|-------|--------|--------|------|-------|
| 1 | Hook | 4s | 0–120 | "HPP kamu masih dihitung manual?" | Teks stagger masuk |
| 2 | Agitate | 3s | 120–210 | "Harga bahan naik — kamu tahu ga HPP berubah?" | Teks coret animasi |
| 3 | Solve | 4s | 210–330 | Logo + "Tata Data Dapur" | td-logo.png fade in |
| 4a | Pembelian | 4s | 330–450 | "① Catat pembelian baru" | `pembelian.png` slide masuk |
| 4b | HPP update | 4s | 450–570 | "② HPP langsung ikut update" | `produk.png`, HPPCounter animasi |
| 4c | Stok | 4s | 570–690 | "③ Stok tercatat otomatis" | `bahan-baku.png` |
| 5 | Price+CTA | 4s | 690–810 | "Rp 175.000 · Bayar sekali" | Pulse button |
| 6 | Logo end | 3s | 810–900 | — | Fade out |

### Video A — Pain→Solusi→Demo→CTA (60s = 1800 frames)

Sama dengan 30s, scene 4 diperluas + tambahan:

| # | Scene | Durasi | Copy | Asset |
|---|-------|--------|------|-------|
| 1–3 | Hook+Agitate+Solve | 11s | (sama dengan 30s) | — |
| 4a | Pembelian | 6s | "Harga bahan naik? Catat pembelian baru —" | `pembelian.png` |
| 4b | HPP update | 6s | "— HPP semua menu langsung ikut update." | HPPCounter animasi |
| 4c | Stok | 6s | "Stok bahan baku tercatat, ga perlu hitung manual." | `bahan-baku.png` |
| 4d | Laporan | 6s | "Profit harian langsung keliatan — karena HPP akurat." | `laporan.png` |
| 5 | Tagline | 5s | "Setup 15 menit. Cocok untuk kuliner & produksi ringan." | Ilustrasi rempah |
| 6 | Price+CTA | 5s | "Rp 175.000 · Bayar sekali" | Pulse button |
| 7 | Logo end | 3s | — | Fade out |

---

### Video B — Feature Showcase (60s = 1800 frames)

| # | Scene | Durasi | Copy | Asset |
|---|-------|--------|------|-------|
| 1 | Intro | 4s | "Semua yang dapur butuhkan, sudah ada." | Logo masuk |
| 2 | **Catat pembelian** | 8s | "Harga bahan baku naik? Catat pembelian baru —" | `pembelian.png` animasi input |
| 3 | **HPP otomatis** | 8s | "— HPP semua menu langsung ikut update." | `produk.png`, HPPCounter |
| 4 | **Stok** | 7s | "Stok bahan baku tercatat, ga perlu hitung manual." | `bahan-baku.png` |
| 5 | Laporan | 6s | "Profit harian, mingguan, bulanan — tinggal lihat." | `laporan.png` |
| 6 | Penjualan | 5s | "Catat penjualan cepat dari HP." | `penjualan.png` |
| 7 | Export | 4s | "Export PDF & Excel kapan saja." | — |
| 8 | Price+CTA | 5s | "Rp 175.000 · Bayar sekali" | Pulse button |
| 9 | Logo end | 3s | — | Fade out |

---

### Video C — Day-in-the-life (60s = 1800 frames)

| # | Scene | Durasi | Copy | Asset |
|---|-------|--------|------|-------|
| 1 | Pagi — beli bahan | 6s | "Pagi. Beli bahan baku baru." | Ilustrasi + `pembelian.png` |
| 2 | Catat pembelian | 7s | "Catat harga beli — HPP langsung ikut berubah." | `pembelian.png` → HPPCounter |
| 3 | Cek stok | 7s | "Stok keliatan. Ga perlu tebak-tebakan." | `bahan-baku.png` |
| 4 | Produksi | 6s | "Masak, jual — HPP sudah terhitung." | `produk.png` |
| 5 | Catat penjualan | 6s | "Catat penjualan dalam detik." | `penjualan.png` |
| 6 | Sore — cek laporan | 6s | "Sore. Laporan sudah siap." | `laporan.png` |
| 7 | Insight | 5s | "HPP akurat → profit jelas." | BarChart animasi |
| 8 | Relief | 4s | "Bisnis lebih jelas. Hidup lebih tenang." | Ilustrasi rempah |
| 9 | Price+CTA | 4s | "Rp 175.000 · Bayar sekali" | Pulse button |
| 10 | Logo end | 4s | — | Fade out |

---

## Format & Komposisi Remotion

Tiap video didaftarkan 3x di `Root.tsx` dengan ukuran canvas berbeda:

```tsx
// Contoh untuk VideoA30
<Composition id="VideoA30-916"  component={VideoA30} width={1080} height={1920} fps={30} durationInFrames={900} />
<Composition id="VideoA30-169"  component={VideoA30} width={1920} height={1080} fps={30} durationInFrames={900} />
<Composition id="VideoA30-11"   component={VideoA30} width={1080} height={1080} fps={30} durationInFrames={900} />
```

Scene components menerima prop `format: '9:16' | '16:9' | '1:1'` untuk menyesuaikan layout (posisi teks, ukuran frame HP, dll).

---

## Komponen Kunci

### HPPCounter
Animasi angka HPP yang berubah — visual paling kuat untuk menunjukkan "HPP otomatis update":
- Angka lama (misal Rp 8.500) fade out
- Angka baru (Rp 9.200) count up masuk
- Warna berubah ke `#B5532A` saat update

### AppScreen
Wrapper screenshot app dengan:
- Frame HP (untuk 9:16 dan 1:1)
- Frame browser/laptop (untuk 16:9)
- Drop shadow + border radius sesuai brand

### SpiceFloat
Ilustrasi rempah dari `public/illustrations/` melayang dengan animasi `spring()` Remotion.

---

## Assets yang Dibutuhkan

| Asset | Sumber | Status |
|-------|--------|--------|
| td-logo.png | `tata-data-dapur-land-page/public/assets/` | ✓ Ada |
| App screenshots (7 file) | `tata-data-dapur-land-page/public/assets/app/` | ✓ Ada |
| Illustrations 1–25.png | `tata-data-dapur-land-page/public/assets/components/` | ✓ Ada |
| Background music | Download Pixabay/Freepd | ✗ Belum |
| Font: Fraunces | Google Fonts / npm | ✗ Belum |
| Font: Plus Jakarta Sans | Google Fonts / npm | ✗ Belum |

---

## Out of Scope

- Voiceover / narasi suara
- Animasi 3D
- Live action footage
- Integrasi otomatis upload ke sosmed
