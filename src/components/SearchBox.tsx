'use client';

import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { getCookie } from 'cookies-next';
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
            <div className="relative w-full mx-2 z-50">
                <div className="relative w-full flex flex-row border-[#EDEDED] border-solid border-[1px] items-center cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <MagnifyingGlassIcon className="h-7 w-7 px-1 text-gray-400" aria-hidden="true" />
                    <Combobox.Input
                        placeholder="Поиск по событиям"
                        className="w-full border-none py-2 pr-10 text-sm leading-5 text-gray-900 focus-visible:outline-none"
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
                    <Combobox.Options className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                            filteredEvents.map((event: any) => (
                                <Link
                                    key={event.id}
                                    href={event.isEventum ? `/e/${event.code}` : `/event/${event.code}`}
                                >
                                    <Combobox.Option
                                        key={event.id}
                                        className={`relative border-b-2 border-b-[#d9d9d9] cursor-pointer select-none py-2 px-4 text-gray-900 hover:bg-[#0000000d]`}
                                        value={event.name}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className="text-base lg:text-xl text-center">{event.name}</span>
                                            <span className="flex flex-row gap-2 justify-between">
                                                <span className="text-xs">
                                                    <EventDateInfo
                                                        cityTimeZone={event.isEventum ? 6 : event.cityTimeZone}
                                                        date={event.beginDate}
                                                    />
                                                </span>
                                                <span className="lg:text-xl text-xs font-normal items-center flex flex-row">
                                                    <MapPinIcon className="w-4" />
                                                    <span>{event.cityName}</span>
                                                </span>
                                            </span>
                                        </div>
                                    </Combobox.Option>
                                </Link>
                            ))
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
        case 'kz':
            acceptLanguage = 'kz-KZ';
            break;
        case 'en':
            acceptLanguage = 'en-US';
            break;
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const KazticketUrl = `${process.env.NEXT_PUBLIC_EVENTS_URL}commercial/Events?Name=${eventName ?? ''}`;
    const EventumUrl = `${process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL}eventum/forCommerce?Name=${eventName ?? ''}`;

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
        const exclusiveEvents = ['alau-massskating', 'Rixos-President-Astana', 'retro-concert'];

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
            case 'kz':
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
