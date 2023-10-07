import { createSlice } from '@reduxjs/toolkit';

interface IInlineCalendarState {
  startDate: string | null;
  endDate: string | null;
}

const state: IInlineCalendarState = {
  startDate: null,
  endDate: null,
};

export const inlineCalendarReducer = createSlice({
  name: 'inlineCalendarReducer',
  initialState: state,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = inlineCalendarReducer.actions;
export default inlineCalendarReducer.reducer;
