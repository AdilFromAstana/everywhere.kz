'use server';

import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Image from 'next/image';

import EmptyPoster from '@/assets/empty-poster.svg';
import PageLayout from '@/components/PageLayout';
import { isEmpty } from '@/functions';
import { EventInList } from '@/types/EventInList';

import 'moment/locale/ru';
import 'moment/locale/kk';

import { getDictionary } from 'dictionaries';
import Link from 'next/link';

import EventDateInfo from '@/components/EventDateInfo';
import LeisureCategories from '@/components/LeisureCategories';
import Posters from '@/components/Posters';
import Tickers from '@/components/Tickers';
import { CheckToken } from '@/functions/AxiosHandlers';
import { City } from '@/types/City';
import { LeisureCategory } from '@/types/LeisureCategory';

export default async function Home() {
    const EventsData = await GetEvents();
    const PostersData = await GetPosters();
    const TickersData = await GetTickers();
    const EventumEventsData = await GetEventumEvents();
    const leisureCategories = await GetLeisureCategories();
    const UserCityId = getCookie('UserCityId', { cookies });
    const AdsIsClosed = getCookie('AdsIsClosed', { cookies });
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const UserCategoryId = getCookie('UserCategoryId', { cookies });
    const selectedCategory = leisureCategories.find((x: LeisureCategory) => {
        if (UserCategoryId) {
            return x.id === parseInt(UserCategoryId);
        } else {
            return x.id === 0;
        }
    }) ?? { id: 0, name: locale.EventListPage.All };
    const cities = await GetCities();

    return (
        <PageLayout>
            <LeisureCategories leisureCategories={leisureCategories} selectedCategory={selectedCategory} />
            <Posters UserLang={UserLang ?? 'Ru'} posters={PostersData} />
            <div className="flex flex-wrap -mx-4">
                {EventsData?.map((x: EventInList) => {
                    return (
                        <div key={x.id} className="w-full md:w-1/2 lg:w-1/3 p-2 transition duration-200 relative">
                            <Link href={'/event/' + x.code}>
                                <div className="cursor-pointer w-full h-auto md:hover:shadow-xl md:hover:scale-105 transition duration-300 rounded-md">
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
                                                    className="w-full h-full rounded-md -z-10 relative bg-cover bg-no-repeat bg-center"
                                                    style={{
                                                        backgroundImage: `url("${x.posterFileUrl ?? ''}")`,
                                                        filter: 'blur(2px)',
                                                        height: '100%',
                                                    }}
                                                >
                                                    <div className="h-64 object-contain rounded-md" />
                                                </div>
                                                <Image
                                                    alt={x.name}
                                                    height={256}
                                                    width={400}
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
                                        <EventDateInfo
                                            isKostyl={x?.name?.toLowerCase()?.includes('soundtrack') ? true : false}
                                            date={x.beginDate}
                                        />
                                        {isEmpty(UserCityId) || parseInt(UserCityId ?? '0') === 0 ? (
                                            <b> - {x.cityName}</b>
                                        ) : (
                                            ''
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
                {EventumEventsData?.sort((eventA: any, eventB: any) => {
                    const dateA = new Date(eventA?.Date) as any;
                    const dateB = new Date(eventB?.Date) as any;
                    return dateA - dateB;
                }).map((x: any) => {
                    if (x) {
                        const city = cities.find((y) => y.id === x?.CityId);
                        return (
                            <div key={x.Id} className="w-full md:w-1/2 lg:w-1/3 p-2 transition duration-200 ">
                                <Link href={'/e/' + x.Code}>
                                    <div className="cursor-pointer w-full h-auto md:hover:shadow-xl md:hover:scale-105 transition duration-300 rounded-md">
                                        <div className="w-full relative rounded-md -z-10">
                                            {isEmpty(x.Poster) ? (
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
                                                        className="flex flex-col items-center w-full h-full rounded-md -z-10 relative bg-cover bg-no-repeat bg-center"
                                                        style={{
                                                            backgroundImage: `url("${x.Poster ?? ''}")`,
                                                            filter: 'blur(2px)',
                                                            height: '100%',
                                                        }}
                                                    >
                                                        <Image
                                                            alt={x.NameRu}
                                                            height={256}
                                                            width={400}
                                                            className="h-64 object-contain rounded-md"
                                                            src={x.Poster}
                                                        />
                                                    </div>
                                                    <Image
                                                        alt={x.NameRu}
                                                        height={256}
                                                        width={400}
                                                        className="p-1 absolute -z-10 top-0 w-full h-64 object-contain rounded-md"
                                                        src={x.Poster}
                                                    />
                                                </>
                                            )}
                                            <div className="bg-white px-2 font-medium absolute left-3 bottom-3 rounded-md text-black dark:bg-black dark:text-white">
                                                от {x.MinCost} тг.
                                            </div>
                                            <div className="bg-white px-2 font-medium absolute right-3 bottom-3 rounded-md text-black dark:bg-black dark:text-white">
                                                {x.AgeLimit}+
                                            </div>
                                        </div>
                                        <span className="mb-4 md:text-2xl px-2 leading-tight font-bold text-black dark:text-white">
                                            {UserLang?.toLocaleLowerCase() === 'en'
                                                ? x.NameEn
                                                : UserLang?.toLocaleLowerCase() === 'kz'
                                                  ? x.NameKz
                                                  : x.NameRu}
                                        </span>
                                        <p className="text-coolGray-500 font-medium px-2 dark:text-white">
                                            <EventDateInfo date={x.Date} />
                                            {isEmpty(UserCityId) || parseInt(UserCityId ?? '0') === 0 ? (
                                                <b> - {city?.name}</b>
                                            ) : (
                                                ''
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        );
                    }
                })}
                {EventsData?.length === 0 && EventumEventsData.length === 0 && (
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
                                Система онлайн покупки билетов на концерты, выставки, кино, культурные и спортивные
                                мероприятия в Казахстане:
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
            <Tickers adsIsClosed={AdsIsClosed} tickers={TickersData} />
        </PageLayout>
    );
}

async function GetEvents() {
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
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const UserCityId = getCookie('UserCityId', { cookies });
    const UserCategoryId = getCookie('UserCategoryId', { cookies });

    const url =
        NEXT_PUBLIC_EVENTS_URL +
        'commercial/Events' +
        `?Top=100&CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
        `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;

    const res = await fetch(url, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.log('Error in GetEvents: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    const data = await res.json();

    if (data.items) {
        const exclusiveEvents = ['alau-massskating', 'the-concert-my-angel', 'retroconcert', 'pecha-kucha'];

        const sortedData = data.items?.sort((eventA: any, eventB: any) => {
            const dateA = new Date(eventA?.beginDate) as any;
            const dateB = new Date(eventB?.beginDate) as any;
            return dateA - dateB;
        });

        return [
            ...sortedData?.filter((x: EventInList) => exclusiveEvents.includes(x.code)),
            ...sortedData?.filter((x: EventInList) => !exclusiveEvents.includes(x.code)),
        ];
    }
}

async function GetEventumEvents() {
    const UserCityId = getCookie('UserCityId', { cookies });
    const UserCategoryId = getCookie('UserCategoryId', { cookies });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url =
        process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL +
        'eventum/forCommerce' +
        `?CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
        `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    return res.json();
}

async function GetPosters() {
    // const UserCityId = getCookie('UserCityId', { cookies });
    // const UserCategoryId = getCookie('UserCategoryId', { cookies });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL + 'posters/forCommerce';
    // `?CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
    // `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    return res.json();
}

async function GetTickers() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL + 'tickers/forCommerce';

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    return res.json();
}

async function GetLeisureCategories() {
    try {
        const UserLang = getCookie('UserLang', { cookies });
        const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
        let acceptLanguage = 'ru-RU';
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kz':
                acceptLanguage = 'kz-KZ';
                break;
            case 'en':
                acceptLanguage = 'en-US';
                break;
        }

        const token = await CheckToken();
        const res = await fetch(process.env.NEXT_PUBLIC_MANAGEMENT_URL + 'commercial/leisureCategories', {
            headers: {
                'Accept-Language': acceptLanguage,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const leisureCategories: LeisureCategory[] = await res.json();
        const defaultCategory: LeisureCategory = { id: 0, name: locale.EventListPage.All };

        return [defaultCategory, ...leisureCategories];
    } catch (error) {
        const leisureCategories: LeisureCategory[] = [];
        return leisureCategories;
    }
}

async function GetCities() {
    try {
        const UserLang = getCookie('UserLang', { cookies });
        const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
        let acceptLanguage = 'ru-RU';
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kz':
                acceptLanguage = 'kz-KZ';
                break;
            case 'en':
                acceptLanguage = 'en-US';
                break;
        }

        const token = await CheckToken();
        const res = await fetch(process.env.NEXT_PUBLIC_MANAGEMENT_URL + 'commercial/cities', {
            headers: {
                'Accept-Language': acceptLanguage,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const allCities: City = { id: 0, name: locale.Header.AllCities };
        const cities: City[] = await res.json();

        return [allCities, ...cities];
    } catch (error) {
        console.error('Error fetching cities - method "GetCities":', error);
        const cities: City[] = [];
        return cities;
    }
}
