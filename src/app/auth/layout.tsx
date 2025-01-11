import React from 'react';

import PageLayout from '@/components/PageLayout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <PageLayout>{children}</PageLayout>;
}
