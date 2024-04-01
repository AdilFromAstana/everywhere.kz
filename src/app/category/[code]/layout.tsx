import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import React from 'react';

import LeisureCategories from '@/components/LeisureCategories';
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
    // const UserCityId = getCookie('UserCityId', { cookies });
    // const UserCategoryId = getCookie('UserCategoryId', { cookies });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'posters/forCommerce';
    // `?CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
    // `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;
    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.log('res: ', res);
            // This will activate the closest `error.js` Error Boundary
            return [];
        }

        return res.json();
    } catch (error) {
        // Логирование ошибки
        console.error('Fetch failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

const Posters = dynamic(() => import('@/components/Posters'), {
    ssr: false,
    loading() {
        return (
            <div className="container mx-auto py-5 flex justify-between">
                <div className="3xl:min-h-[382px] 2xl:min-h-[306px] xl:min-h-[251px] lg:min-h-[187px] md:min-h-[187px] rounded-2xl w-full animate-pulse bg-gray-200"></div>
            </div>
        );
    },
});

export default async function CategoryLayout({
    children,
    params, // searchParams,
}: {
    children: React.ReactNode;
    params: { code: string };
    // searchParams: { [key: string]: string | string[] | undefined };
}) {
    const UserCategoryId = params.code;
    const leisureCategories = await GetLeisureCategories();
    const UserLang = getCookie('UserLang', { cookies });
    const PostersData = await GetPosters();
    const selectedCategory = leisureCategories.find((x: LeisureCategory) => {
        if (UserCategoryId) {
            return x.id === parseInt(UserCategoryId);
        } else {
            return x.id === 0;
        }
    });

    if (selectedCategory) {
        return (
            <Layout>
                <LeisureCategories leisureCategories={leisureCategories} selectedCategory={selectedCategory} />
                <Posters UserLang={UserLang ?? 'Ru'} posters={PostersData} />
                {children}
            </Layout>
        );
    }
}
