'use server';

import { getCookie } from 'cookies-next';
import moment from 'moment';
import { cookies } from 'next/headers';
import Image from 'next/image';

import EmptyPoster from '@/assets/empty-poster.svg';
import PageLayout from '@/components/PageLayout';
import { isEmpty } from '@/functions';
import { EventInList } from '@/types/EventInList';

import 'moment/locale/ru';

import Link from 'next/link';

import { CheckToken } from '@/functions/AxiosHandlers';

export default async function Home() {
    const EventsData = await GetEvents();

    return (
        <PageLayout>
            <div className="flex flex-wrap -mx-4">
                {EventsData?.items
                    ?.sort((eventA: any, eventB: any) => {
                        const dateA = new Date(eventA?.beginDate) as any;
                        const dateB = new Date(eventB?.beginDate) as any;
                        return dateA - dateB;
                    })
                    .map((x: EventInList) => {
                        return (
                            <div key={x.code} className="w-full md:w-1/2 lg:w-1/3 p-2 transition duration-200 ">
                                <Link href={'/event/' + x.code}>
                                    <div className="cursor-pointer w-full h-auto hover:shadow-xl transition duration-300 rounded-md">
                                        <div className="w-full relative rounded-md -z-10">
                                            {isEmpty(x.posterFileUrl) ? (
                                                <>
                                                    <Image
                                                        src={EmptyPoster}
                                                        alt={x.name}
                                                        className="w-full h-64 object-cover -z-10 rounded-md"
                                                        width="100"
                                                        height="100"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        className="w-full h-full rounded-md"
                                                        style={{
                                                            backgroundImage: `url("${x.posterFileUrl ?? ''}")`,
                                                            filter: 'blur(2px)',
                                                            height: '100%',
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundSize: 'cover',
                                                            position: 'relative',
                                                            zIndex: '-10',
                                                        }}
                                                    >
                                                        <img
                                                            className="h-64 object-contain rounded-md"
                                                            src={x.posterFileUrl}
                                                        />
                                                    </div>
                                                    <img
                                                        className="p-1 absolute -z-10 top-0 w-full h-64 object-contain rounded-md"
                                                        src={x.posterFileUrl}
                                                    />
                                                </>
                                            )}
                                            <div className="bg-white px-2 font-medium absolute left-3 bottom-3 rounded-md text-black dark:bg-black dark:text-white">
                                                от {x.minCost} тг.
                                            </div>
                                            <div className="bg-white px-2 font-medium absolute right-3 bottom-3 rounded-md text-black dark:bg-black dark:text-white">
                                                {x.ageLimit}+
                                            </div>
                                        </div>
                                        <span className="mb-4 md:text-2xl px-2 leading-tight font-bold text-black dark:text-white">
                                            {x.name}
                                        </span>
                                        <p className="text-coolGray-500 font-medium px-2 dark:text-white">
                                            {moment(x.beginDate).locale('ru-RU').format('Do MMMM YYYY')}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                {EventsData?.items?.length === 0 && (
                    <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
                        <div className="flex flex-col items-center justify-center py-12">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/907/907717.png"
                                alt="Welcome Icon"
                                className="w-24 h-24 mb-4"
                            />
                            <h2 className="text-3xl font-semibold mb-2 text-center">
                                Добро пожаловать на Kazticket.kz!
                            </h2>
                            <p className="text-gray-600 text-center text-lg leading-relaxed">
                                Лучшая система онлайн покупки билетов на концерты, выставки, кино, культурные и
                                спортивные мероприятия в Казахстане:
                            </p>
                            <ul className="mt-4 text-gray-600 text-center text-base leading-relaxed">
                                <li className="mb-2">
                                    <span className="text-green-500">✔</span> Быстрая покупка билета.
                                </li>
                                <li className="mb-2">
                                    <span className="text-green-500">✔</span> Различные бизнес-кейсы.
                                </li>
                                <li className="mb-2">
                                    <span className="text-green-500">✔</span> Резиденты Astana Hub💻.
                                </li>
                            </ul>
                            <Link href="/contacts" target="_blank">
                                <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                                    Связатся с нами
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

async function GetEvents() {
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

    const UserCityId = getCookie('UserCityId', { cookies });
    const res = await fetch(EVENTS_URL + 'commercial/Events?CityId=' + (UserCityId ?? 1), {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return { items: [] };
    }

    return res.json();
}
