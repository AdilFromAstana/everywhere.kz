import { MetadataRoute } from 'next';

import { CheckToken } from '@/functions/AxiosHandlers';
import { EventInList } from '@/types/EventInList';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages = ['offer_contract', 'payment_security', 'security_policy', 'contacts', 'offer', 'about_us'];

    return [
        {
            url: process.env.NEXT_PUBLIC_APP_URL,
            priority: 1,
        },
        ...(await GetEvents()).items.map((x: EventInList) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/event/${x.code}`,
            lastModified: x.updatedAt,
        })),
        ...(await GetEventumEvents()).map((x: any) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/e/${x.Code}`,
            lastModified: new Date(),
        })),
        ...(await GetSelections())?.eventSelections.map((x: any) => ({
            url: `${process.env.NEXT_PUBLIC_APP_URL}/selections/${x.code}`,
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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'commercial/Events?top=1000', {
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

    const data = await res.json();

    return data;
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

async function GetSelections() {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'commercial/EventSelections', {
        headers: {
            'Accept-Language': 'ru-RU',
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log('GetSelections ERROR: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    const data = await res.json();

    console.log('data: ', data);

    return data;
}
