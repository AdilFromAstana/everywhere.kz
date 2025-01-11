'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { getCookie } from '@/functions';

import 'react-phone-input-2/lib/style.css';

interface PersonalDataComponentProps {
    data: {
        name: string;
        email: string;
        phoneNumber: string;
        balance: string;
        tiktokLink: string;
        instagramLink: string;
        youtubeLink: string;
    };
}

const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const errorsObj: ErrorsObjType = {
    incorrectOldPassword: 'Неверный старый пароль!',
};

type ErrorsObjType = {
    [key: string]: string;
};

const PersonalDataComponent: React.FC<PersonalDataComponentProps> = ({ data }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [personalData, setPersonalData] = useState(data);
    const phoneNumberValidation = isEditable && personalData.phoneNumber.length !== 11;
    const emailValidation = isEditable && !validateEmail(personalData.email);
    const [notificationText, setNotificationText] = useState<string>('');
    const [notificationType, setNotificationType] = useState<string>('');
    const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);

    const isValuesChanged =
        personalData.phoneNumber !== data.phoneNumber ||
        personalData.email !== data.email ||
        personalData.tiktokLink !== data.tiktokLink ||
        personalData.instagramLink !== data.instagramLink ||
        personalData.youtubeLink !== data.youtubeLink ||
        personalData.name !== data.name;

    const resetData = () => {
        setIsEditable(false);
        setPersonalData(data);
    };

    const updateData = async () => {
        const formData = new FormData();
        if (data.name !== personalData.name) {
            formData.append('name', personalData.name);
        }
        if (data.phoneNumber !== personalData.phoneNumber) {
            formData.append('phoneNumber', personalData.phoneNumber);
        }
        if (data.email !== personalData.email) {
            formData.append('email', personalData.email);
        }

        const updateData = Object.fromEntries(formData);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + '', {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store',
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
                cache: 'no-store',
            });
            const result = await res.json();

            if (!result.success) {
                setNotificationText(errorsObj[result.error]);
                setNotificationType('error');
            } else {
                setNotificationText('Пароль успешно изменен!');
                setNotificationType('success');
            }
            setIsNotificationVisible(true);
            setTimeout(() => {
                setIsNotificationVisible(false);
            }, 3000);
        } catch (error) {
            console.error('Error changing personal data', error);
        }
    };

    return (
        <>
            <div className="border-r flex flex-col justify-between gap-4">
                <div className="dark:text-white grid grid-cols-1 gap-6 mb-2">
                    <div className="w-1/2">
                        <div className="text-sm">Имя: </div>
                        <div className="relative">
                            <input
                                className={`w-full text-black rounded px-2 py-1 bg-white border-2 ${
                                    !isEditable && 'cursor-not-allowed'
                                }`}
                                value={personalData.name}
                                disabled={!isEditable}
                                onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="text-sm">Email: </div>
                        <div className="relative">
                            <input
                                className={`w-full text-black rounded px-2 py-1 bg-white border-2  ${
                                    !isEditable && 'cursor-not-allowed'
                                }`}
                                value={personalData.email}
                                disabled={!isEditable}
                                onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                            />
                            {emailValidation && (
                                <div className="absolute text-red-500 text-xs text-nowrap">
                                    Введите корректную почту!
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="text-sm">Телефон: </div>
                        <div className="relative">
                            <PhoneInput
                                containerClass="text-black w-full"
                                disabled={!isEditable}
                                onChange={(e) => setPersonalData({ ...personalData, phoneNumber: e })}
                                value={personalData.phoneNumber}
                                onlyCountries={['kz']}
                                country={'kz'}
                                inputClass="PhoneInput"
                                disableDropdown
                                masks={{ kz: '-(...)-...-..-..' }}
                            />
                            {phoneNumberValidation && (
                                <div className="absolute text-red-500 text-xs text-nowrap">
                                    Введите корректный номер телефона!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {isEditable ? (
                        <div className="flex gap-2">
                            <button
                                className={`
                                ${isValuesChanged ? 'bg-blue-600' : 'bg-gray-400'} 
                                py-1 px-2 rounded text-white w-fit
                            `}
                                onClick={updateData}
                            >
                                Сохранить
                            </button>
                            <button className="bg-red-700 py-1 px-2 rounded text-white w-fit" onClick={resetData}>
                                Отмена
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-blue-600 py-1 px-2 rounded text-white w-fit"
                            onClick={() => setIsEditable(true)}
                        >
                            Редактировать
                        </button>
                    )}
                </div>
            </div>
            {isNotificationVisible && (
                <div
                    className={`fixed top-4 right-4 text-white border-white border-2 rounded p-4 z-50 
                        ${notificationType === 'success' && 'bg-green-700'}
                        ${notificationType === 'error' && 'bg-red-700'}
                    `}
                >
                    <div>{notificationText}</div>
                    <div className="notification-bar"></div>
                </div>
            )}
        </>
    );
};

export default PersonalDataComponent;
