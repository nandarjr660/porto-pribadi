# Nandar Portfolio

## Perintah

```bash
npm run dev      # dev server di localhost:3000
npm run build    # build production
npm run start    # jalanin hasil build
npm run lint     # eslint aja (ga ada tsc, ga ada test)
```

Tidak ada script untuk typecheck atau test. Tidak ada CI.

## Arsitektur

Single-page app dengan routing SPA custom — semua section di-render di dalam `app/page.tsx`, bukan sebagai route terpisah:

- `features/home/`, `features/about/`, `features/project/`, `features/contact/` — masing-masing export komponen section via `index.ts`
- Navbar pake `history.pushState` + dispatch `popstate` — halaman utama dengerin event itu dan ganti section aktif
- `next.config.ts` + `vercel.json` rewrite `/about`, `/project`, `/contact`, `/home` balik ke `/` biar navigasi lewat URL juga jalan

## File penting

| File                           | Kegunaan                                                                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`                 | Shell SPA, routing section via state `active`, listener event custom                                                                     |
| `app/layout.tsx`               | Layout root, juga nampilin `MaintenanceScreen` kalau `NEXT_PUBLIC_MAINTENANCE_MODE=true`                                                 |
| `app/globals.css`              | Tailwind v4 dengan `@theme inline` — custom token: `--color-background`, `--color-text-primary`, `--color-interaction`, `--color-accent` |
| `next.config.ts`               | Security headers (CSP, HSTS, dll), rewrite SPA                                                                                           |
| `components/layout/Navbar.tsx` | Navbar overlay full-screen dengan animasi GSAP                                                                                           |
| `components/ui/Preloader.tsx`  | Loader split-screen pake GSAP, kirim event `trigger-home-load` / `trigger-home-animation`                                                |

## Event custom (ngatur transisi section)

- `trigger-home-load` — preloader kasih tau konten siap dipasang
- `trigger-home-animation` — preloader kasih tau animasi masuk boleh mulai
- `navbar-navigate-start` — navbar kasih tau ada navigasi yang pending
- `navbar-animation-complete` — animasi tutup navbar selesai
- `section-entrance` — bawa nama target section di `detail`

## Stack animasi

- **GSAP**: preloader (`components/ui/Preloader.tsx`), navbar buka/tutup (`components/layout/Navbar.tsx`), logo/hamburger navbar saat masuk
- **Framer Motion**: semua animasi masuk section (`AboutSection`, `HomeSection`, dll.), reveal saat scroll pake `whileInView`

## Styling

Tailwind CSS v4 dengan plugin `@tailwindcss/postcss`. Token tema custom di `globals.css`:

```
--color-background: #F6E8DF
--color-text-primary: #013237
--color-interaction: #FEAE96
--color-accent: #FE979C
--font-heading: "Space Grotesk"
--font-body: "Inter"
```

## Alias path

Ada di `tsconfig.json`:

- `@/*` → root project (dipakai di mana-mana, contoh `@/lib/utils`, `@/features/about`)
- `~types`, `~components`, `~features` juga ada tapi `@/` lebih disaranin

## Utilitas

`lib/utils.ts` export `cn(...)` — bungkus `clsx` + `tailwind-merge`. Dipakai buat gabung class conditional.

## Mode maintenance

Setel `NEXT_PUBLIC_MAINTENANCE_MODE=true` di `.env.local` buat nampilin layar maintenance (GIF + teks) di seluruh situs. Perlu restart dev server.

## Gambar

Gambar statis di `public/images/` — `about.webp`, `navbar.webp`, `mainten.gif`, `roadmap.png`. Dipanggil pake `next/image` dengan `fill` + `object-contain` atau `object-cover`.

## Workflow maintenance mode + git commit

Saat pengguna bilang "aktifkan maintenance mode dan lakukan git add" atau "matikan maintenance mode dan lakukan git add":

1. **Toggle maintenance** — setel `NEXT_PUBLIC_MAINTENANCE_MODE=true` atau `false` di `.env.local`, restart dev server
2. **Git commit** — jalankan:
   ```
   git add .
   git commit -m "V{year}.{version}.{day}{month}"
   ```

   - `{year}` = tahun saat ini (2 digit, misal `26`)
   - `{version}` = versi commit sebelumnya + 1 (mulai dari 1 kalau belum ada)
   - `{day}{month}` = tanggal + bulan (misal `1806` untuk 18 Juni)

## Hal penting yang perlu diketahui

- Preloader pake `sessionStorage` key `preloader_shown` — pas kunjungan ulang langsung ilang dan dispatch event load
- Animasi hamburger navbar pake GSAP timeline `paused: true` — dihidupkan/matiin pake `play()`/`reverse()`
- Section About pake animasi clip berdasarkan scroll, diatur oleh `useScroll` + `useTransform` dari Framer Motion
- Ga ada database, ga ada API routes, ga ada server actions — frontend statis
