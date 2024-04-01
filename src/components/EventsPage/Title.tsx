'use client';

import { Popover, Transition } from '@headlessui/react';
import { setCookie } from 'cookies-next';

// import { useEffect, useState } from 'react';

import { isEmpty } from '@/functions';
import { City } from '@/types/City';

interface TitleProps {
    cities: City[];
    selectedCity: City;
    title: string;
    locale: any;
}

const Title = ({ cities, selectedCity, title, locale }: TitleProps) => {
    // const UserLang = getCookie('UserLang');
    const handleSelectCity = (city: City) => {
        if (selectedCity?.id !== city.id) {
            setCookie('UserCityId', city.id, {
                maxAge: 60 * 60 * 24 * 365,
            });
            location.reload();
        }
    };

    // useEffect(() => {
    //     if (!UserLang) {
    //         // setData(moment(date).locale('ru_Ru').format('Do MMMM HH:mm'));
    //     } else {
    //         switch (UserLang.toLocaleLowerCase()) {
    //             case 'kk':
    //                 // setData(`${moment(date).utc().add(cityTimeZone, 'h').locale('kk').format('Do MMMM HH:mm')}`);
    //                 break;
    //             case 'en':
    //                 // setData(`${moment(date).utc().add(cityTimeZone, 'h').locale('en').format('Do MMMM HH:mm')}`);
    //                 break;
    //             case 'ru':
    //             default:
    //                 // setData(`${moment(date).utc().add(cityTimeZone, 'h').locale('ru_Ru').format('Do MMMM HH:mm')}`);
    //                 break;
    //         }
    //     }
    // }, []);

    return (
        <div className="relative container z-40 mx-auto">
            <div className="flex lg:gap-4 gap-2 items-center lg:mt-0 mt-4">
                <svg
                    className="lg:w-16 lg:h-16 w-10 h-10"
                    width="71"
                    height="71"
                    viewBox="0 0 71 71"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.0149 17.9284C28.0663 20.5523 31.1276 24.7711 33.2113 23.9737C34.1116 23.6135 34.1116 23.2277 33.134 20.4237C30.7931 13.761 27.9634 15.819 28.0149 17.9284ZM44.9931 23.8708C44.2728 25.903 46.7681 26.2632 48.4917 24.3853C50.241 22.4559 52.1189 19.5748 53.1221 17.6197C54.2283 15.7418 52.0674 14.79 50.2667 16.3335C48.1315 18.1342 45.4819 22.4559 44.9931 23.8708ZM9.54461 22.3016C7.94969 22.9447 13.3004 29.5816 15.4613 29.6331C17.9823 29.6845 18.188 29.1186 16.4388 26.7777C13.6862 23.0733 11.3711 21.5555 9.54461 22.3016ZM33.7258 31.8454C32.774 32.7972 31.642 34.1092 31.2047 34.7266C27.4489 40.3345 27.3974 40.386 25.6739 39.074C21.6866 36.09 15.1268 34.0577 16.413 39.2541C17.2105 42.3925 19.5772 48.1291 20.1946 50.0327C21.7895 55.049 22.6384 55.8722 25.4681 55.2034C32.491 53.5056 42.5236 53.4541 49.7008 55.0748C51.4758 55.4864 51.5787 55.2806 51.7588 51.7048C52.1189 44.4762 56.2862 37.4277 56.2862 35.1639C56.2862 32.6171 51.4758 34.5208 44.9417 39.64L44.2729 40.1545L43.321 39.5114C41.3659 38.1994 40.3884 39.2284 41.4945 41.415C42.3949 43.19 43.1409 43.7816 45.1217 42.8298C46.2536 42.2896 47.8229 41.2606 50.0352 39.6914C50.9098 39.074 51.6301 38.6367 51.6301 38.7139C51.6301 39.074 50.0609 45.8139 50.0609 45.8396L46.1507 45.5052C43.038 45.3766 42.6779 47.0229 45.8935 47.5117C46.2279 47.5632 49.5207 47.9748 49.5207 47.9748C49.5207 47.9748 49.3921 49.4153 49.0319 50.2385C48.6461 51.0617 48.0029 51.2675 46.9482 50.9074C38.6906 48.1806 25.2366 51.499 25.2109 51.499C24.7221 51.5762 20.2461 39.7686 20.6062 39.4084C20.6577 39.357 21.1978 39.6914 21.8152 40.1545C28.7866 45.2222 29.5069 45.0679 34.1116 37.6849L36.2725 34.2121L37.1214 35.4726C39.5909 39.1512 43.0895 37.5306 41.1344 34.8295C40.4656 33.9291 39.3595 32.5914 37.5845 30.5077C36.787 29.5559 35.6037 29.9675 33.7258 31.8454ZM67.1936 31.4595C66.2675 31.9997 61.4312 36.6302 60.8653 37.5048C59.6562 39.4342 62.1772 39.8715 64.4667 38.1222C67.1421 36.09 70.9236 32.5914 70.9236 32.1284C70.9494 31.2023 68.4541 30.7392 67.1936 31.4595ZM3.47357 43.7816C7.22937 44.7077 9.39019 44.9393 10.2391 44.4762C11.6282 43.7302 10.9851 43.19 7.69239 42.3668C7.38369 42.2896 4.34816 41.4407 2.26446 41.4407C0.772434 41.4407 -2.54599 42.2639 3.47357 43.7816Z"
                        fill="black"
                    />
                </svg>
                <h1 className="lg:text-4xl text-xl font-bold">{title}</h1>
                <Popover className="relative">
                    <Popover.Button className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white">
                        <h1 className="lg:text-4xl text-xl font-bold underline text-[#0490C3]">
                            {isEmpty(selectedCity) ? locale?.Header?.City : selectedCity?.name}
                        </h1>
                    </Popover.Button>

                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-[99999] -right-8 top-full mt-3 w-screen max-w-xs max-h-96 overflow-auto rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-2">
                                {cities.map((city: City) => (
                                    <div
                                        key={city.id}
                                        onClick={() => handleSelectCity(city)}
                                        className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 ${
                                            city.id === selectedCity?.id ? 'bg-[#F5F5F5] text-[#0490C3]' : ''
                                        }`}
                                    >
                                        <div className="flex-auto">
                                            <div className="block">
                                                {city.name}
                                                <span className="absolute z-[99999] inset-0" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </div>
    );
};

export default Title;
