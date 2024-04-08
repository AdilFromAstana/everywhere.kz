import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import 'dayjs/locale/kk';
import 'dayjs/locale/en';

import { CookieValueTypes } from 'cookies-next';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface EventDateProps {
    cityTimeZone: number;
    UserLang: CookieValueTypes;
    date: any;
}

const EventDateInfo = async ({ UserLang, date, cityTimeZone }: EventDateProps) => {
    dayjs.locale(UserLang?.toLowerCase() ?? 'ru');

    return `${dayjs(date).utc().add(cityTimeZone, 'h').format('D MMMM HH:mm')}`;
};

export default EventDateInfo;
