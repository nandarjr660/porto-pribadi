# DESIGN.md

# Project Overview

## Project Name

Personal Portfolio Website — Hasmunandar

## Purpose

Website ini merupakan personal portfolio berbasis storytelling yang dirancang untuk memperkenalkan identitas, perjalanan pendidikan, kemampuan, karya, serta membuka peluang relasi dan kolaborasi.

Website tidak berfokus pada pencapaian semata, tetapi pada perjalanan yang membentuk pencapaian tersebut.

## Target Audience

* Rekruter
* Institusi pendidikan
* Mitra kolaborasi
* Klien potensial
* Rekan profesional
* Pengunjung yang ingin mengenal pemilik portfolio

---

# Design Motto

> A portfolio that tells a journey, not just showcases achievements.

## Interpretation

Portofolio yang menceritakan sebuah perjalanan, bukan sekadar menampilkan pencapaian.

## Core Idea

Setiap garis merepresentasikan perjalanan.

Setiap section merepresentasikan bab dalam cerita.

Setiap interaksi membawa pengunjung lebih dekat kepada sosok di balik portfolio.

---

# Technical Constraints

## Framework

* Next.js App Router
* TypeScript

## Styling

* Tailwind CSS

## Animation

* GSAP
* Framer Motion

## Development Goal

Implementasi harus mereplikasi desain yang terdapat pada screenshot dan DESIGN.md seakurat mungkin tanpa melakukan redesign.

## GSAP Usage

GSAP digunakan untuk:

* Preloader sequence
* Split screen transition
* Overlay navigation transition
* Timeline roadmap reveal
* ScrollTrigger animation
* Complex animation sequencing

## Framer Motion Usage

Framer Motion digunakan untuk:

* Hover interaction
* Magnetic button
* Social icon interaction
* Accordion animation
* Small UI transitions
* Micro interaction

## Restrictions

* Jangan menambahkan section baru.
* Jangan mengganti layout utama.
* Jangan mengganti color palette.
* Jangan mengganti typography.
* Jangan menggunakan carousel.
* Jangan menggunakan glassmorphism.
* Jangan menggunakan neumorphism.
* Jangan menggunakan efek modern yang bertentangan dengan gaya editorial.
* Jangan mengubah storytelling flow.

---

# Design Identity

## Visual Style

* Editorial
* Minimalist
* Narrative Driven
* Personal
* Human Centered
* Warm
* Calm

## Brand Personality

* Profesional
* Reflektif
* Bertumbuh
* Bersahaja
* Humanis

## Emotional Tone

Pengunjung diharapkan merasa:

* Disambut
* Dikenal
* Dipahami
* Dipercaya
* Diajak terhubung

---

# Storytelling Philosophy

Website mengikuti struktur naratif berikut:

Welcome

↓

Introduction

↓

Identity

↓

Journey

↓

Growth

↓

Evidence

↓

Connection

Implementasi:

Preloader

↓

Home

↓

About

↓

Roadmap

↓

Skills

↓

Project

↓

Contact

---

# Website Architecture

## Main Pages

### Home

### About

Subsection:

* About Introduction
* Roadmap
* Skills

### Project

### Contact

---

# Color System

## Primary Accent

#FE979C

Digunakan sebagai warna aksen utama.

## Interaction Accent

#FEAE96

Digunakan untuk:

* Hover underline
* Interactive feedback
* Social icon
* CTA support
* Skill interaction

## Background

#F6E8DF

Canvas utama website.

## Primary Text

#013237

Digunakan untuk seluruh tipografi utama.

## Color Usage Rules

* Gunakan warna secara minimal.
* Accent color hanya digunakan untuk interaksi.
* Storytelling tetap menjadi fokus utama.

---

# Typography

## Font Family

### Heading

Space Grotesk

### Body

Inter

---

## Typography Scale

### Home

| Element        | Specification |
| -------------- | ------------- |
| Welcome Text   | 30px Bold     |
| PORTOFOLIO     | 128px Bold    |
| Description    | 16px          |
| Button Text    | 16px          |
| Mari Terhubung | 16px          |

