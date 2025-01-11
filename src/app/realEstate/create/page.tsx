import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';

import CreateRealEstate from '@/components/CreateRealEstatePage/CreateRealEstate';
import Dropdown from '@/interfaces/Dropdown';

async function GetCities(): Promise<Dropdown[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'cities/', {
        headers: {
            // 'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.log('GetEventData Error: ', res);
        return [];
    }

    return await res.json();
}
async function GetRealEstateTypes(): Promise<Dropdown[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'realEstateTypes/', {
        headers: {
            // 'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.log('GetEventData Error: ', res);
        return [];
    }

    return await res.json();
}

export default async function CreateRealEstatePage() {
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const cities = await GetCities();
    const realEstateTypes = await GetRealEstateTypes();

    return (
        <div className="2xl:w-2/3 xl:w-10/12 md:w-11/12 m-auto mb-[10vh] items-start dark:bg-black dark:text-white grid xl:grid-cols-[65%_1fr] md:grid-cols-[85%_1fr]">
            <CreateRealEstate
                realEstate={{
                    description: '',
                    price: '',
                    cityCode: '',
                    typeCode: '',
                    businessCode: '',
                    adPlacementCode: '',
                    contactPhoneNumber: '',
                    RealEstateImages: [],
                }}
                cities={cities}
                locale={locale}
                realEstateTypes={realEstateTypes}
            />
        </div>
    );
}
