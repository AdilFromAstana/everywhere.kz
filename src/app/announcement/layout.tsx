import React from 'react';

import PageLayout from '@/components/PageLayout';

export default function AnnouncementLayout({ children }: { children: React.ReactNode }) {
    return (
        <PageLayout>{children}</PageLayout>
    );
}
