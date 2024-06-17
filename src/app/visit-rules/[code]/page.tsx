import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

import { CheckToken } from '@/functions/AxiosHandlers';

type Props = {
    params: { code: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

async function GetVisitRule(code: string) {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const token = await CheckToken();

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

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'commercial/EventVisitRules/code/' + code, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log('GetEventData Error: ', res);
        return null;
    }

    return res.json();
}

export default async function VisitRulesPage({ params }: Props) {
    const data = await GetVisitRule(params.code);

    return (
        <div className="VisitRule container mx-auto mb-5 p-2">
            <div className="shadow-header-mobile bg-white dark:bg-[#0B1215] rounded-md p-4">
                <span className="text-2xl">{data.name}</span>
                <div className="EventDescription my-6 w-full invert-0 dark:invert z-0">
                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
            </div>
        </div>
    );
}
