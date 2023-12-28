import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import groupArray from 'group-array';
import dynamic from 'next/dynamic';
// import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';

import OrderDateTimeProperty from '@/components/OrderDateTimeProperty';
import { isEmpty } from '@/functions';

import type { Metadata, Viewport } from 'next';

const QRcode = dynamic(() => import('@/components/QRcode'), {
    ssr: false,
    loading: () => (
        <div className="relative items-center h-64 block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">
                Loading QR Code
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Please wait...</p>
            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ),
});

async function GetOrderData(orderNumber: string) {
    const { ORDERS_API_URL = '' } = process.env;

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

    const res = await fetch(ORDERS_API_URL + orderNumber, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        return null;
    }

    const data = await res.json();

    const groupedServices = groupArray(!isEmpty(data.serviceGroups) ? data.serviceGroups : [], 'serviceGroupName');

    return { ...data, groupedServices };
}

type Props = {
    params: { number: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const orderNumber = params.number;
    const data = await GetOrderData(orderNumber);
    return {
        title: `Билеты ${data.eventName} - Kazticket.kz`,
        openGraph: {
            images: data.posterFileUrl,
        },
    };
}

export const viewport: Viewport = {
    width: 'device-width',
    userScalable: false,
};

export default async function OrderPage({ params }: Props) {
    const data = await GetOrderData(params.number);
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    const Property = ({ name, value }: { name: string; value: any }) => {
        if (Array.isArray(value)) {
            return (
                <div className="flex flex-row justify-between gap-2 w-full">
                    <div className="text-[#00000080] dark:text-white lg:text-2xl text-base">{name}</div>
                    <div className="lg:text-2xl text-base flex flex-col jus dark:text-white">
                        {value.map((x: any) => (
                            <div key={x}>{x}</div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-row justify-between gap-2 w-full">
                    <div className="text-[#00000080] dark:text-white lg:text-2xl text-base">{name}</div>
                    <div className="lg:text-2xl text-base text-right dark:text-white">{value}</div>
                </div>
            );
        }
    };

    const ForEachGroupedServices = (groupedServices: any) => {
        const result: any = [];

        for (const key in groupedServices) {
            if (Object.hasOwnProperty.call(groupedServices, key)) {
                const element = groupedServices[key];

                const checkTribuneSeats = () => {
                    for (let i = 0; i < element.length; i++) {
                        if (element[i].tribuneSeats !== null) {
                            return true;
                        }
                    }
                    return false;
                };
                if (checkTribuneSeats()) {
                    const services: any = {
                        sessionServiceGroupId: element[0].sessionServiceGroupId,
                        serviceGroupName: element[0].serviceGroupName,
                        serviceCount: 0,
                        serviceList: [],
                    };

                    for (const service of element) {
                        services.serviceCount += service.serviceCount;
                        service.tribuneSeats.forEach((t: any) => {
                            services.serviceList.push({
                                ...t,
                                sessionServiceTitle: service.sessionServiceTitle,
                            });
                        });
                    }
                    result.push({
                        name: services.serviceGroupName,
                        value: `${services.serviceCount} шт.`,
                    });

                    services.serviceList.forEach((el: any) => {
                        result.push({
                            name: el.sessionServiceTitle,
                            value: `Ряд ${el.trubuneSeatRowNumber} Место ${el.trubuneSeatNumber}`,
                        });
                    });
                } else {
                    const services: any = [];
                    element.forEach((el: any) => {
                        services.push(`${el.sessionServiceTitle} - ${el.serviceCount}`);
                    });

                    result.push({
                        name: key,
                        value: services,
                    });
                }
            }
        }

        return result;
    };

    if (!isEmpty(data)) {
        return (
            <div className="flex flex-col h-min gap-2">
                <div className="text-4xl text-center">{locale.OrderPage.Tickets}</div>
                <div className="lg:max-w-4xl max-w-full mx-auto mb-4 lg:px-10 px-4 py-4 bg-white dark:bg-[#ffffff0d] rounded-lg shadow-2xl">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-full">
                            <QRcode orderNumber={data.orderNumber} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex flex-row gap-2">
                                <div className="font-medium text-[#00000080] dark:text-white">
                                    {locale.OrderPage.OrderNumber}
                                </div>
                                <div className="font-medium dark:text-white">{data.orderNumber}</div>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="font-medium text-[#00000080] dark:text-white">
                                    {locale.OrderPage.TotalCost}
                                </div>
                                <div className="font-medium dark:text-white">{data.finalCost} ₸</div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <Property name={locale.OrderPage.Event} value={data.eventName} />
                            <OrderDateTimeProperty
                                fieldName={locale.OrderPage.StartOfSession}
                                date={data.sessionBeginDateTime}
                            />
                            <OrderDateTimeProperty
                                fieldName={locale.OrderPage.EndOfSession}
                                date={data.sessionEndDateTime}
                            />
                            <Property
                                name={locale.OrderPage.Address}
                                value={data.homeNumber ? `${data.address}, ${data.homeNumber}` : `${data.address}`}
                            />
                            {data.haveMoreThanOneSector && (
                                <>
                                    <Property name={locale.OrderPage.Location} value={data.locationTitle} />
                                    <Property name={locale.OrderPage.Hall} value={data.hallTitle} />
                                    <Property name={locale.OrderPage.Sector} value={data.sectorName} />
                                </>
                            )}
                            {ForEachGroupedServices(data.groupedServices).map((x: any) => {
                                return <Property key={x.name} name={x.name} value={x.value} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-2xl">
                    <div className="flex flex-col items-center justify-center py-12">
                        <h2 className="text-3xl font-semibold mb-2 text-center">Добро пожаловать на Kazticket.kz!</h2>
                        <p className="text-gray-600 text-center text-lg leading-relaxed">
                            Лучшая система онлайн покупки билетов на концерты, выставки, кино, культурные и спортивные
                            мероприятия в Казахстане:
                        </p>
                        <Link href="/contacts" target="_blank">
                            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                                Связатся с нами
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}
