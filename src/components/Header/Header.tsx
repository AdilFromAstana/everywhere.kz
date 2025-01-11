'use client';

import { Dialog, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, MapPinIcon, MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import Logo from '@/assets/logo.svg';
import WhiteMonoLogo from '@/assets/white-logo.svg';
import { isEmpty } from '@/functions';
import Dropdown from '@/interfaces/Dropdown';
import { City } from '@/types/City';
import { LookingForValues } from '@/types/LookingForValues';
import MobileHeader from './MobileHeader';

interface HeaderProps {
    cities: City[];
    langs: any[];
    selectedCity: any;
    lookingFor: LookingForValues;
    selectedLang: any;
    locale: any;
    pages: any[];
    token: any;
}

const Header: React.FC<HeaderProps> = ({ locale, selectedCity, cities, langs, selectedLang, token, lookingFor }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const UserLang = getCookie('UserLang');
        const ViewedAnnouncementPhones = getCookie('ViewedAnnouncementPhones');
        const ViewedAnnouncements = getCookie('ViewedAnnouncements');
        const UserCity = getCookie('UserCity') ?? 'astana';
        const LookingFor: LookingForValues = getCookie('LookingFor') || 'advertiser';

        if (isEmpty(UserCity)) {
            setCookie('UserCity', 'astana', {
                maxAge: 60 * 60 * 24 * 365,
            });
        }
        if (isEmpty(UserLang)) {
            setCookie('UserLang', 'Ru', {
                maxAge: 60 * 60 * 24 * 365,
            });
        }
        if (isEmpty(ViewedAnnouncements)) {
            setCookie('ViewedAnnouncements', JSON.stringify([]), {
                maxAge: 60 * 60 * 24 * 1,
            });
        }
        if (isEmpty(ViewedAnnouncementPhones)) {
            setCookie('ViewedAnnouncementPhones', JSON.stringify([]), {
                maxAge: 60 * 60 * 24 * 1,
            });
        }
        if (isEmpty(LookingFor)) {
            setCookie('LookingFor', 'advertiser', {
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

    const handleSelectCity = (city: Dropdown) => {
        if (selectedCity?.code !== city.code) {
            setCookie('UserCity', city.code, {
                maxAge: 60 * 60 * 24 * 365,
            });
            location.reload();
        }
    };

    const handleSelectLang = (lang: any) => {
        if (selectedLang.key !== lang) {
            setCookie('UserLang', lang, {
                maxAge: 60 * 60 * 24 * 365,
            });
            location.reload();
        }
    };

    const handleLookingForValue = (value: LookingForValues) => {
        if (value !== lookingFor) {
            setCookie('LookingFor', value, {
                maxAge: 60 * 60 * 24 * 365,
            });
            window.location.href = '/';
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

    const getCurrentLookingForTitle = () => {
        if (lookingFor === 'promoter') {
            return locale.Header.LookingForPromoter;
        } else {
            return locale.Header.LookingForAdvertiser;
        }
    };

    const lookingForArray = [
        { title: locale.Header.LookingForPromoter, value: 'promoter', key: 'promoter' },
        { title: locale.Header.LookingForAdvertiser, value: 'advertiser', key: 'advertiser' },
    ];

    return (
        <header className={`container mx-auto md:px-0 px-4 md:py-0 py-2 ${pathname === '/auth' ? 'hidden' : 'block'}`}>
            <nav className="flex items-center justify-between md:py-4" aria-label="Global">
                <div className="flex z-50">
                    <Image
                        onClick={() => {
                            router.push('/');
                        }}
                        src={isDarkMode ? WhiteMonoLogo : Logo}
                        alt="Kazticket.kz Logo"
                        className="md:h-20 h-14 w-auto cursor-pointer"
                        priority
                    />
                </div>
                <Popover className="relative md:hidden flex">
                    <Popover.Button className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white">
                        {getCurrentLookingForTitle()}
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
                        <Popover.Panel className="absolute z-[100] -right-16 top-full mt-3 w-screen max-w-xs max-h-96 overflow-auto rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-2">
                                {lookingForArray.map((l) => {
                                    return (
                                        <div
                                            key={l.key}
                                            onClick={() => handleLookingForValue(l.value)}
                                            className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg text-black p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                lookingFor === l.value ? 'bg-[#F5F5F5] text-[#0490C3]' : 'text-black'
                                            }`}
                                        >
                                            <div className="flex-auto">
                                                <div className="block">
                                                    {l.title}
                                                    <span className="absolute z-50 inset-0" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <div className="flex z-50">
                    <div className="hidden md:flex md:gap-x-12 md:items-center md:justify-end">
                        {[
                            {
                                key: 'lookingFor',
                                buttonContent: getCurrentLookingForTitle(),
                                items: lookingForArray,
                                handleSelect: handleLookingForValue,
                            },
                            {
                                key: 'city',
                                buttonContent: (
                                    <>
                                        <MapPinIcon className="h-5 w-5" />
                                        {isEmpty(selectedCity) ? locale?.Header?.City : selectedCity?.nameRu}
                                    </>
                                ),
                                items: cities,
                                handleSelect: handleSelectCity,
                            },
                            {
                                key: 'language',
                                buttonContent: (
                                    <>
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
                                    </>
                                ),
                                items: langs,
                                handleSelect: handleSelectLang,
                            },
                        ].map(({ key, buttonContent, items, handleSelect }) => (
                            <Popover key={key} className="relative">
                                <Popover.Button className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white">
                                    {buttonContent}
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
                                            {items.map((item) => (
                                                <div
                                                    key={item.key || item.id}
                                                    onClick={() => handleSelect(item.value || item)}
                                                    className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg text-black p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                        (item.value ? lookingFor : item.id) ===
                                                        (item.value ? item.value : selectedCity?.id)
                                                            ? 'bg-[#F5F5F5] text-[#0490C3]'
                                                            : ''
                                                    }`}
                                                >
                                                    <div className="flex-auto">
                                                        <div className="block">
                                                            {item.title || item.nameRu || item.text}
                                                            <span className="absolute z-50 inset-0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        ))}

                        <label className="relative cursor-pointer p-2">
                            <svg
                                onClick={swithTheme}
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
                                onClick={swithTheme}
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

                        {token ? (
                            <Popover className="relative">
                                <Popover.Button className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white">
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span>{locale.Header.MyProfile}</span>
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
                                        {[
                                            { href: '/announcement/create', text: locale.Common.CreateAnnouncement },
                                            { href: '/announcement/list', text: locale.Header.Nav.MyAnnouncements },
                                            { href: '/profile', text: locale.Header.Nav.Settings },
                                        ].map(({ href, text }) => (
                                            <div
                                                key={href}
                                                className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg text-black p-3 text-sm leading-6 hover:bg-gray-50`}
                                            >
                                                <div className="flex-auto">
                                                    <Link className="block" href={href}>
                                                        {text}
                                                        <span className="absolute z-50 inset-0" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                        <div
                                            className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg text-black p-3 text-sm leading-6 hover:bg-gray-50`}
                                        >
                                            <div
                                                className="block"
                                                onClick={() => {
                                                    document.cookie =
                                                        'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                                                    window.location.href = '/';
                                                }}
                                            >
                                                {locale.Header.Nav.Exit}
                                                <span className="absolute z-50 inset-0" />
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        ) : (
                            <Link href="/auth/login" className="hidden md:block">
                                {locale.Header.Nav.SignIn}
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex gap-3 z-50">
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
                                className="h-4 w-6 text-[#2F2F38] dark:text-white"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_721_30841)">
                                    <path
                                        d="M0 1H16M0 8H8M0 15H16"
                                        stroke="currentColor"
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
                        </button>
                    </div>
                </div>
            </nav>
            <MobileHeader
                isMobileMenuOpen={isMobileMenuOpen}
                Fragment={Fragment}
                setMobileMenuOpen={setMobileMenuOpen}
                langs={langs}
                selectedLang={selectedLang}
                locale={locale}
                handleSelectLang={handleSelectLang}
                selectedCity={selectedCity}
                cities={cities}
                handleSelectCity={handleSelectCity}
                swithTheme={swithTheme}
                token={token}
            />
        </header>
    );
};

export default Header;
