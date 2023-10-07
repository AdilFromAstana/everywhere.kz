'use client';
import { useAppSelector } from '@/store/store';
import React, { useState, useEffect } from 'react';
import {
  Datepicker,
  DatepickerEvent,
} from '@meinefinsternis/react-horizontal-date-picker';
import { enUS, ru, kk } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { inlineCalendarReducer } from '@/store/slices/inlineCalendarSlice';

const InlineCalendar: React.FC = () => {
  const [date, setDate] = React.useState<{
    endValue: Date | null;
    startValue: Date | null;
  }>({
    startValue: null,
    endValue: null,
  });

  const dispatch = useDispatch();
  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue] = d;
    dispatch(
      inlineCalendarReducer.actions.setStartDate(
        startValue ? new Date(startValue).toISOString() : startValue
      )
    );
    dispatch(
      inlineCalendarReducer.actions.setEndDate(
        endValue ? new Date(endValue).toISOString() : endValue
      )
    );
    setDate((prev) => ({ ...prev, endValue, startValue }));
  };

  return (
    <div className='hidden lg:block'>
      <Datepicker
        onChange={handleChange}
        locale={ru}
        startValue={date.startValue}
        endValue={date.endValue}
      />
    </div>
  );
};

export default InlineCalendar;
