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

    const isMobile = window.innerWidth <= 768;

    if (isEmpty(posters) || posters.length === 0) {
        return <></>;
    } else {
        if (isMobile) {
            return (
                <>
                    <div className="lg:hidden">
                        <Swiper
                            pagination={{
                                type: 'bullets',
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return `<div class=${className}>
                                    <div class="bullet-indicator-container">
                                        <div class="bullet-indicator" style="transform: translate3d(-105%, 0px, 0px);">
                                        </div>
                                    </div>
                                </div>`;
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
                            className="mb-2"
                            navigation={true}
                            modules={[Pagination, Autoplay]}
                            onAutoplayTimeLeft={onAutoplayTimeLeft}
                            onSlideChange={onSlideChange}
                        >
                            {posters.map((x, index: number) => {
                                return (
                                    <SwiperSlide key={x.Id}>
                                        <Link href={x.URL}>
                                            <div className="cursor-pointer flex flex-col items-center">
                                                <div className="bg-[#00000040] absolute w-full h-full top-0 left-0 z-20">
                                                    <div className="absolute px-5 bottom-10 flex flex-col gap-1">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <span className="text-lg font-semibold text-white">
                                                                {UserLang?.toLocaleLowerCase() === 'en'
                                                                    ? x.NameEn
                                                                    : UserLang?.toLocaleLowerCase() === 'kk'
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
                                                                            : UserLang?.toLocaleLowerCase() === 'kk'
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
                                                    fetchPriority={'high'}
                                                    priority={[0, 1].includes(index)}
                                                    alt={x.NameRu}
                                                    className="h-fit w-full object-cover"
                                                    src={x.MobileImageURL}
                                                />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="lg:block hidden my-4">
                        <Swiper
                            pagination={{
                                enabled: false,
                                renderBullet: function () {
                                    return `<div></div>`;
                                },
                            }}
                            onSwiper={(s) => setSwiper(s)}
                            spaceBetween={20}
                            slidesPerView={1.25}
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
                                marginLeft: '-1rem',
                                marginRight: '-1rem',
                            }}
                            modules={[Autoplay]}
                            onAutoplayTimeLeft={onAutoplayTimeLeft}
                            onSlideChange={onSlideChange}
                        >
                            {[...posters, ...posters].map((x, index: number) => {
                                return (
                                    <SwiperSlide key={`${x.Id}-${index}`} className="rounded-xl overflow-hidden">
                                        <Link href={x.URL} className="rounded-xl">
                                            <div className="rounded-xl cursor-pointer h-full flex flex-col items-center">
                                                <div
                                                    className={`lg:flex rounded-xl flex-col justify-center hidden h-full`}
                                                >
                                                    <div className="bg-[#22182666] absolute rounded-xl w-full h-full top-0 left-0 z-20">
                                                        <div className="absolute px-5 bottom-10 flex flex-col gap-1">
                                                            <div className="flex flex-row items-center gap-2">
                                                                <span className="text-2xl font-semibold text-white">
                                                                    {UserLang?.toLocaleLowerCase() === 'en'
                                                                        ? x.NameEn
                                                                        : UserLang?.toLocaleLowerCase() === 'kk'
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
                                                                                : UserLang?.toLocaleLowerCase() === 'kk'
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
                                                        alt={x.NameRu}
                                                        priority={[0, 1, posters.length - 1].includes(index)}
                                                        className=" z-0 rounded-xl object-contain"
                                                        src={x.ComputerImageURL}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                            <div className="absolute flex gap-1 flex-row right-[11%] bottom-5 z-10">
                                <svg
                                    onClick={() => swiper?.slidePrev()}
                                    className="w-10 h-10 cursor-pointer"
                                    width="224"
                                    height="224"
                                    viewBox="0 0 224 224"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g filter="url(#filter0_d_6_44)">
                                        <rect
                                            width="200"
                                            height="200"
                                            rx="80"
                                            transform="matrix(-1 0 0 1 212 11)"
                                            fill="white"
                                        />
                                        <rect width="200" height="200" rx="80" transform="matrix(-1 0 0 1 212 11)" />
                                        <path
                                            d="M122 81L95.5355 107.464C93.5829 109.417 93.5829 112.583 95.5355 114.536L122 141"
                                            stroke="#2F2F38"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                    <defs>
                                        <filter
                                            id="filter0_d_6_44"
                                            x="-0.00012207"
                                            y="-0.00012207"
                                            width="224"
                                            height="224"
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
                                                result="effect1_dropShadow_6_44"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="effect1_dropShadow_6_44"
                                                result="shape"
                                            />
                                        </filter>
                                    </defs>
                                </svg>
                                <svg
                                    onClick={() => swiper?.slideNext()}
                                    className="ProgressedButton w-10 h-10 cursor-pointer"
                                    ref={progressCircle}
                                    width="224"
                                    height="224"
                                    viewBox="0 0 224 224"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g filter="url(#filter0_d_6_44)">
                                        <rect x="12" y="11" width="200" height="200" rx="80" fill="white" />
                                        <rect
                                            x="12"
                                            y="11"
                                            width="200"
                                            height="200"
                                            rx="80"
                                            stroke="#0490C3"
                                            strokeWidth="20"
                                        />
                                        <path
                                            className="Arrow"
                                            d="M102 81L128.464 107.464C130.417 109.417 130.417 112.583 128.464 114.536L102 141"
                                            stroke="#2F2F38"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                    <defs>
                                        <filter
                                            id="filter0_d_6_44"
                                            x="-0.00012207"
                                            y="-0.00012207"
                                            width="224"
                                            height="224"
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
                                                result="effect1_dropShadow_6_44"
                                            />
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="effect1_dropShadow_6_44"
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
    }
};

export default Posters;
