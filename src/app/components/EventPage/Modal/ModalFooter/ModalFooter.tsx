'use client';
import { isEmpty } from '@/common/functions';
import { Orders } from '@/services/axios';
import { modalReducer } from '@/store/slices/modalSlice';
import { useAppSelector } from '@/store/store';
import { createPopper } from '@popperjs/core';
import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import './ModalFooter.scss';

interface SeatTooltip {
    doesThisStationLast: boolean;
}

export const InfoTooltip: React.FC = () => {
    return (
        <div className="fixed inset-x-0 top-[5vh] z-50 hidden justify-center" id="infoTooltip">
            <div className="w-fit rounded-lg bg-white p-2 shadow-lg">Вы отменили свой заказ!</div>
        </div>
    );
};

const SeatTooltip: React.FC<SeatTooltip> = ({ doesThisStationLast }) => {
    const dispatch = useDispatch();

    const { currentOrderData } = useAppSelector(({ mainReducer }) => mainReducer);

    const cancelOrder = async () => {
        if (doesThisStationLast && currentOrderData?.orderId) {
            const orderId = { orderId: currentOrderData?.orderId };
            await Orders()
                .put('EventsOrder/cancel', orderId)
                .then(({ status }) => {
                    if (status === 204) {
                        dispatch(modalReducer.actions.closePaymentModal());
                    }
                });
        } else {
            dispatch(modalReducer.actions.closePaymentModal());
            dispatch(modalReducer.actions.closePaymentModal());
        }

        const infoTooltip = document.getElementById('infoTooltip');
        if (infoTooltip) {
            infoTooltip.classList.add('fade-in-out', 'active');
            const originalDisplay = infoTooltip.style.display;
            infoTooltip.style.display = 'flex';

            setTimeout(() => {
                infoTooltip.style.display = originalDisplay;
                infoTooltip.classList.remove('active');
            }, 3000);
        }
        // location.reload();
    };

    return (
        <div id="tooltip" className="tooltipItem hidden rounded-lg border-2 border-black bg-white p-2 drop-shadow-2xl">
            <div className="tooltipItem">Вы действительно хотите завершить покупку билета?</div>
            <div className="tooltipItem mt-2 flex justify-end gap-2">
                <button className="rounded-lg bg-red-500 px-3 py-1 text-white">Нет</button>
                <button className="tooltipItem rounded-lg bg-blue-500 px-3 py-1 text-white" onClick={cancelOrder}>
                    Да
                </button>
            </div>
        </div>
    );
};

