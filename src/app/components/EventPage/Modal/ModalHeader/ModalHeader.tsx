'use client';
import { isEmpty } from '@/common/functions';
import { modalReducer } from '@/store/slices/modalSlice';
import { useAppSelector } from '@/store/store';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';

const ArrowIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='7'
      height='14'
      viewBox='0 0 7 14'
      fill='none'
    >
      <path
        d='M6.24988 12.9401L1.35988 8.05006C0.782383 7.47256 0.782383 6.52756 1.35988 5.95006L6.24988 1.06006'
        stroke='#292D32'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

interface IStepItems {
  activeStepIndex: number;
  title: string;
}

const ModalHeader: React.FC = () => {
  const dispatch = useDispatch();

  const { event, sessions, hall } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const { activeStepIndex } = useAppSelector(
    ({ modalReducer }) => modalReducer
  );

  const doesHallHasFewSectors = isEmpty(hall)
    ? false
    : hall?.sectors?.length > 1;

  const doesEventHasMoreThenOneSession =
    event?.isRepeatable && sessions?.length > 1;

  const StepItems = (): IStepItems[] => {
    if (doesEventHasMoreThenOneSession) {
      if (doesHallHasFewSectors) {
        if (isMobile) {
          return [
            { activeStepIndex: 0, title: 'Выбор дня' },
            { activeStepIndex: 1, title: 'Выбор сеанса' },
            { activeStepIndex: 2, title: 'Выбор сектора' },
            { activeStepIndex: 3, title: 'Выбор услуг' },
            { activeStepIndex: 4, title: 'Введите данные' },
            { activeStepIndex: 5, title: 'Оплата' },
          ];
        } else {
          return [
            { activeStepIndex: 0, title: 'Выбор сеанса' },
            { activeStepIndex: 1, title: 'Выбор сектора' },
            { activeStepIndex: 2, title: 'Выбор услуг' },
            { activeStepIndex: 3, title: 'Введите данные' },
            { activeStepIndex: 4, title: 'Оплата' },
          ];
        }
      } else {
        if (isMobile) {
          return [
            { activeStepIndex: 0, title: 'Выбор дня' },
            { activeStepIndex: 1, title: 'Выбор сеанса' },
            { activeStepIndex: 2, title: 'Выбор услуг' },
            { activeStepIndex: 3, title: 'Введите данные' },
            { activeStepIndex: 4, title: 'Оплата' },
          ];
        } else {
          return [
            { activeStepIndex: 0, title: 'Выбор сеанса' },
            { activeStepIndex: 1, title: 'Выбор услуг' },
            { activeStepIndex: 2, title: 'Введите данные' },
            { activeStepIndex: 3, title: 'Оплата' },
          ];
        }
      }
    } else {
      if (doesHallHasFewSectors) {
        return [
          { activeStepIndex: 0, title: 'Выбор сектора' },
          { activeStepIndex: 1, title: 'Выбор услуг' },
          { activeStepIndex: 2, title: 'Введите данные' },
          { activeStepIndex: 3, title: 'Оплата' },
        ];
      } else {
        return [
          { activeStepIndex: 0, title: 'Выбор услуг' },
          { activeStepIndex: 1, title: 'Введите данные' },
          { activeStepIndex: 2, title: 'Оплата' },
        ];
      }
    }
  };

  const prevStep = () => {
    dispatch(modalReducer.actions.prevPaymentStepIndex());
  };

  const cancelOrder = () => {};

  if (isMobile) {
    return (
      <div className='flex items-center justify-between font-medium lg:hidden'>
        <button
          className='h-4 w-4'
          disabled={activeStepIndex === 0}
          onClick={prevStep}
        >
          <ArrowIcon />
        </button>
        <div className='text-lg'>{StepItems()[activeStepIndex].title}</div>
        <button className='h-4 w-4'>X</button>
      </div>
    );
  } else {
    return (
      <div className='hidden w-full justify-between rounded-lg border-2 border-[#E0E0E0] px-12 py-3 text-xl lg:flex'>
        {StepItems().map((stepItem) => {
          return (
            <div
              key={stepItem.activeStepIndex}
              className={`font-semibold ${
                stepItem.activeStepIndex === activeStepIndex
                  ? 'text-[#0590C4]'
                  : 'text-[#1A1A1A]'
              }`}
            >
              {stepItem.title}
            </div>
          );
        })}
      </div>
    );
  }
};

export default ModalHeader;
