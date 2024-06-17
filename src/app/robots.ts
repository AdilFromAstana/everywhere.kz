import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    if (process.env.NEXT_PUBLIC_IS_DEV) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
            sitemap: 'https://dev.kazticket.kz/sitemap.xml',
        };
    } else {
        return {
            rules: {
                userAgent: '*',
                allow: '/',
                disallow: '/order/',
            },
            sitemap: 'https://kazticket.kz/sitemap.xml',
        };
    }
}
