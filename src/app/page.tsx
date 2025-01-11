'use server';

import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';

import AnnouncementListWrapper from '@/components/EventsPage/AnnouncementListWrapper';
import PageLayout from '@/components/PageLayout';
import { LookingForValues } from '@/types/LookingForValues';

export default async function Home() {
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const lookingFor: LookingForValues = getCookie('LookingFor', { cookies }) || 'advertiser';

    return (
        <PageLayout>
            <AnnouncementListWrapper
                lookingFor={lookingFor ? lookingFor : 'advertiser'}
                locale={locale}
                userLang={UserLang}
            />
        </PageLayout>
    );
}
