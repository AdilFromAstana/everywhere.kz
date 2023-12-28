import { getCookie } from 'cookies-next';
import { getDictionary } from 'dictionaries';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Script from 'next/script';

import EventumButton from '@/components/EventumButton';

import type { Metadata, Viewport } from 'next';

async function GetEventData(code: string) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const res = await fetch(process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL + 'eventum/once/' + code, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log('res: ', res);
        return null;
    }

    const data = await res.json();
    return data.data;
}

type Props = {
    params: { code: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const code = params.code;
    const data = await GetEventData(code);
    if (!data) {
        return {
            title: `Kazticket.kz`,
        };
    } else {
        return {
            title: `${data.NameRu} - Купить билеты на Kazticket.kz`,
            openGraph: {
                images: data.Poster,
            },
            description: data.DescriptionRu?.replace('<p>', '')
                ?.replace('</p>', '')
                ?.replace(/<strong [^>]*>/g, '')
                ?.replace(/<\/strong>/g, '')
                ?.replace(/<h2 [^>]*>/g, '')
                ?.replace(/<\/h2>/g, '')
                ?.replace(/<div [^>]*>/g, '')
                ?.replace(/<\/div>/g, '')
                ?.replace(/<span [^>]*>/g, '')
                ?.replace(/<\/span>/g, '')
                ?.replace('<strong>', '')
                ?.replace('</strong>', '')
                ?.replace('&nbsp;', '')
                ?.replace('&quot;', '')
                ?.replace(/\s+/g, ' '),
        };
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    userScalable: false,
};

export default async function EventPage({ params }: Props) {
    const data = await GetEventData(params.code);
    const UserLang = getCookie('UserLang', { cookies });
    const locale = await getDictionary(UserLang?.toLocaleLowerCase() ?? 'ru');

    if (!data) {
        return (
            <main className="h-96 w-full flex flex-col justify-center items-center">
                <h1 className="text-9xl font-extrabold dark:text-white text-black tracking-widest">404</h1>
                <div className="bg-[#28aad1] text-white px-2 text-sm rounded rotate-12 absolute">
                    {locale.Errors.PageNotFound}
                </div>
                <button className="mt-5">
                    <div className="relative inline-block text-sm font-medium text-[#28aad1] group active:text-orange-500 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#28aad1] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                        <span className="relative block px-8 py-3 bg-[#28aad1] text-white border border-current">
                            <Link href="/">{locale.Errors.ToMain}</Link>
                        </span>
                    </div>
                </button>
            </main>
        );
    } else {
        return (
            <>
                <div className="lg:h-128 h-64 relative rounded-xl lg:rounded-3xl lg:p-10 p-2 flex flex-col justify-center -mx-2 items-center content-center">
                    <div
                        className="bg-cover bg-center absolute w-full h-full rounded-xl lg:rounded-3xl top-0 left-0 -z-20"
                        style={{
                            filter: 'blur(4px)',
                            backgroundImage: `url("${data.Poster}")`,
                        }}
                    />
                    <img src={data.Poster} className="lg:h-full h-full lg:w-fit rounded-xl" />
                    {/* <Image
                        src={data.Poster}
                        width={1000}
                        height={1000}
                        alt="Poster"
                        className="lg:h-full lg:w-fit rounded-xl"
                    /> */}
                </div>
                <div className="-z-10 lg:text-6xl text-3xl text-black dark:text-white font-bold my-4">
                    {UserLang?.toLocaleLowerCase() === 'ru'
                        ? data.NameRu
                        : UserLang?.toLocaleLowerCase() === 'kz'
                          ? data.NameKz
                          : data.NameEn}
                </div>
                <EventumButton data={data} locale={locale} />
                <div className="my-6 w-full text-3xl text-black dark:text-white">{locale.EventPage.AboutDesc}</div>
                <div className="EventDescription my-6 w-full invert-0 dark:invert z-0">
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                UserLang?.toLocaleLowerCase() === 'ru'
                                    ? data.DescriptionRu
                                    : UserLang?.toLocaleLowerCase() === 'kz'
                                      ? data.DescriptionKz
                                      : data.DescriptionEn,
                        }}
                    ></div>
                </div>
                <Script src={process.env.NEXT_PUBLIC_EVENTUM_WIDGET_URL} />
            </>
        );
    }
}
