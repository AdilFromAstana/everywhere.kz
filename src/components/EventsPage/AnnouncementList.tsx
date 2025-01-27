'use client';

import AnnouncementItem from './AnnouncementItem';

interface AnnouncementListComponentProps {
    announcementList: any[];
    isLoading: boolean;
    locale: any;
    lookingFor: any;
    userLang: any;
}

const AnnouncementList: React.FC<AnnouncementListComponentProps> = ({
    announcementList,
    isLoading,
    locale,
    lookingFor,
    userLang,
}) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-2 dark:text-white p-2 rounded animate-pulse border-2 border-black dark:border-white"
                    >
                        <div className="bg-gray-300 h-6 md:w-3/4 w-full"></div>
                        <div className="flex md:flex-row flex-col flex-wrap gap-2">
                            <div className="flex items-center px-1 gap-1 bg-gray-300 h-6 w-1/6 w-4/6"></div>
                            <div className="flex items-center px-1 gap-1 bg-gray-300 h-6 w-1/6 w-2/6"></div>
                        </div>
                        <div className="flex flex-row items-center gap-2 bg-gray-300 h-6 md:w-1/4 w-5/6"></div>
                        <div className="flex justify-between">
                            <div className="bg-gray-300 h-6 md:w-1/6 w-3/12"></div>
                            <div className="bg-gray-300 h-6 md:w-1/6 w-3/12"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if (announcementList.length === 0) {
        return (
            <div className="flex flex-row items-center justify-center py-4 h-[50vh]">
                <p className="text-gray-500 dark:text-gray-400">Объявления не найдены!</p>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-4">
                {announcementList.map((announcement) => {
                    return (
                        <AnnouncementItem
                            userLang={userLang}
                            announcement={announcement}
                            key={announcement.id}
                            locale={locale}
                            lookingFor={lookingFor}
                        />
                    );
                })}
            </div>
        );
    }
};

export default AnnouncementList;
