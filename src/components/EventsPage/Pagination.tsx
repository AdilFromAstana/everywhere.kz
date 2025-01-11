interface PaginationComponentProps {
    setAvailablePages: React.Dispatch<React.SetStateAction<any>>;
    availablePages: any;
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
    currentPage: any;
    setPagesCount: React.Dispatch<React.SetStateAction<any>>;
    pagesCount: any;
}

const Pagination: React.FC<PaginationComponentProps> = ({
    availablePages,
    setCurrentPage,
    currentPage,
    pagesCount,
}) => {
    const changePage = (page: number) => {
        window.scrollTo({ top: 0 });
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-row gap-2 py-4">
            {currentPage > 3 && (
                <button
                    className="border-2 dark:border-white flex justify-center px-2 py-1 rounded dark:text-white"
                    onClick={() => changePage(1)}
                >
                    <span className="md:block hidden">В начало</span>
                    <span className="md:hidden block">1</span>
                </button>
            )}
            {availablePages.map((availablePage: number) => {
                const isCurrentPage = availablePage === currentPage;
                return (
                    <button
                        key={availablePage}
                        className={`border-2 dark:border-white flex justify-center px-2 py-1 rounded dark:text-white ${
                            isCurrentPage ? 'dark:bg-gray-400 bg-blue-600 text-white border-blue-600' : 'dark:bg-black'
                        }`}
                        onClick={() => {
                            if (isCurrentPage) {
                                return null;
                            } else {
                                changePage(availablePage);
                            }
                        }}
                    >
                        <span>{availablePage}</span>
                    </button>
                );
            })}
            {pagesCount - currentPage >= 3 && [
                <div className="dark:text-white flex items-end" key={'dots'}>
                    <span>...</span>
                </div>,
                <button
                    className="border-2 dark:border-white flex justify-center px-2 py-1 rounded dark:text-white"
                    onClick={() => changePage(pagesCount)}
                    key={'last'}
                >
                    <span>{pagesCount}</span>
                </button>,
                <button
                    className="border-2 dark:border-white flex justify-center px-2 py-1 rounded dark:text-white"
                    onClick={() => changePage(currentPage + 1)}
                    key={'next'}
                >
                    <span className="md:block hidden">Дальше</span>
                    <span className="md:hidden block">{'>'}</span>
                </button>,
            ]}
        </div>
    );
};

export default Pagination;
