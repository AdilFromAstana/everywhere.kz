'use client';

import { CookieValueTypes } from 'cookies-next';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useRef } from 'react';

import { EventInList } from '@/types/EventInList';
import EventCard from './EventCard';

interface EventsByCategoryDesktopProps {
    UserLang: CookieValueTypes;
    UserCityId: CookieValueTypes;
    data: EventInList[];
    category: any;
}

const EventsByCategoryDesktop = ({ UserLang, UserCityId, data, category }: EventsByCategoryDesktopProps) => {
    const swiperRef = useRef<any>(null);

    return (
        <div className="flex container mx-auto flex-col gap-4 py-8">
            <div className="flex w-full gap-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                    {category.icon && <div>{category.icon}</div>}
                    <h6 className="text-3xl font-semibold">{category.name}</h6>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="flex gap-1 items-center">
                        <svg
                            className="cursor-pointer select-none h-10 w-10"
                            onClick={() => {
                                if (swiperRef && data.length > 5) swiperRef?.current?.slidePrev(500);
                            }}
                            width="43"
                            height="43"
                            viewBox="0 0 43 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_d_200_1205)">
                                <rect x="3" y="2" width="40" height="40" rx="16" fill="white" />
                                <rect x="3" y="2" width="40" height="40" rx="16" stroke="#EAEBF0" />
                                <path
                                    d="M25.0001 16L19.7072 21.2929C19.3167 21.6834 19.3167 22.3166 19.7072 22.7071L25.0001 28"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_200_1205"
                                    x="0.5"
                                    y="0.5"
                                    width="45"
                                    height="45"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.04 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_200_1205"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_200_1205"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>

                        <svg
                            className="cursor-pointer select-none h-10 w-10"
                            onClick={() => {
                                if (swiperRef && data.length > 5) swiperRef?.current?.slideNext();
                            }}
                            width="43"
                            height="43"
                            viewBox="0 0 43 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_d_200_1206)">
                                <rect x="3" y="2" width="40" height="40" rx="16" fill="white" />
                                <rect x="3" y="2" width="40" height="40" rx="16" stroke="#EAEBF0" />
                                <path
                                    d="M21 16L26.2929 21.2929C26.6834 21.6834 26.6834 22.3166 26.2929 22.7071L21 28"
                                    stroke="#2F2F38"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_200_1206"
                                    x="0.5"
                                    y="0.5"
                                    width="45"
                                    height="45"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.04 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_200_1206"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_200_1206"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    <Link
                        href={'/category/' + category.code}
                        className="bg-white border-[1px] px-3 py-1 border-[#D9D9D9] h-fit rounded-2xl text-lg"
                    >
                        Показать все
                    </Link>
                </div>
            </div>
            <div className="lg:block lg:container lg:mx-auto hidden">
                <Swiper
                    className="SwiperCategory"
                    spaceBetween={20}
                    slidesPerView={5}
                    speed={500}
                    onSwiper={(s) => {
                        swiperRef.current = s;
                    }}
                    loop={true}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                >
                    {data.map((event, index: number) => {
                        return (
                            <SwiperSlide key={index} className="rounded-xl">
                                <EventCard cardType="full" UserLang={UserLang} UserCityId={UserCityId} data={event} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};
export default EventsByCategoryDesktop;
