'use client';
import { isEmpty } from '@/common/functions';
import { IServiceForOrder, ISessionService } from '@/interfaces/Interfaces';
import { mainReducer } from '@/store/slices/mainSlice';
import { AppDispatch, useAppSelector } from '@/store/store';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';

const ServiceComponent: React.FC<{
    service: IServiceForOrder;
    increment: () => void;
    dicrement: () => void;
    leftPlacesCount: number;
}> = ({ service, leftPlacesCount, dicrement, increment }) => {
    const [allTicketsCount, setAllTicketsCount] = useState(0);
    const [ticketsLimit, setTicketsLimit] = useState(0);

    const dispatch = useDispatch();
    const { tickets } = useAppSelector(({ mainReducer }) => mainReducer);

    const incrementAndDicrementButton = isMobile
        ? 'flex h-8 w-8 rounded-xl border-2'
        : 'flex h-10 w-10 rounded-lg border text-3xl font-extralight';

    const serviceCountInput = isMobile ? 'h-8 w-24 rounded-xl border-2' : 'h-10 w-36 rounded-lg border';

    const ticket = tickets?.find((ticket) => ticket?.sessionServiceId === service.sessionServiceId);

    useEffect(() => {
        let totalAmount = 0;
        let allTicketsCount = 0;
        if (!isEmpty(tickets)) {
            tickets.forEach((el) => {
                totalAmount += el.ticketCount * el.serviceCost;
                allTicketsCount += el.ticketCount;
            });
        }
        setAllTicketsCount(allTicketsCount);
        dispatch(mainReducer.actions.setTotalAmount(totalAmount));
        const isLeftPlacesCountMoreThanFive = leftPlacesCount > 10;
        setTicketsLimit(isLeftPlacesCountMoreThanFive ? 10 : leftPlacesCount);
    }, [tickets]);

    if (ticket) {
        return (
            <div className={`${isMobile ? 'font-medium' : 'text-xl'} mb-5`}>
                <div>{ticket.nameRu}</div>
                <div className={`mt-2  ${isMobile ? 'flex justify-between' : ''}`}>
                    <div className="flex h-8 space-x-2.5">
                        <button
                            className={`${incrementAndDicrementButton} ${
                                ticket.ticketCount === 0 ? 'cursor-not-allowed bg-[#EBEBEB]' : 'cursor-pointer'
                            } items-center justify-center`}
                            type="button"
                            disabled={ticket.ticketCount === 0}
                            onClick={dicrement}
                        >
                            -
                        </button>
                        <div className={`${serviceCountInput} flex items-center justify-start border-[#BCBCBC] pl-2`}>
                            {ticket.ticketCount * ticket.serviceCost}₸
                        </div>
                        <button
                            type="button"
                            className={`${incrementAndDicrementButton} ${
                                ticket.ticketCount >= ticketsLimit
                                    ? 'cursor-not-allowed bg-[#EBEBEB]'
                                    : 'cursor-pointer'
                            } items-center justify-center border-[#BCBCBC]`}
                            disabled={ticket.ticketCount >= ticketsLimit}
                            onClick={increment}
                        >
                            +
                        </button>
                    </div>
                    <div className={`${isMobile ? '' : 'mt-2'}`}>{ticket.serviceCost}₸</div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

const SelectStandingPlace: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tickets, serviceGroups, customServiceGroups, event, totalAmount } = useAppSelector(
        ({ mainReducer }) => mainReducer,
    );
    const [isServiceGroupsEmpty, setIsServiceGroupsEmpty] = useState(false);

    const getTickets = () => {
        const allServices: any[] = [];
        serviceGroups?.sessionServices?.forEach((sessionService) => {
            allServices.push({ ...sessionService, ticketCount: 0 });
        });
        customServiceGroups.forEach((customServiceGroup) => {
            customServiceGroup.services.forEach((service) => {
                allServices.push({
                    ...service,
                    ticketCount: 0,
                    sessionServiceGroupId: customServiceGroup.sessionServiceGroupId,
                });
            });
        });
        dispatch(mainReducer.actions.setTickets(allServices));
    };

    const lgSessionsWrapper = 'lg:px-8 lg:py-6 lg:border-2 lg:border-[#B6B6B6] lg:rounded-2xl';

    useEffect(() => {
        if (serviceGroups?.balanceCount === 0) {
            setIsServiceGroupsEmpty(true);
        } else {
            if (isEmpty(tickets)) {
                getTickets();
            }
        }
    }, [serviceGroups]);

    if (isMobile) {
        return (
            <div className="h-full">
                {serviceGroups!.sessionServices.map((sessionService: IServiceForOrder) => (
                    <ServiceComponent
                        service={sessionService}
                        leftPlacesCount={serviceGroups?.balanceCount ?? 0}
                        key={sessionService.sessionServiceId}
                        increment={() => {
                            const ticketCountArray = tickets.map((ticket) => {
                                return ticket.sessionServiceId == sessionService.sessionServiceId
                                    ? { ...ticket, ticketCount: ticket.ticketCount + 1 }
                                    : ticket;
                            });
                            dispatch(mainReducer.actions.setTickets(ticketCountArray));
                        }}
                        dicrement={() => {
                            const ticketCountArray = tickets.map((ticket) => {
                                return ticket.sessionServiceId == sessionService.sessionServiceId
                                    ? { ...ticket, ticketCount: ticket.ticketCount - 1 }
                                    : ticket;
                            });
                            dispatch(mainReducer.actions.setTickets(ticketCountArray));
                        }}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <>
                <div className="mb-6 text-2xl font-semibold">Массовые катания в ледовом дворце “Алау”</div>
                <div className={`${lgSessionsWrapper}`}>
                    <div className="mb-4 text-2xl font-semibold">Услуги входа</div>
                    <div>
                        {serviceGroups!.sessionServices.map((sessionService: IServiceForOrder) => (
                            <ServiceComponent
                                service={sessionService}
                                leftPlacesCount={serviceGroups?.balanceCount ?? 0}
                                key={sessionService.sessionServiceId}
                                increment={() => {
                                    const ticketCountArray = tickets.map((ticket) => {
                                        return ticket.sessionServiceId == sessionService.sessionServiceId
                                            ? { ...ticket, ticketCount: ticket.ticketCount + 1 }
                                            : ticket;
                                    });
                                    dispatch(mainReducer.actions.setTickets(ticketCountArray));
                                }}
                                dicrement={() => {
                                    const ticketCountArray = tickets.map((ticket) => {
                                        return ticket.sessionServiceId == sessionService.sessionServiceId
                                            ? { ...ticket, ticketCount: ticket.ticketCount - 1 }
                                            : ticket;
                                    });
                                    dispatch(mainReducer.actions.setTickets(ticketCountArray));
                                }}
                            />
                        ))}
                    </div>
                    {customServiceGroups.length > 0 && (
                        <div>
                            <div className="mb-4 text-2xl font-semibold">Дополнительные услуги</div>
                            {customServiceGroups.map((customServiceGroup: any, i: number) => {
                                return (
                                    <div key={i}>
                                        {customServiceGroup.services.map((sessionService: any) => {
                                            return (
                                                <ServiceComponent
                                                    service={sessionService}
                                                    leftPlacesCount={serviceGroups?.balanceCount ?? 0}
                                                    key={sessionService.sessionServiceId}
                                                    increment={() => {
                                                        const ticketCountArray = tickets.map((ticket) => {
                                                            return ticket.sessionServiceId ==
                                                                sessionService.sessionServiceId
                                                                ? {
                                                                      ...ticket,
                                                                      ticketCount: ticket.ticketCount + 1,
                                                                  }
                                                                : ticket;
                                                        });
                                                        dispatch(mainReducer.actions.setTickets(ticketCountArray));
                                                    }}
                                                    dicrement={() => {
                                                        const ticketCountArray = tickets.map((ticket) => {
                                                            return ticket.sessionServiceId ==
                                                                sessionService.sessionServiceId
                                                                ? {
                                                                      ...ticket,
                                                                      ticketCount: ticket.ticketCount - 1,
                                                                  }
                                                                : ticket;
                                                        });
                                                        dispatch(mainReducer.actions.setTickets(ticketCountArray));
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className="text-xl">
                        {event && event?.serviceFee > 0 && (
                            <div className="ServiceFee">
                                <span>Сервисный сбор: </span>
                                <span className="font-bold">{event.serviceFee}%</span>
                            </div>
                        )}
                        <div className="Total">
                            <span>Общая сумма: </span>
                            <span className="font-bold">
                                {(totalAmount + (totalAmount / 100) * (event?.serviceFee ?? 1)).toFixed(2)}₸
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default SelectStandingPlace;
