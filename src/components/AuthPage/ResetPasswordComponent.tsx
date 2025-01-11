import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import EmailCodeInput from './EmailCodeInput';

interface ResetPasswordComponentProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
    setIsResetPassword: Dispatch<SetStateAction<boolean>>;
}

const ResetPasswordComponent: React.FC<ResetPasswordComponentProps> = ({ setIsLogin, setIsResetPassword }) => {
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const mailButtonClassList =
        'group relative flex w-full justify-center gap-2 rounded border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-[#1e3a8a] dark:hover:bg-[#1e40af] dark:focus:ring-[#1e3a8a]';

    const disabledButtonClassList =
        'bg-gray-400 cursor-not-allowed hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600';

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + 'users/request-password-reset', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store',
                    Accept: 'application/json',
                },
            });

            const result = await res.json();
            if (result.success) {
                setIsCodeSent(true);
                setIsResetPassword(true);
                console.log('Password reset link sent to email:', email);
            } else {
                setErrorText('Ошибка при сбросе пароля!');
            }
        } catch (e: any) {
            setErrorText('Ошибка при сбросе пароля!');
            console.error(e.error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isCodeSent) {
        return (
            <div className="w-full max-w-md p-8 space-y-8 rounded shadow-lg flex flex-col items-center">
                <h2 className="dark:text-white text-2xl font-bold text-center">Ваш пароль обновлен!</h2>
                <div className="flex flex-col items-center text-lg">
                    <span>Узнайте свой новый пароль на почте: </span>
                    <b>{email}</b>
                </div>
                <div className="mt-4">
                    <button
                        className={mailButtonClassList}
                        onClick={() => {
                            setIsLogin(true);
                            setIsResetPassword(false);
                        }}
                    >
                        Войти с новым паролем
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full max-w-md md:p-8 space-y-8 rounded shadow-2xl md:border">
                <h2 className="dark:text-white text-2xl font-bold text-center">Сброс пароля</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2
                                        text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none
                                        focus:ring-blue-500 dark:bg-[#2b2b2b] dark:text-white sm:text-sm"
                        placeholder="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorText('');
                        }}
                    />
                    {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
                    {email.length > 0 && !validateEmail() && (
                        <p className="text-red-500 text-sm">Введите корректный email</p>
                    )}
                </div>
                <button
                    className={`${mailButtonClassList} ${!validateEmail() ? disabledButtonClassList : ''}`}
                    onClick={handleResetPassword}
                    disabled={!validateEmail()}
                >
                    Сбросить пароль
                    {isLoading && <div className="spinner ml-2"></div>}
                </button>
                <p className="text-center text-sm text-gray-600 dark:text-white">
                    Нет аккаунта?
                    <button
                        className="ml-2 font-medium text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
                        onClick={() => {
                            setIsResetPassword(false);
                            setIsLogin(false);
                        }}
                    >
                        Зарегистрируйтесь
                    </button>
                </p>
            </div>
        );
    }
};

export default ResetPasswordComponent;
