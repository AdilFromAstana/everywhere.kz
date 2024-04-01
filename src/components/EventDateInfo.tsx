'use server';

import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import 'dayjs/locale/en';

import { cookies } from 'next/headers';

interface EventDateProps {
    cityTimeZone: number;
    date: any;
}

const EventDateInfo = ({ date, cityTimeZone }: EventDateProps) => {
    const UserLang = getCookie('UserLang', { cookies }) || 'ru';

    dayjs.locale(UserLang.toLowerCase());

    return `${dayjs(
        dayjs(date)
            .format()
            .replace(/\+\d{2}:\d{2}$/, 'Z')
    )
        .add(cityTimeZone * -1, 'h')
        .format('D MMMM HH:mm')}`;
};

export default EventDateInfo;
