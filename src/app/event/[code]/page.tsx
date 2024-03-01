import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import moment from 'moment';
import { cookies } from 'next/headers';
import Image from 'next/image';
// import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Event, WithContext } from 'schema-dts';

import EmptyPoster from '@/assets/empty-poster.svg';
import SoldOut from '@/assets/soldout.svg';
import KazticketButton from '@/components/KazticketButton';
import EventStatuses from '@/constants/EventStatuses.json';
import { CheckToken } from '@/functions/AxiosHandlers';

import type { Metadata, Viewport } from 'next';

async function GetEventData(code: string) {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

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

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'commercial/Events/' + code, {
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
            title: `${data.name} - Купить билеты на Kazticket.kz`,
            openGraph: {
                images: data.posterFileUrl,
                type: 'website',
                url: `${process.env.NEXT_PUBLIC_APP_URL}/event/${data.code}`,
            },
            description: data.description
                ?.replace(/<[^>]*>?/gm, ' ')
                ?.replace(/&nbsp;/gi, ' ')
                ?.replace(/\s+/g, ' '),
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
                    {locale.Errors.PageNotFound}
                </div>
                <button className="mt-5">
                    <div className="relative inline-block text-sm font-medium text-[#28aad1] group active:text-orange-500 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#28aad1] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                        <span className="relative block px-8 py-3 bg-[#28aad1] text-white border border-current">
                            <Link href="/">{locale.Errors.ToMain}</Link>
                        </span>
                    </div>
                </button>
            </main>
        );
    } else {
        // JSON-LD микроразметка для страницы мероприятия
        const jsonLdScript: WithContext<Event> = {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: `${data.name} - Kazticket.kz`,
            image: data.posterFileUrl ?? '',
            description: data.description
                ?.replace(/<[^>]*>?/gm, ' ')
                ?.replace(/&nbsp;/gi, ' ')
                ?.replace(/\s+/g, ' '),
            startDate: moment(data.startDate).utc().add(data.cityTimeZone, 'h').format(), // Дата и время начала мероприятия
            offers: {
                '@type': 'Offer',
                priceCurrency: 'KZT',
                price: data.minCost, // Минимальная цена
                availability: 'https://schema.org/InStock', // Наличие билетов (замените на соответствующий статус)
            },
            location: {
                '@type': 'Place',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: data.cityName, // Город
                },
            },
        };

        return (
            <div className="container mx-auto lg:py-2">
                <Script
                    id="json-ld-microdata"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdScript) }}
                />
                <Script src={`${process.env.NEXT_PUBLIC_WIDGET_URL}?time=${new Date().getMilliseconds()}`} />
                <div className="mt-2 lg:h-128 h-64 relative overflow-hidden rounded-xl lg:rounded-3xl lg:p-10 p-2 flex flex-col justify-center -mx-2 items-center content-center">
                    <div
                        className="bg-cover bg-center absolute w-full h-full rounded-xl lg:rounded-3xl top-0 left-0 -z-20"
                        style={{
                            filter: 'blur(15px)',
                            backgroundImage: `url("${data.posterFileUrl ?? EmptyPoster.src}")`,
                        }}
                    />
                    <Image
                        alt={data.name}
                        title={data.name}
                        height={432}
                        width={756}
                        src={data.posterFileUrl ?? EmptyPoster.src}
                        className="lg:h-full h-full w-fit rounded-xl object-contain"
                    />
                    {data.statusId === EventStatuses.SoldOut && (
                        <Image
                            alt={data.name}
                            title={data.name}
                            height={432}
                            width={756}
                            src={SoldOut}
                            className="lg:h-full h-full lg:w-fit rounded-xl z-10 absolute bg-[rgba(0,0,0,0.2)]"
                        />
                    )}
                </div>
                <h1 className="lg:text-6xl text-3xl text-black dark:text-white font-bold my-4">{data.name}</h1>
                {data.statusId !== EventStatuses.SoldOut && (
                    <KazticketButton locale={locale} eventCode={data.code} eventId={data.id} />
                )}
                <div className="my-6 w-full text-3xl text-black dark:text-white">{locale.EventPage.AboutDesc}</div>
                <div className="EventDescription my-6 w-full invert-0 dark:invert z-0">
                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
            </div>
        );
    }
}
