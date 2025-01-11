import SortOptions from '@/interfaces/SortOptions';

interface SortButtonsComponentProps {
    setSortOptions: React.Dispatch<React.SetStateAction<any>>;
    sortOptions: any;
    locale: any;
}

const SortButtons: React.FC<SortButtonsComponentProps> = ({ setSortOptions, sortOptions, locale }) => {
    const sortButtons: SortOptions[] = [
        { sortBy: 'date', sortOrder: 'desc', title: locale.EventListPage.SortButtons.SortFirstNewAnnouncements },
        { sortBy: 'price', sortOrder: 'asc', title: locale.EventListPage.SortButtons.SortFirstCheapAnnouncements },
        { sortBy: 'price', sortOrder: 'desc', title: locale.EventListPage.SortButtons.SortFirstExpensiveAnnouncements },
    ];

    return (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {sortButtons.map((sortButton, index) => {
                const isThisSeletedOption =
                    sortOptions.sortBy === sortButton.sortBy && sortOptions.sortOrder === sortButton.sortOrder;
                return (
                    <button
                        key={index}
                        className={`dark:text-white md:px-4 md:py-2 px-2 py-1 rounded text-nowrap ${
                            isThisSeletedOption
                                ? 'dark:bg-gray-700 bg-blue-600 text-white'
                                : 'dark:bg-gray-400 bg-white border border-black'
                        }`}
                        onClick={() => {
                            if (!isThisSeletedOption)
                                setSortOptions({ sortBy: sortButton.sortBy, sortOrder: sortButton.sortOrder });
                        }}
                    >
                        {sortButton.title}
                    </button>
                );
            })}
        </div>
    );
};

export default SortButtons;
