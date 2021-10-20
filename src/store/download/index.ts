/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  addConfiguration, addController, addZone, removeZone,
} from './actions';

interface DownloadState {
  controller: number | null;
  configuration: number | null;
  zones: number[];
}

const initialState: DownloadState = {
  controller: null,
  configuration: null,
  zones: [],
};

export const downloadReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      addController,
      (state, { payload }) => {
        if (payload !== state.controller) {
          state.controller = payload as number;
          state.configuration = null;
          state.zones = [];
        }
      },
    )
    .addCase(
      addConfiguration,
      (state, { payload }) => {
        state.configuration = payload;
      },
    )
    .addCase(
      addZone,
      (state, { payload }) => {
        state.zones.push(payload);
      },
    )
    .addCase(
      removeZone,
      (state, { payload }) => {
        state.zones.filter((item) => item !== payload);
      },
    );
});
