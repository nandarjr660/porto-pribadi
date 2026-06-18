# Audit Report — E-Portofolio Hasmunandar

---

## Critical Issues

---

### 1. Warna `--color-accent: #FE979C` Tidak Digunakan

- **Expected:** `#FE979C` digunakan sebagai "Primary Accent" (DESIGN.md:214-218) — "Digunakan sebagai warna aksen utama"
- **Current:** Hanya didefinisikan di `app/globals.css:4` sebagai `--color-accent: #FE979C` tapi **0 penggunaan** di komponen. Seluruh interaksi hanya memakai `--color-interaction: #FEAE96`
- **Impact:** Design identity tidak lengkap. Missing color menyebabkan palette tidak sesuai spesifikasi DESIGN.md. Satu dari dua accent color tidak pernah muncul di UI.
- **Proposed Fix:** Gunakan `--color-accent` di komponen yang membutuhkan aksen utama, misalnya: hover state pada CTA button, active state pada nav items, atau elemen dekoratif tertentu.

---

### 2. Roadmap Card Background Sama Dengan Page Background

- **Expected:** DESIGN.md:518-522 — "Menggunakan soft shadow. Card menjadi elemen utama yang memiliki depth visual selain button."
- **Current:** `components/sections/Roadmap.tsx:168` — Card menggunakan `bg-background` (#F6E8DF) yang **identik dengan warna latar halaman**
- **Impact:** Card tidak terlihat sebagai elemen terpisah. Shadow (`shadow-lg`) di atas background yang sama tidak cukup untuk memberikan depth visual.
- **Proposed Fix:** Beri card background berbeda dari halaman (misal: putih dengan sedikit opacity, atau varian lebih terang/gelap dari background) agar card memiliki depth visual yang jelas.

---

### 3. Roadmap dan Skills Bukan Subsection dari About (Struktur Section Salah)

- **Expected:** DESIGN.md:194-208 — "### About. Subsection: About Introduction, Roadmap, Skills" — Roadmap dan Skills adalah **subsection dari About**, bukan section terpisah
- **Current:** `app/page.tsx:24-29` — Hero, About, Roadmap, Skills, ProjectShowcase, Contact semuanya sebagai **sibling sections setara** di root level
- **Impact:** Arsitektur section tidak sesuai DESIGN.md. Storytelling flow terputus.
- **Proposed Fix:** Bungkus Roadmap dan Skills sebagai visual subsection dalam About. Opsi: (a) Satu komponen About besar yang mencakup Introduction + Roadmap + Skills, atau (b) Visual grouping dengan background berbeda/wrapper section yang menandai "Ini masih bagian About".

---

### 4. Project Showcase Tidak Memiliki Gambar/Thumbnail

- **Expected:** DESIGN.md:551-556 — "Hover image: Zoom, Magnetic interaction". Setiap project harus memiliki gambar/thumbnail dengan efek hover zoom dan magnetic.
- **Current:** `components/sections/ProjectShowcase.tsx` — Hanya menampilkan teks (nomor, judul, deskripsi, CTA). **Tidak ada gambar sama sekali** di project mana pun.
- **Impact:** Missing seluruh interaksi hover image yang disepesifikasikan. Project tidak memiliki elemen visual.
- **Proposed Fix:** Tambahkan gambar/thumbnail untuk setiap project (dengan fallback placeholder jika gambar belum tersedia). Layout horizontal dengan gambar di kiri, teks di kanan. Efek hover zoom pada gambar dan magnetic interaction.

---

### 5. About Portrait Tidak "Menyatu dengan Background"

- **Expected:** DESIGN.md:586 — "Menyatu dengan background pada bagian bawah" — portrait 300×334px harus memiliki efek blend/fade di bagian bawah
- **Current:** `components/sections/About.tsx:156-169` — Image dalam container `overflow-hidden` tanpa efek blending atau gradient fade. Gambar tampil sepenuhnya solid.
- **Impact:** Efek visual spesifik dari DESIGN.md hilang. Portrait tidak terintegrasi dengan background secara artistik.
- **Proposed Fix:** Tambahkan gradient overlay di bagian bawah portrait menggunakan CSS `mask-image` atau pseudo-element dengan gradient dari transparan ke `#F6E8DF` (background color).

---

### 6. Roadmap Line Menggunakan `scaleY` Bukan Opacity

- **Expected:** DESIGN.md:758 — "Garis putus-putus **meningkat opacity secara bertahap**" — line harus fade in secara progresif
- **Current:** `components/sections/Roadmap.tsx:82-86` — Line menggunakan `scaleY: 0 → 1` (tumbuh dari atas ke bawah dengan transform origin top)
- **Impact:** Animasi tidak sesuai spesifikasi. ScaleY menciptakan ilusi "grow from top" bukan "fade in" seperti yang diminta.
- **Proposed Fix:** Ubah animasi line dari `scaleY` menjadi `opacity` reveal. Line tetap utuh dari awal tapi opacity meningkat secara bertahap mengikuti scroll.

---

### 7. Preloader Split Screen Arah (Top-Bottom vs Kiri-Kanan)

- **Expected:** DESIGN.md:686 — "Split Screen Transition". Konvensi split screen umumnya horizontal (kiri-kanan).
- **Current:** `components/sections/Preloader.tsx:129-136` — Split **top-bottom** (atas-bawah): `topRef` bergerak `y: "-50%"`, `bottomRef` bergerak `y: "50%"`
- **Impact:** Arah split perlu divalidasi dari screenshot desain. Jika screenshot menunjukkan split horizontal, implementasi saat ini salah arah.
- **Proposed Fix:** Validasi dari screenshot. Jika horizontal, ubah menjadi: `leftRef` ke `x: "-50%"`, `rightRef` ke `x: "50%"`.

---

## Major Issues

---

### 1. Ukuran Font Home Tidak Proporsional di Mobile

- **Expected** (DESIGN.md:269-276): Welcome Text: 30px Bold, PORTOFOLIO: 128px Bold, Description: 16px
- **Current** (`Hero.tsx`): Welcome → `text-2xl` (24px) bukan 30px; PORTOFOLIO → `text-6xl` (60px) bukan 128px; Description → `text-sm` (14px) bukan 16px
- **Impact:** Di mobile, font sizes turun drastis dari spesifikasi. PORTOFOLIO turun dari 128px ke 60px (53% dari spesifikasi).
- **Proposed Fix:** Sesuaikan base font size di mobile agar lebih proporsional.

---

### 2. MagneticButton Tidak Memiliki Shadow

- **Expected:** DESIGN.md:480-482 — "Shadow: Soft dan smooth"
- **Current:** `components/ui/MagneticButton.tsx:40-42` — Filled variant: `bg-text-primary text-background hover:bg-text-primary/90` — **tidak ada shadow class**
- **Impact:** Button filled tidak memiliki depth visual.
- **Proposed Fix:** Tambahkan `shadow-md` atau `shadow-lg` dengan warna soft pada filled variant.

---

### 3. Skills Accordion Hanya Framer Motion, Tidak Ada GSAP ScrollTrigger

- **Expected:** DESIGN.md:630-634 — Skills Accordion adalah prioritas "Important" untuk animasi (ScrollTrigger). INSTRUCTION.txt:99 — menyebut accordion sebagai tanggung jawab Framer Motion. Terjadi konflik antar dokumen.
- **Current:** `components/sections/Skills.tsx` — Menggunakan Framer Motion `AnimatePresence` murni. Tidak ada GSAP ScrollTrigger untuk entrance animation section.
- **Impact:** Perlu klarifikasi: apakah Skills cukup dengan Framer Motion accordion, atau perlu GSAP ScrollTrigger untuk entrance section (seperti section lain)?
- **Proposed Fix:** Clarify with Product Owner. Opsi: tambahkan GSAP ScrollTrigger untuk entrance animation section sementara accordion interaction tetap Framer Motion.

---

### 4. Roadmap Scroll Lock Hardcoded (Tidak Adaptif)

- **Expected:** DESIGN.md:762-764 — "Roadmap harus selesai diungkap sebelum pengguna melanjutkan"
- **Current:** `components/sections/Roadmap.tsx:69` — `end: \`+=\${(timeline.length + 1) * 600}\`` — nilai 600px per card hardcoded
- **Impact:** Scroll lock distance tidak adaptif terhadap viewport height.
- **Proposed Fix:** Gunakan `window.innerHeight` untuk kalkulasi dinamis, misal: `(timeline.length + 1) * window.innerHeight`. Atau gunakan ScrollTrigger function-based value.

---

### 5. Footer Copyright Bahasa Inggris

- **Expected:** Seluruh konten website menggunakan Bahasa Indonesia
- **Current:** `components/layout/Footer.tsx:9` — `"All rights reserved"` dalam Bahasa Inggris
- **Impact:** Inkonsistensi bahasa.
- **Proposed Fix:** Ganti menjadi Bahasa Indonesia: `"Hak cipta dilindungi"` atau `"Seluruh hak cipta dilindungi"`

---

### 6. Duplikasi GSAP ScrollTrigger Registration (4 File)

- **Expected:** `lib/gsap.ts` dibuat sebagai central registration untuk GSAP + ScrollTrigger
- **Current:** `gsap.registerPlugin(ScrollTrigger)` ada di 4 file: `About.tsx:8`, `Roadmap.tsx:7`, `ProjectShowcase.tsx:8`, `Contact.tsx:8`. `lib/gsap.ts` tidak digunakan sama sekali.
- **Impact:** Redundansi kode.
- **Proposed Fix:** Import dari `lib/gsap.ts` di semua komponen, hapus `gsap.registerPlugin(ScrollTrigger)` inline dari komponen.

---

### 7. Contact Email Placeholder Tidak Realistis

- **Expected:** Email asli untuk production
- **Current:** `components/sections/Contact.tsx:94` — `hasmunandar@email.com` (placeholder)
- **Impact:** Jika website dipublikasikan dengan email placeholder, pengunjung tidak bisa menghubungi.
- **Proposed Fix:** Ganti dengan email asli Hasmunandar.

---

### 8. Social Links Duplikasi di Home dan Contact

- **Expected:** DESIGN.md: Social links hadir di Home ("Mari Terhubung") dan Contact ("Social Media")
- **Current:** `Hero.tsx:73` menggunakan `<SocialLinks />`, `Contact.tsx:105` juga menggunakan `<SocialLinks />`
- **Impact:** Link yang sama muncul dua kali di single page application. Bisa membingungkan.
- **Proposed Fix:** Validasi apakah duplikasi disengaja. Jika tidak, tampilkan hanya di Contact.

---

## Minor Issues

---

### 1. Roadmap Year Tersembunyi di Mobile

- **Expected:** Tahun kronologis harus terlihat di semua ukuran layar
- **Current:** `Roadmap.tsx:188-189` — Tahun di-hidden di mobile (`hidden md:block`)
- **Impact:** Informasi kronologis hilang di perangkat mobile
- **Proposed Fix:** Tampilkan year di mobile dengan ukuran lebih kecil, atau letakkan di dalam card

---

### 2. Competency Text 18px di Mobile Menjadi 16px

- **Expected:** Competency Text: 18px Extra Light (DESIGN.md:286)
- **Current:** `About.tsx:131` — `text-base` (16px) di mobile, baru `lg:text-[18px]`
- **Impact:** Ukuran font di mobile tidak sesuai spesifikasi
- **Proposed Fix:** Gunakan `text-[18px]` langsung atau `text-[16px]` jika ingin lebih kecil (perlu klarifikasi)

---

### 3. MagneticButton Struktur HTML Kurang Ideal

- **Expected:** Struktur HTML yang semantik dan accessible
- **Current:** `MagneticButton.tsx:62-65` — `<a href={href}><motion.div>...</motion.div></a>` — `<div>` di dalam `<a>`
- **Impact:** Aksesibilitas kurang ideal
- **Proposed Fix:** Ganti `motion.div` menjadi `motion.a` langsung

---

### 4. Preloader Dashed Line Tidak Bergerak

- **Expected:** DESIGN.md:699-700 — "Garis putus-putus bergerak sebagai representasi perjalanan hidup" — ada elemen bergerak pada garis putus-putus
- **Current:** `Preloader.tsx:164-171` — Short line dengan dashed pattern statis (tidak bergerak)
- **Impact:** Missing subtle motion pada simbol perjalanan
- **Proposed Fix:** Tambahkan animasi `background-position` pada dashed line untuk efek garis bergerak (running dash)

---

### 5. Preloader Welcome Text & Typography

- **Expected:** Welcome Text: 20px Bold (DESIGN.md:331)
- **Current:** `Preloader.tsx:142` — `text-xl font-bold` (20px)
- **Status:** ✅ Sesuai. Tidak ada issue.

---

### 6. All Decorative Text Posisi Bottom-Right

- **Expected:** DESIGN.md tidak spesifik tentang posisi decorative text
- **Current:** Semua decorative text (ABOUT, ROADMAP, PROJECT, CONTACT) di `bottom-0 right-6`
- **Status:** Perlu divalidasi dari screenshot

---

### 7. About Quote Style di Mobile

- **Expected:** Quote: 26px italic (DESIGN.md:287)
- **Current:** `About.tsx:146` — `text-lg italic` (18px) → `lg:text-[26px]` di desktop
- **Status:** Perlu validasi apakah quote perlu 26px di semua ukuran atau hanya desktop

---

### 8. Overlay Nav Portrait Auto Reset 7 Detik

- **Expected:** DESIGN.md:448-449 — Portrait auto reset setelah 7 detik
- **Current:** `OverlayNav.tsx:140-145` — Scale up on click, delay 7 detik untuk reset
- **Status:** ✅ Sesuai. Tidak ada issue.

---

## Missing Features

| # | Feature | Detail |
|---|---------|--------|
| 1 | **Project Thumbnail/Gambar** | DESIGN.md:553-556 menspesifikasikan hover image dengan zoom dan magnetic interaction. Implementasi hanya teks. |
| 2 | **CV Download CTA** | Tidak ada tombol/download CV. (Awalnya ada di implementasi awal, dihapus. Perlu konfirmasi apakah CV download diperlukan.) |
| 3 | **Split Screen Direction Validation** | Tidak ada konfirmasi dari Product Owner/screenshot apakah arah split screen horizontal (kiri-kanan) atau vertikal (atas-bawah) |
| 4 | **About Portrait Blend Effect** | Efek "menyatu dengan background pada bagian bawah" (DESIGN.md:586) tidak diimplementasi |
| 5 | **Penggunaan `--color-accent` (#FE979C)** | Warna didefinisikan di CSS tapi tidak digunakan di komponen mana pun |

---

## Wrong Features

| # | Feature | Expected (DESIGN.md) | Current Implementation |
|---|---------|---------------------|----------------------|
| 1 | **Roadmap Line Animation** | Opacity meningkat bertahap (DESIGN.md:758) | `scaleY` dari atas ke bawah (`Roadmap.tsx:82-86`) |
| 2 | **Sections Structure** | Roadmap & Skills sebagai subsection About (DESIGN.md:200-204) | Semua section sebagai sibling setara (`page.tsx:24-29`) |
| 3 | **Preloader Split Direction** | "Split Screen Transition" | Vertikal (atas-bawah) di `Preloader.tsx:129-136` |
| 4 | **Project Tanpa Gambar** | Hover image zoom & magnetic (DESIGN.md:553-556) | Tidak ada gambar, hanya teks |

---

## Summary

| Kategori | Jumlah |
|----------|--------|
| Critical | 7 |
| Major | 8 |
| Minor | 8 |
| Missing Features | 5 |
| Wrong Features | 4 |
