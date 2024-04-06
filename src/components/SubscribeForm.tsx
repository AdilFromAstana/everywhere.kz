'use client';

import 'react-phone-number-input/style.css';

import React, { useState } from 'react';

import { isEmpty } from '@/functions';

interface SubscribeFormProps {}

const SubscribeForm = ({}: SubscribeFormProps) => {
    const [dataIsEntered, setDataIsEntered] = useState(false);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e: any) => {
        const { value } = e.target;
        setEmail(value);
        setIsValid(validateEmail(value));
    };

    const sendData = async (e: any) => {
        const target = e.target;

        const Email = target[0].value;

        if (isEmpty(Email)) {
            alert('Пожалуйста, введите почту');
        }

        const data = {
            Email,
        };

        e.stopPropagation();
        e.preventDefault();

        await fetch(process.env.NEXT_PUBLIC_SERVICES_TEMP_URL + 'email_subscribers', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Вы успешно подписались!');
                    // router.push('/');
                    setDataIsEntered(true);
                } else {
                    alert('Произошла ошибка, попробуйте позже');
                }
            })
            .catch((err) => {
                console.log('err: ', err);
                alert('Произошла ошибка, попробуйте позже');
            });
    };

    if (!dataIsEntered) {
        return (
            <div className="container mx-auto">
                <div className="bg-[#E8F5FF] rounded-2xl w-full flex lg:flex-row flex-col lg:py-16 lg:px-12 lg:gap-14 py-10 px-6 gap-6">
                    <span className="font-bold lg:text-3xl lg:w-2/5 w-full text-center ">
                        Подписывайтесь, чтобы получать информацию об акциях и анонсах
                    </span>
                    <form
                        onSubmit={sendData}
                        className="lg:mx-8 lg:w-3/5 flex lg:flex-row flex-col gap-5 bg-white rounded-2xl shadow-header justify-between p-10"
                    >
                        <input
                            type="email"
                            onChange={handleEmailChange}
                            value={email}
                            name="Email"
                            placeholder="Ваша почта"
                            id="Email"
                            className="block rounded-2xl lg:w-2/3 border-0 p-1.5 text-black placeholder:px-2 placeholder:text-gray-400 bg-[#F6F6F6] sm:text-sm sm:leading-6"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="lg:py-0 py-1 rounded-2xl lg:w-1/3 bg-[#0490C3] disabled:bg-[#0490c3be] text-white disabled:text-gray-200"
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container mx-auto">
                <div className="bg-[#E8F5FF] rounded-2xl w-full flex lg:flex-row flex-col lg:py-16 lg:px-12 lg:gap-14 py-10 px-6 gap-6">
                    <span className="font-bold lg:text-3xl lg:w-2/5 w-full text-center ">Спасибо за подписку!</span>
                </div>
            </div>
        );
    }
};

export default SubscribeForm;
