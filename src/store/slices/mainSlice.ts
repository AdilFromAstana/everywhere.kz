import { isEmpty } from '@/common/functions';
import { IInitialStateState } from '@/interfaces/Interfaces';
import { Orders } from '@/services/axios';
import { createSlice } from '@reduxjs/toolkit';

const state: IInitialStateState = {
  selectedLanguage: '',
  event: {
    id: 'c0e7675d-9470-4661-be63-fe239eacd07d',
    // id: 'beb356e8-23a6-45e9-ba01-9eed828ea087',
    name: 'OG BUDA (18+)',
    isRepeatable: true,
    serviceFee: 5,
  },
  eventNameForSearch: '',
  sessions: [],
  selectedDay: null,
  selectedSession: null,
  hall: {},
  cityList:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('cityList') || '[]')
      : [],
  totalAmount: 0,
  sector: null,
  activeTab:
    typeof window !== 'undefined'
      ? Number(localStorage.getItem('tab')) || 1
      : 1,
  sectorLegend: [],
  serviceGroups: { id: null, sessionServices: [], balanceCount: 0 },
  customServiceGroups: [],
  tickets: [],
  currentOrderData: {
    number: null,
    reservationExpiredAt: null,
    statusId: null,
    orderId: null,
  },
  createdOrderNumber: null,
  createdOrderId: null,
  isValidationSuccess: false,
  paymentInfo: {
    phoneNumber: '',
    confirmPhoneNumber: '',
    customerFirstName: '',
    customerLastName: '',
    customerMiddleName: '',
    customerInstagramUsername: '',
    paymentMethod: 1,
    isTreaty: false,
    isGetInfoAllow: false,
  },
  ticketsTest: [],
};

export const mainReducer = createSlice({
  name: 'mainReducer',
  initialState: state,
  reducers: {
    selectLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setEventNameForSearch: (state, action) => {
      state.eventNameForSearch = action.payload;
    },
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },
    setCityList: (state, action) => {
      state.cityList = action.payload;
    },
    setCurrentOrderData: (state, action) => {
      const orderData = localStorage.getItem('OrderData');
      const parsedData = isEmpty(orderData) ? {} : JSON.parse(orderData!);
      const data = {
        ...state,
        ...parsedData,
        currentOrderData: action.payload,
      };
      localStorage.setItem('OrderData', JSON.stringify(data));
      state.currentOrderData = action.payload;
    },
    setHall: (state, action) => {
      state.hall = action.payload;
    },
    setSector: (state, action) => {
      state.sector = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setTicketsTest: (state, action) => {
      state.ticketsTest = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setServiceGroups: (state, action) => {
      state.serviceGroups = action.payload;
    },
    setCustomServiceGroups: (state, action) => {
      state.customServiceGroups = action.payload;
    },
    setSectorLegend: (state, action) => {
      state.sectorLegend = action.payload;
    },
    setPaymentData: (state, action) => {
      state = { ...state, ...action.payload };
    },
    setPhoneNumber: (state, action) => {
      state.paymentInfo.phoneNumber = action.payload;
    },
    setConfirmPhoneNumber: (state, action) => {
      state.paymentInfo.confirmPhoneNumber = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentInfo.paymentMethod = action.payload;
    },
    setIsTreaty: (state, action) => {
      state.paymentInfo.isTreaty = action.payload;
    },
    setIsGetInfoAllow: (state, action) => {
      state.paymentInfo.isGetInfoAllow = action.payload;
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
    setFirstName: (state, action) => {
      state.paymentInfo.customerFirstName = action.payload;
    },
    setLastName: (state, action) => {
      state.paymentInfo.customerLastName = action.payload;
    },
    setSuccessValidation: (state, action) => {
      state.isValidationSuccess = action.payload;
    },
    clearOrderInfo: (state) => {
      localStorage.removeItem('OrderData');
      state.event = null;
    },
  },
});

export const {
  selectLanguage,
  setEventNameForSearch,
  setSessions,
  setCityList,
  setCurrentOrderData,
  setHall,
  setSector,
  setEvent,
  setTickets,
  setTicketsTest,
  setTotalAmount,
  setServiceGroups,
  setCustomServiceGroups,
  setSectorLegend,
  setPaymentData,
  setSelectedSession,
  setPaymentInfo,
  setFirstName,
  setLastName,
  clearOrderInfo,
} = mainReducer.actions;

export default mainReducer.reducer;
