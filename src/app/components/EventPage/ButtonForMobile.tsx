'use client';
import { modalReducer } from '@/store/slices/modalSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const ButtonForMobile: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <button
      className='mb-10 block w-full rounded-full bg-[#0590C4] py-4 font-semibold text-white lg:hidden'
      onClick={() => dispatch(modalReducer.actions.openPaymentModal())}
    >
      Купить билет
    </button>
  );
};

export default ButtonForMobile;
