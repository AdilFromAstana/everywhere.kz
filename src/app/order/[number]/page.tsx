import { getCookie } from 'cookies-next';
// import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';

import type { Viewport } from 'next';

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

    const data = await res.json();
    return { ...data };
}

type Props = {
    params: { number: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const orderNumber = params.number;
//     const data = await GetOrderData(orderNumber);
//     return {
//         title: `Kazticket.kz - ${data.name}`,
//         openGraph: {
//             images: data.posterFileUrl,
//         },
//     };
// }

export const viewport: Viewport = {
    width: 'device-width',
    userScalable: false,
};

export default async function OrderPage({ params }: Props) {
    const data = await GetOrderData(params.number);
    // const UserLang = getCookie('UserLang', { cookies });

    return (
        <>
            <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center py-12">
                    <h2 className="text-3xl font-semibold mb-2 text-center">Добро пожаловать на Kazticket.kz!</h2>
                    <p className="text-gray-600 text-center text-lg leading-relaxed">
                        Лучшая система онлайн покупки билетов на концерты, выставки, кино, культурные и спортивные
                        мероприятия в Казахстане:
                    </p>
                    <img src={data.QRdata} />
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
