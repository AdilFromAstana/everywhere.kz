'use client';

import { Datepicker, DatepickerEvent } from '@meinefinsternis/react-horizontal-date-picker';
import { Locale, ru } from 'date-fns/locale';

import './HorizontalCalendar.css';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { isEmpty } from '@/functions';

// Создаём копию объекта русской локализации
const customRuLocale: Locale = {
    ...ru,
    // Модифицируем массив названий месяцев
    localize: {
        ...ru.localize,
        month: (n: any) => {
            // Кастомные названия месяцев
            const customMonths = [
                'Янв.',
                'Фев.',
                'Март',
                'Апр.',
                'Май',
                'Июнь',
                'Июль',
                'Авг.',
                'Сент.',
                'Окт.',
                'Нояб.',
                'Дек.',
            ];

            return customMonths[n]; // Возвращаем полное название месяца
        },
    },
};

interface HorizontalCalendarProps {
    startDate?: string;
    period?: string;
}

const HorizontalCalendar = ({ startDate, period }: HorizontalCalendarProps) => {
    const router = useRouter();

    const startValue = !isEmpty(startDate) && startDate ? dayjs(startDate, 'YYYY-MM-DD').toDate() : null;
    const endValue =
        !isEmpty(startDate) && period ? dayjs(startDate, 'YYYY-MM-DD').add(parseInt(period), 'd').toDate() : null;

    const handleChange = (d: DatepickerEvent) => {
        const [startValue, _, rangeDates] = d;
        console.log('_: ', _);
        let query = '/';

        if (startValue && !isEmpty(startValue)) {
            query = query + '?startDate=' + dayjs(startValue).format('YYYY-MM-DD');
        }

        if (rangeDates && !isEmpty(rangeDates)) {
            query = query + '&period=' + (rangeDates.length - 1);
        }

        router.push(query, { scroll: false });
    };

    return (
        <div className="HorizontalCalendar container mx-auto">
            <Datepicker
                classNames={{
                    selectedDay: 'SelectedDay',
                    rangeDays: 'RangeDays',
                    dayItem: 'DayItem',
                    dayLabel: 'DayLabel',
                    monthLabel: 'MonthLabel',
                    dateLabel: 'DateLabel',
                    weekendItem: 'WeekendItem',
                }}
                onChange={handleChange}
                locale={customRuLocale}
                startValue={startValue}
                endValue={endValue}
            />
        </div>
    );
};
export default HorizontalCalendar;
