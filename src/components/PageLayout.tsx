import { ChatBubbleLeftRightIcon, DocumentTextIcon, UsersIcon } from '@heroicons/react/24/outline';
import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

import { LookingForValues } from '@/types/LookingForValues';
import Footer from './Footer';
import Header from './Header/Header';

async function GetCities() {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;
    try {
        const res = await fetch(NEXT_PUBLIC_EVENTS_URL + '/cities', {
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const cities: any[] = await res.json();

        return cities;
    } catch (error) {
        console.error('Error fetching cities - method "GetCities":', error);
        const cities: any[] = [];
        return cities;
    }
}
const langs = [
    {
        key: 'Kk',
        text: 'Қазақша',
        value: 'Kk',
    },
    {
        key: 'Ru',
        text: 'Русский',
        value: 'Ru',
    },
    {
        key: 'En',
        text: 'English',
        value: 'En',
    },
];
interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = async ({ children }) => {
    const UserLang = getCookie('UserLang', { cookies });
    const UserCity = getCookie('UserCity', { cookies });
    const token = getCookie('accessToken', { cookies });
    const LookingFor: LookingForValues = getCookie('LookingFor', { cookies }) || 'advertiser';

    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const cities = await GetCities();
    const selectedLang = langs.find((x: any) => x.key === UserLang) ?? langs[0];
    const selectedCity = cities.find((x: any) => {
        if (UserCity) {
            return x.code === UserCity;
        }
    });

    const pages = [
        {
            label: locale.Footer.Contract,
            url: '/offer_contract',
            icon: <DocumentTextIcon className="h-5 w-5" />,
        },
        {
            label: locale.Footer.PaymentSecurity,
            url: '/payment_security',
            icon: <DocumentTextIcon className="h-5 w-5" />,
        },
        {
            label: locale.Footer.PrivacyPolicy,
            url: '/security_policy',
            icon: <DocumentTextIcon className="h-5 w-5" />,
        },
        {
            label: locale.Footer.Contacts,
            url: '/contacts',
            icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
        },
        {
            label: 'Организаторам',
            url: '/offer',
            icon: <UsersIcon className="h-5 w-5" />,
        },
        // {
        //     label: locale.Footer.AboutUs,
        //     url: '/about_us',
        //     icon: <UserGroupIcon className="h-5 w-5" />,
        // },
    ];

    return (
        <>
            <Header
                token={token}
                langs={langs}
                locale={locale}
                pages={pages}
                cities={cities}
                selectedCity={selectedCity}
                selectedLang={selectedLang}
                lookingFor={LookingFor}
            />
            {children}
            <Footer locale={locale} pages={pages} />
        </>
    );
};

export default PageLayout;
