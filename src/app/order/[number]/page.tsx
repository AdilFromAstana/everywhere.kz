import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Script from 'next/script';
import QRCodeStyling from 'qr-code-styling';

import { CheckToken } from '@/functions/AxiosHandlers';

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
    }

    const res = await fetch(ORDERS_API_URL + orderNumber, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
        },
    });

    let QRdata = '';

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log('res: ', res);
        throw new Error('Failed to fetch data');
    } else {
        const qrCode = new QRCodeCanvas({
            width: 450,
            height: 350,
            data: '${orderData.orderNumber}',
            margin: 30,
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'Q',
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0,
            },
            dotsOptions: {
                type: 'extra-rounded',
                color: '#6a1a4c',
            },
            backgroundOptions: { color: '#ffffff' },
            image: 'data:image/png;base64,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',
            // dotsOptionsHelper: {
            //     colorType: {
            //         single: true,
            //         gradient: false,
            //     },
            //     gradient: {
            //         linear: true,
            //         radial: false,
            //         color1: '#6a1a4c',
            //         color2: '#6a1a4c',
            //         // rotation: 0,
            //     },
            // },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: '#000000',
            },
            // cornersSquareOptionsHelper: {
            //     colorType: {
            //         single: true,
            //         gradient: false,
            //     },
            //     gradient: {
            //         linear: true,
            //         radial: false,
            //         color1: '#000000',
            //         color2: '#000000',
            //         rotation: '0',
            //     },
            // },
            cornersDotOptions: {
                // type: '',
                color: '#000000',
            },
            // cornersDotOptionsHelper: {
            //     colorType: {
            //         single: true,
            //         gradient: false,
            //     },
            //     gradient: {
            //         linear: true,
            //         radial: false,
            //         color1: '#000000',
            //         color2: '#000000',
            //         rotation: '0',
            //     },
            // },
            // backgroundOptionsHelper: {
            //     colorType: {
            //         single: true,
            //         gradient: false,
            //     },
            //     gradient: {
            //         linear: true,
            //         radial: false,
            //         color1: '#ffffff',
            //         color2: '#ffffff',
            //         rotation: '0',
            //     },
            // },
        });

        var svgBlob = await qrCode.toDataUrl();

        console.log('svgBlob: ', svgBlob);
    }

    const data = await res.json();
    return { ...data, QRdata };
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
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    console.log('data: ', data);

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
