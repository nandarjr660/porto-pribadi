import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projek | Hasmunandar",
  description:
    "Projek Hasmunandar: Portofolio PPL Digital dan Media Pembelajaran Interaktif untuk siswa Sekolah Dasar.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}