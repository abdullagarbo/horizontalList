import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slice';

export const store = configureStore({
  reducer: {
    list: listReducer,
  },
});
