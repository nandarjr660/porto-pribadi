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
    images: [
      {
        url: "/og/projects.png",
        width: 1200,
        height: 630,
        alt: "Projek Hasmunandar",
      },
    ],
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}