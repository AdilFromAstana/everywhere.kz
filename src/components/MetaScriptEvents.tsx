'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export const MetaScriptEvents: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''); //don't forget to change this
                ReactPixel.pageView();
            });
    }, [pathname, searchParams]);

    return null;
};
