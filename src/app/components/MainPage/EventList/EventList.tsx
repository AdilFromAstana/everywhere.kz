'use client';

import moment from 'moment';
import 'moment/locale/ru';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import emptyImage from '../../../../icons/emptyImage.png';
import { Events, Managment } from '@/services/axios';
import { IEvent } from '@/interfaces/Interfaces';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EventList.scss';
import { useAppSelector } from '@/store/store';
moment.locale('ru');

const ArrowSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='65'
      height='65'
      viewBox='0 0 65 65'
      fill='none'
    >
      <path
        d='M32.4998 59.5832C47.4576 59.5832 59.5832 47.4576 59.5832 32.4998C59.5832 17.5421 47.4576 5.4165 32.4998 5.4165C17.5421 5.4165 5.4165 17.5421 5.4165 32.4998C5.4165 47.4576 17.5421 59.5832 32.4998 59.5832Z'
        fill='white'
        stroke='#ACACAC'
        strokeWidth='3'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35.9127 42.0603L26.3794 32.4999L35.9127 22.9395'
        stroke='#ACACAC'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const PrevArrow: React.FC = (props) => (
  <button {...props} className='slick-arrow slick-prev'>
    <ArrowSvg />
  </button>
);

const NextArrow: React.FC = (props) => (
  <button {...props} className='slick-arrow slick-next'>
    <ArrowSvg />
  </button>
);

