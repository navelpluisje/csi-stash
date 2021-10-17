/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { checkUpdate } from './actions';

interface UpdateState {
  lastUpdated: number
}

const initialState = { lastUpdated: 0 } as UpdateState;

export const updateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      checkUpdate.fulfilled,
      (state, { payload }) => {
        state.lastUpdated = payload as number;
      },
    );
});
