import { createReducer } from '@reduxjs/toolkit';
import { fetchConfigurationById, fetchConfigurationsByController } from './actions';
import { ConfigurationCollection } from './types';

type ConfigurationState = {
  configurations: ConfigurationCollection,
  loading: boolean,
}

const initialState = { configurations: [], loading: false } as ConfigurationState;

export const configurationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchConfigurationsByController.fulfilled,
      (state, { payload }) => ({
        ...state,
        configurations: payload.reduce<ConfigurationCollection>((acc, configuration) => ({
          ...acc,
          [configuration.id]: configuration,
        }), {}),
        loading: false,
      }),
    )
    .addCase(
      fetchConfigurationById.fulfilled,
      (state, { payload }) => ({
        ...state,
        configurations: {
          ...state.configurations,
          [payload.id]: payload,
        },
        loading: false,
      }),
    )
    .addCase(
      fetchConfigurationById.pending,
      (state) => ({
        ...state,
        loading: true,
      }),
    )
    .addCase(
      fetchConfigurationsByController.rejected,
      (state) => ({
        ...state,
        loading: false,
      }),
    );
});