const EventList: React.FC = () => {
  const [eventList, setEventList] = useState<IEvent[]>([]);
  const [leisureCategories, setLeisureCategories] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeLeisureCategorie, setActiveLeisureCategorie] = useState<
    number | null
  >(null);

  const { eventNameForSearch } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const { startDate, endDate } = useAppSelector(
    ({ inlineCalendarReducer }) => inlineCalendarReducer
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const eventCarouselRef = useRef<HTMLDivElement | null>(null);

  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? eventList.length - 1 : prevIndex - 1
    );
  };

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === eventList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getEvents = async () => {
    setIsLoading(true);
    await Events()
      .get(`events`, {
        params: {
          name: eventNameForSearch,
          beginAt: startDate,
          endAt: endDate,
          leisureCategoryId: activeLeisureCategorie,
        },
      })
      .then((events) => {
        if (events.status === 200) {
          setEventList(events.data.items);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getLeisureCategories = async () => {
    await Managment()
      .get('LeisureCategories/dropdown')
      .then(({ data, status }) => {
        if (status) {
          setLeisureCategories(data);
        }
      });
  };

  const onSelectLeisureCategorie = (selectedLeisureCategorie: number) => {
    if (activeLeisureCategorie === selectedLeisureCategorie) {
      setActiveLeisureCategorie(null);
    } else {
      setActiveLeisureCategorie(selectedLeisureCategorie);
    }
  };

  useEffect(() => {
    getEvents();
  }, [eventNameForSearch, endDate, startDate, activeLeisureCategorie]);

  useEffect(() => {
    getLeisureCategories();
  }, []);

  const cardsWrapper = 'mt-3 flex gap-5 overflow-auto whitespace-nowrap';
  const cardsWrapperLg = '';

  const cardWrapper = 'cursor-pointer text-base mx-6 h-[45vh]';
  const cardWrapperLg = 'relative lg:w-60';

  const cardPoster = '';
  // 'relative h-[15vh] w-[42vw] rounded-md bg-[length:42vw_15vh]';
  const cardPosterLg = 'object-cover w-full h-full';

  const leisureCategorieListStyles =
    'lg:font-medium lg:overflow-visible font-base px-4 -mx-4 my-4 flex lg:gap-8 gap-4 text-xl overflow-auto';

  const leisureCategorieItemStyles =
    'cursor-pointer border-2 whitespace-nowrap text-[#BABABA] rounded-lg px-4 py-1';
  const lgLeisureCategorieItemStyles =
    'lg:border-white lg:text-black lg:pb-1 lg:rounded-none lg:px-0 lg:py-0';

  const lgSelectedLeisureCategorieItemStyles =
    'lg:bg-white lg:text-black lg:border-b-2 lg:border-b-[#0590C4]';
  const selectedLeisureCategorieItemStyles =
    'text-white bg-[#0590C4] border-[#0590C4]';

  const lgCarouselItem = 'lg:h-[49vh] lg:w-[38vw]';
  const carouselItem =
    'relative cursor-pointer w-[55vw] flex flex-col justify-between';

  return (
    <div className='leisureCategorieList flex h-max flex-col justify-between'>
      <div className={leisureCategorieListStyles}>
        {leisureCategories?.map(
          (category: { value: number; key: number; text: string }) => {
            return (
              <div
                onClick={() => onSelectLeisureCategorie(category.value)}
                key={category.key}
                className={`${leisureCategorieItemStyles} ${lgLeisureCategorieItemStyles} ${
                  activeLeisureCategorie === category.value
                    ? lgSelectedLeisureCategorieItemStyles +
                      ' ' +
                      selectedLeisureCategorieItemStyles
                    : ' '
                }`}
              >
                {category.text}
              </div>
            );
          }
        )}
      </div>
      <div className='relative lg:h-max lg:w-full'>
        {isLoading ? (
          <div className='my-4 flex h-[49vh] w-full items-center justify-center bg-gray-300'>
            <div>Загрузка</div>
          </div>
        ) : eventList.length === 0 ? (
          <div className='my-4 flex h-[49vh] w-full items-center justify-center bg-gray-300'>
            <div>Пусто</div>
          </div>
        ) : (
          <>
            <div
              className='forDesktop relative m-0 hidden lg:-mr-20 lg:block lg:overflow-hidden'
              id='eventCarousel'
              ref={eventCarouselRef}
            >
              <div
                className='relative my-4 flex gap-6 overflow-auto lg:w-fit lg:overflow-hidden'
                style={{
                  transform: `translateX(-${currentIndex * 39}vw)`,
                  transition: 'transform 0.5s ease',
                }}
              >
                {eventList.map((item, index) => {
                  const poster =
                    item.posterFileUrl === null
                      ? emptyImage.src
                      : item.posterFileUrl;
                  return (
                    <Link
                      key={index}
                      href={`event/${item.id}`}
                      className={`${carouselItem} ${lgCarouselItem}`}
                    >
                      <img
                        src={poster.toString()}
                        alt={`Item ${index}`}
                        className='h-[75%] w-full object-cover'
                      />
                      <h3>{item.name}</h3>
                      <div className='font-semibold text-gray-700'>
                        {moment(item.beginDate).format('D MMMM')}
                      </div>
                      <div className='font-semibold'>от {item.minCost}тг</div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className='forMobile relative my-4 flex h-full gap-6 overflow-auto lg:hidden'>
              {eventList.map((item, index) => {
                const poster =
                  item.posterFileUrl === null
                    ? emptyImage.src
                    : item.posterFileUrl;
                return (
                  <Link
                    key={index}
                    href={`event/${item.id}`}
                    className={carouselItem}
                  >
                    <img
                      src={poster.toString()}
                      alt={`Item ${index}`}
                      className='h-[65%] min-w-[55vw] object-cover'
                    />
                    <h3>{item.name}</h3>
                    <div className='font-semibold text-gray-700'>
                      {moment(item.beginDate).format('D MMMM')}
                    </div>
                    <div className='font-semibold'>от {item.minCost}тг</div>
                  </Link>
                );
              })}
            </div>
            <div className='hidden lg:block'>
              <button
                className={`absolute left-6 top-1/2 -translate-y-1/2 transform rounded-md bg-blue-500 px-2 py-1 text-white ${
                  currentIndex === 0 ? 'hidden' : ''
                }`}
                disabled={currentIndex === 0}
                onClick={prevItem}
              >
                <PrevArrow />
              </button>
              <button
                className={`absolute right-3 top-1/2 -translate-y-1/2 transform rounded-md bg-blue-500 px-2 py-1 text-white ${
                  currentIndex + 1 === eventList.length - 1 ? 'hidden' : ''
                }`}
                disabled={currentIndex + 1 === eventList.length - 1}
                onClick={nextItem}
              >
                <NextArrow />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventList;
