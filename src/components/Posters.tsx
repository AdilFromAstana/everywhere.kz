'use client';

import React from 'react';
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
                className="lg:h-96 h-64 mb-2 shadow-lg"
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
                                                    {!isEmpty(x.MinCost) && (
                                                        <span className="relative text-black text-sm bg-white rounded-sm px-1">
                                                            от {x.MinCost} тг
                                                        </span>
                                                    )}
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
                                    {/* COMPUTER */}
                                    <div className="lg:flex flex-col justify-center hidden h-full">
                                        <div
                                            className="bg-cover bg-center absolute w-full h-full rounded-md top-0 left-0 -z-20"
                                            style={{
                                                backgroundImage: `url("${x.ComputerImageURL ?? ''}")`,
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
                                                    {!isEmpty(x.MinCost) && (
                                                        <span className="relative text-black text-sm bg-white rounded-sm px-1">
                                                            от {x.MinCost} тг
                                                        </span>
                                                    )}
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
                                            className="h-fit w-full z-0"
                                            src={x.ComputerImageURL}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        );
    }
};

export default Posters;
