const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'kazticket.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost', 'dev-v2.kazticket.kz', 'eventum.kazticket.kz', 'kazticket.kz', 'new.kazticket.kz', 'mc.yandex.ru']
        }
    },
    headers: () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
};

module.exports = withBundleAnalyzer(nextConfig)
