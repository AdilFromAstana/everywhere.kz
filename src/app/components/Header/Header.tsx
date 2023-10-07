'use client';
import locationIcon from '../../../../icons/locationIcon.svg';
import calendarIcon from '../../../../icons/calendarIcon.svg';
import searchIcon from '../../../../icons/searchIcon.svg';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Header.scss';
import { SvgIcon } from '@mui/material';
import CityDropdown from '@/app/components/Header/CityDropdown/CityDropdown';
import { createPopper } from '@popperjs/core';
import { useDispatch } from 'react-redux';
import { mainReducer } from '@/store/slices/mainSlice';
import { useAppSelector } from '@/store/store';
import CalendarComponent from '@/app/components/Header/CalendarComponent/CalendarComponent';

interface IEventType {
  id: number;
  title: string;
}

const PhoneIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M15.4853 11.52C15.4416 11.4853 12.2667 9.1968 11.3952 9.36107C10.9792 9.43467 10.7413 9.7184 10.264 10.2864C10.1872 10.3781 10.0027 10.5979 9.8592 10.7541C9.55754 10.6557 9.26329 10.536 8.97867 10.3957C7.50961 9.68054 6.32266 8.49359 5.60747 7.02453C5.46713 6.73996 5.34736 6.44569 5.24907 6.144C5.40587 6 5.6256 5.81547 5.71947 5.73653C6.2848 5.26187 6.56907 5.024 6.64267 4.60693C6.7936 3.74293 4.50667 0.546133 4.48267 0.517333C4.37891 0.369104 4.24349 0.245793 4.08623 0.156322C3.92896 0.06685 3.75377 0.013455 3.57333 0C2.6464 0 0 3.43307 0 4.0112C0 4.0448 0.0485334 7.46027 4.26027 11.7445C8.54027 15.9515 11.9552 16 11.9888 16C12.5675 16 16 13.3536 16 12.4267C15.9867 12.2469 15.9336 12.0723 15.8446 11.9155C15.7556 11.7587 15.6329 11.6236 15.4853 11.52Z'
        fill='#000'
      />
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
    >
      <path
        d='M9.10433 16.6252C13.258 16.6252 16.6252 13.258 16.6252 9.10433C16.6252 4.95069 13.258 1.5835 9.10433 1.5835C4.95069 1.5835 1.5835 4.95069 1.5835 9.10433C1.5835 13.258 4.95069 16.6252 9.10433 16.6252Z'
        stroke='#898888'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.4168 17.4168L15.8335 15.8335'
        stroke='#898888'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const LocationIcon = () => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.07242 10.2586C9.28867 -0.205576 23.7224 -0.193493 25.9274 10.2707C27.2212 16.409 23.6662 21.6048 20.5499 24.819C18.2887 27.1632 14.7112 27.1632 12.4387 24.819C9.33367 21.6048 5.77867 16.3969 7.07242 10.2586Z'
        fill='black'
        fillOpacity='0.9'
        stroke='#1A1A1A'
        strokeOpacity='0.9'
        strokeWidth='1.5'
      />
      <circle cx='16.5' cy='12.5' r='3.5' fill='white' />
    </svg>
  );
};

const LocationIconForPhone = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.5 9.5C19.5 13.4274 14.625 19 12 19C9.375 19 4.5 13.0385 4.5 9.11111C4.5 5 8.13401 2 12 2C15.866 2 19.5 5 19.5 9.5ZM14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9ZM6 21.25C5.58579 21.25 5.25 21.5858 5.25 22C5.25 22.4142 5.58579 22.75 6 22.75H18C18.4142 22.75 18.75 22.4142 18.75 22C18.75 21.5858 18.4142 21.25 18 21.25H6Z'
        fill='#28303F'
        fillOpacity='0.5'
      />
    </svg>
  );
};