const ModalFooter: React.FC = () => {
    const dispatch = useDispatch();
    const [nextIsDisabled, setNextIsDisabled] = useState(true);
    const [doesThisStationLast, setThisStationAsLast] = useState(false);
    const { activeStepIndex } = useAppSelector(({ modalReducer }) => modalReducer);

    const {
        hall,
        event,
        sessions,
        selectedSession,
        sector,
        tickets,
        isValidationSuccess,
        totalAmount,
        selectedDay,
        currentOrderData,
    } = useAppSelector(({ mainReducer }) => mainReducer);

    const nextStep = () => {
        dispatch(modalReducer.actions.nextPaymentStepIndex());
    };

    const prevStep = () => {
        dispatch(modalReducer.actions.prevPaymentStepIndex());
    };

    const showTooltip = (mouseEvent: React.MouseEvent<HTMLElement>) => {
        const targetSeat = mouseEvent.target as HTMLElement;
        if (targetSeat instanceof HTMLElement) {
            const tooltip = document.querySelector('#tooltip');
            if (tooltip instanceof HTMLElement) {
                createPopper(targetSeat, tooltip, {
                    placement: 'top',
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
        }
    };

    const doesHallHasFewSectors = isEmpty(hall) ? false : hall!.sectors.length > 1;

    const doesEventHasMoreThenOneSession = event?.isRepeatable && sessions?.length > 1;

    const doServicesNotEmpty = (): boolean => {
        let ticketsCount = 0;
        if (tickets.length > 0) {
            tickets.forEach((ticket) => {
                ticketsCount += ticket.ticketCount;
            });
            return ticketsCount === 0;
        } else {
            return true;
        }
    };

    const updateNextButtonState = () => {
        if (doesEventHasMoreThenOneSession) {
            if (doesHallHasFewSectors) {
                if (isMobile) {
                    switch (activeStepIndex) {
                        case 0:
                            setNextIsDisabled(isEmpty(selectedDay));
                            setThisStationAsLast(false);
                            break;
                        case 1:
                            setNextIsDisabled(isEmpty(selectedSession));
                            setThisStationAsLast(false);
                            break;
                        case 2:
                            setNextIsDisabled(isEmpty(sector));
                            setThisStationAsLast(false);
                            break;
                        case 3:
                            setNextIsDisabled(doServicesNotEmpty());
                            setThisStationAsLast(false);
                            break;
                        case 4:
                            setNextIsDisabled(!isValidationSuccess);
                            setThisStationAsLast(false);
                            break;
                        case 5:
                            setNextIsDisabled(isEmpty(currentOrderData?.number));
                            setThisStationAsLast(true);
                            break;
                        default:
                            break;
                    }
                } else {
                    switch (activeStepIndex) {
                        case 0:
                            setNextIsDisabled(isEmpty(selectedSession));
                            setThisStationAsLast(false);
                            break;
                        case 1:
                            setNextIsDisabled(isEmpty(sector));
                            setThisStationAsLast(false);
                            break;
                        case 2:
                            setNextIsDisabled(doServicesNotEmpty());
                            setThisStationAsLast(false);
                            break;
                        case 3:
                            setNextIsDisabled(!isValidationSuccess);
                            setThisStationAsLast(false);
                            break;
                        case 4:
                            setNextIsDisabled(isEmpty(currentOrderData?.number));
                            setThisStationAsLast(true);
                            break;
                        default:
                            break;
                    }
                }
            } else {
                if (isMobile) {
                    switch (activeStepIndex) {
                        case 0:
                            setNextIsDisabled(isEmpty(selectedDay));
                            setThisStationAsLast(false);
                            break;
                        case 1:
                            setNextIsDisabled(isEmpty(selectedSession));
                            setThisStationAsLast(false);
                            break;
                        case 2:
                            setNextIsDisabled(doServicesNotEmpty());
                            setThisStationAsLast(false);
                            break;
                        case 3:
                            setNextIsDisabled(!isValidationSuccess);
                            setThisStationAsLast(false);
                            break;
                        case 4:
                            setNextIsDisabled(isEmpty(currentOrderData?.number));
                            setThisStationAsLast(true);
                            break;
                        default:
                            break;
                    }
                } else {
                    switch (activeStepIndex) {
                        case 0:
                            setNextIsDisabled(isEmpty(selectedSession));
                            setThisStationAsLast(false);
                            break;
                        case 1:
                            setNextIsDisabled(doServicesNotEmpty());
                            setThisStationAsLast(false);
                            break;
                        case 2:
                            setNextIsDisabled(!isValidationSuccess);
                            setThisStationAsLast(false);
                            break;
                        case 3:
                            setNextIsDisabled(isEmpty(currentOrderData?.number));
                            setThisStationAsLast(true);
                            break;
                        default:
                            break;
                    }
                }
            }
        } else {
            if (doesHallHasFewSectors) {
                switch (activeStepIndex) {
                    case 0:
                        setNextIsDisabled(isEmpty(sector));
                        setThisStationAsLast(false);
                        break;
                    case 1:
                        setNextIsDisabled(doServicesNotEmpty());
                        setThisStationAsLast(false);
                        break;
                    case 2:
                        setNextIsDisabled(!isValidationSuccess);
                        setThisStationAsLast(false);
                        break;
                    case 3:
                        setNextIsDisabled(!isEmpty(currentOrderData?.number));
                        setThisStationAsLast(true);
                        break;
                    default:
                        break;
                }
            } else {
                switch (activeStepIndex) {
                    case 0:
                        setNextIsDisabled(doServicesNotEmpty());
                        setThisStationAsLast(false);
                        break;
                    case 1:
                        setNextIsDisabled(!isValidationSuccess);
                        setThisStationAsLast(false);
                        break;
                    case 2:
                        setNextIsDisabled(!isEmpty(currentOrderData?.number));
                        setThisStationAsLast(true);
                        break;
                    default:
                        break;
                }
            }
        }
    };

    useEffect(() => {
        updateNextButtonState();
    }, [activeStepIndex, isValidationSuccess, hall, sector, tickets, selectedDay]);

    useEffect(() => {
        const tooltipElement = document.getElementById('tooltip');
        document.body.addEventListener('click', (e: any) => {
            if (tooltipElement) {
                if (e.target.id === 'closeModalButton') {
                    tooltipElement.classList.remove('hidden');
                } else if (e.target.classList.contains('tooltipItem')) {
                    return null;
                } else {
                    tooltipElement.classList.add('hidden');
                }
            }
        });
    }, []);

    return (
        <div className="flex w-full flex-row-reverse gap-4 self-end">
            {doesThisStationLast ? (
                <a
                    className="mt-4 w-full  cursor-pointer rounded-full bg-blue-500 px-4 py-3 text-center text-lg text-white hover:bg-blue-600 lg:w-fit lg:rounded lg:py-1.5"
                    href={`https://kaspi.kz/pay/kazticket?service_id=4515&7102=${currentOrderData?.number}&amount=${totalAmount}`}
                    target="_blank"
                >
                    Оплатить
                </a>
            ) : (
                <button
                    className={`mt-4 w-full rounded-full px-4 py-3 text-lg text-white lg:w-fit lg:rounded lg:py-1.5  ${
                        nextIsDisabled
                            ? 'cursor-not-allowed bg-stone-500'
                            : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={nextIsDisabled}
                    onClick={nextStep}
                >
                    Далее
                </button>
            )}
            {!doesThisStationLast && (
                <button
                    className={`mt-4 hidden rounded px-4 py-1.5 text-white lg:block  ${
                        activeStepIndex === 0
                            ? 'cursor-not-allowed bg-stone-500'
                            : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
                    }`}
                    onClick={prevStep}
                    disabled={activeStepIndex === 0}
                >
                    Назад
                </button>
            )}
            <button
                className="mt-4 hidden rounded bg-red-500 px-4 py-1.5 text-white lg:block "
                onClick={showTooltip}
                id="closeModalButton"
            >
                Закрыть
            </button>
            <SeatTooltip doesThisStationLast={doesThisStationLast} />
        </div>
    );
};

export default ModalFooter;
