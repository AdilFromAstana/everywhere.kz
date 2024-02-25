'use client';

import React, { useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';

import { isEmpty } from '@/functions';

interface PostersProps {
    UserLang: string;
    posters: any[];
}

const Posters = ({ posters, UserLang }: PostersProps) => {
    const progressCircle = useRef(null);
    const [swiper, setSwiper] = useState<any>(null);

    const RenderSublines = (sublines: string[]) => {
        let result = '';
        if (!isEmpty(sublines)) {
            sublines.forEach((x, index) => {
                if (index === sublines.length - 1) {
                    result = result + x;
                } else {
                    result = result + x + ' • ';
                }
            });
        }

        return result;
    };

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        // @ts-expect-error: front
        if (progressCircle.current) progressCircle.current.style.setProperty('--progress', 1 - progress);

        const element = document.querySelector('.swiper-pagination-bullet-active');
        if (element?.firstElementChild) {
            // @ts-expect-error: front
            element.firstElementChild.firstElementChild.style.transform = `translate3d(-${progress * 100}%, 0px, 0px)`;
        }
    };

    const onSlideChange = () => {
        const elements = document.querySelectorAll('.swiper-pagination-bullet');
        if (elements) {
            elements.forEach((element) => {
                if (element?.firstElementChild) {
                    // @ts-expect-error: front
                    element.firstElementChild.firstElementChild.style.transform = `translate3d(-105%, 0px, 0px)`;
                }
            });
        }
    };

    if (isEmpty(posters) || posters.length === 0) {
        return <></>;
    } else {
        return (
            <>
                <div className="lg:hidden">
                    <Swiper
                        pagination={{
                            type: 'bullets',
                            clickable: true,
                            renderBullet: function (index, className) {
                                return `<button class=${className}>
                                <div class="bullet-indicator-container">
                                    <div class="bullet-indicator" style="transform: translate3d(-105%, 0px, 0px);">
                                    </div>
                                </div>
                            </button>`;
                            },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        style={{
                            marginLeft: '-1.5rem',
                            marginRight: '-1.5rem',
                        }}
                        className="h-64 mb-2"
                        navigation={true}
                        modules={[Pagination, Autoplay]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        onSlideChange={onSlideChange}
                    >
                        {posters.map((x) => {
                            return (
                                <SwiperSlide key={x.Id}>
                                    <Link href={x.URL}>
                                        <div className="cursor-pointer h-full flex flex-col items-center">
                                            <div className="flex flex-col justify-center lg:hidden h-full">
                                                <div
                                                    className="bg-cover bg-center absolute w-full h-full top-0 left-0 -z-20"
                                                    style={{
                                                        backgroundImage: `url("${x.MobileImageURL ?? ''}")`,
                                                        filter: 'blur(2px)',
                                                        height: '100%',
                                                    }}
                                                />
                                                <div className="bg-[#22182666] absolute w-full h-full top-0 left-0 z-20">
                                                    <div className="absolute px-5 bottom-10 flex flex-col gap-1">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <span className="text-2xl font-semibold text-white">
                                                                {UserLang?.toLocaleLowerCase() === 'en'
                                                                    ? x.NameEn
                                                                    : UserLang?.toLocaleLowerCase() === 'kz'
                                                                      ? x.NameKz
                                                                      : x.NameRu}
                                                            </span>
                                                        </div>
                                                        {(!isEmpty(x.SublinesRu) ||
                                                            !isEmpty(x.SublinesKz) ||
                                                            !isEmpty(x.SublinesEn)) && (
                                                            <div className="text-sm font-semibold text-white opacity-80">
                                                                <span>
                                                                    {RenderSublines(
                                                                        UserLang?.toLocaleLowerCase() === 'en'
                                                                            ? x.SublinesEn
                                                                            : UserLang?.toLocaleLowerCase() === 'kz'
                                                                              ? x.SublinesKz
                                                                              : x.SublinesRu
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {!isEmpty(x.MinCost) && (
                                                            <span className="relative text-white text-sm opacity-80">
                                                                от {x.MinCost} тг
                                                            </span>
                                                        )}
                                                    </div>
                                                    {!isEmpty(x.AgeLimit) && (
                                                        <div className="absolute right-3 top-3">
                                                            <span className="font-bold text-white text-base">
                                                                {x.AgeLimit}+
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <Image
                                                    width={720}
                                                    height={480}
                                                    alt={x.NameRu}
                                                    className="h-full"
                                                    src={x.MobileImageURL}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className="lg:block hidden">
                    <Swiper
                        pagination={{
                            enabled: false,
                            renderBullet: function () {
                                return `<div></div>`;
                            },
                        }}
                        onSwiper={(s) => setSwiper(s)}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        speed={500}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        centeredSlides={true}
                        onClick={(swiper) => {
                            if (swiper.activeIndex > swiper.clickedIndex) {
                                swiper.slidePrev();
                            } else {
                                swiper.slideNext();
                            }
                        }}
                        loop={true}
                        allowSlideNext={true}
                        allowSlidePrev={true}
                        style={{
                            marginLeft: '-0.5rem',
                            marginRight: '-0.5rem',
                        }}
                        className="lg:h-96 h-64 mb-2"
                        modules={[Autoplay]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        onSlideChange={onSlideChange}
                    >
                        {[...posters, ...posters].map((x) => {
                            return (
                                <SwiperSlide key={x.Id} className="rounded-xl overflow-hidden">
                                    <Link href={x.URL} className="rounded-xl">
                                        <div className="rounded-xl cursor-pointer h-full flex flex-col items-center">
                                            <div className={`lg:flex rounded-xl flex-col justify-center hidden h-full`}>
                                                <div
                                                    className="bg-cover bg-center absolute w-full h-full rounded-xl top-0 left-0 -z-20"
                                                    style={{
                                                        backgroundImage: `url("${x.ComputerImageURL ?? ''}")`,
                                                        filter: 'blur(4px)',
                                                        height: '100%',
                                                    }}
                                                />
                                                <div className="bg-[#22182666] absolute rounded-xl w-full h-full top-0 left-0 z-20">
                                                    <div className="absolute px-5 bottom-10 flex flex-col gap-1">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <span className="text-2xl font-semibold text-white">
                                                                {UserLang?.toLocaleLowerCase() === 'en'
                                                                    ? x.NameEn
                                                                    : UserLang?.toLocaleLowerCase() === 'kz'
                                                                      ? x.NameKz
                                                                      : x.NameRu}
                                                            </span>
                                                        </div>
                                                        {(!isEmpty(x.SublinesRu) ||
                                                            !isEmpty(x.SublinesKz) ||
                                                            !isEmpty(x.SublinesEn)) && (
                                                            <div className="text-sm font-semibold text-white opacity-80">
                                                                <span>
                                                                    {RenderSublines(
                                                                        UserLang?.toLocaleLowerCase() === 'en'
                                                                            ? x.SublinesEn
                                                                            : UserLang?.toLocaleLowerCase() === 'kz'
                                                                              ? x.SublinesKz
                                                                              : x.SublinesRu
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {!isEmpty(x.MinCost) && (
                                                            <span className="relative text-white text-sm rounded-sm opacity-80">
                                                                от {x.MinCost} тг
                                                            </span>
                                                        )}
                                                    </div>
                                                    {!isEmpty(x.AgeLimit) && (
                                                        <div className="absolute right-3 top-3">
                                                            <span className="font-bold text-white text-base">
                                                                {x.AgeLimit}+
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <Image
                                                    width={2000}
                                                    height={500}
                                                    alt={x.Name}
                                                    className="h-full w-fit z-0 rounded-xl object-contain"
                                                    src={x.ComputerImageURL}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                        <div className="absolute flex flex-row right-[10%] bottom-5 z-10">
                            <svg
                                onClick={() => swiper?.slidePrev()}
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                fill="none"
                                className="w-10 h-10 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_294_61)">
                                    <path
                                        d="M39.1305 8.69568H160.87C175.277 8.69568 186.957 20.3752 186.957 34.7826V156.522C186.957 170.929 175.277 182.609 160.87 182.609H39.1305C24.723 182.609 13.0435 170.929 13.0435 156.522V34.7826C13.0435 20.3752 24.723 8.69568 39.1305 8.69568Z"
                                        fill="white"
                                    />
                                    <path d="M39.1305 8.69568H160.87C175.277 8.69568 186.957 20.3752 186.957 34.7826V156.522C186.957 170.929 175.277 182.609 160.87 182.609H39.1305C24.723 182.609 13.0435 170.929 13.0435 156.522V34.7826C13.0435 20.3752 24.723 8.69568 39.1305 8.69568Z" />
                                    <path
                                        d="M108.696 69.5652L85.6832 92.5778C83.9854 94.2756 83.9854 97.0287 85.6832 98.7265L108.696 121.739"
                                        stroke="black"
                                        strokeOpacity="0.85"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_294_61"
                                        x="8.54346"
                                        y="5.19568"
                                        width="182.913"
                                        height="182.913"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB"
                                    >
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                                            result="effect1_dropShadow_294_61"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_294_61"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                            <svg
                                onClick={() => swiper?.slideNext()}
                                className="ProgressedButton w-10 h-10 cursor-pointer"
                                ref={progressCircle}
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_293_56)">
                                    <path
                                        d="M160.87 8.69568H39.1304C24.723 8.69568 13.0435 20.3752 13.0435 34.7826V156.522C13.0435 170.929 24.723 182.609 39.1304 182.609H160.87C175.277 182.609 186.956 170.929 186.956 156.522V34.7826C186.956 20.3752 175.277 8.69568 160.87 8.69568Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M160.87 8.69568H39.1304C24.723 8.69568 13.0435 20.3752 13.0435 34.7826V156.522C13.0435 170.929 24.723 182.609 39.1304 182.609H160.87C175.277 182.609 186.956 170.929 186.956 156.522V34.7826C186.956 20.3752 175.277 8.69568 160.87 8.69568Z"
                                        stroke-width="5"
                                    />
                                    <path
                                        className="Arrow"
                                        d="M91.3042 69.5652L114.317 92.5778C116.015 94.2756 116.015 97.0287 114.317 98.7265L91.3042 121.739"
                                        stroke="black"
                                        strokeOpacity="0.85"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_293_56"
                                        x="8.54346"
                                        y="5.19568"
                                        width="182.913"
                                        height="182.913"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB"
                                    >
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                                            result="effect1_dropShadow_293_56"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_293_56"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </Swiper>
                </div>
            </>
        );
    }
};

export default Posters;
