'use client';

import { useEffect, useState } from 'react';

import Dropdown from '@/interfaces/Dropdown';
import SortOptions from '@/interfaces/SortOptions';
import MobileSearchFilter from './MobileSearchFilter';
import Pagination from './Pagination';
import RealEstateList from './RealEstateList';
import SortButtons from './SortButtons';

interface RealEstateListWrapperProps {
    locale: any;
    userLang: any;
}

const RealEstateListWrapper: React.FC<RealEstateListWrapperProps> = ({ locale, userLang }) => {
    const [realEstateList, setRealEstateList] = useState<any[]>([]);
    const [realEstateTotalCount, setRealEstateTotalCount] = useState<number>(0);
    const [pagesCount, setPagesCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cities, setCities] = useState<Dropdown[]>([]);
    const [selectedCities, setSelectedCities] = useState<any[]>([]);
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

    const getRealEstateList = async () => {
        setIsLoading(true);
        const isAllArraysEmpty = selectedCities.length === 0;
        let api = process.env.NEXT_PUBLIC_EVENTS_URL + 'realEstates/getAll';
        const params = new URLSearchParams();
        let pFitlers: {
            selectedCities: string[];
        } = {
            selectedCities: [],
        };

        if (!isAllArraysEmpty) {
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
            setRealEstateList(resData.realEstates);
            setRealEstateTotalCount(Number(resData.total));
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
        const isAllArraysEmpty = selectedCities.length === 0;
        let api = process.env.NEXT_PUBLIC_EVENTS_URL + 'cities/getAllForRealEstateFilter';
        const params = new URLSearchParams();
        if (!isAllArraysEmpty) {
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
    useEffect(() => {
        getRealEstateList();
    }, [selectedCities, sortOptions, currentPage]);

    useEffect(() => {
        getCities();
    }, []);

    //http://localhost:3000/?code=TT2q9wp38r01ciFLp3xtadGTOZlJmgLcshgFoXf2zoghddRDtr0AEpOlNFzcJ0FDsYJavilLZMo7Pe4fBruEf74caKDUkAlHU5KrnpXtPrSYVsqdDcE-N5xOWAtcWsOt&state=aizhanov&scope=liveness_3d+openid

    return (
        <div className="2xl:w-2/3 xl:w-10/12 w-11/12 m-auto">
            <div className="hidden md:flex flex-col border-y-2 my-4 py-4 gap-2 dark:border-gray-400 border-black">
                {isLoading ? (
                    <div className="flex items-center px-1 gap-1 bg-gray-300 h-8 w-2/6 animate-pulse"></div>
                ) : (
                    <div className="text-2xl dark:text-white">
                        {locale.EventListPage.FoundRealEstate}: {realEstateTotalCount}
                    </div>
                )}
                <SortButtons locale={locale} setSortOptions={setSortOptions} sortOptions={sortOptions} />
            </div>
            <div className="grid md:grid-cols-[25%_1fr] gap-4">
                <MobileSearchFilter
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    locale={locale}
                    isLoading={isLoading}
                    cities={cities}
                    setSelectedCities={setSelectedCities}
                    selectedCities={selectedCities}
                    realEstateTotalCount={realEstateTotalCount}
                />
                <div className="flex flex-col justify-between">
                    <RealEstateList
                        userLang={userLang}
                        locale={locale}
                        realEstateList={realEstateList}
                        isLoading={isLoading}
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

export default RealEstateListWrapper;
