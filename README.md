# Guidebook Website SumoBot Autonomous - INFOFEST 2026

Website resmi buku panduan dan petunjuk teknis (juknis) perlombaan **SumoBot Autonomous INFOFEST 2026**, diselenggarakan oleh **Fakultas Teknik, Universitas Hamzanwadi**.

---

## 🚀 Cara Menjalankan Website

Website ini dibuat mandiri (zero-build dependency) menggunakan arsitektur modern HTML5, Tailwind CSS, dan JavaScript interaktif. Anda dapat menjalankannya dengan dua cara:

### Cara 1: Langsung Buka di Browser (Paling Mudah)
Cukup klik ganda (double-click) file **`index.html`** di Windows Explorer, atau klik kanan lalu pilih **Open with Google Chrome / Microsoft Edge / Firefox**.

### Cara 2: Menggunakan Local Server (Node.js)
Jalankan perintah berikut di terminal:
```bash
node serve.js
```
Lalu buka browser di alamat:
[http://localhost:3000](http://localhost:3000)

---

## ✨ Fitur-Fitur Utama Website

1. **Daftar Isi Interaktif (Table of Contents)**:
   - Sticky sidebar navigasi di layar desktop yang secara otomatis mendeteksi posisi baca (*ScrollSpy*).
   - Drawer navigasi responsif khusus pengguna smartphone / mobile.
   - Nomor halaman sesuai dokumen pedoman resmi.

2. **Live Search / Pencarian Instan**:
   - Kolom pencarian di header untuk mencari kata kunci juknis (contoh: *dimensi*, *berat*, *remote*, *double elimination*, *sanksi*, *time out*).

3. **Visualisasi Interaktif Arena Dohyo**:
   - Diagram visual Dohyo berbasis vektor (SVG) dengan anotasi ukuran diameter (77 cm), garis batas putih (2,5 cm), dan garis start cokelat (10x1 cm jarak 10 cm).

4. **Kalkulator & Checklist Uji Kelayakan Robot (Self-Check)**:
   - Fitur interaktif untuk peserta memeriksa kepatuhan spesifikasi robot (dimensi ≤ 10x10 cm, berat ≤ 500g, remote mandiri start/stop, larangan suction/vakum/magnet).

5. **Mode Gelap / Terang (Dark & Light Mode)**:
   - Pilihan tampilan modern dark slate atau clean bright light mode dengan penyimpanan preferensi di browser (*localStorage*).

6. **Optimasi Cetak & Ekspor PDF**:
   - Tombol **"Cetak / PDF"** yang telah dioptimalkan dengan CSS `@media print` sehingga rapi dan siap disimpan sebagai PDF resmi tanpa elemen UI yang mengganggu.

7. **Akses Langsung Kontak WhatsApp**:
   - Tombol cepat untuk langsung terhubung ke Contact Person panitia (*Jea +62 878-2518-2361* & *Rizka +62 878-2102-2615*).

---

## 📂 Struktur File

```
c:\guidbook_infofest\
├── index.html     # Dokumen utama website & seluruh konten juknis
├── styles.css     # Kustomisasi CSS, styling scrollbar, active state, dan print layout
├── script.js     # Logika interaktif: search, scrollspy, checklist, dark mode
├── serve.js      # Server lokal ringan berbasis Node.js bawaan
└── README.md     # Panduan dokumentasi proyek
```

