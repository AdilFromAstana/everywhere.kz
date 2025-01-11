'use client';

import React, { useState } from 'react';

import { getNameLanguage } from '@/functions/getNameLanguage';
import SortOptions from '@/interfaces/SortOptions';
import SortButtons from './SortButtons';

interface MobileSearchFilterComponentProps {
    locale: any;
    cities: any[];
    setSelectedCities: React.Dispatch<React.SetStateAction<any[]>>;
    selectedCities: any[];
    setSortOptions: React.Dispatch<React.SetStateAction<SortOptions>>;
    sortOptions: SortOptions;
    realEstateTotalCount: number;
    isLoading: boolean;
}

const MobileSearchFilter: React.FC<MobileSearchFilterComponentProps> = ({
    setSortOptions,
    sortOptions,
    locale,
    cities,
    setSelectedCities,
    selectedCities,
    realEstateTotalCount,
    isLoading,
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterToggle = () => {
        document.documentElement.classList.toggle('overflow-hidden', !isFilterOpen);
        setIsFilterOpen(!isFilterOpen);
    };

    const handleCheckboxChange = (e: any, value: any, type: any) => {
        const handlers: any = {
            cityCode: [selectedCities, setSelectedCities],
        };

        const [selected, setSelected] = handlers[type];

        setSelected(e.target.checked ? [...selected, value] : selected.filter((item: any) => item !== value));
    };

    const renderCheckboxes = (items: any, type: any) => {
        const handlers: any = {
            cityCode: selectedCities,
        };

        const selected = handlers[type];

        return items
            .sort((a: any, b: any) => b.count - a.count)
            .map((item: any) => (
                <div key={item.id} className="flex items-start cursor-pointer">
                    <input
                        type="checkbox"
                        id={`${type}-${item.id}`}
                        className="form-checkbox min-h-5 min-w-5 text-blue-600 transition duration-150 ease-in-out"
                        onChange={(e) => handleCheckboxChange(e, item.code, type)}
                        checked={selected.includes(item.code)}
                    />
                    <label
                        htmlFor={`${type}-${item.id}`}
                        className="w-full flex justify-between gap-2 ml-2 text-sm dark:text-white cursor-pointer"
                    >
                        <span>{item[getNameLanguage()]}</span>
                        <span>{item.count}</span>
                    </label>
                </div>
            ));
    };

    const renderContent = () => {
        return isLoading ? (
            <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index}>
                        <div className="text-lg font-bold mb-2 bg-gray-300 h-5 w-40 rounded animate-pulse"></div>
                        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-start cursor-pointer">
                                    <div className="form-checkbox min-h-5 min-w-5 bg-gray-300 rounded animate-pulse"></div>
                                    <div className="w-full flex justify-between gap-2 ml-2">
                                        <span className="bg-gray-300 h-4 w-2/3 rounded animate-pulse"></span>
                                        <span className="bg-gray-300 h-4 w-8 rounded animate-pulse"></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex flex-col gap-4">
                <div className="block md:hidden">
                    <div className="text-lg font-bold mb-2 dark:text-white text-black">
                        {locale.EventListPage.SortButtons.SortBy}
                    </div>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                        <SortButtons locale={locale} setSortOptions={setSortOptions} sortOptions={sortOptions} />
                    </div>
                </div>
                <div>
                    <div className="text-lg font-bold mb-2 dark:text-white text-black">
                        {locale.EventListPage.FilterColumn.City}
                    </div>
                    <div className="space-y-2">{renderCheckboxes(cities, 'cityCode')}</div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="md:flex hidden rounded dark:text-white text-black flex-col gap-4 pb-20">
                {renderContent()}
            </div>
            <div className="md:hidden block">
                <div className="flex justify-flex items-center gap-4">
                    {isLoading ? (
                        <div className="flex items-center px-1 gap-1 bg-gray-300 h-10 w-full animate-pulse"></div>
                    ) : (
                        <div className="text-md border-2 dark:text-white dark:border-white border-black px-4 py-2 rounded">
                            {locale.EventListPage.FoundRealEstate}: {realEstateTotalCount}
                        </div>
                    )}
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded md:hidden border-2 border-transparent"
                        onClick={handleFilterToggle}
                    >
                        Фильтр
                    </button>
                </div>
                {isFilterOpen && (
                    <div className="md:hidden fixed inset-0 z-50 rounded text-white dark:bg-black bg-white flex flex-col p-4">
                        <div className="flex items-center justify-center relative pb-4 border-b-2 dark:border-white">
                            <button
                                className="bg-red-700 w-10 h-10 text-2xl rounded border-2 absolute left-0"
                                onClick={handleFilterToggle}
                            >
                                x
                            </button>
                            <div className="text-2xl dark:text-white text-black">Фильтр</div>
                        </div>
                        <div className="flex-grow overflow-y-auto text-black p-4">
                            {renderContent()}
                            <div className="h-0.5 w-full bg-white my-2" />
                        </div>
                        <button
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleFilterToggle}
                        >
                            Поиск
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MobileSearchFilter;
