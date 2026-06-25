import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tuvi.vn';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dang-nhap', '/dang-ky', '/ca-nhan', '/lich-su', '/goi-dich-vu'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}