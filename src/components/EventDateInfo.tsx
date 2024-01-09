'use client';

import { getCookie } from 'cookies-next';
import moment from 'moment';

import 'moment/locale/ru';
import 'moment/locale/kk';

import { useEffect, useState } from 'react';

interface EventDateProps {
    date: any;
}

const EventDateInfo = ({ date }: EventDateProps) => {
    const [data, setData] = useState('');
    const UserLang = getCookie('UserLang');

    useEffect(() => {
        if (!UserLang) {
            setData(moment(date).locale('ru_Ru').format('Do MMMM HH:mm'));
        } else {
            switch (UserLang.toLocaleLowerCase()) {
                case 'kz':
                    setData(`${moment(date).locale('kz').format('Do MMMM HH:mm')}`);
                    break;
                case 'en':
                    setData(`${moment(date).locale('en').format('Do MMMM HH:mm')}`);
                    break;
                case 'ru':
                default:
                    setData(`${moment(date).locale('ru_Ru').format('Do MMMM HH:mm')}`);
                    break;
            }
        }
    }, []);

    return <>{data}</>;
};

export default EventDateInfo;
