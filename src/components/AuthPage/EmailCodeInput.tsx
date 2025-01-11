import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import './style.css'; // Подключаем файл стилей

interface EmailCodeInputProps {
    code: string[]; // Array of string codes (each input value)
    setCode: React.Dispatch<React.SetStateAction<string[]>>; // Function to update code state
    inputRefs: React.MutableRefObject<HTMLInputElement[]>; // Ref to store input elements
}

const EmailCodeInput: React.FC<EmailCodeInputProps> = ({ code, setCode, inputRefs }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let value = e.target.value;
        const regex = /^[0-9]*$/;
        if (!regex.test(value)) {
            value = '';
        }
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (inputRefs.current[index + 1] && value !== '') {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            // Устанавливаем значение пустой строкой в массиве состояния
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);

            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    return (
        <div className="w-full flex justify-between gap-2 m-0 p-0">
            {code.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    className="text-xl h-12 w-12 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            ))}
        </div>
    );
};

export default EmailCodeInput;
