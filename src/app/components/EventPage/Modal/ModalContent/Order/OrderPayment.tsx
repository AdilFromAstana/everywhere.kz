'use client';
import './OrderPayment.scss';

import { useAppSelector } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { Orders } from '@/services/axios';
import { useDispatch } from 'react-redux';
import { clearOrderInfo, mainReducer } from '@/store/slices/mainSlice';
import { IScheduleItem } from '@/interfaces/Interfaces';
import { isEmpty } from '@/common/functions';
import KaspiPayment from '@/app/components/EventPage/Modal/ModalContent/Order/KaspiPayment';
import CloudPayment from '@/app/components/EventPage/Modal/ModalContent/Order/CloudPayment';
import Countdown from 'react-countdown';
import moment from 'moment';
import { ClientService } from 'cloudpayments';
import { modalReducer } from '@/store/slices/modalSlice';

enum OrderStatus {
  Reserved = 1,
  ReserveExpired = 2,
  Paid = 3,
  Refunded = 4,
  Canceled = 5,
}

interface OrderPayment {
  stepIndex: number;
  selectedSession: IScheduleItem | null;
}

const OrderPayment: React.FC = () => {
  const dispatch = useDispatch();
  const {
    paymentInfo,
    tickets,
    event,
    serviceGroups,
    sector,
    totalAmount,
    selectedSession,
    createdOrderId,
    currentOrderData,
  } = useAppSelector(({ mainReducer }) => mainReducer);

  const { activeStepIndex } = useAppSelector(
    ({ modalReducer }) => modalReducer
  );
  const [refreshTimeExpired, setRefreshTimeExpired] = useState(
    moment().format()
  );
  const [refreshCount, setRefreshCount] = useState(0);

  const [error, setError] = useState({
    isError: false,
    errorType: '',
    messages: [],
    errorTitle: <div></div>,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshOrderStatus = () => {
    if (!isEmpty(currentOrderData?.orderId)) {
      Orders()
        .get(`orders/info/${currentOrderData?.orderId}`)
        .then(({ data }: any) => {
          switch (data.statusId) {
            case OrderStatus.ReserveExpired: {
              dispatch(mainReducer.actions.clearOrderInfo());
              break;
            }
            case OrderStatus.Paid: {
              // setOrderIsPaid(true);
              dispatch(modalReducer.actions.closePaymentModal());
              dispatch(modalReducer.actions.openSuccessModal());
              dispatch(mainReducer.actions.clearOrderInfo());
              break;
            }
            case OrderStatus.Canceled: {
              dispatch(mainReducer.actions.clearOrderInfo());
              break;
            }
            case OrderStatus.Reserved: {
              setRefreshTimeExpired(moment().add(5, 'seconds').format());
              setRefreshCount((prevCount) => prevCount + 1);
              break;
            }
            default:
              break;
          }
        });
    }
  };

  function getFirstNumber(str: string) {
    const match = str.match(/[0-9]+/);

    if (match !== null) {
      return parseInt(match[0]);
    }

    return 0; // Return a default value if no match is found
  }

  const paymentWithKaspi = async () => {
    let services: any[] = [];
    tickets.forEach((ticket) => {
      if (ticket.ticketCount > 0) {
        services.push({
          sessionServiceId: ticket.sessionServiceId,
          trubuneSeatId:
            sector?.scheme === 'typeIdOne' ? null : ticket.trubuneSeatId,
          standingPlaceId:
            sector?.scheme === 'typeIdOne' ? serviceGroups?.id : null,
          count: ticket.ticketCount,
        });
      }
    });

    const data = {
      // eventId: 'c0e7675d-9470-4661-be63-fe239eacd07d',
      eventId: 'beb356e8-23a6-45e9-ba01-9eed828ea087',
      sessionId: selectedSession?.id,
      sectorId: sector?.sectorId,
      paymentMethod: paymentInfo?.paymentMethod,
      customerPhoneNumber: paymentInfo?.phoneNumber,
      services: services,
      customerFirstName: '',
      customerLastName: '',
      customerMiddleName: '',
      customerInstagramUsername: '',
    };

    await Orders()
      .post('/EventsOrder', data)
      .then(({ data, status }) => {
        setIsLoading(true);
        if (status === 200) {
          dispatch(mainReducer.actions.setCurrentOrderData(data));
        }
      })
      .catch((response) => {
        alert(JSON.stringify(response));
        setError({ ...error, isError: true });
        const errorSeats: any[] = [];
        response.response.data.errors.map((responseError: any) => {
          if (responseError?.code === 'RECORD_ALREADY_EXISTS') {
            const seatInfo = responseError?.message.split("row '")[1];
            const rowNumber = getFirstNumber(seatInfo);
            const seatNumber = getFirstNumber(seatInfo.split("seat '")[1]);
            errorSeats.push({ rowNumber: rowNumber, seatNumber: seatNumber });
            setError({
              ...error,
              isError: true,
              errorType: 'RECORD_ALREADY_EXISTS',
              errorTitle: (
                <div>
                  Упс... <br />
                  Количество выбранных вами мест больше не доступно!
                  <br />
                  Обновите страницу для актуальной информации!
                </div>
              ),
            });
          } else if (
            responseError?.code === 'PLACE_NOT_AVAILABLE' ||
            responseError?.code === 'PLACES_NOT_AVAILABLE'
          ) {
            setError({
              ...error,
              isError: true,
              errorType: responseError?.code,
              errorTitle: (
                <div>
                  Упс... <br />
                  Количество выбранных вами мест больше не доступно!
                  <br />
                  Обновите страницу для актуальной информации!
                </div>
              ),
            });
          }
        });
      })
      .finally(() => setIsLoading(false));
  };

  const paymentWithCloudPayments = async () => {
    const amountWithService =
      totalAmount +
      (totalAmount / 100) * (isEmpty(event) ? event!.serviceFee : 1);
    let services: any = [];
    tickets.forEach((ticket) => {
      if (ticket.ticketCount > 0) {
        services.push({
          sessionServiceId: ticket.sessionServiceId,
          trubuneSeatId:
            sector?.scheme === 'typeIdOne' ? null : ticket.trubuneSeatId,
          standingPlaceId:
            sector?.scheme === 'typeIdOne' ? serviceGroups?.id : null,
          count: ticket.ticketCount,
        });
      }
    });

    const cloudPaymentsData = {
      eventId: event?.id,
      sessionId: selectedSession?.id,
      sectorId: sector?.sectorId,
      paymentMethod: paymentInfo?.paymentMethod,
      customerPhoneNumber: paymentInfo?.phoneNumber,
      services: services,
    };

    const descriptions = [`${event?.name}`];
    descriptions.push(`Номер: +${paymentInfo.phoneNumber}`);
    descriptions.push(`Стоимость: ${totalAmount}₸`);
    descriptions.push(`Сервисный сбор: ${event?.serviceFee}%`);
    descriptions.push(`Общая стоимость: ${amountWithService.toFixed(2)}₸`);
    const description = descriptions.join('\n');

    await Orders()
      .post('/EventsOrder', cloudPaymentsData)
      .then(({ data, status }) => {
        if (status === 200) {
          setIsLoading(true);
          dispatch(mainReducer.actions.setCurrentOrderData(data));
          // var widget = new cp.CloudPayments();
          // widget.pay(
          //   'auth', // или 'charge'
          //   {
          //     //options
          //     //TODO: конфиг cloud
          //     // publicId: 'pk_8040dd6d7463dfdafdfc840e4fbe9', //id из личного кабинета
          //     publicId: process.env.CP_PAYMENT_ID, //TEST
          //     description: description, //назначение
          //     amount: amountWithService, //сумма
          //     currency: 'KZT', //валюта
          //     // mode: "demo",
          //     // accountId: 'user@example.com', //идентификатор плательщика (необязательно)
          //     invoiceId: data.number, //номер заказа  (необязательно)
          //     // email: 'user@example.com', //email плательщика (необязательно)
          //     skin: 'modern', //дизайн виджета (необязательно)
          //     data: {
          //       myProp: 'myProp value',
          //     },
          //   },
          //   {
          //     onSuccess: function (options: any) {
          //       // success
          //       // console.log("SUCCESS PAID: ", options);
          //     },
          //     onFail: function (reason: any, options: any) {
          //       console.log('FAIL PAID: ', options);
          //       console.log('FAIL REASON: ', reason);
          //       // fail
          //       //действие при неуспешной оплате
          //     },
          //     onComplete: function (paymentResult: any, options: any) {
          //       //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
          //       if (paymentResult.success) {
          //         // console.log("COMPLETE PAID: ", paymentResult);
          //         // console.log("COMPLETE OPTIONS: ", options);
          //         //     const data = {
          //         //         amount: (tickets.totalAmount),
          //         //         eventId: selectedSession?.id,
          //         //         transactionId: paymentResult.message?.transactionId,
          //         //         phoneNumber: paymentInfo.numberInput,
          //         //         invoiceNumber: options.invoiceId,
          //         //         ...tickets,
          //         //     }
          //         //     Axios().post(`tickets/buy`, data, buyConfig)
          //         //         .then(res => {
          //         //             console.log("res: ", res);
          //         //         })
          //       }
          //     },
          //   }
          // );
        }
      })
      .catch((badResponse) => {
        setError({ ...error, isError: true });
        const errorSeats: any = [];
        badResponse.response.data.errors.map((responseError: any) => {
          if (responseError?.code === 'RECORD_ALREADY_EXISTS') {
            const seatInfo = responseError?.message.split("row '")[1];
            const rowNumber = getFirstNumber(seatInfo);
            const seatNumber = getFirstNumber(seatInfo.split("seat '")[1]);
            errorSeats.push({ rowNumber: rowNumber, seatNumber: seatNumber });
            setError({
              ...error,
              isError: true,
              errorType: 'RECORD_ALREADY_EXISTS',
              errorTitle: (
                <div>
                  Упс... <br />
                  Количество выбранных вами мест больше не доступно!
                  <br />
                  Обновите страницу для актуальной информации!
                </div>
              ),
            });
          } else if (
            responseError?.code === 'PLACE_NOT_AVAILABLE' ||
            responseError?.code === 'PLACES_NOT_AVAILABLE'
          ) {
            setError({
              ...error,
              isError: true,
              errorType: responseError?.code,
              errorTitle: (
                <div>
                  Упс... <br />
                  Количество выбранных вами мест больше не доступно!
                  <br />
                  Обновите страницу для актуальной информации!
                </div>
              ),
            });
          }
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isEmpty(currentOrderData?.number)) {
      switch (paymentInfo.paymentMethod) {
        case 1:
          paymentWithKaspi();
          break;
        case 2:
          paymentWithCloudPayments();
          break;
      }
    }
  }, [currentOrderData?.number]);

  const PaymentComponent = () => {
    switch (paymentInfo.paymentMethod) {
      case 1:
        return <KaspiPayment />;
      case 2:
        return <CloudPayment />;
    }
  };

  if (isLoading) {
    <div className='flex flex-col items-center'>
      <div className='spinner'></div>
      <div>Загрузка</div>
    </div>;
  } else {
    if (error.isError) {
      return <div className='error'>{error.errorTitle}</div>;
    } else {
      return (
        <div id='paymentTypeComponent'>
          {/* <OrderInfo
            setModalVisible={setModalVisible}
            isModalVisible={isModalVisible}
            messageApi={messageApi}
          /> */}
          <div className='OrderInfoComponent mb-2 flex flex-col items-center justify-center gap-2 text-xl'>
            <span className='TimeLeft'>
              TimeLeft :
              <Countdown
                key='OrderExpire'
                onComplete={clearOrderInfo}
                date={moment(currentOrderData?.reservationExpiredAt).format()}
              />
            </span>
            <span className='Status'>
              Статус заказа: {OrderStatus[currentOrderData?.statusId!]}
            </span>
            <Countdown
              key={`refresh-${refreshCount}`}
              date={refreshTimeExpired}
              renderer={(props) => {
                if (props.completed) {
                  return (
                    <button
                      className='Refresh cursor-pointer rounded-lg bg-blue-500 px-6 py-1 text-white'
                      onClick={() => refreshOrderStatus()}
                    >
                      Обновить статус
                    </button>
                  );
                } else {
                  return (
                    <button
                      className='Refresh cursor-not-allowed rounded-lg bg-blue-500 px-6 py-1 text-white opacity-50'
                      disabled={true}
                    >
                      <span>Обновить через: {props.seconds}</span>
                    </button>
                  );
                }
              }}
            />
          </div>
          <PaymentComponent />
        </div>
      );
    }
  }
};

export default OrderPayment;
