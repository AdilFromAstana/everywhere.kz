/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
    }
};

module.exports = nextConfig;
