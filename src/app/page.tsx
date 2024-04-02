'use server';

import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { getDictionary } from 'dictionaries';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import EmptyPoster from '@/assets/empty-poster.svg';
import EventDateInfo from '@/components/EventDateInfo';
import EventCard from '@/components/EventsPage/EventCard';
import Title from '@/components/EventsPage/Title';
import LeisureCategories from '@/components/LeisureCategories';
import PageLayout from '@/components/PageLayout';
// import Posters from '@/components/Posters';
import SubscribeForm from '@/components/SubscribeForm';
import Tickers from '@/components/Tickers';
import { isEmpty } from '@/functions';
import { CheckToken } from '@/functions/AxiosHandlers';
import { City } from '@/types/City';
import { EventInList } from '@/types/EventInList';
import { LeisureCategory } from '@/types/LeisureCategory';

async function GetEvents(startDate: string, period: string) {
    console.log('period: ', period);
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
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const UserCityId = getCookie('UserCityId', { cookies });
    const UserCategoryId = getCookie('UserCategoryId', { cookies });

    let url =
        NEXT_PUBLIC_EVENTS_URL +
        'commercial/Events' +
        `?Top=100&CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
        `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;

    if (startDate && !isEmpty(startDate)) {
        url = url + `&BeginAt=${dayjs(startDate, 'YYYY-MM-DD').format()}`;
    }

    const res = await fetch(url, {
        next: {
            revalidate: 120,
        },
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
        const exclusiveEvents = ['alau-massskating', 'the-concert-my-angel', 'astana-irina-krug', 'pecha-kucha'];

        const sortedData = data.items?.sort((eventA: any, eventB: any) => {
            const dateA = new Date(eventA?.beginDate) as any;
            const dateB = new Date(eventB?.beginDate) as any;
            return dateA - dateB;
        });

        return [
            ...sortedData?.filter((x: EventInList) => exclusiveEvents.includes(x.code)),
            ...sortedData?.filter((x: EventInList) => x.code === 'glavnaya-rol'),
            ...sortedData?.filter((x: EventInList) => !exclusiveEvents.includes(x.code)),
        ];
    }
}

async function GetEventumEvents() {
    const UserCityId = getCookie('UserCityId', { cookies });
    const UserCategoryId = getCookie('UserCategoryId', { cookies });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url =
        process.env.NEXT_PUBLIC_SERVICES_TEMP_URL +
        'eventum/forCommerce' +
        `?CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
        `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;

    try {
        const res = await fetch(url, {
            next: {
                revalidate: 300,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            // Вместо вывода в консоль, обработка ошибки
            console.error('Fetch response was not ok:', res);
            // Возврат пустого массива или объекта ошибки
            return [];
        }

        return await res.json();
    } catch (error) {
        // Логирование ошибки
        console.error('Fetch failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

async function GetPosters() {
    // const UserCityId = getCookie('UserCityId', { cookies });
    // const UserCategoryId = getCookie('UserCategoryId', { cookies });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'posters/forCommerce';
    // `?CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}` +
    // `&LeisureCategoryId=${UserCategoryId ? (parseInt(UserCategoryId) === 0 ? '' : UserCategoryId) : ''}`;
    try {
        const res = await fetch(url, {
            next: {
                revalidate: 300,
            },
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
    } catch (error) {
        // Логирование ошибки
        console.error('Fetch failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

async function GetTickers() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'tickers/forCommerce';

    try {
        const res = await fetch(url, {
            next: {
                revalidate: 300,
            },
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
    } catch (error) {
        // Логирование ошибки
        console.error('Fetch failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

async function GetLeisureCategories() {
    try {
        const UserLang = getCookie('UserLang', { cookies });
        // const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
        let acceptLanguage = 'ru-RU';
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kk':
                acceptLanguage = 'kz-KZ';
                break;
            case 'en':
                acceptLanguage = 'en-US';
                break;
        }

        const token = await CheckToken();
        const res = await fetch(process.env.NEXT_PUBLIC_MANAGEMENT_URL + 'commercial/leisureCategories', {
            next: {
                revalidate: 300,
            },
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

        return leisureCategories;
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
            case 'kk':
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

const Posters = dynamic(() => import('@/components/Posters'), {
    ssr: false,
    loading() {
        return (
            <div className="container mx-auto md:py-5 flex justify-between">
                <div className="w-screen -mx-4 md:mx-0 min-h-[270px] 3xl:min-h-[382px] 2xl:min-h-[306px] xl:min-h-[251px] lg:min-h-[187px] md:min-h-[187px] md:rounded-2xl md:w-full animate-pulse bg-gray-200"></div>
            </div>
        );
    },
});

const HorizontalCalendar = dynamic(() => import('@/components/EventsPage/HorizontalCalendar'), {
    ssr: false,
    loading() {
        return (
            <div className="container mx-auto py-5 flex justify-between">
                {[...Array(20)].map((_, index) => (
                    <div key={index} className="min-h-[56px] rounded-2xl min-w-[48px] animate-pulse bg-gray-200"></div>
                ))}
            </div>
        );
    },
});

type Props = {
    params: { code: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
    const startDate =
        typeof searchParams.startDate === 'string' ? searchParams.startDate : searchParams.startDate?.[0] || '';
    const period = typeof searchParams.period === 'string' ? searchParams.period : searchParams.period?.[0] || '';
    const EventsData = await GetEvents(startDate, period);
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
    const selectedCity = cities.find((x: City) => {
        if (UserCityId) {
            return x.id === parseInt(UserCityId);
        } else {
            return x.id === 0;
        }
    }) ?? { id: 0, name: locale.Header.AllCities };

    return (
        <PageLayout>
            <LeisureCategories leisureCategories={leisureCategories} selectedCategory={selectedCategory} />
            <Posters UserLang={UserLang ?? 'Ru'} posters={PostersData} />
            <Title title="Афиша" cities={cities} selectedCity={selectedCity} locale={locale} />
            <HorizontalCalendar startDate={startDate} period={period} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-5 gap-3 container mx-auto content-center justify-items-center">
                {EventsData?.map((x: EventInList) => {
                    return <EventCard UserLang={UserLang} key={x.id} data={x} UserCityId={UserCityId} />;
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
                                    <div className="cursor-pointer w-full h-auto md:hover:shadow-xl md:hover:scale-105 transition duration-300 rounded-xl">
                                        <div className="w-full relative rounded-xl -z-10">
                                            {isEmpty(x.Poster) ? (
                                                <>
                                                    <Image
                                                        src={EmptyPoster}
                                                        alt={x.name}
                                                        className="w-full h-64 object-cover -z-10 rounded-xl"
                                                        width="100"
                                                        height="100"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        className="flex flex-col items-center w-full h-full rounded-xl -z-10 relative bg-cover bg-no-repeat bg-center"
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
                                                            className="h-64 object-contain rounded-xl"
                                                            src={x.Poster}
                                                        />
                                                    </div>
                                                    <Image
                                                        alt={x.NameRu}
                                                        height={256}
                                                        width={400}
                                                        className="p-1 absolute -z-10 top-0 w-full h-64 object-contain rounded-xl"
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
                                                : UserLang?.toLocaleLowerCase() === 'kk'
                                                  ? x.NameKz
                                                  : x.NameRu}
                                        </span>
                                        <p className="text-coolGray-500 font-medium px-2 dark:text-white">
                                            <EventDateInfo UserLang={UserLang} cityTimeZone={6} date={x.Date} />
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
            <div className="my-20">
                <SubscribeForm />
            </div>
            <Tickers adsIsClosed={AdsIsClosed} tickers={TickersData} />
        </PageLayout>
    );
}
