'use client';

import { useEffect, useState } from 'react';

import Dropdown from '@/interfaces/Dropdown';
import SortOptions from '@/interfaces/SortOptions';
import AnnouncementList from './AnnouncementList';
import MobileSearchFilter from './MobileSearchFilter';
import Pagination from './Pagination';
import SortButtons from './SortButtons';

interface AnnouncementListWrapperProps {
    lookingFor: string;
    locale: any;
    userLang: any;
}

const AnnouncementListWrapper: React.FC<AnnouncementListWrapperProps> = ({ lookingFor, locale, userLang }) => {
    const [announcementList, setAnnouncementList] = useState<any[]>([]);
    const [announcementTotalCount, setAnnouncementTotalCount] = useState<number>(0);
    const [pagesCount, setPagesCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cities, setCities] = useState<Dropdown[]>([]);
    const [businessFields, setBusinessFields] = useState<Dropdown[]>([]);
    const [adPlacements, setAdPlacements] = useState<Dropdown[]>([]);
    const [selectedCities, setSelectedCities] = useState<any[]>([]);
    const [selectedBusinessFields, setSelectedBusinessFields] = useState<any[]>([]);
    const [selectedAdPlacements, setSelectedAdPlacements] = useState<any[]>([]);
    const [sortOptions, setSortOptions] = useState<SortOptions>({ sortBy: 'date', sortOrder: 'desc' });
    const [availablePages, setAvailablePages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [prevFilters, setPrevFitlers] = useState<string>('');

    const getPageNumbers = (currentPage_: number, totalPages_: number) => {
        const isMobile = window.innerWidth <= 768;
        const maxPagesToShow = isMobile ? 3 : 5;
        const pageNumbers = [];

        let startPage, endPage;

        if (totalPages_ <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages_;
        } else {
            startPage = Math.max(1, currentPage_ - Math.floor(maxPagesToShow / 2));
            endPage = Math.min(totalPages_, currentPage_ + Math.floor(maxPagesToShow / 2));

            if (currentPage_ <= Math.ceil(maxPagesToShow / 2)) {
                endPage = Math.min(totalPages_, maxPagesToShow);
            }

            if (currentPage_ + Math.floor(maxPagesToShow / 2) >= totalPages_) {
                startPage = Math.max(1, totalPages_ - maxPagesToShow + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        setAvailablePages(pageNumbers);
    };

    const getAnnouncementList = async () => {
        setIsLoading(true);
        const isAllArraysEmpty =
            selectedCities.length === 0 && selectedAdPlacements.length === 0 && selectedBusinessFields.length === 0;
        let api = process.env.NEXT_PUBLIC_EVENTS_URL + 'announcements/getAll';
        const params = new URLSearchParams();
        params.append('announcementTypeCode', lookingFor);
        const pFitlers: {
            selectedAdPlacements: string[];
            selectedBusinessFields: string[];
            selectedCities: string[];
        } = {
            selectedAdPlacements: [],
            selectedBusinessFields: [],
            selectedCities: [],
        };

        if (!isAllArraysEmpty) {
            selectedAdPlacements.forEach((placementId: any) => {
                params.append('adPlacementCode', placementId.toString());
                pFitlers.selectedAdPlacements.push(placementId.toString());
            });
            selectedBusinessFields.forEach((fieldId) => {
                params.append('businessFieldCode', fieldId.toString());
                pFitlers.selectedBusinessFields.push(fieldId.toString());
            });
            selectedCities.forEach((cityId) => {
                params.append('cityCode', cityId.toString());
                pFitlers.selectedCities.push(cityId.toString());
            });
        }
        if (sortOptions) {
            params.append('sortBy', sortOptions.sortBy);
            params.append('sortOrder', sortOptions.sortOrder);
        }
        if (JSON.stringify(pFitlers) === prevFilters) {
            params.append('page', currentPage.toString());
        } else {
            params.append('page', '1');
            setPrevFitlers(JSON.stringify(pFitlers));
        }

        api += `?${params.toString()}`;

        try {
            const res = await fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                const er = await res.json();
                console.error('er: ', er);
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }

            const resData = await res.json();
            setAnnouncementList(resData.announcements);
            setAnnouncementTotalCount(Number(resData.total));
            setCurrentPage(Number(resData.currentPage));
            setPagesCount(Number(resData.pages));
            getPageNumbers(Number(resData.currentPage), Number(resData.pages));
        } catch (e) {
            console.error('e: ', e);
        } finally {
            setIsLoading(false);
        }
    };

    const getCities = async () => {
        const isAllArraysEmpty =
            selectedCities.length === 0 && selectedAdPlacements.length === 0 && selectedBusinessFields.length === 0;
        let api = process.env.NEXT_PUBLIC_EVENTS_URL + 'cities/getAllForAnnouncementFilter';
        const params = new URLSearchParams();
        params.append('announcementTypeCode', lookingFor.toString());
        if (!isAllArraysEmpty) {
            selectedAdPlacements.forEach((placementId) => {
                params.append('adPlacementCode', placementId.toString());
            });
            selectedBusinessFields.forEach((fieldId) => {
                params.append('businessFieldCode', fieldId.toString());
            });
            selectedCities.forEach((cityId) => {
                params.append('cityCode', cityId.toString());
            });
        }
        api += `?${params.toString()}`;

        try {
            const citiesRes = await fetch(api, {
                headers: {
                    // 'Accept-Language': acceptLanguage,
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
            });

            if (!citiesRes.ok) {
                throw new Error(`Failed to fetch data. Status: ${citiesRes.status}`);
            }
            const cities: any[] = await citiesRes.json();

            setCities(cities);
        } catch (e) {
            console.error(e);
        }
    };

    const getBusinessFields = async () => {
        const isAllArraysEmpty =
            selectedCities.length === 0 && selectedAdPlacements.length === 0 && selectedBusinessFields.length === 0;

        let api = process.env.NEXT_PUBLIC_EVENTS_URL + 'businessFields/getAllForAnnouncementFilter';
        const params = new URLSearchParams();
        params.append('announcementTypeCode', lookingFor.toString());
        if (!isAllArraysEmpty) {
            selectedAdPlacements.forEach((placementId) => {
                params.append('adPlacementCode', placementId.toString());
            });
            selectedBusinessFields.forEach((fieldId) => {
                params.append('businessFieldCode', fieldId.toString());
            });
            selectedCities.forEach((cityId) => {
                params.append('cityCode', cityId.toString());
            });
        }
        api += `?${params.toString()}`;

        try {
            const bussinesfieldsRes = await fetch(api);
            if (!bussinesfieldsRes.ok) {
                throw new Error(`Failed to fetch data. Status: ${bussinesfieldsRes.status}`);
            }
            const fields: any[] = await bussinesfieldsRes.json();
            setBusinessFields(fields);
        } catch (e) {
            console.error(e);
        }
    };

    const getAdPlacements = async () => {
        const isAllArraysEmpty =
            selectedCities.length === 0 && selectedAdPlacements.length === 0 && selectedBusinessFields.length === 0;
        let api = process.env.NEXT_PUBLIC_EVENTS_URL + 'adPlacements/getAllForAnnouncementFilter';
        const params = new URLSearchParams();
        params.append('announcementTypeCode', lookingFor.toString());
        if (!isAllArraysEmpty) {
            selectedAdPlacements.forEach((placementId) => {
                params.append('adPlacementCode', placementId.toString());
            });
            selectedBusinessFields.forEach((fieldId) => {
                params.append('businessFieldCode', fieldId.toString());
            });
            selectedCities.forEach((cityId) => {
                params.append('cityCode', cityId.toString());
            });
        }
        api += `?${params.toString()}`;

        try {
            const adPlacementsRes = await fetch(api);
            if (!adPlacementsRes.ok) {
                throw new Error(`Failed to fetch data. Status: ${adPlacementsRes.status}`);
            }
            const adPlacements: any[] = await adPlacementsRes.json();
            setAdPlacements(adPlacements);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAnnouncementList();
    }, [selectedAdPlacements, selectedBusinessFields, selectedCities, sortOptions, currentPage]);

    useEffect(() => {
        getCities();
        getAdPlacements();
        if (lookingFor === 'advertiser') {
            getBusinessFields();
        }
    }, []);

    return (
        <div className="2xl:w-2/3 xl:w-10/12 w-11/12 m-auto">
            <div className="hidden md:flex flex-col border-y-2 my-4 py-4 gap-2 dark:border-gray-400 border-black">
                {isLoading ? (
                    <div className="flex items-center px-1 gap-1 bg-gray-300 h-8 w-2/6 animate-pulse"></div>
                ) : (
                    <div className="text-2xl dark:text-white">
                        {locale.EventListPage.FoundAnnouncement}: {announcementTotalCount}
                    </div>
                )}
                <SortButtons locale={locale} setSortOptions={setSortOptions} sortOptions={sortOptions} />
            </div>
            <div className="grid md:grid-cols-[25%_1fr] gap-4">
                <MobileSearchFilter
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    lookingFor={lookingFor}
                    locale={locale}
                    isLoading={isLoading}
                    adPlacements={adPlacements}
                    cities={cities}
                    businessFields={businessFields}
                    setSelectedBusinessFields={setSelectedBusinessFields}
                    selectedBusinessFields={selectedBusinessFields}
                    setSelectedAdPlacements={setSelectedAdPlacements}
                    selectedAdPlacements={selectedAdPlacements}
                    setSelectedCities={setSelectedCities}
                    selectedCities={selectedCities}
                    announcementTotalCount={announcementTotalCount}
                />
                <div className="flex flex-col justify-between">
                    <AnnouncementList
                        userLang={userLang}
                        locale={locale}
                        announcementList={announcementList}
                        isLoading={isLoading}
                        lookingFor={lookingFor}
                    />
                    <Pagination
                        setPagesCount={setPagesCount}
                        pagesCount={pagesCount}
                        setAvailablePages={setAvailablePages}
                        availablePages={availablePages}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnnouncementListWrapper;
