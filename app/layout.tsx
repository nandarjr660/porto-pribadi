import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import Provider bahasa yang tadi kita buat
import { LanguageProvider } from "../context/LanguageContext"; 

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFDF1]">
        {/* 4. Bungkus children dengan LanguageProvider */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}