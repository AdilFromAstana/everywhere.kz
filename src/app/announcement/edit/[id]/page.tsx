import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';

import EditAnnouncement from '@/components/EditAnnouncementPage/EditAnnouncement';
import Dropdown from '@/interfaces/Dropdown';

async function GetAdPlacements(): Promise<Dropdown[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'adPlacements/', {
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

async function GetAnnouncementTypes(): Promise<Dropdown[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'announcementTypes/', {
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

async function GetBusinessFields(): Promise<Dropdown[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'businessFields/', {
        headers: {
            // 'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error('GetBusinessFields Error: ', res);
        return [];
    }

    return await res.json();
}

async function GetAnnouncementData(code: string) {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'announcements/' + code, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.log('GetEventData Error: ', res);
        return null;
    }

    return await res.json();
}

type Props = {
    params: { id: string };
};

export default async function EditAnnouncementPage({ params }: Props) {
    const UserLang = getCookie('UserLang', { cookies });
    const accessToken = getCookie('accessToken', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const announcement = await GetAnnouncementData(params.id);
    const cities = await GetCities();
    const announcementTypes = await GetAnnouncementTypes();
    const businessFields = await GetBusinessFields();
    const adPlacements = await GetAdPlacements();

    return (
        <div className="2xl:w-2/3 xl:w-10/12 md:w-11/12 m-auto mb-[10vh] items-start dark:bg-black dark:text-white grid xl:grid-cols-[65%_1fr] md:grid-cols-[85%_1fr]">
            <EditAnnouncement
                UserLang={UserLang}
                accessToken={accessToken}
                locale={locale}
                announcementTypes={announcementTypes}
                announcement={announcement}
                cities={cities}
                businessFields={businessFields}
                adPlacements={adPlacements}
            />
        </div>
    );
}
