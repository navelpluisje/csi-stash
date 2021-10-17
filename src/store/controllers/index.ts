import { createReducer } from '@reduxjs/toolkit';
import { fetchAllControllers, fetchControllerById } from './actions';
import { ControllerCollection } from './types';

type ControllerState = {
  controllers: ControllerCollection,
  loading: boolean,
}

const initialState = { controllers: [], loading: false } as ControllerState;

export const controllerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchAllControllers.fulfilled,
      (state, { payload }) => {
        state.controllers = payload.reduce<ControllerCollection>((acc, controller) => ({
          ...acc,
          [controller.id]: controller,
        }), {});
        state.loading = false;
      }
    )
    .addCase(
      fetchControllerById.fulfilled,
      (state, { payload }) => {
        console.log(payload)
        state.controllers[payload.id] = payload;
        state.loading = false;
      }
    )
    .addCase(
      fetchAllControllers.pending,
      (state) => {
        state.loading = true;
      }
    )
    .addCase(
      fetchAllControllers.rejected,
      (state) => {
        state.loading = false;
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
