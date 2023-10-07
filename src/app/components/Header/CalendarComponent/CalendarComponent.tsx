'use client';
import React, { useState } from 'react';
import './CalendarComponent.scss';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/store';
import { inlineCalendarReducer } from '@/store/slices/inlineCalendarSlice';

interface ICalendarComponent {
  isCalendarVisible: boolean;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarComponent: React.FC<ICalendarComponent> = ({
  isCalendarVisible,
  setCalendarVisible,
}) => {
  const dispatch = useDispatch();
  const [calendarStartDate, setCalendarStartDate] = useState(null);
  const [calendarEndDate, setCalendarEndDate] = useState(null);
  const { startDate, endDate } = useAppSelector(
    ({ inlineCalendarReducer }) => inlineCalendarReducer
  );
  const modalStyles = isCalendarVisible
    ? 'fixed top-0 start-0 end-0 bottom-0 h-full z-50'
    : 'hidden';

  const modalContentStyles = isCalendarVisible
    ? 'z-10 rounded-lg bg-white flex flex-col justify-between overflow-y-auto absolute transform h- -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'
    : 'hidden';

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setCalendarStartDate(start);
    setCalendarEndDate(end);
  };

  const confirmDates = () => {
    dispatch(inlineCalendarReducer.actions.setStartDate(calendarStartDate));
    dispatch(inlineCalendarReducer.actions.setEndDate(calendarEndDate));
    setCalendarVisible(!isCalendarVisible);
  };

  const resetDates = () => {
    setCalendarStartDate(null);
    setCalendarEndDate(null);
    dispatch(inlineCalendarReducer.actions.setStartDate(null));
    dispatch(inlineCalendarReducer.actions.setEndDate(null));
    setCalendarVisible(false);
  };

  return (
    <div className={`${modalStyles} modal`}>
      <div className='fixed inset-0 bg-black opacity-50' />
      <div className={modalContentStyles}>
        <div className='p-4'>
          <div>Выберите даты</div>
          {/* <DatePicker
            selected={calendarStartDate}
            onChange={onChange}
            startDate={calendarStartDate}
            endDate={calendarEndDate}
            selectsRange
            inline
            minDate={new Date()}
            locale='ru-RU'
          /> */}
          <div className='flex justify-between'>
            <button
              className='rounded-lg border bg-blue-600 p-2 text-white'
              onClick={confirmDates}
            >
              Сохранить
            </button>
            <button
              className='rounded-lg border bg-red-600 p-2 text-white'
              onClick={resetDates}
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
