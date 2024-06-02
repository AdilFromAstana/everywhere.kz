'use client';

import { Combobox, Transition } from '@headlessui/react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { CheckToken } from '@/functions/AxiosHandlers';
import { City } from '@/types/City';
import { EventInList } from '@/types/EventInList';
import EventDateInfo from './EventDateInfo';

interface SearchBoxProps {
    cities: City[];
    locale: any;
}

const SearchBox = ({ cities, locale }: SearchBoxProps) => {
    const [selectedPerson, setSelectedPerson] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<any>([]);
    const [IsLoaded, SetIsLoaded] = useState<boolean>(true);
    const UserLang = getCookie('UserLang');

    const GetEvents = async (eventName: string) => {
        if (eventName.length < 2) {
            setFilteredEvents([]);
        } else {
            SetIsLoaded(false);
            await GetEventsByName(eventName, cities)
                .then((result: any) => {
                    setFilteredEvents(result);
                })
                .catch((err) => {
                    console.log('Not found events: ', err);
                })
                .finally(() => {
                    SetIsLoaded(true);
                });
        }
    };

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <div className="lg:relative w-full lg:mx-2 z-50">
                <div className="lg:relative w-full flex flex-row border-[#EDEDED] border-solid border-[1px] items-center cursor-default overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm px-1">
                    <svg
                        width="20"
                        height="20"
                        className="mx-1 text-[#2F2F38] dark:text-white"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_200_1089)">
                            <path
                                d="M8.84236 15.684C10.3605 15.6837 11.8349 15.1755 13.0307 14.2403L16.7906 18L18 16.7907L14.2401 13.031C15.1758 11.8351 15.6844 10.3604 15.6847 8.84199C15.6847 5.06949 12.6151 2 8.84236 2C5.06965 2 2 5.06949 2 8.84199C2 12.6145 5.06965 15.684 8.84236 15.684ZM8.84236 3.7105C11.6725 3.7105 13.9741 6.01197 13.9741 8.84199C13.9741 11.672 11.6725 13.9735 8.84236 13.9735C6.01219 13.9735 3.71059 11.672 3.71059 8.84199C3.71059 6.01197 6.01219 3.7105 8.84236 3.7105Z"
                                fill="currentColor"
                                fillOpacity="0.45"
                            />
                            <path
                                d="M10.05 7.6323C10.3742 7.95729 10.5529 8.38663 10.5529 8.84162H12.2635C12.2643 8.39213 12.1759 7.94694 12.0036 7.5318C11.8312 7.11665 11.5783 6.73978 11.2594 6.42298C9.9645 5.12984 7.71935 5.12984 6.42529 6.42298L7.63297 7.63401C8.28299 6.98573 9.40343 6.98744 10.05 7.6323Z"
                                fill="currentColor"
                                fillOpacity="0.45"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_200_1089">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <Combobox.Input
                        placeholder="Поиск по событиям"
                        className="w-full border-none py-2 pr-10 bg-white dark:bg-black text-sm leading-5 text-gray-900 dark:text-white focus-visible:outline-none"
                        displayValue={(event: any) => event.name}
                        onChange={async (event) => await GetEvents(event.target.value)}
                    />
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setFilteredEvents([])}
                >
                    <Combobox.Options className="absolute mt-1 lg:max-h-96 max-h-fit lg:left-auto left-0 w-full overflow-auto rounded-md bg-white lg:pb-1 pb-16 text-base lg:shadow-lg lg:ring-1 lg:ring-black/5 focus:outline-none sm:text-sm">
                        {!IsLoaded ? (
                            <>
                                <div className="w-full flex justify-center py-5" role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </>
                        ) : filteredEvents.length === 0 ? (
                            <div className="relative cursor-default w-full select-none px-4 py-2 text-gray-700">
                                {locale.Search.NotFound}
                            </div>
                        ) : (
                            <>
                                <div className="px-4 mt-2 mb-4 text-[#2F2F3873]">
                                    <span className="text-[#2F2F3873]">Найдено {filteredEvents.length} результат</span>
                                </div>
                                {filteredEvents.map((event: any) => (
                                    <Link
                                        key={event.id}
                                        href={event.isEventum ? `/e/${event.code}` : `/event/${event.code}`}
                                    >
                                        <Combobox.Option
                                            key={event.id}
                                            className="flex gap-2 justify-between w-full relative cursor-pointer select-none py-2 px-4 text-gray-900 hover:bg-[#0000000d]"
                                            value={event.name}
                                        >
                                            <Image
                                                width={200}
                                                height={200}
                                                alt={event.name}
                                                src={event.posterFileUrl}
                                                className="rounded-xl w-1/3 object-contain h-fit"
                                            />
                                            <div className="flex flex-col gap-2 w-3/5">
                                                <span className="text-base lg:text-xl font-medium">{event.name}</span>
                                                <span className="lg:text-xl text-xs font-normal items-center flex flex-row gap-1">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M5.25 4.66624V11.6662M8.75 2.3329V9.3329M2.70677 2.54688L4.50312 4.04384C4.93577 4.40438 5.56423 4.40438 5.99688 4.04383L8.00312 2.37197C8.43577 2.01143 9.06423 2.01143 9.49688 2.37197L11.8302 4.31642C12.0962 4.53808 12.25 4.86643 12.25 5.21267V11.0041C12.25 11.4987 11.6732 11.7689 11.2932 11.4523L9.49688 9.9553C9.06423 9.59476 8.43577 9.59476 8.00312 9.9553L5.99688 11.6272C5.56423 11.9877 4.93577 11.9877 4.50312 11.6272L2.16978 9.68272C1.90379 9.46106 1.75 9.13271 1.75 8.78647V2.99501C1.75 2.50044 2.32683 2.23026 2.70677 2.54688Z"
                                                            stroke="#2F2F38"
                                                            strokeOpacity="0.45"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <span className="text-[#2F2F3873]">{event.cityName}</span>
                                                </span>
                                                <span className="lg:text-xl text-xs font-normal items-center flex flex-row gap-1">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M1.75 5.83366H12.25M4.66667 3.50033V1.16699M9.33333 3.50033V1.16699M5.48333 12.8337H8.51667C9.82346 12.8337 10.4769 12.8337 10.976 12.5793C11.415 12.3556 11.772 11.9987 11.9957 11.5596C12.25 11.0605 12.25 10.4071 12.25 9.10033V6.06699C12.25 4.7602 12.25 4.10681 11.9957 3.60768C11.772 3.16864 11.415 2.81168 10.976 2.58798C10.4769 2.33366 9.82346 2.33366 8.51667 2.33366H5.48333C4.17654 2.33366 3.52315 2.33366 3.02402 2.58798C2.58498 2.81168 2.22802 3.16864 2.00432 3.60768C1.75 4.10681 1.75 4.7602 1.75 6.06699V9.10032C1.75 10.4071 1.75 11.0605 2.00432 11.5596C2.22802 11.9987 2.58498 12.3556 3.02402 12.5793C3.52315 12.8337 4.17654 12.8337 5.48333 12.8337Z"
                                                            stroke="#2F2F38"
                                                            strokeOpacity="0.45"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <span className="text-[#2F2F3873]">
                                                        <EventDateInfo
                                                            UserLang={UserLang}
                                                            cityTimeZone={event.isEventum ? 6 : event.cityTimeZone}
                                                            date={event.beginDate}
                                                        />
                                                    </span>
                                                </span>
                                                <span className="lg:text-xl text-xs font-normal items-center flex flex-row gap-1">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M1.80368 10.3728L2.03067 9.92734L2.03067 9.92734L1.80368 10.3728ZM1.29382 9.86299L0.84832 10.09H0.84832L1.29382 9.86299ZM12.8331 8.98348L13.333 8.98545L12.8331 8.98348ZM12.7062 9.86299L13.1517 10.09L13.1517 10.09L12.7062 9.86299ZM12.1963 10.3728L12.4233 10.8183V10.8183L12.1963 10.3728ZM12.1963 3.62716L12.4233 3.18166V3.18166L12.1963 3.62716ZM12.7062 4.13701L13.1517 3.91002V3.91001L12.7062 4.13701ZM1.80368 3.62716L2.03067 4.07266L2.03067 4.07266L1.80368 3.62716ZM1.29382 4.13701L1.73933 4.36401L1.73933 4.36401L1.29382 4.13701ZM12.6006 8.73465L12.5347 9.2303L12.5347 9.2303L12.6006 8.73465ZM12.6005 5.26536L12.6664 5.761L12.6005 5.26536ZM12.8326 5.01638L12.3327 5.02004V5.02004L12.8326 5.01638ZM12.7657 5.22977L13.0338 5.6518V5.6518L12.7657 5.22977ZM12.8202 5.167L12.365 4.96015L12.365 4.96018L12.8202 5.167ZM12.8202 8.83269L13.2749 8.62479L13.2749 8.62478L12.8202 8.83269ZM12.7656 8.77016L12.498 9.19247L12.498 9.19248L12.7656 8.77016ZM9.83333 3.5C9.83333 3.22386 9.60947 3 9.33333 3C9.05719 3 8.83333 3.22386 8.83333 3.5H9.83333ZM8.83333 10.5C8.83333 10.7761 9.05719 11 9.33333 11C9.60947 11 9.83333 10.7761 9.83333 10.5H8.83333ZM3.5 5.33333C3.22386 5.33333 3 5.55719 3 5.83333C3 6.10948 3.22386 6.33333 3.5 6.33333V5.33333ZM7 6.33333C7.27614 6.33333 7.5 6.10948 7.5 5.83333C7.5 5.55719 7.27614 5.33333 7 5.33333V6.33333ZM3.5 7.66667C3.22386 7.66667 3 7.89052 3 8.16667C3 8.44281 3.22386 8.66667 3.5 8.66667V7.66667ZM7 8.66667C7.27614 8.66667 7.5 8.44281 7.5 8.16667C7.5 7.89052 7.27614 7.66667 7 7.66667V8.66667ZM3.03333 4H10.9667V3H3.03333V4ZM10.9667 10H3.03333V11H10.9667V10ZM3.03333 10C2.69838 10 2.47724 9.99961 2.30778 9.98577C2.14416 9.9724 2.07322 9.94902 2.03067 9.92734L1.57668 10.8183C1.7837 10.9238 2.00089 10.964 2.22635 10.9824C2.44598 11.0004 2.71488 11 3.03333 11V10ZM0.666664 8.75C0.666664 9.3589 0.654615 9.70982 0.84832 10.09L1.73933 9.63599C1.67871 9.51703 1.66666 9.44789 1.66666 8.75H0.666664ZM2.03067 9.92734C1.90523 9.86342 1.80324 9.76143 1.73933 9.63599L0.84832 10.09C1.00811 10.4036 1.26308 10.6586 1.57668 10.8183L2.03067 9.92734ZM12.3331 8.98151C12.3311 9.46707 12.3102 9.53877 12.2607 9.63599L13.1517 10.09C13.3234 9.75299 13.3312 9.45031 13.333 8.98545L12.3331 8.98151ZM10.9667 11C11.2851 11 11.554 11.0004 11.7736 10.9824C11.9991 10.964 12.2163 10.9238 12.4233 10.8183L11.9693 9.92734C11.9268 9.94902 11.8558 9.9724 11.6922 9.98577C11.5228 9.99961 11.3016 10 10.9667 10V11ZM12.2607 9.63599C12.1968 9.76144 12.0948 9.86342 11.9693 9.92734L12.4233 10.8183C12.7369 10.6586 12.9919 10.4036 13.1517 10.09L12.2607 9.63599ZM10.9667 4C11.3016 4 11.5228 4.00039 11.6922 4.01423C11.8558 4.0276 11.9268 4.05098 11.9693 4.07266L12.4233 3.18166C12.2163 3.07618 11.9991 3.03598 11.7736 3.01756C11.554 2.99961 11.2851 3 10.9667 3V4ZM11.9693 4.07266C12.0948 4.13658 12.1968 4.23856 12.2607 4.36401L13.1517 3.91001C12.9919 3.59641 12.7369 3.34145 12.4233 3.18166L11.9693 4.07266ZM3.03333 3C2.71488 3 2.44598 2.99961 2.22635 3.01756C2.00089 3.03598 1.7837 3.07618 1.57668 3.18166L2.03067 4.07266C2.07322 4.05098 2.14416 4.0276 2.30778 4.01423C2.47724 4.00039 2.69838 4 3.03333 4V3ZM1.66666 5.25C1.66666 4.55211 1.67871 4.48297 1.73933 4.36401L0.84832 3.91002C0.654615 4.29018 0.666664 4.6411 0.666664 5.25H1.66666ZM1.57668 3.18166C1.26308 3.34144 1.00811 3.59641 0.84832 3.91002L1.73933 4.36401C1.80324 4.23856 1.90523 4.13658 2.03067 4.07266L1.57668 3.18166ZM12.6664 8.23901C12.0552 8.15777 11.5833 7.63358 11.5833 7H10.5833C10.5833 8.14157 11.433 9.08388 12.5347 9.2303L12.6664 8.23901ZM11.5833 7C11.5833 6.36644 12.0551 5.84226 12.6664 5.761L12.5346 4.76972C11.433 4.91618 10.5833 5.85846 10.5833 7H11.5833ZM13.3326 5.01271C13.3295 4.58469 13.3178 4.23612 13.1517 3.91002L12.2607 4.36401C12.3041 4.44925 12.3293 4.56286 12.3327 5.02004L13.3326 5.01271ZM1.66666 8.75V5.25H0.666664V8.75H1.66666ZM12.6664 5.761C12.7058 5.75575 12.7588 5.74894 12.8043 5.73996C12.8463 5.73167 12.9395 5.7117 13.0338 5.6518L12.4976 4.80773C12.5336 4.78485 12.5649 4.77265 12.5833 4.76652C12.5926 4.76341 12.5998 4.76147 12.6041 4.76041C12.6062 4.75986 12.6079 4.75948 12.609 4.75925C12.6095 4.75913 12.6099 4.75904 12.6101 4.75899C12.6104 4.75893 12.6106 4.75891 12.6106 4.75891C12.6106 4.7589 12.6105 4.75893 12.6102 4.75897C12.61 4.75902 12.6096 4.75908 12.6092 4.75916C12.6082 4.75933 12.6068 4.75957 12.605 4.75987C12.6013 4.76048 12.5963 4.76125 12.5896 4.76223C12.5754 4.76428 12.5584 4.76654 12.5346 4.76972L12.6664 5.761ZM12.3327 5.02004C12.3328 5.04125 12.3329 5.05528 12.3328 5.06684C12.3328 5.07846 12.3325 5.08124 12.3327 5.07944C12.3328 5.07766 12.3336 5.06432 12.3376 5.04454C12.3418 5.02346 12.3497 4.99383 12.365 4.96015L13.2755 5.37384C13.3188 5.27834 13.3276 5.19069 13.3307 5.14267C13.3335 5.09701 13.3329 5.0459 13.3326 5.01271L12.3327 5.02004ZM13.0338 5.6518C13.1417 5.58323 13.2226 5.49024 13.2755 5.37382L12.365 4.96018C12.3746 4.93909 12.3919 4.90764 12.4206 4.87465C12.4493 4.84166 12.478 4.82015 12.4976 4.80773L13.0338 5.6518ZM13.333 8.98545C13.3332 8.95213 13.3337 8.90108 13.3306 8.85552C13.3275 8.80778 13.3185 8.72015 13.2749 8.62479L12.3655 9.0406C12.3501 9.00688 12.342 8.97725 12.3378 8.95629C12.3338 8.93663 12.333 8.92338 12.3328 8.92171C12.3327 8.92 12.333 8.92287 12.3331 8.93455C12.3332 8.94617 12.3331 8.96026 12.3331 8.98151L13.333 8.98545ZM12.5347 9.2303C12.5585 9.23347 12.5755 9.23573 12.5897 9.23778C12.5964 9.23876 12.6014 9.23953 12.6052 9.24014C12.607 9.24044 12.6083 9.24068 12.6093 9.24085C12.6098 9.24093 12.6101 9.241 12.6104 9.24104C12.6106 9.24109 12.6107 9.24111 12.6107 9.24111C12.6107 9.24111 12.6106 9.24109 12.6103 9.24103C12.6101 9.24098 12.6097 9.24089 12.6092 9.24078C12.6081 9.24055 12.6065 9.24017 12.6043 9.23963C12.6001 9.23857 12.5929 9.23665 12.5836 9.23356C12.5653 9.22747 12.534 9.21531 12.498 9.19247L13.0333 8.34785C12.9391 8.28814 12.846 8.26825 12.8042 8.26C12.7588 8.25105 12.7058 8.24425 12.6664 8.23901L12.5347 9.2303ZM13.2749 8.62478C13.2218 8.5087 13.1411 8.41617 13.0333 8.34784L12.498 9.19248C12.4787 9.18028 12.4499 9.15886 12.4211 9.12581C12.3923 9.09276 12.375 9.06134 12.3655 9.04061L13.2749 8.62478ZM8.83333 3.5V10.5H9.83333V3.5H8.83333ZM3.5 6.33333H7V5.33333H3.5V6.33333ZM3.5 8.66667H7V7.66667H3.5V8.66667Z"
                                                            fill="#2F2F38"
                                                            fillOpacity="0.45"
                                                        />
                                                    </svg>
                                                    <span className="text-[#2F2F3873]">от {event.minCost} тг.</span>
                                                </span>
                                            </div>
                                        </Combobox.Option>
                                    </Link>
                                ))}
                            </>
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};
export default SearchBox;

async function GetEventsByName(eventName: string, cities: City[]) {
    if (eventName.length < 2) return [];

    let events: any = [];

    const token = await CheckToken();

    const UserLang = getCookie('UserLang');
    let acceptLanguage = 'ru-RU';
    switch (UserLang?.toLocaleLowerCase()) {
        case 'kk':
            acceptLanguage = 'kz-KZ';
            break;
        case 'en':
            acceptLanguage = 'en-US';
            break;
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const KazticketUrl = `${process.env.NEXT_PUBLIC_EVENTS_URL}commercial/Events?Name=${eventName ?? ''}`;
    const EventumUrl = `${process.env.NEXT_PUBLIC_SERVICES_TEMP_URL}eventum/forCommerce?Name=${eventName ?? ''}`;

    const kazticketEventsResponse = await fetch(KazticketUrl, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!kazticketEventsResponse.ok) {
        console.log('kazticketEventsResponse: ', kazticketEventsResponse);
        // This will activate the closest `error.js` Error Boundary
        return [];
    }

    const kazticketEvents = await kazticketEventsResponse.json();

    if (kazticketEvents.items) {
        const exclusiveEvents = ['alau-massskating', 'oasis-beach-club', 'pecha-kucha'];

        const sortedData = kazticketEvents.items?.sort((eventA: any, eventB: any) => {
            const dateA = new Date(eventA?.beginDate) as any;
            const dateB = new Date(eventB?.beginDate) as any;
            return dateA - dateB;
        });

        events = [
            ...sortedData?.filter((x: EventInList) => exclusiveEvents.includes(x.code)),
            ...sortedData?.filter((x: EventInList) => !exclusiveEvents.includes(x.code)),
        ];
    }

    const eventumEventsResponse = await fetch(EventumUrl, {
        headers: {
            'Accept-Language': acceptLanguage,
            'Content-Type': 'application/json',
        },
    });

    if (!eventumEventsResponse.ok) {
        console.log('eventumEventsResponse: ', eventumEventsResponse);
        // This will activate the closest `error.js` Error Boundary
    }

    const eventumEvents = await eventumEventsResponse.json();
    eventumEvents.forEach((x: any) => {
        const cityName = cities.find((city) => city.id === x.CityId);

        let eventName = x.NameRu;
        switch (UserLang?.toLocaleLowerCase()) {
            case 'kk':
                eventName = x.NameKz;
                break;
            case 'en':
                eventName = x.NameEn;
                break;
        }

        events.push({
            ageLimit: x.AgeLimit,
            beginDate: x.Date,
            cityId: x.CityId,
            cityName: cityName?.name,
            code: x.Code,
            id: x.Id,
            isEventum: true,
            leisureCategoryId: x.LeisureCategoryId,
            minCost: x.MinCost,
            name: eventName,
            posterFileUrl: x.Poster,
        });
    });

    return events;
}
