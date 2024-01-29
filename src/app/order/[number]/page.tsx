import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import groupArray from 'group-array';
// import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';
import QRCodeLib from 'qrcode';

import OrderDateTimeProperty from '@/components/OrderDateTimeProperty';
import { isEmpty } from '@/functions';

import type { Metadata, Viewport } from 'next';

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
        case 'ru':
        default:
            acceptLanguage = 'ru-RU';
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

const GenerateQRCode = async (orderNumber: number) => {
    try {
        const url = await QRCodeLib.toDataURL(`${orderNumber}`, {
            color: {
                dark: '#000000', // Тёмные точки QR-кода
                light: '#ffffff', // Фон QR-кода
            },
            width: 300,
            margin: 2,
            // Другие опции стилизации...
        });

        return url;
    } catch (err) {
        console.log('Ошибка при генерации QR-кода:', err);
        return '';
    }
};

export default async function OrderPage({ params }: Props) {
    const data = await GetOrderData(params.number);
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');
    const QRcodeData = await GenerateQRCode(data.orderNumber);

    const Property = ({ name, value }: { name: string; value: any }) => {
        if (Array.isArray(value)) {
            return (
                <div className="flex flex-row justify-between gap-2 w-full">
                    <div className="text-[#00000080] dark:text-white lg:text-2xl text-base">{name}</div>
                    <div className="lg:text-2xl text-base flex flex-col text-right dark:text-white">
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
                        <div className="w-full flex flex-col items-center">
                            {QRcodeData && (
                                <img id="QRcodeImage" className="rounded-lg" src={QRcodeData} alt="QR Code" />
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex flex-row gap-2">
                                <div className="font-medium text-[#000000db] dark:text-white">
                                    {locale.OrderPage.ShowQR}
                                </div>
                            </div>
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
