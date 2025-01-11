import React from 'react';

import PageLayout from '@/components/PageLayout';

export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
    return <PageLayout>{children}</PageLayout>;
}
