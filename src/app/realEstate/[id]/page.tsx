import { UUID } from 'crypto';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getDictionary } from 'dictionaries';
import moment from 'moment';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Service, WithContext } from 'schema-dts';

import DescriptionComponent from '@/components/DescriptionConponent';
import { ViewContactPhoneButton } from '@/components/EventsPage/ViewContactPhoneButton';
import { formatPrice } from '@/functions';
import { ImageModal } from './ImageModal';
import RentalCard from './RentalCard';
import { ReportModal } from './ReportModal';
import { UpdateRealEstateViewCount } from './UpdateAnnouncementVisitCount';

import type { Metadata, Viewport } from 'next';

dayjs.extend(utc);

async function GetRealEstateData(id: UUID) {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'realEstates/' + id, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.log('GetEventData Error: ', res);
        return null;
    }

    const data = res.json();
    return data;
}

async function GetReportTypes(): Promise<any[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'reportTypes/', {
        headers: {
            // 'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.log('GetReportTypes Error: ', res);
        return [];
    }

    return await res.json();
}

async function GetBusyDates(id: UUID): Promise<any[]> {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + '/sessions/getBusyDates/' + id, {
        headers: {
            // 'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        console.log('GetReportTypes Error: ', res);
        return [];
    }

    return await res.json();
}

type Props = {
    params: { id: UUID };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.id;
    const data = await GetRealEstateData(id);
    if (!data) {
        return {
            title: `Kazticket.kz`,
        };
    } else {
        return {
            openGraph: {
                images: data.posterFileUrl,
                type: 'website',
                url: `${process.env.NEXT_PUBLIC_APP_URL}realEstates/${data.id}`,
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
    const UserLang = getCookie('UserLang', { cookies });
    const token = getCookie('accessToken', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const data = await GetRealEstateData(params.id);
    const reportTypes = await GetReportTypes();
    const busyDates = await GetBusyDates(params.id);
    console.log('data: ', data);

    if (!data) {
        return (
            <main className="h-96 w-full flex flex-col justify-center items-center">
                <h1 className="text-9xl font-extrabold dark:text-white text-black tracking-widest">404</h1>
                <div className="bg-[#28aad1] text-white px-2 text-sm rounded rotate-12 absolute">Ошибка</div>
                <button className="mt-5">
                    <div className="relative inline-block text-sm font-medium text-[#28aad1] group active:text-orange-500 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#28aad1] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                        <span className="relative block px-8 py-3 bg-[#28aad1] text-white border border-current">
                            <Link href="/">Ошибка</Link>
                        </span>
                    </div>
                </button>
            </main>
        );
    } else {
        const jsonLdScript = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            // name: data.title, // Название услуги
            description: data.description
                ?.replace(/<[^>]*>?/gm, ' ')
                ?.replace(/&nbsp;/gi, ' ')
                ?.replace(/\s+/g, ' '), // Описание услуги без HTML-тегов
            provider: {
                '@type': 'Organization',
                // name: data.User.name, // Имя поставщика услуги или компании
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: data.contactPhone, // Телефон для связи
                    contactType: 'Customer Service',
                    availableLanguage: ['Русский', 'English'], // Языки обслуживания
                },
            },
            areaServed: {
                '@type': 'Place',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: data.City.nameRu, // Город, где предоставляется услуга
                    addressCountry: 'KZ', // Страна
                },
            },
            serviceType: data.category, // Тип услуги, например "Маркетинг"
            offers: {
                '@type': 'Offer',
                priceCurrency: 'KZT', // Валюта
                price: data.price, // Цена за услугу
                availability: 'https://schema.org/InStock', // Доступность услуги
            },
            image: data.imageUrl, // URL изображения, если есть
        };

        const getDataByLanguage = () => {
            if (UserLang === 'Kk') {
                return 'nameKz';
            } else if (UserLang === 'En') {
                return 'nameEn';
            } else {
                return 'nameRu';
            }
        };

        return (
            <div className="px-2">
                <Script
                    id="json-ld-microdata"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdScript) }}
                />
                <UpdateRealEstateViewCount id={params.id} />
                <div className="w-full h-full transition duration-200 flex justify-center mb-20">
                    <div className="grid dark:text-white lg:grid-cols-[70%_1fr] md:gap-10 2xl:w-2/3 xl:w-10/12 md:w-11/12">
                        <div className="w-full h-full flex flex-col gap-2">
                            <h1 className="md:text-3xl text-xl dark:border-white dark:text-white">{data.title}</h1>
                            <div className="flex flex-col md:gap-4">
                                {data?.RealEstateImages?.length > 0 && (
                                    <div className="flex flex-col gap-2 dark:text-white text-black pt-4 border-t-2 dark:border-white border-black">
                                        <ImageModal images={data?.RealEstateImages} />
                                    </div>
                                )}
                                <div className="flex lg:hidden w-full h-full text-white flex-col gap-2 dark:text-white text-black border-y-2 py-4 my-4 md:my-0">
                                    <RentalCard token={token} realEstate={data} busyDates={busyDates} />
                                </div>
                                <div>
                                    <div className="font-bold">{locale.EventPage.EventInfo.Description}: </div>
                                    <DescriptionComponent description={data.description} />
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-gray-400">
                                        {locale.Common.Created}: {moment(data.createdAt).format('DD.MM.YYYY')}
                                    </div>
                                    <ReportModal locale={locale} reportTypes={reportTypes} realEstateId={params.id} />
                                </div>
                            </div>
                        </div>
                        <RentalCard realEstate={data} token={token} busyDates={busyDates} />
                    </div>
                </div>
            </div>
        );
    }
}
