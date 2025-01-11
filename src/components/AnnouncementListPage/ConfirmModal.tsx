interface IConfirmModal {
    locale: any;
    closeModal: () => any;
    toArchivate: () => any;
}

const ConfirmModal: React.FC<IConfirmModal> = ({ locale, closeModal, toArchivate }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 mx-4 max-w-lg w-full">
                <div className="text-xl font-semibold text-center mb-4 dark:text-white">
                    {locale.MyAnnouncements.SubmitArhivating}
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        className="text-md bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
                        onClick={() => {
                            closeModal();
                            toArchivate();
                        }}
                    >
                        {locale.Common.Yes}
                    </button>
                    <button
                        className="text-md bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300"
                        onClick={closeModal}
                    >
                        {locale.Common.No}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
