'use client';

import { CookieValueTypes } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { isEmpty } from '@/functions';

interface RecommendationsDesktopProps {
    UserLang: CookieValueTypes;
    recs: any[];
}

const RecommendationsDesktop = ({ recs }: RecommendationsDesktopProps) => {
    const swiperRef = useRef<any>(null);
    if (isEmpty(recs) || recs.length === 0) {
        return <></>;
    } else {
        return (
            <div className="lg:container lg:mx-auto relative flex flex-col items-center gap-4 py-10 -mx-4">
                <svg
                    className="absolute h-full w-screen"
                    width="1600"
                    height="184"
                    viewBox="0 0 1600 184"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-33 174C7.27335 120.607 60 28.6575 136.863 59.8812C399.407 166.533 450.415 142.21 511.865 92.8829C647.736 -16.1833 389.373 -19.0005 572.066 92.8829C759.378 207.594 901 -37.001 964.5 34.9998C1061.62 145.119 1219.07 204.539 1325.5 157.679C1472.66 92.8829 1421 25.4993 1407 25.4993C1345.59 25.4993 1348.5 122.5 1600.5 157.679"
                        stroke="#B9E4FF"
                        stroke-width="20"
                    />
                </svg>

                <div className="relative w-full flex gap-4 justify-center items-center">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M25.4802 6.93367C26.233 5.40295 25.2543 4.29884 24.213 5.51588C23.4476 6.41926 22.3686 8.99135 22.5568 9.48068C22.996 10.5973 24.2004 9.5434 25.4802 6.93367Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M17.9899 10.0199C18.7804 10.2709 19.0564 9.80663 18.9686 8.37629C18.7804 5.55326 17.9146 4.3864 16.4341 4.97611C15.7315 5.25214 17.1116 9.74391 17.9899 10.0199Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M10.0729 10.7472C11.8546 12.0772 13.0967 12.6669 13.724 12.441C14.5019 12.165 14.3765 11.9015 12.9587 10.7849C11.1519 9.34198 10.1607 8.91539 9.20714 9.16632C8.52961 9.34198 8.74295 9.74347 10.0729 10.7472Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M25.4675 11.2239C25.0409 11.6882 25.041 11.7007 25.3672 11.9391C26.2956 12.6166 27.2869 12.0771 31.214 8.72713C32.2679 7.82376 30.5239 7.10859 29.2943 7.94923C28.6544 8.38837 25.9694 10.6844 25.4675 11.2239Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M40.398 33.8334C39.9589 33.4696 39.6704 32.792 39.5449 31.8259C39.4571 31.1609 38.0518 20.1699 37.4119 17.2716C36.885 14.8626 35.4045 13.7209 34.2251 13.6581C33.4848 13.6205 33.0582 14.1098 32.757 13.9216C31.9415 13.4072 31.7156 13.1688 30.9126 13.2441C30.5362 13.2692 29.6956 13.495 29.407 13.746C29.2188 13.8965 28.9805 13.8965 28.4535 13.7585C25.8689 13.0684 24.7271 15.5276 25.8939 19.2791C26.5589 21.4246 27.5125 20.4836 27.2364 17.9617C26.8726 14.6242 26.9479 14.2729 27.9893 14.6493C28.5539 14.8501 28.5789 14.9003 28.5287 15.5903C28.4535 16.5564 29.131 20.9729 29.382 21.136C30.072 21.5877 30.599 20.7847 30.3732 19.5928C29.7584 16.2553 30.1724 14.1851 31.402 14.4988C31.7784 14.5991 32.0544 14.9379 32.0544 15.3269C32.1171 19.1034 32.1548 21.6254 33.3091 21.6254C34.0368 21.6254 34.0368 21.6505 33.8737 18.3757C33.698 14.9003 34.1121 14.7121 34.7269 14.9003C35.6177 15.1763 35.7056 17.2591 35.7934 17.8237C35.7934 17.8362 37.7758 30.8598 37.7758 30.8849C38.0142 33.846 39.8585 36.4432 41.1509 35.6151C41.4143 35.4394 40.925 34.2726 40.398 33.8334Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M9.40824 18.0245C9.40824 16.0044 9.43332 15.8413 9.83482 15.3896C10.55 14.549 10.7758 15.3144 10.9139 19.1788C11.0142 22.0018 11.0268 22.0394 11.6291 22.2151C12.407 22.4535 12.4822 22.0896 12.3944 18.9027C12.3066 16.0295 12.3191 15.9292 12.6955 15.5527C13.4734 14.7623 13.6366 15.076 13.9628 17.7986C14.151 19.4548 14.1258 20.3833 13.8624 21.8136C13.7996 22.1775 13.8623 22.2904 14.1635 22.3782C14.979 22.5915 15.117 22.3155 15.3554 19.9316C15.7695 15.8037 15.2049 14.5616 12.8712 14.5365C12.1811 14.5239 11.3906 14.4361 11.1146 14.3106C10.8386 14.1977 10.2112 14.1099 9.72191 14.1224C9.23258 14.135 8.42957 14.0973 7.9528 14.0346C7.37564 13.9593 6.89891 14.0095 6.56015 14.1601C5.11726 14.825 4.86633 15.6029 3.17251 24.7496C2.88393 26.3305 2.5577 28.3003 2.46987 29.1159C2.29422 30.634 1.76723 32.4031 1.0646 33.8586C0.575278 34.8623 0.688224 35.2262 1.46613 35.2262C2.85882 35.2262 4.16369 32.9677 4.47736 29.9941C4.64047 28.4132 4.92906 27.7608 5.43093 24.1473C6.38449 17.1838 6.5601 16.3808 7.26272 15.5653C8.22883 14.4486 8.141 14.8125 8.26647 21.3117C8.26647 21.5878 8.51743 21.8011 8.79346 21.776C9.29533 21.7383 9.40824 21.2741 9.40824 18.0245Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M32.8073 35.3273C32.0168 33.8718 31.9541 33.8217 30.5488 33.6711C28.8425 33.4829 27.525 32.8179 26.9604 31.8644C25.7183 29.7439 23.9743 24.1104 24.1751 22.8683C24.4511 21.1243 25.0282 21.2497 25.9692 23.2321C26.7095 24.7879 27.1989 25.34 28.9429 26.6449C29.7208 27.222 30.1975 27.7365 30.5112 28.3513C30.9002 29.1041 31.0382 29.2295 31.4898 29.2295C33.0331 29.2295 31.1887 25.8795 29.3067 25.2773C28.5037 25.0263 28.2528 24.813 28.2528 24.399C28.2528 22.3288 25.229 20.0829 23.623 20.9612C22.2429 21.7265 22.1299 22.8808 23.0835 26.3563C24.9153 33.0187 25.9442 34.3737 29.382 34.6749C30.7245 34.8003 31.0507 35.0261 31.7282 36.2934C32.6567 38.0374 33.7232 36.8454 33.5099 36.5694C33.4346 36.4565 33.1209 35.9044 32.8073 35.3273Z"
                            fill="#2F2F38"
                        />
                        <path
                            d="M16.1331 21.7762C15.2172 22.2028 14.2259 23.2568 13.7994 24.2605C13.4857 25.0008 13.3979 25.076 12.6953 25.189C11.1645 25.4273 9.8346 26.5691 9.63385 27.7862C9.45819 28.8652 10.5623 29.4172 10.9638 28.4386C11.4907 27.1714 12.5321 26.1927 13.6739 25.9041C14.3765 25.7285 15.7818 24.3232 16.9737 22.642C17.7265 21.5755 18.2284 23.0184 17.7014 24.6996C16.0452 29.894 13.8997 32.7547 11.428 33.0307C10.3866 33.1562 10.1608 33.3695 9.26994 35.1386C8.68024 36.2929 8.66772 36.3556 8.98139 36.5815C9.7342 37.1335 10.4494 36.6066 10.9387 35.1511C11.2775 34.1474 11.3151 34.0972 12.0805 33.909C14.9662 33.1687 16.3966 31.4624 18.4668 26.3307C20.0477 22.4161 19.0314 20.4337 16.1331 21.7762Z"
                            fill="#2F2F38"
                        />
                    </svg>
                    <span className="font-semibold text-3xl">Рекомендуем Вам</span>
                    <div className="absolute flex gap-1 items-center right-2">
                        <svg
                            className="cursor-pointer select-none h-10 w-10"
                            onClick={() => {
                                if (swiperRef) swiperRef?.current?.slidePrev(500);
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
                                if (swiperRef) swiperRef?.current?.slideNext();
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
                </div>
                <div className="lg:block lg:container lg:mx-auto hidden">
                    <Swiper
                        spaceBetween={100}
                        slidesPerView={3.5}
                        speed={500}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="SwiperRecs"
                        onSwiper={(s) => {
                            swiperRef.current = s;
                        }}
                        loop={true}
                        allowSlideNext={true}
                        allowSlidePrev={true}
                    >
                        {[...recs, ...recs, ...recs, ...recs].map((x, i: number) => {
                            return (
                                <SwiperSlide key={i} className="overflow-hidden select-none">
                                    <Link href={x.URL} key={i}>
                                        <div className="flex flex-col gap-2">
                                            <Image
                                                className="w-full h-full rounded-xl"
                                                width={400}
                                                height={400}
                                                alt={x.NameRu}
                                                src={x.ImageURL}
                                            />
                                            <h6 className="text-[#2F2F38D9] font-semibold text-2xl">{x.NameRu}</h6>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        );
    }
};

export default RecommendationsDesktop;
