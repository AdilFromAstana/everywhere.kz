import { createSlice } from '@reduxjs/toolkit';

interface IModalStepState {
  activeStepIndex: number;
  isOpen: boolean;
  doesSuccessModalOpen: boolean;
}

const state: IModalStepState = {
  activeStepIndex: 0,
  isOpen: false,
  doesSuccessModalOpen: false,
};

export const modalReducer = createSlice({
  name: 'modalReducer',
  initialState: state,
  reducers: {
    resetPaymentStepIndex: (state) => {
      state.activeStepIndex = 0;
    },
    nextPaymentStepIndex: (state) => {
      state.activeStepIndex = state.activeStepIndex + 1;
    },
    prevPaymentStepIndex: (state) => {
      state.activeStepIndex = state.activeStepIndex - 1;
    },
    openPaymentModal: (state) => {
      state.isOpen = true;
    },
    closePaymentModal: (state) => {
      state.isOpen = false;
    },
    openSuccessModal: (state) => {
      state.doesSuccessModalOpen = true;
    },
    closeSuccessModal: (state) => {
      state.doesSuccessModalOpen = false;
    },
  },
});

export const {
  prevPaymentStepIndex,
  nextPaymentStepIndex,
  openPaymentModal,
  closePaymentModal,
  openSuccessModal,
  closeSuccessModal,
} = modalReducer.actions;
export default modalReducer.reducer;
