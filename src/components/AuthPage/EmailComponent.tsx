import { useEffect, useRef, useState } from 'react';

import EmailCodeInput from './EmailCodeInput';

interface EmailComponentProps {
    isCodeSent: boolean;
    setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailComponent: React.FC<EmailComponentProps> = ({ isCodeSent, setIsCodeSent }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timerSeconds, setTimerSeconds] = useState(120);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const isCodeValid = code.every((value) => value !== '');

    const startTimer = () => {
        setIsTimerActive(true);
        setTimerSeconds(120);
    };

    const handleCodeSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_URL + '/users/activate', {
                method: 'POST',
                body: JSON.stringify({ activationCode: code.join('') }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch data. Status: ${res.status}`);
            }

            const resData = await res.json();
            document.cookie = resData.accessToken; // Handle the token as needed
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | null = null;

        if (isTimerActive) {
            timerInterval = setInterval(() => {
                setTimerSeconds((prevSeconds) => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else {
                        setIsTimerActive(false);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [isTimerActive]);

    const formatTimer = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendClick = async () => {
        startTimer();
    };

    return (
        <div className="w-full max-w-md p-8 space-y-8 rounded shadow-md flex flex-col items-center">
            <h2 className="dark:text-white text-2xl font-bold text-center">Подтверждение почты</h2>
            <EmailCodeInput code={code} setCode={setCode} inputRefs={inputRefs} />
            <button
                className={`w-full px-4 py-2 font-medium text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isCodeValid
                        ? 'bg-blue-500 hover:bg-blue-400 focus:ring-indigo-500'
                        : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!isCodeValid}
                onClick={handleCodeSubmit}
            >
                Подтвердить
            </button>
            <button
                className={`w-full px-4 py-2 font-medium text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isTimerActive
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-400 focus:ring-indigo-500'
                }`}
                disabled={isTimerActive}
                onClick={handleResendClick}
            >
                {isTimerActive ? `Отправить повторно в ${formatTimer(timerSeconds)}` : 'Переотправить код'}
            </button>
            <div className="mt-6 text-center">
                <button className="text-blue-500 hover:text-blue-400" onClick={() => setIsCodeSent(!isCodeSent)}>
                    Изменить почту
                </button>
            </div>
        </div>
    );
};

export default EmailComponent;
