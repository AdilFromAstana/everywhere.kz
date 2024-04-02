import Link from 'next/link';

import { LeisureCategory } from '@/types/LeisureCategory';

interface LeisureCategoriesProps {
    leisureCategories: LeisureCategory[];
    selectedCategory: LeisureCategory;
}

const LeisureCategories = ({ leisureCategories, selectedCategory }: LeisureCategoriesProps) => {
    return (
        <div id="leisureCategories" className="flex flex-row py-3 lg:px-2 container mx-auto">
            <div className="relative w-full flex justify-between">
                <div className="flex relative gap-6 overflow-x-auto">
                    {leisureCategories.map((x: LeisureCategory) => (
                        <Link
                            key={x.id}
                            href={'/category/' + x.id}
                            className={`${
                                selectedCategory.id === x.id
                                    ? 'text-[#0490C3] dark:text-white underline'
                                    : 'text-black dark:text-white'
                            } cursor-pointer`}
                        >
                            <span className="block w-max text-sm">{x.name}</span>
                        </Link>
                    ))}
                </div>
                <Link className="text-black dark:text-white gap-2 lg:flex hidden" href="#id" target="_blank">
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.62 18.8096C11.28 18.9296 10.72 18.9296 10.38 18.8096C7.48 17.8196 1 13.6896 1 6.68961C1 3.59961 3.49 1.09961 6.56 1.09961C8.38 1.09961 9.99 1.97961 11 3.33961C12.01 1.97961 13.63 1.09961 15.44 1.09961C18.51 1.09961 21 3.59961 21 6.68961C21 13.6896 14.52 17.8196 11.62 18.8096Z"
                            stroke="#2F2F38"
                            strokeOpacity="0.85"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="text-sm">Избранное</span>
                </Link>
            </div>
        </div>
    );
};

export default LeisureCategories;