const InstagramIcon = () => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M27.9214 8.22738C27.8542 6.73659 27.6133 5.71657 27.2717 4.82546C26.9132 3.90633 26.4371 3.1217 25.6585 2.34828C24.88 1.57486 24.1014 1.08727 23.1828 0.734187C22.2923 0.386709 21.2729 0.151321 19.783 0.0840673C18.2875 0.0168134 17.8114 0 14.0138 0C10.2106 0 9.73454 0.0168134 8.24465 0.0840673C6.75475 0.151321 5.73535 0.392314 4.84477 0.734187C3.92058 1.09287 3.13643 1.56926 2.36347 2.34828C1.59052 3.1273 1.10322 3.90633 0.750348 4.82546C0.40868 5.71657 0.167832 6.73659 0.100618 8.22738C0.0334049 9.72378 0.0166016 10.2002 0.0166016 14C0.0166016 17.8054 0.0334049 18.2818 0.100618 19.7726C0.167832 21.2634 0.40868 22.2834 0.750348 23.1745C1.10882 24.0937 1.58492 24.8783 2.36347 25.6517C3.13643 26.4307 3.92058 26.9127 4.83917 27.2658C5.72974 27.6133 6.74915 27.8487 8.23905 27.9159C9.73455 27.9832 10.2106 28 14.0082 28C17.8114 28 18.2875 27.9832 19.7774 27.9159C21.2673 27.8487 22.2867 27.6077 23.1772 27.2658C24.0958 26.9071 24.88 26.4307 25.6529 25.6517C26.4259 24.8727 26.9132 24.0937 27.2661 23.1745C27.6133 22.2834 27.8486 21.2634 27.9158 19.7726C27.983 18.2762 27.9998 17.7998 27.9998 14C27.9998 10.2002 27.9886 9.71817 27.9214 8.22738ZM25.4065 19.6605C25.3449 21.028 25.1152 21.7734 24.9248 22.261C24.6727 22.9111 24.3647 23.3819 23.8718 23.8751C23.3789 24.3683 22.914 24.6653 22.2587 24.9287C21.7658 25.1193 21.0208 25.3491 19.6597 25.4107C18.1866 25.478 17.7441 25.4948 14.0026 25.4948C10.2611 25.4948 9.81856 25.478 8.34547 25.4107C6.97879 25.3491 6.23384 25.1193 5.74655 24.9287C5.09682 24.6765 4.62632 24.3683 4.13343 23.8751C3.64053 23.3819 3.34367 22.9167 3.08041 22.261C2.88998 21.7678 2.66033 21.0224 2.59872 19.6605C2.5315 18.1866 2.5147 17.7438 2.5147 14C2.5147 10.2562 2.5315 9.81345 2.59872 8.33947C2.66033 6.97198 2.88998 6.22658 3.08041 5.73899C3.33246 5.08887 3.64053 4.61809 4.13343 4.1249C4.62632 3.63171 5.09122 3.33467 5.74655 3.07126C6.23945 2.8807 6.9844 2.65092 8.34547 2.58927C9.81856 2.52202 10.2611 2.5052 14.0026 2.5052C17.7441 2.5052 18.1866 2.52202 19.6597 2.58927C21.0264 2.65092 21.7714 2.8807 22.2587 3.07126C22.9084 3.32346 23.3789 3.63171 23.8718 4.1249C24.3647 4.61809 24.6615 5.08327 24.9248 5.73899C25.1152 6.23219 25.3449 6.97758 25.4065 8.33947C25.4737 9.81345 25.4905 10.2562 25.4905 14C25.4905 17.7438 25.4681 18.1866 25.4065 19.6605Z'
        fill='black'
        fillOpacity='0.9'
      />
      <path
        d='M14.0029 6.80371C10.0261 6.80371 6.81104 10.0263 6.81104 13.9999C6.81104 17.9791 10.0317 21.196 14.0029 21.196C17.9741 21.196 21.1947 17.9678 21.1947 13.9999C21.1947 10.0207 17.9797 6.80371 14.0029 6.80371ZM14.0029 18.6684C11.4264 18.6684 9.33714 16.5779 9.33714 13.9999C9.33714 11.4218 11.4264 9.33133 14.0029 9.33133C16.5794 9.33133 18.6686 11.4218 18.6686 13.9999C18.6686 16.5779 16.5794 18.6684 14.0029 18.6684Z'
        fill='black'
        fillOpacity='0.9'
      />
      <path
        d='M21.4743 8.20498C22.4023 8.20498 23.1546 7.45221 23.1546 6.52363C23.1546 5.59505 22.4023 4.84229 21.4743 4.84229C20.5463 4.84229 19.7939 5.59505 19.7939 6.52363C19.7939 7.45221 20.5463 8.20498 21.4743 8.20498Z'
        fill='black'
        fillOpacity='0.9'
      />
    </svg>
  );
};

