import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slice/AuthSlice';
import TitleSlice from './slice/TitleSlice';
import MetaMaskSlice from './slice/MetaMaskSlice';

export const store = configureStore({
  reducer: {
    AuthSlice,
    TitleSlice,
    MetaMaskSlice,
  },
});