### About

| Element         | Specification    |
| --------------- | ---------------- |
| Siapa Saya      | 45px Bold        |
| HASMUNANDAR     | 70px Bold        |
| Mahasiswa PPG   | 24px Bold        |
| Description     | 21px             |
| Competency Text | 18px Extra Light |
| Quote           | 26px             |
| ABOUT           | 100px Light      |

### Roadmap

| Element     | Specification        |
| ----------- | -------------------- |
| Question    | 45px Bold            |
| Card Title  | 48px Bold            |
| University  | 24px Bold            |
| Description | 20px                 |
| Location    | 20px                 |
| Year        | 70px Bold Opacity 6% |

### Skills

| Element     | Specification       |
| ----------- | ------------------- |
| Question    | 45px Bold           |
| Skill Title | 50px Bold Uppercase |

### Project

| Element     | Specification    |
| ----------- | ---------------- |
| Question    | 45px Bold        |
| Number      | 80px Bold        |
| Description | 20px             |
| Ke Halaman  | 20px Opacity 60% |
| PROJECT     | 100px Light      |

### Contact

| Element     | Specification |
| ----------- | ------------- |
| Question    | 45px Bold     |
| Description | 30px          |
| Social Text | 50px Bold     |
| CONTACT     | 100px Light   |

### Preloader

| Element      | Specification |
| ------------ | ------------- |
| Welcome Text | 20px Bold     |
| Percentage   | 20px Bold     |

---

# Layout System

## Design Canvas

Desktop Artboard:

1440 × 1024

## Horizontal Padding

Left:

88px

Right:

88px

## Layout Philosophy

* Editorial composition
* Strong whitespace
* Reading-first hierarchy
* Asymmetrical balance

---

# Spacing & Grid

Spacing mengikuti komposisi visual Figma dan whitespace editorial.

Tidak menggunakan sistem spacing modular yang kaku.

Whitespace diperlakukan sebagai bagian dari storytelling.

---

# Responsive Design Intent

## Desktop

Mengoptimalkan ruang tanpa mengurangi kenyamanan membaca.

## Tablet

Layout dapat menyesuaikan untuk menjaga keseimbangan visual.

## Mobile

Posisi dan ukuran elemen dapat berubah untuk kenyamanan membaca.

Storytelling harus tetap dipertahankan pada seluruh ukuran layar.

---

# Components

## Navbar

### Structure

* Logo
* Hamburger Menu
* Overlay Navigation

### Interaction

Hamburger berubah menjadi ikon close menggunakan morph animation.

---

## Overlay Navigation

### Opening

Container meluas hingga menutupi halaman utama.

### Closing

Animasi berjalan secara terbalik.

### Navigation Item Animation

* Fade In
* Slide dari kiri
* Bounce ringan

### Right Content Animation

* Fade In
* Slide dari kanan
* Bounce ringan

### Hover

* Underline #FEAE96
* Text lift
* Direction-aware underline

### Portrait

Size:

302 × 318 px

No radius.

Click:

* Membesar 5–10px

Auto Reset:

* 7 detik

### Empty Area Interaction

Klik area kosong:

Tampilkan teks:

"Klik lagi untuk keluar"

Klik kedua:

Overlay tertutup.

---

## Buttons

Size:

144 × 44 px

Radius:

9px

Variants:

* Filled
* Outlined

Shadow:

Soft dan smooth.

Hover:

Magnetic effect.

Click:

Elastic push.

---

## Social Icons

Size:

39 × 39 px

Shape:

Circle

Background:

#FEAE96

Hover:

Mengikuti warna platform.

Click:

Elastic interaction.

---

## Roadmap Card

Menggunakan soft shadow.

Card menjadi elemen utama yang memiliki depth visual selain button.

---

## Skills Accordion

Default state:

Semua tertutup.

Area klik:

* Teks
* Tombol + / -

Single active state.

