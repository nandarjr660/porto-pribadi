import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak | Hasmunandar",
  description:
    "Hubungi Hasmunandar untuk diskusi, kolaborasi, atau seputar pendidikan dan teknologi pembelajaran.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
    images: [
      {
        url: "/og/contact.png",
        width: 1200,
        height: 630,
        alt: "Kontak Hasmunandar",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}