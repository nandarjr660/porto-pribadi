import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import Provider bahasa yang tadi kita buat
import { LanguageProvider } from "../context/LanguageContext"; 
import Preloader from "../components/Preloader";
import ProgressBar from "../components/ProgressBar";
import FloatingButtons from "../components/FloatingButtons";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Langsung ke intinya: Nama dan Profesi
  title: "Hasmunandar, S.Pd. | Guru Sekolah Dasar",
  description: "Portofolio digital Hasmunandar, lulusan PPG Prajabatan yang berupaya terus belajar dan mendokumentasikan perjalanan menjadi guru SD di era digital.",
  
  openGraph: {
    title: "Hasmunandar, S.Pd. | Portofolio Guru SD",
    description: "Dokumentasi perjalanan mengajar, sertifikasi, dan pengembangan diri saya sebagai seorang guru sekolah dasar.",
    url: "https://hsmnandar.vercel.app",
    siteName: "Hasmunandar Portfolio",
    images: [
      {
        url: "/images/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasmunandar - Guru SD"
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Hasmunandar | Portfolio Guru SD",
    description: "Perjalanan menjadi pendidik di sekolah dasar.",
    images: ["/images/opengraph-image.jpg"],
  },
  
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#43766C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* 3. Tambahin scroll-smooth di sini biar navigasi antar section mulus */
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFDF1] overflow-x-hidden w-full max-w-full">
        {/* 4. Bungkus children dengan LanguageProvider */}
        <LanguageProvider>
          <ProgressBar />
          <Preloader />
          <FloatingButtons />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}