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
import EventsByCategory from '@/components/EventsPage/EventsByCategory';
import Title from '@/components/EventsPage/Title';
import LeisureCategories from '@/components/LeisureCategories';
import PageLayout from '@/components/PageLayout';
import Recommendations from '@/components/Recommendations';
// import Posters from '@/components/Posters';
import Tickers from '@/components/Tickers';
import categories from '@/constants/Categories';
import { isEmpty } from '@/functions';
import { CheckToken } from '@/functions/AxiosHandlers';
import { City } from '@/types/City';
import { EventInList } from '@/types/EventInList';
import { LeisureCategory } from '@/types/LeisureCategory';

async function GetEvents(startDate: string, period: string, categoryCode?: string) {
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

    const UserCityId = getCookie('UserCityId', { cookies });

    let url =
        NEXT_PUBLIC_EVENTS_URL +
        'commercial/Events' +
        `?Top=100&CityId=${UserCityId ? (parseInt(UserCityId) === 0 ? '' : UserCityId) : ''}`;

    if (categoryCode && !isEmpty(categoryCode) && categoryCode !== 'all') {
        url = url + `&LeisureCategoryCode=${categoryCode}`;
    }
    if (startDate && !isEmpty(startDate)) {
        url = url + `&BeginAt=${dayjs(startDate, 'YYYY-MM-DD').toISOString()}`;
    }
    if (startDate && !isEmpty(startDate) && !isEmpty(period)) {
        url = url + `&EndAt=${dayjs(startDate, 'YYYY-MM-DD').add(parseInt(period), 'd').endOf('D').toISOString()}`;
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
        const empty: EventInList[] = [];
        // This will activate the closest `error.js` Error Boundary
        return empty;
    }

    const data = await res.json();

    if (data.items) {
        const exclusiveEvents = ['alau-massskating', 'oasis-beach-club', 'pecha-kucha'];

        const sortedData: EventInList[] = data.items?.sort((eventA: any, eventB: any) => {
            const dateA = new Date(eventA?.beginDate) as any;
            const dateB = new Date(eventB?.beginDate) as any;
            return dateA - dateB;
        });

        let result = [
            ...sortedData?.filter((x: EventInList) => exclusiveEvents.includes(x.code)),
            ...sortedData?.filter((x: EventInList) => !exclusiveEvents.includes(x.code)),
        ];

        if (categoryCode === 'all') {
            result = result.filter((x: EventInList) => x.leisureCategoryCode !== 'museums');
        }

        return result;
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
        console.error('GetEventumEvents failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

async function GetPosters() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'posters/forCommerce';
    try {
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

        const data = await res.json();
        return data;
    } catch (error) {
        // Логирование ошибки
        console.error('GetPosters failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

async function GetRecs() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'recommendations/forCommerce';
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

        const data = await res.json();
        return data;
    } catch (error) {
        // Логирование ошибки
        console.error('GetRecs failed:', error);
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
        console.error('GetTickers failed:', error);
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

const SubscribeForm = dynamic(() => import('@/components/SubscribeForm'), {
    ssr: false,
    loading() {
        return (
            <div className="container mx-auto md:py-5 flex justify-between">
                <div className="w-screen -mx-4 md:mx-0 min-h-[270px] 3xl:min-h-[382px] 2xl:min-h-[306px] xl:min-h-[251px] lg:min-h-[187px] md:min-h-[187px] md:rounded-2xl md:w-full animate-pulse bg-gray-200"></div>
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
    const RecsData = await GetRecs();
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
    }) ?? { id: 0, name: locale.EventListPage.All, code: 'all' };
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
            <div className="mb-8">
                <EventsByCategory
                    GetEvents={GetEvents}
                    category={{
                        name: (
                            <div className="relative">
                                Предстоящие события
                                <svg
                                    width="13"
                                    height="13"
                                    className="absolute top-0 -right-3"
                                    viewBox="0 0 13 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.15909 0.709858C1.21301 1.31587 0.282671 3.68871 0.871615 6.52248C1.05939 7.41872 1.80198 7.44433 2.70673 6.881C3.66269 6.27493 4.78935 5.00317 5.61729 3.3729C6.50499 1.60607 5.11372 0.0953048 3.15909 0.709858ZM4.07237 1.49511C5.0369 2.06698 4.78935 3.04857 3.17618 4.93488L2.23728 6.03598L2.21169 5.20804C2.13487 2.58764 2.99693 0.854954 4.07237 1.49511ZM8.6986 2.29745C7.37562 2.91199 5.35274 5.54088 5.35274 6.65052C5.35274 7.37604 5.87338 7.35043 8.43397 6.49687C10.4569 5.82258 11.4299 5.43845 11.8652 4.90073C13.3077 3.13391 10.8666 1.29026 8.6986 2.29745ZM10.6959 3.09978C11.1483 3.79114 10.0386 5.21658 8.71567 5.65185C7.63164 6.01038 6.88905 6.20664 6.96588 6.09574C7.00856 6.04452 7.27318 5.69454 7.55481 5.31901C8.88632 3.55215 10.3289 2.53644 10.6959 3.09978ZM5.6429 8.39171C3.77364 8.71609 3.09935 9.99638 5.34413 10.7646C5.7368 10.9012 6.58182 11.2938 7.22197 11.6352C9.09119 12.6509 10.0216 12.6679 10.8068 11.712C11.4128 10.978 11.2592 9.80005 10.6788 8.92949C9.25338 6.7871 6.65011 8.21252 5.6429 8.39171ZM9.96182 9.27087C10.4484 9.51842 10.4313 10.0817 9.91914 10.6536C9.22777 11.4218 8.64738 11.3791 7.00002 10.4317L5.80509 9.7489C5.99282 9.71476 6.66718 9.60378 7.79382 9.33916C8.82664 9.08307 9.55215 9.066 9.96182 9.27087Z"
                                        fill="#E2B33D"
                                    />
                                </svg>
                            </div>
                        ),
                        code: 'all',
                    }}
                    period={period}
                    startDate={startDate}
                    UserCityId={UserCityId}
                    UserLang={UserLang}
                />
            </div>
            <Recommendations UserLang={UserLang} recs={RecsData} />
            <div className="flex flex-col gap-16">
                {categories().map((category: any) => (
                    <EventsByCategory
                        key={category.code}
                        GetEvents={GetEvents}
                        category={category}
                        period={period}
                        startDate={startDate}
                        UserCityId={UserCityId}
                        UserLang={UserLang}
                    />
                ))}
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-3 container mx-auto content-center justify-items-center">
                {/* {EventsData?.map((x: EventInList) => {
                    return <EventCard UserLang={UserLang} key={x.id} data={x} UserCityId={UserCityId} />;
                })} */}
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
