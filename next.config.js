/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'devkazticket.blob.core.windows.net',
                port: '',
                pathname: '/**',
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
            allowedOrigins: ['localhost', 'dev-v2.kazticket.kz', 'kazticket.kz']
        }
    }
};

module.exports = nextConfig;
