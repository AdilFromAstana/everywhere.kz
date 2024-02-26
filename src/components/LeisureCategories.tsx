'use client';

import { setCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';

import { LeisureCategory } from '@/types/LeisureCategory';

interface LeisureCategoriesProps {
    leisureCategories: LeisureCategory[];
    selectedCategory: LeisureCategory;
}

const LeisureCategories = ({ leisureCategories, selectedCategory }: LeisureCategoriesProps) => {
    const scrollContainer = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const container = scrollContainer.current;
            if (container) {
                //@ts-expect-error: Frontend
                setCanScrollLeft(container.scrollLeft > 0);
                //@ts-expect-error: Frontend
                setCanScrollRight(container.scrollLeft < container.scrollWidth - container.offsetWidth);
            }
        };

        const container = scrollContainer.current;
        if (container) {
            //@ts-expect-error: Frontend
            container.addEventListener('scroll', checkScroll);
        }
        checkScroll(); // Инициализация при монтировании

        return () => {
            if (container) {
                //@ts-expect-error: Frontend
                container.removeEventListener('scroll', checkScroll);
            }
        };
    }, []);

    const handleSelectLeisureCategory = (category: LeisureCategory) => {
        if (selectedCategory?.id !== category.id) {
            setCookie('UserCategoryId', category.id, {
                maxAge: 60,
            });
            location.reload();
        }
    };

    return (
        <div id="leisureCategories" className="flex flex-row py-3 lg:px-2 container mx-auto">
            <div className="relative w-full">
                {/* {canScrollLeft && ( */}
                <div
                    id="left-arrow"
                    style={{
                        opacity: canScrollLeft ? 1 : 0,
                        transition: 'opacity 0.1s',
                    }}
                >
                    <div className="scroll-arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-black dark:stroke-white"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            focusable="false"
                            style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
                        >
                            <path d="M14.96 18.96 8 12l6.96-6.96.71.71L9.41 12l6.25 6.25-.7.71z"></path>
                        </svg>
                    </div>
                </div>
                {/* )} */}
                <div ref={scrollContainer} className="flex w-full relative gap-2 overflow-x-auto ">
                    {leisureCategories.map((x: LeisureCategory) => (
                        <div
                            key={x.id}
                            onClick={() => handleSelectLeisureCategory(x)}
                            className={`${
                                selectedCategory.id === x.id
                                    ? 'bg-[#000] text-white dark:bg-[#fff] dark:text-[#0f0f0f]'
                                    : 'bg-[#0000000d] dark:bg-[#ffffff33] dark:text-[#f1f1f1]'
                            } cursor-pointer px-4 py-1 w-fit rounded-md`}
                        >
                            <span className="block w-max text-sm font-semibold">{x.name}</span>
                        </div>
                    ))}
                </div>
                {/* {canScrollRight && ( */}
                <div
                    id="right-arrow"
                    style={{
                        opacity: canScrollRight ? 1 : 0,
                        transition: 'opacity 0.1s',
                    }}
                >
                    <div className="scroll-arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            className="stroke-black dark:stroke-white"
                            focusable="false"
                            style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
                        >
                            <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
                        </svg>
                    </div>
                </div>
                {/* )} */}
            </div>
        </div>
    );
};

export default LeisureCategories;
