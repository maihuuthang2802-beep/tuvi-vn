import { MetadataRoute } from 'next';

const baseUrl = 'https://tuvi.vn';

const staticRoutes = [
  '',
  '/tu-vi',
  '/tu-vi/hop-menh',
  '/tu-vi/kien-thuc',
  '/kinh-dich',
  '/xin-xam',
  '/tarot',
  '/co-thu',
  '/goi-dich-vu',
  '/dang-nhap',
  '/dang-ky',
  '/ca-nhan',
  '/lich-su',
  '/lich-van-nien',
  '/gieo-que',
];

const knowledgeStars = [
  'tu-vi', 'thien-co', 'thai-duong', 'vu-khuc', 'thien-dong',
  'liem-trinh', 'thien-phu', 'thai-am', 'tham-lang', 'cu-mon',
  'thien-tuong', 'thien-luong', 'that-sat', 'pha-quan',
];

const knowledgeTopics = [
  'overview', 'personality', 'love', 'career', 'wealth', 'health',
  'family', 'children', 'move', 'friends', 'home', 'spirit', 'parents',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const knowledgeRoutes = knowledgeStars.flatMap((star) =>
    knowledgeTopics.map((topic) => ({
      url: `${baseUrl}/tu-vi/kien-thuc/${star}/${topic}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  const classicBooks = [
    'cot-tuy-phu',
    'tu-vi-toan-thu',
    'dau-so-toan-tap',
    'dau-so-toan-thu',
  ];

  const classicRoutes = classicBooks.map((book) => ({
    url: `${baseUrl}/co-thu/${book}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...knowledgeRoutes, ...classicRoutes];
}