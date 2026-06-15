import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Icon from '../components/help/HelpIcons'

/* ── Palette (mirrors the app's help-center tokens) ── */
const C = {
  bg: '#F4EDE0', paper: '#FBF6EC', ink: '#1B1208', inkSoft: '#3D2A18',
  muted: '#876A4E', line: '#D9C9AE', terra: '#B5532A', gold: '#C49A3F',
  goldSoft: '#FDF0D9', blue: '#2D6A9F', blueSoft: '#E0EBF5', navBg: '#2A1A0E',
}
const SERIF = 'Fraunces, Georgia, serif'
const BODY = 'Inter, "Plus Jakarta Sans", system-ui, sans-serif'
const MONO = '"DM Mono", monospace'

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.7 0 0 0 0 0.55 0 0 0 0 0.3 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

/* ════════════════════════ SHARED PIECES ════════════════════════ */

function Lightbox({ src, alt, onClose }) {
  const [scale, setScale] = React.useState(1)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const dragging = React.useRef(false)
  const dragOrigin = React.useRef({ mx: 0, my: 0, px: 0, py: 0 })

  React.useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const zoom = (d) => setScale(s => Math.min(5, Math.max(0.5, s + d)))
  const onWheel = (e) => { e.preventDefault(); zoom(-e.deltaY * 0.001) }
  const onMouseDown = (e) => {
    if (scale <= 1) return
    dragging.current = true
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
    e.preventDefault()
  }
  const onMouseMove = (e) => {
    if (!dragging.current) return
    setPos({ x: dragOrigin.current.px + e.clientX - dragOrigin.current.mx, y: dragOrigin.current.py + e.clientY - dragOrigin.current.my })
  }
  const onMouseUp = () => { dragging.current = false }
  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }) }

  const btn = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }

  return (
    <div onWheel={onWheel} onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
        <button style={btn} onClick={() => zoom(0.3)} aria-label="Zoom in">＋</button>
        <button style={btn} onClick={() => zoom(-0.3)} aria-label="Zoom out">－</button>
        {scale !== 1 && <button style={btn} onClick={reset} aria-label="Reset">1:1</button>}
        <button style={btn} onClick={onClose} aria-label="Tutup">✕</button>
      </div>
      <p style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 12, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        Scroll untuk zoom · Drag untuk geser · Esc untuk tutup
      </p>
      <img
        src={src} alt={alt} draggable={false}
        onClick={e => e.stopPropagation()}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        style={{
          maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 8, userSelect: 'none',
          transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
          cursor: scale > 1 ? 'grab' : 'zoom-in',
          transition: dragging.current ? 'none' : 'transform 0.15s ease',
        }}
      />
    </div>
  )
}

function TourImage({ src, alt }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Lihat ${alt} lebih besar`}
        style={{ display: 'block', width: '100%', padding: 0, background: 'none', border: 'none', cursor: 'zoom-in', marginTop: 12, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.line}` }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.15s', opacity: 1 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        />
      </button>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}

function Shot({ label, src }) {
  if (src) return <TourImage src={src} alt={label} />
  return (
    <div style={{
      background: C.bg, border: `1.5px dashed ${C.line}`, borderRadius: 10,
      aspectRatio: '16 / 9', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 8, margin: '20px 0',
      color: C.muted,
    }}>
      <Icon name="image" size={30} stroke={1.5} style={{ opacity: 0.55 }} />
      <span style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {label}
      </span>
    </div>
  )
}

