import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hsmnandar.vercel.app'

  return [
    {
      url: baseUrl, // Ini untuk halaman utama (Home)
      lastModified: new Date(),
      changeFrequency: 'monthly', // Seberapa sering kira-kira web ini diupdate
      priority: 1, // Prioritas utama (skala 0.0 sampai 1.0)
    },
  ]
}