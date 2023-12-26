import { MetadataRoute } from 'next';

import { CheckToken } from '@/functions/AxiosHandlers';
import { EventInList } from '@/types/EventInList';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: process.env.NEXT_PUBLIC_APP_URL,
            priority: 1,
        },
        ...(await GetEvents()).items.map((x: EventInList) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/event/${x.code}`,
            lastModified: new Date(),
        })),
    ];
}

async function GetEvents() {
    const { EVENTS_URL = '' } = process.env;
    const token = await CheckToken();

    const res = await fetch(EVENTS_URL + 'commercial/Events', {
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
