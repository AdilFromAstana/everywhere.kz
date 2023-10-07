import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './slices/mainSlice';
import { modalReducer } from './slices/modalSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { inlineCalendarReducer } from '@/store/slices/inlineCalendarSlice';

export const store = configureStore({
  reducer: {
    [mainReducer.name]: mainReducer.reducer,
    [modalReducer.name]: modalReducer.reducer,
    [inlineCalendarReducer.name]: inlineCalendarReducer.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
