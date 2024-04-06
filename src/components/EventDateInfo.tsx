import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import 'dayjs/locale/en';

import { CookieValueTypes } from 'cookies-next';

interface EventDateProps {
    cityTimeZone: number;
    UserLang: CookieValueTypes;
    date: any;
}

const EventDateInfo = async ({ UserLang, date, cityTimeZone }: EventDateProps) => {
    dayjs.locale(UserLang?.toLowerCase() ?? 'ru');

    return `${dayjs(
        dayjs(date)
            .format()
            .replace(/\+\d{2}:\d{2}$/, 'Z')
    )
        .add(cityTimeZone, 'h')
        .format('D MMMM HH:mm')}`;
};

export default EventDateInfo;
