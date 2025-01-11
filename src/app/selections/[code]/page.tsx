'use server';

import { getCookie } from 'cookies-next';
// import { getDictionary } from 'dictionaries';
// import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';

import EventCard from '@/components/EventsPage/EventCard';
import SubscribeForm from '@/components/SubscribeForm';
import Tickers from '@/components/Tickers';
import { isEmpty } from '@/functions';
import { CheckToken } from '@/functions/AxiosHandlers';
import { EventInList } from '@/types/EventInList';

import type { Metadata } from 'next';

async function GetSelectionData(selectionCode: string) {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    const UserLang = getCookie('UserLang', { cookies });
    let acceptLanguage = 'ru-RU';
    switch (UserLang?.toLocaleLowerCase()) {
        case 'kk':
            acceptLanguage = 'kz-KZ';
            break;
        case 'en':
            acceptLanguage = 'en-US';
            break;
        case 'ru':
        default:
            acceptLanguage = 'ru-RU';
            break;
    }
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const res = await fetch(NEXT_PUBLIC_EVENTS_URL + 'commercial/EventSelections', {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log('res: ', res);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    const data = await res.json();
    const TargetSelection = data?.eventSelections?.find((x: any) => x.code === selectionCode);

    if (isEmpty(TargetSelection)) {
        return {};
    }
    return TargetSelection;
}

async function GetEvents(selectionId: string) {
    const { NEXT_PUBLIC_EVENTS_URL = '' } = process.env;

    if (!isEmpty(selectionId)) {
        const UserLang = getCookie('UserLang', { cookies });
        const token = await CheckToken();
        let acceptLanguage = 'ru-RU';
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kk':
                acceptLanguage = 'kz-KZ';
                break;
            case 'en':
                acceptLanguage = 'en-US';
                break;
            case 'ru':
            default:
                acceptLanguage = 'ru-RU';
                break;
        }
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const res = await fetch(`${NEXT_PUBLIC_EVENTS_URL}/commercial/events?Top=100&SelectionId=${selectionId}`, {
            headers: {
                'Accept-Language': acceptLanguage,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.log('res: ', res);
            // This will activate the closest `error.js` Error Boundary
            return null;
        }

        const data = await res.json();

        return data?.items ?? [];
    }
    return [];
}

async function GetTickers() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'tickers/forCommerce';

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

        return res.json();
    } catch (error) {
        // Логирование ошибки
        console.error('GetTickers failed:', error);
        // Возврат пустого массива или объекта ошибки
        return [];
    }
}

type Props = {
    params: { code: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await GetSelectionData(params.code);
    if (isEmpty(data)) {
        return {
            title: `Подборка мероприятий - Kazticket.kz`,
        };
    }
    return {
        title: `${data?.nameRu} - Kazticket.kz`,
        description: `Купить билеты - ${data?.nameRu}`,
    };
}

export default async function EventSelectionPage({ params }: Props) {
    const TargetSelection = await GetSelectionData(params.code);
    const EventsData = await GetEvents(TargetSelection?.id);
    const UserLang = getCookie('UserLang', { cookies });
    const UserCity = getCookie('UserCity', { cookies });

    const GetSelectionName = () => {
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kk':
                return TargetSelection?.nameKz;
            case 'en':
                return TargetSelection?.nameEn;
            case 'ru':
            default:
                return TargetSelection?.nameRu;
        }
    };

    if (!isEmpty(EventsData)) {
        return (
            <>
                <div className="container mx-auto">
                    <div className="flex md:gap-4 gap-2 items-center md:mt-0 my-6 flex-wrap">
                        <svg
                            className={`md:w-16 md:h-16 ${GetSelectionName().length > 12 ? 'w-10 h-10' : 'w-12 h-12'}`}
                            width="71"
                            height="71"
                            viewBox="0 0 71 71"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28.0149 17.9284C28.0663 20.5523 31.1276 24.7711 33.2113 23.9737C34.1116 23.6135 34.1116 23.2277 33.134 20.4237C30.7931 13.761 27.9634 15.819 28.0149 17.9284ZM44.9931 23.8708C44.2728 25.903 46.7681 26.2632 48.4917 24.3853C50.241 22.4559 52.1189 19.5748 53.1221 17.6197C54.2283 15.7418 52.0674 14.79 50.2667 16.3335C48.1315 18.1342 45.4819 22.4559 44.9931 23.8708ZM9.54461 22.3016C7.94969 22.9447 13.3004 29.5816 15.4613 29.6331C17.9823 29.6845 18.188 29.1186 16.4388 26.7777C13.6862 23.0733 11.3711 21.5555 9.54461 22.3016ZM33.7258 31.8454C32.774 32.7972 31.642 34.1092 31.2047 34.7266C27.4489 40.3345 27.3974 40.386 25.6739 39.074C21.6866 36.09 15.1268 34.0577 16.413 39.2541C17.2105 42.3925 19.5772 48.1291 20.1946 50.0327C21.7895 55.049 22.6384 55.8722 25.4681 55.2034C32.491 53.5056 42.5236 53.4541 49.7008 55.0748C51.4758 55.4864 51.5787 55.2806 51.7588 51.7048C52.1189 44.4762 56.2862 37.4277 56.2862 35.1639C56.2862 32.6171 51.4758 34.5208 44.9417 39.64L44.2729 40.1545L43.321 39.5114C41.3659 38.1994 40.3884 39.2284 41.4945 41.415C42.3949 43.19 43.1409 43.7816 45.1217 42.8298C46.2536 42.2896 47.8229 41.2606 50.0352 39.6914C50.9098 39.074 51.6301 38.6367 51.6301 38.7139C51.6301 39.074 50.0609 45.8139 50.0609 45.8396L46.1507 45.5052C43.038 45.3766 42.6779 47.0229 45.8935 47.5117C46.2279 47.5632 49.5207 47.9748 49.5207 47.9748C49.5207 47.9748 49.3921 49.4153 49.0319 50.2385C48.6461 51.0617 48.0029 51.2675 46.9482 50.9074C38.6906 48.1806 25.2366 51.499 25.2109 51.499C24.7221 51.5762 20.2461 39.7686 20.6062 39.4084C20.6577 39.357 21.1978 39.6914 21.8152 40.1545C28.7866 45.2222 29.5069 45.0679 34.1116 37.6849L36.2725 34.2121L37.1214 35.4726C39.5909 39.1512 43.0895 37.5306 41.1344 34.8295C40.4656 33.9291 39.3595 32.5914 37.5845 30.5077C36.787 29.5559 35.6037 29.9675 33.7258 31.8454ZM67.1936 31.4595C66.2675 31.9997 61.4312 36.6302 60.8653 37.5048C59.6562 39.4342 62.1772 39.8715 64.4667 38.1222C67.1421 36.09 70.9236 32.5914 70.9236 32.1284C70.9494 31.2023 68.4541 30.7392 67.1936 31.4595ZM3.47357 43.7816C7.22937 44.7077 9.39019 44.9393 10.2391 44.4762C11.6282 43.7302 10.9851 43.19 7.69239 42.3668C7.38369 42.2896 4.34816 41.4407 2.26446 41.4407C0.772434 41.4407 -2.54599 42.2639 3.47357 43.7816Z"
                                fill="black"
                            />
                        </svg>
                        <h1
                            className={`md:text-4xl ${
                                GetSelectionName().length > 12 ? 'text-base' : 'text-2xl'
                            } font-bold`}
                        >
                            {GetSelectionName()}
                        </h1>
                    </div>
                    <div className="grid md:grid-cols-5 grid-cols-2 md:gap-5 gap-3 content-center justify-items-center">
                        {EventsData?.map((x: EventInList) => {
                            return (
                                <EventCard
                                    cardType="full"
                                    UserLang={UserLang}
                                    key={x.id}
                                    data={x}
                                    UserCity={UserCity}
                                />
                            );
                        })}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="max-w-4xl mx-auto my-24 px-10 py-4 bg-white rounded-lg shadow-xl">
                    <div className="flex flex-col items-center justify-center py-12">
                        <h2 className="text-3xl font-semibold mb-2 text-center">К сожалению подборка не найдена!</h2>
                        <Link href="/" target="_blank">
                            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                                На главную
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}
