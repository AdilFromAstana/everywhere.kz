'use client';

import { Dialog, Popover, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BuildingOffice2Icon,
    ChevronDownIcon,
    LanguageIcon,
    MapPinIcon,
    PhoneIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';

import WhiteMonoLogo from '@/assets/kazticket-logo-white-mono.svg';
import Logo from '@/assets/kazticket-logo-winter.svg';
// import Logo from '@/assets/kazticket-logo.svg';
import SnowImage from '@/assets/show.png';
import transitions from '@/constants/transtitions';
import { isEmpty } from '@/functions';
import { City } from '@/types/City';
import { Dropdown } from '@/types/Dropdown';

interface HeaderProps {
    cities: City[];
    langs: Dropdown[];
    selectedCity: City;
    selectedLang: Dropdown;
    locale: any;
    pages: any[];
}

const Header = ({ locale, selectedCity, cities, langs, selectedLang, pages }: HeaderProps) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [randomTransition, setRandomTransition] = useState({});
    const [isLogoAnimationOn, setIsLogoAnimationOn] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const [snowflake, setSnowflake] = useState<any>();
    const snowImages = [snowflake];

    useEffect(() => {
        const randomTransitionIndex = Math.floor(Math.random() * transitions.length);
        const random = transitions[randomTransitionIndex];
        setRandomTransition(random);

        const snowflakeImg = document?.createElement('img');
        if (snowflakeImg) {
            snowflakeImg.src = SnowImage.src;
        }
        setSnowflake(snowflakeImg);
    }, [!isEmpty(randomTransition)]);

    useEffect(() => {
        if (!isLogoAnimationOn) {
            setTimeout(() => {
                setIsLogoAnimationOn(true);
            }, 1000);
        }
    }, [isLogoAnimationOn]);

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
        <header className="bg-white dark:bg-black">
            <Snowfall
                style={{
                    zIndex: 99999,
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                }}
                snowflakeCount={350}
                speed={[0.5, 1]}
                rotationSpeed={[-2, 2]}
                wind={[-1, 1]}
                images={snowImages}
                radius={[3, 10]}
            />
            <nav className="mx-auto flex items-center justify-between my-6 px-2 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1 z-50">
                    {!isEmpty(randomTransition) ? (
                        <>
                            <Transition
                                className="Animation w-auto"
                                appear={true}
                                show={isLogoAnimationOn}
                                {...randomTransition}
                            >
                                <Image
                                    onClick={() => {
                                        if (pathname === '/') {
                                            deleteCookie('UserCategoryId');
                                            window.location.reload();
                                        } else {
                                            deleteCookie('UserCategoryId');
                                            router.push('/');
                                        }
                                    }}
                                    src={isDarkMode ? WhiteMonoLogo : Logo}
                                    alt="Kazticket.kz Logo"
                                    className="h-14 w-auto cursor-pointer"
                                    priority
                                />
                            </Transition>
                            {/* <Image
                                src={isDarkMode ? WhiteMonoLogo : Logo}
                                alt="Kazticket.kz Logo"
                                className="h-14 w-auto opacity-0"
                                priority
                            /> */}
                        </>
                    ) : (
                        <Image
                            src={isDarkMode ? WhiteMonoLogo : Logo}
                            alt="Kazticket.kz Logo"
                            className="h-14 w-auto"
                            priority
                        />
                    )}
                </div>
                <div className="flex z-50">
                    <div className="hidden lg:flex lg:gap-x-12 lg:items-center lg:justify-end">
                        <Link
                            className="text-gray-900 dark:text-white flex gap-x-2 items-center"
                            href="tel:+7-708-08-08-999"
                            target="_blank"
                        >
                            <PhoneIcon className="h-7 w-7" />
                            <div className="flex flex-col">
                                <span className="text-base leading-5 font-semibold">+7-708-08-08-999</span>
                                <span className="leading-5 text-gray-400 font-normal">{locale.Header.Support}</span>
                            </div>
                        </Link>
                        {/* <Link
                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-1 items-center"
                            href="https://www.instagram.com/kazticket.kz"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="currentColor"
                                style={{ color: '#c13584' }}
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Наш Instagram
                        </Link> */}
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900 dark:text-white">
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
                                    <div className="p-0">
                                        {cities.map((city: City) => (
                                            <div
                                                key={city.id}
                                                onClick={() => handleSelectCity(city)}
                                                className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                    city.id === selectedCity?.id ? 'bg-indigo-200' : ''
                                                }`}
                                            >
                                                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <BuildingOffice2Icon
                                                        className="h-5 w-5 text-gray-600 group-hover:text-indigo-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <div className="block font-semibold text-gray-900">
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
                            <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                <LanguageIcon className="h-5 w-5" />{' '}
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
                                    <div className="p-0">
                                        {langs.map((lang: Dropdown) => (
                                            <div
                                                key={lang.key}
                                                onClick={() => handleSelectLang(lang)}
                                                className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                    lang.key === selectedLang?.key ? 'bg-indigo-200' : ''
                                                }`}
                                            >
                                                <div className="flex-auto">
                                                    <div className="block font-semibold text-gray-900">
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
                    <div className="flex gap-2 lg:hidden z-50">
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                <MapPinIcon className="h-5 w-5" />{' '}
                                <div className="w-max">
                                    {isEmpty(selectedCity) ? locale?.Header?.City : selectedCity?.name}
                                </div>
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
                                    <div className="p-0">
                                        {cities.map((city: City) => (
                                            <div
                                                key={`${city.id}-mobile`}
                                                onClick={() => handleSelectCity(city)}
                                                className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                    city.id === selectedCity?.id ? 'bg-indigo-200' : ''
                                                }`}
                                            >
                                                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <BuildingOffice2Icon
                                                        className="h-5 w-5 text-gray-600 group-hover:text-indigo-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <div className="block font-semibold text-gray-900">
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
                            <Popover.Button className="flex items-center gap-x-0 text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                {/* <MapPinIcon className="h-5 w-5" />{' '} */}
                                {isEmpty(selectedLang) ? 'Ru' : selectedLang?.value}
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
                                    <div className="p-0">
                                        {langs.map((lang: Dropdown) => (
                                            <div
                                                key={`${lang.key}-mobile`}
                                                onClick={() => handleSelectLang(lang)}
                                                className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                    lang.key === selectedLang?.key ? 'bg-indigo-200' : ''
                                                }`}
                                            >
                                                {/* <div className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <BuildingOffice2Icon
                                                        className="h-5 w-5 text-gray-600 group-hover:text-indigo-600"
                                                        aria-hidden="true"
                                                    />
                                                </div> */}
                                                <div className="flex-auto">
                                                    <div className="block font-semibold text-gray-900">
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
                        {isMobileMenuOpen ? (
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => {
                                    window.scrollTo({ top: 0 });
                                    setMobileMenuOpen(true);
                                }}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <Transition show={isMobileMenuOpen} appear as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={() => setMobileMenuOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        // enter="ease-out duration-300"
                        // enterFrom="opacity-0"
                        // enterTo="opacity-100"
                        // leave="ease-in duration-200"
                        // leaveFrom="opacity-100"
                        // leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-10 top-16" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="top-16 fixed inset-y-0 right-0 z-0 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            {/* <div className="flex items-center justify-between">
                                <Link href="/">
                                    <Image
                                        src={isDarkMode ? WhiteMonoLogo : Logo}
                                        alt="Kazticket.kz Logo"
                                        className="h-8 w-auto"
                                        priority
                                    />
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div> */}
                            <div className=" flow-root">
                                <div className="divide-y divide-gray-500/10">
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
                                    <div className="flex flex-col py-4 gap-y-5">
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
        </header>
    );
};

export default Header;
