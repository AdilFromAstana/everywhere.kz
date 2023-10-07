'use client';

import ru from 'date-fns/locale/ru';
import React, { useState } from 'react';
import './SelectDay.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAppSelector } from '@/store/store';
import { isSameDay } from 'date-fns';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { mainReducer } from '@/store/slices/mainSlice';

type ArrowIconProps = {
  side: string;
};

const ArrowIcon: React.FC<ArrowIconProps> = ({ side }: { side: string }) => {
  return (
    <div
      style={{
        rotate: side === 'right' ? '180deg' : '0deg',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='9'
        viewBox='0 0 14 9'
        fill='none'
      >
        <path
          d='M12.5 4.5L8.5 0.5M12.5 4.5L8.5 8.5M12.5 4.5H0'
          stroke='#181818'
        />
      </svg>
    </div>
  );
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const SelectDay: React.FC = () => {
  const { sessions, selectedDay } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const dispatch = useDispatch();

  const onChange = (v: Value) => {
    dispatch(mainReducer.actions.setSelectedDay(v));
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    return !sessions.some((session) =>
      isSameDay(date, new Date(session.beginDateTime))
    );
  };

  return (
    <div className='selectDay'>
      <Calendar
        onChange={onChange}
        value={selectedDay as Value}
        tileDisabled={tileDisabled}
        showNeighboringMonth={false}
        nextLabel={<ArrowIcon side={'left'} />}
        prevLabel={<ArrowIcon side={'right'} />}
        navigationLabel={({ date }) => {
          return <p>{moment(date).format('YYYY MMMM')}</p>;
        }}
      />
    </div>
  );
};

export default SelectDay;
