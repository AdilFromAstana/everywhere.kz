import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Script from 'next/script';

import { CheckToken } from '@/functions/AxiosHandlers';

import type { Metadata, Viewport } from 'next';

async function GetEventData(code: string) {
    const { EVENTS_URL = '' } = process.env;

    const token = await CheckToken();

    const UserLang = getCookie('UserLang', { cookies });
    let acceptLanguage = 'ru-RU';
    switch (UserLang?.toLocaleLowerCase()) {
        case 'kz':
            acceptLanguage = 'kz-KZ';
            break;
        case 'en':
            acceptLanguage = 'en-US';
            break;
    }

    const res = await fetch(EVENTS_URL + 'commercial/Events/' + code, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log('res: ', res);
        return null;
    }

    return res.json();
}

type Props = {
    params: { code: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const code = params.code;
    const data = await GetEventData(code);
    if (!data) {
        return {
            title: `Kazticket.kz`,
        };
    } else {
        return {
            title: `${data.name} - Kazticket.kz`,
            openGraph: {
                images: data.posterFileUrl,
            },
        };
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    userScalable: false,
};

export default async function EventPage({ params }: Props) {
    const data = await GetEventData(params.code);
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    if (!data) {
        return (
            <main className="h-96 w-full flex flex-col justify-center items-center">
                <h1 className="text-9xl font-extrabold dark:text-white text-black tracking-widest">404</h1>
                <div className="bg-[#28aad1] text-white px-2 text-sm rounded rotate-12 absolute">
                    Страница не найдена
                </div>
                <button className="mt-5">
                    <div className="relative inline-block text-sm font-medium text-[#28aad1] group active:text-orange-500 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#28aad1] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                        <span className="relative block px-8 py-3 bg-[#28aad1] text-white border border-current">
                            <Link href="/">На главную</Link>
                        </span>
                    </div>
                </button>
            </main>
        );
    } else {
        return (
            <>
                <div className="lg:h-128 h-64 relative rounded-xl lg:rounded-3xl lg:p-40 p-10 flex flex-col justify-between">
                    <span className="-z-10 lg:text-6xl text-3xl text-white font-bold">{data.name}</span>
                    <button
                        data-event-id={data.id}
                        data-event-code={data.code}
                        className="kazticket-widget-button z-0 cursor-pointer bg-sky-500 lg:w-48 w-full px-2 py-2 lg:px-6 lg:py-4 rounded-xl text-base lg:text-xl font-bold text-white transition duration-500 hover:shadow-2xl"
                    >
                        {locale.EventPage.BuyTicket}
                    </button>
                    <div
                        className="bg-cover bg-center absolute w-full h-full rounded-xl lg:rounded-3xl top-0 left-0 -z-20"
                        style={{
                            backgroundImage: `linear-gradient(rgba(22, 29, 94, 0.6) 10.02%, rgba(0, 0, 0, 0.6) 77.2%, rgba(7, 11, 48, 0.6) 98.34%), url("${data.posterFileUrl}")`,
                        }}
                    />
                </div>
                <div className="my-6 w-full text-3xl text-black dark:text-white">{locale.EventPage.AboutDesc}</div>
                <div className="EventDescription my-6 w-full invert-0 dark:invert z-0">
                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
                <Script src="http://localhost:3005/build/iframe.js" />
            </>
        );
    }
}
