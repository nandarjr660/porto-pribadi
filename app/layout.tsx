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

// 2. Update Metadata biar lebih profesional
export const metadata: Metadata = {
  title: "Hasmunandar | Portfolio Pendidik SD & Inovator Web Kreatif",
  description: "Selamat datang di portofolio Hasmunandar, seorang lulusan PPG Prajabatan yang berdedikasi mengintegrasikan pedagogik sekolah dasar dengan solusi digital modern yang kreatif.",
  openGraph: {
    title: "Hasmunandar | Portfolio Pendidik SD & Inovator Web Kreatif",
    description: "Selamat datang di portofolio Hasmunandar, seorang lulusan PPG Prajabatan yang berdedikasi mengintegrasikan pedagogik sekolah dasar dengan solusi digital modern yang kreatif.",
    url: "https://hsmnandar.vercel.app",
    siteName: "Hasmunandar Portfolio",
    images: [
      {
        url: "/images/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hasmunandar Portfolio Preview"
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg", // Note: public/ hanya memiliki favicon.svg saat ini
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