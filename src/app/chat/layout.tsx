import React from 'react';

import Layout from '@/components/PageLayout';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
