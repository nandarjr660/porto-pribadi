import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { Preloader } from "@/components/ui";
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
  title: "Portofolio | Hasmunandar",
  description:
    "Personal portfolio berbasis storytelling — Mahasiswa Program Pendidikan Profesi Guru (PPG)",
};

function MaintenanceScreen() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]">
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
        {isMaintenance ? (
          <MaintenanceScreen />
        ) : (
          <>
            <DisableContextMenu />
            <Preloader />
            <Navbar />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
