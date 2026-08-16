import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hasmunandar | Portofolio",
  description:
    "Portofolio Hasmunandar, mahasiswa PPG Prajabatan & PGSD. Fokus pada inovasi pembelajaran dan teknologi pendidikan.",
  keywords: [
    "Hasmunandar",
    "Portofolio PPG",
    "PPG Prajabatan",
    "PGSD",
    "Guru Profesional",
    "Teknologi Pendidikan",
    "Media Pembelajaran",
  ],
  authors: [{ name: "Hasmunandar", url: "https://hsmnandar.vercel.app" }],
  creator: "Hasmunandar",
  verification: {
    google: "4bxJJVPgCCP6EWmk2KaReb8YqjvhWA2H79ZSO7gIpZk",
  },
  metadataBase: new URL("https://hsmnandar.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hasmunandar | Portofolio",
    description:
      "Portofolio Hasmunandar, mahasiswa PPG Prajabatan & PGSD. Fokus pada inovasi pembelajaran dan teknologi pendidikan.",
    url: "https://hsmnandar.vercel.app",
    siteName: "Hasmunandar Portofolio",
    images: [
      {
        url: "/images/potrait.webp",
        width: 800,
        height: 600,
        alt: "Hasmunandar",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasmunandar | Portofolio",
    description:
      "Portofolio Hasmunandar, mahasiswa PPG Prajabatan & PGSD.",
    images: ["/images/potrait.webp"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hasmunandar",
              url: "https://hsmnandar.vercel.app",
              image: "https://hsmnandar.vercel.app/images/potrait.webp",
              description:
                "Mahasiswa PPG Prajabatan dan calon pendidik Sekolah Dasar (PGSD) yang berfokus pada pengembangan media pembelajaran interaktif.",
              jobTitle: "Calon Guru Profesional",
              alumniOf: [
                { "@type": "EducationalOrganization", name: "Universitas Negeri Makassar" },
                { "@type": "EducationalOrganization", name: "Universitas Muhammadiyah Indonesia" },
              ],
              knowsAbout: [
                "Pendidikan Sekolah Dasar",
                "Kurikulum Merdeka",
                "Teknologi Pendidikan",
                "Media Pembelajaran Interaktif",
              ],
              sameAs: [
                "https://facebook.com/Hasmunandar",
                "https://instagram.com/hsmnandar",
                "https://linkedin.com/in/Hasmunandar",
                "https://github.com/nandarjr660",
              ],
            }),
          }}
        />
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <a href="#main-content" className="skip-link">
            Langkah ke konten utama
          </a>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
