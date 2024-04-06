'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface TabBarProps {
    locale: any;
    pages: any[];
}

const TabBar = ({}: TabBarProps) => {
    const activePath = usePathname();

    return (
        <div className="fixed left-0 bottom-0 bg-white w-screen shadow-tabbar py-2 lg:hidden block z-[999999]">
            <div className="flex flex-row justify-around">
                <Link href="/" className="flex flex-col items-center w-1/3 gap-1">
                    <svg
                        className="w-6 h-6"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.83333 6.66651H12.1667M8.83333 9.99985H12.1667M8.83333 13.3332H12.1667M15.5 3.88103V16.1187C15.5 17.0653 14.445 17.6299 13.6574 17.1048C13.2593 16.8394 12.7407 16.8394 12.3426 17.1048L11.4245 17.7168C10.8647 18.0901 10.1353 18.0901 9.5755 17.7168L8.65741 17.1048C8.25932 16.8394 7.74068 16.8394 7.34259 17.1048C6.55497 17.6299 5.5 17.0653 5.5 16.1187V3.88103C5.5 2.93443 6.55497 2.36983 7.34259 2.8949C7.74068 3.1603 8.25932 3.1603 8.65741 2.8949L9.5755 2.28285C10.1353 1.90962 10.8647 1.90962 11.4245 2.28285L12.3426 2.8949C12.7407 3.1603 13.2593 3.1603 13.6574 2.8949C14.445 2.36983 15.5 2.93443 15.5 3.88103Z"
                            stroke={
                                !activePath.includes('cabinet') && !activePath.includes('category')
                                    ? '#0490C3'
                                    : '#2F2F38'
                            }
                            strokeOpacity={
                                !activePath.includes('cabinet') && !activePath.includes('category') ? '1' : '0.45'
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span
                        className={`${
                            !activePath.includes('cabinet') && !activePath.includes('category')
                                ? 'text-[#0490C3]'
                                : 'text-[#00000073]'
                        } text-xs`}
                    >
                        Афиша
                    </span>
                </Link>
                <Link
                    href="https://apps.apple.com/kz/app/kazticket-kz/id6476543740"
                    className="flex flex-col items-center w-1/3 gap-1"
                >
                    <svg
                        className="w-6 h-6"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.4944 4.29639C8.82825 2.33044 6.04987 1.8016 3.96233 3.60183C1.87478 5.40205 1.58089 8.41194 3.22025 10.5411C4.58326 12.3113 8.70823 16.0449 10.0602 17.2533C10.2114 17.3885 10.287 17.4561 10.3753 17.4826C10.4523 17.5058 10.5365 17.5058 10.6135 17.4826C10.7017 17.4561 10.7773 17.3885 10.9286 17.2533C12.2805 16.0449 16.4055 12.3113 17.7685 10.5411C19.4079 8.41194 19.1498 5.38312 17.0264 3.60183C14.903 1.82054 12.1605 2.33044 10.4944 4.29639Z"
                            stroke={activePath.includes('favorite') ? '#0490C3' : '#2F2F38'}
                            strokeOpacity={activePath.includes('favorite') ? '1' : '0.45'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span
                        className={`${activePath.includes('favorite') ? 'text-[#0490C3]' : 'text-[#00000073]'} text-xs`}
                    >
                        Избранное
                    </span>
                </Link>
                {/* <Link href="/cabinet" className="flex flex-col items-center w-1/3 gap-1">
                    <svg
                        className="w-6 h-6"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.4974 12.0807C13.3739 12.0807 15.7057 9.74888 15.7057 6.8724C15.7057 3.99591 13.3739 1.66406 10.4974 1.66406C7.62091 1.66406 5.28906 3.99591 5.28906 6.8724C5.28906 9.74888 7.62091 12.0807 10.4974 12.0807ZM10.4974 12.0807C5.89502 12.0807 2.16406 14.8789 2.16406 18.3307M10.4974 12.0807C15.0998 12.0807 18.8307 14.8789 18.8307 18.3307"
                            stroke={activePath.includes('cabinet') ? '#0490C3' : '#2F2F38'}
                            strokeOpacity={activePath.includes('cabinet') ? '1' : '0.45'}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span
                        className={`${activePath.includes('cabinet') ? 'text-[#0490C3]' : 'text-[#00000073]'} text-xs`}
                    >
                        Личный кабинет
                    </span>
                </Link> */}
            </div>
        </div>
    );
};

export default TabBar;
