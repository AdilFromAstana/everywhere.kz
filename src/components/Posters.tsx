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
                                    <div className="flex flex-col justify-center lg:hidden h-full">
                                        <div
                                            className="bg-cover bg-center absolute w-full h-full rounded-xl lg:rounded-3xl top-0 left-0 -z-20"
                                            style={{
                                                backgroundImage: `url("${x.MobileImageURL ?? ''}")`,
                                                filter: 'blur(2px)',
                                                height: '100%',
                                            }}
                                        />
                                        <img alt={x.Name} className="h-full rounded-xl" src={x.MobileImageURL} />
                                    </div>
                                    <div className="lg:flex flex-col justify-center hidden h-full">
                                        <div
                                            className="bg-cover bg-center absolute w-full h-full rounded-xl top-0 left-0 -z-20"
                                            style={{
                                                backgroundImage: `url("${x.ComputerImageURL ?? ''}")`,
                                                filter: 'blur(2px)',
                                                height: '100%',
                                            }}
                                        />
                                        <img className="h-fit w-full" src={x.ComputerImageURL} />
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
