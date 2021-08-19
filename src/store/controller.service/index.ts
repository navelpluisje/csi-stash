import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Controller {
  id: number;
  brand: string;
  model: string;
}
type ControllerResponse = Array<Controller>

// Define a service using a base URL and expected endpoints
export const controllerApi = createApi({
  reducerPath: 'controllerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/controller/' }),
  endpoints: (builder) => ({
    getAllControllers: builder.query<ControllerResponse, void>({
      query: () => '',
    }),
    getControllerById: builder.query<ControllerResponse, number>({
      query: (id) => `${id}`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllControllersQuery,
  useGetControllerByIdQuery,
  useLazyGetControllerByIdQuery,
  usePrefetch,
} = controllerApi;
