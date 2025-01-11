'use server';

import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';

import MyRealEstateList from '@/components/RealEstateListPage/MyRealEstateList';
import { LookingForValues } from '@/types/LookingForValues';

export default async function CreateRealEstatePage() {
    const UserLang = getCookie('UserLang', { cookies });
    const LookingFor: LookingForValues = getCookie('LookingFor', { cookies }) || 'advertiser';
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    return (
        <div className="2xl:w-4/6 xl:w-10/12 md:w-11/12 m-auto items-start dark:bg-black dark:text-white mb-[25vh]">
            <MyRealEstateList locale={locale} lookingFor={LookingFor} />
        </div>
    );
}
