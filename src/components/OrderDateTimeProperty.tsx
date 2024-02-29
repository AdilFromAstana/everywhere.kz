'use client';

import { getCookie } from 'cookies-next';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import 'moment/locale/ru';
import 'moment/locale/kk';

interface OrderPropertyProps {
    cityTimeZone: number;
    fieldName: string;
    date: string;
}

const OrderDateTimeProperty = ({ fieldName, date, cityTimeZone }: OrderPropertyProps) => {
    const [formatedDate, setFormatedDate] = useState('');
    const UserLang = getCookie('UserLang');

    useEffect(() => {
        if (date) {
            setFormatedDate(
                moment(date)
                    .utc()
                    .add(cityTimeZone, 'h')
                    .locale(UserLang?.toLocaleLowerCase() ?? 'ru-RU')
                    .format('Do MMMM HH:mm')
            );
        }
    }, [date]);

    return (
        <div className="flex flex-row justify-between gap-2 w-full">
            <div className="text-[#00000080] dark:text-white lg:text-2xl text-base">{fieldName}</div>
            <div className="lg:text-2xl text-base text-right dark:text-white">{formatedDate}</div>
        </div>
    );
};

export default OrderDateTimeProperty;
