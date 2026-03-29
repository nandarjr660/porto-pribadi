import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import Provider bahasa yang tadi kita buat
import { LanguageProvider } from "../context/LanguageContext"; 
import Preloader from "../components/Preloader";
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
  title: "Hasmunandar | Portfolio",
  description: "Portofolio profesional Hasmunandar - Lulusan PGSD & PPG yang berdedikasi mengintegrasikan teknologi dalam pendidikan.",
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
          <Preloader />
          <FloatingButtons />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}