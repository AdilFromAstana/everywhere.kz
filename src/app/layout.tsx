import { Metadata, Viewport } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: `Kazticket.kz`,
    description: `Kazticket.kz - Система онлайн покупки билетов`,
};

export const viewport: Viewport = {
    width: 'device-width',
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="h-full dark:bg-black" lang="en">
            <body className={inter.className + ' dark:bg-black'}>{children}</body>
        </html>
    );
}
