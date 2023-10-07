'use client';

import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { mainReducer } from '@/store/slices/mainSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import './PaymentForm.scss';

const svgWrapperStyles = isMobile
  ? 'flex h-8 w-10 items-center justify-center rounded-xl border-2'
  : 'flex h-10 w-12 items-center justify-center rounded-xl p-2';

interface IIcon {
  checked?: boolean;
}

const KaspiIcon: React.FC<IIcon> = ({ checked }) => {
  return (
    <div
      className={`${svgWrapperStyles} ${
        checked ? 'border-[3px] border-[#0590C4]' : 'border-2 border-[#E3E3E3]'
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='26'
        height='26'
        viewBox='0 0 19 18'
        fill='none'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.41377 0.0957031L9.5644 0.0968848C14.5255 0.174774 18.5247 4.0934 18.5454 8.92424V9.00091L18.5449 9.06594C18.5199 11.21 17.7082 13.1706 16.3795 14.6915L16.3769 14.6902C16.3275 14.6647 16.239 14.585 16.081 14.3533L16.0756 14.3456C15.8859 14.0728 14.4787 11.9259 14.4787 9.46903L14.4789 9.45434C14.493 8.96674 15.2014 8.21435 15.829 7.55317L15.8674 7.51249C16.3271 7.02513 16.7563 6.56652 16.9171 6.2041L16.9233 6.18972C17.1247 5.71665 16.978 5.38657 16.7475 5.27391L16.7404 5.27061C16.5294 5.17443 16.2175 5.25078 15.9977 5.63322L15.9866 5.65222C15.6308 6.26146 15.5109 6.38024 14.9845 6.79485L14.9687 6.8074C14.4446 7.22179 13.6291 7.62929 13.6291 7.08924L13.6293 7.07982C13.6357 6.87896 13.8437 6.51613 14.0481 6.15933L14.0481 6.15928C14.148 5.98498 14.2471 5.81212 14.3214 5.66029L14.3283 5.64615C14.5503 5.18081 14.2984 4.8455 13.8205 4.8455L13.7922 4.84586C12.86 4.86909 12.2433 6.03305 12.2433 6.43883L12.2434 6.45749C12.2463 6.64331 12.2917 6.75552 12.3389 6.87185C12.3914 7.00152 12.4461 7.13631 12.4461 7.3839L12.4458 7.39836C12.4253 7.87698 11.3961 8.48791 10.4262 8.48791L10.3968 8.48785C9.42905 8.48378 8.88497 8.27762 8.68038 7.69975L8.61481 7.5099L8.60243 7.4744C8.37649 6.82685 8.21047 6.35244 7.92552 5.85691L7.9135 5.83655C7.76254 5.58633 7.53851 5.409 7.34139 5.25298L7.32801 5.24239L7.31348 5.23124C7.05422 5.03092 6.91919 4.84687 6.89068 4.70899L6.88988 4.70477C6.86359 4.56426 6.8539 4.3008 7.30883 3.70142L7.32247 3.6834C7.76861 3.09029 7.82935 2.64217 7.60216 2.40987L7.59509 2.40298C7.51106 2.32342 7.37217 2.27292 7.19514 2.27292L7.18436 2.27298C6.86319 2.27667 6.42055 2.44516 5.9645 2.89937L5.94333 2.92095C5.40806 3.47522 5.53129 4.00579 5.61211 4.35375L5.61211 4.35376C5.63509 4.45272 5.65465 4.53691 5.65465 4.60267L5.6546 4.61273C5.65166 4.90633 5.51841 5.07662 5.09312 5.47997L5.0802 5.49224C4.65682 5.89681 4.50972 6.25509 4.46063 7.65273L4.45989 7.6792C4.43845 8.39028 4.30953 8.80339 4.19361 9.1701L4.18729 9.19042C4.08839 9.50838 3.99881 9.81066 3.99389 10.2436L3.99353 10.2711C3.989 10.7453 4.07097 11.0559 4.16621 11.4133L4.17036 11.428C4.26448 11.7612 4.36368 12.1451 4.42758 12.781L4.43214 12.826C4.53789 13.8881 4.48482 14.7764 4.25726 15.7022L4.24557 15.7643L4.24226 15.7773C4.2045 15.9263 4.1597 16.1018 4.09973 16.1689L4.03064 16.1203C1.7585 14.5075 0.28125 11.9031 0.28125 8.9628C0.28125 4.06607 4.36986 0.0957031 9.41377 0.0957031ZM9.37832 9.62076L9.35432 9.62059C9.0621 9.62059 8.8327 9.69308 8.65764 9.83653C8.05182 10.3364 8.05605 11.7204 8.06816 13.3313L8.06853 13.3802L8.07154 13.8422C8.07859 15.4436 8.08788 16.8307 8.46625 17.4547L8.47783 17.4733C8.59968 17.6658 8.82782 17.8074 9.13103 17.8939L9.14931 17.899L9.21468 17.9011H9.21473C9.25755 17.9026 9.30043 17.9041 9.34359 17.9048L9.39259 17.9052C10.1483 17.9052 10.8825 17.8167 11.586 17.6527L11.6339 17.6414C11.9251 17.5054 12.1376 17.3425 12.215 17.1726L12.2192 17.1629C12.2624 17.053 12.2867 16.8552 12.2878 16.5974L12.2878 16.5789C12.2878 15.5251 11.9692 13.5177 11.8106 12.5184L11.8106 12.5184L11.8106 12.5184L11.8093 12.5103L11.8046 12.4804L11.7245 11.9643L11.7094 11.8625L11.7087 11.8577C11.576 10.9515 11.4261 9.92804 9.74021 9.65596L9.68856 9.64793C9.57822 9.63108 9.47487 9.62205 9.37832 9.62076ZM6.12152 13.0442L6.11098 13.0437L6.10495 13.0438C5.72479 13.0666 5.57787 14.9878 5.7381 16.2959L5.74305 16.3353C5.79706 16.7436 5.88145 17.0572 5.99168 17.2598L5.9982 17.2716C6.14698 17.3307 6.29765 17.3856 6.45058 17.437L6.51626 17.4588C6.66986 17.3262 6.76654 16.9592 6.73709 16.0718L6.73616 16.0448C6.69087 14.7624 6.46827 13.0778 6.12152 13.0442ZM13.6852 13.1931L13.667 13.1925C13.6332 13.1925 13.6004 13.1992 13.5689 13.2133C13.12 13.4199 13.2879 15.7738 13.746 16.5631L13.76 16.5865C13.8072 16.6609 13.9031 16.6749 14.0116 16.6594L14.0214 16.6579C14.3573 16.47 14.679 16.2619 14.9859 16.0361L15.0343 16.0003C15.073 15.9267 15.1047 15.8401 15.1279 15.7297L15.1316 15.7111C15.2138 15.3222 14.2885 13.2351 13.6852 13.1931Z'
          fill='#F14635'
        />
        <mask
          id='mask0_1197_4638'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='19'
          height='18'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.41377 0.0957031L9.5644 0.0968848C14.5255 0.174774 18.5247 4.0934 18.5454 8.92424V9.00091L18.5449 9.06594C18.5199 11.21 17.7082 13.1706 16.3795 14.6915L16.3769 14.6902C16.3275 14.6647 16.239 14.585 16.081 14.3533L16.0756 14.3456C15.8859 14.0728 14.4787 11.9259 14.4787 9.46903L14.4789 9.45434C14.493 8.96674 15.2014 8.21435 15.829 7.55317L15.8674 7.51249C16.3271 7.02513 16.7563 6.56652 16.9171 6.2041L16.9233 6.18972C17.1247 5.71665 16.978 5.38657 16.7475 5.27391L16.7404 5.27061C16.5294 5.17443 16.2175 5.25078 15.9977 5.63322L15.9866 5.65222C15.6308 6.26146 15.5109 6.38024 14.9845 6.79485L14.9687 6.8074C14.4446 7.22179 13.6291 7.62929 13.6291 7.08924L13.6293 7.07982C13.6357 6.87896 13.8437 6.51613 14.0481 6.15933L14.0481 6.15928C14.148 5.98498 14.2471 5.81212 14.3214 5.66029L14.3283 5.64615C14.5503 5.18081 14.2984 4.8455 13.8205 4.8455L13.7922 4.84586C12.86 4.86909 12.2433 6.03305 12.2433 6.43883L12.2434 6.45749C12.2463 6.64331 12.2917 6.75552 12.3389 6.87185C12.3914 7.00152 12.4461 7.13631 12.4461 7.3839L12.4458 7.39836C12.4253 7.87698 11.3961 8.48791 10.4262 8.48791L10.3968 8.48785C9.42905 8.48378 8.88497 8.27762 8.68038 7.69975L8.61481 7.5099L8.60243 7.4744C8.37649 6.82685 8.21047 6.35244 7.92552 5.85691L7.9135 5.83655C7.76254 5.58633 7.53851 5.409 7.34139 5.25298L7.32801 5.24239L7.31348 5.23124C7.05422 5.03092 6.91919 4.84687 6.89068 4.70899L6.88988 4.70477C6.86359 4.56426 6.8539 4.3008 7.30883 3.70142L7.32247 3.6834C7.76861 3.09029 7.82935 2.64217 7.60216 2.40987L7.59509 2.40298C7.51106 2.32342 7.37217 2.27292 7.19514 2.27292L7.18436 2.27298C6.86319 2.27667 6.42055 2.44516 5.9645 2.89937L5.94333 2.92095C5.40806 3.47522 5.53129 4.00579 5.61211 4.35375L5.61211 4.35376C5.63509 4.45272 5.65465 4.53691 5.65465 4.60267L5.6546 4.61273C5.65166 4.90633 5.51841 5.07662 5.09312 5.47997L5.0802 5.49224C4.65682 5.89681 4.50972 6.25509 4.46063 7.65273L4.45989 7.6792C4.43845 8.39028 4.30953 8.80339 4.19361 9.1701L4.18729 9.19042C4.08839 9.50838 3.99881 9.81066 3.99389 10.2436L3.99353 10.2711C3.989 10.7453 4.07097 11.0559 4.16621 11.4133L4.17036 11.428C4.26448 11.7612 4.36368 12.1451 4.42758 12.781L4.43214 12.826C4.53789 13.8881 4.48482 14.7764 4.25726 15.7022L4.24557 15.7643L4.24226 15.7773C4.2045 15.9263 4.1597 16.1018 4.09973 16.1689L4.03064 16.1203C1.7585 14.5075 0.28125 11.9031 0.28125 8.9628C0.28125 4.06607 4.36986 0.0957031 9.41377 0.0957031ZM9.37832 9.62076L9.35432 9.62059C9.0621 9.62059 8.8327 9.69308 8.65764 9.83653C8.05182 10.3364 8.05605 11.7204 8.06816 13.3313L8.06853 13.3802L8.07154 13.8422C8.07859 15.4436 8.08788 16.8307 8.46625 17.4547L8.47783 17.4733C8.59968 17.6658 8.82782 17.8074 9.13103 17.8939L9.14931 17.899L9.21468 17.9011H9.21473C9.25755 17.9026 9.30043 17.9041 9.34359 17.9048L9.39259 17.9052C10.1483 17.9052 10.8825 17.8167 11.586 17.6527L11.6339 17.6414C11.9251 17.5054 12.1376 17.3425 12.215 17.1726L12.2192 17.1629C12.2624 17.053 12.2867 16.8552 12.2878 16.5974L12.2878 16.5789C12.2878 15.5251 11.9692 13.5177 11.8106 12.5184L11.8106 12.5184L11.8106 12.5184L11.8093 12.5103L11.8046 12.4804L11.7245 11.9643L11.7094 11.8625L11.7087 11.8577C11.576 10.9515 11.4261 9.92804 9.74021 9.65596L9.68856 9.64793C9.57822 9.63108 9.47487 9.62205 9.37832 9.62076ZM6.12152 13.0442L6.11098 13.0437L6.10495 13.0438C5.72479 13.0666 5.57787 14.9878 5.7381 16.2959L5.74305 16.3353C5.79706 16.7436 5.88145 17.0572 5.99168 17.2598L5.9982 17.2716C6.14698 17.3307 6.29765 17.3856 6.45058 17.437L6.51626 17.4588C6.66986 17.3262 6.76654 16.9592 6.73709 16.0718L6.73616 16.0448C6.69087 14.7624 6.46827 13.0778 6.12152 13.0442ZM13.6852 13.1931L13.667 13.1925C13.6332 13.1925 13.6004 13.1992 13.5689 13.2133C13.12 13.4199 13.2879 15.7738 13.746 16.5631L13.76 16.5865C13.8072 16.6609 13.9031 16.6749 14.0116 16.6594L14.0214 16.6579C14.3573 16.47 14.679 16.2619 14.9859 16.0361L15.0343 16.0003C15.073 15.9267 15.1047 15.8401 15.1279 15.7297L15.1316 15.7111C15.2138 15.3222 14.2885 13.2351 13.6852 13.1931Z'
            fill='white'
          />
        </mask>
        <g mask='url(#mask0_1197_4638)'></g>
      </svg>
    </div>
  );
};

const CardIcon: React.FC<IIcon> = ({ checked }) => {
  return (
    <div
      className={`${svgWrapperStyles} ${
        checked ? 'border-[3px] border-[#0590C4]' : 'border-2 border-[#E3E3E3]'
      }`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='25'
        viewBox='0 0 18 18'
        fill='none'
      >
        <path
          d='M12.7502 15.375H5.25024C3.00024 15.375 1.50024 14.25 1.50024 11.625V6.375C1.50024 3.75 3.00024 2.625 5.25024 2.625H12.7502C15.0002 2.625 16.5002 3.75 16.5002 6.375V11.625C16.5002 14.25 15.0002 15.375 12.7502 15.375Z'
          stroke='#292D32'
          strokeWidth='1'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.4119 6.88232L1.58834 6.88232'
          stroke='#292D32'
          strokeWidth='1'
          strokeMiterlimit='10'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

const bigCard = () => {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='34'
        height='34'
        viewBox='0 0 34 34'
        fill='none'
      >
        <path
          d='M24.084 29.0413H9.91732C5.66732 29.0413 2.83398 26.9163 2.83398 21.958V12.0413C2.83398 7.08301 5.66732 4.95801 9.91732 4.95801H24.084C28.334 4.95801 31.1673 7.08301 31.1673 12.0413V21.958C31.1673 26.9163 28.334 29.0413 24.084 29.0413Z'
          stroke='#292D32'
          stroke-width='1.5'
          stroke-miterlimit='10'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M31 13L3 13'
          stroke='#292D32'
          stroke-width='2'
          stroke-miterlimit='10'
          stroke-linejoin='round'
        />
      </svg>
    </div>
  );
};

const PaymentForm: React.FC = () => {
  const dispatch = useDispatch();
  const { paymentInfo, event, selectedSession, tickets, totalAmount } =
    useAppSelector(({ mainReducer }) => mainReducer);

  const lgWrapper =
    'lg:px-8 lg:py-6 lg:border-2 lg:border-[#B6B6B6] lg:rounded-2xl';

  const orderInfoItem = 'grid grid-cols-[70%_auto]';

  const {
    isGetInfoAllow,
    isTreaty,
    phoneNumber,
    confirmPhoneNumber,
    paymentMethod,
  } = paymentInfo;

  useEffect(() => {
    const doesPhoneFilled = phoneNumber.length === 11;
    const doPhonesSame = phoneNumber === confirmPhoneNumber;
    if (isGetInfoAllow && isTreaty && doPhonesSame && doesPhoneFilled) {
      dispatch(mainReducer.actions.setSuccessValidation(true));
    } else {
      dispatch(mainReducer.actions.setSuccessValidation(false));
    }
  }, [phoneNumber, confirmPhoneNumber, isTreaty, isGetInfoAllow]);

  if (isMobile) {
    return (
      <form className='flex flex-col'>
        <label className='my-2 text-lg font-semibold'>Личные данные</label>
        <label htmlFor='phoneNumber' className='mb-2 text-base text-[#A0A0A0]'>
          Номер телефона
        </label>
        <PhoneInput
          onlyCountries={['kz']}
          country={'kz'}
          disableDropdown
          countryCodeEditable={false}
          masks={{ kz: '-(...)-...-..-..' }}
          // className={'PhoneInput'}
          onChange={(e) => {
            dispatch(mainReducer.actions.setPhoneNumber(e));
          }}
          value={phoneNumber}
        />

        <label
          htmlFor='confirmPhoneNumber'
          className='mb-2 mt-5 text-base text-[#A0A0A0]'
        >
          Подтвердите номер телефона
        </label>
        <PhoneInput
          onlyCountries={['kz']}
          country={'kz'}
          disableDropdown
          countryCodeEditable={false}
          masks={{ kz: '-(...)-...-..-..' }}
          // className={'PhoneInput'}
          onChange={(e) => {
            dispatch(mainReducer.actions.setConfirmPhoneNumber(e));
          }}
          value={confirmPhoneNumber}
        />

        <label className='mb-2 mt-8 text-lg font-semibold'>Способ оплаты</label>
        <div className='flex flex-col gap-4 rounded-xl border-2 px-4 py-6'>
          <label>
            <div className='flex h-8 items-center gap-4'>
              <input
                type='radio'
                name='radioGroup'
                value={1}
                checked={paymentMethod === 1}
                onChange={(v) =>
                  dispatch(
                    mainReducer.actions.setPaymentMethod(Number(v.target.value))
                  )
                }
                className='checked:bg-check-mark text-white'
              />{' '}
              <KaspiIcon />
              <span className='font-medium'>Kaspi Bank</span>
            </div>
          </label>
          <div className='h-px w-4/5 bg-black'></div>
          <label>
            <div className='flex h-8 items-center gap-4'>
              <input
                type='radio'
                name='radioGroup'
                value={2}
                onChange={(v) =>
                  dispatch(
                    mainReducer.actions.setPaymentMethod(Number(v.target.value))
                  )
                }
                checked={paymentMethod === 2}
                className='checked:bg-check-mark text-white'
              />{' '}
              <CardIcon />
              <span className='font-medium'>Карта Visa/Master Card</span>
            </div>
          </label>
        </div>

        <label className='mt-2'>
          <input
            type='checkbox'
            name='checkbox1'
            checked={isGetInfoAllow}
            onChange={() =>
              dispatch(mainReducer.actions.setIsGetInfoAllow(!isGetInfoAllow))
            }
          />{' '}
          Ознакомлен и согласен с договором оферты
        </label>
        <label className='mt-2'>
          <input
            type='checkbox'
            name='checkbox2'
            checked={isTreaty}
            onChange={() =>
              dispatch(mainReducer.actions.setIsTreaty(!isTreaty))
            }
          />{' '}
          Я соглашаюсь на сбор и обработку данных для отправки SMS
        </label>
      </form>
    );
  } else {
    return (
      <div className='flex flex-col'>
        <div className={`grid grid-cols-2 gap-10 ${lgWrapper}`}>
          <div className='flex h-full w-full flex-col'>
            <div>Детали заказа</div>
            <div>{event?.name}</div>
            <div className='orderInfo mt-10 flex h-full flex-col justify-between'>
              <div>
                <div className={`${orderInfoItem}`}>
                  <span className='font-semibold text-[#646464]'>Дата</span>
                  <span className='font-bold'>
                    {moment(selectedSession?.beginDateTime).format(
                      'DD.MM.YYYY'
                    )}
                  </span>
                </div>
                <div className={`${orderInfoItem}`}>
                  <span className='font-semibold text-[#646464]'>Время</span>
                  <span className='font-bold'>
                    {moment(selectedSession?.beginDateTime).format('HH:mm')}
                  </span>
                </div>
                {tickets
                  .filter((_ticket) => _ticket.ticketCount > 0)
                  .map((ticket) => {
                    const service = ticket.nameRu ?? ticket.serviceName;
                    return (
                      <div className={`${orderInfoItem}`} key={ticket.id}>
                        <span className='font-semibold text-[#646464]'>
                          {service} x {ticket.ticketCount}
                        </span>
                        <span className='font-bold'>
                          {ticket.ticketCount * ticket.serviceCost}тг.
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div>
                <div></div>
                <div className={orderInfoItem}>
                  <span className='text-lg font-semibold text-[#646464]'>
                    Сервисный сбор
                  </span>
                  <span className='font-bold'>{event?.serviceFee}%</span>
                </div>
                <div className={orderInfoItem}>
                  <span className='text-lg font-semibold text-[#646464]'>
                    Итого
                  </span>
                  <span className='font-bold'>{totalAmount}тг.</span>
                </div>
              </div>
            </div>
          </div>
          <form className='flex flex-col'>
            <label
              htmlFor='phoneNumber'
              className='mb-2 text-base font-semibold'
            >
              Номер телефона
            </label>
            <PhoneInput
              onlyCountries={['kz']}
              country={'kz'}
              disableDropdown
              countryCodeEditable={false}
              masks={{ kz: '-(...)-...-..-..' }}
              // className={'PhoneInput'}
              onChange={(e) => {
                dispatch(mainReducer.actions.setPhoneNumber(e));
              }}
              value={phoneNumber}
            />

            <label
              htmlFor='confirmPhoneNumber'
              className='mb-2 mt-5 text-base font-semibold'
            >
              Подтвердите номер телефона
            </label>
            <PhoneInput
              onlyCountries={['kz']}
              country={'kz'}
              disableDropdown
              countryCodeEditable={false}
              masks={{ kz: '-(...)-...-..-..' }}
              // className={'PhoneInput'}
              onChange={(e) => {
                dispatch(mainReducer.actions.setConfirmPhoneNumber(e));
              }}
              value={confirmPhoneNumber}
            />

            <label className='mb-2 mt-8 text-base font-semibold'>
              Выберите способ оплаты
            </label>
            <div className='flex flex-col gap-4'>
              <label className='w-fit'>
                <div className='relative flex h-8 cursor-pointer items-center gap-4'>
                  <input
                    type='radio'
                    name='radioGroup'
                    value={1}
                    checked={paymentMethod === 1}
                    onChange={(v) =>
                      dispatch(
                        mainReducer.actions.setPaymentMethod(
                          Number(v.target.value)
                        )
                      )
                    }
                    className='checked:bg-check-mark absolute -top-2 left-9 text-white focus:ring-transparent focus:ring-offset-transparent'
                  />{' '}
                  <KaspiIcon checked={paymentMethod === 1} />
                  <span className='font-medium'>Kaspi Bank</span>
                </div>
              </label>
              <label className='w-fit'>
                <div className='relative flex h-8 cursor-pointer items-center gap-4'>
                  <input
                    type='radio'
                    name='radioGroup'
                    value={2}
                    onChange={(v) =>
                      dispatch(
                        mainReducer.actions.setPaymentMethod(
                          Number(v.target.value)
                        )
                      )
                    }
                    checked={paymentMethod === 2}
                    className='checked:bg-check-mark absolute -top-2 left-9 text-white focus:ring-transparent focus:ring-offset-transparent'
                  />{' '}
                  <CardIcon checked={paymentMethod === 2} />
                  <span className='font-medium'>Карта Visa/Master Card</span>
                </div>
              </label>
            </div>
          </form>
        </div>
        <label className='mt-2 w-fit cursor-pointer ring-0 checked:ring-0'>
          <input
            type='checkbox'
            name='checkbox1'
            className='rounded-full focus:ring-transparent focus:ring-offset-transparent'
            checked={isGetInfoAllow}
            onChange={() =>
              dispatch(mainReducer.actions.setIsGetInfoAllow(!isGetInfoAllow))
            }
          />{' '}
          Ознакомлен и согласен с договором оферты
        </label>
        <label className='mt-2 w-fit cursor-pointer ring-0 checked:ring-0'>
          <input
            type='checkbox'
            name='checkbox2'
            className='rounded-full focus:ring-transparent focus:ring-offset-transparent'
            checked={isTreaty}
            onChange={() =>
              dispatch(mainReducer.actions.setIsTreaty(!isTreaty))
            }
          />{' '}
          Я соглашаюсь на сбор и обработку данных для отправки SMS
        </label>
      </div>
    );
  }
};

export default PaymentForm;
