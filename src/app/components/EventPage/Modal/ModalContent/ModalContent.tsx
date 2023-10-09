'use client';
import OrderPayment from '@/app/components/EventPage/Modal/ModalContent/Order/OrderPayment';
import PaymentForm from '@/app/components/EventPage/Modal/ModalContent/PaymentForm/PaymentForm';
import SelectDay from '@/app/components/EventPage/Modal/ModalContent/SelectDay/SelectDay';
import SelectSector from '@/app/components/EventPage/Modal/ModalContent/SelectSector/SelectSector';
import SelectSession from '@/app/components/EventPage/Modal/ModalContent/SelectSession/SelectSession';
import SelectStandingPlace from '@/app/components/EventPage/Modal/ModalContent/SelectStandingPlace/SelectStandingPlace';
import SelectTribunePlace from '@/app/components/EventPage/Modal/ModalContent/SelectTribunePlace';
import { isEmpty } from '@/common/functions';
import { useAppSelector } from '@/store/store';
import moment from 'moment';
import 'moment/locale/ru';
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
moment.locale('ru');

interface IModalStep {
    activeStep?: boolean;
    activeStepTest?: number;
    stepComponent: React.ReactNode;
    stepName: string;
}

const ModalContent: React.FC = () => {
    const { sessions, event, paymentInfo, hall, sector, selectedSession, selectedDay, tickets } = useAppSelector(
        ({ mainReducer }) => mainReducer,
    );

    const { activeStepIndex } = useAppSelector(({ modalReducer }) => modalReducer);
    const [modalSteps, setModalSteps] = useState<IModalStep[]>([]);

    const doesHallHasFewSectors = isEmpty(hall) ? false : hall!.sectors?.length > 1;

    const doesEventHasMoreThenOneSession = event?.isRepeatable && sessions?.length > 1;

    const isKaspiPayment = paymentInfo?.paymentMethod === 1;

    const isStandingPlace = sector?.scheme === 'typeIdOne';

    const getServiceCount = (): number => {
        let serviceCount = 0;
        tickets.forEach((ticket) => {
            serviceCount += ticket.ticketCount;
        });
        return serviceCount;
    };

    const getTotalOfServices = (): number => {
        let TotalOfServices = 0;
        tickets.forEach((ticket) => {
            TotalOfServices += ticket.ticketCount * ticket.serviceCost;
        });
        return TotalOfServices;
    };

    const getTotalOfServicesWithServiceFee = (): number => {
        return getTotalOfServices() + (getTotalOfServices() / 100) * (event?.serviceFee ?? 1);
    };

    const eventType = () => {
        if (doesEventHasMoreThenOneSession) {
            if (doesHallHasFewSectors) {
                if (isMobile) {
                    setModalSteps([
                        {
                            activeStepTest: 0,
                            stepName: 'selectDay',
                            stepComponent: isEmpty(sessions) ? <div>Сеансов нет</div> : <SelectDay key={0} />,
                        },
                        {
                            activeStepTest: 1,
                            stepName: 'selectSector',
                            stepComponent: <SelectSector key={1} />,
                        },
                        {
                            activeStepTest: 2,
                            stepName: 'selectService',
                            stepComponent: isEmpty(sector?.scheme) ? (
                                <div key={2}>Загрузка</div>
                            ) : isStandingPlace ? (
                                <SelectStandingPlace key={2} />
                            ) : (
                                <SelectTribunePlace key={2} />
                            ),
                        },
                        {
                            activeStepTest: 3,
                            stepName: 'paymentForm',
                            stepComponent: <PaymentForm key={3} />,
                        },
                        {
                            activeStepTest: 4,
                            stepName: 'orderPayment',
                            stepComponent: <OrderPayment key={4} />,
                        },
                    ]);
                } else {
                    setModalSteps([
                        {
                            activeStepTest: 0,
                            stepName: 'selectSession',
                            stepComponent: isEmpty(sessions) ? <div>Сеансов нет</div> : <SelectSession key={0} />,
                        },
                        {
                            activeStepTest: 1,
                            stepName: 'selectSector',
                            stepComponent: <SelectSector key={1} />,
                        },
                        {
                            activeStepTest: 2,
                            stepName: 'selectService',
                            stepComponent: isEmpty(sector?.scheme) ? (
                                <div key={2}>Загрузка</div>
                            ) : isStandingPlace ? (
                                <SelectStandingPlace key={2} />
                            ) : (
                                <SelectTribunePlace key={2} />
                            ),
                        },
                        {
                            activeStepTest: 3,
                            stepName: 'paymentForm',
                            stepComponent: <PaymentForm key={3} />,
                        },
                        {
                            activeStepTest: 4,
                            stepName: 'orderPayment',
                            stepComponent: <OrderPayment key={4} />,
                        },
                    ]);
                }
            } else {
                if (isMobile) {
                    setModalSteps([
                        {
                            activeStepTest: 0,
                            stepName: 'selectDay',
                            stepComponent: isEmpty(sessions) ? <div>Сеансов нет</div> : <SelectDay key={0} />,
                        },
                        {
                            activeStepTest: 1,
                            stepName: 'selectSession',
                            stepComponent: <SelectSession key={1} />,
                        },
                        {
                            activeStepTest: 2,
                            stepName: 'selectService',
                            stepComponent: isEmpty(sector?.scheme) ? (
                                <div key={1}>Загрузка</div>
                            ) : isStandingPlace ? (
                                <SelectStandingPlace key={2} />
                            ) : (
                                <SelectTribunePlace key={2} />
                            ),
                        },
                        {
                            activeStepTest: 3,
                            stepName: 'paymentForm',
                            stepComponent: <PaymentForm key={3} />,
                        },
                        {
                            activeStepTest: 4,
                            stepName: 'orderPayment',
                            stepComponent: <OrderPayment key={4} />,
                        },
                    ]);
                } else {
                    setModalSteps([
                        {
                            activeStepTest: 0,
                            stepName: 'selectSession',
                            stepComponent: isEmpty(sessions) ? <div>Сеансов нет</div> : <SelectSession key={1} />,
                        },
                        {
                            activeStepTest: 1,
                            stepName: 'selectService',
                            stepComponent: isEmpty(sector?.scheme) ? (
                                <div key={1}>Загрузка</div>
                            ) : isStandingPlace ? (
                                <SelectStandingPlace key={1} />
                            ) : (
                                <SelectTribunePlace key={1} />
                            ),
                        },
                        {
                            activeStepTest: 2,
                            stepName: 'paymentForm',
                            stepComponent: <PaymentForm key={2} />,
                        },
                        {
                            activeStepTest: 3,
                            stepName: 'orderPayment',
                            stepComponent: <OrderPayment key={3} />,
                        },
                    ]);
                }
            }
        } else {
            if (doesHallHasFewSectors) {
                setModalSteps([
                    {
                        activeStepTest: 0,
                        stepName: 'selectSector',
                        stepComponent: isEmpty(sessions) ? <div>Активных сеансов нет</div> : <SelectSector key={0} />,
                    },
                    {
                        activeStepTest: 1,
                        stepName: 'selectSector',
                        stepComponent: isEmpty(sector?.scheme) ? (
                            <div>Активных сеансов нет</div>
                        ) : isStandingPlace ? (
                            <SelectStandingPlace key={1} />
                        ) : (
                            <SelectTribunePlace key={1} />
                        ),
                    },
                    {
                        activeStepTest: 2,
                        stepName: 'paymentForm',
                        stepComponent: <PaymentForm key={2} />,
                    },
                    {
                        activeStepTest: 3,
                        stepName: 'orderPayment',
                        stepComponent: <OrderPayment key={3} />,
                    },
                ]);
            } else {
                setModalSteps([
                    {
                        activeStepTest: 0,
                        stepName: 'selectService',
                        stepComponent: isEmpty(sessions) ? (
                            <div>Активных сеансов нет</div>
                        ) : isStandingPlace ? (
                            <SelectStandingPlace key={0} />
                        ) : (
                            <SelectTribunePlace key={0} />
                        ),
                    },
                    {
                        activeStepTest: 1,
                        stepName: 'paymentForm',
                        stepComponent: <PaymentForm key={1} />,
                    },
                    {
                        activeStepTest: 2,
                        stepName: 'orderPayment',
                        stepComponent: <OrderPayment key={2} />,
                    },
                ]);
            }
        }
    };

    useEffect(() => {
        eventType();
    }, [event, sessions, hall, sector, isMobile]);

    if (modalSteps.length > 0) {
        return (
            <div className="flex h-[75%] flex-col justify-between lg:mt-8 lg:h-full lg:justify-start">
                <div className={`${isMobile ? 'overflow-auto' : ''} h-full`}>
                    {modalSteps[activeStepIndex]?.stepComponent}
                </div>
                <div className="lg:hidden">
                    {modalSteps[activeStepIndex].stepName === 'paymentForm' && (
                        <div className="flex flex-col gap-2 border-t-2 border-dashed pt-6">
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Итого</span>
                                <span>{getTotalOfServicesWithServiceFee()} тг.</span>
                            </div>
                        </div>
                    )}
                    {modalSteps[activeStepIndex].stepName === 'selectService' && (
                        <div className="flex flex-col gap-2 border-t-2 border-dashed pt-6">
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Выбранный сеанс</span>
                                <span>{moment(selectedSession?.beginDateTime).format('DD MMMM HH:mm')}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Билеты</span>
                                <span>{getServiceCount()} шт.</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Итого</span>
                                <span>{getTotalOfServices()} тг.</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Сервисный сбор {event?.serviceFee}%</span>
                                <span>{(getTotalOfServices() / 100) * (event?.serviceFee ?? 1)} тг.</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Общая стоимость</span>
                                <span>{getTotalOfServicesWithServiceFee()} тг.</span>
                            </div>
                        </div>
                    )}
                    {modalSteps[activeStepIndex].stepName === 'selectDay' && (
                        <div className="flex flex-col gap-2 border-t-2 border-dashed pt-6">
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Дата</span>
                                <span>{!isEmpty(selectedDay) && moment(selectedDay).format('D MMMM YYYY')}</span>
                            </div>
                        </div>
                    )}
                    {modalSteps[activeStepIndex].stepName === 'selectSession' && (
                        <div className="flex flex-col gap-2 border-t-2 border-dashed pt-6">
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Время</span>
                                <span>{moment(selectedSession?.beginDateTime).format('HH:mm')}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-[#9C9C9C]">Дата</span>
                                <span>{moment(selectedSession?.beginDateTime).format('DD MMMM HH:mm')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ModalContent;
