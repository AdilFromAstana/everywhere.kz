'use client';

import React from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import Link from 'next/link';

import { isEmpty } from '@/functions';

interface PostersProps {
    posters: any[];
}

const Posters = ({ posters }: PostersProps) => {
    if (isEmpty(posters) || posters.length === 0) {
        return <></>;
    } else {
        return (
            <Swiper
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                autoplay={{
                    delay: 7000,
                }}
                loop={true}
                className="lg:h-96 h-64 rounded-xl mb-2 -mx-4 shadow-lg"
                navigation={true}
                modules={[Autoplay, Navigation]}
            >
                {posters.map((x) => {
                    return (
                        <SwiperSlide key={x.Id}>
                            <Link href={x.URL} target="_blank">
                                <div className="cursor-pointer h-full flex flex-col items-center">
                                    <img
                                        className="h-full block lg:hidden w-full object-cover"
                                        src={x.MobileImageURL}
                                    />
                                    <img
                                        className="h-full hidden lg:block w-full object-cover"
                                        src={x.ComputerImageURL}
                                    />
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
