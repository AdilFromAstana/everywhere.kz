'use client';
import { isEmpty } from '@/common/functions';
import { useAppSelector } from '@/store/store';
import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import kaspiQrImg from '../../../../../../icons/kaspiQr.png';

const KaspiPayment: React.FC = () => {
  const { paymentInfo, currentOrderData, totalAmount } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );
  const QRref = useRef<HTMLDivElement | null>(null);

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    image: kaspiQrImg.src,
    data: `https://kaspi.kz/pay/kazticket?service_id=4515&7102=${currentOrderData?.number}&amount=${totalAmount}`,
    dotsOptions: {
      color: '#000',
      type: 'rounded',
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.5,
      margin: 5,
    },
  });

  useEffect(() => {
    if (!isEmpty(currentOrderData?.number)) qrCode.append(QRref.current!);
  }, [currentOrderData?.number]);

  return (
    <div className='flex flex-col items-center justify-center gap-2 text-xl'>
      <span className='Title'>Подтвердите оплату</span>
      {!isEmpty(currentOrderData?.number) ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <a
            target='_blank'
            href={`https://kaspi.kz/pay/kazticket?service_id=4515&7102=${currentOrderData?.number}&amount=${totalAmount}`}
            className='rounded-lg bg-blue-500 px-5 py-1 text-xl text-white'
          >
            Оплатить через сайт Kaspi.kz
          </a>
          <span>Номер заказа: {currentOrderData?.number}</span>
          <div ref={QRref} className='flex justify-center' />
        </div>
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};

export default KaspiPayment;
