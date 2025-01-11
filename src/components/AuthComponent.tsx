'use client';

import { setCookie } from 'cookies-next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import EmailComponent from './AuthPage/EmailComponent';
import ResetPasswordComponent from './AuthPage/ResetPasswordComponent';

interface PasswordToggleProps {
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    showPassword: boolean;
}

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

interface IAuthComponent {
    locale: any;
}

const AuthComponent: React.FC<IAuthComponent> = ({ locale }) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const loginData = Object.fromEntries(formData);

        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_EVENTS_URL + `/users/${isLogin ? 'login' : 'registration'}`,
                {
                    method: 'POST',
                    body: JSON.stringify(loginData),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store',
                        Accept: 'application/json',
                    },
                }
            );

            const result = await res.json();
            if (!result.success) {
                setPasswordError(isLogin ? locale.Errors.LoginError : locale.Errors.RegistrationError);
            } else {
                if (isLogin) {
                    setCookie('accessToken', result.data.accessToken);
                    window.location.href = '/';
                } else {
                    setIsCodeSent(true);
                    setEmail(email as string);
                }
            }
        } catch (e: any) {
            setPasswordError(isLogin ? locale.Errors.LoginError : locale.Errors.RegistrationError);
            console.error(e.error);
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        if (isLoading)
            return <span className="inline-block w-4 h-4 border-b-2 border-white rounded-full animate-spin"></span>;
        return isLogin ? locale.Auth.Enter : locale.Auth.Registration;
    };

    const buttonClasses = `
        group relative flex w-full justify-center rounded border border-transparent bg-blue-500 py-2
        px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2
        focus:ring-blue-500 focus:ring-offset-2 dark:bg-[#1e3a8a] dark:hover:bg-[#1e40af] dark:focus:ring-[#1e3a8a]
    `;

    useEffect(() => {
        if (!isLogin && password.length > 0 && password.length < 8) {
            setPasswordError(locale.Errors.PasswordLength);
        } else {
            setPasswordError('');
        }

        const notSamePassword = !isLogin && password !== confirmPassword && confirmPassword.length > 0;
        if (notSamePassword) {
            setConfirmPasswordError(locale.Errors.NotSamePassword);
        } else {
            setConfirmPasswordError('');
        }
    }, [isLogin, email, password, confirmPassword]);

    if (isResetPassword) {
        return <ResetPasswordComponent setIsLogin={setIsLogin} setIsResetPassword={setIsResetPassword} />;
    } else if (isCodeSent) {
        return <EmailComponent isCodeSent={isCodeSent} setIsCodeSent={setIsCodeSent} />;
    } else {
        return (
            <div className="w-full max-w-md md:p-8 space-y-8 rounded shadow-2xl md:border">
                <h2 className="dark:text-white text-2xl font-bold text-center">
                    {isLogin ? locale.Auth.Enter : locale.Auth.Registration}
                </h2>
                <div className="md:mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2
                            text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none
                            focus:ring-blue-500 dark:bg-[#2b2b2b] dark:text-white sm:text-sm"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                            {locale.Auth.Password}
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="block w-full appearance-none rounded border border-gray-300 px-3 py-2
                                text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none
                                focus:ring-blue-500 dark:bg-[#2b2b2b] dark:text-white sm:text-sm"
                                placeholder={locale.Auth.Password}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {showPassword ? (
                                <VisibleIcon setShowPassword={setShowPassword} showPassword={showPassword} />
                            ) : (
                                <InvisibleIcon setShowPassword={setShowPassword} showPassword={showPassword} />
                            )}
                        </div>
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    {!isLogin && (
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700 dark:text-white"
                            >
                                {locale.Auth.ConfirmPassword}
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    className="block w-full appearance-none rounded border border-gray-300 px-3 py-2
                                    text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none
                                    focus:ring-blue-500 dark:bg-[#2b2b2b] dark:text-white sm:text-sm"
                                    placeholder={locale.Auth.ConfirmPassword}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                {showConfirmPassword ? (
                                    <VisibleIcon
                                        setShowPassword={setShowConfirmPassword}
                                        showPassword={showConfirmPassword}
                                    />
                                ) : (
                                    <InvisibleIcon
                                        setShowPassword={setShowConfirmPassword}
                                        showPassword={showConfirmPassword}
                                    />
                                )}
                            </div>
                            {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <button className={buttonClasses} onClick={handleSubmit} disabled={isLoading}>
                            {getButtonText()}
                        </button>
                    </div>
                    {isLogin && (
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
                                onClick={() => setIsResetPassword(true)}
                            >
                                {locale.Auth.ForgotThePassword}
                            </button>
                        </div>
                    )}
                    <div className="mt-4">
                        <p className="text-center text-sm text-gray-600 dark:text-white">
                            {isLogin ? locale.Auth.DontHaveAccount : locale.Auth.AlreadyHaveAccount}
                            <button
                                className="ml-2 font-medium text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
                                onClick={() => {
                                    setIsResetPassword(false);
                                    setIsLogin(!isLogin);
                                }}
                            >
                                {isLogin ? locale.Auth.Registration : locale.Auth.Enter}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default AuthComponent;
