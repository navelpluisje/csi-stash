import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
      (state, { payload }) => {
        state.configurations = payload.reduce<ConfigurationCollection>((acc, configuration) => ({
          ...acc,
          [configuration.id]: configuration,
        }), {});
        state.loading = false;
      }
    )
    .addCase(
      fetchConfigurationById.fulfilled,
      (state, { payload }) => {
        console.log(payload)
        state.configurations[payload.id] = payload;
        state.loading = false;
      }
    )
    .addCase(
      fetchConfigurationById.pending,
      (state) => {
        state.loading = true;
      }
    )
    .addCase(
      fetchConfigurationsByController.rejected,
      (state) => {
        state.loading = false;
      }
    );
});

// Define a service using a base URL and expected endpoints
// export const configurationApi = createApi({
//   reducerPath: 'configurationApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/configuration' }),
//   endpoints: (builder) => ({
//     getAllConfigurations: builder.query<ConfigurationResponse, string>({
//       query: (controllerId) => `controller/${controllerId}`,
//     }),
//     getConfigurationById: builder.query<ConfigurationResponse, number>({
//       query: (configurationId) => `${configurationId}`,
//     }),
//   }),
// });

// // Export hooks for usage in function components, which are
// // auto-generated based on the defined endpoints
// export const {
//   useGetAllConfigurationsQuery,
//   useGetConfigurationByIdQuery,
//   usePrefetch,
// } = configurationApi;
