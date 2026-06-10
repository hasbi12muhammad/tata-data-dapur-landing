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
