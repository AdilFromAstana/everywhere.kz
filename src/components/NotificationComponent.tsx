'use client';

import React, { useEffect, useState } from 'react';

interface NotificationComponentProps {
    text: string;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ text, isModalVisible, setIsModalVisible }) => {
    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleGoToHome = () => {
        window.location.href = '/';
        document.documentElement.classList.toggle('overflow-hidden', false);
        handleClose(); // Close the modal
    };

    const handleGoToMyAds = () => {
        window.location.href = '/announcement/list';
        document.documentElement.classList.toggle('overflow-hidden', false);
        handleClose(); // Close the modal
    };

    return (
        <div
            className={`inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
                isModalVisible ? 'fixed' : 'hidden'
            }`}
        >
            <div className="bg-white p-6 border-2 rounded dark:text-black max-w-sm w-full relative md:m-0 mx-6">
                <p className="mb-4">{text}</p>
                <div className="flex justify-between flex-col gap-2">
                    <button
                        onClick={handleGoToHome}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        На главную
                    </button>
                    <button
                        onClick={handleGoToMyAds}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Мои объявления
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationComponent;
