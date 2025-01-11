import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-80">
                <h3 className="text-lg font-medium mb-4 text-black">{message}</h3>
                <div className="flex justify-end gap-2">
                    <button
                        className="text-md bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300 flex items-center justify-between"
                        onClick={onConfirm}
                    >
                        Удалить
                        {isLoading ? <div className="spinner ml-2"></div> : null}
                    </button>
                    <button
                        className="text-md bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300"
                        onClick={onClose}
                    >
                        Отменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
