'use client';

import React, { useEffect } from 'react';

import PageLayout from '@/components/PageLayout';

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => {
            document.documentElement.classList.remove('dark');
        };
    });
    return (
        <PageLayout>{children}</PageLayout>
        // <div className="w-full">
        //     <Header />
        //     <div className="px-4 md:px-0"></div>
        //     <Footer />
        // </div>
    );
}
