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
      (state, { payload }) => {
        state.controllers = payload.reduce<ControllerCollection>((acc, controller) => ({
          ...acc,
          [controller.id]: controller,
        }), {});
        state.loadingAll = false;
      }
    )
    .addCase(
      fetchControllerById.fulfilled,
      (state, { payload }) => {
        if (payload !== null) {
          state.controllers[payload.id] = payload;
          state.loadingById = false;
        }
      }
    )
    .addCase(
      fetchAllControllers.pending,
      (state) => {
        state.loadingAll = true;
      }
    )
    .addCase(
      fetchControllerById.rejected,
      (state) => {
        state.loadingById = false;
      }
    );
});





// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface Controller {
//   id: number;
//   brand: string;
//   model: string;
//   configurations: number;
// }
// type ControllerResponse = Array<Controller>

// // Define a service using a base URL and expected endpoints
// export const controllerApi = createApi({
//   reducerPath: 'controllerApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/controller' }),
//   endpoints: (builder) => ({
//     getAllControllers: builder.query<ControllerResponse, void>({
//       query: () => '',
//     }),
//     getControllerById: builder.query<ControllerResponse, number>({
//       query: (id) => `${id}`,
//     }),
//   }),
// });

// // Export hooks for usage in function components, which are
// // auto-generated based on the defined endpoints
// export const {
//   useGetAllControllersQuery,
//   useGetControllerByIdQuery,
//   useLazyGetControllerByIdQuery,
//   usePrefetch,
// } = controllerApi;
