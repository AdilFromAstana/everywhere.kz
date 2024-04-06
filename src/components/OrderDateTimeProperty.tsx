import { CookieValueTypes } from 'cookies-next';
import dayjs from 'dayjs';
import React from 'react';

import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import 'dayjs/locale/en';

interface OrderPropertyProps {
    UserLang: CookieValueTypes;
    cityTimeZone: number;
    fieldName: string;
    date: string;
}

const OrderDateTimeProperty = ({ UserLang, fieldName, date, cityTimeZone }: OrderPropertyProps) => {
    dayjs.locale(UserLang?.toLowerCase() || 'ru');

    return (
        <div className="flex flex-row justify-between gap-2 w-full">
            <div className="text-[#00000080] dark:text-white lg:text-2xl text-base">{fieldName}</div>
            <div className="lg:text-2xl text-base text-right dark:text-white">
                {dayjs(
                    dayjs(date)
                        .format()
                        .replace(/\+\d{2}:\d{2}$/, 'Z')
                )
                    .add(cityTimeZone, 'h')
                    .format('D MMMM HH:mm')}
            </div>
        </div>
    );
};

export default OrderDateTimeProperty;
