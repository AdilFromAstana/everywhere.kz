'use client';
import {
  IScheduleItem,
  ISelectedSector,
  IVenue,
} from '@/interfaces/Interfaces';
import { Events } from '@/services/axios';
import { mainReducer } from '@/store/slices/mainSlice';
import { modalReducer } from '@/store/slices/modalSlice';
import { useAppSelector } from '@/store/store';
import { UUID } from 'crypto';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';

const SelectSession: React.FC = () => {
  const dispatch = useDispatch();
  const [sortedSessions, setSortedSessions] = useState<
    { day: any; sessions: any[] }[]
  >([]);

  const { sessions, selectedSession, serviceGroups } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );

  const getServices = async (sessionId: UUID, sectorId: UUID) => {
    await Events()
      .get<ISelectedSector>(
        `Sessions/places?SessionId=${sessionId}&SectorId=${sectorId}`
      )
      .then(({ data }) => {
        dispatch(
          mainReducer.actions.setCustomServiceGroups(data.customServiceGroups)
        );
        dispatch(mainReducer.actions.setServiceGroups(data.places[0]));
        dispatch(mainReducer.actions.setSectorLegend(data.sectorLegend));
        dispatch(
          mainReducer.actions.setSector({ sectorId: sectorId, ...data })
        );
        if (data.places[0].id !== serviceGroups?.id) {
          dispatch(mainReducer.actions.setTickets([]));
        }
      });
  };

  const getVenue = async (sessionId: UUID) => {
    await Events()
      .get<IVenue>(`sessions/venue?sessionId=${sessionId}`)
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch(mainReducer.actions.setHall(data));
          if (data.sectors.length === 1) {
            const sectorId = data.sectors[0].id;
            getServices(sessionId, sectorId);
          }
        }
      });
  };

  const onSelectSession = (session: IScheduleItem): void => {
    dispatch(mainReducer.actions.setSelectedSession(session));
    getVenue(session.id);
    dispatch(modalReducer.actions.nextPaymentStepIndex());
  };

  const sessionsWrapper = 'grid grid-cols-3 gap-4';
  const lgSessionsWrapper =
    'lg:px-8 lg:py-6 lg:border-2 lg:border-[#B6B6B6] lg:rounded-2xl';

  const lgSessionButton = `px-4 py-1 border-2 rounded-lg hover:text-[#0590C4] font-semibold text-xl`;
  const lgSessionButtonList = 'flex gap-4 w-full';

  useEffect(() => {
    if (!isMobile) {
      const sotredData: { day: any; sessions: any[] }[] = [];
      sessions.forEach((item: any, index: number) => {
        if (index === 0) {
          sotredData.push({
            day: moment(item.beginDateTime).format('DD.MM.YYYY'),
            sessions: [item],
          });
        } else {
          const dayAlreadyExist = sotredData.find(
            (day: any) =>
              day?.day === moment(item.beginDateTime).format('DD.MM.YYYY')
          );
          if (dayAlreadyExist) {
            dayAlreadyExist.sessions.push(item);
          } else {
            sotredData.push({
              day: moment(item.beginDateTime).format('DD.MM.YYYY'),
              sessions: [item],
            });
          }
        }
      });
      setSortedSessions(sotredData);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <div className={`${sessionsWrapper}`}>
          {sessions.map((session) => (
            <button
              type='button'
              key={session.id}
              className={`rounded-md p-2 text-center text-sm font-bold shadow-md ${
                session.id === selectedSession?.id
                  ? 'bg-[#0590C4] text-white'
                  : !session.salesIsAvailable
                  ? 'bg-[#E5E5E580] text-[#BCBCBC]'
                  : 'bg-gray-200'
              }`}
              onClick={() => onSelectSession(session)}
            >
              {moment(session.beginDateTime).format('LT')}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div>Массовые катания в ледовом дворце “Алау”</div>
          <div className={`${lgSessionsWrapper}`}>
            {sortedSessions.map((day) => {
              return (
                <div className='mb-10' key={day.day}>
                  <div className='mb-4 lg:text-xl lg:font-semibold'>
                    {day.day}
                  </div>
                  <div className={`${lgSessionButtonList}`}>
                    {day.sessions.map((session) => {
                      return (
                        <button
                          key={session.id}
                          className={`${lgSessionButton} text-[${
                            session.id !== selectedSession?.id
                              ? '#B6B6B6'
                              : '#0590C4'
                          }]  border-[${
                            session.id !== selectedSession?.id
                              ? '#B6B6B6'
                              : '#0590C4'
                          }]`}
                          onClick={() => onSelectSession(session)}
                        >
                          {moment(session.beginDateTime).format('HH:mm')} -{' '}
                          {moment(session.endDateTime).format('HH:mm')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default SelectSession;
