import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import onevsoneReducer from './onevsoneSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  onevsone: onevsoneReducer,
});

export default rootReducer;