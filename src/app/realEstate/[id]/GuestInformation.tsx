'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, message, Select, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect, useState } from 'react';

dayjs.extend(isBetween); // Подключение плагина
const { Text } = Typography;
const { RangePicker } = DatePicker;

const getBlockedDays = (busyDates: any) => {
    const blockedDays: any[] = [];

    busyDates.forEach(({ start, end }: { start: any; end: any }) => {
        const startDate = dayjs(start).startOf('day');
        const endDate = dayjs(end).startOf('day');

        const currentDate = startDate.add(1, 'day');

        if (currentDate.isBefore(endDate)) {
            blockedDays.push(currentDate.format('YYYY-MM-DD'));
        }
    });

    const uniqueBlockedDays = blockedDays.filter((date, index) => blockedDays.indexOf(date) === index);

    return uniqueBlockedDays;
};

interface IGuestInforamation {
    setCheckInTime: any;
    setCheckOutTime: any;
    setCheckInOutDate: any;
    checkInTime: any;
    checkOutTime: any;
    checkInOutDate: any;
    setAdultCount: any;
    adultCount: number;
    setChildCount: any;
    childCount: number;
    realEstate: any;
    busyDates: { start: string; end: string }[];
}

const GuestInforamation: React.FC<IGuestInforamation> = ({
    setCheckOutTime,
    setCheckInTime,
    setCheckInOutDate,
    checkInTime,
    checkOutTime,
    checkInOutDate,
    adultCount,
    setAdultCount,
    childCount,
    setChildCount,
    realEstate,
    busyDates,
}) => {
    const totalGuests = childCount + adultCount;
    // const [disabledDate, setDisabledDate] = useState<(current: Dayjs) => boolean>(() => () => false);
    const [checkInTimeOptions, setCheckInTimeOptions] = useState<any[]>([]);
    const [checkOutTimeOptions, setCheckOutTimeOptions] = useState<any[]>([]);

    const blockedDays = getBlockedDays(busyDates);

    // const updateDisabledDate = (_checkInOutDate: any) => {
    //     const startDate = _checkInOutDate ? _checkInOutDate[0] : null;

    //     if (startDate) {
    //         // Находим первую заблокированную дату, которая после startDate
    //         const nextDisabledDate = blockedDays.map((date) => dayjs(date)).find((date) => date.isAfter(startDate));

    //         setDisabledDate(() => (current: any): boolean => {
    //             if (!current || current.isBefore(dayjs().startOf('day'))) {
    //                 return true; // Блокируем прошлые даты
    //             }

    //             if (startDate && nextDisabledDate) {
    //                 return (
    //                     current.isAfter(nextDisabledDate) || // Разрешаем даты после следующей заблокированной
    //                     blockedDays.some((date) => dayjs(date).isSame(current, 'day')) // Проверяем, является ли текущая дата заблокированной
    //                 );
    //             }

    //             // Проверяем, является ли текущая дата заблокированной
    //             return blockedDays.some((date) => dayjs(date).isSame(current, 'day'));
    //         });
    //     } else {
    //         setDisabledDate(() => (current: any): boolean => {
    //             return (
    //                 dayjs(current).isBefore(dayjs().startOf('day')) || // Блокируем прошлые даты
    //                 blockedDays.some((date) => dayjs(date).isSame(current, 'day')) // Проверяем, является ли текущая дата заблокированной
    //             );
    //         });
    //     }
    // };

    console.log('blockedDays: ', blockedDays);

    const updateOptions = () => {
        if (checkInOutDate && checkInOutDate[0] && checkInOutDate[1]) {
            let _checkInTimeOptions = [];
            let _checkOutTimeOptions = [];
            const startDate = checkInOutDate[0];
            const endDate = checkInOutDate[1];
            // Формирование опций для времени заезда
            _checkInTimeOptions = Array.from({ length: 24 }, (_, i) => {
                const time = startDate.clone().hour(i).minute(0).second(0);
                return {
                    label: `${time.format('DD.MM.YYYY в HH:00')}`,
                    value: time.format('YYYY-MM-DD HH:00'),
                };
            });

            // Формирование опций для времени выезда
            _checkOutTimeOptions = Array.from({ length: 24 }, (_, i) => {
                const time = endDate.clone().hour(i).minute(0).second(0);
                return {
                    label: `${time.format('DD.MM.YYYY в HH:00')}`,
                    value: time.format('YYYY-MM-DD HH:00'),
                };
            });
            setCheckInTimeOptions(_checkInTimeOptions);
            setCheckOutTimeOptions(_checkOutTimeOptions);
        } else {
            setCheckInTimeOptions([]);
            setCheckOutTimeOptions([]);
        }
    };

    useEffect(() => {
        updateOptions();
    }, [checkInOutDate]);

    useEffect(() => {
        // updateDisabledDate(null);
    }, []);

    const isFullyBusy = (date: any) => {
        return blockedDays.includes(date.format('YYYY-MM-DD'));
    };
    
    const isPartiallyBusy = (date: any) => {
        // Проверяем, есть ли текущая дата в массиве частично занятых дат
        return busyDates.some(({ start, end }) => {
            const startDate = dayjs(start).startOf('day');
            const endDate = dayjs(end).startOf('day');
            return date.isBetween(startDate, endDate, 'day', '[]');
        });
    };

    const disabledDate = (current: any) => {
        return isFullyBusy(current); // Блокируем полностью занятые даты
    };

    const dateRender = (current: any) => {
        if (isPartiallyBusy(current)) {
            // Если день частично занят, добавляем стиль
            return (
                <div color='text-red'>{current.date()}</div>
            );
        }
        return <div>{current.date()}</div>; // Возвращаем стандартное отображение
    };

    return (
        <>
            <div className="flex flex-col">
                <Text strong>Дата и время заезда</Text>
                {/* <RangePicker
                    onChange={(value) => setCheckInOutDate(value)}
                    format="DD.MM.YYYY"
                    style={{ width: '100%', marginBottom: 8 }}
                    placeholder={['Выберите дату заезда', 'Выберите дату выезда']}
                    value={checkInOutDate}
                    disabledDate={disabledDate}
                    onCalendarChange={updateDisabledDate}
                    renderExtraFooter={() => (
                        <div>
                            <span style={{ color: 'red' }}>●</span> Заблокированные даты
                        </div>
                    )}
                /> */}

                <RangePicker disabledDate={disabledDate} cellRender={dateRender} />
            </div>
            <div className="flex gap-8 w-full">
                <div className="w-full">
                    <Text strong>Время заезда</Text>
                    <Select
                        style={{ width: '100%', marginBottom: 8 }}
                        placeholder="Выберите время заезда"
                        options={checkInTimeOptions}
                        value={checkInTime}
                        disabled={!checkInOutDate}
                        onChange={(value) => {
                            setCheckInTime(value);
                            setCheckOutTime(null);
                        }}
                        onClear={() => setCheckInTime('')}
                        allowClear
                    />
                </div>
                <div className="w-full">
                    <Text strong>Время выезда</Text>
                    <Select
                        value={checkOutTime}
                        style={{ width: '100%', marginBottom: 8 }}
                        placeholder="Выберите время выезда"
                        options={checkOutTimeOptions}
                        onChange={(value) => setCheckOutTime(value)}
                        disabled={!checkInTime}
                        onClear={() => setCheckOutTime('')}
                        allowClear
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 16 }}>
                <Text strong>Информация о гостях</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Взрослые (от 13 лет)</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Button
                            icon={<MinusOutlined />}
                            onClick={() => setAdultCount(Math.max(0, adultCount - 1))}
                            disabled={adultCount === 0}
                        />
                        <Text>{adultCount}</Text>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() =>
                                setAdultCount(Math.min(realEstate.maxAccommodates - childCount, adultCount + 1))
                            }
                            disabled={totalGuests >= 2 || adultCount >= realEstate.maxAccommodates - childCount}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Дети (до 13 лет)</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Button
                            icon={<MinusOutlined />}
                            onClick={() => setChildCount(Math.max(0, childCount - 1))}
                            disabled={childCount === 0}
                        />
                        <Text>{childCount}</Text>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() =>
                                setChildCount(Math.min(realEstate.maxAccommodates - adultCount, childCount + 1))
                            }
                            disabled={totalGuests >= 2 || childCount >= realEstate.maxAccommodates - adultCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default GuestInforamation;