function FeatureList({ items }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0 0', padding: 0 }}>
      {items.map((it, i) => (
        <li key={i} style={{
          display: 'flex', gap: 12, fontSize: 14, color: C.inkSoft, alignItems: 'flex-start',
          padding: '12px 16px', background: C.bg, borderRadius: 8, border: `1px solid ${C.line}`,
        }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1, lineHeight: 1.4 }} aria-hidden="true">{it.emoji}</span>
          <span style={{ lineHeight: 1.6 }}>
            <strong style={{ display: 'block', color: C.ink, fontWeight: 600, marginBottom: 2 }}>{it.title}</strong>
            {it.body}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Callout({ variant = 'tip', children }) {
  const tip = variant === 'tip'
  return (
    <div style={{
      background: tip ? C.goldSoft : C.blueSoft,
      border: `1px solid ${tip ? 'rgba(196,154,63,0.3)' : 'rgba(45,106,159,0.2)'}`,
      borderRadius: 10, padding: '14px 18px', fontSize: 14,
      color: tip ? '#7A5C10' : C.blue, display: 'flex', gap: 12,
      alignItems: 'flex-start', marginTop: 16, lineHeight: 1.6,
    }}>
      <Icon name={tip ? 'lightbulb' : 'info'} size={18} color={tip ? '#B5862A' : C.blue} style={{ marginTop: 1 }} />
      <div>{children}</div>
    </div>
  )
}

function Example({ children }) {
  return (
    <div style={{
      background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8,
      padding: '12px 16px', fontFamily: MONO, fontSize: 12, color: C.inkSoft,
      margin: '12px 0', lineHeight: 1.9, whiteSpace: 'pre-line',
    }}>
      {children}
    </div>
  )
}

const P = ({ children }) => (
  <p style={{ fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: '0 0 16px' }}>{children}</p>
)

/* ════════════════════════ TAB 1 — TUR MENU ════════════════════════ */

const TOUR = [
  {
    id: 'dashboard', icon: 'dashboard', title: 'Dashboard', route: 'Menu utama saat buka app',
    blocks: [
      { t: 'p', c: <>Dashboard halaman pertama yang kamu lihat tiap buka app. Di sini langsung ketahuan kondisi bisnis hari ini — tanpa hitung manual.</> },
      { t: 'p', c: <>Standarnya Dashboard menampilkan data <strong>hari ini</strong>. Tapi kamu bisa pilih tanggal lain buat lihat rekap hari kemarin. Pas banget kalau lupa input dan mau cek semua sudah tercatat.</> },
      { t: 'shot', c: 'Screenshot Dashboard', src: '/help/dashboard-desktop.png' },
      { t: 'features', c: [
        { emoji: '💰', title: 'Total Penjualan', body: 'Total uang masuk dari semua transaksi di tanggal yang dipilih.' },
        { emoji: '📉', title: 'Total Pengeluaran', body: 'Total biaya operasional yang tercatat — listrik, gas, gaji, kemasan, dan lainnya.' },
        { emoji: '🛒', title: 'Total Pembelian', body: 'Total uang keluar untuk pembelian bahan baku di tanggal yang dipilih.' },
        { emoji: '✅', title: 'Laba Bersih', body: 'Penjualan dikurangi total pengeluaran dan pembelian bahan baku — angka ini yang paling mencerminkan untung bersih hari itu.' },
      ] },
      { t: 'p', c: <>Di bawah kartu ringkasan ada tiga daftar aktivitas: <strong>Penjualan terbaru</strong>, <strong>Pengeluaran terbaru</strong>, dan <strong>Pembelian terbaru</strong> — semua entri hari itu langsung tampil di sini.</> },
      { t: 'tip', c: <>Mau lihat performa per periode (minggu, bulan, custom)? Buka menu <strong>Laporan</strong> — lebih lengkap dengan grafik tren dan daftar top produk.</> },
    ],
  },
  {
    id: 'items', icon: 'package', title: 'Bahan Baku', route: 'Setup awal — isi ini dulu sebelum yang lain',
    blocks: [
      { t: 'p', c: <>Bahan Baku adalah daftar semua bahan mentah yang kamu pakai buat produksi. Di sini kamu cukup daftarkan nama dan satuannya — <strong>harga dan stok nggak perlu diisi manual</strong>, dua-duanya terisi sendiri begitu kamu catat pembelian.</> },
      { t: 'shot', c: 'Screenshot halaman Bahan Baku', src: '/help/items-desktop.png' },
      { t: 'features', c: [
        { emoji: '➕', title: 'Tambah Bahan Manual', body: 'Isi nama bahan, pilih satuan (gr, ml, pcs, kg, liter), simpan. Selesai. Harga dan stok kosong dulu, nanti terisi pas pembelian pertama dicatat.' },
        { emoji: '📋', title: 'Import via Template Excel', body: 'Bahannya banyak? Download template, isi di Excel, upload sekaligus. Enak buat setup awal biar nggak input satu-satu.' },
        { emoji: '💹', title: 'Harga Rata-rata Otomatis', body: <>Kolom AVG PRICE dihitung sendiri dari riwayat pembelian pakai metode <em>weighted average</em>. Harga inilah yang dipakai buat menghitung HPP resep.</> },
        { emoji: '🎂', title: 'Add-on Penjualan', body: 'Bahan seperti topper kue, lilin ulang tahun, atau kemasan khusus bisa ditandai sebagai add-on. Nanti bisa dipilih sebagai tambahan pas mencatat penjualan produk.' },
      ] },
      { t: 'tip', c: <><strong>Mulai dari sini.</strong> Sebelum bisa bikin resep atau catat pembelian, kamu perlu daftarkan bahan baku dulu. Ini langkah pertama setup app.</> },
    ],
  },
  {
    id: 'purchases', icon: 'cart', title: 'Pembelian', route: 'Catat tiap kali beli bahan baku',
    blocks: [
      { t: 'p', c: <>Tiap kali beli bahan baku — entah di pasar, supplier, atau toko — catat di sini. Pembelian bukan sekadar catatan keluar uang; dia punya dua peran penting:</> },
      { t: 'p', c: <>Pertama, <strong>nambah stok</strong> bahan baku otomatis. Kedua, <strong>memperbarui harga rata-rata</strong> bahan pakai weighted average — jadi HPP resep selalu ikut harga beli terbaru, bukan harga lama.</> },
      { t: 'shot', c: 'Screenshot halaman Pembelian', src: '/help/purchases-desktop.png' },
      { t: 'features', c: [
        { emoji: '📏', title: 'Beli per Satuan Dasar', body: 'Misal beli Tepung Terigu 5 kg seharga Rp 65.000. Pilih bahan, isi qty (5) dan satuan (kg), isi total harga, simpan.' },
        { emoji: '📦', title: 'Beli per Kemasan', body: 'Belinya per dus atau pack? Isi jumlah kemasan dan isi per kemasan — app yang konversi ke satuan dasar. Misal: 2 dus × 24 botol.' },
        { emoji: '📅', title: 'Backdate Pembelian', body: 'Lupa catat kemarin? Tinggal pilih tanggal yang lewat pas input. Stok dan harga rata-rata menyesuaikan urutan tanggalnya.' },
      ] },
      { t: 'info', c: <>Yang dicatat di sini cuma <strong>pembelian bahan baku</strong>. Buat biaya operasional seperti gas, listrik, atau ongkir, catatnya di menu <strong>Pengeluaran</strong>.</> },
    ],
  },
  {
    id: 'expenses', icon: 'wallet', title: 'Pengeluaran', route: 'Biaya operasional di luar bahan baku',
    blocks: [
      { t: 'p', c: <>Pengeluaran adalah semua biaya buat menjalankan usaha, tapi <strong>bukan buat beli bahan baku</strong>. Data ini yang dipakai buat menghitung <em>laba bersih</em> di halaman Laporan.</> },
      { t: 'shot', c: 'Screenshot halaman Pengeluaran', src: '/help/expenses-desktop.png' },
      { t: 'features', c: [
        { emoji: '👷', title: 'Gaji & Upah', body: 'Gaji karyawan harian atau bulanan, upah lembur, honor asisten dapur.' },
        { emoji: '📦', title: 'Kemasan & Perlengkapan', body: 'Plastik, stiker label, kotak, pita, dan semua perlengkapan packaging.' },
        { emoji: '⛽', title: 'Bahan Bakar & Gas', body: 'Gas LPG, bensin, bahan bakar operasional dapur.' },
        { emoji: '⚡', title: 'Listrik & Air', body: 'Tagihan listrik, air, dan utilitas dapur lainnya.' },
        { emoji: '🔧', title: 'Perawatan & Lainnya', body: 'Perbaikan alat, biaya tak terduga, dan pengeluaran lain yang belum masuk kategori di atas.' },
      ] },
      { t: 'tip', c: <>Bingung sesuatu masuk Pembelian atau Pengeluaran? Patokannya gampang: kalau itu <strong>bahan yang dipakai buat bikin produk</strong>, masuk Pembelian. Kalau itu <strong>biaya menjalankan usaha</strong>, masuk Pengeluaran.</> },
    ],
  },
  {
    id: 'recipes', icon: 'chefHat', title: 'Produk', route: 'Tempat mendefinisikan semua produk yang kamu jual',
    blocks: [
      { t: 'p', c: <>Di sini kamu mendefinisikan produk yang kamu jual beserta komposisi bahannya. Begitu komposisi diisi, <strong>HPP (Harga Pokok Produksi) terhitung sendiri dan real-time</strong> — tanpa perlu kalkulator.</> },
      { t: 'shot', c: 'Screenshot halaman Produk', src: '/help/recipes-desktop.png' },
      { t: 'subhead', c: <strong>Ada dua tipe produk:</strong> },
      { t: 'features', c: [
        { emoji: '✅', title: 'Produk Jadi', body: 'Produk yang langsung dijual ke pelanggan. Contoh: Croissant, Kue Ulang Tahun, Brownies Panggang. HPP-nya dihitung dari bahan baku yang dipakai.' },
        { emoji: '🔄', title: 'Produk Setengah Jadi', body: 'Produk yang diproses dulu sebelum jadi produk akhir, dan bisa jadi bahan di produk lain. Contoh: Strawberry Jam yang dipakai di Strawberry Cake, atau Adonan Dasar Croissant buat berbagai varian croissant. Punya stok sendiri yang diatur lewat menu Produksi.' },
      ] },
      { t: 'shot', c: 'Screenshot form tambah produk — HPP real-time', src: '/help/recipes-desktop.png' },
      { t: 'features', c: [
        { emoji: '📊', title: 'Batch Yield & Estimasi Waste', body: <>Kalau 1 resep menghasilkan beberapa porsi (misal 1 resep = 12 cupcake), isi <em>batch yield</em>. Kalau ada bahan yang menyusut waktu dimasak, isi <em>estimasi waste</em> dalam persen. Dua-duanya bikin HPP per unit lebih akurat.</> },
        { emoji: '🎂', title: 'Add-on Produk', body: 'Produk bisa ditandai sebagai add-on — artinya bisa dipilih sebagai tambahan pas pelanggan beli produk lain. Contoh: topper kue, lilin ulang tahun, kotak khusus.' },
      ] },
      { t: 'tip', c: <>HPP di produk <strong>otomatis berubah</strong> kalau harga bahan baku berubah gara-gara pembelian baru. Nggak perlu update resep manual.</> },
    ],
  },
  {
    id: 'produksi', icon: 'factory', title: 'Produksi', route: 'Catat saat kamu memproduksi stok produk',
    blocks: [
      { t: 'p', c: <>Produksi dipakai pas kamu bikin produk dalam jumlah tertentu buat disimpan jadi stok — bukan langsung jual. Misal bakery yang tiap pagi bikin 50 pcs roti, atau dapur yang tiap minggu bikin stok selai.</> },
      { t: 'p', c: <>Pas kamu catat produksi, dua hal terjadi sendiri: <strong>stok produk nambah</strong> sesuai batch yang dibuat, dan <strong>stok bahan baku berkurang</strong> sesuai komposisi resep.</> },
      { t: 'shot', c: 'Screenshot halaman Produksi', src: '/help/produksi-desktop.png' },
      { t: 'features', c: [
        { emoji: '🏭', title: 'Produksi Produk Jadi', body: 'Catat berapa batch produk jadi yang kamu buat hari ini. Stok produk naik, stok bahan turun.' },
        { emoji: '🔄', title: 'Produksi Bahan Setengah Jadi', body: 'Misal hari ini bikin 3 batch Strawberry Jam. Stok selai naik, stok stroberi dan gula turun. Selai ini lalu bisa dipakai di produk lain.' },
        { emoji: '✏️', title: 'Edit & Hapus Log', body: 'Salah input? Bisa diedit atau dihapus. Semua efek ke stok ikut menyesuaikan otomatis — nggak perlu hitung manual.' },
      ] },
      { t: 'info', c: <>Kalau langsung jual tanpa produksi stok dulu (langsung buat, langsung jual), menu ini nggak perlu dipakai. Cukup catat di Penjualan — stok bahan baku berkurang sendiri.</> },
    ],
  },
  {
    id: 'sales', icon: 'receipt', title: 'Penjualan', route: 'Catat tiap transaksi penjualan',
    blocks: [
      { t: 'p', c: <>Tiap ada penjualan, catat di sini. Satu transaksi bisa berisi beberapa produk sekaligus. HPP otomatis diambil dari data resep saat itu — kamu tinggal isi harga jual dan qty.</> },
      { t: 'shot', c: 'Screenshot halaman Penjualan', src: '/help/sales-desktop.png' },
      { t: 'features', c: [
        { emoji: '💰', title: 'Harga Jual Diingat Otomatis', body: 'Pernah jual produk ini sebelumnya? Harga jualnya muncul sendiri di transaksi berikutnya. Tetap bisa kamu ubah kalau ada kenaikan harga atau alasan lain.' },
        { emoji: '🏷️', title: 'Kategori Penjualan', body: 'Tiap transaksi bisa ditandai kategori: Offline, GoFood, GrabFood, ShopeeFood, dan lainnya. Berguna buat analisis channel penjualan di Laporan.' },
        { emoji: '🎂', title: 'Add-on per Produk', body: 'Pas input item, bisa tambahin add-on (topper, lilin, box khusus) yang stok dan HPP-nya ikut ter-update.' },
        { emoji: '📅', title: 'Backdate Transaksi', body: 'Lupa catat penjualan kemarin? Pilih tanggal yang lewat — datanya masuk ke laporan tanggal yang benar.' },
      ] },
      { t: 'tip', c: <>HPP yang tersimpan di tiap transaksi itu <strong>snapshot saat transaksi terjadi</strong>. Jadi kalau besok harga bahan naik, profit transaksi hari ini nggak ikut berubah — sudah terkunci.</> },
    ],
  },
  {
    id: 'reports', icon: 'barChart', title: 'Laporan', route: 'Analisis performa bisnis per periode',
    blocks: [
      { t: 'p', c: <>Laporan tempat kamu lihat gambaran besar bisnis — bukan per hari seperti Dashboard, tapi per minggu, bulan, atau periode yang kamu tentukan sendiri.</> },
      { t: 'shot', c: 'Screenshot halaman Laporan — periode 30 hari', src: '/help/reports-desktop.png' },
      { t: 'features', c: [
        { emoji: '📅', title: 'Pilih Periode', body: 'Ada Hari ini, 7 Hari, 30 Hari, Bulan ini, Bulan lalu, dan Custom (pilih sendiri tanggal mulai & selesai).' },
        { emoji: '📈', title: 'Grafik Tren', body: 'Grafik bar nunjukin revenue dan profit per hari. Arahkan kursor ke bar mana pun buat lihat angka detail hari itu.' },
        { emoji: '🏆', title: 'Top Produk', body: 'Daftar produk yang paling banyak ngasih profit di periode itu. Berguna buat tahu mana produk andalan.' },
        { emoji: '📥', title: 'Unduh PDF & Excel', body: 'Laporan bisa diunduh sebagai PDF buat dibagikan atau diarsipkan, atau sebagai Excel (.xlsx) buat diolah lagi di spreadsheet.' },
      ] },
      { t: 'info', c: <>Laporan cocok buat analisis per periode dan lihat tren. Dashboard lebih ke <strong>rekap harian cepat</strong> — Laporan ke <strong>gambar besar bisnis</strong> mingguan/bulanan.</> },
    ],
  },
  {
    id: 'settings', icon: 'settings', title: 'Pengaturan', route: 'Icon gear di pojok kanan atas',
    blocks: [
      { t: 'p', c: <>Pengaturan bisa dibuka lewat icon gear di pojok kanan atas. Di sini kamu bisa ubah informasi akun dan kelola data master.</> },
      { t: 'shot', c: 'Screenshot halaman Pengaturan', src: '/help/settings-desktop.png' },
      { t: 'features', c: [
        { emoji: '🏪', title: 'Ganti Nama Toko', body: 'Nama yang muncul di header app. Bisa diganti kapan pun.' },
        { emoji: '📧', title: 'Ganti Email', body: 'Email buat login. Setelah kamu simpan, sistem kirim link konfirmasi ke email baru — klik link itu buat menyelesaikan perubahan.' },
        { emoji: '🔑', title: 'Ganti Password', body: 'Masukkan password baru dua kali buat konfirmasi. Langsung berlaku setelah disimpan.' },
        { emoji: '📐', title: 'Satuan Custom & Jenis Kemasan', body: 'Ada satuan yang belum tersedia (misal "lbr", "roll")? Tambah di sini. Begitu juga jenis kemasan buat pembelian per-kemasan.' },
      ] },
    ],
  },
]

function TourBlock({ b }) {
  switch (b.t) {
    case 'p': return <P>{b.c}</P>
    case 'shot': return <Shot label={b.c} src={b.src} />
    case 'subhead': return <p style={{ fontSize: 15, color: C.inkSoft, margin: '16px 0 0' }}>{b.c}</p>
    case 'features': return <FeatureList items={b.c} />
    case 'tip': return <Callout variant="tip">{b.c}</Callout>
    case 'info': return <Callout variant="info">{b.c}</Callout>
    default: return null
  }
}

function TourTab() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
      <div className="tour-layout">
        {/* sticky sidebar */}
        <aside className="tour-nav" style={{
          position: 'sticky', top: 120, background: C.paper, border: `1px solid ${C.line}`,
          borderRadius: 12, padding: 16, alignSelf: 'start',
        }}>
          <div style={{ fontFamily: MONO, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.muted, marginBottom: 12 }}>
            Menu
          </div>
          {TOUR.map(s => (
            <a key={s.id} href={`#${s.id}`} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              borderRadius: 8, textDecoration: 'none', fontSize: 13, color: C.inkSoft,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.color = C.terra }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.inkSoft }}
            >
              <Icon name={s.icon} size={15} stroke={1.75} />
              {s.title}
            </a>
          ))}
        </aside>

        {/* cards */}
        <div>
          {TOUR.map(s => (
            <section key={s.id} id={s.id} style={{ marginBottom: 64, scrollMarginTop: 130 }}>
              <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
                <header style={{
                  padding: '24px 28px 20px', display: 'flex', alignItems: 'flex-start',
                  gap: 18, borderBottom: `1px solid ${C.line}`, background: C.bg,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: C.navBg, color: C.gold,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon name={s.icon} size={22} color={C.gold} stroke={1.75} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 4px', color: C.ink }}>
                      {s.title}
                    </h3>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {s.route}
                    </div>
                  </div>
                </header>
                <div style={{ padding: '24px 28px' }}>
                  {s.blocks.map((b, i) => <TourBlock key={i} b={b} />)}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════ TAB 2 — FAQ ════════════════════════ */

const FAQ_GROUPS = [
  {
    title: 'HPP & Produk',
    items: [
      {
        q: 'Gimana cara menghitung HPP otomatis?',
        a: <>
          HPP dihitung sendiri dari komposisi bahan yang kamu isi di menu <strong>Produk</strong>. Caranya gampang: buat produk, masukin bahan-bahannya beserta qty, HPP langsung muncul.
          <pre style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: '12px 16px', fontFamily: MONO, fontSize: 12, color: C.inkSoft, margin: '12px 0', lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto' }}>{`Contoh: Croissant
- Tepung Terigu 100gr × Rp 12/gr  = Rp 1.200
- Mentega        80gr × Rp 55/gr  = Rp 4.400
- Telur           1pcs × Rp 2.500 = Rp 2.500
                        ──────────────────────
Total biaya 1 resep               = Rp 8.100`}</pre>
          Nah, di sinilah <strong>Batch Yield</strong> ambil peran. Coba bandingkan dua skenario:<br /><br />
          <strong>Tanpa Batch Yield:</strong> App nganggep 1 resep = 1 pcs. Jadi HPP-mu tercatat Rp 8.100/pcs — padahal sekali bikin kamu dapat 6 croissant, bukan 1. HPP-nya jadi kelihatan jauh lebih mahal dari kenyataan, dan profit yang tercatat pun ikut lebih kecil dari yang sebenarnya.<br /><br />
          <strong>Dengan Batch Yield = 6:</strong> Kamu kasih tahu app kalau "1 resep ini menghasilkan 6 pcs". App langsung bagi otomatis: Rp 8.100 ÷ 6 = Rp 1.350/pcs — inilah HPP asli per produk yang kamu jual.<br /><br />
          Intinya: isi Batch Yield sesuai jumlah pcs yang keluar dari sekali masak. Kalau 1 resep cuma menghasilkan 1 pcs, biarin kosong aja (default-nya memang 1).
        </>,
      },
      {
        q: 'Kenapa HPP produk saya berubah sendiri?',
        a: <>
          Ini bukan bug — ini memang fiturnya. HPP dihitung real-time dari harga rata-rata bahan baku saat ini. Begitu kamu catat pembelian bahan dengan harga berbeda, harga rata-rata bahan itu berubah, dan HPP semua produk yang memakainya ikut menyesuaikan.<br /><br />
          Tujuannya supaya HPP kamu selalu mencerminkan biaya yang benar-benar kamu keluarkan — bukan harga lama yang sudah nggak relevan.
        </>,
      },
      {
        q: 'Apa bedanya Produk Jadi dan Produk Setengah Jadi?',
        a: <>
          <strong>Produk Jadi</strong> itu produk yang langsung dijual ke pelanggan — nggak diolah lagi. Contoh: Croissant, Kue Tart, Brownies.<br /><br />
          <strong>Produk Setengah Jadi</strong> diproses dulu, baru dijadikan bahan buat produk lain. Contoh: Strawberry Jam yang dipakai di Strawberry Cake, atau Adonan Puff Pastry buat berbagai varian pastri.<br /><br />
          Produk Setengah Jadi punya stok sendiri yang diatur lewat menu <strong>Produksi</strong>. HPP-nya juga ikut masuk ke perhitungan produk yang memakainya.
        </>,
      },
      {
        q: 'Estimasi waste itu buat apa?',
        a: <>
          Waste itu persentase bahan yang hilang atau terbuang waktu proses produksi — entah karena penguapan, sisa nggak terpakai, atau produk gagal. Dengan mengisi estimasi waste, HPP per unit jadi lebih akurat karena sudah memperhitungkan kerugian produksi.
          <Example>{`Contoh: 1 batch adonan = 10 roti, tapi biasanya 1 roti gagal
Waste = 10% → HPP per roti dihitung dari 9 roti yang berhasil, bukan 10.`}</Example>
          Kalau belum yakin angka waste-nya, isi 0 dulu, update belakangan.
        </>,
      },
    ],
  },
  {
    title: 'Stok & Pembelian',
    items: [
      {
        q: 'Gimana cara mencatat stok dan memantaunya?',
        a: <>
          Stok bahan baku nggak diisi manual — dia bergerak sendiri dari dua arah:
          <ul style={{ margin: '10px 0 10px 18px', lineHeight: 2 }}>
            <li><strong>Bertambah</strong> saat kamu catat Pembelian</li>
            <li><strong>Berkurang</strong> saat kamu catat Penjualan (atau Produksi)</li>
          </ul>
          Buat memantau stok, buka menu <strong>Bahan Baku</strong> — kolom STOCK nunjukin stok terkini tiap bahan.
        </>,
      },
      {
        q: 'Apa bedanya Pembelian dan Pengeluaran?',
        a: <>
          Patokannya sederhana:<br /><br />
          <strong>Pembelian</strong> = beli sesuatu yang dipakai buat <em>bikin produk</em>. Masuk ke stok bahan baku, mempengaruhi HPP. Contoh: tepung, telur, gula, mentega, susu.<br /><br />
          <strong>Pengeluaran</strong> = biaya <em>menjalankan usaha</em> yang nggak masuk ke produk secara langsung. Contoh: bayar listrik, beli gas LPG buat kompor, gaji karyawan, ongkos kirim, beli kemasan plastik.
        </>,
      },
      {
        q: 'Fitur Produksi itu buat apa? Kapan saya perlu pakai?',
        a: <>
          Produksi dipakai kalau kamu <strong>bikin stok dulu, baru jual belakangan</strong>. Misal bakery yang tiap pagi produksi 50 roti buat dijual sepanjang hari — mereka nggak langsung jual pas bikin.<br /><br />
          Kalau kamu <strong>bikin langsung pas ada pesanan</strong>, menu Produksi nggak perlu. Cukup catat di Penjualan — stok bahan berkurang sendiri.<br /><br />
          Produksi juga wajib buat <strong>Produk Setengah Jadi</strong> — kamu perlu catat produksi selai/adonan dulu sebelum bisa dipakai di produk lain.
        </>,
      },
    ],
  },
  {
    title: 'Pengeluaran & Kategori',
    items: [
      {
        q: 'Gaji karyawan, gas, dan listrik masuk ke mana?',
        a: <>
          Semuanya masuk ke menu <strong>Pengeluaran</strong>. Pilih atau buat kategori yang sesuai:
          <Example>{`Gaji karyawan → Kategori: Gaji & Upah
Gas LPG → Kategori: Bahan Bakar & Gas
Listrik → Kategori: Listrik & Air
Plastik kemasan → Kategori: Kemasan & Perlengkapan
Servis alat / tak terduga → Kategori: Perawatan & Lainnya`}</Example>
          Semua pengeluaran ini otomatis dipotong dari profit kotor di halaman <strong>Laporan</strong> buat menghasilkan angka laba bersih.
        </>,
      },
    ],
  },
  {
    title: 'Penjualan & Laporan',
    items: [
      {
        q: 'Mencatat penjualan dan pembelian hari ini — urutan yang benar?',
        a: <>
          Urutan yang disarankan buat hari pertama setup:
          <Example>{`1. Bahan Baku: daftar semua bahan
2. Pembelian: catat beli bahan → stok & harga terisi
3. Produk: buat resep dari bahan yang ada → HPP muncul
4. Penjualan: catat transaksi hari ini
5. Pengeluaran: catat biaya operasional hari ini
6. Dashboard: lihat hasilnya`}</Example>
          Buat hari-hari berikutnya, biasanya cukup langkah 2, 4, 5, dan 6 yang rutin.
        </>,
      },
      {
        q: 'Gimana cara print / export laporan?',
        a: <>
          Buka menu <strong>Laporan</strong>, pilih periode yang kamu mau, scroll ke bawah, klik tombol <strong>Unduh PDF</strong> atau <strong>Unduh Excel</strong>.<br /><br />
          <strong>PDF</strong> — buat dibagikan lewat WhatsApp, dikirim ke akuntan, atau diarsipkan sebagai dokumen siap cetak.<br />
          <strong>Excel (.xlsx)</strong> — buat diolah lagi di spreadsheet, buat pivot table, atau dianalisis lebih lanjut.
        </>,
      },
      {
        q: 'Cara print struk penjualan?',
        a: <>
          Fitur struk ada di modul <strong>Kasir</strong> — ini add-on berbayar yang terpisah dari paket dasar. Kalau belum punya dan tertarik, hubungi kami buat info lebih lanjut.<br /><br />
          Kalau sudah punya akses Kasir, buka menu Kasir, proses transaksi, lalu pilih "Print Struk" setelah transaksi selesai.
        </>,
      },
    ],
  },
]

function FaqItem({ id, q, a, open, onToggle }) {
  return (
    <div style={{
      border: `1px solid ${C.line}`, borderRadius: 12, overflow: 'hidden',
      marginBottom: 10, background: C.paper,
    }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-a`}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
          padding: '18px 22px', gap: 20, cursor: 'pointer', background: open ? C.bg : 'transparent',
          border: 'none', textAlign: 'left', transition: 'background 0.2s', fontFamily: BODY,
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = C.bg }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent' }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: C.ink, flex: 1, lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 30, height: 30, borderRadius: '50%', background: open ? C.terra : C.ink, color: C.paper,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'all 0.3s', transform: open ? 'rotate(45deg)' : 'none',
        }}>
          <Icon name="plus" size={16} color={C.paper} stroke={2} />
        </span>
      </button>
      <div
        id={`${id}-a`}
        role="region"
        style={{ maxHeight: open ? 1200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}
      >
        <div style={{
          padding: '16px 22px 20px', fontSize: 14, color: C.inkSoft, lineHeight: 1.7,
          borderTop: `1px solid ${C.line}`,
        }}>
          {a}
        </div>
      </div>
    </div>
  )
}

function FaqTab() {
  const [openId, setOpenId] = useState(null)
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
      <p style={{ fontSize: 16, color: C.inkSoft, marginBottom: 32, lineHeight: 1.7 }}>
        Pertanyaan yang sering ditanyakan pengguna Tata Data Dapur. Klik pertanyaannya buat lihat jawaban.
      </p>
      {FAQ_GROUPS.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em',
            color: C.terra, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            {g.title}
            <span style={{ flex: 1, height: 1, background: C.line }} />
          </div>
          {g.items.map((it, ii) => {
            const id = `faq-${gi}-${ii}`
            return (
              <FaqItem
                key={id} id={id} q={it.q} a={it.a}
                open={openId === id}
                onToggle={() => setOpenId(openId === id ? null : id)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════ TAB 3 — VIDEO ════════════════════════ */

const VIDEO_SECTIONS = [
  {
    title: 'Ikut tur fitur aplikasi kami ✨',
    cards: [
      { title: 'Panduan Login & Ganti Password', meta: 'Setup Awal · 2 menit', duration: '2:45', badge: 'Mulai di sini', ready: true },
      { title: 'Tur Singkat Semua Menu App', meta: 'Orientasi · 3-4 menit', ready: false },
    ],
  },
  {
    title: 'Bagaimana cara...?',
    cards: [
      { title: 'Membuat HPP otomatis untuk produkmu?', meta: 'Produk & Resep · 4-5 menit', ready: false },
      { title: 'Mencatat stok dan memantaunya?', meta: 'Bahan Baku & Pembelian · 4-5 menit', ready: false },
      { title: 'Mencatat penjualan dan pembelian hari ini?', meta: 'Operasional Harian · 3-4 menit', ready: false },
      { title: 'Gaji karyawan, gas, dan utilitas masuk ke mana?', meta: 'Pengeluaran · 2-3 menit', ready: false },
      { title: 'Apa bedanya Produk Jadi dan Setengah Jadi?', meta: 'Produk · 3-4 menit', ready: false },
      { title: 'Fitur Produksi itu untuk apa?', meta: 'Produksi · 4-5 menit', ready: false },
      { title: 'Membaca laporan dan export ke Excel?', meta: 'Laporan · 3-4 menit', ready: false },
      { title: 'Fitur Sub-Recipe: dari Strawberry Jam ke Strawberry Cake', meta: 'Fitur Lanjutan · 4-5 menit', ready: false },
    ],
  },
]

function VideoCard({ card }) {
  const ready = card.ready
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: ready ? C.paper : 'transparent',
        border: ready ? `1px solid ${C.line}` : `1.5px dashed ${C.line}`,
        borderRadius: 12, overflow: 'hidden', cursor: ready ? 'pointer' : 'default',
        opacity: ready ? 1 : 0.62,
        transform: ready && hover ? 'translateY(-3px)' : 'none',
        boxShadow: ready && hover ? '0 12px 32px rgba(27,18,8,0.1)' : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div style={{
        aspectRatio: '16 / 9', background: C.navBg, display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden', opacity: ready ? 1 : 0.5,
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${NOISE}")`, pointerEvents: 'none' }} />
        {ready && card.badge && (
          <span style={{
            position: 'absolute', top: 10, left: 10, background: C.gold, color: C.navBg,
            fontFamily: MONO, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '3px 8px', borderRadius: 100, fontWeight: 500, zIndex: 1,
          }}>{card.badge}</span>
        )}
        {!ready && (
          <span style={{
            position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: MONO, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '3px 8px', borderRadius: 100, zIndex: 1,
          }}>Segera hadir</span>
        )}
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: ready && hover ? C.terra : 'rgba(255,255,255,0.15)',
          border: `2px solid ${ready && hover ? C.terra : 'rgba(255,255,255,0.4)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          position: 'relative', transition: 'all 0.2s', paddingLeft: 4,
        }}>
          <Icon name="play" size={18} color="#fff" />
        </div>
        {card.duration && (
          <span style={{
            position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: '#fff',
            fontFamily: MONO, fontSize: 11, padding: '2px 7px', borderRadius: 4,
          }}>{card.duration}</span>
        )}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <h4 style={{ fontWeight: 500, fontSize: 14, margin: '0 0 4px', color: C.ink, lineHeight: 1.4 }}>{card.title}</h4>
        <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.meta}</div>
      </div>
    </div>
  )
}

function VideoTab() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ background: C.navBg, borderRadius: 16, padding: 32, marginBottom: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${NOISE}")`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: C.gold, marginBottom: 12 }}>
            Video Tutorial
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 24, color: '#fff', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            Halo, pengguna Tata Data Dapur! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.65, margin: 0 }}>
            Selamat datang di halaman tutorial. Di sini kami siapkan video panduan buat bantu kamu memaksimalkan tiap fitur app — dari setup awal sampai baca laporan bisnis. Tonton urut biar paling nyantol, atau langsung pilih topik yang kamu butuhkan.
          </p>
        </div>
      </div>

      {VIDEO_SECTIONS.map((sec, si) => (
        <div key={si}>
          <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, margin: '0 0 16px', letterSpacing: '-0.01em', color: C.ink }}>
            {sec.title}
          </h3>
          <div className="video-grid" style={{ marginBottom: 40 }}>
            {sec.cards.map((card, ci) => <VideoCard key={ci} card={card} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════ PAGE SHELL ════════════════════════ */

const TABS = [
  { id: 'tour', label: 'Tur Menu', icon: 'map' },
  { id: 'faq', label: 'FAQ', icon: 'help' },
  { id: 'video', label: 'Video Tutorial', icon: 'playCircle' },
]

export default function HelpCenterPage() {
  const [tab, setTab] = useState('tour')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100dvh', fontFamily: BODY, color: C.ink }}>
      <style>{`
        .tour-layout { display: grid; grid-template-columns: 200px 1fr; gap: 40px; align-items: start; }
        .video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 760px) {
          .tour-layout { grid-template-columns: 1fr; }
          .tour-nav { display: none !important; }
        }
        @media (max-width: 600px) { .video-grid { grid-template-columns: 1fr; } }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* top app nav */}
      <nav style={{
        background: C.navBg, padding: '14px 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
          Tata Data <span style={{ color: C.terra }}>Dapur</span>
        </span>
        <Link to="/" style={{
          fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: MONO, textTransform: 'uppercase',
          letterSpacing: '0.1em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
        >
          <Icon name="arrowLeft" size={14} color="currentColor" /> Kembali ke Beranda
        </Link>
      </nav>

      {/* hero header */}
      <header style={{ background: C.navBg, padding: '48px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${NOISE}")`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: C.gold, marginBottom: 14 }}>
            Pusat Bantuan
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 5vw, 48px)', color: '#fff', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Halo, ada yang bisa<br />kami <em style={{ fontStyle: 'italic', color: C.gold, fontWeight: 400 }}>bantu?</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            Temukan panduan, jawaban pertanyaan umum, dan video tutorial biar kamu makin maksimal pakai Tata Data Dapur.
          </p>
        </div>
      </header>

      {/* tab bar */}
      <div role="tablist" aria-label="Pusat Bantuan" style={{
        background: C.paper, borderBottom: `1px solid ${C.line}`, padding: '0 24px',
        display: 'flex', position: 'sticky', top: 53, zIndex: 90, overflowX: 'auto',
      }}>
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id} role="tab" aria-selected={active}
              onClick={() => setTab(t.id)}
              style={{
                padding: '16px 22px', fontSize: 14, fontWeight: active ? 600 : 500,
                color: active ? C.terra : C.muted, border: 'none', background: 'none', cursor: 'pointer',
                borderBottom: `2px solid ${active ? C.terra : 'transparent'}`, whiteSpace: 'nowrap',
                transition: 'all 0.2s', fontFamily: BODY, display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.ink }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.muted }}
            >
              <Icon name={t.icon} size={16} stroke={1.75} /> {t.label}
            </button>
          )
        })}
      </div>

      {/* tab panels */}
      <main>
        {tab === 'tour' && <TourTab />}
        {tab === 'faq' && <FaqTab />}
        {tab === 'video' && <VideoTab />}
      </main>

      <Footer />
    </div>
  )
}
