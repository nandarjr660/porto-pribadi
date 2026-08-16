import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang | Hasmunandar",
  description:
    "Tentang Hasmunandar, mahasiswa PPG Prajabatan & PGSD yang fokus pada media pembelajaran interaktif dan teknologi pendidikan.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}