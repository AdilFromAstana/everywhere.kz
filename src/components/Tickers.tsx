'use client';

import { setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { isEmpty } from '@/functions';

interface TickersProps {
    tickers: any[];
    adsIsClosed: any;
}

const Tickers = ({ tickers, adsIsClosed }: TickersProps) => {
    const [AdsIsClosed, SetAdsIsClosed] = useState<any>(adsIsClosed);

    const handleCloseBanners = () => {
        SetAdsIsClosed(true);
        setCookie('AdsIsClosed', true, {
            maxAge: 60 * 60 * 1,
        });
    };

    if (isEmpty(tickers) || tickers.length === 0 || !!AdsIsClosed) {
        return <></>;
    } else {
        return (
            <div className="fixed z-10 lg:bottom-0 bottom-0 left-0">
                <svg
                    className="absolute z-10 lg:-top-14 -top-10 right-0 m-3 p-1 h-7 w-7 bg-white rounded-full cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="none"
                    onClick={() => handleCloseBanners()}
                >
                    <path
                        d="M32 3.58562L28.4144 0L16 12.4144L3.58562 0L0 3.58562L12.4144 16L0 28.4144L3.58562 32L16 19.5856L28.4144 32L32 28.4144L19.5856 16L32 3.58562Z"
                        fill="black"
                    />
                </svg>
                <div className="items-wrap relative flex overflow-hidden select-none gap-2">
                    {[1, 2].map((y) => {
                        return (
                            <div
                                key={y}
                                className="items flex flex-shrink-0 justify-around items-end min-w-full gap-2 marquee animate-[scroll_120s_linear_infinite]"
                            >
                                {[...tickers, ...tickers, ...tickers].map((x, index) => {
                                    return (
                                        <Link key={index} href={x.URL}>
                                            <Image
                                                width={400}
                                                height={80}
                                                key={index}
                                                alt={x.Name}
                                                className="mt-2 cursor-pointer hover:scale-110 hover:shadow-lg w-full h-[80px] rounded duration-200"
                                                src={x.ImageURL}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default Tickers;
