import { createReducer } from '@reduxjs/toolkit';
import { fetchAllControllers, fetchControllerById } from './actions';
import { ControllerCollection } from './types';

type ControllerState = {
  controllers: ControllerCollection,
  loadingById: boolean,
  loadingAll: boolean,
}

const initialState = {
  controllers: [],
  loadingById: false,
  loadingAll: false,
} as ControllerState;

export const controllerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchAllControllers.fulfilled,
      (state, { payload }) => ({
        ...state,
        controllers: payload.reduce<ControllerCollection>((acc, controller) => ({
          ...acc,
          [controller.id]: controller,
        }), {}),
        loadingAll: false,
      }),
    )
    .addCase(
      fetchControllerById.fulfilled,
      (state, { payload }) => {
        if (payload !== null) {
          return {
            ...state,
            controllers: {
              ...state.controllers,
              [payload.id]: payload,
            },
            loadingById: false,
          };
        }
        return { ...state };
      },
    )
    .addCase(
      fetchAllControllers.pending,
      (state) => ({
        ...state,
        loadingAll: true,
      }),
    )
    .addCase(
      fetchControllerById.rejected,
      (state) => ({
        ...state,
        loadingById: false,
      }),
    );
});
