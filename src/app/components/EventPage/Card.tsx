/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/classnames-order */

'use client';

import type { UUID } from 'crypto';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import SelectDay from './SelectDay/SelectDay';
import Выбор сеанса from './Выбор сеанса/Выбор сеанса';
import { Events } from '@/services/axios';
import 'moment/locale/ru';
import {
  ICardProps,
  IOrderInfo,
  IScheduleItem,
  ISectorOfVenue,
  ISelectCalendarProps,
  ISelectedSector,
  IServiceForOrder,
  IServiceInOrder,
  ISessionService,
  IVenue,
} from '@/interfaces/Interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store/store';
import { mainReducer } from '@/store/slices/mainSlice';
import SelectStandingPlace from '@/app/components/EventPage/SelectStandingPlace/SelectStandingPlace';
import PaymentForm from '@/app/components/EventPage/PaymentForm/PaymentForm';
import OrderPayment from '@/app/components/EventPage/Modal/ModalContent/Order/OrderPayment';
import SelectSector from '@/app/components/EventPage/SelectSector/SelectSector';
moment.locale('ru');

const Card: React.FC<ICardProps> = ({
  eventId,
  serviceFee,
  isVisible,
  setIsVisible,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [eventSchedule, setEventSchedule] = useState<IScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedSession, setSelectedSession] =
    useState<IScheduleItem | null>();
  const [sectors, setSectors] = useState<ISectorOfVenue[]>([]);
  const [services, setServices] = useState<ISessionService[]>([]);
  const [servicesForOrder, setServicesForOrder] = useState<IServiceForOrder[]>(
    []
  );
  const { tickets, paymentInfo } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const {
    paymentMethod,
    phoneNumber,
    confirmPhoneNumber,
    isGetInfoAllow,
    isTreaty,
  } = paymentInfo;

  const onВыбор сеанса = (session: IScheduleItem): void => {
    setSelectedSession(session);
    getVenue(session.id);
  };

  const onSelectDate = (date: moment.Moment | null): void => {
    setSelectedDate(date);
  };

  const getSessionInSelectedDay = () => {
    return eventSchedule.filter(
      (session) =>
        moment(session.beginDateTime).format('DD/MM/YYYY') ===
        selectedDate?.format('DD/MM/YYYY')
    );
  };

  const closeCard = (): void => {
    setIsVisible(false);
  };

  const getEventSchedule = async () => {
    await Events()
      .get(`/events/${eventId}/schedule`)
      .then(({ data }) => {
        setEventSchedule(data.items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getServices = async (sessionId: UUID, sectorId: UUID) => {
    await Events()
      .get<ISelectedSector>(
        `Sessions/places?SessionId=${sessionId}&SectorId=${sectorId}`
      )
      .then(({ data }) => {
        if (data.places.length === 1) {
          dispatch(mainReducer.actions.setServiceGroups(data.places[0]));
        } else {
          dispatch(mainReducer.actions.setServiceGroups([]));
        }
        dispatch(
          mainReducer.actions.setCustomServiceGroups(data.customServiceGroups)
        );
        dispatch(mainReducer.actions.setSectorLegend(data.sectorLegend));
        dispatch(
          mainReducer.actions.setSector({ sectorId: sectorId, ...data })
        );
      });
  };

  const getVenue = async (sessionId: UUID) => {
    await Events()
      .get<IVenue>(`sessions/venue?sessionId=${sessionId}`)
      .then(({ data, status }) => {
        if (status === 200) {
          setSectors(data.sectors);
          dispatch(mainReducer.actions.setHall(data));
          if (data.sectors.length === 1) {
            const sectorId = data.sectors[0].id;
            getServices(sessionId, sectorId);
          }
        }
      });
  };

  const onNextButtonClick = (): void => {
    setSelectedIndex((prev) => prev + 1);
  };

  const prevStep = (): void => {
    setSelectedIndex((prev) => prev - 1);
  };

  const getTotalPrice = (): number => {
    return tickets.reduce((total, service: IServiceForOrder) => {
      return total + service.ticketCount * service.serviceCost;
    }, 0);
  };

  const getTicketCount = (): number => {
    return tickets.reduce((total, service: IServiceForOrder) => {
      return total + service.ticketCount;
    }, 0);
  };

  const doesFormComplited = (): boolean => {
    const areTheNumbersTheSame = phoneNumber === confirmPhoneNumber;
    return isTreaty && isGetInfoAllow && areTheNumbersTheSame;
  };

  const isButtonDisabled = (): boolean => {
    if (selectedIndex === 1) {
      return selectedSession === undefined;
    } else if (selectedIndex === 2) {
      return getTotalPrice() <= 0;
    } else if (selectedIndex === 3) {
      return !doesFormComplited();
    } else if (selectedIndex === 4) {
      return false;
    }
    return selectedDate === null;
  };

  const cardTitle = (): string => {
    if (selectedIndex === 1) {
      return 'Выберите сеанс';
    } else if (selectedIndex === 2) {
      return 'Выберите услугу';
    } else if (selectedIndex === 3) {
      return 'Подтвердите данные';
    } else if (selectedIndex === 4) {
      return 'Подтвердите оплату';
    }
    return 'Выберите дату';
  };

  useEffect(() => {
    getEventSchedule();
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-0 bg-gray-800 bg-opacity-50 ${
          isVisible ? 'block' : 'hidden'
        }`}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 h-[85vh] transform rounded-3xl border-t border-gray-300 bg-white p-4 transition-transform duration-300 ${
          isVisible ? 'translate-y-0 ease-out' : 'translate-y-full ease-in'
        }`}
      >
        {isVisible && (
          <div className='flex h-full flex-col'>
            <div className='flex h-8 justify-between'>
              <button
                type='button'
                onClick={prevStep}
                disabled={selectedIndex === 0}
              >
                {'<'}
              </button>
              <span>{cardTitle()}</span>
              <button type='button' onClick={closeCard}>
                x
              </button>
            </div>
            <SelectDay
              eventSchedule={eventSchedule}
              closeCard={closeCard}
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
              onNextButtonClick={onNextButtonClick}
            />
            <div
              className={`fixed left-0 right-0 top-12 h-80 transform border-t border-gray-300 bg-white p-4 transition-transform duration-300 ${
                selectedIndex >= 1
                  ? 'translate-x-0 ease-out'
                  : 'translate-x-full ease-in'
              }`}
            >
              <Выбор сеанса
                eventSchedule={getSessionInSelectedDay()}
                selectedDate={selectedDate}
                selectedSession={selectedSession!}
                onВыбор сеанса={onВыбор сеанса}
              />
            </div>
            <div
              className={`fixed left-0 right-0 top-12 h-80 transform border-t border-gray-300 bg-white p-4 transition-transform duration-300 ${
                selectedIndex >= 2
                  ? 'translate-x-0 ease-out'
                  : 'translate-x-full ease-in'
              }`}
            >
              {/* <SelectStandingPlace
                servicesForOrder={servicesForOrder}
                setServicesForOrder={setServicesForOrder}
              /> */}
              <SelectSector />
            </div>
            <div
              className={`fixed left-0 right-0 top-12 h-80 transform overflow-scroll border-t border-gray-300 bg-white p-4 transition-transform duration-300 ${
                selectedIndex >= 3
                  ? 'translate-x-0 ease-out'
                  : 'translate-x-full ease-in'
              }`}
            >
              <PaymentForm />
            </div>
            <div
              className={`fixed left-0 right-0 top-12 h-${
                selectedIndex === 4 ? 'full' : '80'
              } transform overflow-scroll border-t border-gray-300 bg-white p-4 transition-transform duration-300 ${
                selectedIndex >= 4
                  ? 'translate-x-0 ease-out'
                  : 'translate-x-full ease-in'
              }`}
            >
              <OrderPayment
                stepIndex={selectedIndex}
                selectedSession={selectedSession!}
              />
            </div>
            {selectedIndex !== 4 ? (
              <div className='flex h-64 flex-col justify-end'>
                <div className='mb-4 h-px w-full bg-black' />
                {selectedIndex >= 2 ? (
                  <>
                    <div className='flex justify-between'>
                      <div>Выбранный сеанс</div>
                      <div>
                        {moment(selectedSession?.beginDateTime).format(
                          'D MMMM HH:mm'
                        )}
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div>Билеты</div>
                      <div>{getTicketCount()} шт</div>
                    </div>
                    <div className='flex justify-between'>
                      <div>Итого</div>
                      <div>{getTotalPrice()} ₸</div>
                    </div>
                    <div className='flex justify-between'>
                      <div>Сервисный сбор {serviceFee}%</div>
                      <div>{getTotalPrice() / 100} ₸</div>
                    </div>
                    <div className='flex justify-between'>
                      <div>Общая стоимость</div>
                      <div>{getTotalPrice() / 100 + getTotalPrice()} ₸</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex justify-between'>
                      <div>Дата</div>
                      {selectedDate && (
                        <div>{selectedDate.format('D MMMM YYYY')}</div>
                      )}
                    </div>
                    <div
                      className={`flex justify-between ${
                        selectedIndex > 0 ? 'block' : 'hidden'
                      }`}
                    >
                      <div>Время</div>
                      {selectedSession && (
                        <div>
                          {moment(selectedSession?.beginDateTime).format('LT')}
                        </div>
                      )}
                    </div>
                  </>
                )}
                <button
                  type='button'
                  className={`mb-4 mt-8 w-full rounded-3xl p-2.5 text-sm ${
                    isButtonDisabled()
                      ? 'bg-[#BCBCBC] text-white'
                      : 'bg-[#0590C4] text-white'
                  } `}
                  disabled={isButtonDisabled()}
                  onClick={onNextButtonClick}
                >
                  Далее
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

const CardWrapper: React.FC<ISelectCalendarProps> = ({
  eventId,
  serviceFee,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        type='button'
        className='mt-10 w-full rounded-3xl bg-[#0590C4] p-2.5 text-sm text-white'
        onClick={toggleVisibility}
      >
        Купить билет
      </button>
      <Card
        eventId={eventId}
        serviceFee={serviceFee}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

export default CardWrapper;
