import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import React from 'react';

import Layout from '@/components/PageLayout';
import { CheckToken } from '@/functions/AxiosHandlers';
import { LeisureCategory } from '@/types/LeisureCategory';

async function GetLeisureCategories() {
    try {
        const UserLang = getCookie('UserLang', { cookies });
        let acceptLanguage = 'ru-RU';
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kk':
                acceptLanguage = 'kz-KZ';
                break;
            case 'en':
                acceptLanguage = 'en-US';
                break;
        }

        const token = await CheckToken();
        const res = await fetch(process.env.NEXT_PUBLIC_MANAGEMENT_URL + 'commercial/leisureCategories', {
            headers: {
                'Accept-Language': acceptLanguage,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const leisureCategories: LeisureCategory[] = await res.json();

        return leisureCategories;
    } catch (error) {
        const leisureCategories: LeisureCategory[] = [];
        return leisureCategories;
    }
}

async function GetPosters() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'posters/forCommerce';
    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.log('res: ', res);
            return [];
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error('GetPosters failed:', error);
        return [];
    }
}