const KazticketLogoIcon = () => {
  return (
    <svg
      width='128'
      height='44'
      viewBox='0 0 128 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_785_3977)'>
        <path
          d='M123.942 37.0246C124.686 36.9291 125.442 37.0631 126.103 37.408C126.765 37.7529 127.299 38.2912 127.631 38.9474C127.963 39.6036 128.076 40.3448 127.954 41.0669C127.832 41.7889 127.482 42.4557 126.952 42.9734C126.422 43.4912 125.739 43.8341 124.999 43.9538C124.259 44.0736 123.499 43.9643 122.826 43.6413C122.153 43.3182 121.6 42.7977 121.246 42.1527C120.892 41.5077 120.753 40.7706 120.85 40.0449C120.953 39.2795 121.311 38.5684 121.87 38.0222C122.429 37.476 123.158 37.1253 123.942 37.0246Z'
          fill='url(#paint0_linear_785_3977)'
        />
        <path
          d='M21.5371 22.5923H27.027V43.1923H21.5371V22.5923Z'
          fill='#3D3F3F'
        />
        <path
          d='M117.525 27.948V22.592H110.769V22.5913H105.279V22.592H99.7891V27.948H105.279V34.54C105.283 36.9973 106.285 39.353 108.066 41.0907C109.847 42.8285 112.261 43.8064 114.78 43.8102V38.4542C113.718 38.4476 112.702 38.033 111.951 37.3004C111.2 36.5677 110.775 35.576 110.769 34.54V27.948L117.525 27.948Z'
          fill='#3D3F3F'
        />
        <path
          d='M97.2716 22.5913H75.3828V43.192H97.2716V22.5913Z'
          fill='black'
        />
        <path
          d='M79.3955 28.8224H88.0211V31.4668C87.6308 31.4735 87.2587 31.6295 86.9851 31.9012C86.7115 32.1729 86.5582 32.5386 86.5582 32.9195C86.5582 33.3004 86.7115 33.6661 86.9851 33.9378C87.2587 34.2095 87.6308 34.3655 88.0211 34.3722V37.0165H79.4205C79.5043 37.2596 79.5971 37.4959 79.6967 37.7299C80.0094 38.4115 80.399 39.0569 80.8585 39.6541C82.0291 41.19 83.7059 42.2858 85.6072 42.7576C85.9201 42.8653 86.2458 42.9341 86.5764 42.9623C86.9904 43.0323 87.4087 43.0752 87.8286 43.0906C88.757 43.1582 89.7716 43.192 90.8721 43.1919H97.2716V37.0165H90.2856V35.1622H97.2716V32.754C97.2736 31.9191 97.1962 31.0859 97.0406 30.265C96.7758 28.8395 96.2139 27.4822 95.3898 26.2771C94.5633 25.0708 92.9033 23.0859 89.7603 22.6988C86.2661 22.2689 84.6266 23.2456 83.9562 23.5697C82.615 24.1742 81.4715 25.1293 80.6524 26.3289C80.1213 27.1017 79.6986 27.9403 79.3955 28.8224ZM82.4413 31.4668C82.8301 31.4758 83.1998 31.6329 83.4714 31.9043C83.7431 32.1758 83.8951 32.5401 83.8951 32.9195C83.8951 33.2989 83.7431 33.6632 83.4714 33.9347C83.1998 34.2061 82.8301 34.3631 82.4413 34.3722H82.4323C82.0419 34.3655 81.6699 34.2095 81.3963 33.9378C81.1227 33.6661 80.9694 33.3004 80.9694 32.9195C80.9694 32.5386 81.1227 32.1729 81.3963 31.9012C81.6699 31.6295 82.0419 31.4735 82.4323 31.4668H82.4413ZM76.8435 31.4668C77.1391 31.4612 77.4298 31.5416 77.6785 31.6978C77.9271 31.854 78.1224 32.0789 78.2396 32.3438C78.3568 32.6087 78.3905 32.9017 78.3363 33.1853C78.2822 33.469 78.1428 33.7305 77.9358 33.9365C77.7288 34.1426 77.4636 34.2839 77.174 34.3423C76.8844 34.4008 76.5835 34.3739 76.3097 34.2649C76.0359 34.1559 75.8015 33.9699 75.6364 33.7305C75.4714 33.4911 75.3831 33.2092 75.3829 32.9207C75.3795 32.5391 75.5313 32.1717 75.8051 31.8991C76.0789 31.6266 76.4523 31.4711 76.8435 31.4668Z'
          fill='url(#paint1_linear_785_3977)'
        />
        <path
          d='M80.1553 38.6027L88.0244 37.0161H79.4238C79.5076 37.2591 79.6005 37.4955 79.7002 37.7295C79.8451 38.0356 79.9968 38.3281 80.1553 38.6027Z'
          fill='#123C3F'
        />
        <path
          d='M66.1736 31.9855L74.2394 22.5918H67.0604L60.0504 30.7082V22.5913H54.5605V43.1919H60.0504V39.0717L62.5845 36.1467L68.1585 43.1919H75.0837L66.1736 31.9855Z'
          fill='#3D3F3F'
        />
        <path
          d='M17.7363 27.948V22.592H10.9797V22.5913H5.48985V22.592H0V27.948H5.48985V34.54C5.49363 36.9974 6.49589 39.3531 8.27694 41.0908C10.058 42.8286 12.4726 43.8065 14.9914 43.8102V38.4542C13.9294 38.4477 12.9129 38.0332 12.162 37.3005C11.4111 36.5678 10.9863 35.576 10.9797 34.54V27.948L17.7363 27.948Z'
          fill='#3D3F3F'
        />
        <path
          d='M42.441 38.4544C43.9434 38.4571 45.3857 37.8794 46.4527 36.8476L50.338 40.6378C48.7711 42.1705 46.7733 43.2151 44.5976 43.6395C42.4219 44.0638 40.166 43.8489 38.1156 43.0218C36.0652 42.1947 34.3124 40.7926 33.0791 38.9931C31.8458 37.1937 31.1875 35.0776 31.1875 32.9129C31.1875 30.7482 31.8458 28.6322 33.0791 26.8327C34.3124 25.0332 36.0652 23.6312 38.1156 22.8041C40.166 21.977 42.4219 21.762 44.5976 22.1864C46.7733 22.6108 48.7711 23.6554 50.338 25.188L46.4527 28.9782C45.9325 28.4538 45.309 28.0374 44.6195 27.7542C43.9301 27.471 43.1891 27.3268 42.441 27.3302C40.9297 27.3313 39.4806 27.9177 38.4123 28.9607C37.344 30.0037 36.7439 31.4178 36.7439 32.8923C36.7439 34.3668 37.344 35.781 38.4123 36.8239C39.4806 37.8669 40.9297 38.4534 42.441 38.4544Z'
          fill='#3D3F3F'
        />
        <path
          d='M49.5195 21.2181V15.8621L60.0346 5.9742H49.5195V0.618164H67.9315V5.9742L57.3745 15.8621H67.9315V21.2181H49.5195Z'
          fill='#3D3F3F'
        />
        <path
          d='M11.8906 10.0117L19.9562 0.617985H12.7772L5.76724 8.73435V0.617188H0.277344V21.2178H5.76724V17.0978L8.30125 14.1725L13.8753 21.2178H20.8005L11.8906 10.0117Z'
          fill='#3D3F3F'
        />
        <path
          d='M44.4534 21.218H38.9635V20.3117C37.4821 21.1674 35.8182 21.6781 34.1014 21.8041C32.3846 21.93 30.6612 21.6678 29.0652 21.0378C27.4693 20.4078 26.0439 19.427 24.8999 18.1717C23.7559 16.9165 22.9242 15.4207 22.4695 13.8006C22.0149 12.1806 21.9495 10.48 22.2785 8.83129C22.6074 7.18257 23.3219 5.63014 24.3663 4.2948C25.4106 2.95946 26.7567 1.87724 28.2998 1.13234C29.8429 0.38744 31.5413 -4.23902e-05 33.263 4.481e-05C35.2755 -0.00567664 37.2497 0.536605 38.9635 1.56588V0.617997H44.4534V21.218ZM33.263 5.35608C32.1354 5.35601 31.0332 5.68216 30.0957 6.29327C29.1581 6.90438 28.4274 7.773 27.9958 8.7893C27.5643 9.8056 27.4513 10.9239 27.6713 12.0029C27.8912 13.0818 28.4341 14.0728 29.2314 14.8507C30.0287 15.6286 31.0445 16.1584 32.1503 16.373C33.2562 16.5876 34.4025 16.4775 35.4442 16.0565C36.4859 15.6356 37.3763 14.9227 38.0027 14.008C38.6291 13.0934 38.9635 12.018 38.9635 10.918C38.9666 10.1868 38.8213 9.46216 38.536 8.786C38.2506 8.10984 37.8308 7.4955 37.3009 6.97843C36.7709 6.46135 36.1412 6.05177 35.4482 5.77332C34.7552 5.49488 34.0125 5.35307 33.263 5.35608Z'
          fill='#3D3F3F'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_785_3977'
          x1='126.205'
          y1='43.53'
          x2='122.748'
          y2='37.3919'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E2B33D' />
          <stop offset='1' stopColor='#FBF320' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_785_3977'
          x1='93.3234'
          y1='43.1864'
          x2='81.7111'
          y2='22.5709'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#0590C4' />
          <stop offset='0.52421' stopColor='#1D6387' />
          <stop offset='1' stopColor='#1E3E85' />
        </linearGradient>
        <clipPath id='clip0_785_3977'>
          <rect width='128' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

const CalendarIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.75 2C8.75 1.58579 8.41421 1.25 8 1.25C7.58579 1.25 7.25 1.58579 7.25 2V3.5H7C4.79086 3.5 3 5.29086 3 7.5V8.25H21V7.5C21 5.29086 19.2091 3.5 17 3.5H16.75V2C16.75 1.58579 16.4142 1.25 16 1.25C15.5858 1.25 15.25 1.58579 15.25 2V3.5H8.75V2ZM3 9.75H21V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V9.75Z'
        fill='#28303F'
        fillOpacity='0.5'
      />
    </svg>
  );
};

