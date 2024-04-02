'use client';

import { Dialog, Popover, Transition } from '@headlessui/react';
import {
    // Bars3Icon,
    // BuildingOffice2Icon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    MoonIcon,
    PhoneIcon,
    SunIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import WhiteMonoLogo from '@/assets/kazticket-logo-white-mono.svg';
import Logo from '@/assets/kazticket-logo.svg';
import { isEmpty } from '@/functions';
import { City } from '@/types/City';
import { Dropdown } from '@/types/Dropdown';
// import PushNotificationRequest from './PushNotificationRequest';
import SearchBox from './SearchBox';

interface HeaderProps {
    cities: City[];
    langs: Dropdown[];
    selectedCity: City;
    selectedLang: Dropdown;
    locale: any;
    pages: any[];
}

const Header = ({ locale, selectedCity, cities, langs, selectedLang, pages }: HeaderProps) => {
    const [isSupportMenuOpen, setSupportMenuOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isSearchMenuOpen, setSearchMenuOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const UserLang = getCookie('UserLang');
        if (isEmpty(UserLang)) {
            setCookie('UserLang', 'Ru', {
                maxAge: 60 * 60 * 24 * 365,
            });
        }
    }, []);

    useEffect(() => {
        if (
            getCookie('theme') === 'dark' ||
            (isEmpty(getCookie('theme')) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, [!isDarkMode]);

    const handleSelectCity = (city: City) => {
        if (selectedCity?.id !== city.id) {
            setCookie('UserCityId', city.id, {
                maxAge: 60 * 60 * 24 * 365,
            });
            location.reload();
        }
    };

    const handleSelectLang = (lang: Dropdown) => {
        if (selectedLang?.key !== lang.key) {
            setCookie('UserLang', lang.value, {
                maxAge: 60 * 60 * 24 * 365,
            });
            location.reload();
        }
    };

    const swithTheme = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
            setCookie('theme', 'light', {
                maxAge: 60 * 60 * 24 * 365,
            });
        } else {
            setCookie('theme', 'dark', {
                maxAge: 60 * 60 * 24 * 365,
            });
            setIsDarkMode(true);
        }
    };

    return (
        <header className="container mx-auto lg:px-2 px-4 lg:py-0 py-2">
            <nav
                className="flex items-center justify-between rounded-2xl shadow-header-mobile lg:shadow-header dark:shadow-none py-3 lg:my-4 lg:px-8 px-4 lg:py-4"
                aria-label="Global"
            >
                <div className="flex z-50">
                    <Image
                        onClick={() => {
                            router.push('/');
                        }}
                        src={isDarkMode ? WhiteMonoLogo : Logo}
                        alt="Kazticket.kz Logo"
                        className="lg:h-8 h-6 w-auto cursor-pointer"
                        priority
                    />
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:mx-5 mx-1">
                    <SearchBox locale={locale} cities={cities} />
                </div>
                <div className="flex z-50">
                    <div className="hidden lg:flex lg:gap-x-12 lg:items-center lg:justify-end">
                        {/* <Link
                            className="text-gray-900 dark:text-white flex gap-x-2 items-center"
                            href="tel:+7-708-08-08-999"
                            target="_blank"
                        >
                            <PhoneIcon className="h-7 w-7" />
                            <div className="flex flex-col">
                                <span className="text-base leading-5 font-semibold">+7-708-08-08-999</span>
                                <span className="leading-5 text-gray-400 font-normal">{locale.Header.Support}</span>
                            </div>
                        </Link> */}
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white">
                                <MapPinIcon className="h-5 w-5" />
                                {isEmpty(selectedCity) ? locale?.Header?.City : selectedCity?.name}
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-50 -right-8 top-full mt-3 w-screen max-w-xs max-h-96 overflow-auto rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
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
                                                        <span className="absolute z-50 inset-0" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white">
                                {/* <LanguageIcon className="h-5 w-5" />{' '} */}
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1M11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1M11 21C13.0083 21 14.6364 16.5228 14.6364 11C14.6364 5.47715 13.0083 1 11 1M11 21C8.99169 21 7.36364 16.5228 7.36364 11C7.36364 5.47715 8.99169 1 11 1M1.90909 7.36364H20.0909M1.90909 13.7273H20.0909"
                                        stroke="#2F2F38"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                {isEmpty(selectedLang) ? 'Язык' : selectedLang?.text}
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-50 -right-8 top-full mt-3 w-screen max-w-xs max-h-96 overflow-auto rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-2">
                                        {langs.map((lang: Dropdown) => (
                                            <div
                                                key={lang.key}
                                                onClick={() => handleSelectLang(lang)}
                                                className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                    lang.key === selectedLang?.key ? 'bg-[#F5F5F5] text-[#0490C3]' : ''
                                                }`}
                                            >
                                                <div className="flex-auto">
                                                    <div className="block">
                                                        {lang.text}
                                                        <span className="absolute z-50 inset-0" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                        <label className="relative cursor-pointer p-2">
                            <svg
                                onClick={() => swithTheme()}
                                className="dark:hidden"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className="fill-slate-300"
                                    d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                                />
                                <path
                                    className="fill-slate-400"
                                    d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                                />
                            </svg>
                            <svg
                                onClick={() => swithTheme()}
                                className="hidden dark:block"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className="fill-slate-400"
                                    d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                                />
                                <path
                                    className="fill-slate-500"
                                    d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                                />
                            </svg>
                        </label>
                    </div>
                    {/* Для мобилки */}
                    <div className="flex gap-3 lg:hidden z-50">
                        <div className="flex flex-row justify-center ml-2">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => {
                                    window.scrollTo({ top: 0 });
                                    setSearchMenuOpen(true);
                                }}
                            >
                                <span className="sr-only">Open search</span>
                                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => {
                                window.scrollTo({ top: 0 });
                                setMobileMenuOpen(true);
                            }}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-4 w-6"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_721_30841)">
                                    <path
                                        d="M0 1H16M0 8H8M0 15H16"
                                        stroke="#2F2F38"
                                        strokeOpacity="0.85"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_721_30841">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
                        </button>
                        <div className="flex flex-row justify-center ml-2">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md pr-2.5 text-gray-700"
                                onClick={() => {
                                    window.scrollTo({ top: 0 });
                                    setSupportMenuOpen(true);
                                }}
                            >
                                <span className="sr-only">Open support menu</span>
                                <svg
                                    className="w-6 h-4"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.8544 6.72431C14.7943 6.69619 14.7556 6.63763 14.7541 6.57279C14.7541 2.94274 11.7296 0 7.99858 0C4.26759 0 1.24302 2.94274 1.24302 6.57279C1.24192 6.63788 1.20349 6.69691 1.14347 6.72569C0.465372 7.02014 0.0208316 7.66676 0 8.38895V10.4646C0.0702312 11.5767 1.04872 12.4259 2.19236 12.3672H3.85209C4.14664 12.3672 4.38542 12.1349 4.38542 11.8483V7.00521C4.38542 6.71862 4.14664 6.4863 3.85209 6.4863H2.86293C2.81359 6.48668 2.76636 6.46684 2.7328 6.43165C2.69949 6.39634 2.6823 6.34942 2.68516 6.30157C2.87387 3.58082 5.19724 1.46773 8 1.46773C10.8028 1.46773 13.1261 3.58082 13.3148 6.30157C13.3177 6.34942 13.3005 6.39634 13.2672 6.43165C13.2334 6.46656 13.1863 6.48634 13.1371 6.4863H12.1479C11.8534 6.4863 11.6146 6.71862 11.6146 7.00521V11.8483C11.6146 12.1349 11.8534 12.3672 12.1479 12.3672H12.8C12.8982 12.3672 12.9778 12.4447 12.9778 12.5402C12.9778 13.3044 12.341 13.9239 11.5556 13.9239H10.3893C10.3301 13.9239 10.2748 13.8954 10.2414 13.8478C9.89353 13.3408 9.24561 13.1151 8.646 13.2919C8.04639 13.4688 7.63636 14.0065 7.63636 14.6161C7.63636 15.2258 8.04639 15.7635 8.646 15.9404C9.24561 16.1172 9.89353 15.8915 10.2414 15.3845C10.2747 15.3367 10.33 15.308 10.3893 15.3077H11.5556C13.1265 15.3077 14.4 14.0686 14.4 12.5402V12.4191C14.3999 12.3433 14.4507 12.2762 14.5252 12.2537C15.3675 12.0376 15.966 11.3115 16 10.4646V8.38895C15.9788 7.66593 15.5334 7.01876 14.8544 6.72431Z"
                                        fill="#2F2F38"
                                        fillOpacity="0.85"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <Transition show={isMobileMenuOpen} appear as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={() => setMobileMenuOpen(false)}>
                    {/* <Transition.Child
                        as={Fragment}
                        // enter="ease-out duration-300"
                        // enterFrom="opacity-0"
                        // enterTo="opacity-100"
                        // leave="ease-in duration-200"
                        // leaveFrom="opacity-100"
                        // leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-10 top-16" />
                    </Transition.Child> */}
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="top-0 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex flex-row w-full">
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.9998 6L8.70696 11.2929C8.31643 11.6834 8.31643 12.3166 8.70696 12.7071L13.9998 18"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                                <div className="flex w-full -ml-2.5">
                                    <span className="text-center w-full font-medium">Меню</span>
                                </div>
                            </div>
                            <div className=" flow-root">
                                <div className="divide-y divide-gray-500/10">
                                    <div className="flex flex-col py-4 gap-y-5">
                                        <button
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            onClick={() => swithTheme()}
                                        >
                                            <SunIcon className="dark:hidden h-7 w-7" />
                                            <MoonIcon className="hidden dark:block h-7 w-7" />
                                            {locale?.Header?.SwithTheme}
                                        </button>
                                        <Link
                                            className="text-base leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            href="tel:+7-708-08-08-999"
                                            target="_blank"
                                        >
                                            <PhoneIcon className="h-7 w-7" />
                                            <div className="flex flex-col">
                                                <span className="font-semibold">+7-708-08-08-999</span>
                                                <span className="text-gray-400 font-normal">Служба поддержки</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            href="https://www.instagram.com/kazticket.kz"
                                            target="_blank"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-7 w-7"
                                                fill="currentColor"
                                                style={{ color: '#c13584' }}
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                            Instagram
                                        </Link>
                                        <Link
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            href="https://t.me/kazticketkz"
                                            target="_blank"
                                        >
                                            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z" />
                                            </svg>
                                            Telegram
                                        </Link>
                                        <Link
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            href="https://www.tiktok.com/@kazticket.kz"
                                            target="_blank"
                                        >
                                            <svg
                                                className="h-7 w-7"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                                                />
                                            </svg>
                                            TikTok
                                        </Link>
                                        <Link
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            href="https://www.linkedin.com/company/kazticket-kz"
                                            target="_blank"
                                        >
                                            <svg
                                                className="w-7 h-7"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                                            </svg>
                                            LinkedIn
                                        </Link>
                                        <Link
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                            href="https://www.linkedin.com/company/kazticket-kz"
                                            target="_blank"
                                        >
                                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.25 16.996h-2.134c-1.205 0-1.409-.687-2.401-1.679-.897-.897-1.395-.209-1.374 1.068.006.339-.161.611-.566.611-1.264 0-3.08.178-4.918-1.806-1.883-2.033-3.857-6.111-3.857-6.513 0-.237.196-.344.524-.344h2.17c.574 0 .623.284.783.649.667 1.521 2.265 4.574 2.69 2.87.244-.978.344-3.245-.703-3.44-.594-.11.452-.746 1.968-.746.377 0 .786.041 1.205.137.769.179.771.523.761 1.026-.039 1.903-.269 3.184.233 3.507.479.31 1.739-1.717 2.403-3.281.183-.433.219-.722.734-.722h2.654c1.39 0-.182 1.997-1.383 3.557-.968 1.255-.916 1.28.209 2.324.803.744 1.75 1.76 1.75 2.336.002.272-.21.446-.748.446z" />
                                            </svg>
                                            ВКонтакте
                                        </Link>
                                    </div>
                                    <div className="flex flex-col py-4 gap-y-5">
                                        {pages.map((x) => {
                                            return (
                                                <Link
                                                    href={x.url}
                                                    key={x.url}
                                                    className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                                >
                                                    {x.icon}
                                                    {x.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <Transition show={isSearchMenuOpen} appear as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={() => setMobileMenuOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="top-0 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex flex-row w-full">
                                <SearchBox locale={locale} cities={cities} />
                                <button
                                    type="button"
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setSearchMenuOpen(false)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <Transition show={isSupportMenuOpen} appear as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={() => setSupportMenuOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="top-0 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex flex-col w-full gap-5">
                                <div className="flex flex-row w-full">
                                    <button
                                        type="button"
                                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                        onClick={() => setSupportMenuOpen(false)}
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.9998 6L8.70696 11.2929C8.31643 11.6834 8.31643 12.3166 8.70696 12.7071L13.9998 18"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                    <div className="flex w-full -ml-2.5">
                                        <span className="text-center w-full font-medium">Служба поддержки</span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <Link
                                        className="text-base leading-6 text-[#0490C3] dark:text-white flex gap-x-2 items-center"
                                        href="tel:+7-708-08-08-999"
                                        target="_blank"
                                    >
                                        <span>+7-708-08-08-999</span>
                                    </Link>
                                    <Link
                                        className="text-base leading-6 text-[#0490C3] dark:text-white flex gap-x-2 items-center"
                                        href="https://wa.me/77080808999"
                                        target="_blank"
                                    >
                                        <span>WhatsApp</span>
                                    </Link>
                                    <div className="flex gap-1">
                                        <span className="text-black dark:text-white">Почта: </span>
                                        <Link
                                            className="text-base leading-6 text-[#0490C3] dark:text-white flex gap-x-2 items-center"
                                            href="mailto:support@kazticket.kz"
                                            target="_blank"
                                        >
                                            <span>support@kazticket.kz</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
            {/* <PushNotificationRequest /> */}
        </header>
    );
};

export default Header;
