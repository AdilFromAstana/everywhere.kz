'use client';
import ModalContent from '@/app/components/EventPage/Modal/ModalContent/ModalContent';
import ModalFooter from '@/app/components/EventPage/Modal/ModalFooter/ModalFooter';
import ModalHeader from '@/app/components/EventPage/Modal/ModalHeader/ModalHeader';
import { Events } from '@/services/axios';
import { mainReducer } from '@/store/slices/mainSlice';
import { modalReducer } from '@/store/slices/modalSlice';
import { useAppSelector } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Modal.scss';
import { isMobile } from 'react-device-detect';
import { UUID } from 'crypto';
import { ISelectedSector, IVenue } from '@/interfaces/Interfaces';

const Modal: React.FC = () => {
  const { isOpen } = useAppSelector(({ modalReducer }) => modalReducer);
  const { event, serviceGroups } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const dispatch = useDispatch();
  const button =
    'bg-[#1E3E85] text-base py-4 px-8 text-white rounded-xl mt-8 hidden lg:block w-fit';

  const getModalStyles = (): string => {
    if (isOpen) {
      return 'fixed top-0 start-0 end-0 bottom-0 h-full z-50';
    } else {
      return 'hidden';
    }
  };

  const getModalContentStyles = (): string => {
    if (isOpen) {
      if (isMobile) {
        return 'z-10 w-full rounded-lg bg-white flex flex-col justify-between p-6 h-[80vh] absolute bottom-0';
      } else {
        return 'z-10 w-4/6 rounded-lg bg-white flex flex-col justify-between p-6 overflow-y-auto h-[80vh] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2';
      }
    } else {
      return 'hidden';
    }
  };

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

  const getEventSchedule = async () => {
    await Events()
      .get(`/events/${event?.id}/schedule`)
      .then(async ({ data }) => {
        if (data?.items.length > 1) {
          dispatch(mainReducer.actions.setSessions(data?.items));
        } else {
          dispatch(mainReducer.actions.setSessions(data?.items));
          dispatch(mainReducer.actions.setSelectedSession(data?.items[0]));
          await getVenue(data?.items[0].id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getEventSchedule();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when the modal is open
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling when the modal is closed
    }

    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling on component unmount
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={button}
        onClick={() => dispatch(modalReducer.actions.openPaymentModal())}
      >
        Купить билет
      </button>
      <div className={`${getModalStyles()} modal`}>
        <div className='fixed inset-0 bg-black opacity-50' />
        <div className={getModalContentStyles()}>
          <ModalHeader />
          <ModalContent />
          <ModalFooter />
        </div>
      </div>
    </>
  );
};

export default Modal;
