'use client';

import 'react-phone-number-input/style.css';

import React, { useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Input from 'react-phone-number-input/input';

import { isEmpty } from '@/functions';

interface OfferFormProps {}

const OfferForm = ({}: OfferFormProps) => {
    const [PhoneNumber, setPhoneNumber] = useState<any>('');
    const [EnteredData, setEnteredData] = useState<any>();

    const sendData = async (e: any) => {
        const target = e.target;

        const Name = target[0].value;

        const data = {
            Name,
            PhoneNumber,
        };

        e.stopPropagation();
        e.preventDefault();

        await fetch(process.env.NEXT_PUBLIC_EVENTUM_TEMP_URL + 'commercial_offer_applications', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Спасибо! Мы свяжемся с вами в ближайшее время');
                    // router.push('/');
                    setEnteredData(data);
                } else {
                    alert('Произошла ошибка, попробуйте позже');
                }
            })
            .catch((err) => {
                console.log('err: ', err);
                alert('Произошла ошибка, попробуйте позже');
            });
    };

    if (isEmpty(EnteredData)) {
        return (
            <form onSubmit={sendData} className="w-2/3 flex flex-col gap-5">
                <div>
                    <div>
                        <input
                            type="text"
                            name="Name"
                            placeholder="Ваше имя"
                            id="Name"
                            className="block w-full rounded-3xl border-0 p-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <Input
                        id="PhoneNumber"
                        country="KZ"
                        value={PhoneNumber}
                        international
                        withCountryCallingCode
                        className="block w-full rounded-3xl border-0 p-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onChange={(value) => setPhoneNumber(value)}
                        // limitMaxLength={true}
                    />
                    {PhoneNumber && (!isValidPhoneNumber(PhoneNumber ?? '') || PhoneNumber.length > 12) && (
                        <label htmlFor="PhoneNumber" className="block text-base leading-6 text-white font-semibold">
                            Введите правильный номер
                        </label>
                    )}
                </div>
                <button
                    disabled={!isValidPhoneNumber(PhoneNumber ?? '') || PhoneNumber.length > 12}
                    type="submit"
                    className="w-full rounded-3xl bg-[#D7A933] disabled:bg-[#937f4b] px-3 py-2 text-2xl font-semibold text-white disabled:text-gray-200"
                >
                    Отправить
                </button>
            </form>
        );
    } else {
        return (
            <>
                <div className="text-2xl text-center text-white">Спасибо, {EnteredData.Name}!</div>
                <div className="text-2xl text-center text-white">Мы свяжемся с вами в ближайшее время</div>
            </>
        );
    }
};

export default OfferForm;
