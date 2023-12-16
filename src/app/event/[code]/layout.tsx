import React from 'react';

import Layout from '@/components/PageLayout';

export default function EventLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
