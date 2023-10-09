import { Dispatch } from '@reduxjs/toolkit';
import { UUID } from 'crypto';
import { StaticImageData } from 'next/image';

export interface ISelectCalendarProps {
    eventId: UUID;
    serviceFee: number;
}

export interface PaymentInfo {
    phoneNumber: string;
    confirmPhoneNumber: string;
    customerFirstName: string;
    customerLastName: string;
    customerMiddleName: string;
    customerInstagramUsername: string;
    paymentMethod: number;
    isTreaty: boolean;
    isGetInfoAllow: boolean;
}

export interface IInitialStateState {
    selectedLanguage: string;
    eventNameForSearch: string;
    event: {
        id: UUID;
        serviceFee: number;
        isRepeatable: boolean;
        name: string;
    } | null;
    sessions: any[];
    selectedDay: null | any;
    selectedSession: {
        beginDateTime: Date;
        locationNameRu: string;
        id: UUID;
    } | null;
    hall: null | IVenue;
    cityList: string[];
    totalAmount: number;
    sector: null | {
        nameRu: string;
        places: Array<any>;
        sectorId: UUID;
        scheme: string;
    };
    activeTab: number;
    sectorLegend: any[];
    serviceGroups: IServiceGroups | null;
    customServiceGroups: IСustomServiceGroups[];
    tickets: any[];
    currentOrderData: {
        orderId: null | UUID;
        number: null | number;
        reservationExpiredAt: null | Date;
        statusId: null | number;
    } | null;
    createdOrderNumber: string | null;
    createdOrderId: string | null;
    isValidationSuccess: boolean;
    paymentInfo: PaymentInfo;
    ticketsTest: any[];
}

export interface IServiceGroups {
    balanceCount: number;
    id: UUID | null;
    sessionServices: Array<any>;
}

export interface IScheduleItem {
    id: UUID;
    locationNameRu: string;
    saleStartDateTime: Date;
    beginDateTime: Date;
    endDateTime: Date;
    salesIsAvailable: boolean;
}

export interface ICardProps {
    serviceFee: number;
    eventId: UUID;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IVenue {
    id: UUID;
    locationId: UUID;
    locationTitleKz: string;
    locationTitleRu: string;
    locationTitleEn: string;
    hallId: number;
    hallTitleRu: string;
    hallTitleKz: string;
    hallTitleEn: string;
    hallGraphicScheme: string;
    sectors: ISectorOfVenue[] | [];
}

export interface ISectorOfVenue {
    id: UUID;
    venueId: UUID;
    sectorId: UUID;
    nameRu: string;
    nameKz: string;
    nameEn: string;
    typeId: number;
    availableSeatsCount: number;
}

export interface ISessionService {
    sessionServiceId: UUID;
    sessionServiceGroupId: UUID;
    serviceId: number;
    serviceCost: number;
    nameKz: string;
    nameRu: string;
    nameEn: string;
    descriptionKz: string | null;
    descriptionRu: string | null;
    descriptionEn: string | null;
    color: string | null;
    serviceColor: string | null;
}

export interface IPlaceOnSectorScheme {
    id: UUID;
    sessionSectorId: UUID;
    rowNumber: string | null;
    seatNumber: string | null;
    count: number;
    balanceCount: number;
    status: string | null;
    sessionServices: ISessionService[] | [];
}

export interface ISectorLegend {
    sessionServiceGroupId: UUID;
    serviceGroupId: UUID;
    serviceBalanceCount: null;
    serviceGroupColor: string;
    nameRu: string;
    nameKz: string;
    nameEn: string;
    serviceCount: number;
    serviceMaxCost: number;
    serviceMinCost: number;
    services: ISessionService[];
}

export interface IСustomServiceGroups {
    id: UUID;
    services: Array<any>;
    sessionServiceGroupId: UUID;
}

export interface ISelectedSector {
    nameRu: string;
    nameKz: string;
    nameEn: string;
    scheme: string | null;
    locationMapUrl: string | null;
    places: IPlaceOnSectorScheme[];
    customServiceGroups: IСustomServiceGroups;
    sectorLegend: ISectorLegend[];
}

export interface IEventPageProps {
    eventId: UUID;
}

export interface IEvent {
    id: UUID;
    name: string;
    location: string;
    minCost: number;
    ageLimit: number;
    beginDate: Date;
    posterFileUrl: StaticImageData;
    description: string;
    serviceFee: number;
    isRepeatable: boolean;
}

export interface ISelectDay {
    closeCard: () => void;
    onSelectDate: (selectedDate: moment.Moment | null) => void;
    selectedDate: moment.Moment | null;
    eventSchedule: IScheduleItem[];
    onNextButtonClick: () => void;
}

export interface IServiceForOrder extends IServiceInOrder, ISessionService {}

export interface IServiceInOrder {
    sessionServiceId: UUID;
    trubuneSeatId: UUID | null;
    standingPlaceId: UUID | null;
    ticketCount: number;
}

export interface IOrderInfo {
    eventId: UUID;
    sessionId: UUID;
    sectorId: UUID;
    paymentMethod: number;
    customerPhoneNumber: string;
    customerFirstName: string | null;
    customerMiddleName: string | null;
    customerLastName: string | null;
    customerInstagramUsername: string | null;
    services: IServiceInOrder[];
}

export interface AppDispatch extends Dispatch {
    setSelectLanguage: (value: any) => void;
    setSessions: (value: any) => void;
    setCityList: (value: any) => void;
    setHall: (value: any) => void;
    setSector: (value: any) => void;
    setEvent: (value: any) => void;
    setTickets: (value: any) => void;
    setTicketsTest: (value: any) => void;
    setTotalAmount: (value: any) => void;
    setServiceGroups: (value: any) => void;
    setCustomServiceGroups: (value: any) => void;
    setSectorLegend: (value: any) => void;
    setPaymentData: (value: any) => void;
    setSelectedSession: (value: any) => void;
    setPaymentInfo: (value: any) => void;
    setFirstName: (value: any) => void;
    setLastName: (value: any) => void;
    setMiddleName: (value: any) => void;
    setInstagramUsername: (value: any) => void;
    setPhoneNumber: (value: any) => void;
    setConfirmPhoneNumber: (value: any) => void;
    setTreaty: (value: any) => void;
    setGetInfoAllow: (value: any) => void;
    setPaymentMethod: (value: any) => void;
    setValidationStatus: (value: any) => void;
    setPaymentStep: (value: any) => void;
    setActiveTab: (value: any) => void;
    setItem: (value: any) => void;
    setActiveOrder: (value: any) => void;
    setCurrentOrderData: (value: any) => void;
}
