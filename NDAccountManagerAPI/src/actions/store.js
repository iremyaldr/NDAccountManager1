import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AccountInfo from '../reducers/AccountInfo';

const rootReducer = combineReducers({
  AccountInfo
});

const store = configureStore({
  reducer: rootReducer,
  // Diğer middleware ve enhancerları ekleyebilirsiniz
});

export default store;