Animation:

Fade In dari atas ke bawah.

Hover:

* Garis berubah #FEAE96
* Text lift
* Pointer cursor

---

## Project Showcase

Hover image:

* Zoom
* Magnetic interaction

Hover CTA:

* Warna berubah #FEAE96

Click:

Membuka website project di tab baru.

---

# Image Rules

## Home Portrait

Size:

435 × 632 px

Radius:

50px

## About Portrait

Size:

300 × 334 px

Menyatu dengan background pada bagian bawah.

## Global Rules

* Portrait adalah focal point.
* Wajah tidak boleh terpotong.
* Komposisi wajah harus dipertahankan.

---

# Motion & Animation Philosophy

## Core Principle

Motion guides the story.

## Motion Characteristics

* Smooth
* Cinematic
* Calm
* Editorial
* Narrative Driven

## Motion Rule

Motion digunakan untuk mengungkap cerita.

Bukan untuk memamerkan animasi.

### Principle

Reveal, not celebrate.

---

# Animation Priority

## Critical

* Preloader
* Overlay Navigation
* Roadmap Timeline

## Important

* Skills Accordion
* Project Interaction
* CTA Interaction

## Enhancement

* Social Icons
* Hover Effects
* Micro Interactions

---

# Page Structure

## Preloader

### Purpose

Menyambut pengunjung.

### Sequence

Blank Screen

↓

Short Line

↓

1%

↓

Hi, Selamat datang :)

↓

Progress berjalan

↓

Tunggu yaa, dikit lagi :*

↓

Welcome and Enjoy

↓

100%

↓

Split Screen Transition

↓

Website terbuka

### Symbolism

Progress line berfungsi sebagai:

* Loading indicator
* Simbol perjalanan
* Pemisah transisi

Garis putus-putus bergerak sebagai representasi perjalanan hidup.

---

## Home

### Purpose

Introduction.

Menjawab:

* Website apa ini?
* Siapa pemiliknya?
* Status pemilik saat ini?

### Portrait

Tokoh utama dalam storytelling.

---

## About

### Purpose

Memperkuat identitas.

### Narrative

Siapa Saya?

↓

HASMUNANDAR

↓

Portrait

↓

Description

↓

Quote

---

## Roadmap

### Purpose

Perjalanan pendidikan.

### Timeline Animation

Garis putus-putus meningkat opacity secara bertahap.

Card muncul bergantian mengikuti arah timeline.

### Scroll Lock

Roadmap harus selesai diungkap sebelum pengguna melanjutkan ke section berikutnya.

---

## Skills

### Purpose

Representasi hasil belajar dan pertumbuhan.

---

## Project

### Purpose

Bukti nyata dari kemampuan dan perjalanan.

Opening Question:

Apa yang telah saya kerjakan?

---

## Contact

### Purpose

Membangun relasi, kerja sama, dan kolaborasi.

Desired Feeling:

"Saya mengenal orang ini dan saya ingin terhubung dengannya."

---

# Footer

Desktop Height:

140px

Tablet dan Mobile:

Adaptive.

Footer hadir pada seluruh halaman sebagai elemen global.

---

# Single Source of Truth

Frontend developer dan AI coding agent wajib menggunakan:

1. DESIGN.md
2. Screenshot desain
3. Hasil interview Product Owner

sebagai sumber kebenaran utama.

Tidak diperbolehkan melakukan redesign atau menambahkan fitur tanpa persetujuan.

---

# Design Principles

## Storytelling

Website adalah sebuah cerita.

## Journey

Perjalanan adalah tema utama.

## Simplicity

Kesederhanaan menjaga fokus pada makna.

## Motion Guides the Story

Animasi membimbing pembaca.

## Human Before Interface

Identitas personal selalu hadir.

## Whitespace as Narrative Space

Ruang kosong adalah bagian dari cerita.

## Every Line Represents a Journey

Setiap garis merepresentasikan:

* langkah
* pertumbuhan
* proses
* perjalanan hidup
