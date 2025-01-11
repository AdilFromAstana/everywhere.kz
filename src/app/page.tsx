'use server';

import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';

import RealEstateListWrapper from '@/components/EventsPage/RealEstateListWrapper';
import PageLayout from '@/components/PageLayout';

export default async function Home() {
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    return (
        <PageLayout>
            <RealEstateListWrapper
                locale={locale}
                userLang={UserLang}
            />
        </PageLayout>
    );
}
