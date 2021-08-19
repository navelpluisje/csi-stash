import { combineReducers } from '@reduxjs/toolkit';
import CountReducer from '@store/count';

export const rootReducer = combineReducers({
  CountReducer,
  // firstNamedReducer,
  // secondNamedReducer,
});
