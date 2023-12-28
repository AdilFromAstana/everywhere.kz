import React from 'react';

import PageLayout from '@/components/PageLayout';

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return (
        <PageLayout>{children}</PageLayout>
        // <div className="w-full">
        //     <Header />
        //     <div className="px-4 md:px-0"></div>
        //     <Footer />
        // </div>
    );
}
