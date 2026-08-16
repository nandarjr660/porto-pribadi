# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiter dan sekolah (HRD sekolah, kepala sekolah, atau lembaga yang menilai kandidat guru) sebagai audiens utama yang menentukan keputusan produk. Institusi PPG (dosen pengampu/pendamping program PPG Prajabatan) sebagai audiens sekunder.

## Product Purpose

E-portofolio storytelling pribadi Hasmunandar — mahasiswa PPG Prajabatan dengan latar belakang PGSD dan calon guru SD. Produk ini menjadikan perjalanan, kompetensi, dan karya nyata tersaji dalam satu tempat, untuk personal branding, rekrutmen, dan peluang kolaborasi. Sukses berarti audiens memahami siapa Hasmunandar sebagai calon guru dan tergerak untuk menghubungi (form kontak / media sosial).

## Positioning

Storytelling journey: narasi perjalanan dari PPG Prajabatan → calon guru SD yang berfokus pada inovasi pembelajaran dan teknologi pendidikan, yang diakhiri dengan bukti karya nyata (portofolio PPL digital dan media pembelajaran interaktif). Mekanisme ini tidak bisa ditiru portofolio yang hanya menampilkan daftar CV.

## Operating Context

- Bahasa Indonesia untuk seluruh konten (pengguna: sekolah/institusi Indonesia).
- Empat rute nyata: `/` (beranda), `/about` (tentang), `/projects` (karya), `/contact` (kontak).
- Preloader storytelling muncul sekali per sesi (sessionStorage `preloader_shown`).
- Kontak masuk via form Web3Forms (email) — bukan social inbox.
- Mode maintenance tersedia bila dibutuhkan (`NEXT_PUBLIC_MAINTENANCE_MODE`).
- Deploy target: Vercel (hsmnandar.vercel.app).

## Capabilities and Constraints

- Kapabilitas: hero dengan identitas + CTA (Lihat Projek, Download CV), 6 chip keahlian, timeline perjalanan, 2 project showcase dengan link live, form kontak dengan validasi + toast, 4 media sosial, preloader animasi, scroll progress, smooth scroll (Lenis).
- Constraint teknis: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, motion (framer-motion), font Space Grotesk / DM Sans / JetBrains Mono. Animasi hanya transform + opacity; reduced-motion aware.
- Constraint konten: tidak ada metrik, testimoni, atau angka yang dibuat-buat (semua yang ditampilkan adalah fakta nyata).
- Undecided: Web3Forms access key masih hardcoded di klien (`features/contact/components/ContactForm.tsx`) — belum dipindah ke env.

## Brand Commitments

- Nama: Hasmunandar (wordmark "HSMN.").
- Gaya: brutalist playful (ink/paper + aksen #D4522A + warna playful sebagai sistem tag) — desain sistem sudah dikunci dan tidak boleh diganti tanpa keputusan baru.
- Media sosial resmi: facebook.com/Hasmunandar, instagram.com/hsmnandar, linkedin.com/in/Hasmunandar, github.com/nandarjr660.
- Domain: hsmnandar.vercel.app.
- Portofolio PPL: ppl-hasmunandar.vercel.app · Media interaktif: wheelduc.vercel.app.

## Evidence on Hand

- Foto profil: `public/images/potrait.webp`.
- Thumbnail karya: `public/images/project01.webp`, `public/images/project02.webp`.
- CV: tautan Google Drive (dipakai tombol "Download CV").
- Dua karya live: Portofolio PPL Digital dan Media Pembelajaran Interaktif (wheelduc).
- Yang tidak boleh dibuat-buat: testimoni, jumlah pengguna, metrik kelas, atau penghargaan.

## Product Principles

1. Storytelling journey yang berakhir pada bukti karya nyata — narasi mengantar, karya menjawab.
2. Autentik sebagai calon guru Indonesia: Bahasa Indonesia, tidak ada klaim palsu, tidak ada metrik rekaan.
3. Teknologi pendidikan sebagai pembeda: inovasi pembelajaran bukan sekadar dekorasi.
4. Setiap halaman mempermudah satu tindakan berikutnya: melihat karya, atau menghubungi.
5. Aksesibilitas dan performa adalah standar, bukan fitur bonus.

## Accessibility & Inclusion

- Komitmen produk: semantic HTML, navigasi keyboard, skip-link, fokus terlihat, `prefers-reduced-motion` dihormati, kontras warna memadai, label aria untuk kontrol ikon-only.
- Tidak ada persyaratan khusus pengguna yang dilaporkan di luar komitmen tersebut.