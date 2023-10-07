'use client';
import React, { useEffect } from 'react';
import successIcon from '../../../../icons/successIcon.png';
import { useAppSelector } from '@/store/store';
import { useDispatch } from 'react-redux';
import { mainReducer } from '@/store/slices/mainSlice';
import { modalReducer } from '@/store/slices/modalSlice';

const PaymentSuccessModal: React.FC = () => {
  const dispatch = useDispatch();
  const { doesSuccessModalOpen } = useAppSelector(
    ({ modalReducer }) => modalReducer
  );
  const { currentOrderData } = useAppSelector(({ mainReducer }) => mainReducer);

  const getModalStyles = (): string => {
    if (doesSuccessModalOpen) {
      return 'fixed top-0 start-0 end-0 bottom-0 z-50 px-10 py-8 flex flex-col items-center justify-center';
    } else {
      return 'hidden';
    }
  };

  const getModalContentStyles = (): string => {
    if (doesSuccessModalOpen) {
      return 'z-10 rounded-lg bg-white flex flex-col justify-between items-center absolute lg:w-2/6 w-3/4 gap-10 p-10';
    } else {
      return 'hidden';
    }
  };

  const onMainPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (doesSuccessModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when the modal is open
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling when the modal is closed
    }

    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling on component unmount
    };
  }, [doesSuccessModalOpen]);

  return (
    <div className={`${getModalStyles()}`}>
      <div className='fixed inset-0 bg-black opacity-50' />
      <div className={getModalContentStyles()}>
        <div className='text-4xl'>Ваш заказ успешно оплачен!</div>
        <img
          src={successIcon.src}
          alt='success icon'
          width='100px'
          height='100px'
        />
        <div className='text-center text-xl text-gray-500'>
          Номер заказа: {currentOrderData?.number}. SMS с билетом придет на{' '}
          <b>номер который Вы указали ранее.</b>
        </div>
        <div className='flex w-full flex-row-reverse gap-2'>
          <button className='basis-1/3 rounded-lg border border-black bg-white px-2 py-1 text-lg'>
            Купить ещё
          </button>
          <button
            className='basis-1/3 rounded-lg border-blue-500 bg-blue-500 px-2 py-1 text-lg text-white'
            onClick={onMainPage}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
