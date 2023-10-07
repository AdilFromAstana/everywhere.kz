'use client';
import { isEmpty } from '@/common/functions';
import { mainReducer } from '@/store/slices/mainSlice';
import { useAppSelector } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SelectedTribuneSeats: React.FC = () => {
  const dispatch = useDispatch();
  const { tickets, event } = useAppSelector(({ mainReducer }) => mainReducer);

  const deleteSelectedSeat = (e: any, deleteTicket: any) => {
    const elementOnThePage = document.querySelector(
      `[key="${deleteTicket.key}"]`
    ) as HTMLElement;
    if (elementOnThePage) {
      elementOnThePage.style.backgroundColor = deleteTicket.serviceColor;
      dispatch(
        mainReducer.actions.setTickets(
          tickets.filter((ticket) => ticket.key !== deleteTicket.key)
        )
      );
    }
  };

  const getTotalOfServices = (): number => {
    let TotalOfServices = 0;
    tickets.forEach((ticket) => {
      TotalOfServices += ticket.ticketCount * ticket.serviceCost;
    });
    return TotalOfServices;
  };

  const getTotalOfServicesFee = (): number => {
    return (getTotalOfServices() / 100) * (event ? 1 : event!.serviceFee);
  };

  const getTotalOfServicesWithServiceFee = (): number => {
    return (
      getTotalOfServices() +
      (getTotalOfServices() / 100) * (event ? 1 : event!.serviceFee)
    );
  };

  useEffect(() => {
    let totalAmount = 0;
    if (!isEmpty(tickets)) {
      tickets.forEach((el) => {
        totalAmount += el.serviceCost;
      });
    }
    dispatch(mainReducer.actions.setTotalAmount(totalAmount));
  }, [tickets]);

  return (
    <div className='my-4 flex flex-col gap-2'>
      <div className='text-lg font-semibold'>
        Кол. билетов: {tickets.length}
      </div>
      <div className='grid grid-cols-2 gap-2 lg:grid-cols-6'>
        {tickets.map((ticket: any) => {
          return (
            <div
              className='flex justify-between rounded-xl border border-gray-500 px-3 py-2 text-base'
              key={ticket.key}
            >
              <span>
                {ticket.row} ряд. {ticket.seatNumber} место
              </span>
              <button onClick={(e) => deleteSelectedSeat(e, ticket)}>x</button>
            </div>
          );
        })}
      </div>
      <div className='text-lg font-semibold'>
        <span className='mr-2 text-gray-500'>Итого:</span>
        {getTotalOfServices()}тг.
      </div>
      <div className='text-lg font-semibold'>
        <span className='mr-2 text-gray-500'>
          Сервисный сбор {event?.serviceFee}%:
        </span>
        {getTotalOfServicesFee()}тг.
      </div>
      <div className='text-lg font-semibold'>
        <span className='mr-2 text-gray-500'>Общая стоимость:</span>
        {getTotalOfServicesWithServiceFee()}тг.
      </div>
    </div>
  );
};

export default SelectedTribuneSeats;