const Header: React.FC = () => {
  const [eventTypeList, setEventTypeList] = useState<IEventType[]>([]);
  const [activeEventType, setActiveEventType] = useState<number>(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isCalendarVisible, setCalendarVisible] = useState<boolean>(false);
  const { eventNameForSearch } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const { endDate, startDate } = useAppSelector(
    ({ inlineCalendarReducer }) => inlineCalendarReducer
  );

  const onChange = (e: string) => {
    dispatch(mainReducer.actions.setEventNameForSearch(e));
  };

  const showDropdownTooltip = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetSeat = event.target as HTMLElement;
    const tooltip = document.querySelector('#cityDropdownTooltip');

    if (tooltip) {
      createPopper(targetSeat, tooltip as HTMLElement, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      });

      tooltip.setAttribute('data-show', '');
    }
  };

  const hideDropdownTooltip = () => {
    const tooltip = document.querySelector('#cityDropdownTooltip');
    if (tooltip) tooltip.removeAttribute('data-show');
  };

  useEffect(() => {
    const initialEventTypeList: IEventType[] = [
      {
        id: 1,
        title: 'Все',
      },
      {
        id: 2,
        title: 'Популярное',
      },
      {
        id: 3,
        title: 'Концерты',
      },
      {
        id: 4,
        title: 'Детям',
      },
      {
        id: 5,
        title: 'Все меропрития',
      },
    ];
    setEventTypeList(initialEventTypeList);

    document.body.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!['cityDropdownTooltip'].includes(target.id)) {
        if (!target.classList.value.includes('cityDropdownItem')) {
          hideDropdownTooltip();
        }
      }
    });
  }, []);

  const lgHeaderWrapperClass = 'lg:mt-10 lg:text-lg';
  const HeaderWrapperClass = 'flex justify-between items-center mt-4';
  const phoneButton =
    'rounded-3xl border-2 border-black px-6 py-2 hover:cursor-pointer lg:block hidden';
  const instagram = '';
  const searchInput = 'rounded-lg border-[#F5F5F5]';
  const lgSearchInput = 'w-full lg:rounded-3xl bg-[#F5F5F5] pl-4';

  return (
    <header
      className={`mainHeaderWrapper ${lgHeaderWrapperClass} ${HeaderWrapperClass}`}
    >
      <Link href='/' className='hidden lg:block'>
        <KazticketLogoIcon />
      </Link>
      <a target='_blank' className='hidden cursor-pointer lg:block'>
        О нас
      </a>
      <a target='_blank' className='hidden cursor-pointer lg:block'>
        Контакты
      </a>
      <div className='relative w-8/12 lg:w-3/12'>
        <div
          id='searchContainer'
          className='absolute ml-4 flex h-full items-center gap-2 text-[#A4A4A4] lg:text-black'
        >
          <SearchIcon />
          Поиск
        </div>
        <input
          className={`${lgSearchInput} ${searchInput}`}
          onFocus={() => {
            const searchContainer = document.getElementById('searchContainer');
            if (searchContainer) {
              searchContainer.style.display = 'none';
            }
          }}
          onBlur={() => {
            const searchContainer = document.getElementById('searchContainer');
            if (!eventNameForSearch && searchContainer) {
              searchContainer.style.display = 'flex';
            }
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={eventNameForSearch}
        />
      </div>
      <div
        className='hidden cursor-pointer lg:flex lg:gap-1 lg:bg-white'
        onClick={(e) => showDropdownTooltip(e)}
      >
        <LocationIcon />{' '}
        <span className='absolute hidden lg:relative lg:block'>Астана</span>
      </div>
      <div
        className='relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F5F5] lg:hidden'
        onClick={(e) => showDropdownTooltip(e)}
      >
        <span className='absolute right-0 top-0 h-3 w-3 rounded-full bg-blue-700'></span>
        <LocationIconForPhone />
      </div>
      <div
        onClick={() => setCalendarVisible(true)}
        className='relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F5F5] lg:hidden'
      >
        <span
          className={`absolute right-0 top-0 h-3 w-3 rounded-full bg-blue-700 ${
            endDate && startDate ? 'block' : 'hidden'
          }`}
        ></span>
        <CalendarIcon />
      </div>
      <a
        className={`${instagram} hidden lg:block`}
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.instagram.com/kazticket.kz/'
      >
        <InstagramIcon />
      </a>
      <a className={`${phoneButton} hidden lg:block`} href='tel:+77761156416'>
        Позвонить
      </a>
      <CityDropdown />
      <CalendarComponent
        isCalendarVisible={isCalendarVisible}
        setCalendarVisible={setCalendarVisible}
      />
      {/* <div className='flex h-10 w-auto flex-row gap-2.5'>
        <div className='relative flex w-full justify-center bg-[#F5F5F5]'>
          <Image
            src={searchIcon}
            className='absolute left-0 w-6'
            alt='Search Icon'
          />
          <input
            className='h-10 w-full bg-[#F5F5F5]'
            type='text'
            title='Поиск'
            placeholder='Поиск'
            value={searchValue}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className='flex w-14 justify-center bg-[#F5F5F5]'>
          <Image className='' src={locationIcon} alt='location icon' />
        </div>
        <div className='flex w-14 justify-center bg-[#F5F5F5]'>
          <Image className='' src={calendarIcon} alt='calendar icon' />
        </div>
      </div>
      <div className='eventTypes hideScrollBar mb-6 mt-4 flex gap-5 overflow-auto whitespace-nowrap'>
        {eventTypeList.map((eventType: IEventType) => {
          return (
            <div
              key={eventType.id}
              className={`cursor-pointer
                  rounded-lg
                  border-2 
                  p-1 px-3 py-0 
                  ${
                    activeEventType === eventType.id
                      ? 'bg-[#0590C4] text-white'
                      : 'text-[#BABABA]'
                  }
                `}
              onClick={() => setActiveEventType(eventType.id)}
            >
              {eventType.title}
            </div>
          );
        })}
      </div> */}
    </header>
  );
};

export default Header;
