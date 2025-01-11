'use client';

import { getCookie } from 'cookies-next';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface PasswordToggleProps {
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    showPassword: boolean;
}

type ErrorsObjType = {
    [key: string]: string;
};

const errorsObj: ErrorsObjType = {
    incorrectOldPassword: 'Неверный старый пароль!',
};

const VisibleIcon: React.FC<PasswordToggleProps> = ({ setShowPassword, showPassword }: any) => {
    return (
        <svg
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            id="Layer_2"
            fill="gray"
            data-name="Layer 2"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => setShowPassword(!showPassword)}
        >
            <title>eye-disabled-glyph</title>
            <path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z" />
        </svg>
    );
};

const InvisibleIcon: React.FC<PasswordToggleProps> = ({ setShowPassword, showPassword }: any) => {
    return (
        <svg
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            id="Layer_1"
            fill="gray"
            data-name="Layer 1"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => setShowPassword(!showPassword)}
        >
            <title>eye-glyph</title>
            <path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z" />
        </svg>
    );
};

const ChangePasswordComponent: React.FC = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('');
    const [passwordLengthError, setPasswordLengthError] = useState<string>('');
    const [notificationText, setNotificationText] = useState<string>('');
    const [notificationType, setNotificationType] = useState<string>('');
    const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);

    const updatePasswordValidation = newPassword.length >= 8 && !!oldPassword && confirmNewPassword === newPassword;

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setNewPassword(password);

        if (password.length === 0) {
            setPasswordLengthError('');
        }

        if (password.length >= 1 && password.length < 8) {
            setPasswordLengthError('Новый пароль должен быть не менее 8 символов');
        } else {
            setPasswordLengthError('');
        }

        if (password !== confirmNewPassword) {
            setPasswordMatchError('Пароли не совпадают');
        } else {
            setPasswordMatchError('');
        }
    };

    const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value;
        setConfirmNewPassword(confirmPassword);

        if (newPassword !== confirmPassword) {
            setPasswordMatchError('Пароли не совпадают');
        } else {
            setPasswordMatchError('');
        }
    };

    const handlePasswordChange = async () => {
        const formData = new FormData();
        formData.append('newPassword', newPassword);
        formData.append('oldPassword', oldPassword);

        const updateData = Object.fromEntries(formData);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + '/users/changePassword', {
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
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
            setIsNotificationVisible(true);
            setTimeout(() => {
                setIsNotificationVisible(false);
            }, 3000);
        } catch (error) {
            setNotificationType('error');
            setNotificationText('Ошибка со стороны сервера!');
            setIsNotificationVisible(true);
            setTimeout(() => {
                setIsNotificationVisible(false);
            }, 3000);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-6 dark:text-white">
                <div className="w-fit">
                    <div className=" text-sm">Введите старый пароль</div>
                    <div className="relative w-auto">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            className="px-2 py-1 pr-10 w-full rounded border-2 dark:border-white text-black"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {showOldPassword ? (
                            <VisibleIcon setShowPassword={setShowOldPassword} showPassword={showOldPassword} />
                        ) : (
                            <InvisibleIcon setShowPassword={setShowOldPassword} showPassword={showOldPassword} />
                        )}
                    </div>
                </div>
                <div className="w-fit relative">
                    <div className=" text-sm">Введите новый пароль</div>
                    <div className="relative w-auto">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            className="px-2 py-1 pr-10 w-full rounded border-2 dark:border-white text-black"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        {showNewPassword ? (
                            <VisibleIcon setShowPassword={setShowNewPassword} showPassword={showNewPassword} />
                        ) : (
                            <InvisibleIcon setShowPassword={setShowNewPassword} showPassword={showNewPassword} />
                        )}
                    </div>
                    {passwordLengthError && (
                        <div className="absolute text-red-500 text-xs text-nowrap">{passwordLengthError}</div>
                    )}
                </div>
                <div className="w-fit relative">
                    <div className=" text-sm">Подтвердите новый пароль</div>
                    <div className="relative w-auto">
                        <input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            className="px-2 py-1 pr-10 w-full rounded border-2 dark:border-white text-black"
                            value={confirmNewPassword}
                            autoComplete="newPassword"
                            onChange={handleConfirmNewPasswordChange}
                        />
                        {showConfirmNewPassword ? (
                            <VisibleIcon
                                setShowPassword={setShowConfirmNewPassword}
                                showPassword={showConfirmNewPassword}
                            />
                        ) : (
                            <InvisibleIcon
                                setShowPassword={setShowConfirmNewPassword}
                                showPassword={showConfirmNewPassword}
                            />
                        )}
                    </div>
                    {passwordMatchError && (
                        <div className="absolute text-red-500 text-xs text-nowrap">{passwordMatchError}</div>
                    )}
                </div>
                <button
                    className={`w-fit px-2 py-1 rounded text-white ${
                        updatePasswordValidation ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handlePasswordChange}
                    disabled={!updatePasswordValidation}
                >
                    Изменить пароль
                </button>
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

export default ChangePasswordComponent;
