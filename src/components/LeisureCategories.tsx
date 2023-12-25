'use client';

import { useEffect, useRef, useState } from 'react';

import { LeisureCategory } from '@/types/LeisureCategory';

interface LeisureCategoriesProps {
    leisureCategories: LeisureCategory[];
}

const LeisureCategories = ({ leisureCategories }: LeisureCategoriesProps) => {
    const [initialTop, setInitialTop] = useState(0);

    const scrollContainer = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const scrollDistance = window.scrollY;

        if (initialTop === 0) {
            const fixedDiv = document.querySelector('#leisureCategories');
            const rect = fixedDiv?.getBoundingClientRect();
            if (rect?.top) {
                setInitialTop(rect?.top ? rect?.top : 0);
                if (scrollDistance > 0) {
                    // @ts-expect-error: Frontend
                    fixedDiv.style.top = `${0}px`;
                } else {
                    // @ts-expect-error: Frontend
                    fixedDiv.style.top = `calc(${rect?.top}px - 1rem)`;
                }
            }
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const fixedDiv = document.querySelector('#leisureCategories');
            const scrollDistance = window.scrollY;

            if (scrollDistance < initialTop) {
                // @ts-expect-error: Frontend
                fixedDiv.style.top = `calc(${initialTop - scrollDistance}px - 1rem)`;
            } else {
                // @ts-expect-error: Frontend
                fixedDiv.style.top = `${0}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [initialTop]);

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

    return (
        <div
            style={{
                opacity: initialTop > 0 ? 1 : 0,
                transition: 'opacity .3s',
            }}
            id="leisureCategories"
            className="flex flex-row fixed bg-white w-full left-0 px-2 py-3"
        >
            <div className="relative w-full">
                {canScrollLeft && (
                    <div id="left-arrow">
                        <div className="scroll-arrow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
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
                )}
                <div ref={scrollContainer} className="flex w-full relative gap-2 overflow-x-auto ">
                    {leisureCategories.map((x: LeisureCategory) => (
                        <div key={x.id} className="bg-[#0000000d] px-4 py-1 w-fit rounded-md">
                            <span className="block w-max text-sm font-semibold">{x.name}</span>
                        </div>
                    ))}
                </div>
                {canScrollRight && (
                    <div id="right-arrow">
                        <div className="scroll-arrow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                                focusable="false"
                                style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
                            >
                                <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeisureCategories;
