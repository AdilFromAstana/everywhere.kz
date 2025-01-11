import { Dialog, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, MapPinIcon, MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { isEmpty } from '@/functions';

interface IMobileHeader {
    isMobileMenuOpen: any;
    Fragment: any;
    setMobileMenuOpen: any;
    langs: any;
    selectedLang: any;
    locale: any;
    handleSelectLang: any;
    selectedCity: any;
    cities: any;
    handleSelectCity: any;
    swithTheme: any;
    token: any;
}

const MobileHeader: React.FC<IMobileHeader> = ({
    isMobileMenuOpen,
    Fragment,
    setMobileMenuOpen,
    langs,
    selectedLang,
    locale,
    handleSelectLang,
    selectedCity,
    cities,
    handleSelectCity,
    swithTheme,
    token,
}) => {
    return (
        <Transition show={isMobileMenuOpen} appear as={Fragment}>
            <Dialog as="div" className="md:hidden" onClose={() => setMobileMenuOpen(false)}>
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
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
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
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <div className="flex w-full -ml-2.5">
                                <span className="text-center w-full font-medium dark:text-white">Меню</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:gap-8 gap-4 py-4">
                            <div className="flex flex-row w-full justify-center">
                                {langs.map((lang: any) => (
                                    <div
                                        key={lang.key}
                                        onClick={() => handleSelectLang(lang)}
                                        className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg text-black p-3 text-sm leading-6 hover:bg-gray-50 ${
                                            lang.key === selectedLang?.key
                                                ? 'bg-[#F5F5F5] text-[#0490C3] dark:bg-[#F5F5F5] text-black'
                                                : 'dark:text-white'
                                        }`}
                                    >
                                        {lang.text}
                                        <span className="absolute z-50 inset-0" />
                                    </div>
                                ))}
                            </div>
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
                                            {cities.map((city: any) => (
                                                <div
                                                    key={city.id}
                                                    onClick={() => handleSelectCity(city)}
                                                    className={`group cursor-pointer relative flex items-center gap-x-6 rounded-lg dark:text-white text-black p-3 text-sm leading-6 hover:bg-gray-50 ${
                                                        city.id === selectedCity?.id
                                                            ? 'bg-[#F5F5F5] text-[#0490C3]'
                                                            : 'dar:text-black'
                                                    }`}
                                                >
                                                    {city.nameRu}
                                                </div>
                                            ))}
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                            <div className="text-lg font-medium dark:text-white">EVERYWHERE.KZ</div>
                            {token ? (
                                <div className="flex flex-col gap-4">
                                    <div className={`dark:text-white text-black`}>
                                        <Link className="block" href="/announcement/create">
                                            {locale.Common.CreateAnnouncement}
                                        </Link>
                                    </div>
                                    <div className={`dark:text-white text-black`}>
                                        <div className="flex-auto">
                                            <Link className="block" href="/announcement/list">
                                                {locale.Header.Nav.MyAnnouncements}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`dark:text-white text-black`}>
                                        <div className="flex-auto">
                                            <Link className="block" href="/profile">
                                                {locale.Header.Nav.Settings}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`dark:text-white text-black`}>
                                        <div
                                            className="block"
                                            onClick={() => {
                                                document.cookie =
                                                    'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                                                window.location.href = '/';
                                            }}
                                        >
                                            {locale.Header.Nav.Exit}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={'/auth'}
                                    className="flex items-center gap-x-1 text-base font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span>{locale.Header.Nav.Enter}</span>
                                </Link>
                            )}
                            <button
                                className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex gap-x-2 items-center"
                                onClick={() => swithTheme()}
                            >
                                <SunIcon className="hidden dark:block h-7 w-7" />
                                <MoonIcon className="dark:hidden h-7 w-7" />
                                {locale?.Header?.SwithTheme}
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};
export default MobileHeader;
