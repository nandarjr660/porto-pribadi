import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { Preloader, ScrollProgress } from "@/components/ui";
import DisableContextMenu from "@/components/ui/DisableContextMenu";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio Hasmunandar | Calon Guru Profesional & Pendidik Sekolah Dasar",
  description:
    "Portofolio digital dan perjalanan belajar Hasmunandar, mahasiswa PPG Prajabatan & PGSD, berfokus pada inovasi pembelajaran dan teknologi pendidikan.",
  keywords: [
    "Hasmunandar",
    "Kasimburang",
    "Portofolio PPG",
    "PPG Prajabatan",
    "Pendidikan Guru Sekolah Dasar",
    "PGSD",
    "Guru Profesional",
    "Teknologi Pendidikan",
    "Media Pembelajaran",
  ],
  authors: [{ name: "Hasmunandar", url: "https://hsmnandar.vercel.app" }],
  creator: "Hasmunandar",
  metadataBase: new URL("https://hsmnandar.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Portofolio Hasmunandar | Calon Guru Profesional & Pendidik Sekolah Dasar",
    description:
      "Portofolio digital dan perjalanan belajar Hasmunandar, mahasiswa PPG Prajabatan & PGSD, berfokus pada inovasi pembelajaran dan teknologi pendidikan.",
    url: "https://hsmnandar.vercel.app",
    siteName: "Portofolio Hasmunandar",
    images: [
      {
        url: "/images/potrait.webp",
        width: 800,
        height: 600,
        alt: "Hasmunandar Portrait",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofolio Hasmunandar | Calon Guru Profesional & Pendidik Sekolah Dasar",
    description:
      "Portofolio digital dan perjalanan belajar Hasmunandar, mahasiswa PPG Prajabatan & PGSD, berfokus pada inovasi pembelajaran dan teknologi pendidikan.",
    images: ["/images/potrait.webp"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  other: {
    "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID || "",
  },
};

function MaintenanceScreen() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6">
      <div className="relative size-[250px] sm:size-[300px] lg:size-[350px]">
        <Image
          src="/images/mainten.gif"
          alt="Under maintenance"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="mt-8 text-lg sm:text-xl lg:text-[24px] text-text-primary/70 font-body text-center">
        Halaman ini sedang dalam perbaikan
      </p>
    </main>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="opacity-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Hasmunandar",
              "url": "https://hsmnandar.vercel.app",
              "image": "https://hsmnandar.vercel.app/images/potrait.webp",
              "description": "Mahasiswa PPG Prajabatan dan calon pendidik Sekolah Dasar (PGSD) yang berfokus pada pengembangan media pembelajaran interaktif dan inovasi teknologi pendidikan.",
              "jobTitle": "Calon Guru Profesional / Pendidik",
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Universitas Negeri Makassar"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Universitas Muhammadiyah Indonesia"
                }
              ],
              "knowsAbout": [
                "Pendidikan Sekolah Dasar",
                "Kurikulum Merdeka",
                "Teknologi Pendidikan",
                "Media Pembelajaran Interaktif",
                "Penelitian Tindakan Kelas"
              ],
              "sameAs": [
                "https://facebook.com/Hasmunandar",
                "https://instagram.com/hsmnandar",
                "https://linkedin.com/in/Hasmunandar",
                "https://github.com/nandarjr660"
              ]
            })
          }}
        />
        {isMaintenance ? (
          <MaintenanceScreen />
        ) : (
          <>
            <DisableContextMenu />
            <Preloader />
            <ScrollProgress />
            <Navbar />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
