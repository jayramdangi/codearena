import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import onevsoneReducer from './onevsoneSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onevsone: onevsoneReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values like socket objects
        ignoredActions: ['onevsone/setSocketId'],
        ignoredPaths: ['onevsone.socket', 'socket'],
      },
    }),
});

export default store;