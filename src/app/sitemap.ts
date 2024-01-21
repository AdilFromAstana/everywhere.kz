import { MetadataRoute } from 'next';

import { CheckToken } from '@/functions/AxiosHandlers';
import { EventInList } from '@/types/EventInList';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages = [
        '/offer_contract',
        '/payment_security',
        '/security_policy',
        '/contacts',
        '/offer',
        '/about_us',
    ];

    return [
        {
            url: process.env.NEXT_PUBLIC_APP_URL,
            priority: 1,
        },
        ...(await GetEvents()).items.map((x: EventInList) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/event/${x.code}`,
            lastModified: new Date(),
        })),
        ...(await GetEventumEvents()).map((x: any) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/e/${x.Code}`,
            lastModified: new Date(),
        })),
        ...staticPages.map((x) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/${x}`,
            lastModified: new Date(),
        })),
    ];
}

async function GetEvents() {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;
    const token = await CheckToken();

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'commercial/Events', {
        headers: {
            'Accept-Language': 'ru-RU',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return { items: [] };
    }

    return res.json();
}

async function GetEventumEvents() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const res = await fetch(process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL + 'eventum/forCommerce', {
        headers: {
            'Accept-Language': 'ru-RU',
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    return res.json();
}
